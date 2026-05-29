import OrgAdminBookingRules from "@/components/admin/booking-rules";
import { getUserFromCookie } from "@/utils/get-user-from-cookie";
import { getBookingRulesAction } from "@/utils/graphql/booking-rules/action";

const OrgAdminBookingRulesPage = async () => {
    const userData = await getUserFromCookie();
    const orgId = userData?.orgId;

    const res = await getBookingRulesAction({
        orgId: orgId
    });

    const bookingRulesData = res?.bookingRules?.data ?? {
        id: "",
        orgId: orgId || "",
        advanceBookingWindow: "ONE_DAY",
        minNoticePeriod: "IMMEDIATE",
        cancellationWindow: "THIRTY_MINS",
        bufferTime: "NO_BUFFER",
        requireAdminApproval: false,
        autoApproveBookings: true,
    };

    return <OrgAdminBookingRules bookingRulesData={bookingRulesData} orgId={orgId} />;
}

export default OrgAdminBookingRulesPage;