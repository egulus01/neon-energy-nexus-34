
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const toggleView = () => setIsLogin(!isLogin);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 sm:px-6 lg:px-8 grid-bg">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/10 blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-neon-purple/10 blur-[80px] -z-10"></div>
      
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-dark-card flex items-center justify-center">
              <Lock className="h-5 w-5 text-neon-blue" />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white">
            {isLogin ? 'Access Portal' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-400">
            {isLogin ? 'Enter your credentials to continue' : 'Register for access to 69-BH12-NER'}
          </p>
        </div>
        
        <div className="glass-panel p-8 rounded-lg">
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-md bg-dark-accent text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-600 rounded-md bg-dark-accent text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-md bg-dark-accent text-white focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-gray-600 rounded bg-dark-accent"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="text-neon-blue hover:text-neon-blue/80">
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <Link 
                  to="/dashboard" 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-dark bg-neon-blue hover:bg-neon-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue focus:ring-offset-dark transition-all duration-200 hover:shadow-[0_0_15px_theme(colors.neon.blue)]"
                >
                  {isLogin ? 'Sign in' : 'Create account'}
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-card text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-dark-accent hover:bg-dark-accent/80"
              >
                ID Card
              </button>
              <button
                className="w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-dark-accent hover:bg-dark-accent/80"
              >
                Biometric
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={toggleView}
                className="ml-1 text-neon-blue hover:text-neon-blue/80"
              >
                {isLogin ? 'Register' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-300">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
