export interface UserStats {
  activeEmployees: number;
  newThisMonth: number;
  totalEmployees: number;
}

export interface UserItem {
  id: string;
  email: string;
  name: string;
  orgId: string;
  role: string;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  subId: string | null;
  activeStatus: boolean;
  createdAt: string;
  updatedAt: string;
  bookingCount: number;
}

export interface AllUsersData {
  success: boolean;
  totalItems: number;
  totalPages: number;
  stats: UserStats;
  users: UserItem[];
}

export interface AllUsersResponse {
  users: never[];
  allUsers: AllUsersData;
}

// for update user
export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  phoneNumber?: string | null;
  profileImageUrl?: string | null;
  activeStatus?: boolean;
}
export type UserRole = "USER" | "MANAGER" | "ADMIN";

export interface UpdateUserResponse {
  updateUser: any;
  success: boolean;
  message: string;
}

// for create user
export interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string | null;
  profileImageUrl?: string | null;
}

// for delete user
export interface RemoveUserInput {
  id: string;
}

export interface RemoveUserResponse {
  removeUserById: any;
  success: boolean;
  message: string;
}