import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { CheckCircle, AlertOctagon, PhoneCall, Users, Building, Shield } from 'lucide-react';
import { SimulationStep } from '../types';

const ActionPlan: React.FC = () => {
  const { simulationStep, completeActionStep } = useSimulation();
  
  // Only show action plan when alarm is confirmed
  if (simulationStep !== SimulationStep.ALARM_CONFIRMED) {
    return null;
  }
  
  return (
    <div className="bg-red-900 bg-opacity-20 rounded-lg shadow-md p-4 border-2 border-red-600 animate-pulse">
      <h2 className="text-xl font-semibold text-red-500 flex items-center mb-4">
        <Shield className="h-5 w-5 mr-2" />
        Protocole d'Intervention
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gray-900 p-3 rounded-md border-l-4 border-red-600">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <PhoneCall className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Étape 1: Contacter les Services d'Urgence</h3>
              <p className="text-sm mt-1 text-gray-300">
                Appelez immédiatement le 18 ou le 112 pour signaler l'incendie.
              </p>
              <button
                className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center"
                onClick={() => completeActionStep(0)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirmer l'Appel
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border-l-4 border-amber-500">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <Users className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Étape 2: Évacuer la Zone</h3>
              <p className="text-sm mt-1 text-gray-300">
                Lancez l'évacuation du niveau concerné et des niveaux adjacents.
              </p>
              <button
                className="mt-2 px-3 py-1 bg-amber-600 text-white text-sm rounded-md hover:bg-amber-700 flex items-center"
                onClick={() => completeActionStep(1)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirmer l'Évacuation
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border-l-4 border-blue-500">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <Building className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Étape 3: Sécuriser les Accès</h3>
              <p className="text-sm mt-1 text-gray-300">
                Bloquez l'accès au parking et préparez l'arrivée des secours.
              </p>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center"
                onClick={() => completeActionStep(2)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirmer la Sécurisation
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700">
        <h3 className="font-medium text-white flex items-center">
          <AlertOctagon className="h-4 w-4 mr-2 text-red-600" />
          Statut d'Intervention
        </h3>
        <p className="text-sm mt-2 text-gray-300">
          Complétez toutes les étapes pour finaliser le protocole d'intervention.
        </p>
      </div>
    </div>
  );
};

export default ActionPlan;
