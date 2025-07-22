import { useLocalStorage } from "./useLocalStorage";
import type { Comentario } from "../types";
import { SEED_COMENTARIOS } from "../data/seed";
import { useEffect } from "react";

export function useComentarios() {
  const [comentarios, setComentarios] = useLocalStorage<Comentario[]>("comentarios", []);

  useEffect(() => {
    if (localStorage.getItem("comentarios_initialized") !== "true") {
      setComentarios(SEED_COMENTARIOS);
      localStorage.setItem("comentarios_initialized", "true");
    }
  }, []);

  const addComentario = (comentario: Omit<Comentario, "id" | "createdAt">) => {
    const newComentario = {
      ...comentario,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setComentarios((prevComentarios) => [newComentario, ...prevComentarios]);
  };

  const comentariosPorCarrera = (carrera: string) => {
    return comentarios.filter((c) => c.carrera === carrera);
  };

  const allComentarios = () => {
    return comentarios;
  };

  const exportComentarios = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(comentarios, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "comentarios-unal.json";
    link.click();
  };

  const importComentarios = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      if (e.target?.result) {
        try {
          const newComentarios = JSON.parse(e.target.result as string);
          // Validación simple
          if (Array.isArray(newComentarios) && newComentarios.every(item => 'id' in item && 'texto' in item)) {
            setComentarios(newComentarios);
            alert("Comentarios importados con éxito!");
          } else {
            alert("El archivo no tiene el formato correcto.");
          }
        } catch (error) {
          console.error("Error al importar el archivo:", error);
          alert("Error al leer el archivo. Asegúrate de que es un JSON válido.");
        }
      }
    };
  };

  return { addComentario, comentariosPorCarrera, allComentarios, comentarios, exportComentarios, importComentarios };
} 