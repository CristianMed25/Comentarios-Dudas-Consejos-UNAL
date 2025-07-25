import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavButton = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-emerald-600 text-white"
          : "text-gray-300 hover:bg-slate-700 hover:text-white"
      }`
    }
  >
    {children}
  </NavLink>
);


export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isRecursosPage = location.pathname === '/recursos';

  useEffect(() => {
    setSidebarOpen(!isRecursosPage);
  }, [isRecursosPage]);

  const getTitle = () => {
    if (isRecursosPage) {
      return {
        main: "Recursos de Apoyo",
        sub: "Herramientas y guías para tu vida universitaria"
      };
    }
    return {
      main: "Comunidad de Dudas y Consejos",
      sub: "Comparte tu experiencia y resuelve tus inquietudes"
    };
  }

  const { main: title, sub: subtitle } = getTitle();

  return (
    <div className="flex h-screen bg-slate-900 text-gray-300">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "16rem" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex-shrink-0"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-slate-800/60 backdrop-blur-lg shadow-md z-10 sticky top-0 border-b border-slate-700">
          <div className="max-w-full mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Izquierda */}
            <div className="flex items-center gap-4">
               <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-full hover:bg-slate-700 transition-colors text-gray-400 hover:text-white ${isRecursosPage ? 'hidden' : 'block'}`}
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/">
                <img src="/logo.png" alt="Logo UNAL" className="h-10" />
              </Link>
            </div>

            {/* Centro */}
            <div className="flex-1 text-center hidden md:block">
              <h1 className="text-lg font-bold text-white truncate">{title}</h1>
              <p className="text-sm text-gray-400 truncate">{subtitle}</p>
            </div>

            {/* Derecha */}
            <div className="flex items-center gap-2">
              <NavButton to="/">Inicio</NavButton>
              <NavButton to="/recursos">Recursos</NavButton>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600 scrollbar-track-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 