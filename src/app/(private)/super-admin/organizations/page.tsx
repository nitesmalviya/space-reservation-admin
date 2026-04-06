
import { Organizations } from "@/components/super-admin/organizations";
import { getAllOrganizationsAction } from "@/utils/graphql/organization/action";

const OrganizationsPage = async () => {
    const res = await getAllOrganizationsAction({
        searchFilter: {
            page: 1,
            limit: 10,
            search: ""
        }
    })
    const organizationsData = res?.organizations?.organizations;
    console.log("organizationsData", organizationsData);

    return <Organizations organizationsData={organizationsData} />;
}

export default OrganizationsPage;