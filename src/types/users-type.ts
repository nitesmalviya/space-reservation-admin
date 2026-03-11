export interface AllUsersInput {
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
}

export interface AllUsersResponse {
  users: AllUsersInput[];
}
