import { getAllSpaceAction } from "@/utils/graphql/spaces/actions";
import { Spaces } from "@/components/super-admin/spaces";

const SpacesPage = async () => {
    const res = await getAllSpaceAction({})
    const spaceData = res?.spaces?.items
    return <Spaces spaceData={spaceData} />;
}

export default SpacesPage;