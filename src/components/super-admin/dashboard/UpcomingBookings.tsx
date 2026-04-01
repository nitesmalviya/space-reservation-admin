import { UpcomingBooking } from "@/types/dashboard/super-admin";

interface UpcomingBookingsProps {
    upcomingBookings: UpcomingBooking[];
}

const UpcomingBookings = ({ upcomingBookings }: UpcomingBookingsProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Upcoming Bookings</h2>
            <div className="space-y-4">
                {
                    upcomingBookings?.length > 0 ?
                        upcomingBookings?.map((booking) => (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-gray-900">{booking.space}</p>
                                    <p className="text-sm text-gray-500">
                                        {booking.organization}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900">{booking.date}</p>
                                    <p className="text-sm text-gray-500">{booking.time}</p>
                                </div>
                            </div>
                        ))
                        :
                        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-md">
                            <p className="text-gray-500">No upcoming bookings</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default UpcomingBookings;