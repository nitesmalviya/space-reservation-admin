"use client";
import { SummaryCard, SummaryCardProps } from "./SummaryCard";
import { SuperAdminDashboardResponse } from "@/types/dashboard/super-admin";
import { Building2, Users, Calendar, CalendarCheck } from "lucide-react";
import RecentOrganizations from "./RecentOrganizations";
import UpcomingBookings from "./UpcomingBookings";
import PageHeading from "@/components/ui/page-heading";

interface DashboardDataProps {
  dashboardData: SuperAdminDashboardResponse;
}

const SuperAdminDashboard = ({
  dashboardData
}: DashboardDataProps) => {

  const {
    totalOrganizations,
    totalEmployees,
    totalBookings,
    upcomingBookings
  } = dashboardData?.overviewStats || {};

  const summaryData: SummaryCardProps[] = [
    {
      title: "Total Organizations",
      value: totalOrganizations?.toString(),
      change: "+12%",
      trend: "up" as const,
      icon: Building2,
      color: "blue",
    },
    {
      title: "Total Employees",
      value: totalEmployees?.toString(),
      change: "+8%",
      trend: "up" as const,
      icon: Users,
      color: "green",
    },
    {
      title: "Total Bookings",
      value: totalBookings?.toString(),
      change: "+23%",
      trend: "up" as const,
      icon: Calendar,
      color: "purple",
    },
    {
      title: "Upcoming Bookings",
      value: upcomingBookings?.toString(),
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
        <RecentOrganizations recentOrganizations={dashboardData?.recentOrganizations || []} />
        {/* Upcoming Bookings */}
        <UpcomingBookings upcomingBookings={dashboardData?.upcomingBookings || []} />
      </div>
    </div>
  );
}


export default SuperAdminDashboard;