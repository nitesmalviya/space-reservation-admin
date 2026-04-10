

"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import {
    GET_BOOKING_RULES_QUERY,
    UPDATE_BOOKINGRULES_MUTATIONS,
} from "./query";
import {
    UpdateBookingRulesResponse,
    UpdateBookingRulesInput,
    BookingRulesInput,
    BookingRulesResponse,
} from "@/types/bookings-type";


// Get booking rules
export const getBookingRulesAction = async (
    orgId: string,
): Promise<BookingRulesResponse> => {
    const res = await fetchGraphQLQuery<BookingRulesResponse>(
        GET_BOOKING_RULES_QUERY,
        { orgId }
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

