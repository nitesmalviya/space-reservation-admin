import OrgAdminAnalytics  from "@/components/admin/reports-analytics";
import { getUserFromCookie } from "@/utils/get-user-from-cookie";
import { getOrganizationAnalyticsAction } from "@/utils/graphql/reports-analytics/action";

const OrgAdminAnalyticsPage = async () => {

    const userData = await getUserFromCookie();
    const orgId = userData?.orgId;

    const res = await getOrganizationAnalyticsAction({
        orgId: orgId
    });

    const organizationAnalyticsData = res?.getOrganizationAnalytics ?? [];
 
    return <OrgAdminAnalytics organizationAnalyticsData={organizationAnalyticsData}/>
}


export default OrgAdminAnalyticsPage;