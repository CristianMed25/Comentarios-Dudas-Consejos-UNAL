import { useParams } from "react-router-dom";
import { useComentarios } from "../hooks/useComentarios";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const semestres = Array.from({ length: 10 }, (_, i) => i + 1);

export default function CarreraPage() {
  const { carrera } = useParams<{ carrera: string }>();
  const { addComentario, comentariosPorCarrera } = useComentarios();
  const comentarios = carrera ? comentariosPorCarrera(carrera) : [];

  const [nuevoComentario, setNuevoComentario] = useState("");
  const [semestre, setSemestre] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoComentario.trim() === "" || !carrera) return;

    addComentario({
      carrera,
      semestre,
      texto: nuevoComentario,
    });

    setNuevoComentario("");
  };

  if (!carrera) {
    return <div>Carrera no encontrada</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">{carrera}</h1>

      <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8 border border-slate-700">
        <h2 className="text-xl font-bold mb-4 text-gray-200">Agregar nuevo comentario</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            className="p-3 bg-slate-700 text-gray-300 border border-slate-600 rounded-lg w-full mb-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            placeholder="Escribe aquí una duda compleja, un tema difícil o un consejo para futuros estudiantes..."
            rows={4}
          />
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-400">Semestre</h3>
            <div className="flex flex-wrap gap-2">
              {semestres.map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSemestre(sem)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    semestre === sem
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
            disabled={!nuevoComentario.trim()}
          >
            <PlusCircle size={20} />
            <span>Agregar Comentario</span>
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Comentarios por Semestre</h2>
        <div className="space-y-6">
          <AnimatePresence>
            {comentarios.length > 0 ? (
              semestres.map((sem) => {
                const comentariosDelSemestre = comentarios.filter((d) => d.semestre === sem);
                if (comentariosDelSemestre.length === 0) return null;

                return (
                  <motion.div
                    key={sem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700"
                  >
                    <h3 className="text-xl font-bold mb-3 text-emerald-500">Semestre {sem}</h3>
                    <div className="space-y-3">
                      {comentariosDelSemestre.map((c) => (
                        <div key={c.id} className="p-4 bg-slate-700 text-gray-300 rounded-lg border-l-4 border-emerald-500">
                          {c.texto}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 py-8">
                No hay comentarios para esta carrera todavía. ¡Sé el primero en agregar uno!
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
} 