import Bookings from "@/components/super-admin/bookings";
import { getBookingsAction } from "@/utils/graphql/bookings/actions";

const BookingsPage = async () => {
    const res = await getBookingsAction({
        page: 1,
        limit: 10,
    });
   
    const bookingsData = res?.bookings || [];
    
    return <Bookings bookingsData={bookingsData} />;
};

export default BookingsPage;