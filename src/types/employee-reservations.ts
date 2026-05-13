 
export interface EmployeeReservationInput {
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

export interface EmployeeReservation {
    id: Key | null | undefined;
    bookingDate: string;
    endTime: string;
    startTime: string;
    attendeesCount: number;
    purpose: string;
    status: string;

    space: {
        name: string;

        amenities: {
            name: string;
        }[];
    };

    user: {
        name: string;
        email: string;
    };
}

export interface EmployeeReservationResponse {
    id(id: any): void;
    purpose: string;
    attendeesCount: ReactNode;
    endTime: string;
    startTime: string;
    bookingDate: string;
    space: any;
    user: any;
    department: ReactNode;
    status: string;
    data: any;
    employeeReservations: {
        currentPage?: number;
        message?: string;
        success?: boolean;
        totalItems?: number;
        totalPages?: number;
        items: EmployeeReservation[];
    };
}