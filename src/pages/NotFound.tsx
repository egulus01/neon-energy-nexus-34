
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark p-4">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-purple/10 blur-[80px] -z-10"></div>
      
      <div className="glass-panel p-8 max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-neon-orange/20 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-neon-orange" />
        </div>
        
        <h1 className="text-5xl font-display font-bold text-neon-orange">404</h1>
        <p className="text-xl text-gray-300 mb-4">Access Denied</p>
        <p className="text-gray-400">
          The requested resource does not exist or you do not have clearance to access it.
        </p>
        
        <div className="pt-4 flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-dark-accent border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-colors rounded-md"
          >
            Return to Base
          </Link>
        </div>
        
        <p className="text-xs text-gray-500">
          Error code: ACCESS-VIOLATION-{Math.floor(Math.random() * 1000)}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
