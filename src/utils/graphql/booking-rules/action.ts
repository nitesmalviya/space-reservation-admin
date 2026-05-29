

"use server";
import {
    BookingRulesInput,
    BookingRulesResponse,
    UpdateBookingRulesInput,
    UpdateBookingRulesResponse
} from "@/types/booking-types";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_BOOKING_RULES_QUERY, UPDATE_BOOKINGRULES_MUTATIONS } from './query';


// Get booking rules
export const getBookingRulesAction = async (
    variables: BookingRulesInput,
): Promise<BookingRulesResponse> => {
    const res = await fetchGraphQLQuery<BookingRulesResponse>(
        GET_BOOKING_RULES_QUERY,
        { ...variables },
    );
    return res;
};


//update booking rules
export const updateBookingRulesAction = async (
    variables: UpdateBookingRulesInput,
): Promise<UpdateBookingRulesResponse> => {
    const res = await fetchGraphQLMutation<UpdateBookingRulesResponse>(
        UPDATE_BOOKINGRULES_MUTATIONS,
        { input: { ...variables } },
    );
    return res;
};