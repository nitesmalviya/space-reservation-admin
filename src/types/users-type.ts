import { ReactNode } from "react";

export interface UserInput {
  bookings: string;
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  activeStatus: boolean;
  // optional (not always returned)
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
