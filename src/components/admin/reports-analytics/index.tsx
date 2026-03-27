
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

interface ReportAnalyticsProps {
  organizationAnalytics: OrganizationAnalyticsDataResponse;
}

const OrgAdminAnalytics = ({ organizationAnalytics }: ReportAnalyticsProps) => {
  const {
    stats,
    peakBookingHours,
    spaceUtilizationReport,
    bookingTrends,
    topEmployees

  } = organizationAnalytics;


  const handleExportReport = (type: string) => {
    console.log(type, "type");
  }
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
