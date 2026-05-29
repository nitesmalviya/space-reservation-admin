import SuperAdminDashboard from "@/components/super-admin/dashboard";
import { getSuperAdminDashboardAction } from "@/utils/graphql/super-admin/dashbaord/action";

const SuperAdminDashboardPage = async () => {

  const res = await getSuperAdminDashboardAction();

  const dashboardData = res?.superAdminDashboard.dashboard;

  const recentOrganizations = dashboardData?.recentOrganizations ?? [];
  const upcomingBookings = dashboardData?.upcomingBookings ?? [];
  const statsData = dashboardData?.overviewStats;


  return <SuperAdminDashboard
    recentOrganizations={recentOrganizations}
    upcomingBookings={upcomingBookings}
    statsData={statsData}
  />;
}

export default SuperAdminDashboardPage;