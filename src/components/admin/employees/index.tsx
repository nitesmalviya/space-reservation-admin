"use client";
import { useCallback, useState } from "react";
import { Plus, Edit, Power, Trash2, Table } from "lucide-react";
import EmployeeModal from "../../employee-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import SearchBox from "@/components/SearchBox";
import EmployeesStats from "./employees-stats";
import { debounce } from "@/utils/common-service";
import { getAllUsersAction, removeUserAction, updateUserAction } from "@/utils/graphql/users/actions";
import { toast } from "sonner";
import { CreateUserInput, UpdateUserInput } from "@/types/users-type";
import TableRow from "./table-row";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  bookingCount: number;
  activeStatus: string;
}

interface OrgAdminEmployeesProps {
  employeesData: Employee[];
}

export function OrgAdminEmployees({ employeesData }: OrgAdminEmployeesProps) {

  const [employeeList, setEmployeeList] = useState<Employee[]>(employeesData);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState<"create" | "update">("create");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { activeEmployees, newThisMonth, totalEmployees } = employeeList?.stats || {};

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "toggle" | null
  >(null);
  const [empToAct, setEmpToAct] = useState<Employee | null>(null);

  const filteredEmployees = employeeList?.users?.filter(
    (emp: Employee) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditEmployee = (employee: UpdateUserInput) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (employee: Employee) => {
    setEmpToAct(employee);
    setConfirmAction("toggle");
  };

  // Delete employee
  const handleDeleteEmployee = (id: string) => {
    setDeleteId(id);
    setConfirmAction("delete");
  };
  const handleConfirmAction = async () => {
    if (confirmAction === "delete" && deleteId) {
      setLoading(true);
      try {

        const res = await removeUserAction({ id: deleteId });
         
        if (res?.removeUserById?.success) {
          toast.success(res.removeUserById.message);

          const updatedList = await getAllUsersAction({}); // Fetch updated list after edit
          setEmployeeList(updatedList.users);
        } else {
          toast.error(res?.removeUserById?.message || "Failed to delete user");
        }
      } catch (error: any) {
        toast.error(error.message || "Unexpected error occurred");
      }
      finally {
        setLoading(false);
        setConfirmAction(null);
        setDeleteId(null);
      }
    }
  };


  const handleAddEmployee = async (newEmployee: CreateUserInput) => {
    try {
      setLoading(true);
      if (selectedEmployee) {
        const res = await updateUserAction({ id: selectedEmployee?.id, ...newEmployee });
        debugger;
        if (res?.updateUser?.success) {
          toast.success(res.updateUser.message);

          const updatedList = await getAllUsersAction({}); // Fetch updated list after edit
          setEmployeeList(updatedList.users);

          setIsModalOpen(false);
          setSelectedEmployee(null);
        } else {
          toast.error(res?.updateUser?.message || "Failed to update user");
        }
      } else {
        // TODO: Implement add employee logic
        console.log("Add employee logic to be implemented", newEmployee);

      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }

  };



  // Search query
  const handleDebounce = useCallback(
    debounce((search: string) => {
      setSearchTerm(search);
    }, 500),
    []
  )


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

            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Employee
        </button>
      </div>

      {/* Summary Cards */}
      <EmployeesStats
        activeEmployees={activeEmployees}
        newThisMonth={newThisMonth}
        totalEmployees={totalEmployees} />
      {/* Employee List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="p-3  border-gray-200">
            <SearchBox
              onSearchChange={handleDebounce}
              placeholder="Search workspaces..."
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
                  <TableRow
                    key={employee.id}
                    employee={employee}
                    handleEditEmployee={handleEditEmployee}
                    handleToggleStatus={handleToggleStatus}
                    handleDeleteEmployee={handleDeleteEmployee} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Employee Modal */}

        <EmployeeModal
          selectedEmployee={selectedEmployee}
          onSave={handleAddEmployee}
          loading={loading}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEmployee(null);
          }}

        />


        {/* Delete / Status Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmAction !== null}
          onClose={() => {
            setConfirmAction(null);
            setDeleteId(null);
          }}
          onConfirm={handleConfirmAction}
          title="Delete Employee"
          description="Are you sure you want to delete this employee? This action cannot be undone."
          confirmLabel="Yes, Delete"
          cancelLabel="Cancel"
          variant="danger"
        />
      </div>
    </div>
  );
}
