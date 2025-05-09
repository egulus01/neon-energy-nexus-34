
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Globe, BarChart3, Activity } from 'lucide-react';

const Index = () => {
  // Reference for animation
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Basic animation for stats on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden grid-bg">
        {/* Glowing orb background effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/20 blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-purple/20 blur-[80px] -z-10"></div>
        
        {/* Project identifier */}
        <div className="absolute top-10 left-10 flex items-center">
          <div className="h-3 w-3 rounded-full bg-neon-blue animate-pulse mr-2"></div>
          <span className="font-mono text-xs text-neon-blue">PROJECT 69-BH12-NER</span>
        </div>
        
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            <span className="text-neon-blue animate-pulse-neon">NorthEast Regional</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-orange to-neon-pink">
              Petroleum Development
            </span>
          </h1>
          
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-10">
            A strategic initiative for energy independence and sustainable petroleum sourcing to support a population of 20 billion users.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="px-8 py-3 rounded-md bg-neon-blue text-dark font-medium hover:bg-neon-blue/90 transition-all duration-300 hover:shadow-[0_0_15px_theme(colors.neon.blue)] flex items-center"
            >
              <span>View Dashboard</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-3 rounded-md border border-neon-blue text-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Core Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-lighter">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
            Core <span className="text-neon-blue">Mission</span> Pillars
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Droplet className="h-10 w-10 text-neon-blue" />,
                title: "Petroleum Sourcing",
                description: "Advanced extraction techniques and strategic reserves management for optimal resource allocation."
              },
              {
                icon: <Globe className="h-10 w-10 text-neon-green" />,
                title: "Sustainability",
                description: "Balancing development with environmental conservation through cutting-edge technology."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-neon-orange" />,
                title: "Energy Independence",
                description: "Reducing external dependencies through domestic production and efficient supply chains."
              },
              {
                icon: <Activity className="h-10 w-10 text-neon-pink" />,
                title: "Strategic Balance",
                description: "Maintaining equilibrium between resource utilization and long-term regional development."
              }
            ].map((pillar, index) => (
              <div 
                key={index}
                className="glass-panel p-6 transition-transform duration-300 hover:transform hover:scale-105"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-gray-300">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef} 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-lighter opacity-0 transition-opacity duration-700"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
            Project <span className="text-neon-purple">Statistics</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: "20B+",
                label: "Population Capacity",
                color: "from-neon-blue to-blue-500"
              },
              {
                value: "87.3%",
                label: "Energy Efficiency",
                color: "from-neon-green to-green-500"
              },
              {
                value: "14.6M",
                label: "Barrels/Day Capacity",
                color: "from-neon-orange to-orange-600"
              },
              {
                value: "99.8%",
                label: "System Reliability",
                color: "from-neon-purple to-purple-600"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="card-gradient rounded-lg p-6 border border-white/10"
              >
                <h3 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-dark-card border-t border-dark-accent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple mr-2"></div>
            <span className="font-display font-bold tracking-wider text-white">69-BH12-NER</span>
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Energy Directorate. All rights reserved. CLASSIFIED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
