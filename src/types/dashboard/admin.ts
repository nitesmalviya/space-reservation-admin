 export interface DashboardResponse {
  statsData: StatCard[];
  upcomingBookings: Booking[];
  spaceUtilization: Utilization[];
  recentEmployees: Employee[];
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
}

export interface RecentEmployee {
  email: string;
  id: string;
  joinedDate: string;
  name: string;
  role: string;
}

export interface SpaceUtilizationItem {
  confirmedBookingsCount: number;
  spaceName: string;
  totalBookingsCount: number;
  utilizationPercentage: number;
}

export interface UpcomingBooking {
  employeeName: string;
  bookingDate: string;
  endTime: string;
  id: string;
  spaceName: string;
  startTime: string;
  status: string;
  userName: string;
}
 