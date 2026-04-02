"use client";

import { useState } from "react";
import { Plus, Edit, Shield, Power } from "lucide-react";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import EmployeeModal from "@/components/employee-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { AllUsersResponse, UserInput, UsersType } from "@/types/users-type";
import { toast } from "react-toastify";
import Page from "@/app/(private)/admin/booking-rules/page";
import PageHeading from "@/components/ui/page-heading";

interface UsersProps {
  readonly usersData: AllUsersResponse;
}

export function Users({ usersData }: UsersProps) {
  const [usersList, setUsersList] = useState<UsersType[]>(usersData?.users || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Employee Modal state
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedUser, setSelectedUser] = useState<UsersType | null>(null);

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<UsersType | null>(null);



  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenAdd = () => {
    setSelectedUser(null);
    setModalMode("create");
    setShowEmployeeModal(true);
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setModalMode("update");
    setShowEmployeeModal(true);
  };

  const handleSubmitEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call add/update user API
    try {
      if (selectedUser) {

      } else {
        // const res = await createUserAction(selectedUser);
        // if (res.success) {
        //   setUsersList((prev) => [...prev, res.user]);
        //   toast.success(res.message);
        // }
      }
    } catch (error) {

    }
    setShowEmployeeModal(false);
  };

  const handleRequestToggle = (user: User) => {
    setUserToToggle(user);
    setConfirmOpen(true);
  };

  const handleConfirmToggle = () => {
    // TODO: call toggle status API for userToToggle.id
    setUserToToggle(null);
    setConfirmOpen(false);
  };

  const handleModifyRole = (userId: string) => {
    // TODO: open role modify modal or call API
  };

  return (
    <div className="p-5">

      <PageHeading
        title="User Management"
        description="Manage employee accounts and permissions"
        action={
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        } />

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search users..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Name
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Email
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Organization
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Role
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-900 text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-3 text-gray-600 text-sm">
                    {user?.organization?.name}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : user.role === "Manager"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${user.activeStatus === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {user.activeStatus}
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
                        className={`p-1.5 rounded-lg transition-colors ${user.status === "Active"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                          }`}
                        title={
                          user.status === "Active" ? "Deactivate" : "Activate"
                        }
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
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={7}
          onPageChange={(page: number) => setCurrentPage(page)} />
      </div>

      {/* Add / Edit Employee Modal */}
      <EmployeeModal
        showEmployeeModal={showEmployeeModal}
        setShowEmployeeModal={setShowEmployeeModal}
        handleSubmitEmployee={handleSubmitEmployee}
        state={modalMode}
        selectedEmployee={selectedUser}
      />

      {/* Status Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setUserToToggle(null);
        }}
        onConfirm={handleConfirmToggle}
        title={
          userToToggle?.status === "Active"
            ? "Deactivate Employee"
            : "Activate Employee"
        }
        description={
          userToToggle?.status === "Active"
            ? `Are you sure you want to deactivate "${userToToggle?.name}"? They will lose access.`
            : `Are you sure you want to activate "${userToToggle?.name}"? They will regain access.`
        }
        confirmLabel={
          userToToggle?.status === "Active" ? "Deactivate" : "Activate"
        }
        cancelLabel="Cancel"
        variant="info"
      />
    </div>
  );
}
