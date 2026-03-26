export interface OrganizationAnalyticsDataResponse {
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
        hour: string; // ✅ FIX
    }[];

    spaceUtilizationReport: {
        spaceName: string;
        status: string;
        totalBookings: number;
        totalHours: string; // ✅ FIX
        utilizationPercentage: number;
    }[];

    stats: {
        activeSpaces: number;
        avgUtilization: number;
        totalBookings: number;
        totalEmployees: number;
    }; // ✅ FIX (remove array)

    topEmployees: {
        bookingsCount: number;
        employeeName: string;
        totalHours: string; // ✅ FIX
    }[];
};