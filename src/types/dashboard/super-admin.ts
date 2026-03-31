export interface OverviewStats {
  totalBookings: number;
  totalEmployees: number;
  totalOrganizations: number;
  upcomingBookingsCount: number;
  upcomingBookingsPeriod: string;
}

export interface RecentOrganization {
  id: string;
  name: string;
  domain: string;
  industry: string;
  employeeCount: number;
  joinedDate: string;
  status: string;
}

export interface UpcomingBooking {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  organizationName: string;
  spaceName: string;
  userName: string;
  status: string;
}

export interface Dashboard {
  overviewStats: OverviewStats;
  recentOrganizations: RecentOrganization[];
  upcomingBookings: UpcomingBooking[];
}

export interface SuperAdminDashboardResponse {
  superAdminDashboard: {
    success: boolean;
    message: string;
    dashboard: Dashboard;
  };
}