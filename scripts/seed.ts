import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  console.log('Iniciando la siembra de la base de datos...');
  
  const client = await pool.connect();
  
  try {
    // Leer el archivo JSON
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '../src/data/seed-data.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const comentarios: { id: string; texto: string; carrera: string; semestre: number; createdAt: string }[] = JSON.parse(data);

    console.log(`Se encontraron ${comentarios.length} comentarios para insertar.`);

    await client.query('BEGIN');

    // Limpiar la tabla antes de insertar nuevos datos
    console.log('Limpiando la tabla de comentarios...');
    await client.query('DELETE FROM comments');
    
    const queryText = `
      INSERT INTO comments (texto, carrera, semestre, created_at) 
      VALUES ($1, $2, $3, $4);
    `;

    for (const comentario of comentarios) {
      const values = [
        comentario.texto,
        comentario.carrera,
        String(comentario.semestre),
        new Date(comentario.createdAt).getTime()
      ];
      await client.query(queryText, values);
    }
    
    await client.query('COMMIT');
    console.log('¡Siembra completada con éxito!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error durante la siembra de la base de datos:', error);
  } finally {
    client.release();
    await pool.end();
    console.log('Conexión a la base de datos cerrada.');
  }
}

seedDatabase(); 