import { OverviewStats } from "@/types/dashboard/admin";
import { Calendar, MapPin, TrendingUp, Users } from "lucide-react";

interface OverviewStatsCardProps {
    overviewStatsData: OverviewStats;
}

const OverviewStatsCard = ({ overviewStatsData }: OverviewStatsCardProps) => {

    const stats = [
        {
            title: "Total Employees",
            value: overviewStatsData.totalEmployees,
            icon: Users,
            color: "blue",
            footer: "+3 this month",
        },
        {
            title: "Active Spaces",
            value: overviewStatsData.activeSpaces,
            icon: MapPin,
            color: "green",
            footer: overviewStatsData.spacesStatus,
        },
        {
            title: "Upcoming Bookings",
            value: overviewStatsData.upcomingBookingsCount,
            icon: Calendar,
            color: "purple",
            footer: overviewStatsData.upcomingBookingsPeriod,
        },
        {
            title: "Space Utilization",
            value: `${overviewStatsData.spaceUtilization}%`,
            icon: TrendingUp,
            color: "orange",
            footer: "+8% from last week",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {
                stats.map((statsItem, index) => {
                    const Icon = statsItem.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-lg bg-${statsItem.color}-100 text-${statsItem.color}-600`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                                {statsItem.title}
                            </p>
                            <p className="text-gray-900 text-xl mb-1">
                                {statsItem.value}
                            </p>
                            <p className="text-xs text-gray-500">{statsItem.footer}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default OverviewStatsCard;
