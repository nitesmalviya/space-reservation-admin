"use client";
import { SummaryCard, SummaryCardProps } from "@/components/SummaryCard";
import { Building2, Users, Calendar, CalendarCheck } from "lucide-react";


export interface Organization {
  name: string;
  employees: number;
  industry: string;
  status: string;
}

export interface Booking {
  space: string;
  organization: string;
  date: string;
  time: string;
}

interface DashboardData {
  readonly recentOrganizations: Organization[];
  readonly recentBookings: Booking[];
}

const SuperAdminDashboard = ({
  recentOrganizations,
  recentBookings,

}: DashboardData) => {



  const summaryData: SummaryCardProps[] = [
    {
      title: "Total Organizations",
      value: "48",
      change: "+12%",
      trend: "up" as const,
      icon: Building2,
      color: "blue",
    },
    {
      title: "Total Employees",
      value: "1,247",
      change: "+8%",
      trend: "up" as const,
      icon: Users,
      color: "green",
    },
    {
      title: "Total Bookings",
      value: "3,892",
      change: "+23%",
      trend: "up" as const,
      icon: Calendar,
      color: "purple",
    },
    {
      title: "Upcoming Bookings",
      value: "156",
      change: "-5%",
      trend: "down" as const,
      icon: CalendarCheck,
      color: "orange",
    },
  ];

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Super Admin Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data as SummaryCardProps} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Organizations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Recent Organizations</h2>
          <div className="space-y-4">
            {recentOrganizations.map((org, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-gray-900">{org.name}</p>
                  <p className="text-sm text-gray-500">
                    {org.employees} employees • {org.industry}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${org.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {org.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Upcoming Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-gray-900">{booking.space}</p>
                  <p className="text-sm text-gray-500">
                    {booking.organization}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{booking.date}</p>
                  <p className="text-sm text-gray-500">{booking.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default SuperAdminDashboard;