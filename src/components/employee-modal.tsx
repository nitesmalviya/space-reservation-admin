import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import { UpdateUserInput, UserRole } from "@/types/users-type";

export interface EmployeeFormData {
  name: string;
  role: UserRole;
}

interface EmployeeModalProps {
  selectedEmployee?: any;
  onSave: (payload: CreateEmployeeInput) => void;
  loading?: boolean;
  onClose: () => void;
  isOpen: boolean;

}

const emptyForm: EmployeeFormData = {
  name: "",
  role: "USER",
};

export default function EmployeeModal({
  selectedEmployee,
  isOpen,
  onClose,
  onSave,
  loading: isSubmitting = false,
}: EmployeeModalProps) {

  const [formData, setFormData] = useState<EmployeeFormData>(emptyForm);
  const [, forceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      className: "text-red-500 text-xs mt-1",
    })
  ).current;

  // Pre-fill when editing, reset when adding
  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name ?? "",
        role: selectedEmployee.role?.toUpperCase() ?? "USER"
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedEmployee]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // payload for both add and edit (id included for edit)
  const mapFormToPayload = (
    data: EmployeeFormData
  ): UpdateUserInput => ({
    id: selectedEmployee?.id || "",
    name: data.name,
    role: data.role.toUpperCase() as UserRole,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validator.allValid()) {
      const payload = mapFormToPayload(formData);

      if (selectedEmployee) {
        payload.id = selectedEmployee.id;
      }

      onSave(payload);
    } else {
      validator.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  }

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm";

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}>
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-gray-900 text-lg">
            {selectedEmployee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="emp-first"
                className="block text-gray-700 mb-2 text-sm"
              >
                Name *
              </label>
              <input
                id="emp-first"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputCls}
                placeholder="Enter name"
              />
              {validator.message("name", formData.name, "required")}
            </div>

          </div>

          <div>
            <label
              htmlFor="emp-email"
              className="block text-gray-700 mb-2 text-sm"
            >
              Email *
            </label>
            <input
              id="emp-email"
              type="text"
              name="email"
              value={selectedEmployee?.email || ""}
              className={inputCls}
              placeholder="Enter email address"
              readOnly
            />

          </div>

          <div>
            <label
              htmlFor="emp-role"
              className="block text-gray-700 mb-2 text-sm"
            >
              Role *
            </label>
            <select
              id="emp-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="USER">User</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>

            {validator.message("role", formData.role, "required")}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              {isSubmitting ? "Saving..." : "Save Employee"}
            </button>
            <button
              type="button"
              onClick={onClose}
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
