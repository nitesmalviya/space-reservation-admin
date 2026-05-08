import { OverviewStats } from "@/types/dashboard/admin";
import { Calendar, MapPin, TrendingUp, Users } from "lucide-react";

interface OverviewStatsProps {
  statsData: OverviewStats;
};

const colorStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
};

const StatsDataCard = ({ statsData }: OverviewStatsProps) => {
    const statsDataCard = [
        {
            id: "1",
            title: "Total Employees",
            value: statsData.totalEmployees ?? 0,
            change: "+3 this month",
            icon: Users,
            color: "blue",
        },
        {
            id: "2",
            title: "Active Spaces",
            value: statsData?.activeSpaces ?? 0,
            change: statsData?.spacesStatus ?? "--",
            icon: MapPin,
            color: "green",
        },
        {
            id: "3",
            title: "Upcoming Bookings",
            value: statsData?.upcomingBookingsCount ?? 0,
            change: statsData?.upcomingBookingsPeriod || "--",
            icon: Calendar,
            color: "purple",
        },
        {
            id: "4",
            title: "Space Utilization",
            value: statsData?.spaceUtilization !=null
            ? `${statsData.spaceUtilization}%`
            : "0%",
            change: "+8% from last week",
            icon: TrendingUp,
            color: "orange",
        },
    ];

    return (
        <>
            {statsDataCard.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            className="bg-white rounded-lg border border-gray-200 p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                 <div className={`p-2 rounded-lg ${colorStyles[stat.color]}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                                {stat?.title || "--"}
                            </p>
                            <p className="text-gray-900 text-xl mb-1">
                                {stat?.value || "--"}
                            </p>
                            <p className="text-xs text-gray-500">{stat?.change || "--"}</p>
                        </div>
                    );
                })
            }
        </>
    )
}


export default StatsDataCard;