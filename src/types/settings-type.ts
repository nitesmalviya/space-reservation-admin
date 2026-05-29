

export interface NotificationSettingsTypeResponse {
    notificationSettings: {
        message: string;
        settings: NotificationSettingsData;
    };
}

export interface NotificationSettingsData {
    settings: any;
    id: string;
    orgId: string;
    emailNotificationsEnabled: boolean;
    dailyDigestEnabled: boolean;
    weeklyReportEnabled: boolean;
    bookingConfirmationsEnabled: boolean;
    cancellationAlertsEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetNotificationSettingsInput {
    orgId: string;
}