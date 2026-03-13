import { Organizations } from "@/components/super-admin/organizations";
import { getAllOrganizations, getOrganizationById } from "@/store/actions/organization-action";

export default async function OrganizationsPage() {
    const organizations = await getAllOrganizations({ limit: 10, page: 1, search: "" });



    // const res = await getOrganizationById("d073f470-d0ec-4b47-8228-86871d376bee");
    // console.log(res);




    return <Organizations organizationsData={organizations?.data || null} />;
}