
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Users, MapPin, User, Shield, Settings, Search, MoreVertical, BarChart3, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Admin = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Sample user data
  const userData = {
    total: 24782,
    active: 18345,
    new: 1243,
    admins: 127
  };
  
  // Sample region data
  const regionData = [
    { id: 'NE-01', name: 'Assam Central', users: 5642, status: 'active' },
    { id: 'NE-02', name: 'Arunachal North', users: 4218, status: 'active' },
    { id: 'NE-03', name: 'Manipur Corridor', users: 3561, status: 'warning' },
    { id: 'NE-04', name: 'Meghalaya Hills', users: 2987, status: 'active' },
    { id: 'NE-05', name: 'Nagaland East', users: 2453, status: 'inactive' },
    { id: 'NE-06', name: 'Tripura South', users: 2211, status: 'active' },
    { id: 'NE-07', name: 'Mizoram Border', users: 1843, status: 'warning' },
    { id: 'NE-08', name: 'Sikkim Heights', users: 1867, status: 'active' },
  ];
  
  // Sample pie chart data for user roles
  const roleData = [
    { name: 'Engineers', value: 8432, color: '#00FFFF' },
    { name: 'Analysts', value: 6218, color: '#9B30FF' },
    { name: 'Field Operators', value: 5634, color: '#FF4500' },
    { name: 'Management', value: 2321, color: '#39FF14' },
    { name: 'Support Staff', value: 2177, color: '#FF1493' },
  ];
  
  // Sample bar chart data for system access
  const accessData = [
    { name: 'Jan', value: 2300 },
    { name: 'Feb', value: 2500 },
    { name: 'Mar', value: 3200 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 4200 },
    { name: 'Jun', value: 5100 },
    { name: 'Jul', value: 5800 },
    { name: 'Aug', value: 6200 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">
            Admin <span className="text-neon-orange">Control Panel</span>
          </h1>
          
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search users or regions"
                className="pl-10 pr-4 py-2 bg-dark-card border border-dark-accent rounded-md text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-transparent"
              />
            </div>
            
            <button className="px-4 py-2 bg-dark-card border border-dark-accent rounded-md text-gray-300 text-sm flex items-center space-x-2 hover:border-gray-500">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Users",
              value: userData.total,
              icon: <Users className="h-6 w-6 text-neon-blue" />,
              color: "border-neon-blue"
            },
            {
              title: "Active Sessions",
              value: userData.active,
              icon: <User className="h-6 w-6 text-neon-green" />,
              color: "border-neon-green"
            },
            {
              title: "Admin Users",
              value: userData.admins,
              icon: <Shield className="h-6 w-6 text-neon-orange" />,
              color: "border-neon-orange"
            },
            {
              title: "Regions",
              value: regionData.length,
              icon: <MapPin className="h-6 w-6 text-neon-purple" />,
              color: "border-neon-purple"
            }
          ].map((card, index) => (
            <div 
              key={index}
              className={`glass-panel p-6 border-l-4 ${card.color}`}
            >
              <div className="flex justify-between">
                <p className="text-gray-400 font-medium">{card.title}</p>
                <div className="p-2 bg-dark-accent rounded-md">
                  {card.icon}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-white">{card.value.toLocaleString()}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">User Management</h3>
                <button className="px-3 py-1 bg-neon-orange text-dark text-sm rounded-md hover:bg-neon-orange/90 transition-colors">
                  Add User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm border-b border-dark-accent">
                      <th className="pb-3 pl-4">Name</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Region</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Last Active</th>
                      <th className="pb-3 text-right pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-accent">
                    {[
                      {
                        name: 'Alex Sharma',
                        role: 'Senior Engineer',
                        region: 'NE-01',
                        status: 'active',
                        lastActive: '2 minutes ago'
                      },
                      {
                        name: 'Priya Mehta',
                        role: 'Regional Manager',
                        region: 'NE-03',
                        status: 'active',
                        lastActive: '1 hour ago'
                      },
                      {
                        name: 'Rahul Verma',
                        role: 'Data Analyst',
                        region: 'NE-02',
                        status: 'active',
                        lastActive: '20 minutes ago'
                      },
                      {
                        name: 'Sunita Patel',
                        role: 'Field Operator',
                        region: 'NE-04',
                        status: 'inactive',
                        lastActive: '3 days ago'
                      },
                      {
                        name: 'Dev Singh',
                        role: 'Security Admin',
                        region: 'NE-01',
                        status: 'active',
                        lastActive: '5 hours ago'
                      }
                    ].map((user, index) => (
                      <tr key={index} className="hover:bg-dark-accent/30">
                        <td className="py-3 pl-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-dark-accent flex items-center justify-center text-white mr-3">
                              {user.name.charAt(0)}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3">{user.role}</td>
                        <td className="py-3">{user.region}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                            user.status === 'active' 
                              ? 'bg-neon-green/20 text-neon-green' 
                              : 'bg-gray-600/20 text-gray-400'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400">{user.lastActive}</td>
                        <td className="py-3 text-right pr-4">
                          <button className="text-gray-400 hover:text-white">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  Showing 5 of {userData.total.toLocaleString()} users
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-dark-accent rounded-md text-gray-400 hover:border-gray-500">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-dark-accent rounded-md text-gray-400 hover:border-gray-500">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Regions Tab */}
          <TabsContent value="regions">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Region Management</h3>
                <div>
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-3 py-1 bg-dark-accent border border-dark-accent rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-neon-purple"
                  >
                    <option value="all">All Regions</option>
                    {regionData.map(region => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionData.map((region) => (
                  <div 
                    key={region.id}
                    className="card-gradient rounded-lg p-4 border border-white/10 hover:border-neon-purple/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{region.name}</h4>
                        <p className="text-xs text-gray-400 mt-1">ID: {region.id}</p>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        region.status === 'active' ? 'bg-neon-green/20 text-neon-green' : 
                        region.status === 'warning' ? 'bg-neon-orange/20 text-neon-orange' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {region.status}
                      </span>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">User Count</p>
                        <p className="text-xl font-medium text-white">{region.users.toLocaleString()}</p>
                      </div>
                      
                      <button className="p-1.5 bg-dark-accent rounded-md text-gray-400 hover:text-white">
                        <BarChart3 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-dark-accent flex justify-between">
                      <button className="text-xs text-neon-purple hover:text-neon-purple/80">View Details</button>
                      <button className="text-xs text-gray-400 hover:text-gray-300">Configuration</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Role Distribution */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">User Role Distribution</h3>
                  <button className="p-1.5 bg-dark-accent rounded-md text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={50}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {roleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', border: '1px solid #444' }} 
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#aaa' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {roleData.map((role, index) => (
                    <div key={index} className="text-center">
                      <div 
                        className="h-3 w-3 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: role.color }}
                      ></div>
                      <p className="text-xs text-gray-400">{role.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* System Access Trends */}
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">System Access Trends</h3>
                  <button className="p-1.5 bg-dark-accent rounded-md text-gray-400 hover:text-white">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={accessData}>
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
                        fill="#9B30FF"
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* User Activity Stats */}
              <div className="glass-panel p-6 lg:col-span-2">
                <h3 className="text-lg font-medium text-white mb-6">User Activity Statistics</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {[
                    { label: "Avg. Daily Logins", value: "3,245" },
                    { label: "Active Sessions", value: "1,876" },
                    { label: "Failed Login Attempts", value: "124" },
                    { label: "New Accounts (30d)", value: "438" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-dark-accent p-4 rounded-md text-center">
                      <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-medium text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-dark-lighter p-4 rounded-md border border-dark-accent">
                  <h4 className="text-white font-medium mb-3">Security Recommendations</h4>
                  
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-neon-orange mt-1.5 mr-2"></div>
                      <span>Implement mandatory 2FA for all administrative accounts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-neon-orange mt-1.5 mr-2"></div>
                      <span>Review inactive accounts (124 accounts inactive for 30+ days)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-neon-green mt-1.5 mr-2"></div>
                      <span>Current password policy compliance: 94% (improved from 89%)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-neon-blue mt-1.5 mr-2"></div>
                      <span>Session timeout currently set to 30 minutes for all users</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
