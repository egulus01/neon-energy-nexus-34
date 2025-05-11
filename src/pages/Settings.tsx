
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Save, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const { theme, setTheme, thresholds, updateThresholds } = useAuth();
  const [localThresholds, setLocalThresholds] = useState({
    pressure: thresholds.pressure,
    temperature: thresholds.temperature,
    flowRate: thresholds.flowRate
  });
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize with thresholds from context when they change
  useEffect(() => {
    setLocalThresholds({
      pressure: thresholds.pressure,
      temperature: thresholds.temperature,
      flowRate: thresholds.flowRate
    });
  }, [thresholds]);

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    console.log('Toggling theme to:', newTheme); // Debug log
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Application theme changed to ${newTheme} mode.`,
    });
  };

  const handleThresholdChange = (value: number[], type: 'pressure' | 'temperature' | 'flowRate') => {
    setLocalThresholds(prev => ({
      ...prev,
      [type]: value[0]
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      updateThresholds(localThresholds);
      setIsSaving(false);
    }, 800);
  };

  const handleReset = () => {
    setLocalThresholds({
      pressure: 200,
      temperature: 80,
      flowRate: 300
    });
    toast({
      title: "Settings Reset",
      description: "Threshold values have been reset to defaults.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">
            System <span className="text-neon-blue">Settings</span>
          </h1>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-medium text-white mb-6">Appearance</h2>

          <div className="flex items-center justify-between py-4 border-b border-dark-accent">
            <div>
              <h3 className="text-lg text-white">Theme Mode</h3>
              <p className="text-sm text-gray-400">Toggle between dark and light mode</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-gray-400" />
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={handleThemeToggle}
              />
              <Moon className="h-5 w-5 text-neon-blue" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-xl font-medium text-white mb-6">Alert Thresholds</h2>
          <p className="text-sm text-gray-400 mb-6">
            Configure the threshold values that trigger warnings and critical alerts in the system.
          </p>

          <div className="space-y-8">
            {/* Pressure Threshold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white">Pressure Threshold (PSI)</h3>
                <span className={`text-lg font-medium ${
                  localThresholds.pressure > 220 ? 'text-red-500' : 
                  localThresholds.pressure > 180 ? 'text-neon-orange' : 'text-neon-green'
                }`}>
                  {localThresholds.pressure}
                </span>
              </div>
              <div className="pt-2">
                <Slider
                  value={[localThresholds.pressure]}
                  min={100}
                  max={300}
                  step={5}
                  onValueChange={(value) => handleThresholdChange(value, 'pressure')}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span>200</span>
                  <span>300</span>
                </div>
              </div>
            </div>

            {/* Temperature Threshold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white">Temperature Threshold (°C)</h3>
                <span className={`text-lg font-medium ${
                  localThresholds.temperature > 85 ? 'text-red-500' : 
                  localThresholds.temperature > 70 ? 'text-neon-orange' : 'text-neon-green'
                }`}>
                  {localThresholds.temperature}
                </span>
              </div>
              <div className="pt-2">
                <Slider
                  value={[localThresholds.temperature]}
                  min={50}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleThresholdChange(value, 'temperature')}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Flow Rate Threshold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white">Flow Rate Threshold (L/min)</h3>
                <span className={`text-lg font-medium ${
                  localThresholds.flowRate > 320 ? 'text-red-500' : 
                  localThresholds.flowRate > 280 ? 'text-neon-orange' : 'text-neon-green'
                }`}>
                  {localThresholds.flowRate}
                </span>
              </div>
              <div className="pt-2">
                <Slider
                  value={[localThresholds.flowRate]}
                  min={150}
                  max={350}
                  step={5}
                  onValueChange={(value) => handleThresholdChange(value, 'flowRate')}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>150</span>
                  <span>250</span>
                  <span>350</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>

              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-neon-blue text-dark hover:bg-neon-blue/90"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-t-dark border-r-transparent border-b-transparent border-l-transparent animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
