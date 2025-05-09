
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { BarChart, LineChart, AreaChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Settings, RefreshCw, Download, AlertTriangle } from 'lucide-react';

const Simulation = () => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [populationSize, setPopulationSize] = useState(5);
  const [simulationTime, setSimulationTime] = useState(0);
  const [systemLoad, setSystemLoad] = useState(0);
  const [resourceConsumption, setResourceConsumption] = useState<{ name: string; value: number }[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<{ name: string; value: number }[]>([]);

  // Simulate data updates when the simulation is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulationRunning) {
      interval = setInterval(() => {
        // Update simulation time (in seconds)
        setSimulationTime(prev => prev + 1);
        
        // Update system load based on population size
        const baseLoad = populationSize * 5; // 5% load per billion people
        const randomVariance = Math.sin(simulationTime / 10) * 3; // Add some variation
        const newLoad = Math.min(Math.max(baseLoad + randomVariance, 0), 100);
        setSystemLoad(newLoad);
        
        // Update resource consumption data
        setResourceConsumption(prev => {
          const newData = [...prev];
          if (newData.length >= 20) newData.shift();
          
          const baseValue = populationSize * 10; // 10 million barrels per billion people
          const randomVariance = Math.random() * 5 - 2.5;
          
          newData.push({
            name: `${simulationTime}s`,
            value: baseValue + randomVariance
          });
          
          return newData;
        });
        
        // Update performance metrics
        setPerformanceMetrics(prev => {
          const newData = [...prev];
          if (newData.length >= 20) newData.shift();
          
          // Simulate decreasing efficiency as population grows
          const efficiency = Math.max(95 - (populationSize / 20) * 10 + (Math.random() * 2 - 1), 70);
          
          newData.push({
            name: `${simulationTime}s`,
            value: efficiency
          });
          
          return newData;
        });
        
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulationRunning, populationSize, simulationTime]);

  const toggleSimulation = () => {
    setSimulationRunning(prev => !prev);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
    setSimulationTime(0);
    setSystemLoad(0);
    setResourceConsumption([]);
    setPerformanceMetrics([]);
  };

  const handlePopulationChange = (value: number[]) => {
    setPopulationSize(value[0]);
  };

  const formatPopulation = (value: number) => {
    return `${value}B`;
  };

  // Calculate warning levels based on system load
  const getLoadStatus = () => {
    if (systemLoad < 50) return { color: "text-neon-green", message: "System load normal" };
    if (systemLoad < 80) return { color: "text-neon-orange", message: "System load elevated" };
    return { color: "text-red-500", message: "System load critical" };
  };

  const loadStatus = getLoadStatus();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">
            Population <span className="text-neon-purple">Load Simulation</span>
          </h1>
          
          <div className="flex space-x-4">
            <button 
              className="px-4 py-2 bg-dark-card border border-dark-accent rounded-md text-gray-300 text-sm flex items-center space-x-2 hover:border-gray-500"
              onClick={resetSimulation}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
            </button>
            
            <button className="px-4 py-2 bg-dark-card border border-dark-accent rounded-md text-gray-300 text-sm flex items-center space-x-2 hover:border-gray-500">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-6">Simulation Controls</h3>
            
            <div className="space-y-8">
              {/* Population Size Control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-300">Population Size</p>
                  <p className="text-neon-blue font-medium">{populationSize} Billion</p>
                </div>
                
                <Slider 
                  value={[populationSize]} 
                  min={1} 
                  max={20} 
                  step={0.1}
                  onValueChange={handlePopulationChange}
                  className="slider"
                />
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1B</span>
                  <span>10B</span>
                  <span>20B</span>
                </div>
              </div>
              
              {/* Simulation Play/Pause Button */}
              <div className="flex justify-center">
                <button
                  onClick={toggleSimulation}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    simulationRunning 
                      ? 'bg-neon-orange hover:bg-neon-orange/90' 
                      : 'bg-neon-green hover:bg-neon-green/90'
                  }`}
                >
                  {simulationRunning ? (
                    <Pause className="h-8 w-8 text-dark" />
                  ) : (
                    <Play className="h-8 w-8 text-dark" />
                  )}
                </button>
              </div>
              
              {/* Simulation Status */}
              <div className="glass-panel p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">Simulation Time</p>
                    <p className="text-white font-mono text-xl">{simulationTime}s</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className={`${simulationRunning ? 'text-neon-green' : 'text-gray-400'}`}>
                      {simulationRunning ? 'Running' : 'Paused'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-6">System Load Indicators</h3>
            
            {/* Load Gauge */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-gray-400">Current System Load</p>
                <p className={`text-xl font-medium ${loadStatus.color}`}>{Math.round(systemLoad)}%</p>
              </div>
              
              <div className="h-4 bg-dark-accent rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    systemLoad < 50 ? 'bg-neon-green' : 
                    systemLoad < 80 ? 'bg-neon-orange' : 'bg-red-500'
                  }`}
                  style={{ width: `${systemLoad}%` }}
                ></div>
              </div>
              
              <div className="flex items-center mt-2">
                <AlertTriangle className={`h-4 w-4 mr-1 ${loadStatus.color}`} />
                <p className={`text-xs ${loadStatus.color}`}>{loadStatus.message}</p>
              </div>
            </div>
            
            {/* Resource Allocation */}
            <div className="glass-panel p-4 mb-6">
              <p className="text-gray-400 mb-2">Resource Allocation</p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Petroleum", value: Math.round(populationSize * 5), unit: "M barrels/day" },
                  { label: "Infrastructure", value: Math.round(populationSize * 3), unit: "K nodes" },
                  { label: "Processing", value: Math.round(populationSize * 7), unit: "PFlops" },
                  { label: "Storage", value: Math.round(populationSize * 10), unit: "PB" }
                ].map((resource, index) => (
                  <div key={index} className="text-center p-2 bg-dark-accent rounded-md">
                    <p className="text-xs text-gray-400">{resource.label}</p>
                    <p className="text-lg text-white font-medium">{resource.value}</p>
                    <p className="text-xs text-gray-500">{resource.unit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Critical Thresholds */}
            <div className="bg-dark-accent border border-red-900/30 text-white p-4 rounded-md">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm font-medium">Critical Thresholds</p>
              </div>
              
              <div className="space-y-2 text-xs text-gray-300">
                <p>- System stability threshold: 15B population</p>
                <p>- Resource depletion risk: {Math.round(populationSize / 20 * 100)}%</p>
                <p>- Infra scaling capacity: {populationSize > 18 ? 'CRITICAL' : populationSize > 12 ? 'WARNING' : 'NORMAL'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simulation Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource Consumption Chart */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Resource Consumption</h3>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-neon-orange rounded-full"></div>
                <span className="text-xs text-gray-400">Million barrels/day</span>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={resourceConsumption}>
                  <defs>
                    <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4500" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF4500" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#aaa' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#FF4500" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorConsumption)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* System Performance Chart */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">System Performance</h3>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 bg-neon-purple rounded-full"></div>
                <span className="text-xs text-gray-400">Efficiency %</span>
              </div>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" domain={[50, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#aaa' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9B30FF" 
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#222', stroke: '#9B30FF', strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: '#9B30FF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Infrastructure Analysis */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium text-white mb-6">Infrastructure Scaling Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Server Clusters",
                current: Math.round(populationSize * 1500),
                max: 40000,
                unit: ""
              },
              {
                label: "Distribution Nodes",
                current: Math.round(populationSize * 800),
                max: 20000,
                unit: ""
              },
              {
                label: "Network Bandwidth",
                current: Math.round(populationSize * 25),
                max: 600,
                unit: "Tbps"
              },
              {
                label: "Storage Capacity",
                current: Math.round(populationSize * 50),
                max: 1200,
                unit: "PB"
              }
            ].map((infra, index) => {
              const percentage = (infra.current / infra.max) * 100;
              
              return (
                <div key={index} className="bg-dark-accent p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-300">{infra.label}</p>
                    <p className={`text-xs font-medium ${
                      percentage < 70 ? 'text-neon-green' :
                      percentage < 90 ? 'text-neon-orange' : 'text-red-500'
                    }`}>
                      {Math.round(percentage)}%
                    </p>
                  </div>
                  
                  <div className="h-1.5 bg-dark rounded-full mb-2">
                    <div 
                      className={`h-full rounded-full ${
                        percentage < 70 ? 'bg-neon-green' : 
                        percentage < 90 ? 'bg-neon-orange' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{infra.current.toLocaleString()}{infra.unit}</span>
                    <span>of {infra.max.toLocaleString()}{infra.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-dark-lighter p-4 rounded-md border border-dark-accent">
            <h4 className="text-white font-medium mb-3">Load Balancing Architecture</h4>
            
            <div className="text-sm text-gray-300 space-y-2">
              <p className="flex justify-between">
                <span>Auto-scaling clusters:</span>
                <span className={populationSize > 15 ? 'text-red-500' : 'text-neon-green'}>
                  {populationSize > 15 ? 'At capacity' : 'Functioning'}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Distributed processing:</span>
                <span className={populationSize > 18 ? 'text-red-500' : 'text-neon-green'}>
                  {populationSize > 18 ? 'Overloaded' : 'Normal'}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Regional redundancy:</span>
                <span className={populationSize > 10 ? 'text-neon-orange' : 'text-neon-green'}>
                  {populationSize > 10 ? 'Strained' : 'Optimal'}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Failure recovery:</span>
                <span className={populationSize > 17 ? 'text-red-500' : populationSize > 12 ? 'text-neon-orange' : 'text-neon-green'}>
                  {populationSize > 17 ? 'Critical' : populationSize > 12 ? 'Degraded' : 'Nominal'}
                </span>
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-dark-accent">
              <p className="text-xs text-gray-400">
                System {simulationRunning ? 'actively' : 'passively'} monitoring {populationSize} billion simulated users across {Math.round(populationSize * 7)} regions.
                {populationSize > 15 && ' Warning: Population approaching system design limits.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Simulation;
