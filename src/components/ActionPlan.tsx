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
        XCELS Emergency Response Protocol
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gray-900 p-3 rounded-md border-l-4 border-red-600">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <PhoneCall className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white">Step 1: Contact Emergency Services</h3>
              <p className="text-sm mt-1 text-gray-300">
                Immediately call 18 or 112 to report the fire and provide precise location details.
              </p>
              <button
                className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 flex items-center"
                onClick={() => completeActionStep(0)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirm Call
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
              <h3 className="text-sm font-medium text-white">Step 2: Evacuate Area</h3>
              <p className="text-sm mt-1 text-gray-300">
                Initiate evacuation of affected level and adjacent levels. Direct people to emergency exits.
              </p>
              <button
                className="mt-2 px-3 py-1 bg-amber-600 text-white text-sm rounded-md hover:bg-amber-700 flex items-center"
                onClick={() => completeActionStep(1)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirm Evacuation
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
              <h3 className="text-sm font-medium text-white">Step 3: Secure Access Points</h3>
              <p className="text-sm mt-1 text-gray-300">
                Block parking access and prepare for emergency services arrival. Provide access plans.
              </p>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center"
                onClick={() => completeActionStep(2)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Confirm Security
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700">
        <h3 className="font-medium text-white flex items-center">
          <AlertOctagon className="h-4 w-4 mr-2 text-red-600" />
          XCELS Security Response Status
        </h3>
        <p className="text-sm mt-2 text-gray-300">
          Complete all action steps to finalize the emergency response protocol.
        </p>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>XCELS Protocol ID: XP-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
          <span>Response Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ActionPlan;
