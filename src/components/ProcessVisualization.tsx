import React, { useEffect, useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SimulationStep } from '../types';
import { ArrowRight, CheckCircle, Clock, AlertTriangle, Shield, Server } from 'lucide-react';

const ProcessVisualization: React.FC = () => {
  const { simulationActive, simulationStep } = useSimulation();
  const [animateArrow, setAnimateArrow] = useState(false);
  
  useEffect(() => {
    if (simulationActive) {
      const interval = setInterval(() => {
        setAnimateArrow(prev => !prev);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setAnimateArrow(false);
    }
  }, [simulationActive]);
  
  const getStepStatus = (step: SimulationStep, currentStep: SimulationStep) => {
    if (currentStep >= step) {
      return 'active';
    } else if (currentStep === step - 1) {
      return 'next';
    } else {
      return 'inactive';
    }
  };
  
  if (!simulationActive) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700 mt-4">
        <h2 className="text-xl font-semibold text-white flex items-center mb-4">
          <Shield className="h-5 w-5 mr-2 text-red-600" />
          Processus d'Intégration
        </h2>
        
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-center text-gray-500">
            <Server className="h-8 w-8 mr-2 opacity-50" />
            <span>Activez une simulation pour visualiser le processus d'intégration</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700 mt-4">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Shield className="h-5 w-5 mr-2 text-red-600" />
        Processus d'Intégration
      </h2>
      
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          {/* XCELS SECURITY Column */}
          <div className="space-y-3">
            <div className="bg-red-600 bg-opacity-20 rounded-md p-2 text-center border border-red-600">
              <span className="font-semibold text-white">XCELS SECURITY</span>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.DETECTOR_ACTIVATED, simulationStep) === 'active' ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.DETECTOR_ACTIVATED, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.DETECTOR_ACTIVATED, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Programmation centrale
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.ESSER_PROCESSING, simulationStep) === 'active' ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.ESSER_PROCESSING, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.ESSER_PROCESSING, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Configuration SEI2
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.MOXA_TRANSMISSION, simulationStep) === 'active' ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.MOXA_TRANSMISSION, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.MOXA_TRANSMISSION, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Câblage MOXA
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.IVPARK_PROCESSING, simulationStep) === 'active' ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.IVPARK_PROCESSING, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.IVPARK_PROCESSING, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Test communication
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Table corrélation
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.ALARM_CONFIRMED, simulationStep) === 'active' ? 'bg-red-900 bg-opacity-20 border-red-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.ALARM_CONFIRMED, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.ALARM_CONFIRMED, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Test sur site
                </span>
              </div>
            </div>
          </div>
          
          {/* Q-PARK Column */}
          <div className="space-y-3">
            <div className="bg-blue-600 bg-opacity-20 rounded-md p-2 text-center border border-blue-600">
              <span className="font-semibold text-white">Q-PARK</span>
            </div>
            
            <div className="rounded-md p-2 border bg-gray-800 border-gray-700 opacity-0">
              <span className="text-sm text-gray-500">Placeholder</span>
            </div>
            
            <div className="rounded-md p-2 border bg-gray-800 border-gray-700 opacity-0">
              <span className="text-sm text-gray-500">Placeholder</span>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.MOXA_TRANSMISSION, simulationStep) === 'active' ? 'bg-blue-900 bg-opacity-20 border-blue-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.MOXA_TRANSMISSION, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.MOXA_TRANSMISSION, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Adressage IP
                </span>
              </div>
            </div>
            
            <div className="rounded-md p-2 border bg-gray-800 border-gray-700 opacity-0">
              <span className="text-sm text-gray-500">Placeholder</span>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? 'bg-blue-900 bg-opacity-20 border-blue-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Test IVPARK
                </span>
              </div>
            </div>
          </div>
          
          {/* NETCELER Column */}
          <div className="space-y-3">
            <div className="bg-green-600 bg-opacity-20 rounded-md p-2 text-center border border-green-600">
              <span className="font-semibold text-white">NETCELER</span>
            </div>
            
            <div className="rounded-md p-2 border bg-gray-800 border-gray-700 opacity-0">
              <span className="text-sm text-gray-500">Placeholder</span>
            </div>
            
            <div className="rounded-md p-2 border bg-gray-800 border-gray-700 opacity-0">
              <span className="text-sm text-gray-500">Placeholder</span>
            </div>
            
            <div className="rounded-md p-2 border bg-gray-800 border-gray-700 opacity-0">
              <span className="text-sm text-gray-500">Placeholder</span>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.IVPARK_PROCESSING, simulationStep) === 'active' ? 'bg-green-900 bg-opacity-20 border-green-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.IVPARK_PROCESSING, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.IVPARK_PROCESSING, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Reprise données
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? 'bg-green-900 bg-opacity-20 border-green-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.CAMERA_VERIFICATION, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Intégration données
                </span>
              </div>
            </div>
            
            <div className={`rounded-md p-2 border ${getStepStatus(SimulationStep.ALARM_CONFIRMED, simulationStep) === 'active' ? 'bg-green-900 bg-opacity-20 border-green-600' : 'bg-gray-800 border-gray-700'}`}>
              <div className="flex items-center">
                {getStepStatus(SimulationStep.ALARM_CONFIRMED, simulationStep) === 'active' ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className={`text-sm ${getStepStatus(SimulationStep.ALARM_CONFIRMED, simulationStep) === 'active' ? 'text-white' : 'text-gray-500'}`}>
                  Validation
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Flow Visualization */}
        <div className="mt-4 relative">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 via-blue-600 to-green-600 rounded-full transition-all duration-500 ease-in-out"
              style={{ 
                width: `${(simulationStep / SimulationStep.ALARM_CONFIRMED) * 100}%`,
                opacity: simulationActive ? 1 : 0
              }}
            ></div>
          </div>
          
          {/* Data Flow Icons */}
          <div className="flex justify-between mt-2">
            <div className={`flex items-center ${simulationStep >= SimulationStep.DETECTOR_ACTIVATED ? 'text-red-600' : 'text-gray-600'}`}>
              <Shield className="h-4 w-4" />
              <span className="text-xs ml-1">Détection</span>
            </div>
            
            <div className={`flex items-center ${simulationStep >= SimulationStep.ESSER_PROCESSING ? 'text-blue-600' : 'text-gray-600'}`}>
              <Server className="h-4 w-4" />
              <span className="text-xs ml-1">Traitement</span>
            </div>
            
            <div className={`flex items-center ${simulationStep >= SimulationStep.MOXA_TRANSMISSION ? 'text-purple-600' : 'text-gray-600'}`}>
              <ArrowRight className={`h-4 w-4 ${animateArrow && simulationStep >= SimulationStep.MOXA_TRANSMISSION ? 'animate-pulse' : ''}`} />
              <span className="text-xs ml-1">Transmission</span>
            </div>
            
            <div className={`flex items-center ${simulationStep >= SimulationStep.IVPARK_PROCESSING ? 'text-green-600' : 'text-gray-600'}`}>
              <Server className="h-4 w-4" />
              <span className="text-xs ml-1">Intégration</span>
            </div>
            
            <div className={`flex items-center ${simulationStep >= SimulationStep.ALARM_CONFIRMED ? 'text-red-600' : 'text-gray-600'}`}>
              <AlertTriangle className={`h-4 w-4 ${simulationStep >= SimulationStep.ALARM_CONFIRMED ? 'animate-pulse' : ''}`} />
              <span className="text-xs ml-1">Alarme</span>
            </div>
          </div>
        </div>
        
        {/* Current Status */}
        <div className="mt-4 p-3 bg-gray-800 rounded-md border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${simulationActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'} mr-2`}></div>
              <span className="text-sm text-gray-300">Statut: {simulationActive ? 'Traitement en cours' : 'Inactif'}</span>
            </div>
            
            <div className="text-xs text-gray-500">
              XCELS SECURITY SERVICES ↔ IVPARK GTC
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessVisualization;
