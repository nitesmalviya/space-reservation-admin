import OrgAdminSpaces from "@/components/admin/space-management";
import { getAllSpaceAction, getSpaceStatsAction } from "@/utils/graphql/spaces/actions";
import { cookies } from "next/headers";

const SpaceManagementPage = async () => {
    const cookieStore = cookies();
    const userCookie = (await cookieStore).get("user")?.value;

    let user = null;

    try {
        user = userCookie
            ? JSON.parse(decodeURIComponent(userCookie))
            : null;
    } catch (e) {
        console.error("Invalid cookie");
    }

    const orgId = user?.orgId;

    if (!orgId) {
        return <div>No organization found</div>;
    }

    const [spaceStatsRes, allSpaceRes] = await Promise.all([
        getSpaceStatsAction({ orgId }),
        getAllSpaceAction({}),
    ]);

    return (
        <OrgAdminSpaces
            spaceStatsData={spaceStatsRes?.spaceStats ?? null}
            allSpaceData={allSpaceRes?.spaces?.items ?? []}
        />
    );
};


export default SpaceManagementPage;