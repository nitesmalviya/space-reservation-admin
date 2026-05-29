export interface DashboardResponse {
  overviewStats: OverviewStats;
  upcomingBookings: UpcomingBookingType[];
  recentOrganizations: RecentOrganizationsType[];
}

export interface OverviewStats {
  activeSpaces: number;
  confirmedBookingsCount: number;
  spaceUtilization: number;
  spacesStatus: string;
  totalBookingsCount: number;
  totalEmployees: number;
  upcomingBookingsCount: number;
  upcomingBookingsPeriod: string;
  totalBookings: number;
  totalOrganizations: number;
}

export interface RecentOrganizationsType {
  id: string;
  name: string;
  domain: string;
  industry: string;
  employeeCount: number;
  joinedDate: string;
  status: string;
}

export interface UpcomingBookingType {
  bookingDate: string;
  endTime: string;
  id: string;
  organizationName: string;
  spaceName: string;
  startTime: string;
  status: string;
  userName: string;
}
