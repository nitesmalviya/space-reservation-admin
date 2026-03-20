import { UserInput } from "@/types/users-type";
import { formatDate } from "@/utils/constant";
import { Edit, Power, Trash2 } from "lucide-react";

interface TableRowProps {
    employee: UserInput;
    handleToggleStatus: (employee: UserInput) => void;
    handleDeleteEmployee: (employee: UserInput[]) => void;
    handleEditEmployee: (employee: UserInput) => void;
}

const TableRow = ({
    employee,
    handleToggleStatus,
    handleDeleteEmployee,
    handleEditEmployee
}: TableRowProps) => {
    function setShowEmployeeModal(arg0: boolean) {
        throw new Error("Function not implemented.");
    }

    function setSelectedEmployee(id: string) {
        throw new Error("Function not implemented.");
    }

    return (
        <tr key={employee.id} className="hover:bg-gray-50">
            <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                    <div
                        className="
                            uppercase 
                            w-8 h-8 bg-orange-100 
                            text-orange-600 rounded-full flex 
                            items-center justify-center
                            text-xs font-medium">
                        {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <span className="text-gray-900 text-sm">
                        {employee.name}
                    </span>
                </div>
            </td>
            <td className="px-4 py-3 text-gray-600 text-sm">
                {employee.email}
            </td>
            <td className="px-4 py-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs ${employee.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : employee.role === "Manager"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {employee.role}
                </span>
            </td>
            <td className="px-4 py-3 text-gray-600 text-sm">
                {formatDate(employee?.createdAt)}
            </td>
            <td className="px-4 py-3 text-gray-600 text-sm">
                {employee?.bookings || "-"}
            </td>
            <td className="px-4 py-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs ${employee?.activeStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {employee?.activeStatus}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditEmployee(employee);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Employee"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleToggleStatus(employee)}
                        className={`p-1.5 rounded-lg transition-colors ${employee?.activeStatus === "Active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                            }`}
                        title={
                            employee?.activeStatus === "Active"
                                ? "Deactivate"
                                : "Activate"
                        }
                    >
                        <Power className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow;