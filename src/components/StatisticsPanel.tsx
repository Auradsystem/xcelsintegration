import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Clock, Camera, Map, Shield, Activity, Server } from 'lucide-react';

const StatisticsPanel: React.FC = () => {
  const { statistics, simulationActive, simulationStep } = useSimulation();
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex-1 border border-gray-700 hover-scale">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Activity className="h-5 w-5 mr-2 text-red-600" />
        Informations Système
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700 glass-panel hover:border-blue-600 transition-colors duration-300">
          <div className="flex items-center text-blue-500 mb-1">
            <Map className="h-4 w-4 mr-1 glow-icon" />
            <span className="text-sm font-medium">Détecteurs</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.totalDetectors}</p>
          <p className="text-xs text-gray-400 mt-1">Actifs sur 3 niveaux</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700 glass-panel hover:border-purple-600 transition-colors duration-300">
          <div className="flex items-center text-purple-500 mb-1">
            <Map className="h-4 w-4 mr-1 glow-icon" />
            <span className="text-sm font-medium">Zones</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.totalZones}</p>
          <p className="text-xs text-gray-400 mt-1">Zones surveillées</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700 glass-panel hover:border-amber-600 transition-colors duration-300">
          <div className="flex items-center text-amber-500 mb-1">
            <Clock className="h-4 w-4 mr-1 glow-icon" />
            <span className="text-sm font-medium">Temps de Réponse</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {simulationActive ? statistics.averageResponseTime.toFixed(1) : '--'} s
          </p>
          <p className="text-xs text-gray-400 mt-1">Délai moyen</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700 glass-panel hover:border-green-600 transition-colors duration-300">
          <div className="flex items-center text-green-500 mb-1">
            <Camera className="h-4 w-4 mr-1 glow-icon" />
            <span className="text-sm font-medium">Caméras</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.activeCameras}</p>
          <p className="text-xs text-gray-400 mt-1">En surveillance</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700 glass-panel">
        <h3 className="font-medium text-white flex items-center">
          <Server className="h-4 w-4 mr-2 text-blue-600 glow-icon" />
          État de la Connexion IVPARK
        </h3>
        <div className="mt-2 flex items-center">
          <div className="h-2 w-2 bg-green-500 rounded-full mr-2 pulse-slow"></div>
          <span className="text-sm text-gray-300">Connecté à la GTC IVPARK de Netceler</span>
        </div>
        
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 data-flow" style={{ width: '85%' }}></div>
        </div>
        
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Trafic: Normal</span>
          <span>Latence: 24ms</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
