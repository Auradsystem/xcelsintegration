import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { AlertTriangle, Bell, Volume2, Shield, Clock, Menu, X, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { simulationActive, simulationStep, volume, setVolume, notifications } = useSimulation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadNotifications = notifications.filter(n => !n.read).length;
  
  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-black text-white shadow-md border-b border-red-600 relative z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-1 rounded-md text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* XCELS SECURITY SERVICES Logo */}
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-red-600 rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45 glow-icon"></div>
                <div className="absolute inset-1 bg-black rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-2 bg-white rounded-full ml-1 mt-1"></div>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider">
                  <span className="text-white">XCELS</span>
                  <span className="text-red-600 glow-text">SECURITY</span>
                  <span className="text-white">SERVICES</span>
                </span>
                <div className="text-xs text-gray-400">SYSTÈME DE DÉTECTION INCENDIE</div>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className={`md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0 py-0 overflow-hidden'}`}>
            <div className="container mx-auto px-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{currentTime.toLocaleTimeString()}</span>
                </div>
                
                {simulationActive && (
                  <div className="flex items-center bg-red-600 px-3 py-1 rounded-full animate-pulse">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">ALERTE EN COURS</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-md">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-400">SYSTÈME ACTIF</span>
              </div>
            </div>
          </div>
          
          {/* Desktop controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* System Status */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">{currentTime.toLocaleTimeString()}</span>
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
            
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full text-xs flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-md gradient-border">
              <Shield className="h-4 w-4 text-green-500 glow-icon" />
              <span className="text-sm text-green-400">SYSTÈME ACTIF</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Breadcrumb navigation */}
      <div className="bg-gray-800 py-2 px-4 border-b border-gray-700">
        <div className="container mx-auto">
          <div className="flex items-center text-sm text-gray-400">
            <span className="text-white">Tableau de bord</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Surveillance Q-PARK</span>
            {simulationActive && (
              <>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-red-500">Alerte Incendie</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-black text-gray-400 py-3 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <div>
            <p>© {new Date().getFullYear()} XCELS SECURITY SERVICES - Système de Détection Incendie Q-PARK</p>
          </div>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <span>Version 2.1.0</span>
            <span>|</span>
            <span className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2 pulse-slow"></div>
              Connecté à IVPARK GTC
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
