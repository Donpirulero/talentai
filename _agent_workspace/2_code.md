Okay, I'm ready to start. I will follow the plan and instructions meticulously.

--- FILE: .env.defaults ---
```
VITE_DEMO_MODE=true
VITE_MOCK_AI=true
VITE_ENABLE_AI_INSIGHTS=true
```
--- END FILE ---
--- FILE: contexts/AuthContext.tsx ---
```typescript
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import * as lucide from "lucide-react";

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const session = await supabase.auth.getSession();

        if (session.data.session) {
          setUser(session.data.session.user || null);
        }
      } catch (error) {
        console.error("Error loading user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        // Demo Mode: Simulate login
        setUser({
          id: 'demo-user',
          email: email,
          role: 'demo'
        });
        navigate('/dashboard');
      } else {
        // Real Supabase sign-in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error("Sign-in error:", error.message); // Log the error message
      // Potentially set an error state to display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      if (import.meta.env.VITE_DEMO_MODE === 'true') {
        // Demo Mode: Simulate logout
        setUser(null);
        navigate('/login');
      } else {
        // Real Supabase sign-out
        await supabase.auth.signOut();
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    signIn,
    signOut,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-background-dark text-white">
          <lucide.Loader2 className="animate-spin h-6 w-6 mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```
--- END FILE ---
--- FILE: services/db.ts ---
```typescript
import { supabase } from '../utils/supabase';
import { Employee } from '../types';
import mockEmployees from '../data/mockEmployees.json'; // Create this file

let employeeCache: Employee[] | null = null; // Initialize the cache outside the function

export const dbService = {
  getEmployees: async (): Promise<Employee[]> => {
    if (import.meta.env.VITE_DEMO_MODE === 'true') {
      if (employeeCache === null) {
        console.log("Loading mock data!");
        employeeCache = mockEmployees as Employee[];
      } else {
        console.log("Loading data from the cache!");
      }
      return employeeCache;
    } else {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*');

        if (error) {
          console.error('Error fetching employees from Supabase:', error);
          throw error;
        }

        return data as Employee[];
      } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
      }
    }
  },
  // ... other dbService functions
};
```
--- END FILE ---
--- FILE: components/FeatureFlag.tsx ---
```typescript
import React from 'react';

interface FeatureFlagProps {
  flag: string;
  children: React.ReactNode;
}

const FeatureFlag: React.FC<FeatureFlagProps> = ({ flag, children }) => {
  const isEnabled = import.meta.env[flag] === 'true';

  return isEnabled ? <>{children}</> : null;
};

export default FeatureFlag;
```
--- END FILE ---
--- FILE: App.tsx ---
```typescript
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Employees from './pages/Employees';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/employees" element={user ? <Employees /> : <Navigate to="/login" />} />
      <Route path="/" element={<Home />} />
      <Route
        path="*"
        element={<Navigate to={import.meta.env.VITE_DEMO_MODE === 'true' && !user ? "/" : "/dashboard"} />}
      />
    </Routes>
  );
}

export default App;
```
--- END FILE ---
--- FILE: pages/Dashboard.tsx ---
```typescript
import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import { Employee } from '../types';
import FeatureFlag from '../components/FeatureFlag';
import { HfInference } from '@huggingface/inference';
import { useAuth } from '../contexts/AuthContext';
import * as lucide from "lucide-react";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const { user } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await dbService.getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

    const generateDashboardInsights = async () => {
        setIsGenerating(true);
        setAiSummary(null);

        try {
            if (import.meta.env.VITE_MOCK_AI === 'true') {
                // Mock response
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
                setAiSummary(`[INST] Análisis Mock:  Número total de empleados: ${employees.length} [/INST]`); // Provide a pre-defined mock insight
            } else {
                //Real API call only if MOCK_AI is false and VITE_HUGGINGFACE_TOKEN is present
                if (!import.meta.env.VITE_HUGGINGFACE_TOKEN) {
                    console.warn("VITE_HUGGINGFACE_TOKEN is not set. Please set it in your environment variables.");
                    return;
                }
                const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_TOKEN);

                //Prepare context data
                const employeeContext = employees.map(emp => `${emp.first_name} ${emp.last_name} - ${emp.title}`).join(", ");
                const prompt = `[INST] You are an AI HR assistant. Provide a summary of key employee information in 2 short sentences.
Context: ${employeeContext}
Summary: [/INST]`;

                const out = await hf.textGeneration({
                    model: 'mistralai/Mistral-7B-Instruct-v0.1',
                    inputs: prompt
                });
                setAiSummary(out.generated_text);
            }
        } catch (error) {
            console.error("Error generating AI summary:", error);
            setAiSummary("Error generating AI summary. Please check the console for details.");
        } finally {
            setIsGenerating(false);
        }
    };


  return (
    <div className="bg-background-dark text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <div className="mb-4">
            <button
                onClick={generateDashboardInsights}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded shadow-md transition duration-300"
                disabled={isGenerating}
            >
                {isGenerating ? (
                    <>
                        <lucide.Loader2 className="animate-spin h-5 w-5 mr-2 inline-block" />
                        Generating...
                    </>
                ) : (
                    "Generate Insights"
                )}
            </button>
        </div>

      <FeatureFlag flag="VITE_ENABLE_AI_INSIGHTS">
        {aiSummary ? (
          <div className="glass-panel p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold mb-2">AI-Powered Insights</h2>
            <p>{aiSummary}</p>
          </div>
        ) : (
          <p>Click "Generate Insights" to get AI-powered insights about your employees.</p>
        )}
      </FeatureFlag>

      <div className="glass-panel p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Employee List</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id} className="mb-2">
              {employee.first_name} {employee.last_name} - {employee.title}
            </li>
          ))}
        </ul>
      </div>
        {user && <p>Logged in as: {user.email}</p>}
    </div>
  );
};

export default Dashboard;
```
--- END FILE ---
--- FILE: tailwind.config.js ---
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007BFF', // Default primary color
          dark: '#0056b3',       // Darker shade for hover/active states
        },
        secondary: {
          DEFAULT: '#6C757D',
          dark: '#545b62',
        },
        success: {
          DEFAULT: '#28A745',
          dark: '#1e7e34',
        },
        danger: {
          DEFAULT: '#DC3545',
          dark: '#bd2130',
        },
        warning: {
          DEFAULT: '#FFC107',
          dark: '#d39e00',
        },
        info: {
          DEFAULT: '#17A2B8',
          dark: '#117a8b',
        },
        light: {
          DEFAULT: '#F8F9FA',
          dark: '#dae0e5',
        },
        dark: {
          DEFAULT: '#343A40',
          dark: '#1d2124',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#121212',
        },
        text: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
        },
      },
      fontFamily: {
        'display': ['"Oswald"', 'sans-serif'],
        'body': ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.glass-panel': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      })
    }
  ],
}
```
--- END FILE ---
--- FILE: pages/Home.tsx ---
```typescript
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-background-dark text-white min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-4xl font-bold mb-4 font-display">Welcome to TalentAI</h1>
      <p className="text-lg mb-8">
        Revolutionizing talent management with AI-powered insights.
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
          Login
        </Link>
        <Link to="/dashboard" className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
          Explore Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
```
--- END FILE ---
--- FILE: vite.config.ts ---
```typescript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```
--- END FILE ---