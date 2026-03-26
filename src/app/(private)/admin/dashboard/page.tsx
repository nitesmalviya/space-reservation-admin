import OrgAdminDashboard from "@/components/admin/dashboard";
import { getAllAdminDashboardAction } from "@/utils/graphql/adminDashboard/actions";

const DashboardPage = async () => {
  const res = await getAllAdminDashboardAction({});
  const overviewStatsData =
    res?.adminDashboard?.dashboard?.overviewStats ?? {
      totalEmployees: 0,
      activeSpaces: 0,
      spacesStatus: "",
      upcomingBookingsCount: 0,
      upcomingBookingsPeriod: "",
      spaceUtilization: 0,
    };

  const upcomingBookingsData = res?.adminDashboard?.dashboard?.upcomingBookings ?? [];
  const spaceUtilizationData = res?.adminDashboard?.dashboard?.spaceUtilization ?? [];
  const recentEmployeesData = res?.adminDashboard?.dashboard?.recentEmployees ?? [];

  return (
    <OrgAdminDashboard
      overviewStatsData={overviewStatsData}
      upcomingBookingsData={upcomingBookingsData}
      spaceUtilizationData={spaceUtilizationData}
      recentEmployeesData={recentEmployeesData} />
  );
}

export default DashboardPage;