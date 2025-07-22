import type { Comentario } from "../../types";
import { Link } from "react-router-dom";
import { Book, Clock } from "lucide-react";

interface ComentarioCardProps {
  comentario: Comentario;
}

// Función para simular "hace cuánto tiempo"
const timeAgo = (dateString?: string) => {
  if (!dateString) return "hace un momento";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
};

export default function ComentarioCard({ comentario }: ComentarioCardProps) {
  return (
    <div className="bg-slate-800 p-5 rounded-lg shadow-lg border border-slate-700 hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1">
      <p className="text-gray-300 mb-4 text-base">{comentario.texto}</p>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <Link
          to={`/carrera/${comentario.carrera}`}
          className="flex items-center gap-2 font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
        >
          <Book size={14} />
          <span>{comentario.carrera} - Sem. {comentario.semestre}</span>
        </Link>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{timeAgo(comentario.createdAt)}</span>
        </div>
      </div>
    </div>
  );
} 