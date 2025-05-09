import React, { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Gauge, Thermometer, Droplet, Vibrate, RefreshCw } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

// Types for sensor data
interface SensorReading {
  timestamp: number;
  pressure: number;
  temperature: number;
  flowRate: number;
  vibration: number;
  humidity: number;
}

interface ReadingDataPoint {
  time: string;
  pressure: number;
  temperature: number;
  flowRate: number;
  vibration: number;
  humidity: number;
}

// Sensor data ranges
const DATA_RANGES = {
  pressure: { min: 80, max: 120, unit: 'PSI' },
  temperature: { min: 65, max: 85, unit: '°C' },
  flowRate: { min: 200, max: 300, unit: 'L/min' },
  vibration: { min: 0.5, max: 2.5, unit: 'mm/s' },
  humidity: { min: 40, max: 60, unit: '%' }
};

// Generate random reading within range
const generateRandomReading = (min: number, max: number): number => {
  return +(min + Math.random() * (max - min)).toFixed(1);
};

// Generate a new sensor reading
const generateSensorReading = (): SensorReading => {
  return {
    timestamp: Date.now(),
    pressure: generateRandomReading(DATA_RANGES.pressure.min, DATA_RANGES.pressure.max),
    temperature: generateRandomReading(DATA_RANGES.temperature.min, DATA_RANGES.temperature.max),
    flowRate: generateRandomReading(DATA_RANGES.flowRate.min, DATA_RANGES.flowRate.max),
    vibration: generateRandomReading(DATA_RANGES.vibration.min, DATA_RANGES.vibration.max),
    humidity: generateRandomReading(DATA_RANGES.humidity.min, DATA_RANGES.humidity.max)
  };
};

// Convert timestamp to readable format for charts
const formatTimeLabel = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

export const PipelineHealthMonitor: React.FC = () => {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [updateInterval] = useState<number>(Math.floor(Math.random() * 3000) + 2000); // Random interval between 2-5 seconds

  // Format readings for chart display
  const formattedData = readings.map(reading => ({
    time: formatTimeLabel(reading.timestamp),
    pressure: reading.pressure,
    temperature: reading.temperature,
    flowRate: reading.flowRate,
    vibration: reading.vibration,
    humidity: reading.humidity
  }));

  // Generate and add new reading
  const updateReadings = useCallback(() => {
    const newReading = generateSensorReading();
    setReadings(prevReadings => {
      // Keep only the last 10 readings
      const updatedReadings = [...prevReadings, newReading];
      if (updatedReadings.length > 10) {
        return updatedReadings.slice(updatedReadings.length - 10);
      }
      return updatedReadings;
    });
    setLastUpdate(new Date());
  }, []);

  // Initialize and update readings on interval
  useEffect(() => {
    // Generate initial data points
    const initialData: SensorReading[] = [];
    for (let i = 0; i < 10; i++) {
      initialData.push({
        ...generateSensorReading(),
        timestamp: Date.now() - (9 - i) * (updateInterval / 2) // Stagger initial timestamps
      });
    }
    setReadings(initialData);

    // Set up interval for data updates
    const intervalId = setInterval(updateReadings, updateInterval);
    
    return () => clearInterval(intervalId);
  }, [updateInterval, updateReadings]);

  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-panel p-3 text-sm">
          <p className="text-gray-300 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {DATA_RANGES[entry.dataKey as keyof typeof DATA_RANGES]?.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Chart component for each sensor parameter
  const SensorChart = ({ 
    title,
    description,
    dataKey,
    color,
    icon: Icon
  }: { 
    title: string, 
    description: string, 
    dataKey: keyof ReadingDataPoint, 
    color: string,
    icon: React.FC<any>
  }) => (
    <Card className="glass-panel border-t-4" style={{ borderTopColor: color }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-white flex items-center gap-2">
            <Icon className="h-5 w-5" style={{ color }} />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-dark-card rounded-full">
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Range: {DATA_RANGES[dataKey].min} - {DATA_RANGES[dataKey].max} {DATA_RANGES[dataKey].unit}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="time" 
                stroke="#666" 
                tick={{ fill: '#999' }} 
                tickLine={{ stroke: '#666' }}
                label={{ value: 'Time', position: 'insideBottomRight', offset: -10, fill: '#999' }} 
              />
              <YAxis 
                stroke="#666" 
                tick={{ fill: '#999' }} 
                tickLine={{ stroke: '#666' }}
                domain={[
                  Math.floor(DATA_RANGES[dataKey].min * 0.9),
                  Math.ceil(DATA_RANGES[dataKey].max * 1.1)
                ]}
                label={{ 
                  value: DATA_RANGES[dataKey].unit, 
                  angle: -90, 
                  position: 'insideLeft', 
                  fill: '#999' 
                }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={dataKey}
                name={title}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4, fill: '#111', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: color, stroke: '#111' }}
                animationDuration={300}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Current: <span className="text-white font-medium">{formattedData.length > 0 ? formattedData[formattedData.length - 1][dataKey] : 0} {DATA_RANGES[dataKey].unit}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-display font-bold text-white">
          Pipeline <span className="text-neon-blue">Health Monitor</span>
        </h2>
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <RefreshCw className="h-4 w-4 animate-spin text-neon-blue" /> 
          <span>Last update: {formatDistanceToNow(lastUpdate, { addSuffix: true })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SensorChart 
          title="Pressure" 
          description="Pipeline internal pressure" 
          dataKey="pressure" 
          color="#00FFFF" 
          icon={Gauge} 
        />
        
        <SensorChart 
          title="Temperature" 
          description="Pipeline surface temperature" 
          dataKey="temperature" 
          color="#FF4500" 
          icon={Thermometer} 
        />
        
        <SensorChart 
          title="Flow Rate" 
          description="Fluid movement volume" 
          dataKey="flowRate" 
          color="#39FF14" 
          icon={Droplet} 
        />
        
        <SensorChart 
          title="Vibration" 
          description="Pipeline vibration readings" 
          dataKey="vibration" 
          color="#9B30FF" 
          icon={Vibrate} 
        />
      </div>
    </div>
  );
};

export default PipelineHealthMonitor;
