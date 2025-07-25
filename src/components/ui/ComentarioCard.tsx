import type { Comentario } from "../../types";
import { Link } from "react-router-dom";
import { Book, Clock } from "lucide-react";
import { useTimeAgo } from "../../hooks/useTimeAgo";

interface ComentarioCardProps {
  comentario: Comentario;
}

export default function ComentarioCard({ comentario }: ComentarioCardProps) {
  const timeAgo = useTimeAgo(Number(comentario.created_at));

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
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
} 