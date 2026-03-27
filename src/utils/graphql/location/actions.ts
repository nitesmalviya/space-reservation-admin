
"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import { CREATE_LOCATION_MUTATION, GET_LOCATIONS_BY_ORG } from "./auery";
import { CreateLocationInput, CreateLocationResponse, LocationByOrgInput, LocationByOrgResponse } from "@/types/location-type";



// Get location stats action
export const getLocationsByOrgAction = async (
    variables: LocationByOrgInput,
): Promise<LocationByOrgResponse> => {
    const res = await fetchGraphQLQuery<LocationByOrgResponse>(
        GET_LOCATIONS_BY_ORG,
        { ...variables },
    );
    return res;
};

//Create location
export const createLocationAction = async (
    variables: CreateLocationInput,
): Promise<CreateLocationResponse> => {
    const res = await fetchGraphQLMutation<CreateLocationResponse>(
        CREATE_LOCATION_MUTATION,
        {
            createLocationInput: variables,
        },
    );
    return res;
};