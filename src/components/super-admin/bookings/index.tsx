"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, Building2, Filter } from "lucide-react";

interface Booking {
  id: string;
  space: string;
  organization: string;
  user: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

export function Bookings() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const bookings: Booking[] = [
    {
      id: "1",
      space: "Conference Room A",
      organization: "Tech Solutions Inc.",
      user: "John Smith",
      date: "Dec 8, 2025",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      status: "Confirmed",
    },
    {
      id: "2",
      space: "Meeting Room B",
      organization: "Global Marketing Co.",
      user: "Sarah Johnson",
      date: "Dec 8, 2025",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "Confirmed",
    },
    {
      id: "3",
      space: "Boardroom",
      organization: "Finance Partners LLC",
      user: "Michael Chen",
      date: "Dec 9, 2025",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: "4",
      space: "Conference Room C",
      organization: "Creative Studios",
      user: "Emily Davis",
      date: "Dec 9, 2025",
      startTime: "3:00 PM",
      endTime: "4:30 PM",
      status: "Pending",
    },
    {
      id: "5",
      space: "Training Room",
      organization: "Healthcare Group",
      user: "Robert Wilson",
      date: "Dec 10, 2025",
      startTime: "1:00 PM",
      endTime: "5:00 PM",
      status: "Confirmed",
    },
    {
      id: "6",
      space: "Small Meeting Room",
      organization: "Tech Solutions Inc.",
      user: "Alex Martinez",
      date: "Dec 10, 2025",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      status: "Cancelled",
    },
  ];

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => b.status.toLowerCase() === filterStatus);

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Booking Management</h1>
        <p className="text-gray-600 text-sm">
          View and manage all workspace bookings
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2.5">
                    <h3 className="text-gray-900 text-base">{booking.space}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Organization</p>
                        <p className="text-sm">{booking.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Booked By</p>
                        <p className="text-sm">{booking.user}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm">{booking.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-sm">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
