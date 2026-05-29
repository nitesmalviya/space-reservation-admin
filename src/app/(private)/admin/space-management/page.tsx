import OrgAdminSpaces from "@/components/admin/space-management";
import { getAllSpaceAction, getSpaceStatsAction } from "@/utils/graphql/space/action";
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

    const spaceStatsRes = await getSpaceStatsAction({ orgId });
    const spaceStats = spaceStatsRes.spaceStats;

    const spacesRes = await getAllSpaceAction({ page: 1, limit: 5 });
    const spacesData = spacesRes.spaces.items;

    return <OrgAdminSpaces
        spaceStats={spaceStats}
        spacesData={spacesData}
    />;
}


export default SpaceManagementPage;