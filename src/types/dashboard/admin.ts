export interface DashboardPRops {
  readonly statsData: {
    id: string;
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
  }[];
  readonly upcomingBookings: {
    id: string;
    space: string;
    employee: string;
    date: string;
    time: string;
    status: string;
  }[];
  readonly spaceUtilization: {
    id: string;
    name: string;
    utilization: number;
    bookings: number;
  }[];
  readonly recentEmployees: {
    id: string;
    name: string;
    email: string;
    role: string;
    joinDate: string;
  }[];
}
