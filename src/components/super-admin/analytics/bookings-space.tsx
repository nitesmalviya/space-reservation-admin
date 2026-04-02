import { BookingsBySpace } from "@/types/super-admin-analytics";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BookingsSpace = ({ bookingsBySpace }: { bookingsBySpace: BookingsBySpace[] }) => {
    const formattedBookingsBySpace = bookingsBySpace.map((item) => ({
        name: item.spaceType,
        value: item.bookingsCount,
    }));
    const COLORS = ['#ea580c', '#2563eb', '#16a34a', '#9333ea', '#eab308', '#64748b'];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-gray-900 mb-3 text-base">Bookings by Space</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={formattedBookingsBySpace}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {bookingsBySpace.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BookingsSpace;