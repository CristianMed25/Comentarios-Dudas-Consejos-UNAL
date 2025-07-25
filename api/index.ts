import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

// Rutas de la API
app.get('/api/comments', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const { texto, carrera, semestre } = req.body;
    if (!texto || !carrera || !semestre) {
      return res.status(400).json({ error: 'Los campos texto, carrera y semestre son obligatorios' });
    }
    const newComentario = await pool.query(
      'INSERT INTO comments (texto, carrera, semestre, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [texto, carrera, semestre, Date.now()]
    );
    res.status(201).json(newComentario.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/recursos', (_req, res) => {
  const recursos = [
    {
      id: 1,
      title: 'Escuela de Pares Tutores - GEA',
      general_objective: 'Fortalecer los conocimientos y habilidades de los estudiantes tutores pares en los procesos de enseñanza - aprendizaje significativo, para que apoyen el desarrollo de la autonomía, el trabajo colaborativo y el pensamiento crítico y reflexivo de los estudiantes beneficiados de los programas de acompañamiento por pares.',
      specific_objectives: [
        'Introducir a los estudiantes auxiliares en las concepciones sobre el proceso de aprendizaje y los principios del acompañamiento académico por pares',
        'Acompañar a los Pares Tutores en la construcción de su saber hacer en el acompañamiento académico con base en la teoría socioconstructivista del aprendizaje.',
      ],
      methodology: 'La Escuela de Pares Tutores se comprende como un espacio de aprendizaje que busca consolidar el ARTE como principio rector de formación, mediante:\n1. Sesiones grupales\n2. Bitácoras de reflexión\n3. Observaciones y retroalimentaciones',
      contact: 'Si tienes alguna pregunta sobre el proceso de formación de la Escuela de Pares Tutores, escríbenos al correo escuelatutores_bog@unal.edu.co.',
      image_url: '/ParesTutores.png'
    },
    {
      id: 2,
      title: 'Título del Recurso Genérico',
      general_objective: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      specific_objectives: [
        'Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
        'Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.',
        'Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.',
      ],
      methodology: 'Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.',
      contact: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
      image_url: '/Ejemplo.png'
    },
    {
      id: 3,
      title: 'Otro Recurso Importante',
      general_objective: 'Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
      specific_objectives: [
        'Praesent egestas leo in pede. Praesent blandit odio eu enim.',
        'Pellentesque sed dui ut augue blandit sodales.',
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.',
      ],
      methodology: 'Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.',
      contact: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
      image_url: '/Ejemplo.png'
    }
  ];
  res.json(recursos);
});

app.get('/api/health', (_req, res) => {
  res.status(200).send('OK');
});

// Importante: Exportar la app para que Vercel la use
export default app; 