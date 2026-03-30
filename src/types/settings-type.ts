export interface SettingsResponse {
    notificationSettings: NotificationSettings;
}
export interface SettingsInput {
    orgId: string;
    settings: {
        bookingConfirmationsEnabled: boolean;
        cancellationAlertsEnabled: boolean;
        dailyDigestEnabled: boolean;
        emailNotificationsEnabled: boolean;
        weeklyReportEnabled: boolean;
    };
    filter?: {
        type?: string;
        status?: string;
        location?: string;
    };
    pagination?: {
        page?: number;
        limit?: number;
    };
    message?: string;
    success?: boolean;
}
export interface NotificationSettings {
    settings: any;
    bookingConfirmationsEnabled: boolean;
    cancellationAlertsEnabled: boolean;
    dailyDigestEnabled: boolean;
    emailNotificationsEnabled: boolean;
    weeklyReportEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
    orgId: string;
}