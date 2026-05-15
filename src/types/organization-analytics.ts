import { JSX } from "react/jsx-runtime";

 export interface OrganizationAnalyticsTypeResponse {
    getOrganizationAnalytics(getOrganizationAnalytics: any): unknown;
    avgUtilization: string;
    totalEmployees: string;
    activeSpaces: string;
    totalBookings: string;

    bookingTrends: {
        bookingsCount: number;
        month: string;
    }[];

    peakBookingHours: {
        bookingsCount: number;
        hour: string;
    }[];

    spaceUtilizationReport: {
        spaceName: string;
        status: string;
        totalBookings: number;
        totalHours: string;
        utilizationPercentage: number;
    }[];

    stats: {
        activeSpaces: number;
        avgUtilization: number;
        totalBookings: number;
        totalEmployees: number;
    };

    topEmployees: {
        bookingsCount: number;
        employeeName: string;
        totalHours: string;
    }[];
};

export interface StatsType {
    totalBookings: number;
    activeSpaces: number;
    totalEmployees: number;
    avgUtilization: number;
}

export interface BookingTrendType {
    month: string;
    bookingsCount: number;
}

export interface GetOrganizationAnalyticsInput {
    orgId: string;
    startDate?: string;
    endDate?: string;
}

export type ExportFormat = 'pdf' | 'excel';

export interface ExportFilter {
    startDate?: string;
    endDate?: string;
    employee?: string;
    space?: string;
    status?: string;
}

export interface GetExportOrganizationAnalyticsInput {
    orgId?: string;
    format: ExportFormat;
    filter?: ExportFilter | null;
}

export interface PeakBookingHourType {
    hour: string;
    bookingsCount: number;
}

export interface spaceUtilizationReportType {
    map(arg0: (space: spaceUtilizationReportType) => JSX.Element): import("react").ReactNode;
    spaceName: string;
    status: string;
    totalBookings: number;
    totalHours: string;
    utilizationPercentage: number;
}

export interface TopEmployeesType {
    bookingsCount: number;
    employeeName: string;
    totalHours: string;
}