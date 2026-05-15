import { spaceUtilizationReportType } from "@/types/organization-analytics";
import { MapPin } from "lucide-react";

interface SpaceUtilizationReportProps {
    spaceUtilizationReport: spaceUtilizationReportType;
    handleExportReport: (reportType: string) => void;
}

const SpaceUtilization = ({ spaceUtilizationReport, handleExportReport }: SpaceUtilizationReportProps) => {

    return (
        <div className="bg-white rounded-lg border border-gray-200 mb-3">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <h2 className="text-gray-900 text-base font-medium">
                            Space Utilization Report
                        </h2>
                    </div>
                    <button
                        onClick={() => handleExportReport("Space Utilization")}
                        className="text-orange-600 hover:text-orange-700 text-sm"
                    >
                        Export Details
                    </button>
                </div>
            </div>
            <div className="overflow-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                                Space Name
                            </th>
                            <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                                Total Bookings
                            </th>
                            <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                                Total Hours
                            </th>
                            <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                                Utilization
                            </th>
                            <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {spaceUtilizationReport.map((space: spaceUtilizationReportType) => (
                            <tr key={space.spaceName} className="hover:bg-gray-50">
                                <td className="px-5 py-3 text-sm text-gray-900">
                                    {space.spaceName}
                                </td>
                                <td className="px-5 py-3 text-sm text-gray-600">
                                    {space.totalBookings}
                                </td>
                                <td className="px-5 py-3 text-sm text-gray-600">
                                    {space.totalHours}h
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-orange-600 h-1.5 rounded-full"
                                                style={{ width: `${space.utilizationPercentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-900 font-medium">
                                            {space.utilizationPercentage}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${space.utilizationPercentage >= 70
                                            ? "bg-green-100 text-green-700"
                                            : space.utilizationPercentage >= 50
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {space.utilizationPercentage >= 70
                                            ? "High"
                                            : space.utilizationPercentage >= 50
                                                ? "Medium"
                                                : "Low"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default SpaceUtilization;