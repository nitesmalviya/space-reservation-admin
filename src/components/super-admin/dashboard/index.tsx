 
import { SummaryCard, SummaryCardProps } from "@/components/SummaryCard";
import { OverviewStats, RecentOrganizationsType, UpcomingBookingType } from "@/types/dashboard/super-admin";
import { Building2, Users, Calendar, CalendarCheck } from "lucide-react";
import RecentOrganizations from "./recent-organizations";
import UpcomingBookings from "./upcoming-bookings";
import PageHeading from "@/components/ui/page-heading";

interface DashboardDataProps {
  readonly recentOrganizations: RecentOrganizationsType[];
  readonly upcomingBookings: UpcomingBookingType[];
  readonly statsData: OverviewStats; // Adjust the type as needed
}
const SuperAdminDashboard = ({
  recentOrganizations,
  upcomingBookings,
  statsData,
}: DashboardDataProps) => {

  const summaryData: SummaryCardProps[] = [
    {
      title: "Total Organizations",
      value: statsData?.totalOrganizations != null ? statsData.totalOrganizations.toString() : "0",
      change: "+12%",
      trend: "up" as const,
      icon: Building2,
      color: "blue",
    },
    {
      title: "Total Employees",
      value: statsData?.totalEmployees != null ? statsData.totalEmployees.toString() : "0",
      change: "+8%",
      trend: "up" as const,
      icon: Users,
      color: "green",
    },
    {
      title: "Total Bookings",
      value: statsData?.totalBookings != null ? statsData.totalBookings.toString() : "0",
      change: "+23%",
      trend: "up" as const,
      icon: Calendar,
      color: "purple",
    },
    {
      title: "Upcoming Bookings",
      value: statsData?.upcomingBookingsCount != null ? statsData.upcomingBookingsCount.toString() : "0",
      change: "-5%",
      trend: "down" as const,
      icon: CalendarCheck,
      color: "orange",
    },
  ];

  return (
    <div className="p-5">
      <PageHeading title="Super Admin Dashboard" description="Welcome back! Here's what's happening today." />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {summaryData.map((data, index) => (
          <SummaryCard key={index} {...data} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Organizations */}
        <RecentOrganizations organizations={recentOrganizations} />
        {/* Upcoming Bookings */}
        <UpcomingBookings upcomingBookings={upcomingBookings} />
      </div>
    </div>
  );
}


export default SuperAdminDashboard;