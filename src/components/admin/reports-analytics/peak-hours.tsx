import { PeakBookingHourType } from "@/types/organization-analytics";
import { Clock } from "lucide-react";

interface PeakBookingHoursProps {
    peakBookingHours: PeakBookingHourType[];
}

const PeakHours = ({ peakBookingHours }: PeakBookingHoursProps) => {
    const maxPeakBookings = Math.max(
        ...peakBookingHours.map((p) => p.bookingsCount)
    );

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 text-base font-medium">
                    Peak Booking Hours
                </h2>

                <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-2">
                {peakBookingHours.map((peakBookingHour) => (
                    <div
                        className="flex items-center gap-3"
                    >
                        <span className="text-xs text-gray-600 w-20">
                            {peakBookingHour.hour}
                        </span>

                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all"
                                style={{
                                    width: `${(peakBookingHour.bookingsCount / maxPeakBookings) * 100
                                        }%`,
                                }}
                            />
                        </div>

                        <span className="text-xs text-gray-900 font-medium w-8">
                            {peakBookingHour.bookingsCount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeakHours;