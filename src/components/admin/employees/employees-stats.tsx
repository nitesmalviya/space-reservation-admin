interface OrgAdminEmployeesProps {
    activeEmployees: number;
    newThisMonth: number;
    totalEmployees: number;
}

const EmployeesStats = ({ activeEmployees, newThisMonth, totalEmployees }: OrgAdminEmployeesProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Total Employees</p>
                <p className="text-gray-900 text-xl">{totalEmployees}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Active Employees</p>
                <p className="text-gray-900 text-xl">{activeEmployees}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">New This Month</p>
                <p className="text-gray-900 text-xl">{newThisMonth}</p>
            </div>
        </div>
    )
}
export default EmployeesStats;