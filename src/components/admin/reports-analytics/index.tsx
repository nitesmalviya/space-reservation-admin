
"use client"
import {
  Download
} from "lucide-react";
import OverviewStatsCard from "./overview-statscard";
import BookingTrends from "./booking-trends";
import { ExportFormat, OrganizationAnalyticsDataResponse } from "@/types/organization-analytics";
import PeakHours from "./peak-hours";
import SpaceUtilizationReport from "./space-utilization-report";
import TopEmployees from "./top-employees";
import { exportOrganizationAnalyticsAction } from "@/utils/graphql/organization-analytics/actions";

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


  const handleExportReport = async (type: ExportFormat) => {
    const url = await exportOrganizationAnalyticsAction({
      format: type,
      orgId: "b51cc444-81ab-4509-9e2d-69a2e0b2e688",
      filter: null,
    });
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = `organization-analytics-${new Date().toISOString()}.${type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
            onClick={() => handleExportReport("pdf")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => handleExportReport("excel")}
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
