


"use server";
import { GetOrganizationAnalyticsInput, OrganizationAnalyticsTypeResponse } from "@/types/organization-analytics";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_NOTIDICATIONSETTINGS_QUERY } from "./query";

// Get Notification Settings action

export const getNotificationSettingsAction = async (
    variables: GetNotificationSettingsInput,
): Promise<NotificationSettingsTypeResponse> => {
    const res = await fetchGraphQLQuery<NotificationSettingsTypeResponse>(
        GET_NOTIDICATIONSETTINGS_QUERY,
        { ...variables },
    );
    return res;
};