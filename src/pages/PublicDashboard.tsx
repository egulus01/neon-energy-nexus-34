
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Satellite, Users, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
            <Tabs defaultValue="about" className="w-auto">
              <TabsList className="bg-transparent">
                <TabsTrigger value="about" className="text-white hover:text-neon-blue transition-colors">About</TabsTrigger>
                <TabsTrigger value="services" className="text-white hover:text-neon-blue transition-colors">Services</TabsTrigger>
                <TabsTrigger value="contact" className="text-white hover:text-neon-blue transition-colors">Contact</TabsTrigger>
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-neon-blue text-dark rounded-md hover:bg-neon-blue/90 transition-all hover:shadow-[0_0_10px_theme(colors.neon.blue)]"
                >
                  Login
                </Link>
              </TabsList>
            </Tabs>
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
                  href="#contact" 
                  className="px-6 py-3 border border-neon-blue text-neon-blue rounded-md hover:bg-neon-blue/10 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content sections */}
        <Tabs defaultValue="about" className="w-full container mx-auto px-4">
          {/* About Tab */}
          <TabsContent value="about" className="py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
                About Our <span className="text-neon-blue">Pipeline System</span>
              </h2>
              
              <div className="glass-panel p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-300 mb-6">
                  The NorthEast Regional Petroleum Development Initiative (69-BH12-NER) was established in 2023 to revolutionize energy infrastructure management through cutting-edge technology and sustainable practices. Our mission is to ensure reliable energy delivery while prioritizing environmental stewardship and community safety.
                </p>
                <p className="text-gray-300">
                  Through advanced monitoring systems, predictive maintenance, and real-time analytics, we maintain the highest standards of operational excellence across our network of 14,600 miles of pipeline infrastructure.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-panel p-6 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neon-blue/20 mb-4">
                    <Shield className="h-8 w-8 text-neon-blue" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">20+ Years</h4>
                  <p className="text-gray-400">of operational excellence in energy infrastructure</p>
                </div>
                
                <div className="glass-panel p-6 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neon-green/20 mb-4">
                    <Activity className="h-8 w-8 text-neon-green" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">99.99% Uptime</h4>
                  <p className="text-gray-400">maintaining exceptional reliability standards</p>
                </div>
                
                <div className="glass-panel p-6 text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neon-orange/20 mb-4">
                    <Users className="h-8 w-8 text-neon-orange" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">500+ Experts</h4>
                  <p className="text-gray-400">dedicated to system monitoring and maintenance</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services" className="py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
                Our <span className="text-neon-purple">Services</span>
              </h2>
              
              <div className="glass-panel p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Pipeline Solutions</h3>
                <p className="text-gray-300 mb-6">
                  We offer end-to-end solutions for energy infrastructure management, utilizing AI-driven analytics, real-time monitoring, and advanced maintenance protocols to ensure peak performance and reliability.
                </p>
                <p className="text-gray-300">
                  Our services are designed to optimize operational efficiency while maintaining the highest safety and environmental standards.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Predictive Maintenance",
                    description: "AI-powered systems analyze real-time data to predict potential failures before they occur, enabling proactive maintenance and preventing costly downtime.",
                    icon: <Activity className="h-6 w-6 text-neon-blue" />
                  },
                  {
                    title: "24/7 Monitoring & Control",
                    description: "Our state-of-the-art control center provides continuous supervision of all pipeline operations, ensuring immediate response to any operational issues.",
                    icon: <Satellite className="h-6 w-6 text-neon-green" />
                  },
                  {
                    title: "Security & Compliance",
                    description: "Comprehensive security protocols and regular compliance audits to ensure adherence to industry standards and regulatory requirements.",
                    icon: <Shield className="h-6 w-6 text-neon-orange" />
                  },
                  {
                    title: "Environmental Impact Assessment",
                    description: "Continuous monitoring and assessment of environmental impact, with implementation of measures to minimize ecological footprint.",
                    icon: <CheckCircle className="h-6 w-6 text-neon-purple" />
                  }
                ].map((service, index) => (
                  <div key={index} className="flex gap-6 items-start glass-panel p-6">
                    <div className="p-3 rounded-full bg-dark-accent shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                      <p className="text-gray-400">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Contact Tab */}
          <TabsContent value="contact" id="contact" className="py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
                Get in <span className="text-neon-pink">Touch</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-dark-accent shrink-0">
                        <Mail className="h-6 w-6 text-neon-blue" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                        <p className="text-gray-400">info@ner-pipeline.gov</p>
                        <p className="text-gray-400">support@ner-pipeline.gov</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-dark-accent shrink-0">
                        <Phone className="h-6 w-6 text-neon-green" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Phone</h4>
                        <p className="text-gray-400">Main Office: +1 (555) 123-4567</p>
                        <p className="text-gray-400">Emergency: +1 (555) 911-0011</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-dark-accent shrink-0">
                        <MessageSquare className="h-6 w-6 text-neon-pink" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">Live Support</h4>
                        <p className="text-gray-400">Available 24/7 for emergency situations</p>
                        <p className="text-gray-400">Business hours: 8:00 AM - 6:00 PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="w-full bg-dark-lighter border border-dark-accent rounded-md px-4 py-2 text-white"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full bg-dark-lighter border border-dark-accent rounded-md px-4 py-2 text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows={5}
                        className="w-full bg-dark-lighter border border-dark-accent rounded-md px-4 py-2 text-white resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-neon-blue text-dark font-medium py-3 rounded-md hover:bg-neon-blue/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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
              © {new Date().getFullYear()} 69-BH12-NER Pipeline System. All rights reserved.
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
