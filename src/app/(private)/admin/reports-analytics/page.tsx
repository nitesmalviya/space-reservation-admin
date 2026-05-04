import OrgAdminAnalytics from "@/components/admin/reports-analytics";
import { getOrganizationAnalyticsAction } from "@/utils/graphql/organization-analytics/actions";
import { getUserFromCookie } from "@/utils/getUserFromCookie";

const OrgAnalyticsPage = async () => {
    const user = await getUserFromCookie();
    const orgId = user?.orgId;

    if (!orgId) {
        return <div>No organization found</div>;
    }

    try {
        const res = await getOrganizationAnalyticsAction({
            orgId: orgId,
        });

        const data = res?.getOrganizationAnalytics ?? [];


        return (
            <OrgAdminAnalytics organizationAnalytics={data} />
        )
    } catch (error) {
        console.error(error);
        return <div>Failed to load data</div>;
    }
};

export default OrgAnalyticsPage;