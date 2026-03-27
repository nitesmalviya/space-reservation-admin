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