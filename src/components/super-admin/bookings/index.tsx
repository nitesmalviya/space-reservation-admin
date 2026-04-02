"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, Building2, Filter } from "lucide-react";
import PageHeading from "@/components/ui/page-heading";
import { Booking, BookingsDataResponse } from "@/types/bookings-type";
import { formatDate } from "@/utils/constant";

 

interface BookingsProps {
  bookingsData: BookingsDataResponse;
}

const Bookings = ({ bookingsData }: BookingsProps) => {
  const bookingList:Booking[] = bookingsData?.items || [];
  const [filterStatus, setFilterStatus] = useState<string>("all");
  console.log("Bookings Data:", bookingList);
  return (
    <div className="p-5">
      <PageHeading
        title="Booking Management"
        description="View and manage all workspace bookings"
      />

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {bookingList.map((booking) => (
            <div
              key={booking.id}
              className="p-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2.5">
                    <h3 className="text-gray-900 text-base">
                      {booking?.space?.name || "-"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {booking?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Info icon={<Building2 className="w-4 h-4" />} label="Organization" value={booking?.organization?.name || "-"} />
                    <Info icon={<MapPin className="w-4 h-4" />} label="Booked By" value={booking?.user?.name || "-"} />
                    <Info icon={<Calendar className="w-4 h-4" />} label="Date" value={formatDate(booking?.createdAt)} />
                    <Info
                      icon={<Clock className="w-4 h-4" />}
                      label="Time"
                      value={`${booking?.startTime} - ${booking?.endTime}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable component (clean UI)
const Info = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-2 text-gray-600">
    <div className="w-4 h-4">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);

export default Bookings;