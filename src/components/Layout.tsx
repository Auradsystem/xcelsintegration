import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { AlertTriangle, Bell, Volume2, Shield, Clock } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { simulationActive, simulationStep, volume, setVolume } = useSimulation();
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-black text-white shadow-md border-b border-red-600">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* XCELS SECURITY SERVICE Logo */}
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-red-600 rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45"></div>
                <div className="absolute inset-1 bg-black rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-2 bg-white rounded-full ml-1 mt-1"></div>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider">
                  <span className="text-white">XCEL</span>
                  <span className="text-red-600">SÉCURITÉ</span>
                  <span className="text-white">SERVICES</span>
                </span>
                <div className="text-xs text-gray-400">SYSTÈME DE SURVEILLANCE DÉTECTION INCENDIE</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* System Status */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">{new Date().toLocaleTimeString()}</span>
            </div>
            
            {simulationActive && (
              <div className="flex items-center bg-red-600 px-3 py-1 rounded-full animate-pulse">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">ALERTE EN COURS</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-24 accent-red-600"
              />
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-400">SYSTÈME ACTIF</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-black text-gray-400 py-3 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div>
            <p>© {new Date().getFullYear()} XCELS SÉCURITÉ SERVICES - Système de Détection Incendie Q-PARK</p>
          </div>
          <div className="flex items-center space-x-4">
            <span>Version 2.1.0</span>
            <span>|</span>
            <span className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              Tous les Systèmes Opérationnels
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
