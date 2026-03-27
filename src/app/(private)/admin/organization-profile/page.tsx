import { Location, OrgAdminProfile } from "@/components/admin/organization-profile";
import { getLocationsByOrgAction } from "@/utils/graphql/location/actions";



const AdminOrganizationProfilePage = async () => {
  const res = await getLocationsByOrgAction({
    page: 1,
    limit: 10,
  });
  const locations = res?.locationsByOrg?.locations;
  console.log(locations);
  return <OrgAdminProfile locations={locations} />;
}

export default AdminOrganizationProfilePage;