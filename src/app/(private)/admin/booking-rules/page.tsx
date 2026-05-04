

import { OrgAdminBookingRules } from "@/components/admin/booking-rules";
import { getUserFromCookie } from "@/utils/getUserFromCookie";
import { getBookingRulesAction } from "@/utils/graphql/booking-rules/actions";

const BookingRulesPage = async () => {
    const user = await getUserFromCookie();
    const orgId = user?.orgId;

    if (!orgId) {
        return <div>Oragnaization id is null</div>
    }

    try {
        const res = await getBookingRulesAction(orgId)
        const bookingRulesData = res?.bookingRules?.data ?? [];

        return <OrgAdminBookingRules bookingRulesData={bookingRulesData} />
    } catch (error) {
        console.log(error);
        return <div>Failed to load data</div>;
    }

}

export default BookingRulesPage;