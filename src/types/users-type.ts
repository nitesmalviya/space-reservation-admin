export interface AllUsersInput {
  searchFilter: {
    page: number;
    limit: number;
    search?: string;
  };
}

export interface UserStats {
  activeEmployees: number;
  newThisMonth: number;
  totalEmployees: number;
}

export type UserRole = "USER" | "MANAGER" | "ADMIN";

export interface Organization {
  name: string;
}

export interface UserItem {
  message(message: any): unknown;
  success: any;
  id: string;
  email: string;
  name: string;
  orgId: string;
  role: UserRole;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  subId: string | null;
  activeStatus: boolean;
  bookingCount: number;
  createdAt: string;
  updatedAt: string;

  organization?: Organization | null;
}

export interface AllUsersData {
  success: boolean;
  totalItems: number;
  totalPages: number;
  stats: UserStats;
  users: UserItem[];
}

export interface AllUsersResponse {
  users: AllUsersData;
}


// Update User
export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
}

export interface UpdateUserResponse {
  updateUser: UserItem;
  success: boolean;
  message: string;
}


// Create User
export interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string | null;
  profileImageUrl?: string | null;
}

export interface CreateUserResponse {
  createUser: UserItem;
  success: boolean;
  message: string;
}


// Remove User
export interface RemoveUserInput {
  id: string;
}

export interface RemoveUserResponse {
  removeUserById: UserItem;
  success: boolean;
  message: string;
}