import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Flame, RotateCcw, AlertTriangle, Shield, Lock, Bell } from 'lucide-react';
import { SimulationStep } from '../types';

const ControlPanel: React.FC = () => {
  const { 
    simulationActive, 
    startSimulation, 
    resetSimulation, 
    activeDetector,
    simulationStep
  } = useSimulation();
  
  const getStepProgress = (): number => {
    switch (simulationStep) {
      case SimulationStep.IDLE:
        return 0;
      case SimulationStep.DETECTOR_ACTIVATED:
        return 20;
      case SimulationStep.ESSER_PROCESSING:
        return 40;
      case SimulationStep.MOXA_TRANSMISSION:
        return 60;
      case SimulationStep.IVPARK_PROCESSING:
        return 80;
      case SimulationStep.CAMERA_VERIFICATION:
        return 90;
      case SimulationStep.ALARM_CONFIRMED:
        return 100;
      default:
        return 0;
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-red-600" />
        Panneau de Contrôle
      </h2>
      
      <div className="space-y-4">
        <button
          className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 ${
            simulationActive
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          onClick={startSimulation}
          disabled={simulationActive}
        >
          <Flame className="h-5 w-5" />
          <span>Simuler une Détection d'Incendie</span>
        </button>
        
        <button
          className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2 ${
            !simulationActive
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          onClick={resetSimulation}
          disabled={!simulationActive}
        >
          <RotateCcw className="h-5 w-5" />
          <span>Réinitialiser la Simulation</span>
        </button>
        
        {simulationActive && (
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progression</span>
              <span>{getStepProgress()}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700">
              <h3 className="font-medium text-white flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                Statut Actuel
              </h3>
              <p className="text-sm mt-2 text-gray-300">
                {simulationStep === SimulationStep.IDLE && 'En attente de détection'}
                {simulationStep === SimulationStep.DETECTOR_ACTIVATED && 'Détecteur activé'}
                {simulationStep === SimulationStep.ESSER_PROCESSING && 'Traitement système ESSER'}
                {simulationStep === SimulationStep.MOXA_TRANSMISSION && 'Transmission MOXA en cours'}
                {simulationStep === SimulationStep.IVPARK_PROCESSING && 'Traitement système IVPARK'}
                {simulationStep === SimulationStep.CAMERA_VERIFICATION && 'Vérification caméra en cours'}
                {simulationStep === SimulationStep.ALARM_CONFIRMED && 'ALARME CONFIRMÉE - INTERVENTION D\'URGENCE INITIÉE'}
              </p>
              
              {activeDetector && (
                <div className="mt-3 text-sm text-gray-300 p-2 bg-gray-800 rounded border border-gray-700">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium flex items-center">
                      <Lock className="h-3 w-3 mr-1 text-red-600" />
                      Informations de Sécurité
                    </span>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">SEC-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">ID Détecteur:</span>
                      <span className="ml-1 text-white">{activeDetector.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Zone:</span>
                      <span className="ml-1 text-white">{activeDetector.zone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Statut:</span>
                      <span className="ml-1 text-red-500">ACTIF</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Réponse:</span>
                      <span className="ml-1 text-blue-400">NIVEAU {simulationStep >= SimulationStep.ALARM_CONFIRMED ? '1' : '2'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {simulationStep >= SimulationStep.ALARM_CONFIRMED && (
              <div className="mt-3 p-3 bg-red-900 bg-opacity-30 rounded-md border border-red-800 animate-pulse">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-red-600" />
                  <h3 className="font-medium text-red-500">ALERTE D'URGENCE</h3>
                </div>
                <p className="text-sm mt-2 text-gray-300">
                  Incendie détecté dans la zone {activeDetector?.zone}. L'équipe d'intervention a été notifiée.
                </p>
              </div>
            )}
          </div>
        )}
        
        {!simulationActive && (
          <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              <h3 className="font-medium text-white">Système Prêt</h3>
            </div>
            <p className="text-sm mt-2 text-gray-300">
              Le système de surveillance est actif et prêt. Cliquez sur "Simuler une Détection d'Incendie" pour tester la réponse du système.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-400">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                <span>Détecteurs En Ligne</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                <span>Caméras Actives</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
