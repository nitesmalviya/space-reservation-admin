"use client";

import { useEffect, useState } from "react";
import OrgAdminSettings from "@/components/admin/settings";
import { useAppSelector } from "@/store/hooks";
import { getNotificationSettingsAction } from "@/utils/graphql/settings/actions";

const SettingsPage = () => {
    const user: any = useAppSelector((state) => state.auth.user);

    const orgId = user?.orgId;

    const [settings, setSettings] = useState(null);

    useEffect(() => {
        if (!orgId) return;

        const fetchData = async () => {
            try {
                const data = await getNotificationSettingsAction(orgId);
                const dataList = data?.notificationSettings;
                setSettings(dataList?.settings);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [orgId]);

    return (
        <OrgAdminSettings notificationSettings={settings} />
    );
};

export default SettingsPage;