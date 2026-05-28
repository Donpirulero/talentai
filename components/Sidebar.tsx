import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { X, LogOut, ChevronRight, Compass } from 'lucide-react';
import { startOnboarding } from '../utils/onboarding';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { signOut, user } = useAuth();

  const menuItems = [
    { type: 'header', label: "GESTIÓN DE TALENTO", id: 'h_talent' },
    { path: "/talent/profiles", icon: "group", label: "Perfiles & Ingesta", id: "profiles" },

    { type: 'header', label: "TALENT SCOUT", id: 'h_scout' },
    { path: "/scout/interview", icon: "video_chat", label: "Entrevistas IA", id: "interview" },

    { type: 'header', label: "BIOSTACK ANALYTICS", id: 'h_biostack' },
    { path: "/biostack/dashboard", icon: "analytics", label: "Dashboard de Equipo", id: "bio_dash" },

    { type: 'header', label: "TALENT BRIDGE", id: 'h_bridge' },
    { path: "/talent-bridge/matching", icon: "trending_up", label: "Matching & Ranking", id: "matching" },
    { path: "/talent-bridge/recommendations", icon: "recommend", label: "Asistente de Roles", id: "recs" },
    { path: "/talent-bridge/learning-path", icon: "school", label: "Hojas de Ruta", id: "upskilling" },

    { type: 'header', label: "SISTEMA", id: 'h_sys' },
    { path: "/settings", icon: "settings", label: "Configuración", id: "settings" },
    { type: 'action', icon: "explore", label: "Tour Guiado", id: "onboarding" },
  ];

  const handleTourClick = () => {
    console.log("Starting onboarding tour...");
    startOnboarding(location.pathname);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 flex flex-col border-r border-white/5 bg-[#0B101B]/80 backdrop-blur-2xl h-full flex-shrink-0
        transform transition-transform duration-500 ease-in-out shadow-2xl
        md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-white/5">
          <Link to="/home" className="flex items-center gap-4 group cursor-pointer">
            <div className="relative flex items-center justify-center size-12 rounded-xl bg-gradient-to-br from-primary to-blue-800 shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-white" style={{ fontSize: "28px" }}>psychology</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-xl font-black leading-tight tracking-tighter">Talent <span className="text-primary">AI</span></h1>
              <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase opacity-70">Enterprise v2.4</p>
            </div>
          </Link>
          {/* Close button for mobile */}
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {menuItems.map((item, idx) => {
            if (item.type === 'header') {
              return (
                <div key={item.id} className="px-4 pt-6 pb-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.25em]">
                  {item.label}
                </div>
              );
            }

            if (item.type === 'action') return null;

            const isActive = location.pathname === item.path || (item.path !== '/home' && location.pathname.startsWith(item.path || ''));
            return (
              <Link
                key={item.id}
                to={item.path || '#'}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${isActive
                  ? "bg-primary/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-glow"></div>
                )}
                <span className={`material-symbols-outlined ${isActive ? "text-primary text-glow" : "group-hover:text-primary transition-colors"} transition-all duration-300`}>
                  {item.icon}
                </span>
                <span className={`text-sm tracking-wide ${isActive ? "font-black" : "font-medium opacity-80 group-hover:opacity-100"}`}>
                  {item.label}
                </span>
                {!isActive && (
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={14} className="text-slate-600" />
                  </div>
                )}
              </Link>
            );
          })}

          {/* Action Buttons (like Tour) */}
          {menuItems.filter(i => i.type === 'action').map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'onboarding') handleTourClick();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative text-slate-400 hover:text-white hover:bg-white/5"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                {item.icon}
              </span>
              <span className="text-sm tracking-wide font-medium opacity-80 group-hover:opacity-100">
                {item.label}
              </span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={14} className="text-slate-600" />
              </div>
            </button>
          ))}
        </div>

        {/* User Profile & Logout Section */}
        <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between group/user">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => navigate('/settings')}
            >
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-xl size-11 ring-2 ring-white/10 group-hover/user:ring-primary/50 transition-all duration-300 shadow-xl"
                  style={{ backgroundImage: `url("${user?.user_metadata?.avatar_url || user?.user_metadata?.picture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'}")` }}
                ></div>
                <div className="absolute -bottom-1 -right-1 size-4 bg-emerald-500 rounded-full border-2 border-[#0B101B] shadow-lg shadow-emerald-500/20"></div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <p className="text-white text-sm font-black truncate leading-tight tracking-tight">
                  {user?.user_metadata?.full_name || user?.user_metadata?.name || 'Usuario'}
                </p>
                <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest truncate opacity-80">
                  {user?.email ? 'Colaborador' : 'Invitado'}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-2.5 text-slate-500 hover:text-rose-400 transition-all rounded-xl hover:bg-rose-500/10 active:scale-95"
              title={t('sidebar.logout')}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;