import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

export interface AdminDashboardStats {
  adminDashboard: any;
  id?: string;
  activeSpaces: string;
  avgUtilization: string;
  currentlyOccupied: string;
  totalBookings: string;
  totalSpaces: string;
}

export interface AdminDashboardStatsResponse {
  adminDashboardStats: AdminDashboardStats;
}

export interface OverviewStats {
  spaceUtilization: ReactNode;
  length: number;
  activeSpaces: number;
  confirmedBookingsCount: number;
  spacesStatus: string;
  totalBookingsCount: number;
  totalEmployees: number;
  upcomingBookingsCount: number;
  upcomingBookingsPeriod: string;
}
export interface SpaceUtilizationData {
  length: number;
  confirmedBookingsCount: number;
  spaceName: string;
  totalBookingsCount: number;
}

export interface RecentEmployees {
  map(arg0: (employee: any) => JSX.Element): ReactNode;
  length: number;
  email: string;
  id: string;
  joinedDate: string;
  name: string;
  role: string;

}
export interface UpcomingBookings {
  length: number;
  id: string;
  spaceName: string;
  userName: string;
  status: string;
  date: string;
  startTime: string;
  endTime: string;
}


export interface AdminDashboardStatsComponentProps {
  overviewStatsData: OverviewStats;
  upcomingBookings: UpcomingBookings;
  spaceUtilization: SpaceUtilizationData;
  recentEmployees: RecentEmployees;
}