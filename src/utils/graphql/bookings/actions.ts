"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_All_BOOKINGS_QUERY } from "./query";
import { BookingsDataResponse, GetBookingsDataInput } from "@/types/bookings-type";

// Get booking action
 

export const getBookingsAction = async (
    variables: GetBookingsDataInput,
): Promise<BookingsDataResponse> => {
    const res = await fetchGraphQLQuery<BookingsDataResponse>(
        GET_All_BOOKINGS_QUERY,
        { ...variables },
    );
    return res;
};
