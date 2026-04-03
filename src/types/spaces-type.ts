import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

export interface SpaceStatsInput {
    orgId: string;
}

export interface SpaceStats {
    id?: string;
    activeSpaces: string;
    avgUtilization: string;
    currentlyOccupied: string;
    totalBookings: string;
    totalSpaces: string;
}

export interface SpaceStatsResponse {
    spaceStats: SpaceStats;
}

export interface SpacesInput {
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

export interface Space {
    slotDuration: ReactNode;
    startTime: string;
    endTime: string;
    bookings: number;
    locationName: any;
    id: string;
    name: string;
    type: string;
    capacity: number;
    status: string;
    currentOccupancy?: number;
    utilization?: number;
    availability?: string;
    building?: string;
    floor?: string;
    wing?: string;
    location: {
        floor: ReactNode;
        wing: ReactNode;
        building: ReactNode;
        name: string;
        address: string;
    };
    amenities: {
        map(arg0: (amenity: any) => JSX.Element): ReactNode;
        filter(arg0: (a: any) => boolean): unknown;
        general: string[];
        meeting: string[];
        equipment: string[];
    };
}

export interface SpacesResponse {
    data: any;
    spaces: {
        currentPage?: number;
        message?: string;
        success?: boolean;
        totalItems?: number;
        totalPages?: number;
        items: Space[];
    };
}

export interface CreateSpaceInput {
    id: any;
    name: string;
    type: string;
    capacity: number;
    locationName: string;
    orgId: string;
    startTime: string;
    endTime: string;
    slotDuration: number;
    amenityIds?: string[];
    building?: string;
    floor?: string;
    wing?: string;
    description?: string;
}

export interface CreateSpaceResponse {
    data: {
        createSpace: {
            success: boolean;
            message: string;
        };
    };
}

export interface RemoveSpaceInput {
    id: string;
}
export interface RemoveSpaceResponse {
    data: {
        removeSpace: {
            success: boolean;
            message: string;
        };
    };
}

export interface UpdateSpaceInput {
    id: string;
    name: string;
    type: string;
    capacity: number;
    locationName: string;
    orgId: string;
    startTime: string;
    endTime: string;
    slotDuration: number;
    amenityIds?: string[];
    building?: string;
    floor?: string;
    wing?: string;
    description?: string;
}
export interface UpdateSpaceResponse {
    updateSpace: {
        success: boolean;
        message: string;
    };
}


export type Amenity = {
    id: string;
    name: string;
    category: "GENERAL" | "MEETING" | "EQUIPMENT";
    createdAt?: string;
};


export const spaceTypes = [
    { label: "Hot Desk", value: "HOT_DESK" },
    { label: "Dedicated Desk", value: "DEDICATED_DESK" },
    { label: "Private Office", value: "PRIVATE_OFFICE" },
    { label: "Meeting Room", value: "MEETING_ROOM" },
    { label: "Event Space", value: "EVENT_SPACE" },
    { label: "Other", value: "OTHER" },
];