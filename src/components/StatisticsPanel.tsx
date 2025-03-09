import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Clock, Camera, Map, Shield } from 'lucide-react';

const StatisticsPanel: React.FC = () => {
  const { statistics, simulationActive, simulationStep } = useSimulation();
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex-1 border border-gray-700">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Shield className="h-5 w-5 mr-2 text-red-600" />
        Informations Système
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-blue-500 mb-1">
            <Map className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Détecteurs</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.totalDetectors}</p>
          <p className="text-xs text-gray-400 mt-1">Actifs sur 3 niveaux</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-purple-500 mb-1">
            <Map className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Zones</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.totalZones}</p>
          <p className="text-xs text-gray-400 mt-1">Zones surveillées</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-amber-500 mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Temps de Réponse</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {simulationActive ? statistics.averageResponseTime.toFixed(1) : '--'} s
          </p>
          <p className="text-xs text-gray-400 mt-1">Délai moyen</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-green-500 mb-1">
            <Camera className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Caméras</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.activeCameras}</p>
          <p className="text-xs text-gray-400 mt-1">En surveillance</p>
        </div>
      </div>
      
      {simulationActive && (
        <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700">
          <h3 className="font-medium text-white flex items-center">
            <Shield className="h-4 w-4 mr-2 text-red-600" />
            État de la Connexion IVPARK
          </h3>
          <div className="mt-2 flex items-center">
            <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Connecté à la GTC IVPARK de Netceler</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
