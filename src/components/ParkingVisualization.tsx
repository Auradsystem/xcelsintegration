import React, { useRef, useEffect, useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SimulationStep } from '../types';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { Shield, AlertTriangle } from 'lucide-react';

const ParkingVisualization: React.FC = () => {
  const { 
    parkingLevels, 
    currentLevel, 
    setCurrentLevel, 
    activateDetector, 
    activeDetector,
    simulationActive,
    simulationStep
  } = useSimulation();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  const [hoveredDetector, setHoveredDetector] = useState<string | null>(null);
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
  
  // Animation states
  const [smokeParticles, setSmokeParticles] = useState<Array<{x: number, y: number, size: number, opacity: number, speed: number}>>([]);
  const [dataPackets, setDataPackets] = useState<Array<{x: number, y: number, targetX: number, targetY: number, progress: number, step: SimulationStep}>>([]);
  
  const smokeAnimation = useAnimationFrame((_, deltaTime) => {
    if (simulationStep >= SimulationStep.DETECTOR_ACTIVATED && activeDetector) {
      // Add new smoke particles
      if (Math.random() > 0.7) {
        const newParticle = {
          x: activeDetector.coordinates.x + (Math.random() * 20 - 10),
          y: activeDetector.coordinates.y + (Math.random() * 20 - 10),
          size: Math.random() * 15 + 5,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.5 + 0.1
        };
        setSmokeParticles(prev => [...prev, newParticle]);
      }
      
      // Update existing particles
      setSmokeParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            y: particle.y - particle.speed * (deltaTime / 16),
            size: particle.size + 0.05 * (deltaTime / 16),
            opacity: particle.opacity - 0.002 * (deltaTime / 16)
          }))
          .filter(particle => particle.opacity > 0)
      );
    }
  });
  
  const dataAnimation = useAnimationFrame((_, deltaTime) => {
    if (simulationStep >= SimulationStep.ESSER_PROCESSING) {
      // Add new data packets based on current step
      if (Math.random() > 0.9) {
        let source = { x: 0, y: 0 };
        let target = { x: 0, y: 0 };
        
        if (activeDetector) {
          source = { ...activeDetector.coordinates };
          
          // Determine target based on current step
          switch (simulationStep) {
            case SimulationStep.ESSER_PROCESSING:
              target = { x: canvasSize.width - 100, y: 50 }; // ESSER position
              break;
            case SimulationStep.MOXA_TRANSMISSION:
              target = { x: canvasSize.width - 100, y: 150 }; // MOXA position
              break;
            case SimulationStep.IVPARK_PROCESSING:
            case SimulationStep.CAMERA_VERIFICATION:
            case SimulationStep.ALARM_CONFIRMED:
              target = { x: canvasSize.width - 100, y: 250 }; // IVPARK position
              break;
            default:
              break;
          }
          
          const newPacket = {
            x: source.x,
            y: source.y,
            targetX: target.x,
            targetY: target.y,
            progress: 0,
            step: simulationStep
          };
          
          setDataPackets(prev => [...prev, newPacket]);
        }
      }
      
      // Update existing packets
      setDataPackets(prev => 
        prev
          .map(packet => {
            const speed = 0.003 * (deltaTime / 16);
            return {
              ...packet,
              progress: Math.min(packet.progress + speed, 1)
            };
          })
          .filter(packet => packet.progress < 1)
      );
    }
  });
  
  // Start animations when simulation is active
  useEffect(() => {
    if (simulationActive) {
      smokeAnimation.start();
      dataAnimation.start();
    } else {
      smokeAnimation.stop();
      dataAnimation.stop();
      setSmokeParticles([]);
      setDataPackets([]);
    }
    
    return () => {
      smokeAnimation.stop();
      dataAnimation.stop();
    };
  }, [simulationActive, simulationStep]);
  
  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        setCanvasSize({
          width: container.clientWidth,
          height: Math.min(500, window.innerHeight * 0.5)
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Draw the parking level
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const level = parkingLevels[currentLevel];
    if (!level) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw paths
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    level.paths.forEach(path => {
      ctx.beginPath();
      path.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
    
    // Draw parking spots
    level.spots.forEach(spot => {
      ctx.save();
      ctx.translate(spot.coordinates.x, spot.coordinates.y);
      ctx.rotate((spot.angle * Math.PI) / 180);
      
      // Draw spot rectangle
      const isHovered = spot.id === hoveredSpot;
      ctx.strokeStyle = isHovered ? '#E11D48' : '#475569';
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.strokeRect(-25, -12.5, 50, 25);
      
      // Draw spot ID
      if (isHovered || simulationActive) {
        ctx.fillStyle = '#CBD5E1';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(spot.id, 0, 0);
      }
      
      ctx.restore();
    });
    
    // Draw vehicles
    level.vehicles.forEach(vehicle => {
      const spot = level.spots.find(s => s.id === vehicle.spotId);
      if (!spot) return;
      
      ctx.save();
      ctx.translate(spot.coordinates.x, spot.coordinates.y);
      ctx.rotate((spot.angle * Math.PI) / 180);
      
      // Draw vehicle based on type
      ctx.fillStyle = vehicle.color;
      
      switch (vehicle.type) {
        case 'sedan':
          // Draw sedan shape
          ctx.fillRect(-20, -10, 40, 20);
          ctx.fillStyle = '#94A3B8';
          ctx.fillRect(-15, -8, 10, 16); // Windows
          ctx.fillRect(5, -8, 10, 16);
          break;
        case 'suv':
          // Draw SUV shape
          ctx.fillRect(-22, -11, 44, 22);
          ctx.fillStyle = '#94A3B8';
          ctx.fillRect(-17, -9, 34, 18); // Windows
          break;
        case 'compact':
          // Draw compact shape
          ctx.fillRect(-18, -9, 36, 18);
          ctx.fillStyle = '#94A3B8';
          ctx.fillRect(-13, -7, 8, 14); // Windows
          ctx.fillRect(5, -7, 8, 14);
          break;
      }
      
      ctx.restore();
    });
    
    // Draw structural elements
    level.structuralElements.forEach(element => {
      ctx.save();
      ctx.translate(element.coordinates.x, element.coordinates.y);
      
      switch (element.type) {
        case 'column':
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(-10, -10, 20, 20);
          break;
        case 'ramp':
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(-40, -75, 80, 150);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-30, -65);
          ctx.lineTo(30, 65);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-30, 65);
          ctx.lineTo(30, -65);
          ctx.stroke();
          break;
        case 'elevator':
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(-20, -20, 40, 40);
          ctx.strokeStyle = '#334155';
          ctx.strokeRect(-20, -20, 40, 40);
          ctx.strokeRect(-15, -15, 30, 30);
          break;
        case 'stairs':
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(-20, -40, 40, 80);
          // Draw stairs lines
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1;
          for (let i = -35; i <= 35; i += 10) {
            ctx.beginPath();
            ctx.moveTo(-15, i);
            ctx.lineTo(15, i);
            ctx.stroke();
          }
          break;
      }
      
      ctx.restore();
    });
    
    // Draw detectors
    level.detectors.forEach(detector => {
      ctx.save();
      ctx.translate(detector.coordinates.x, detector.coordinates.y);
      
      // Determine detector color based on status
      let detectorColor = '#10B981'; // Normal - green
      if (detector.status === 'fault') {
        detectorColor = '#F59E0B'; // Fault - yellow
      } else if (detector.status === 'active' || detector.id === activeDetector?.id) {
        detectorColor = '#E11D48'; // Active - red
      }
      
      // Highlight hovered detector
      if (detector.id === hoveredDetector) {
        ctx.shadowColor = 'rgba(225, 29, 72, 0.8)'; // Red glow
        ctx.shadowBlur = 15;
      }
      
      // Draw detector hexagon
      ctx.fillStyle = detectorColor;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = Math.cos(angle) * 8;
        const y = Math.sin(angle) * 8;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      
      // Draw detector ID and zone
      if (detector.id === hoveredDetector || detector.id === activeDetector?.id) {
        // Draw background for text
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fillRect(-40, -40, 80, 30);
        ctx.strokeStyle = detectorColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(-40, -40, 80, 30);
        
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(detector.id, 0, -30);
        ctx.fillText(`Zone ${detector.zone}`, 0, -15);
        
        // Draw connection lines to nearby parking spots
        const nearbySpots = level.spots.filter(spot => {
          const dx = spot.coordinates.x - detector.coordinates.x;
          const dy = spot.coordinates.y - detector.coordinates.y;
          return Math.sqrt(dx * dx + dy * dy) < 100;
        });
        
        ctx.strokeStyle = 'rgba(225, 29, 72, 0.4)'; // Red
        ctx.setLineDash([2, 2]);
        nearbySpots.forEach(spot => {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(
            spot.coordinates.x - detector.coordinates.x,
            spot.coordinates.y - detector.coordinates.y
          );
          ctx.stroke();
        });
        ctx.setLineDash([]);
      }
      
      ctx.restore();
    });
    
    // Draw cameras
    level.cameras.forEach(camera => {
      ctx.save();
      ctx.translate(camera.coordinates.x, camera.coordinates.y);
      ctx.rotate((camera.angle * Math.PI) / 180);
      
      // Draw camera shape
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(-8, -6, 16, 12);
      ctx.strokeStyle = '#E11D48'; // Red
      ctx.lineWidth = 1;
      ctx.strokeRect(-8, -6, 16, 12);
      
      // Camera lens
      ctx.fillStyle = '#E11D48'; // Red
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Camera ID
      ctx.fillStyle = 'white';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(camera.id, 0, -15);
      
      // Draw camera field of view
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.2)'; // Red
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 60, -Math.PI / 4, Math.PI / 4);
      ctx.lineTo(0, 0);
      ctx.stroke();
      ctx.fillStyle = 'rgba(225, 29, 72, 0.1)'; // Red
      ctx.fill();
      
      ctx.restore();
    });
    
    // Draw smoke particles
    smokeParticles.forEach(particle => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = simulationStep >= SimulationStep.ALARM_CONFIRMED ? 'rgba(225, 29, 72, 0.7)' : 'rgba(148, 163, 184, 0.7)';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw data packets
    dataPackets.forEach(packet => {
      const x = packet.x + (packet.targetX - packet.x) * packet.progress;
      const y = packet.y + (packet.targetY - packet.y) * packet.progress;
      
      ctx.save();
      
      // Different colors for different steps
      let packetColor = '#3B82F6'; // Default blue
      switch (packet.step) {
        case SimulationStep.ESSER_PROCESSING:
          packetColor = '#3B82F6'; // Blue
          break;
        case SimulationStep.MOXA_TRANSMISSION:
          packetColor = '#8B5CF6'; // Purple
          break;
        case SimulationStep.IVPARK_PROCESSING:
        case SimulationStep.CAMERA_VERIFICATION:
        case SimulationStep.ALARM_CONFIRMED:
          packetColor = '#E11D48'; // Red
          break;
      }
      
      ctx.fillStyle = packetColor;
      ctx.shadowColor = packetColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
    
    // Draw system components on the right side
    if (simulationActive) {
      // ESSER System
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(canvas.width - 130, 20, 110, 50);
      ctx.strokeStyle = simulationStep >= SimulationStep.ESSER_PROCESSING ? '#3B82F6' : '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width - 130, 20, 110, 50);
      
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTÈME ESSER', canvas.width - 75, 40);
      ctx.fillStyle = simulationStep >= SimulationStep.ESSER_PROCESSING ? '#3B82F6' : '#334155';
      ctx.beginPath();
      ctx.arc(canvas.width - 115, 55, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // MOXA System
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(canvas.width - 130, 80, 110, 50);
      ctx.strokeStyle = simulationStep >= SimulationStep.MOXA_TRANSMISSION ? '#8B5CF6' : '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width - 130, 80, 110, 50);
      
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTÈME MOXA', canvas.width - 75, 100);
      ctx.fillStyle = simulationStep >= SimulationStep.MOXA_TRANSMISSION ? '#8B5CF6' : '#334155';
      ctx.beginPath();
      ctx.arc(canvas.width - 115, 115, 5, 0, Math.PI * 2);
      ctx.fill();
      
      // IVPARK System
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(canvas.width - 130, 140, 110, 50);
      ctx.strokeStyle = simulationStep >= SimulationStep.IVPARK_PROCESSING ? '#E11D48' : '#334155';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width - 130, 140, 110, 50);
      
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTÈME IVPARK', canvas.width - 75, 160);
      ctx.fillStyle = simulationStep >= SimulationStep.IVPARK_PROCESSING ? '#E11D48' : '#334155';
      ctx.beginPath();
      ctx.arc(canvas.width - 115, 175, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw logo watermark
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    // Shield shape
    ctx.fillStyle = '#E11D48';
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.bezierCurveTo(40, -50, 60, -30, 60, 20);
    ctx.bezierCurveTo(60, 50, 30, 70, 0, 80);
    ctx.bezierCurveTo(-30, 70, -60, 50, -60, 20);
    ctx.bezierCurveTo(-60, -30, -40, -50, 0, -50);
    ctx.fill();
    
    ctx.restore();
    
    // Draw level indicator
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(10, 10, 100, 30);
    ctx.strokeStyle = '#E11D48';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 100, 30);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`NIVEAU ${level.name}`, 60, 25);
    
    // Draw security status indicator
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(10, canvas.height - 40, 150, 30);
    ctx.strokeStyle = simulationActive ? '#E11D48' : '#10B981';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, canvas.height - 40, 150, 30);
    
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      simulationActive ? 'ALERTE SÉCURITÉ' : 'SURVEILLANCE ACTIVE',
      85,
      canvas.height - 25
    );
    
  }, [parkingLevels, currentLevel, hoveredDetector, hoveredSpot, activeDetector, smokeParticles, dataPackets, canvasSize, simulationStep]);
  
  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const level = parkingLevels[currentLevel];
    if (!level) return;
    
    // Check if mouse is over a detector
    let foundDetector = false;
    for (const detector of level.detectors) {
      const dx = detector.coordinates.x - x;
      const dy = detector.coordinates.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= 10) {
        setHoveredDetector(detector.id);
        canvas.style.cursor = 'pointer';
        foundDetector = true;
        break;
      }
    }
    
    if (!foundDetector) {
      setHoveredDetector(null);
      
      // Check if mouse is over a parking spot
      let foundSpot = false;
      for (const spot of level.spots) {
        const dx = spot.coordinates.x - x;
        const dy = spot.coordinates.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= 20) {
          setHoveredSpot(spot.id);
          canvas.style.cursor = 'pointer';
          foundSpot = true;
          break;
        }
      }
      
      if (!foundSpot) {
        setHoveredSpot(null);
        canvas.style.cursor = 'default';
      }
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredDetector(null);
    setHoveredSpot(null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'default';
    }
  };
  
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (simulationActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const level = parkingLevels[currentLevel];
    if (!level) return;
    
    // Check if a detector was clicked
    for (const detector of level.detectors) {
      const dx = detector.coordinates.x - x;
      const dy = detector.coordinates.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= 10) {
        activateDetector(detector);
        break;
      }
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Shield className="h-5 w-5 mr-2 text-red-600" />
          Visualisation Parking Q-PARK
        </h2>
        
        <div className="flex space-x-2">
          {parkingLevels.map((level) => (
            <button
              key={level.id}
              className={`px-4 py-2 rounded-md ${
                currentLevel === level.id - 1
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setCurrentLevel(level.id - 1)}
              disabled={simulationActive}
            >
              {level.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="border border-gray-700 rounded-md"
        />
        
        {simulationActive && (
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
            <div className="bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-md flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1 text-red-600" />
              <span>SURVEILLANCE ACTIVE</span>
            </div>
            
            <div className="bg-black bg-opacity-70 text-white text-xs px-3 py-1 rounded-md">
              {new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}
            </div>
          </div>
        )}
        
        {!simulationActive && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-black bg-opacity-70 p-2 rounded-md">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Détecteur normal</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Détecteur en défaut</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span>Détecteur en alerte</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-400 flex justify-between items-center">
        {simulationActive ? (
          <p className="flex items-center text-red-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Alerte en cours - Niveau {parkingLevels[currentLevel]?.name} - Zone {activeDetector?.zone}
          </p>
        ) : (
          <p>Cliquez sur un détecteur pour simuler une alerte incendie</p>
        )}
        
        <div className="text-xs text-gray-500">
          XCELS SECURITY SERVICES - Q-PARK
        </div>
      </div>
    </div>
  );
};

export default ParkingVisualization;
