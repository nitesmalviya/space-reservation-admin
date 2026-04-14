export interface SearchInput {
  limit: number;
  page: number;
  search: string;
}

export interface AllOrganizationsInput {
  searchFilter: SearchInput;
}
export interface OrganizationInput {
  organizationId: string;
}

export interface Location {
  address: string;
  contactNumber: string;
  createdAt: string;
  id: string;
  name: string;
  orgId: string;
  timezone: string;
}

export interface PrimaryAdmin {
  activeStatus: string;
  email: string;
  id: string;
  name: string;
  orgId: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
  subId: string;
  updatedAt: string;
}

export interface Organization {
  contactEmail: string;
  domain: string;
  employeeCount: number;
  employeesCount: number;
  id: string;
  industry: string;
  locationId: string;
  logoUrl: string;
  location: Location;
  primaryAdmin: PrimaryAdmin;
  name: string;
  primaryAdminEmail: string;
  primaryAdminName: string;
  status: string;
  updatedAt: string;
  locationName: string;
}

export interface AllOrganizationsData {
  message: string;
  success: boolean;
  // totalCount: number;
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  organizations: Organization[];
}

export interface AllOrganizationsResponse {
  organizations: AllOrganizationsData;
  message: string;
  success: boolean;
  data: {
    organizations: AllOrganizationsData;
  }
}

export interface OrganizationData {
  name: string,
  domain: string,
  contactEmail: string,
  logoUrl: string

}
export interface OrganizationResponse {
  organization: any;
  data: {
    organization: {
      message: string;
      success: boolean;
      organization: OrganizationData;
    };
  };
}

export interface OrganizationByIdData {
  organization: Organization;
}

export interface OrganizationByIdResponse {
  organization: OrganizationByIdData;
  message: string;
  success: boolean;
}

export interface DeleteOrganizationByIdResponse {
  removeOrganization: DeleteOrganizationByIdData;
}
export interface DeleteOrganizationByIdData {
  message: string;
  success: boolean;
}

export interface UpdateOrganizationInput {
  employeeCount: number;
  id: string;
  industry: string;
  locationName: string;
  primaryAdminEmail?: string;
  primaryAdminName: string;
  name: string,
  domain: string,
  contactEmail: string,
  logoUrl: string
}

export interface UpdateOrganizationByIdData {
  success: boolean;
  message: string;
  organization: Organization;
}

export interface UpdateOrganizationByIdResponse {
  success: boolean;
  message: string;
  updateOrganization: UpdateOrganizationByIdData;
}

export interface CreateOrganizationInput {
  contactEmail?: string;
  domain: string;
  employeeCount: number;
  industry: string;
  locationName: string;
  logoUrl?: string;
  name: string;
  primaryAdminEmail: string;
  primaryAdminName: string;
}

export interface CreateOrganizationData {
  success: boolean;
  message: string;
  organization: Organization;
}

export interface CreateOrganizationResponse {
  success: boolean;
  message: string;
  createOrganization: CreateOrganizationData;
}
