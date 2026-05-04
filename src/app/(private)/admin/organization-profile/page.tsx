import OrgAdminProfile from "@/components/admin/organization-profile";
import { getLocationsByOrgAction } from "@/utils/graphql/location/actions";
import { getOrganizationAction } from "@/utils/graphql/organization/action";
import { getUserFromCookie } from "@/utils/getUserFromCookie";

const AdminOrganizationProfilePage = async () => {
  const user = await getUserFromCookie();
  const orgId = user?.orgId;

  if (!orgId) {
    return <div>No organization found</div>;
  }

  try {
    const [locationRes, orgRes] = await Promise.all([
      getLocationsByOrgAction({
        page: 1,
        limit: 10,
      }),
      getOrganizationAction({
        organizationId: orgId,
      }),
    ]);

    const locations = locationRes?.locationsByOrg?.locations ?? [];
    const orgData = orgRes?.organization?.organization ?? null;

    const organizationData = orgData
      ? { id: orgId, ...orgData }
      : null;

    return (
      <OrgAdminProfile
        locations={locations}
        organizationData={organizationData}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Failed to load data</div>;
  }
};

export default AdminOrganizationProfilePage;