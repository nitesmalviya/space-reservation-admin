"use client";
import { useState } from "react";
import { Plus, Edit, Power, Trash2 } from "lucide-react";
import EmployeeModal from "../../employee-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import SearchBox from "@/components/SearchBox";

export interface Employee {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  joinDate: string;
  bookings: number;
}

interface OrgAdminEmployeesProps {
  readonly employees: Employee[];
}

export function OrgAdminEmployees({ employees }: OrgAdminEmployeesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [formState, setFormState] = useState<"create" | "update">("create");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "toggle" | null
  >(null);
  const [empToAct, setEmpToAct] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleStatus = (employee: Employee) => {
    setEmpToAct(employee);
    setConfirmAction("toggle");
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmpToAct(employee);
    setConfirmAction("delete");
  };

  const handleSubmitEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up add/update API call
    setShowEmployeeModal(false);
  };

  const handleConfirmAction = () => {
    if (!empToAct) return;
    if (confirmAction === "delete") {
      // TODO: call delete API for empToAct.id
    } else if (confirmAction === "toggle") {
      // TODO: call toggle status API for empToAct.id
    }
    setConfirmAction(null);
    setEmpToAct(null);
  };

  return (
    <div className="p-6">
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Total Employees</p>
          <p className="text-gray-900 text-xl">45</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Active Employees</p>
          <p className="text-gray-900 text-xl">42</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">New This Month</p>
          <p className="text-gray-900 text-xl">3</p>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="p-3  border-gray-200">
            <SearchBox
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search employees..."
            />
          </div>

          <div className="overflow-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Join Date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Bookings
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
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
                      {employee.joinDate}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">
                      {employee.bookings}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${employee.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setFormState("update");
                            setSelectedEmployee(employee);
                            setShowEmployeeModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Employee"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(employee)}
                          className={`p-1.5 rounded-lg transition-colors ${employee.status === "Active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                            }`}
                          title={
                            employee.status === "Active"
                              ? "Deactivate"
                              : "Activate"
                          }
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Employee Modal */}
        {showEmployeeModal && (
          <EmployeeModal
            showEmployeeModal={showEmployeeModal}
            setShowEmployeeModal={() => setShowEmployeeModal(false)}
            handleSubmitEmployee={handleSubmitEmployee}
            state={formState}
            selectedEmployee={selectedEmployee}
          />
        )}

        {/* Delete / Status Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmAction !== null}
          onClose={() => {
            setConfirmAction(null);
            setEmpToAct(null);
          }}
          onConfirm={handleConfirmAction}
          title={
            confirmAction === "delete"
              ? "Delete Employee"
              : empToAct?.status === "Active"
                ? "Deactivate Employee"
                : "Activate Employee"
          }
          description={
            confirmAction === "delete"
              ? `Are you sure you want to delete "${empToAct?.name}"? This action cannot be undone.`
              : empToAct?.status === "Active"
                ? `Are you sure you want to deactivate "${empToAct?.name}"? They will lose access.`
                : `Are you sure you want to activate "${empToAct?.name}"? They will regain access.`
          }
          confirmLabel={
            confirmAction === "delete"
              ? "Delete"
              : empToAct?.status === "Active"
                ? "Deactivate"
                : "Activate"
          }
          cancelLabel="Cancel"
          variant={confirmAction === "delete" ? "danger" : "info"}
        />
      </div>
    </div>
  );
}
