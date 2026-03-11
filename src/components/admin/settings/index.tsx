"use client"
import { useState } from 'react';
import { Save, Bell, Mail, Shield, Globe, Clock, User } from 'lucide-react';

export function OrgAdminSettings() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    bookingConfirmations: true,
    cancellationAlerts: true,
    dailyDigest: false,
    weeklyReport: true,
    
    // Booking Settings
    autoApproval: false,
    allowCancellation: true,
    cancellationDeadline: 60,
    bufferTime: 10,
    
    // Account Settings
    adminName: 'Admin',
    adminEmail: 'admin@bitcot.com',
    phoneNumber: '+91 731 1234567',
    timezone: 'Asia/Kolkata',
    
    // Privacy Settings
    showEmployeeStats: true,
    allowDataExport: true,
    sessionTimeout: 30,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // console.log('Resetting settings...');
    }
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600 text-sm">Manage your organization preferences and configurations</p>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        {/* Account Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900 text-base font-medium">Account Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Admin Name</label>
              <input
                type="text"
                value={settings.adminName}
                onChange={(e) => setSettings({...settings, adminName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                value={settings.phoneNumber}
                onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Timezone</label>
              <select 
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-5">
            <Bell className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900 text-base font-medium">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive email alerts for important updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Booking Confirmations</p>
                <p className="text-xs text-gray-500">Get notified when bookings are confirmed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.bookingConfirmations}
                  onChange={(e) => setSettings({...settings, bookingConfirmations: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Cancellation Alerts</p>
                <p className="text-xs text-gray-500">Receive alerts when bookings are cancelled</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.cancellationAlerts}
                  onChange={(e) => setSettings({...settings, cancellationAlerts: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Daily Digest</p>
                <p className="text-xs text-gray-500">Summary of daily bookings and activities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.dailyDigest}
                  onChange={(e) => setSettings({...settings, dailyDigest: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 text-sm font-medium">Weekly Report</p>
                <p className="text-xs text-gray-500">Comprehensive weekly analytics report</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.weeklyReport}
                  onChange={(e) => setSettings({...settings, weeklyReport: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-5">
            <Clock className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900 text-base font-medium">Booking Configuration</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Auto-Approve Bookings</p>
                <p className="text-xs text-gray-500">Automatically approve all booking requests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.autoApproval}
                  onChange={(e) => setSettings({...settings, autoApproval: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Allow Employee Cancellations</p>
                <p className="text-xs text-gray-500">Let employees cancel their own bookings</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.allowCancellation}
                  onChange={(e) => setSettings({...settings, allowCancellation: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Cancellation Deadline (minutes)</label>
                <input
                  type="number"
                  value={settings.cancellationDeadline}
                  onChange={(e) => setSettings({...settings, cancellationDeadline: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum time before booking starts</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Buffer Time (minutes)</label>
                <input
                  type="number"
                  value={settings.bufferTime}
                  onChange={(e) => setSettings({...settings, bufferTime: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Cleaning time between bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="w-5 h-5 text-gray-700" />
            <h2 className="text-gray-900 text-base font-medium">Privacy & Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Show Employee Statistics</p>
                <p className="text-xs text-gray-500">Display employee booking statistics publicly</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.showEmployeeStats}
                  onChange={(e) => setSettings({...settings, showEmployeeStats: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm font-medium">Allow Data Export</p>
                <p className="text-xs text-gray-500">Enable exporting reports and data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.allowDataExport}
                  onChange={(e) => setSettings({...settings, allowDataExport: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm max-w-xs"
              />
              <p className="text-xs text-gray-500 mt-1">Automatically log out after inactivity</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Reset to Defaults
          </button>
        </div>
      </form>
    </div>
  );
}