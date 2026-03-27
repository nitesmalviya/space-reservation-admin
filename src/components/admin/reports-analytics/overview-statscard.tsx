import { StatsType } from "@/types/organization-analytics";
import { TrendingDown, TrendingUp } from "lucide-react";

interface OverViewStatsCardProps {
    stats: StatsType;
}

const OverViewStatsCard = ({ stats }: OverViewStatsCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            <div

                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-600"> Total Bookings</p>
                    <span
                        className={`flex items-center gap-1 text-xs ${'up' === "up" ? "text-green-600" : "text-red-600"
                            }`}
                    >

                        <TrendingUp className="w-3 h-3" />

                        <TrendingDown className="w-3 h-3" />

                        55
                    </span>
                </div>
                <p className="text-gray-900 text-xl font-semibold">{stats?.totalBookings ?? "--"}</p>
            </div>
            <div

                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-600"> Active Spaces</p>
                    <span
                        className={`flex items-center gap-1 text-xs ${'up' === "up" ? "text-green-600" : "text-red-600"
                            }`}
                    >

                        <TrendingUp className="w-3 h-3" />

                        <TrendingDown className="w-3 h-3" />

                        55
                    </span>
                </div>
                <p className="text-gray-900 text-xl font-semibold">{stats?.activeSpaces ?? "--"}</p>
            </div>
            <div

                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-600"> Total Employees</p>
                    <span
                        className={`flex items-center gap-1 text-xs ${'up' === "up" ? "text-green-600" : "text-red-600"
                            }`}
                    >

                        <TrendingUp className="w-3 h-3" />

                        <TrendingDown className="w-3 h-3" />

                        55
                    </span>
                </div>
                <p className="text-gray-900 text-xl font-semibold">{stats?.totalEmployees ?? "--"}</p>
            </div>
            <div

                className="bg-white rounded-lg border border-gray-200 p-4"
            >
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-600">Avg. Utilization</p>
                    <span
                        className={`flex items-center gap-1 text-xs ${'up' === "up" ? "text-green-600" : "text-red-600"
                            }`}
                    >

                        <TrendingUp className="w-3 h-3" />

                        <TrendingDown className="w-3 h-3" />

                        55
                    </span>
                </div>
                <p className="text-gray-900 text-xl font-semibold">{stats?.avgUtilization ?? "--"}</p>
            </div>
        </div>
    );
};

export default OverViewStatsCard;