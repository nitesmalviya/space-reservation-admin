import { RecentEmployees } from "@/types/dashboard/admin";
import { formatDate } from "@/utils/constant";

interface RecentEmployesProps {
    recentEmployeesData: RecentEmployees;
}

const EmployeeOverview = ({ recentEmployeesData }: RecentEmployesProps) => {

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-gray-900 mb-3 text-base">Recent Employees</h2>
            <div className="space-y-2">
                {
                    recentEmployeesData?.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center">No recent employees</p>
                    ) : (
                        recentEmployeesData.map((employee) => (
                            <div
                                key={employee?.id}
                                className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
                                        {employee?.name
                                            ?.split(" ")
                                            ?.map((n) => n[0])
                                            ?.join("")}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 text-sm">
                                            {employee?.name || "--"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {employee?.email || "--"}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs ${employee.role === "Admin"
                                            ? "bg-purple-100 text-purple-700"
                                            : employee.role === "Manager"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {employee.role}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Joined {formatDate(employee?.joinedDate)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default EmployeeOverview;