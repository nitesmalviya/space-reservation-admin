import { StatsType } from "@/types/organization-analytics";
import { TrendingDown, TrendingUp } from "lucide-react";
import { title } from "process";

interface OverViewStatsCardProps {
    stats: StatsType;
}

const OverViewStatsCard = ({ stats }: OverViewStatsCardProps) => {

    const cardsStats = [
        {
            title: "Total Bookings",
            value: stats?.totalBookings,

        },
        {
            title: "Active Spaces",
            value: stats?.activeSpaces,

        },
        {
            title: "Total Employees",
            value: stats?.totalEmployees,

        },
        {
            title: "Avg. Utilization",
            value: stats?.avgUtilization,

        },
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            {
                cardsStats.map((card) => (
                    <div
                        key={card.title}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-gray-600">{card.title}</p>
                            <span
                                className={`flex items-center gap-1 text-xs ${'up' === "up" ? "text-green-600" : "text-red-600"
                                    }`}
                            >

                                <TrendingUp className="w-3 h-3" />

                                <TrendingDown className="w-3 h-3" />

                                55
                            </span>
                        </div>
                        <p className="text-gray-900 text-xl font-semibold">{card.value ?? "--"}</p>
                    </div>

                ))}


        </div>
    );
};

export default OverViewStatsCard;