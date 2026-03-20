import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface EmployeeFormData {
  name: string;
  email: string;
  role: string;
}

interface EmployeeModalProps {
  readonly showEmployeeModal: boolean;
  readonly setShowEmployeeModal: (show: boolean) => void;
  readonly handleSubmitEmployee: (
    e: React.FormEvent,
    data: EmployeeFormData,
  ) => void;
  readonly state: "create" | "update";
  readonly selectedEmployee?: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
}

const emptyForm: EmployeeFormData = {
  name: "",
  email: "",
  role: "User",
};

export default function EmployeeModal({
  showEmployeeModal,
  setShowEmployeeModal,
  handleSubmitEmployee,
  state,
  selectedEmployee,
}: EmployeeModalProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(emptyForm);

  // Pre-fill when editing, reset when adding
  useEffect(() => {
    if (state === "update" && selectedEmployee) {
      setFormData({
        name: selectedEmployee.name ?? "",
        email: selectedEmployee.email ?? "",
        role: selectedEmployee.role ?? "User",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [state, selectedEmployee, showEmployeeModal]);

  if (!showEmployeeModal) return null;

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm";

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-gray-900 text-lg">
            {state === "create" ? "Add New Employee" : "Edit Employee"}
          </h2>
          <button
            onClick={() => setShowEmployeeModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => handleSubmitEmployee(e, formData)}
          className="p-5 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 mb-2 text-sm"
              >
                Name *
              </label>
              <input
                name="name"
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={inputCls}
                placeholder="Enter name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2 text-sm"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputCls}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 mb-2 text-sm"
            >
              Role *
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className={inputCls}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              {state === "create" ? "Add Employee" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setShowEmployeeModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
