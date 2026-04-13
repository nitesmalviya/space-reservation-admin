import OrgAdminSpaces from "@/components/admin/space-management";
import { getAllSpaceAction, getSpaceStatsAction } from "@/utils/graphql/spaces/actions";

const SpaceManagementPage = async () => {

    const spaceStatsRes = await getSpaceStatsAction({
        orgId: "cf117671-e13c-4232-849a-dfe9f3265c87"
    });

    const spaceStatsData = spaceStatsRes.spaceStats;

    const allSpaceRes = await getAllSpaceAction({
        filter: undefined,
    });

    const allSpaceData = allSpaceRes.spaces.items; // IMPORTANT

    return (
        <OrgAdminSpaces
            spaceStatsData={spaceStatsData}
            allSpaceData={allSpaceData}
        />
    );
};

export default SpaceManagementPage;