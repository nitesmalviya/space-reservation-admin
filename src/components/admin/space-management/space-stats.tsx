import { SpaceStatsType } from "@/types/space-type";

interface SpaceStatsDataProps {
    spaceStats: SpaceStatsType;
}

const SpaceStats = ({ spaceStats }: SpaceStatsDataProps) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Total Spaces</p>
                <p className="text-gray-900 text-xl">{spaceStats?.totalSpaces}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Active Spaces</p>
                <p className="text-gray-900 text-xl">
                    {spaceStats?.activeSpaces}
                </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Currently Occupied</p>
                <p className="text-gray-900 text-xl">{spaceStats?.currentlyOccupied}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Avg. Utilization</p>
                <p className="text-gray-900 text-xl">{spaceStats?.avgUtilization}%</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Total Bookings</p>
                <p className="text-gray-900 text-xl">
                    {spaceStats?.totalBookings}
                </p>
            </div>
        </div>
    )
}

export default SpaceStats;