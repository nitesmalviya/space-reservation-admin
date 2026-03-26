import { Organizations } from "@/components/super-admin/organizations";
import { getAllOrganizations } from "@/store/actions/organization-action";

const OrganizationsPage = async () => {
    const organizations = await getAllOrganizations({ limit: 10, page: 1, search: "" });
    return <Organizations organizationsData={organizations?.data || null} />;
}

export default OrganizationsPage;