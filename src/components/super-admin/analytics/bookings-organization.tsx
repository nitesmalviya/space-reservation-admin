import {
  BookingsByOrganization,
} from "@/types/super-admin-analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BookingsOrganization = ({ bookingsByOrganization }: { bookingsByOrganization: BookingsByOrganization[] }) => {
    const formattedBookingsByOrg = bookingsByOrganization.map((item) => ({
        name: item.organizationName,
        bookings: item.bookingsCount,
    }));
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-gray-900 mb-3 text-base">Bookings by Organization</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={formattedBookingsByOrg}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#ea580c" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BookingsOrganization;