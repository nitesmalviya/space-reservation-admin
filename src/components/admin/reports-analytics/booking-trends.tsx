import { Calendar } from "lucide-react";
import { BookingTrendType } from "@/types/organization-analytics";

interface BookingTrendsProps {
  bookingTrends: BookingTrendType[];
}

const BookingTrends = ({ bookingTrends }: BookingTrendsProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900 text-base font-medium">
          Booking Trends
        </h2>

        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {bookingTrends.map((data, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-700">
                {data.month}
              </span>

              <span className="text-sm text-gray-900 font-medium">
                {data.bookingsCount} bookings
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(Number(data.bookingsCount) / 150) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTrends;