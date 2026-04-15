"use client";
import { useCallback, useMemo, useState } from "react";
import EmployeeModal from "./employee-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import SearchBox from "@/components/SearchBox";
import { AllUsersResponse, UpdateUserInput, UserInput } from "@/types/users-type";
import EmployeeCards from "./employee-card";
import EmployeeHeader from "./employee-header";
import TableRow from "./table-row";
import { getAllUsersAction, removeUserAction, updateUserAction } from "@/utils/graphql/users/actions";
import { toast } from "sonner";
import { debounce } from "@/utils/common-service";


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
  readonly employees: AllUsersResponse;
}

export function OrgAdminEmployees({ employees }: OrgAdminEmployeesProps) {
  const [employeesList, setEmployeesList] = useState<AllUsersResponse>(employees);
  const [selectedEmployee, setSelectedEmployee] = useState<UserInput | null>(null);
  const { stats } = employeesList || {};
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [formState, setFormState] = useState<"create" | "update">("create");

  const statsData = {
    totalEmployees: stats?.totalEmployees || 0,
    activeEmployees: stats?.activeEmployees || 0,
    newThisMonth: stats?.newThisMonth || 0
  }

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "toggle" | null
  >(null);

  const [empToAct, setEmpToAct] = useState<UserInput | null>(null);

  const filteredEmployees = useMemo(() => {
    const search = searchTerm.toLowerCase();

    if (!Array.isArray(employeesList?.users)) return [];

    return employeesList.users.filter((emp) => {
      return (
        emp.name?.toLowerCase().includes(search) ||
        emp.email?.toLowerCase().includes(search) ||
        emp.role?.toLowerCase().includes(search)
      );
    });
  }, [employeesList, searchTerm]);


  const handleToggleStatus = (employee: UserInput) => {
    setEmpToAct(employee);
    setConfirmAction("toggle");
  };

  const handleDeleteEmployee = (id: string) => {
    setDeleteId(id);
    setConfirmAction("delete");
  };

  const handleEditEmployee = (employee: UserInput) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true); // open modal
  };

  const handleSubmitEmployee = async (newEmployee: UpdateUserInput) => {
    try {
      const res = await updateUserAction(newEmployee);
      if (res?.updateUser?.success) {
        toast.success(res.updateUser.message);
        const refreshedList = await getAllUsersAction({});
        setEmployeesList(refreshedList.data.users);
      } else {
        toast.error(res?.updateUser?.message || "Failed to save employee");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setShowEmployeeModal(false);
    }
  };

  // Confirmation modal handler
  const handleConfirmAction = async () => {
    if (confirmAction === "delete" && deleteId) {
      setLoading(true);
      try {
        const res = await removeUserAction({ id: deleteId });
        debugger
        if (res.removeUserById.success) {
          toast.success(res.removeUserById.message);
          const refreshedList = await getAllUsersAction({});

          setEmployeesList(refreshedList.data.users);
        } else {
          toast.error(res.removeUserById.message || "Failed to delete employee");
        }
      } catch (error) {
        toast.error(error?.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
        setConfirmAction(null);
        setDeleteId(null);
      }
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
      <EmployeeHeader
        setShowEmployeeModal={setShowEmployeeModal}
        setFormState={setFormState}
        setSelectedEmployee={setSelectedEmployee}
      />

      {/* Summary Cards */}
      <EmployeeCards statsData={statsData} />

      {/* Employee List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="p-3  border-gray-200">
            <SearchBox
              onSearchChange={handleDebounce}
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
                  <TableRow
                    key={employee.id}
                    employee={employee}
                    handleToggleStatus={handleToggleStatus}
                    handleDeleteEmployee={handleDeleteEmployee}
                    handleEditEmployee={handleEditEmployee}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Employee Modal */}
        {showEmployeeModal && (
          <EmployeeModal
            selectedEmployee={selectedEmployee}
            onSave={handleSubmitEmployee}
            loading={loading}
            isOpen={showEmployeeModal}
            onClose={() => {
              setShowEmployeeModal(false);
              setSelectedEmployee(null);
            }}

          />
        )}

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
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="danger"
        />
      </div>
    </div>
  );
}


