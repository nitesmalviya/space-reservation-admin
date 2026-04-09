import { UserStats } from "@/types/users-type";

const EmployeeCards = ({ statsData }: { statsData: UserStats }) => {

    const cards = [
        { label: "Total Employees", value: statsData.totalEmployees },
        { label: "Active Employees", value: statsData.activeEmployees },
        { label: "New This Month", value: statsData.newThisMonth },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {cards.map((card) => (
                <div key={card.label} className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-600 mb-1">{card.label}</p>
                    <p className="text-gray-900 text-xl">{card.value}</p>
                </div>
            ))}
        </div>
    )
}

export default EmployeeCards;