
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useAuth } from '../contexts/AuthContext';

interface PipelineVisualizationProps {
  pressure: number;
  temperature: number;
  flowRate: number;
}

// Pipeline section component that changes color based on metrics
const PipelineSection = ({ position, rotation, scale, metrics }: { 
  position: [number, number, number], 
  rotation?: [number, number, number], 
  scale: [number, number, number],
  metrics: { pressure: number; temperature: number; flowRate: number }
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const { thresholds } = useAuth();
  
  // Pulse effect for critical state
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const [pulseDirection, setPulseDirection] = useState(1);
  const [isCritical, setIsCritical] = useState(false);
  
  // Determine color based on metrics and configured thresholds
  const getColor = () => {
    if (metrics.pressure > thresholds.pressure || metrics.temperature > thresholds.temperature) {
      setIsCritical(true);
      return new THREE.Color('#FF4500'); // Red for critical
    } else if (metrics.pressure > thresholds.pressure * 0.75 || metrics.temperature > thresholds.temperature * 0.875) {
      setIsCritical(false);
      return new THREE.Color('#FFA500'); // Orange/yellow for warning
    } else {
      setIsCritical(false);
      return new THREE.Color('#39FF14'); // Green for normal
    }
  };
  
  useFrame(() => {
    if (meshRef.current && meshRef.current.material) {
      // Subtle animation effect
      meshRef.current.rotation.x += 0.001;
      
      // Update material color based on metrics
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.color.set(getColor());
      
      // Add pulsing effect for critical state
      if (isCritical) {
        setPulseIntensity(prev => {
          const newIntensity = prev + (0.05 * pulseDirection);
          if (newIntensity > 1) {
            setPulseDirection(-1);
            return 1;
          } else if (newIntensity < 0) {
            setPulseDirection(1);
            return 0;
          }
          return newIntensity;
        });
        
        material.emissiveIntensity = 0.3 + (pulseIntensity * 0.7);
        material.emissive = new THREE.Color('#FF4500');
      } else if (hovered) {
        material.emissiveIntensity = 0.5;
        material.emissive = material.color.clone().multiplyScalar(0.5);
      } else {
        material.emissiveIntensity = 0.2;
        material.emissive = material.color.clone().multiplyScalar(0.2);
      }
    }
  });

  return (
    <mesh
      position={position}
      rotation={rotation || [0, 0, 0]}
      scale={scale}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshStandardMaterial 
        color={getColor()}
        metalness={0.8}
        roughness={0.2}
        emissive={getColor().clone().multiplyScalar(0.2)}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Joint/connector component
const PipelineJoint = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial 
        color={new THREE.Color("#555555")}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

// Valve component
const PipelineValve = ({ position, rotation }: { 
  position: [number, number, number],
  rotation?: [number, number, number]
}) => {
  const valveRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (valveRef.current) {
      valveRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh>
        <boxGeometry args={[2.5, 2.5, 1.5]} />
        <meshStandardMaterial 
          color={new THREE.Color("#444444")}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <group ref={valveRef}>
        <mesh position={[0, 0, 1]}>
          <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
          <meshStandardMaterial 
            color={new THREE.Color("#666666")}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 2]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
          <meshStandardMaterial 
            color={new THREE.Color("#888888")}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
};

// Sensor component
const PipelineSensor = ({ position, label, value, critical }: { 
  position: [number, number, number],
  label: string,
  value: number,
  critical: boolean
}) => {
  const [pulseFactor, setPulseFactor] = useState(0);
  
  useFrame(() => {
    if (critical) {
      setPulseFactor((prev) => (prev + 0.05) % (2 * Math.PI));
    } else {
      setPulseFactor(0);
    }
  });

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1, 1, 0.5]} />
        <meshStandardMaterial 
          color={new THREE.Color(critical ? "#FF4500" : "#00FFFF")}
          metalness={0.5}
          roughness={0.5}
          emissive={new THREE.Color(critical ? "#FF4500" : "#00FFFF")}
          emissiveIntensity={critical ? 0.5 + 0.5 * Math.sin(pulseFactor) : 0.5}
        />
      </mesh>
      <Text 
        position={[0, 0, 0.5]} 
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value.toFixed(1)}
      </Text>
      <Text 
        position={[0, -0.7, 0]} 
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// Pipeline segment label component
const PipelineLabel = ({ position, label }: { position: [number, number, number], label: string }) => {
  return (
    <group position={position}>
      <Text 
        position={[0, 0, 0]} 
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        backgroundColor="rgba(0,0,0,0.5)"
        padding={0.15}
      >
        {label}
      </Text>
    </group>
  );
};

// Main pipeline visualization component
const PipelineVisualization3D: React.FC<PipelineVisualizationProps> = ({ pressure, temperature, flowRate }) => {
  const { thresholds } = useAuth();
  
  // Define if metrics are in critical state
  const isPressureCritical = pressure > thresholds.pressure;
  const isTemperatureCritical = temperature > thresholds.temperature;
  const isFlowCritical = flowRate > thresholds.flowRate;

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-md bg-dark-accent">
      <Canvas 
        camera={{ position: [0, 5, 15], fov: 50 }}
        style={{ background: '#111' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Main pipeline structure */}
        <group position={[0, 0, 0]}>
          {/* Horizontal pipeline sections */}
          <PipelineSection 
            position={[-6, 0, 0]} 
            rotation={[0, 0, Math.PI/2]} 
            scale={[1, 4, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineLabel position={[-6, 1, 0]} label="Section A" />
          
          <PipelineSection 
            position={[0, 0, 0]} 
            rotation={[0, 0, Math.PI/2]} 
            scale={[1, 8, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineLabel position={[0, 1, 0]} label="Section B" />
          
          <PipelineSection 
            position={[7, 0, 0]} 
            rotation={[0, 0, Math.PI/2]} 
            scale={[1, 6, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineLabel position={[7, 1, 0]} label="Section C" />
          
          {/* Vertical pipeline sections */}
          <PipelineSection 
            position={[-8, -3, 0]} 
            scale={[1, 6, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineLabel position={[-9, -3, 0]} label="Section D" />
          
          <PipelineSection 
            position={[10, -3, 0]} 
            scale={[1, 6, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineLabel position={[11, -3, 0]} label="Section E" />
          
          {/* Joints */}
          <PipelineJoint position={[-8, 0, 0]} />
          <PipelineJoint position={[4, 0, 0]} />
          <PipelineJoint position={[10, 0, 0]} />
          
          {/* Valves */}
          <PipelineValve position={[-4, 0, 0]} />
          <PipelineValve position={[7, -6, 0]} rotation={[0, 0, Math.PI/2]} />
          
          {/* Sensors */}
          <PipelineSensor 
            position={[-6, 2, 0]} 
            label="Pressure" 
            value={pressure}
            critical={isPressureCritical}
          />
          <PipelineSensor 
            position={[0, 2, 0]} 
            label="Temperature" 
            value={temperature}
            critical={isTemperatureCritical}
          />
          <PipelineSensor 
            position={[7, 2, 0]} 
            label="Flow Rate" 
            value={flowRate}
            critical={isFlowCritical}
          />
        </group>
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
      
      {/* Legend overlay */}
      <div className="absolute bottom-2 right-2 bg-black/70 p-2 rounded text-xs">
        <div className="flex items-center mb-1">
          <div className="h-3 w-3 rounded-full bg-[#39FF14] mr-1"></div>
          <span className="text-gray-300">Normal</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="h-3 w-3 rounded-full bg-[#FFA500] mr-1"></div>
          <span className="text-gray-300">Warning</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-[#FF4500] mr-1"></div>
          <span className="text-gray-300">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default PipelineVisualization3D;
