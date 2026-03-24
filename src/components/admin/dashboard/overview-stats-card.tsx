import { OverviewStats } from "@/types/dashboard/admin";
import { Calendar, MapPin, TrendingUp, Users } from "lucide-react";

interface OverviewStatsCardProps {
    overviewStatsData: OverviewStats;
}

const OverviewStatsCard = ({ overviewStatsData }: OverviewStatsCardProps) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div
                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <div
                        className={`p-2 rounded-lg bg-blue-100 text-blue-600`}
                    >
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                    Total Employees
                </p>
                <p className="text-gray-900 text-xl mb-1">
                    {overviewStatsData?.totalEmployees}
                </p>
                <p className="text-xs text-gray-500">+3 this month</p>
            </div>
            <div
                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <div
                        className="p-2 rounded-lg bg-green-100 text-green-600"
                    >
                        <MapPin className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                    Active Spaces
                </p>
                <p className="text-gray-900 text-xl mb-1">
                    {overviewStatsData?.activeSpaces}
                </p>
                <p className="text-xs text-gray-500">{overviewStatsData?.spacesStatus}</p>
            </div>
            <div
                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <div
                        className="p-2 rounded-lg bg-purple-100 text-purple-600"
                    >
                        <Calendar className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                    Upcoming Bookings
                </p>
                <p className="text-gray-900 text-xl mb-1">
                    {overviewStatsData?.upcomingBookingsCount}
                </p>
                <p className="text-xs text-gray-500">{overviewStatsData?.upcomingBookingsPeriod}</p>
            </div>
            <div
                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <div
                        className="p-2 rounded-lg bg-orange-100 text-orange-600"
                    >
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                    Space Utilization
                </p>
                <p className="text-gray-900 text-xl mb-1">
                    {overviewStatsData?.spaceUtilization}%
                </p>
                <p className="text-xs text-gray-500">+8% from last week</p>
            </div>

        </div>
    )
}

export default OverviewStatsCard;
