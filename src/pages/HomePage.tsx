import { useComentarios } from "../hooks/useComentarios";
import ComentarioCard from "../components/ui/ComentarioCard";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const { allComentarios } = useComentarios();
  const comentarios = allComentarios();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {comentarios.length > 0 ? (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {comentarios.map((comentario, index) => (
                <motion.div
                  key={comentario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ComentarioCard comentario={comentario} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16 px-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-3">¡Bienvenido!</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Aquí aparecerán los comentarios más recientes. Por ahora no hay ninguno. ¡Explora las carreras y anímate a ser el primero en compartir algo!
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
} 