"use server";

import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import {GET_EMPLOYEE_RESERVATIONS_QUERY } from './query';
import {  EmployeeReservationInput, EmployeeReservationResponse } from "@/types/employee-reservations";

// Get employee reservations action
export const getEmployeeReservationsAction = async (
  variables: EmployeeReservationInput,
): Promise<EmployeeReservationResponse> => {
  const res = await fetchGraphQLQuery<EmployeeReservationResponse>(
    GET_EMPLOYEE_RESERVATIONS_QUERY,
    { ...variables },
  );
  return res;
};