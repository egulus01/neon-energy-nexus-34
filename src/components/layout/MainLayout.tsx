import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Home, BarChart3, Users, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { logout, user, theme } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Population Simulation", path: "/simulation", icon: <Users className="w-5 h-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
    { name: "Admin Panel", path: "/admin", icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar for desktop */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-dark-lighter transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"></div>
              <span className="text-lg font-display font-bold tracking-wider text-white">
                Nirmaan
              </span>
            </Link>
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "bg-secondary text-neon-blue neon-border"
                      : "text-gray-400 hover:bg-dark-accent hover:text-white"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-dark-accent">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-gray-400 hover:text-white rounded-md hover:bg-dark-accent transition-colors duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-dark shadow-md border-b border-dark-accent">
          <div className="px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center">
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  onClick={toggleUserMenu}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-orange to-neon-pink"></div>
                  <span className="text-sm font-medium">{user?.name || 'User'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-dark-lighter border border-dark-accent rounded-md shadow-lg z-20">
                    <div className="px-4 py-2 text-sm text-gray-400 border-b border-dark-accent">
                      {user?.email}
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-accent">
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-accent">
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-accent"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-dark p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-70 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* User menu backdrop */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setUserMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;
