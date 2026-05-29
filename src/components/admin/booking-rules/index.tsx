"use client"
import PageHeading from "@/components/ui/page-heading";
import { BookingRulesDataType } from "@/types/booking-types";
import { updateBookingRulesAction } from "@/utils/graphql/booking-rules/action";
import { Clock, Calendar, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BookingRulesProps {
  bookingRulesData: BookingRulesDataType;
  orgId: string;
}

const OrgAdminBookingRules = ({ bookingRulesData, orgId }: BookingRulesProps) => {
  console.log("booking Rules Data", orgId)
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

      const res = await updateBookingRulesAction({
        ...payload,
        orgId,
      });
      console.log("payload", {
        ...payload,
        orgId,
      });

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
      orgId: orgId,
      id: bookingRules.id,
    });
  };


  return (
    <div className="p-5">
      <PageHeading title="Booking Rules" description="Configure global booking policies for all spaces" />

      <form className="space-y-5" onSubmit={handleSave}>
        {/* Booking Window Rules */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="w-6 h-6 text-gray-700" />
            <h2 className="text-gray-900 text-base">Booking Window</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="" className="block text-gray-700 mb-2 text-sm">
                Advance Booking Window
              </label>

              <select
                name="advanceBookingWindow"
                value={bookingRules.advanceBookingWindow}
                onChange={(e) =>
                  handleChange("advanceBookingWindow", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                <option value="ONE_DAY">1 day in advance</option>
                <option value="TWO_DAYS">2 days in advance</option>
                <option value="ONE_WEEK">1 week in advance</option>
                <option value="TWO_WEEKS">2 weeks in advance</option>
                <option value="ONE_MONTH">1 month in advance</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                How far in advance employees can book
              </p>
            </div>

            <div>
              <label htmlFor="minNoticePeriod" className="block text-gray-700 mb-2 text-sm">
                Minimum Notice Period
              </label>
              <select
                id="minNoticePeriod"
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
              <label htmlFor="cancellationWindow" className="block text-gray-700 mb-2 text-sm">
                Cancellation Window
              </label>
              <select
                id="cancellationWindow"
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
              <label htmlFor="bufferTime" className="block text-gray-700 mb-2 text-sm">
                Buffer Time Between Bookings
              </label>
              <select
                id="bufferTime"
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
              <label htmlFor="autoApproveBookings" className="relative inline-flex items-center cursor-pointer">
                <input

                  type="checkbox"
                  id="autoApproveBookings"
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
              <label htmlFor="requireAdminApproval" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="requireAdminApproval"
                  checked={bookingRules.requireAdminApproval}
                  onChange={(e) =>
                    handleRequireAdminChange(e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Booking Rules"}
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            onClick={handleReset}
          >
            Reset to Defaults
          </button>
        </div>
      </form>
    </div>
  );
}


export default OrgAdminBookingRules;