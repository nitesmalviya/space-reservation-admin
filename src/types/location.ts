import { JSX } from "react/jsx-runtime";

export interface Location {
    length: number;
    id: string;
    name: string;
    address: string;
    contactNumber: string;
    orgId: string;
}

export interface LocationsInput {
    name: string;
    address: string;
    contactNumber: string;
    orgId: string;
}

export interface LocationsByOrgData {
    length: ReactNode;
    currentPage: number;
    locations: Location[];
    message: string;
    success: boolean;
    totalItems: number;
    totalPages: number;
}

export interface LocationsResponse {
    locationsByOrg: LocationsByOrgData;
}

export interface SearchFilterInput {
    search?: string;
    page?: number;
    limit?: number;
}

// For Create Location
export interface CreateLocationInput {
    name: string;
    orgId: string;
    label: string;
    contactNumber: string;
    address?: string;
    timezone?: string | null;
}

export interface CreateLocationResponse {
    success: any;
    location: Location;
    createLocation: {
        success: boolean;
        message: string;
        location: {
            createdAt: string;
            name: string;
            orgId: string;
            id: string;
            updatedAt: string;
        };
    };
}

// Update location type
export interface UpdateLocationInput {
    name: string;
    orgId: string;
    label: string;
    contactNumber: string;
    address?: string;
    timezone?: string | null;
}

export interface UpdateLocationResponse {
    success: any;
    location: Location;
    updateLocation: {
        success: boolean;
        message: string;
    };
}


// Remove location type
export interface RemoveLocationInput {
    removeLocationId: string;
}
export interface RemoveLocationResponse {
    removeLocation: any;
    data: {
        removeLocation: {
            success: boolean;
            message: string;
        };
    };
}


export interface LocationByOrgType {
    id: string;
    name: string;
    label: string;
    contactNumber: string;
    address: string;
    timezone: string;
    createdAt: string;
    updatedAt: string;
    length: number;
    orgId: string;
}