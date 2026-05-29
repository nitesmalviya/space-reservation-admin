import Spaces from "@/components/super-admin/spaces";
import { getAllSpaceAction } from "@/utils/graphql/space/action";

const SpacesPage = async () => {

    const spacesRes = await getAllSpaceAction({ page: 1, limit: 5 });
    const spacesData = spacesRes.spaces.items;

    return <Spaces spacesData={spacesData} />;
}


export default SpacesPage;