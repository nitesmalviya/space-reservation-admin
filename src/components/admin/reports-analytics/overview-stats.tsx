import { StatsType } from "@/types/organization-analytics";
import { TrendingDown, TrendingUp } from "lucide-react";

interface statsProps {
    stats: StatsType;
}

const OverviewStats = ({
    stats
}: statsProps) => {

    const overviewStats = [
        { label: "Total Bookings", value: stats.totalBookings, change: "+12.5%", trend: "up" },
        { label: "Active Spaces", value: stats.activeSpaces, change: "+3", trend: "up" },
        { label: "Total Employees", value: stats.totalEmployees, change: "+8", trend: "up" },
        { label: "Avg. Utilization", value: stats.avgUtilization, change: "-2.3%", trend: "down" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            {overviewStats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600">{stat.label}</p>
                        <span
                            className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {stat.trend === "up" ? (
                                <TrendingUp className="w-3 h-3" />
                            ) : (
                                <TrendingDown className="w-3 h-3" />
                            )}
                            {stat.change}
                        </span>
                    </div>
                    <p className="text-gray-900 text-xl font-semibold">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}

export default OverviewStats;