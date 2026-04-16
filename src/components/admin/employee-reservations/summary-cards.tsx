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



    const cardStats = [
        {
            title: "Total Requests",
            value: employeeReservations?.length ?? 0
        },
        {
            title: "Pending",
            value: pendingCount ?? 0
        },
        {
            title: "Approved",
            value: approvedCount ?? 0
        },
        {
            title: "Rejected",
            value: rejectedCount ?? 0
        }
    ]
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            {cardStats.map((card) => (
                <div key={card.title} className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-600 mb-1">{card.title}</p>
                    <p className="text-gray-900 text-xl">{card.value}</p>
                </div>
            ))}
        </div>
    )
}

export default SummaryCards