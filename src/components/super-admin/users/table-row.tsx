import { UserItem } from "@/types/users-type";
import { Edit, Power, Shield } from "lucide-react";

interface TableRowProps {
    user: UserItem;
    handleRequestToggle: (user: UserItem) => void;
    handleOpenEdit: (user: UserItem) => void;
    handleModifyRole: (userId: string) => void;
}

const TableRow = ({ user, handleRequestToggle, handleOpenEdit, handleModifyRole }: TableRowProps) => {

    const statusLabel = user.activeStatus ? "Active" : "Inactive";
    let roleClass = "bg-gray-100 text-gray-700";

    if (user.role === "Admin") {
        roleClass = "bg-purple-100 text-purple-700";
    } else if (user.role === "Manager") {
        roleClass = "bg-blue-100 text-blue-700";
    }

    return (
        <tr key={user.id} className="hover:bg-gray-50">
            <td className="px-5 py-3 text-gray-900 text-sm">{user.name}</td>
            <td className="px-5 py-3 text-gray-600 text-sm">{user.email}</td>
            <td className="px-5 py-3 text-gray-600 text-sm">
                {user.organization?.name ?? "N/A"}
            </td>
            <td className="px-5 py-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs ${roleClass}`}
                >
                    {user.role}
                </span>
            </td>
            <td className="px-5 py-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs ${user.activeStatus
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {statusLabel}
                </span>
            </td>
            <td className="px-5 py-3">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleModifyRole(user.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modify Role"
                    >
                        <Shield className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleRequestToggle(user)}
                        className={`p-1.5 rounded-lg transition-colors ${user.activeStatus
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                            }`}
                        title={user.activeStatus ? "Deactivate" : "Activate"}
                    >
                        <Power className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        title="Edit Employee"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow;