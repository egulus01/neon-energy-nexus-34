
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Satellite, Users } from 'lucide-react';

const PublicDashboard = () => {
  const [statusColor, setStatusColor] = useState<'green' | 'orange' | 'red'>('green');
  const [statusText, setStatusText] = useState('Operational');
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Set initial animation after a short delay
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 300);

    // Simulate status changes for demonstration
    const statusChanger = setInterval(() => {
      const random = Math.random();
      if (random < 0.8) {
        setStatusColor('green');
        setStatusText('Operational');
      } else if (random < 0.95) {
        setStatusColor('orange');
        setStatusText('Under Maintenance');
      } else {
        setStatusColor('red');
        setStatusText('Offline');
      }
    }, 15000); // Change every 15 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(statusChanger);
    };
  }, []);

  // Mission pillars data
  const missionPillars = [
    {
      icon: <Shield className="h-12 w-12 text-neon-blue" />,
      title: "Reliability through Automation",
      description: "Our advanced autonomous systems ensure 99.99% uptime through continuous monitoring and predictive maintenance.",
      animation: "fade-in delay-100"
    },
    {
      icon: <Activity className="h-12 w-12 text-neon-green" />,
      title: "Real-time Predictive Intelligence",
      description: "AI-powered analytics detect potential issues before they occur, enabling proactive intervention and optimal performance.",
      animation: "fade-in delay-300"
    },
    {
      icon: <Satellite className="h-12 w-12 text-neon-purple" />,
      title: "Community Safety via Alerting",
      description: "Instant notification systems protect surrounding communities with immediate alerts and emergency response coordination.",
      animation: "fade-in delay-500"
    },
    {
      icon: <Users className="h-12 w-12 text-neon-orange" />,
      title: "Remote Accessibility with 5G and IoT",
      description: "Cutting-edge connectivity allows authorized personnel to monitor and control systems from anywhere in the world.",
      animation: "fade-in delay-700"
    }
  ];

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-dark-accent">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"></div>
            <h1 className="ml-3 text-2xl font-display font-bold text-white">
              69-BH12-NER <span className="text-neon-blue">Pipeline</span>
            </h1>
          </div>
          
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#" className="text-white hover:text-neon-blue transition-colors">About</a></li>
              <li><a href="#" className="text-white hover:text-neon-blue transition-colors">Services</a></li>
              <li><a href="#" className="text-white hover:text-neon-blue transition-colors">Contact</a></li>
              <li>
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-neon-blue text-dark rounded-md hover:bg-neon-blue/90 transition-all hover:shadow-[0_0_10px_theme(colors.neon.blue)]"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-[100px] -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-neon-purple/5 blur-[80px] -z-10"></div>
          
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Next Generation Pipeline Management System
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Secure, efficient, and intelligent control for critical infrastructure
              </p>
              
              {/* Pipeline Status Badge */}
              <div 
                className={`inline-flex items-center px-6 py-3 rounded-full border ${
                  statusColor === 'green' ? 'border-green-500 bg-green-900/20' : 
                  statusColor === 'orange' ? 'border-orange-500 bg-orange-900/20' : 
                  'border-red-500 bg-red-900/20'
                } mb-12`}
              >
                <div 
                  className={`h-3 w-3 rounded-full ${
                    statusColor === 'green' ? 'bg-green-500' : 
                    statusColor === 'orange' ? 'bg-orange-500' : 
                    'bg-red-500'
                  } mr-2 animate-pulse`}
                ></div>
                <span 
                  className={`font-medium ${
                    statusColor === 'green' ? 'text-green-400' : 
                    statusColor === 'orange' ? 'text-orange-400' : 
                    'text-red-400'
                  }`}
                >
                  Pipeline Status: {statusText}
                </span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#mission" 
                  className="px-6 py-3 bg-neon-blue text-dark rounded-md hover:bg-neon-blue/90 transition-all hover:shadow-[0_0_10px_theme(colors.neon.blue)]"
                >
                  Learn More
                </a>
                <a 
                  href="#" 
                  className="px-6 py-3 border border-neon-blue text-neon-blue rounded-md hover:bg-neon-blue/10 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission pillars section */}
        <section id="mission" className="py-16 md:py-24 bg-dark-lighter">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center text-white mb-12">
              Our Core <span className="text-neon-blue">Mission</span> Pillars
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {missionPillars.map((pillar, index) => (
                <div 
                  key={index}
                  className={`glass-panel p-8 rounded-lg border-t-2 border-t-neon-blue/30 ${animateIn ? pillar.animation : 'opacity-0'}`}
                >
                  <div className="bg-dark-accent p-4 rounded-full inline-block mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                  <p className="text-gray-400">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Ready to Experience Advanced Pipeline Management?
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Join our network of trusted partners and elevate your infrastructure security.
              </p>
              <Link 
                to="/login" 
                className="px-8 py-4 bg-neon-blue text-dark text-lg rounded-md hover:bg-neon-blue/90 transition-all hover:shadow-[0_0_15px_theme(colors.neon.blue)]"
              >
                Access Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-10 border-t border-dark-accent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 69-BH12-NER Pipeline System. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-neon-blue">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-neon-blue">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-neon-blue">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicDashboard;
