import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import FloatingMenu from './components/FloatingMenu';
import HomePage from './pages/HomePage';
import { CompetencyMap, CognitiveRestructuring, MantraCreator, LearningPath } from './pages/PersonalViews';
import { ReskillingMatrix, SkillGapAnalysis, RetentionRisk } from './pages/StrategicViews';
import { CollaborationIndex, CommunityHub, ProfileIngestion } from './pages/SocialViews';
import { CandidateScreening } from './pages/ScreeningViews';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="min-h-screen bg-background-dark text-white font-display">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/competency" element={<CompetencyMap />} />
            <Route path="/reskilling" element={<ReskillingMatrix />} />
            <Route path="/ingestion" element={<ProfileIngestion />} />
            <Route path="/skill-gap" element={<SkillGapAnalysis />} />
            <Route path="/cognitive" element={<CognitiveRestructuring />} />
            <Route path="/mantra" element={<MantraCreator />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/collaboration" element={<CollaborationIndex />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/retention" element={<RetentionRisk />} />
            <Route path="/screening" element={<CandidateScreening />} />
          </Routes>
          <FloatingMenu />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;