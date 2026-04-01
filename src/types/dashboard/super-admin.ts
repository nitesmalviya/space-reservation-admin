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

export interface RecentOrganization {
  id: string;
  name: string;
  employees: number;
  industry: string;
  status: "Active" | "Inactive";
}

export interface UpcomingBooking {
  space: string;
  organization: string;
  date: string;
  time: string;
}



export interface Dashboard {
  overviewStats: OverviewStats;
  recentOrganizations: RecentOrganization[];
  upcomingBookings: UpcomingBooking[];
}

export interface SuperAdminDashboardResponse {
  overviewStats: {
    totalOrganizations: number;
    totalEmployees: number;
    totalBookings: number;
    upcomingBookings: number;
  };
  recentOrganizations: RecentOrganization[];
  upcomingBookings: UpcomingBooking[];
  totalBookings: any;
  totalEmployees: any;
  totalOrganizations: any;
  superAdminDashboard: {
    success: boolean;
    message: string;
    dashboard: Dashboard;
  };

}
