
"use client"
import { OrganizationAnalyticsTypeResponse } from "@/types/organization-analytics";
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import OverviewStats from "./overview-stats";
import BookingTrends from "./booking-trends";
import PeakHours from "./peak-hours";
import SpaceUtilization from "./space-utilization";
import TopEmployees from "./top-employees";

interface OrganizationAnalyticsTypeProps {
  organizationAnalyticsData: OrganizationAnalyticsTypeResponse[];
}

const OrgAdminAnalytics = ({ organizationAnalyticsData }: OrganizationAnalyticsTypeProps) => {
  console.log(organizationAnalyticsData, "oganization Analytics Data");
  const {
    stats,
    peakBookingHours,
    spaceUtilizationReport,
    bookingTrends,
    topEmployees

  } = organizationAnalyticsData;

  const handleExportReport = (type: string) => {
    // console.log(`Exporting ${type} report...`);
    alert(`${type} report exported successfully!`);
  };

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

      <OverviewStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Booking Trends */}
        <BookingTrends bookingTrends={bookingTrends} />

        {/* Peak Hours */}

        <PeakHours peakBookingHours={peakBookingHours} />
      </div>

      {/* Space Utilization Report */}
      <SpaceUtilization spaceUtilizationReport={spaceUtilizationReport} handleExportReport={handleExportReport} />


      {/* Top Employees */}
      <TopEmployees topEmployees={topEmployees} handleExportReport={handleExportReport} />
    </div>
  );
}


export default OrgAdminAnalytics;