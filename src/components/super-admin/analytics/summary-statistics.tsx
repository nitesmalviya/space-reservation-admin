import { SuperAdminAnalyticsDataResponse } from "@/types/super-admin-analytics";

const SummaryStatistics = ({ summaryStats }: { summaryStats: SuperAdminAnalyticsDataResponse }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-gray-600 mb-1 text-xs">Average Booking Duration</p>
                <p className="text-gray-900 text-xl">{summaryStats.avgBookingDuration}</p>
                <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-gray-600 mb-1 text-xs">Space Utilization Rate</p>
                <p className="text-gray-900 text-xl">{(summaryStats?.spaceUtilizationRate ?? 0) * 100}%</p>
                <p className="text-sm text-green-600 mt-1">+5% from last month</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-gray-600 mb-1 text-xs">Average Satisfaction Score</p>
                <p className="text-gray-900 text-xl">{summaryStats?.avgSatisfactionScore ?? 0} / 5.0</p>
                <p className="text-sm text-green-600 mt-1">+0.2 from last month</p>
            </div>
        </div>

    )
}

export default SummaryStatistics;