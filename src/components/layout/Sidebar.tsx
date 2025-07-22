import { NavLink } from "react-router-dom";
import { CARRERAS } from "../../data/carreras";
import { BookText, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCarreras = useMemo(() => {
    const sortedCarreras = [...CARRERAS].sort((a, b) => a.localeCompare(b));
    if (!searchTerm) {
      return sortedCarreras;
    }
    return sortedCarreras.filter((carrera) =>
      carrera.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <aside className="w-64 bg-slate-800 text-gray-300 p-4 h-full flex flex-col border-r border-slate-700">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar carrera..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>
      <nav className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500 scrollbar-track-slate-800">
        <div className="flex flex-col space-y-1">
          {filteredCarreras.map((carrera) => (
            <NavLink
              key={carrera}
              to={`/carrera/${carrera}`}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-gray-400 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <BookText className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{carrera}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
} 