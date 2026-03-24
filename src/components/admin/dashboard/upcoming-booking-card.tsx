import { UpcomingBookings } from "@/types/dashboard/admin";
import { Calendar, Clock } from "lucide-react";

interface UpcomingBookingsCardProps {
    upcomingBookingsData: UpcomingBookings;
}

const statusStyles = {
    CONFIRMED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
};

const UpcomingBookingsCard = ({ upcomingBookingsData }: UpcomingBookingsCardProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-gray-900 mb-3 text-base">Upcoming Bookings</h2>

            <div className="space-y-2">
                {!upcomingBookingsData || upcomingBookingsData.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center">
                        No upcoming bookings
                    </p>
                ) : (
                    upcomingBookingsData.map((booking) => (
                        <div key={booking.id} className="p-2.5 bg-gray-50 rounded-lg">
                            <div className="flex items-start justify-between mb-1">
                                <div>
                                    <p className="text-gray-900 text-sm">
                                        {booking?.spaceName || "--"}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {booking?.userName || "--"}
                                    </p>
                                </div>

                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs ${statusStyles[booking?.status as keyof typeof statusStyles] ||
                                        "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {booking?.status || "--"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {booking?.date || "--"}
                                </div>

                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {booking?.startTime && booking?.endTime
                                        ? `${booking?.startTime} - ${booking?.endTime}`
                                        : "--"}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingBookingsCard;