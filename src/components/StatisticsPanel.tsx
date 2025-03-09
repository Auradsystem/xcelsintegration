import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { BarChart, Clock, Camera, Map, Shield, Activity } from 'lucide-react';

const StatisticsPanel: React.FC = () => {
  const { statistics, simulationActive, simulationStep } = useSimulation();
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex-1 border border-gray-700">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Activity className="h-5 w-5 mr-2 text-red-600" />
        XCELS System Statistics
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-blue-500 mb-1">
            <Map className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Detectors</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.totalDetectors}</p>
          <p className="text-xs text-gray-400 mt-1">Across 3 parking levels</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-purple-500 mb-1">
            <Map className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Security Zones</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.totalZones}</p>
          <p className="text-xs text-gray-400 mt-1">Protected areas</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-amber-500 mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Response Time</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {simulationActive ? statistics.averageResponseTime.toFixed(1) : '--'} s
          </p>
          <p className="text-xs text-gray-400 mt-1">Average detection time</p>
        </div>
        
        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
          <div className="flex items-center text-green-500 mb-1">
            <Camera className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Active Cameras</span>
          </div>
          <p className="text-2xl font-bold text-white">{statistics.activeCameras}</p>
          <p className="text-xs text-gray-400 mt-1">Currently monitoring</p>
        </div>
      </div>
      
      {simulationActive && (
        <div className="mt-4 p-3 bg-gray-900 rounded-md border border-gray-700">
          <h3 className="font-medium text-white flex items-center">
            <Shield className="h-4 w-4 mr-2 text-red-600" />
            XCELS Security Response
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${simulationStep >= 1 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`h-1 w-full ${simulationStep >= 2 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${simulationStep >= 2 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`h-1 w-full ${simulationStep >= 3 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${simulationStep >= 3 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`h-1 w-full ${simulationStep >= 4 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${simulationStep >= 4 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`h-1 w-full ${simulationStep >= 5 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${simulationStep >= 5 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`h-1 w-full ${simulationStep >= 6 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`w-3 h-3 rounded-full ${simulationStep >= 6 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Detection</span>
              <span>ESSER</span>
              <span>MOXA</span>
              <span>XCELS</span>
              <span>Camera</span>
              <span>Alarm</span>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
              <div className="text-gray-400">Detection Rate</div>
              <div className="text-white font-medium mt-1">99.8%</div>
            </div>
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
              <div className="text-gray-400">False Alarms</div>
              <div className="text-white font-medium mt-1">0.2%</div>
            </div>
            <div className="bg-gray-800 p-2 rounded border border-gray-700">
              <div className="text-gray-400">System Uptime</div>
              <div className="text-white font-medium mt-1">99.99%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsPanel;
