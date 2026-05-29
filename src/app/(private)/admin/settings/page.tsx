import OrgAdminSettings from "@/components/admin/settings";
import { getUserFromCookie } from "@/utils/get-user-from-cookie";
import { getNotificationSettingsAction } from "@/utils/graphql/settings/action";

const SettingsPage = async () => {
    const userData = await getUserFromCookie();
    const orgId = userData?.orgId;

    const res = await getNotificationSettingsAction({
        orgId: orgId || "",
    });

    const notificationSettingsData = res?.notificationSettings || {
        id: "",
        orgId: "",
        
    };

    return <OrgAdminSettings notificationSettingsData={notificationSettingsData} userData={userData} />
}

export default SettingsPage;