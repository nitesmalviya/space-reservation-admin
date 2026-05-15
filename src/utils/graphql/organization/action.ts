"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import {
  CREATE_ORGANIZATION,
  GET_ALL_ORGANIZATIONS_QUERY,
  GET_ORGANIZATION_BY_ID_QUERY,
  GET_ORGANIZATION_QUERY,
  REMOVE_ORGANIZATION_QUERY,
  UPDATE_ORGANIZATION_DETAILS_QUERY,
  UPDATE_ORGANIZATION_QUERY,
} from "./query";
import {
  AllOrganizationsInput,
  AllOrganizationsResponse,
  CreateOrganizationInput,
  CreateOrganizationResponse,
  DeleteOrganizationByIdResponse,
  OrganizationByIdResponse,
  OrganizationInput,
  OrganizationResponse,
  UpdateOrganizationByIdResponse,
  UpdateOrganizationInput,
} from "@/types/organization";

//create organization
export const createOrganizationAction = async (
  variables: CreateOrganizationInput,
): Promise<CreateOrganizationResponse> => {
  const res = await fetchGraphQLMutation<CreateOrganizationResponse>(
    CREATE_ORGANIZATION,
    { createOrganizationInput: { ...variables } },
  );
  return res;
};

//get all organizations action
export const getAllOrganizationsAction = async (
  variables: AllOrganizationsInput,
): Promise<AllOrganizationsResponse> => {
  const res = await fetchGraphQLQuery<AllOrganizationsResponse>(
    GET_ALL_ORGANIZATIONS_QUERY,
    { ...variables },
  );
  return res;
};

//get  organization by id action
export const getOrganizationByIdAction = async (variables: {
  id: string;
}): Promise<OrganizationByIdResponse> => {
  const res = await fetchGraphQLMutation<OrganizationByIdResponse>(
    GET_ORGANIZATION_BY_ID_QUERY,
    { ...variables },
  );
  return res;
};

//update organization
export const updateOrganizationByIdAction = async (
  variables: UpdateOrganizationInput,
): Promise<UpdateOrganizationByIdResponse> => {
  const res = await fetchGraphQLMutation<UpdateOrganizationInput>(
    UPDATE_ORGANIZATION_QUERY,
    { updateOrganizationInput: { ...variables } },
  );
  return res;
};

//remove organization action
export const removeOrganizationByIdAction = async (variables: {
  id: string;
}): Promise<DeleteOrganizationByIdResponse> => {
  const res = await fetchGraphQLMutation<DeleteOrganizationByIdResponse>(
    REMOVE_ORGANIZATION_QUERY,
    { ...variables },
  );
  return res;
};



//Update organization
export const updateOrganizationAction = async (
  variables: UpdateOrganizationInput,
): Promise<UpdateOrganizationByIdResponse> => {
  const res = await fetchGraphQLMutation<UpdateOrganizationInput>(
    UPDATE_ORGANIZATION_DETAILS_QUERY,
    { updateOrganizationInput: { ...variables } },
  );
  return res;
};


// Get single organization action
export const getOrganizationAction = async (
  variables: OrganizationInput,
): Promise<OrganizationResponse> => {
  const res = await fetchGraphQLQuery<OrganizationResponse>(
    GET_ORGANIZATION_QUERY,
    { ...variables },
  );
  return res;
};