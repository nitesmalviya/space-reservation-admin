import { SpaceUtilizationData } from "@/types/dashboard/admin";

interface SpaceUtilizationProps {
    spaceUtilizationData: SpaceUtilizationData;
}

const SpaceUtilization = ({ spaceUtilizationData }: SpaceUtilizationProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-gray-900 mb-3 text-base">Space Utilization</h2>

            <div className="space-y-2.5">
                {!spaceUtilizationData || spaceUtilizationData.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center">
                        No space utilization data
                    </p>
                ) : (
                    spaceUtilizationData.map((space) => (
                        <div key={space.id}>
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-sm text-gray-900">
                                    {space.spaceName || "--"}
                                </p>

                                <p className="text-xs text-gray-600">
                                    {space.totalBookingsCount !== undefined
                                        ? `${space.totalBookingsCount}%`
                                        : "--"}
                                </p>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="bg-orange-600 h-1.5 rounded-full"
                                    style={{
                                        width: `${space.totalBookingsCount || 0}%`,
                                    }}
                                />
                            </div>

                            <p className="text-xs text-gray-500 mt-0.5">
                                {space.confirmedBookingsCount || 0} bookings this week
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SpaceUtilization;