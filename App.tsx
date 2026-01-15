import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { SupabaseStatus } from './components/SupabaseStatus';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TalentScout from './pages/TalentScout';
import TalentBridge from './pages/TalentBridge';
import Talent from './pages/Talent';
import Home from './pages/Home';
import Reports from './pages/Reports';
import BioStackCatalog from './pages/BioStackCatalog';
import BioStackTeamDashboard from './pages/BioStackTeamDashboard';
import { LanguageProvider } from './contexts/LanguageContext';

import Modules from './pages/Modules';
import TalentLayout from './pages/TalentLayout';
import { CompetencyMap, CognitiveRestructuring, MantraCreator, LearningPath } from './pages/PersonalViews';
import { ReskillingMatrix, SkillGapAnalysis, RetentionRisk } from './pages/StrategicViews';
import { CollaborationIndex, CommunityHub, ProfileIngestion } from './pages/SocialViews';

import Settings from './pages/Settings';
import ScoutSettings from './pages/ScoutSettings';
import TalentProfiles from './pages/TalentProfiles';
import TalentProfileDetail from './pages/TalentProfileDetail';

// Layout component for the authenticated application (Sidebar + Header + Content)
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isModulesPage = location.pathname === '/home' || location.pathname === '/modules';

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100 font-display selection:bg-cyan-500/30">

      {/* Mobile Header - Premium Glass Look */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-background-dark/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 md:hidden z-30 print:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-slate-300 p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>
        <Link to="/" className="ml-4 font-black text-xl tracking-tighter hover:opacity-80 transition-opacity">
          Talent<span className="text-primary text-glow">AI</span>
        </Link>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className={`
        flex-1 relative min-h-screen overflow-x-hidden
        transition-all duration-500 ease-in-out
        pt-16 md:pt-0 md:ml-64 
        print:ml-0 print:p-0
        ${isModulesPage ? 'p-0' : 'p-6 md:p-10'}
      `}>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SupabaseStatus />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Public Landing Page - moved to /landing */}
            <Route path="/landing" element={<Home />} />

            {/* Default Redirect to HOME */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Protected/App Routes wrapped in Layout */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              {/* HOME (Platform Overview) */}
              <Route path="/home" element={<Modules />} />
              <Route path="/modules" element={<Navigate to="/home" replace />} />

              {/* TALENT Section (Unified) */}
              <Route path="/talent" element={<TalentLayout />}>
                <Route index element={<Navigate to="profiles" replace />} />
                <Route path="profiles" element={<TalentProfiles />} />
                <Route path="ingestion" element={<ProfileIngestion />} />
                <Route path="competency" element={<CompetencyMap />} />
                <Route path="profile/:id" element={<TalentProfileDetail />} />
              </Route>

              {/* TALENT SCOUT Section */}
              <Route path="/scout/settings" element={<ScoutSettings />} />
              <Route path="/scout/interview" element={<TalentScout />} />
              <Route path="/scout" element={<Navigate to="/scout/interview" replace />} />

              {/* BIOSTACK Section (Legacy/Redirects) */}
              <Route path="/biostack/talent-scout/settings" element={<Navigate to="/scout/settings" replace />} />
              <Route path="/biostack/talent-scout/records" element={<div className="p-10 bg-surface-dark rounded-lg text-slate-300">Talent Scout - Registros de Entrevistas (Coming Soon)</div>} />
              <Route path="/biostack/talent-scout/interview" element={<Navigate to="/scout/interview" replace />} />
              <Route path="/biostack/talent-scout" element={<Navigate to="/scout/interview" replace />} />
              <Route path="/biostack/catalog" element={<BioStackCatalog />} />
              {/* New Team Dashboard */}
              <Route path="/biostack/dashboard" element={<BioStackTeamDashboard />} />

              {/* TALENT BRIDGE Section */}
              <Route path="/talent-bridge/panel" element={<Dashboard />} />
              <Route path="/talent-bridge/matching" element={<RetentionRisk />} />
              <Route path="/talent-bridge/recommendations" element={<TalentBridge />} />
              <Route path="/talent-bridge/learning-path" element={<LearningPath />} />
              <Route path="/talent-bridge/retention-risk" element={<RetentionRisk />} />

              {/* REPORTES */}
              <Route path="/reportes" element={<Reports />} />

              {/* SETTINGS / CONFIGURACIONES */}
              <Route path="/settings" element={<Settings />} />

              {/* Legacy routes for compatibility */}
              <Route path="/ingestion" element={<Navigate to="/talent/ingestion" replace />} />
              <Route path="/competency" element={<Navigate to="/talent/competency" replace />} />
              <Route path="/reskilling" element={<Navigate to="/talent-bridge/retention-risk" replace />} />
              <Route path="/talent/reskilling" element={<Navigate to="/talent-bridge/retention-risk" replace />} />
              <Route path="/scout" element={<Navigate to="/scout/interview" replace />} />
              <Route path="/bridge" element={<Navigate to="/talent-bridge/panel" replace />} />
              <Route path="/reports" element={<Navigate to="/reportes" replace />} />
              <Route path="/dashboard" element={<Navigate to="/talent-bridge/panel" replace />} />

              {/* Other Module Routes (Individual Access) */}
              <Route path="/skill-gap" element={<SkillGapAnalysis />} />
              <Route path="/screening" element={<Navigate to="/scout/interview" replace />} />
              <Route path="/cognitive" element={<CognitiveRestructuring />} />
              <Route path="/mantra" element={<MantraCreator />} />
              <Route path="/collaboration" element={<CollaborationIndex />} />
              <Route path="/community" element={<CommunityHub />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;