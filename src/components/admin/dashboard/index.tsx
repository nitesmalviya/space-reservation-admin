import {
  OverviewStats,
  RecentEmployees,
  UpcomingBookings,
  SpaceUtilizationData,
} from "@/types/dashboard/admin";

import OverviewStatsCard from "./overview-stats-card";
import EmployeeOverview from "./employee-overview";
import SpaceUtilization from "./space-utilization";
import UpcomingBookingsCard from "./upcoming-booking-card";
import PageHeading from "@/components/ui/page-heading";

interface AdminDashboardStatsComponentProps {
  overviewStatsData: OverviewStats;
  upcomingBookingsData: UpcomingBookings;
  spaceUtilizationData: SpaceUtilizationData;
  recentEmployeesData: RecentEmployees;
}

const OrgAdminDashboard = ({
  overviewStatsData,
  upcomingBookingsData,
  spaceUtilizationData,
  recentEmployeesData,
}: AdminDashboardStatsComponentProps) => {
  return (
    <div className="p-5">
      <PageHeading 
        title="Dashboard"
        description="Welcome back! Here's your organization overview." />

      {/* Metrics */}
      <OverviewStatsCard overviewStatsData={overviewStatsData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <UpcomingBookingsCard upcomingBookingsData={upcomingBookingsData} />
        <SpaceUtilization spaceUtilizationData={spaceUtilizationData} />
      </div>

      {/* Employee Overview */}
      <EmployeeOverview recentEmployeesData={recentEmployeesData} />
    </div>
  );
};

export default OrgAdminDashboard;