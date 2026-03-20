import { UserInput } from "@/types/users-type";
import { Plus } from "lucide-react";

const EmployeeHeader = ({
    setShowEmployeeModal,
    setFormState,
    setSelectedEmployee,
}: {
    setShowEmployeeModal: (value: boolean) => void;
    setFormState: (value: string) => void;
    setSelectedEmployee: (value: UserInput | null) => void;
}) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-gray-900 mb-1">Employee Management</h1>
                <p className="text-gray-600 text-sm">
                    Manage your organization's employees
                </p>
            </div>
            <button
                onClick={() => {
                    setFormState("create");
                    setSelectedEmployee(null);
                    setShowEmployeeModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
                <Plus className="w-5 h-5" />
                Add New Employee
            </button>
        </div>
    )
}

export default EmployeeHeader