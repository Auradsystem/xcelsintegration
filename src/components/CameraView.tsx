import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Maximize2, Minimize2, Camera, Video, AlertTriangle, Shield } from 'lucide-react';
import { SimulationStep } from '../types';

const CameraView: React.FC = () => {
  const { 
    activeCamera, 
    showCameraFullscreen, 
    setShowCameraFullscreen,
    simulationStep,
    simulationActive,
    activeDetector
  } = useSimulation();
  
  const [smokeEffect, setSmokeEffect] = useState(0);
  const [flameEffect, setFlameEffect] = useState(0);
  const [motionDetected, setMotionDetected] = useState(false);
  const [carFireIntensity, setCarFireIntensity] = useState(0);
  
  // Increase smoke and flame effects as simulation progresses
  useEffect(() => {
    if (simulationActive && simulationStep >= SimulationStep.CAMERA_VERIFICATION) {
      const smokeInterval = setInterval(() => {
        setSmokeEffect(prev => Math.min(prev + 0.05, 0.7));
      }, 500);
      
      const flameInterval = setInterval(() => {
        setFlameEffect(prev => Math.min(prev + 0.1, 1));
      }, 1000);
      
      const carFireInterval = setInterval(() => {
        setCarFireIntensity(prev => Math.min(prev + 0.08, 1));
      }, 800);
      
      const motionInterval = setInterval(() => {
        setMotionDetected(prev => !prev);
      }, 2000);
      
      return () => {
        clearInterval(smokeInterval);
        clearInterval(flameInterval);
        clearInterval(carFireInterval);
        clearInterval(motionInterval);
      };
    } else {
      setSmokeEffect(0);
      setFlameEffect(0);
      setCarFireIntensity(0);
      setMotionDetected(false);
    }
  }, [simulationActive, simulationStep]);
  
  if (!activeCamera && !simulationActive) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-4 flex-1 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Camera className="h-5 w-5 mr-2 text-red-600" />
          Surveillance Caméra
        </h2>
        <div className="bg-gray-900 rounded-md h-64 flex items-center justify-center border border-gray-700">
          <div className="text-center text-gray-500">
            <Camera className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>Aucune caméra sélectionnée</p>
            <p className="text-sm mt-1">Activez un détecteur pour voir le flux vidéo</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${showCameraFullscreen ? 'fixed inset-0 z-50 bg-black p-4' : 'bg-gray-800 rounded-lg shadow-md p-4 flex-1 border border-gray-700'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold text-white flex items-center`}>
          <Video className="h-5 w-5 mr-2 text-red-600" />
          Caméra {activeCamera?.id}
        </h2>
        
        <div className="flex items-center space-x-3">
          {simulationActive && simulationStep >= SimulationStep.CAMERA_VERIFICATION && (
            <div className="bg-red-600 px-2 py-1 rounded text-white text-xs animate-pulse flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              FUMÉE DÉTECTÉE
            </div>
          )}
          
          <button
            className={`p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600`}
            onClick={() => setShowCameraFullscreen(!showCameraFullscreen)}
          >
            {showCameraFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      <div className="relative rounded-md overflow-hidden">
        {/* Camera feed */}
        <img
          src={activeCamera?.imageUrl || "https://source.unsplash.com/800x600/?parking,garage"}
          alt="Flux caméra"
          className={`w-full ${showCameraFullscreen ? 'h-[calc(100vh-120px)]' : 'h-64'} object-cover`}
        />
        
        {/* Smoke effect overlay */}
        {smokeEffect > 0 && (
          <div 
            className="absolute inset-0 bg-gray-500 mix-blend-multiply pointer-events-none"
            style={{ opacity: smokeEffect }}
          ></div>
        )}
        
        {/* Car fire simulation */}
        {carFireIntensity > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Car silhouette */}
            <div className="absolute left-1/2 bottom-1/4 transform -translate-x-1/2 w-64 h-32">
              {/* Car body */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-16 bg-gray-800 rounded-md"
                style={{ opacity: Math.max(0, 1 - carFireIntensity * 0.7) }}
              ></div>
              
              {/* Car windows */}
              <div 
                className="absolute bottom-16 left-8 right-8 h-10 bg-gray-700 rounded-t-md"
                style={{ opacity: Math.max(0, 1 - carFireIntensity * 0.8) }}
              ></div>
              
              {/* Car wheels */}
              <div 
                className="absolute bottom-2 left-6 w-10 h-10 bg-gray-900 rounded-full"
                style={{ opacity: Math.max(0, 1 - carFireIntensity * 0.6) }}
              ></div>
              <div 
                className="absolute bottom-2 right-6 w-10 h-10 bg-gray-900 rounded-full"
                style={{ opacity: Math.max(0, 1 - carFireIntensity * 0.6) }}
              ></div>
              
              {/* Fire base */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-24 bg-gradient-to-t from-orange-600 via-red-500 to-yellow-400 rounded-t-full opacity-70 animate-pulse"
                style={{ opacity: carFireIntensity * 0.7 }}
              ></div>
              
              {/* Multiple flame elements */}
              <div 
                className="absolute bottom-8 left-1/4 transform -translate-x-1/2 w-16 h-32 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-t-full animate-flame-1"
                style={{ opacity: carFireIntensity * 0.8 }}
              ></div>
              <div 
                className="absolute bottom-8 left-2/4 transform -translate-x-1/2 w-20 h-40 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-t-full animate-flame-2"
                style={{ opacity: carFireIntensity * 0.9 }}
              ></div>
              <div 
                className="absolute bottom-8 left-3/4 transform -translate-x-1/2 w-16 h-28 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-t-full animate-flame-3"
                style={{ opacity: carFireIntensity * 0.8 }}
              ></div>
              
              {/* Sparks */}
              {Array.from({ length: Math.floor(carFireIntensity * 15) }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-spark"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: `${Math.random() * 50 + 20}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 2 + 1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Camera UI overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-70 flex justify-between items-center">
            <div className="flex items-center">
              {/* XCELS mini logo */}
              <div className="relative h-5 w-5 mr-2">
                <div className="absolute inset-0 bg-red-600 rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45"></div>
                <div className="absolute inset-0.5 bg-black rounded-tl-full rounded-tr-full rounded-br-full transform rotate-45"></div>
              </div>
              <span className="text-white text-xs font-bold">
                XCELS SECURITY
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-300">{activeCamera?.id} - Zone {activeCamera?.zone}</span>
              <span className="text-xs text-gray-300">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${motionDetected ? 'bg-red-600 animate-pulse' : 'bg-green-500'} mr-1`}></div>
                  <span className="text-xs text-gray-300">{motionDetected ? 'MOUVEMENT' : 'STABLE'}</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${simulationStep >= SimulationStep.CAMERA_VERIFICATION ? 'bg-red-600 animate-pulse' : 'bg-green-500'} mr-1`}></div>
                  <span className="text-xs text-gray-300">{simulationStep >= SimulationStep.CAMERA_VERIFICATION ? 'FUMÉE' : 'NORMAL'}</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-300">
                XCELS-CAM-{activeCamera?.id}
              </div>
            </div>
          </div>
          
          {/* Corner elements */}
          <div className="absolute top-2 left-2">
            <div className="w-16 h-16 border-2 border-l-0 border-b-0 border-red-600 opacity-70"></div>
          </div>
          
          <div className="absolute top-2 right-2">
            <div className="w-16 h-16 border-2 border-r-0 border-b-0 border-red-600 opacity-70"></div>
          </div>
          
          <div className="absolute bottom-2 left-2">
            <div className="w-16 h-16 border-2 border-l-0 border-t-0 border-red-600 opacity-70"></div>
          </div>
          
          <div className="absolute bottom-2 right-2">
            <div className="w-16 h-16 border-2 border-r-0 border-t-0 border-red-600 opacity-70"></div>
          </div>
          
          {/* Crosshair */}
          {simulationStep >= SimulationStep.CAMERA_VERIFICATION && (
            <>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-600 opacity-30"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-600 opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-red-600 rounded-full opacity-30"></div>
            </>
          )}
        </div>
        
        {/* Alert overlay when alarm confirmed */}
        {simulationStep === SimulationStep.ALARM_CONFIRMED && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black bg-opacity-80 border-2 border-red-600 text-white px-6 py-4 rounded-md animate-pulse">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-xl font-bold text-red-600">ALARME INCENDIE</h3>
              </div>
              <p className="text-center">Zone {activeCamera?.zone}</p>
              <p className="text-center text-sm mt-1">INTERVENTION INITIÉE</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Camera controls and info */}
      <div className={`mt-3 text-sm text-gray-400`}>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Shield className="h-4 w-4 mr-1 text-red-600" />
            <span>Zone de Sécurité {activeCamera?.zone}</span>
          </div>
          <span>Angle de Caméra: {activeCamera?.angle}°</span>
        </div>
        
        {simulationStep >= SimulationStep.CAMERA_VERIFICATION && (
          <div className="mt-2 bg-red-900 bg-opacity-30 border border-red-800 rounded p-2">
            <div className="flex items-center text-red-500 font-medium animate-pulse">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>DÉTECTION: Fumée détectée à l'emplacement {activeDetector?.id.split('-')[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraView;
