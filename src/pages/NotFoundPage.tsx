import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="mb-8">
        La página que buscas no existe.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
} 