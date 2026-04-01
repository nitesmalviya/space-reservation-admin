import { ReactNode } from "react";

export interface UsersType {
  id: string;
  name: string;
  email: string;
  role: string;
  activeStatus: "ACTIVE" | "INACTIVE";
  organization: {
    name: string;
  }
}
export interface UserInput {
  organization: string;
  bookings: string;
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  activeStatus: "ACTIVE" | "INACTIVE";
  orgId?: string;
  phoneNumber?: string | null;
  profileImageUrl?: string | null;
  subId?: string | null;
  updatedAt?: string;
}
export interface UserStats {
  activeEmployees: number;
  newThisMonth: number;
  totalEmployees: number;
}

export interface AllUsersResponse {
  data: any;
  success: boolean;
  message: string;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  stats: UserStats;
  users: UserInput[];
  orgId: string;
}


export interface RemoveUserInput {
  id: string;
}
export interface RemoveUserResponse {

  removeUserById: {
    success: boolean;
    message: string;
  };
}

export interface UpdateUserInput {
  id: string;
  name: string;
  role: string;
  orgId: string;
  activeStatus: "ACTIVE" | "INACTIVE";
  phone?: string;
}
export interface UpdateUserResponse {
  updateUser: {
    success: boolean;
    message: string;
  };
  user: UpdateUserInput;
  success?: boolean;
  message?: string;
}
