import { useState, useEffect, useCallback } from "react";
import type { Comentario } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5432";

export function useComentarios() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const fetchComentarios = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/comments`);
      if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
      }
      const data = await response.json();
      setComentarios(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchComentarios();
  }, [fetchComentarios]);

  const addComentario = async (comentario: Omit<Comentario, "id" | "created_at">) => {
    try {
      const response = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comentario),
      });

      if (!response.ok) {
        throw new Error('Error al crear el comentario');
      }

      const newComentario = await response.json();
      setComentarios((prevComentarios) => [newComentario, ...prevComentarios]);
    } catch (error) {
      console.error(error);
    }
  };

  const comentariosPorCarrera = (carrera: string) => {
    return comentarios.filter((c) => c.carrera === carrera);
  };

  const allComentarios = () => {
    return comentarios;
  };

  return { addComentario, comentariosPorCarrera, allComentarios, comentarios };
} 