import { Booking, Organization } from "@/components/super-admin/dashboard";
import SuperAdminDashboard from "@/components/super-admin/dashboard";
import { getAllSuperAdminDashboardAction } from "@/utils/graphql/superAdminDashboard/actions";

const recentOrganizations: Organization[] = [
  {
    name: "Tech Solutions Inc.",
    employees: 45,
    industry: "Technology",
    status: "Active",
  },
  {
    name: "Global Marketing Co.",
    employees: 32,
    industry: "Marketing",
    status: "Active",
  },
  {
    name: "Finance Partners LLC",
    employees: 28,
    industry: "Finance",
    status: "Active",
  },
  {
    name: "Creative Studios",
    employees: 19,
    industry: "Media",
    status: "Pending",
  },
];

const recentBookings: Booking[] = [
  {
    space: "Conference Room A",
    organization: "Tech Solutions Inc.",
    date: "Dec 8, 2025",
    time: "10:00 AM",
  },
  {
    space: "Meeting Room B",
    organization: "Global Marketing Co.",
    date: "Dec 8, 2025",
    time: "2:00 PM",
  },
  {
    space: "Boardroom",
    organization: "Finance Partners LLC",
    date: "Dec 9, 2025",
    time: "9:00 AM",
  },
  {
    space: "Conference Room C",
    organization: "Creative Studios",
    date: "Dec 9, 2025",
    time: "3:00 PM",
  },
];

const SuperAdminDashboardPage = async () => {
  const res = await getAllSuperAdminDashboardAction();
  const dashboardData = res?.superAdminDashboard?.dashboard;

  return (
    <SuperAdminDashboard
      recentOrganizations={recentOrganizations}
      recentBookings={recentBookings}
      dashboardData={dashboardData}
    />)
}

export default SuperAdminDashboardPage;