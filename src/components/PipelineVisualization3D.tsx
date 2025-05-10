
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

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
  
  // Determine color based on metrics
  const getColor = () => {
    if (metrics.pressure > 200 || metrics.temperature > 80) {
      return '#FF4500'; // Red for critical
    } else if (metrics.pressure > 150 || metrics.temperature > 70) {
      return '#FFA500'; // Orange/yellow for warning
    } else {
      return '#39FF14'; // Green for normal
    }
  };
  
  useFrame(() => {
    if (meshRef.current) {
      // Subtle animation effect
      meshRef.current.rotation.x += 0.001;
      
      // Update material color based on metrics
      (meshRef.current.material as THREE.MeshStandardMaterial).color = 
        new THREE.Color(getColor());
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
        emissive={hovered ? new THREE.Color(getColor()).multiplyScalar(0.5) : undefined}
        emissiveIntensity={hovered ? 1 : 0}
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
        color="#555555" 
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
          color="#444444" 
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <group ref={valveRef}>
        <mesh position={[0, 0, 1]}>
          <cylinderGeometry args={[0.2, 0.2, 2, 32]} />
          <meshStandardMaterial 
            color="#666666" 
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 2]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
          <meshStandardMaterial 
            color="#888888" 
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
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1, 1, 0.5]} />
        <meshStandardMaterial 
          color={critical ? "#FF4500" : "#00FFFF"} 
          metalness={0.5}
          roughness={0.5}
          emissive={critical ? "#FF4500" : "#00FFFF"}
          emissiveIntensity={0.5}
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

// Main pipeline visualization component
const PipelineVisualization3D: React.FC<PipelineVisualizationProps> = ({ pressure, temperature, flowRate }) => {
  // Define if metrics are in critical state
  const isPressureCritical = pressure > 200;
  const isTemperatureCritical = temperature > 80;
  const isFlowCritical = flowRate > 300;

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
          <PipelineSection 
            position={[0, 0, 0]} 
            rotation={[0, 0, Math.PI/2]} 
            scale={[1, 8, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineSection 
            position={[7, 0, 0]} 
            rotation={[0, 0, Math.PI/2]} 
            scale={[1, 6, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          
          {/* Vertical pipeline sections */}
          <PipelineSection 
            position={[-8, -3, 0]} 
            scale={[1, 6, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          <PipelineSection 
            position={[10, -3, 0]} 
            scale={[1, 6, 1]} 
            metrics={{ pressure, temperature, flowRate }}
          />
          
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
