
import SuperAdminDashboard from "@/components/super-admin/dashboard";
import { getAllSuperAdminDashboardAction } from "@/utils/graphql/superAdminDashboard/actions";


const SuperAdminDashboardPage = async () => {
  const res = await getAllSuperAdminDashboardAction();
  const dashboardData = res?.superAdminDashboard?.dashboard;

  return (
    <SuperAdminDashboard
      dashboardData={dashboardData}
    />)
}

export default SuperAdminDashboardPage;