"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import {
    AdminDashboardStats,
} from "@/types/dashboard/admin";
import { GET_ALL_ADMIN_DASHBOARD_QUERY } from "./query";
// Get all admin dashboard action

export const getAllAdminDashboardAction = async (
    variables: any,
): Promise<AdminDashboardStats> => {
    const res = await fetchGraphQLQuery<AdminDashboardStats>(
        GET_ALL_ADMIN_DASHBOARD_QUERY,
        {},
    );
    return res;
};