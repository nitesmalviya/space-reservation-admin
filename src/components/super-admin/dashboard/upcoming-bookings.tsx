import { UpcomingBookingType } from "@/types/dashboard/super-admin";

interface UpcomingBookingProps {
    upcomingBookings: UpcomingBookingType[];
}

const UpcomingBookings = ({ upcomingBookings }: UpcomingBookingProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
            <h2 className="text-gray-900 mb-4">Upcoming Bookings</h2>
            <div className="space-y-4">
                {
                    upcomingBookings.length === 0 ? (
                        <div className="    flex items-center justify-center absolute inset-0">
                            <p className="text-gray-600 text-md text-center ">
                                No upcoming bookings.
                            </p>
                        </div>
                    ) : (
                        upcomingBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div>
                                    <p className="text-gray-900">{booking.spaceName}</p>
                                    <p className="text-sm text-gray-500">
                                        {booking.organizationName}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900">{booking.bookingDate}</p>
                                    <p className="text-sm text-gray-500">{booking.startTime} - {booking.endTime}</p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default UpcomingBookings;