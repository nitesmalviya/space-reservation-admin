import {
  CreateOrganizationInput,
  SearchInput,
  UpdateOrganizationInput,
} from "@/types/organization";
import {
  createOrganizationAction,
  getAllOrganizationsAction,
  getOrganizationByIdAction,
  removeOrganizationByIdAction,
  updateOrganizationByIdAction,
} from "@/utils/graphql/organization/action";

//create organization action
export const createOrganization = async (data: CreateOrganizationInput) => {
  try {
    
    const res = await createOrganizationAction(data);
    
    if (res?.createOrganization?.success) {
      return {
        success: true,
        message:
          res?.createOrganization?.message ||
          "organization created successfully",
        data: res?.createOrganization,
      };
    } else {
      return { success: false, message: "organization creation failed " };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || "Something went wrong" };
  }
};

//get all organizations action
export const getAllOrganizations = async (data: SearchInput) => {
  try {
    const res = await getAllOrganizationsAction({ searchFilter: data });

    if (res?.organizations?.success) {
      return {
        success: true,
        message: res?.organizations?.message,
        data: res?.organizations,
      };
    } else {
      return { success: false, message: res?.organizations?.message };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || "Something went wrong" };
  }
};

//get organization by id action
export const getOrganizationById = async (id: string) => {
  try {
    const res = await getOrganizationByIdAction({ id });
    if (res?.organization) {
      return {
        success: true,
        message: "organization data fetched successfully",
        data: res?.organization,
      };
    } else {
      return { success: false, message: "organization data not found" };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || "Something went wrong" };
  }
};

//update organization by id action
export const updateOrganizationById = async (data: UpdateOrganizationInput) => {
  try {    
    const res = await updateOrganizationByIdAction(data);
    if (res?.updateOrganization?.success) {
      return {
        success: true,
        message:
          res?.updateOrganization?.message ||
          "organization updated successfully",
        data: res?.updateOrganization,
      };
    } else {
      return { success: false, message: "organization modification failed " };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || "Something went wrong" };
  }
};

//remove organization by id action
export const removeOrganizationById = async (id: string) => {
  try {
    const res = await removeOrganizationByIdAction({ id });
    if (res?.removeOrganization?.success) {
      return {
        success: true,
        message:
          res?.removeOrganization?.message ||
          "organization data deleted successfully",
        data: res?.removeOrganization,
      };
    } else {
      return { success: false, message: "organization data not found" };
    }
  } catch (err: any) {
    return { success: false, message: err?.message || "Something went wrong" };
  }
};
