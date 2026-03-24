"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_EMPLOYEE_RESERVATIONS_QUERY } from "./query";
import {
    EmployeeReservationsInput,
    EmployeeReservationsResponse,
} from "@/types/employee-type";

//get all employee reservations action
export const getAllEmployeeReservationsAction = async (
    variables: EmployeeReservationsInput,
): Promise<EmployeeReservationsResponse> => {
    const res = await fetchGraphQLQuery<EmployeeReservationsResponse>(
        GET_EMPLOYEE_RESERVATIONS_QUERY,
        { ...variables },
    );
    return res;
};