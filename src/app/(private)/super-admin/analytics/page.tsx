import Analytics  from "@/components/super-admin/analytics";
import { getSuperAdminAnalyticsAction } from "@/utils/graphql/super-admin-analytics/actions";

const AnalyticsPage = async  () => {
    const res = await getSuperAdminAnalyticsAction();
    const analyticsData = res.getSuperAdminAnalytics;
    const { bookingsByOrganization, bookingsBySpace, feedbackTrends, summaryStats } = analyticsData;
    return <Analytics 
    bookingsByOrganization={bookingsByOrganization}
    bookingsBySpace={bookingsBySpace}
    feedbackTrends={feedbackTrends}
    summaryStats={summaryStats}
    />;
};

export default AnalyticsPage;