"use server";
import { GetOrganizationAnalyticsInput, OrganizationAnalyticsTypeResponse } from "@/types/organization-analytics";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_ORGANIZATION_ANALYTICS_QUERY } from "./query";

// Get Organization action

export const getOrganizationAnalyticsAction = async (
    variables: GetOrganizationAnalyticsInput,
): Promise<OrganizationAnalyticsTypeResponse> => {
    const res = await fetchGraphQLQuery<OrganizationAnalyticsTypeResponse>(
        GET_ORGANIZATION_ANALYTICS_QUERY,
        { ...variables },
    );
    return res;
};