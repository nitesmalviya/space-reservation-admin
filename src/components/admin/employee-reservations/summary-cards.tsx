import { EmployeeReservationsInput } from "@/types/employee-type"
const SummaryCards = ({
    employeeReservations,
    pendingCount,
    approvedCount,
    rejectedCount
}: {
    employeeReservations: EmployeeReservationsInput[],
    pendingCount: number,
    approvedCount: number,
    rejectedCount: number
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Total Requests</p>
                <p className="text-gray-900 text-xl">{employeeReservations?.length ?? 0}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Pending</p>
                <p className="text-gray-900 text-xl">{pendingCount ?? 0}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Approved</p>
                <p className="text-gray-900 text-xl">{approvedCount ?? 0}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <p className="text-xs text-gray-600 mb-1">Rejected</p>
                <p className="text-gray-900 text-xl">{rejectedCount ?? 0}</p>
            </div>
        </div>
    )
}

export default SummaryCards