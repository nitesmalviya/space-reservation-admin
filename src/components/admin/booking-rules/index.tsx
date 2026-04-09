"use client"
import { Clock, Calendar, Users, Shield } from "lucide-react";

export function OrgAdminBookingRules() {
  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Booking Rules</h1>
        <p className="text-gray-600 text-sm">
          Configure global booking policies for all spaces
        </p>
      </div>

      <div className="space-y-5">
        {/* Booking Window Rules */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="w-6 h-6 text-gray-700" />
            <h2 className="text-gray-900 text-base">Booking Window</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Advance Booking Window
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="1">1 day in advance</option>
                <option value="2">2 days in advance</option>
                <option value="3">3 days in advance</option>
                <option value="7">1 week in advance</option>
                <option value="14">2 weeks in advance</option>
                <option value="30">1 month in advance</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                How far in advance employees can book
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Minimum Notice Period
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="0">Immediate booking allowed</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="120">2 hours before</option>
                <option value="240">4 hours before</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Minimum time before booking starts
              </p>
            </div>
          </div>
        </div>

        {/* Cancellation Rules */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-gray-700" />
            <h2 className="text-gray-900 text-base">Cancellation Policy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Cancellation Window
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="120">2 hours before</option>
                <option value="240">4 hours before</option>
                <option value="1440">1 day before</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Deadline to cancel a booking
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Buffer Time Between Bookings
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="0">No buffer time</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Time for cleaning between bookings
              </p>
            </div>
          </div>
        </div>

        {/* Approval Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-gray-700" />
            <h2 className="text-gray-900 text-base">Approval Settings</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <p className="text-gray-900 text-sm">Auto-approve Bookings</p>
                <p className="text-xs text-gray-500">
                  Automatically approve all booking requests
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 text-sm">Require Admin Approval</p>
                <p className="text-xs text-gray-500">
                  All bookings need admin approval
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>



        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
            Save Booking Rules
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
