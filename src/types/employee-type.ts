import { ReactNode } from "react";

export interface EmployeeReservationsInput {
  status: string;
  bookings: string;
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  activeStatus: boolean;
  orgId?: string;
  phoneNumber?: string | null;
  profileImageUrl?: string | null;
  subId?: string | null;
  updatedAt?: string;
  endTime: string;
  startTime: string;
  spaceId: string;
  attendeesCount: number;
  purpose?: string;
  space: {
    name: string;
    type: string;
    location: {
      name: string;
      address: string;
    }
  }
  user: {
    name: string;
    email: string;
    id: string;
    updatedAt: string;
    createdAt: string;
    activeStatus: boolean;
  }
}
export interface UserStats {
  activeEmployees: number;
  newThisMonth: number;
  totalEmployees: number;
}

export interface EmployeeReservationsResponse {
  employeeReservations: {
    items: EmployeeReservationsInput[];
    currentPage: number;
    totalItems: number;
    totalPages: number;
    message: string;
    success: boolean;
  };
  data: any;
  success: boolean;
  message: string;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  stats: UserStats;
  users: EmployeeReservationsInput[];

}