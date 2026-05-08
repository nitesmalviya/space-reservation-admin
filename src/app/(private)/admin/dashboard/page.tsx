import OrgAdminDashboard from "@/components/admin/dashboard";
import { getAllAdminDashboardAction } from "@/utils/graphql/admin-dashboard/action";

const DashboardPage = async () => {
  const res = await getAllAdminDashboardAction();

  const dashboardData = res?.adminDashboard.dashboard;

  const statsData = dashboardData?.overviewStats;
  const upcomingBookings = dashboardData?.upcomingBookings ?? [];
  const spaceUtilization = dashboardData?.spaceUtilization ?? [];
  const recentEmployees = dashboardData?.recentEmployees ?? [];
 
    return (
      <OrgAdminDashboard
        statsData={statsData}
        upcomingBookings={upcomingBookings}
        spaceUtilization={spaceUtilization}
        recentEmployees={recentEmployees}
      />
    );
}


export default DashboardPage;