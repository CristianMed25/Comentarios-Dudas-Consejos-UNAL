import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-900 text-gray-300">
      <motion.div
        animate={{ width: isSidebarOpen ? "16rem" : "0rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden flex-shrink-0"
      >
        <Sidebar />
      </motion.div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-800/60 backdrop-blur-lg shadow-md z-10 sticky top-0 border-b border-slate-700">
          <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Izquierda */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-slate-700 transition-colors text-gray-400 hover:text-white"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/">
                <img src="/logo.png" alt="Logo UNAL" className="h-12" />
              </Link>
            </div>

            {/* Centro */}
            <div className="flex-1 text-center hidden md:block">
              <h1 className="text-lg font-bold text-white truncate">Comunidad de Dudas y Consejos</h1>
              <p className="text-sm text-gray-400 truncate">Comparte tu experiencia y resuelve tus inquietudes</p>
            </div>

            {/* Derecha (espaciador) */}
            <div className="w-16"></div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600 scrollbar-track-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 