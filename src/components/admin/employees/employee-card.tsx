import { UserStats } from "@/types/users-type";

const EmployeeCards = ({ statsData }: { statsData: UserStats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Total Employees</p>
                <p className="text-gray-900 text-xl">{statsData.totalEmployees}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Active Employees</p>
                <p className="text-gray-900 text-xl">{statsData.activeEmployees}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">New This Month</p>
                <p className="text-gray-900 text-xl">{statsData.newThisMonth}</p>
            </div>
        </div>
    )
}

export default EmployeeCards