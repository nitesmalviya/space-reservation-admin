"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import { GET_ORGANIZATION_ANALYTICS_QUERY } from "./query";
import { GetOrganizationAnalyticsInput, OrganizationAnalyticsDataResponse } from "@/types/organization-analytics";
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