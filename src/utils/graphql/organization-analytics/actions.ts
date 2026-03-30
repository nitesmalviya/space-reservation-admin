"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import { EXPORT_ORGANIZATION_ANALYTICS_QUERY, GET_ORGANIZATION_ANALYTICS_QUERY } from "./query";
import { ExportFilter, GetExportOrganizationAnalyticsInput, GetOrganizationAnalyticsInput, OrganizationAnalyticsDataResponse } from "@/types/organization-analytics";
// Get all organization analytics action

export const getOrganizationAnalyticsAction = async (
    variables: GetOrganizationAnalyticsInput,
): Promise<OrganizationAnalyticsDataResponse> => {
    const res = await fetchGraphQLQuery<OrganizationAnalyticsDataResponse>(
        GET_ORGANIZATION_ANALYTICS_QUERY,
        { ...variables },
    );
    return res;
};


// Export organization analytics action
export const exportOrganizationAnalyticsAction = async (
    variables: GetExportOrganizationAnalyticsInput,
): Promise<string> => {
    const res = await fetchGraphQLQuery<string>(
        EXPORT_ORGANIZATION_ANALYTICS_QUERY,
        { ...variables },
    );
    return res;
};