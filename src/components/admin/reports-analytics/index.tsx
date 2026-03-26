
"use client"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import OverviewStatsCard from "./overview-statscard";
import BookingTrends from "./booking-trends";
import { OrganizationAnalyticsDataResponse } from "@/types/organization-analytics";
import PeakHours from "./peak-hours";
import SpaceUtilizationReport from "./space-utilization-report";
import TopEmployees from "./top-employees";

const OrgAdminAnalytics = ({ organizationAnalytics }: { organizationAnalytics: OrganizationAnalyticsDataResponse }) => {
  console.log(organizationAnalytics, "organization Analytics");

  const {
    stats,
    peakBookingHours,
    spaceUtilizationReport,
    bookingTrends,
  } = organizationAnalytics;



  const spaceUtilizationData = [
    {
      space: "Conference Room A",
      bookings: 45,
      utilization: 85,
      revenue: 0,
      hours: 112,
    },
    {
      space: "Meeting Room B",
      bookings: 38,
      utilization: 72,
      revenue: 0,
      hours: 95,
    },
    {
      space: "Auditorium",
      bookings: 28,
      utilization: 68,
      revenue: 0,
      hours: 168,
    },
    {
      space: "Training Room",
      bookings: 25,
      utilization: 62,
      revenue: 0,
      hours: 150,
    },
    {
      space: "Event Space",
      bookings: 22,
      utilization: 58,
      revenue: 0,
      hours: 132,
    },
  ];

  const topEmployees = [
    { name: "John Doe", department: "HR", bookings: 24, hours: 48 },
    {
      name: "Sarah Williams",
      department: "Engineering",
      bookings: 22,
      hours: 44,
    },
    { name: "Mike Johnson", department: "Sales", bookings: 20, hours: 60 },
    { name: "Emily Davis", department: "Marketing", bookings: 18, hours: 36 },
    { name: "David Chen", department: "IT", bookings: 16, hours: 32 },
  ];

  const peakHours = [
    { time: "09:00 AM", bookings: 45 },
    { time: "10:00 AM", bookings: 68 },
    { time: "11:00 AM", bookings: 82 },
    { time: "12:00 PM", bookings: 35 },
    { time: "01:00 PM", bookings: 42 },
    { time: "02:00 PM", bookings: 75 },
    { time: "03:00 PM", bookings: 88 },
    { time: "04:00 PM", bookings: 62 },
    { time: "05:00 PM", bookings: 38 },
  ];

  const maxPeakBookings = Math.max(...peakHours.map((p) => p.bookings));



  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-gray-900 mb-1">Reports & Analytics</h1>
          <p className="text-gray-600 text-sm">
            Comprehensive insights into space utilization and booking patterns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportReport("PDF")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => handleExportReport("Excel")}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <OverviewStatsCard stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <BookingTrends bookingTrends={bookingTrends} />
        <PeakHours peakBookingHours={peakBookingHours} />
      </div>
      {/* Space Utilization Report */}
      <SpaceUtilizationReport spaceUtilizationReport={spaceUtilizationReport} />


      {/* Top Employees */}
      <TopEmployees topEmployees={topEmployees} />
    </div>
  );
}



export default OrgAdminAnalytics;
