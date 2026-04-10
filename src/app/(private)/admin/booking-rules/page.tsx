"use client";

import { OrgAdminBookingRules } from "@/components/admin/booking-rules";
import { useAppSelector } from "@/store/hooks";
import { getBookingRulesAction } from "@/utils/graphql/booking-rules/actions";
import { useEffect, useState } from "react";

const BookingRulesPage = async () => {
    const userData = useAppSelector((state) => state.auth.user);
    const [bookingRulesData, setBookingRulesData] = useState<any>({})

    useEffect(() => {
        if (!userData?.orgId) return;
        const fetchBookingRulsData = async () => {
            const res = await getBookingRulesAction(userData.orgId)
            setBookingRulesData(res?.bookingRules?.data);
        }
        fetchBookingRulsData()
    }, [userData]);

    return <OrgAdminBookingRules bookingRulesData={bookingRulesData} />;
}


export default BookingRulesPage;