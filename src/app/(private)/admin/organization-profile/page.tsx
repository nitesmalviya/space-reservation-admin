import { OrgAdminProfile } from "@/components/admin/organization-profile";
import { getUserFromCookie } from "@/utils/get-user-from-cookie";
import { getLocationsByOrgAction } from "@/utils/graphql/locations/action";
import { getOrganizationAction } from "@/utils/graphql/organization/action";


const AdminOrganizationProfilePage = async () => {
  const user = await getUserFromCookie();
  const orgId = user?.orgId;

  if (!orgId) {
    console.log("orgid not found");
  }
  const orgRes = await getOrganizationAction({
    organizationId: orgId
  })
  const orgData = orgRes?.organization?.organization ?? null;
   const organizationData = orgData
      ? { id: orgId, ...orgData }
      : null;

  const res = await getLocationsByOrgAction({
    search: "",
    page: 1,
    limit: 10,
  });
  const locationsData = res?.locationsByOrg?.locations || [];

  return <OrgAdminProfile 
    locationsData={locationsData} 
    organizationData={organizationData}/>;
}

export default AdminOrganizationProfilePage;