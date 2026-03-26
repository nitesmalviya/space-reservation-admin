"use client";

import { useEffect, useState } from "react";
import OrgAdminAnalytics from "@/components/admin/reports-analytics";
import { getOrganizationAnalyticsAction } from "@/utils/graphql/organization-analytics/actions";
import { useAppSelector } from "@/store/hooks";

const OrgAnalyticsPage = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        if (!user?.orgId) return;

        const fetchData = async () => {
            const res = await getOrganizationAnalyticsAction({
                orgId: user.orgId,
            });
            setData(res?.getOrganizationAnalytics);
        };

        fetchData();
    }, [user]);

    return <OrgAdminAnalytics organizationAnalytics={data} />;
};

export default OrgAnalyticsPage;