import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5432";

interface Recurso {
  id: number;
  title: string;
  general_objective: string;
  specific_objectives: string[];
  methodology: string;
  contact: string;
  image_url: string;
}

export default function RecursosPage() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/recursos`);
        if (!response.ok) {
          throw new Error('Error al obtener los recursos');
        }
        const data = await response.json();
        setRecursos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchRecursos();
  }, []);

  if (loading) {
    return <div className="text-center text-white py-10">Cargando recursos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 text-white"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-400">Recursos Universitarios</h1>
      <div className="space-y-12">
        {recursos.map((recurso) => (
          <motion.div
            key={recurso.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img src={recurso.image_url} alt={recurso.title} className="w-full md:w-1/3 rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-emerald-500 mb-4">{recurso.title}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Objetivo General</h3>
                    <p className="text-gray-400">{recurso.general_objective}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Objetivos Específicos</h3>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {recurso.specific_objectives.map((obj, index) => (
                        <li key={index}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Metodología</h3>
                    <p className="text-gray-400 whitespace-pre-line">{recurso.methodology}</p>
                  </div>
                   <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-300">Contacto</h3>
                    <p className="text-gray-400">{recurso.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 