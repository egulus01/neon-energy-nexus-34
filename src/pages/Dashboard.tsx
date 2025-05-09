
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { TrendingUp, TrendingDown, Droplet, BarChart, Activity, Download, Filter, Calendar } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  // Sample data for charts
  const productionData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
    { name: 'Aug', value: 8000 }
  ];

  const efficiencyData = [
    { name: 'Jan', efficiency: 85 },
    { name: 'Feb', efficiency: 83 },
    { name: 'Mar', efficiency: 86 },
    { name: 'Apr', efficiency: 87 },
    { name: 'May', efficiency: 89 },
    { name: 'Jun', efficiency: 92 },
    { name: 'Jul', efficiency: 91 },
    { name: 'Aug', efficiency: 94 }
  ];

  const reservesData = [
    { name: 'A1', value: 800 },
    { name: 'B2', value: 1200 },
    { name: 'C3', value: 1400 },
    { name: 'D4', value: 900 },
    { name: 'E5', value: 1600 },
    { name: 'F6', value: 1100 }
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">
            Operational <span className="text-neon-blue">Dashboard</span>
          </h1>
          
          <div className="flex space-x-4">
            <div className="relative inline-block">
              <div className="flex space-x-2 items-center px-4 py-2 bg-dark-card border border-dark-accent rounded-md text-gray-300 text-sm cursor-pointer hover:border-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Last 30 Days</span>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-dark-card border border-dark-accent rounded-md text-gray-300 text-sm flex items-center space-x-2 hover:border-gray-500">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Daily Production",
              value: "14.6M",
              unit: "barrels",
              change: "+5.3%",
              isPositive: true,
              icon: <Droplet className="h-6 w-6 text-neon-blue" />,
              color: "border-neon-blue"
            },
            {
              title: "System Efficiency",
              value: "87.3",
              unit: "%",
              change: "+2.1%",
              isPositive: true,
              icon: <Activity className="h-6 w-6 text-neon-green" />,
              color: "border-neon-green"
            },
            {
              title: "Reserve Capacity",
              value: "438.2B",
              unit: "barrels",
              change: "-1.2%",
              isPositive: false,
              icon: <BarChart className="h-6 w-6 text-neon-orange" />,
              color: "border-neon-orange"
            },
            {
              title: "Distribution Rate",
              value: "12.3M",
              unit: "b/day",
              change: "+3.7%",
              isPositive: true,
              icon: <Activity className="h-6 w-6 text-neon-purple" />,
              color: "border-neon-purple"
            }
          ].map((kpi, index) => (
            <div 
              key={index}
              className={`glass-panel p-6 border-l-4 ${kpi.color}`}
            >
              <div className="flex justify-between">
                <p className="text-gray-400 font-medium">{kpi.title}</p>
                <div className="p-2 bg-dark-accent rounded-md">
                  {kpi.icon}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-baseline">
                  <h3 className="text-3xl font-bold text-white">{kpi.value}</h3>
                  <p className="ml-2 text-gray-400">{kpi.unit}</p>
                </div>
                
                <div className="flex items-center mt-2">
                  {kpi.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-neon-green" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-neon-orange" />
                  )}
                  <p 
                    className={`ml-1 text-sm ${
                      kpi.isPositive ? 'text-neon-green' : 'text-neon-orange'
                    }`}
                  >
                    {kpi.change} <span className="text-gray-400">vs. previous period</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeframe selector */}
        <div className="flex items-center space-x-4 border-b border-dark-accent pb-4">
          <p className="text-gray-400">Timeframe:</p>
          <div className="flex p-1 bg-dark-card rounded-md">
            {['daily', 'weekly', 'monthly', 'yearly'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-1.5 text-sm rounded-md ${
                  selectedTimeframe === timeframe 
                    ? 'bg-secondary text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Production Chart */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Production Trends</h3>
              <button className="p-1.5 bg-dark-accent rounded-md text-gray-400 hover:text-white">
                <Filter className="h-4 w-4" />
              </button>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productionData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
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
                    stroke="#00FFFF" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Efficiency Chart */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">System Efficiency</h3>
              <button className="p-1.5 bg-dark-accent rounded-md text-gray-400 hover:text-white">
                <Filter className="h-4 w-4" />
              </button>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" domain={[75, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#aaa' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#39FF14" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#222', stroke: '#39FF14', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#39FF14' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Reserves Chart */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Reserve Distribution</h3>
              <button className="p-1.5 bg-dark-accent rounded-md text-gray-400 hover:text-white">
                <Filter className="h-4 w-4" />
              </button>
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={reservesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#aaa' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#FF4500"
                    radius={[4, 4, 0, 0]} 
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">System Alerts</h3>
              <span className="px-2 py-1 text-xs rounded-md bg-dark-accent text-gray-300">Last 24 hours</span>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Production rate exceeded target",
                  time: "2 hours ago",
                  status: "success",
                  message: "Sector A-7 production rate is 105% of daily target"
                },
                {
                  title: "Equipment maintenance required",
                  time: "5 hours ago",
                  status: "warning",
                  message: "Pump station 23B requires scheduled maintenance"
                },
                {
                  title: "Pipeline pressure fluctuation",
                  time: "12 hours ago",
                  status: "error",
                  message: "Minor pressure fluctuations detected in sector C-4"
                },
                {
                  title: "New reserve discovered",
                  time: "18 hours ago",
                  status: "info",
                  message: "Initial analysis shows potential new reserve in region NE-12"
                }
              ].map((alert, index) => (
                <div 
                  key={index}
                  className="flex items-start p-3 bg-dark-accent rounded-md hover:bg-dark-accent/70 transition-colors"
                >
                  <div 
                    className={`h-2 w-2 mt-1.5 rounded-full mr-3 ${
                      alert.status === 'success' ? 'bg-neon-green' :
                      alert.status === 'warning' ? 'bg-neon-orange' :
                      alert.status === 'error' ? 'bg-red-500' : 'bg-neon-blue'
                    }`}
                  ></div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-white">{alert.title}</h4>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full py-2 text-sm text-gray-400 hover:text-white border border-dark-accent hover:border-gray-500 rounded-md transition-colors">
              View all alerts
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
