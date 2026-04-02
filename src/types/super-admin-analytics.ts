export interface BookingsByOrganization {
    bookingsCount: number;
    organizationName: string;
}

export interface BookingsBySpace {
    bookingsCount: number;
    percentage: number;
    spaceType: string;
}

export interface FeedbackTrend {
    avgRating: number;
    month: string;
    totalResponses: number;
}

export interface SummaryStats {
    avgBookingDuration: number;
    avgSatisfactionScore: number;
    spaceUtilizationRate: number;
}

export interface SuperAdminAnalytics {
    bookingsByOrganization: BookingsByOrganization[];
    bookingsBySpace: BookingsBySpace[];
    feedbackTrends: FeedbackTrend[];
    summaryStats: SummaryStats;
}

export interface SuperAdminAnalyticsDataResponse {
    avgSatisfactionScore: number;
    spaceUtilizationRate: number;
    avgBookingDuration: ReactNode;
    getSuperAdminAnalytics: SuperAdminAnalytics;
}