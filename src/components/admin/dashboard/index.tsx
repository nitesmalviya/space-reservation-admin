import { DashboardResponse  } from "@/types/dashboard/admin";
import StatsDataCard from "./stats-data-card";
import UpcomingBookings from "./upcoming-bookings";
import SpaceUtilization from "./space-utilization";
import EmployeeOverview from "./employee-overview";
import PageHeading from "@/components/ui/page-heading";

const OrgAdminDashboard = ({
  statsData,
  upcomingBookings,
  spaceUtilization,
  recentEmployees,
}: DashboardResponse ) => {

  return (
    <div className="p-5">
      <PageHeading title="Dashboard" description="Welcome back! Here's your organization overview."/>
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatsDataCard statsData={statsData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Upcoming Bookings */}
        <UpcomingBookings upcomingBookings={upcomingBookings} />
        {/* Space Utilization */}
        <SpaceUtilization spaceUtilization={spaceUtilization}/>
      </div>
      {/* Employee Overview */}
      <EmployeeOverview recentEmployees={recentEmployees} />
    </div>
  );
}


export default OrgAdminDashboard;