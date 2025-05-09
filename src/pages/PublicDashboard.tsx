
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Info, Activity, Lock } from 'lucide-react';

// Mock data for system notices
const mockNotices = [
  {
    id: 1,
    title: 'Scheduled Maintenance',
    message: 'Pipeline section A7 will undergo scheduled maintenance on May 15th. Expected downtime: 3 hours.',
    date: '2025-05-09T08:00:00Z',
    severity: 'info'
  },
  {
    id: 2,
    title: 'Security Update',
    message: 'All systems have been updated with the latest security patches.',
    date: '2025-05-07T14:30:00Z', 
    severity: 'success'
  },
  {
    id: 3,
    title: 'Pressure Warning',
    message: 'Minor pressure fluctuations detected in sector B-12. Engineering team has been notified.',
    date: '2025-05-08T19:45:00Z',
    severity: 'warning'
  }
];

// Mock data for pipeline status
const mockPipelineStatus = [
  { id: 1, name: 'North Region Main Line', status: 'working', lastUpdated: '2025-05-09T09:15:00Z' },
  { id: 2, name: 'East Distribution Network', status: 'working', lastUpdated: '2025-05-09T09:10:00Z' },
  { id: 3, name: 'South Connector', status: 'maintenance', lastUpdated: '2025-05-08T23:45:00Z' },
  { id: 4, name: 'West Refinery Feed', status: 'disabled', lastUpdated: '2025-05-07T18:30:00Z' },
  { id: 5, name: 'Central Junction', status: 'working', lastUpdated: '2025-05-09T09:05:00Z' }
];

const PublicDashboard: React.FC = () => {
  const [notices, setNotices] = useState(mockNotices);
  const [pipelineStatus, setPipelineStatus] = useState(mockPipelineStatus);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Calculate time difference
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diff = currentTime.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };
  
  // Get status indicator color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working':
        return 'bg-neon-green';
      case 'maintenance':
        return 'bg-neon-orange';
      case 'disabled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Get notice severity indicator
  const getNoticeSeverity = (severity: string) => {
    switch (severity) {
      case 'info':
        return { icon: <Info className="h-5 w-5 text-neon-blue" />, bgColor: 'bg-neon-blue/20' };
      case 'success':
        return { icon: <Activity className="h-5 w-5 text-neon-green" />, bgColor: 'bg-neon-green/20' };
      case 'warning':
        return { icon: <AlertCircle className="h-5 w-5 text-neon-orange" />, bgColor: 'bg-neon-orange/20' };
      case 'error':
        return { icon: <AlertCircle className="h-5 w-5 text-red-500" />, bgColor: 'bg-red-500/20' };
      default:
        return { icon: <Info className="h-5 w-5 text-gray-400" />, bgColor: 'bg-gray-500/20' };
    }
  };
  
  return (
    <div className="min-h-screen bg-dark">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-[100px] -z-10"></div>
      
      {/* Header */}
      <header className="border-b border-dark-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"></div>
              <span className="text-lg font-display font-bold tracking-wider text-white">
                69-BH12-NER <span className="text-neon-blue">PUBLIC</span>
              </span>
            </div>
            
            <Link 
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-secondary text-white hover:bg-secondary/80 transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-white">
            System <span className="text-neon-blue">Status</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Real-time status of pipeline operations and system notices
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Notices Panel */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-white">System Notices</h2>
                <span className="text-xs text-gray-400">
                  Last updated: {currentTime.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-4">
                {notices.map(notice => {
                  const { icon, bgColor } = getNoticeSeverity(notice.severity);
                  
                  return (
                    <div key={notice.id} className="p-4 bg-dark-accent rounded-lg">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md mr-4 ${bgColor}`}>
                          {icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{notice.title}</h3>
                            <span className="text-xs text-gray-400">{formatDate(notice.date)}</span>
                          </div>
                          <p className="mt-1 text-sm text-gray-300">{notice.message}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Pipeline Status */}
          <div>
            <div className="glass-panel p-6 rounded-lg">
              <h2 className="text-xl font-medium text-white mb-6">Pipeline Status</h2>
              
              <div className="space-y-4">
                {pipelineStatus.map(pipeline => (
                  <div key={pipeline.id} className="flex items-center justify-between p-3 bg-dark-accent rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className={`h-3 w-3 rounded-full ${getStatusColor(pipeline.status)}`}></div>
                      <span className="text-sm text-white">{pipeline.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {getTimeAgo(pipeline.lastUpdated)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-dark-accent">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-400">Status Legend</h3>
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-neon-green"></div>
                    <span className="text-xs text-gray-300">Working</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-neon-orange"></div>
                    <span className="text-xs text-gray-300">Under Maintenance</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-300">Disabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-dark-accent py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 69-BH12-NER Pipeline Systems. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link to="/login" className="text-neon-blue hover:text-neon-blue/80 text-sm">
                Employee Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicDashboard;
