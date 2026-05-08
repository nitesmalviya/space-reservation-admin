import { SpaceUtilizationItem } from "@/types/dashboard/admin";

interface SpaceUtilizationProps {
    spaceUtilization: SpaceUtilizationItem[];
}

const SpaceUtilization = ({ spaceUtilization }: SpaceUtilizationProps) => {

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-gray-900 mb-3 text-base">Space Utilization</h2>
            <div className="space-y-2.5">
                {
                    spaceUtilization.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No space utilization data available
                        </p>
                    ) : (
                        spaceUtilization?.map((space) => (
                            <div key={space.spaceName}>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs text-gray-900">{space.spaceName ?? "--"}</p>
                                    <p className="text-xs text-gray-600">
                                        {space.utilizationPercentage != null
                                            ? `${space.utilizationPercentage}%`
                                            : "--"}
                                    </p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className="bg-orange-600 h-1.5 rounded-full"
                                        style={{
                                            width:
                                                space.utilizationPercentage != null
                                                    ? `${space.utilizationPercentage}%`
                                                    : "0%",
                                        }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {space.totalBookingsCount ?? "--"} bookings this week
                                </p>
                            </div>
                        ))
                    )}
            </div>
        </div>
    )

}

export default SpaceUtilization;