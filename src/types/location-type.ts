export interface LocationByOrgInput {
    page?: number;
    limit?: number;
    filter?: {
        type?: string;
        status?: string;
        location?: string;
    };
    pagination?: {
        page?: number;
        limit?: number;
    };
}
export interface LocationByOrg {
    id: string;
    name: string;
    label: string;
    contactNumber: string;
    address: string;
    timezone: string;
    createdAt: string;
    updatedAt: string;
}
export interface LocationByOrgResponse {
    data: any;
    locationsByOrg: {
        locations: any;
        currentPage?: number;
        message?: string;
        success?: boolean;
        totalItems?: number;
        totalPages?: number;
        items: LocationByOrg[];
    };
}


// create location type
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