"use client"
import { BookingRulesResponse } from "@/types/bookings-type";
import { updateBookingRulesAction } from "@/utils/graphql/booking-rules/actions";
import { Clock, Calendar, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BookingRulesProps {
  bookingRulesData: BookingRulesResponse;
}
export function OrgAdminBookingRules({ bookingRulesData }: BookingRulesProps) {
  console.log("booking Rules Data", bookingRulesData)
  const [bookingRules, setBookingRules] = useState(bookingRulesData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookingRulesData) {
      setBookingRules(bookingRulesData);
    }
  }, [bookingRulesData]);

  const handleChange = (name: string, value: string) => {
    setBookingRules(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAutoApproveChange = (checked: boolean) => {
    setBookingRules(prev => ({
      ...prev,
      autoApproveBookings: checked,
      requireAdminApproval: !checked,
    }));
  };

  const handleRequireAdminChange = (checked: boolean) => {
    setBookingRules(prev => ({
      ...prev,
      requireAdminApproval: checked,
      autoApproveBookings: !checked,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      debugger

      const { id, ...payload } = bookingRules;

      const res = await updateBookingRulesAction(payload);
      console.log(res);

      if (res?.updateBookingRules?.success) {
        toast.success(res.updateBookingRules.message);

      } else {
        toast.error(res.updateBookingRules.message || "Failed to update booking rules");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setBookingRules({
      advanceBookingWindow: "ONE_DAY",
      minNoticePeriod: "IMMEDIATE",
      cancellationWindow: "THIRTY_MINS",
      bufferTime: "NO_BUFFER",
      requireAdminApproval: false,
      autoApproveBookings: true,
      orgId: "0a4b6af1-cbc9-4776-9f32-0c918eecb7c3"
    });
  };


  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Booking Rules</h1>
        <p className="text-gray-600 text-sm">
          Configure global booking policies for all spaces
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSave}>
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

              <select
                value={bookingRules.advanceBookingWindow}
                onChange={(e) =>
                  handleChange("advanceBookingWindow", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="ONE_DAY">1 day in advance</option>
                <option value="ONE_WEEK">2 days in advance</option>
                <option value="ONE_MONTH">3 days in advance</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                How far in advance employees can book
              </p>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Minimum Notice Period
              </label>
              <select
                value={bookingRules.minNoticePeriod}
                onChange={(e) => handleChange("minNoticePeriod", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="IMMEDIATE">Immediate booking allowed</option>
                <option value="THIRTY_MINS">30 minutes before</option>
                <option value="ONE_HOUR">1 hour before</option>
                <option value="TWO_HOURS">2 hours before</option>
                <option value="FOUR_HOURS">4 hours before</option>
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
              <select
                value={bookingRules.cancellationWindow}
                onChange={(e) => handleChange("cancellationWindow", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="THIRTY_MINS">30 minutes before</option>
                <option value="ONE_HOUR">1 hour before</option>
                <option value="TWO_HOURS">2 hours before</option>
                <option value="FOUR_HOURS">4 hours before</option>
                <option value="ONE_DAY">1 day before</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Deadline to cancel a booking
              </p>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Buffer Time Between Bookings
              </label>
              <select
                value={bookingRules.bufferTime}
                onChange={(e) => handleChange("bufferTime", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="NO_BUFFER">No buffer time</option>
                <option value="FIVE_MINS">5 minutes</option>
                <option value="TEN_MINS">10 minutes</option>
                <option value="FIFTEEN_MINS">15 minutes</option>
                <option value="THIRTY_MINS">30 minutes</option>
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
                <input
                  type="checkbox"
                  checked={bookingRules.autoApproveBookings}
                  onChange={(e) =>
                    handleAutoApproveChange(e.target.checked)
                  }
                  className="sr-only peer" />
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
                  checked={bookingRules.requireAdminApproval}
                  onChange={(e) =>
                    handleRequireAdminChange(e.target.checked)
                  }
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
          <button
            disabled={loading}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
            {loading ? "Saving..." : "Save Booking Rules"}
          </button>
          <button
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            onClick={handleReset}>
            Reset to Defaults
          </button>
        </div>
      </form>
    </div>
  );
}
