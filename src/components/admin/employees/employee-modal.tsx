import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import { UpdateUserInput } from "@/types/users-type";

export interface EmployeeFormData {
  phone: string | number | readonly string[] | undefined;
  name: string;
  email: string;
  role: string;
}

interface EmployeeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly loading: boolean;
  readonly onSave: (
    data: UpdateUserInput,
  ) => void;
  readonly selectedEmployee?: {
    phone: string;
    id: any;
    name?: string;
    email?: string;
    role?: string;
  } | null;

}

const emptyForm: EmployeeFormData = {
  name: "",
  email: "",
  role: "User",
  phone: "",
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
      className: "text-[13px] font-semibold text-[#F4364C] mt-1",
    })
  ).current;

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name || "",
        email: selectedEmployee.email || "",
        role: selectedEmployee.role || "User",
        phone: selectedEmployee.phone || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  // Payload mapper
  const mapFormToPayload = (data: EmployeeFormData): UpdateUserInput => ({
    id: selectedEmployee?.id || "",
    name: data.name,
    role: data.role.toUpperCase(),
    orgId: "b51cc444-81ab-4509-9e2d-69a2e0b2e688", // 🔥 replace with real value
    activeStatus: "ACTIVE", // default or map from UI
    phone: data.phone?.toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      const payload = mapFormToPayload(formData);

      if (selectedEmployee) {
        payload.id = selectedEmployee.id; // for update
      }

      onSave(payload);

    } else {
      validator.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-gray-900 text-lg">
            {isSubmitting ? "Add New Employee" : "Edit Employee"}
          </h2>
          <button
            onClick={() => onClose()}
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
                onChange={handleChange}
                placeholder="Enter name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              {validator.message("name", formData.name, "required")}
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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              {validator.message("email", formData.email, "required")}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
              {validator.message("role", formData.role, "required")}
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 mb-2 text-sm"
              >
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              {validator.message("phone", formData.phone, "required")}
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              {isSubmitting ? "Saving..." : "Edit Employee"}
            </button>
            <button
              type="button"
              onClick={() => onClose()}
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
