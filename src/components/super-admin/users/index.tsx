"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Edit, Shield, Power } from "lucide-react";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import EmployeeModal from "@/components/employee-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { debounce } from "@/utils/common-service";
import { AllUsersData, UpdateUserInput, UserItem } from "@/types/users-type";
import { toast } from "sonner";
import { getAllUsersAction, removeUserAction, updateUserAction } from "@/utils/graphql/users/actions";
import TableRow from "./table-row";

interface UsersProps {
  readonly usersData: AllUsersData;
}

export function Users({ usersData }: UsersProps) {
  const [usersList, setUsersList] = useState<UserItem[]>(usersData.users || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Employee Modal state
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<UserItem | null>(null);

  const [loading, setLoading] = useState(false);

  const users: UserItem[] = usersList ?? [];

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        (user.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        (user.email || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        (user.organization?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||

        (user.role || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [searchTerm, users],
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  // search debounce
  const handleDebounce = useCallback(
    debounce((search: string) => {
      setSearchTerm(search);
    }, 300),
    []
  );


  const handleOpenAdd = () => {
    setSelectedUser(null);
    setShowEmployeeModal(true);
  };

  const handleOpenEdit = (user: UserItem) => {
    setSelectedUser(user);
    setShowEmployeeModal(true);
  };

  const handleSaveEmployee = async (payload: UpdateUserInput) => {
    // Placeholder: save employee action not implemented yet
    try {
      setLoading(true);

      if (selectedUser) {
        const res = await updateUserAction(payload);
        debugger
        if (res?.updateUser.success) {
          toast.success(res?.updateUser?.message);

          const refreshData = await getAllUsersAction({
            searchFilter: {
              page: currentPage,
              limit: itemsPerPage,
              search: searchTerm,
            },
          });
          setUsersList(refreshData?.users?.users || []);
          // Update the users list with the refreshed data
          // This assumes you have a way to update the usersData prop, such as lifting state up or using a global store
        } else {
          toast.error(res?.updateUser?.message || "Failed to update user.");
        }
      } else {
        toast.error("Failed to create user.");
      }
    } catch (error) {
      toast.error("Failed to update user.");
    } finally {
      setLoading(false);
      setSelectedUser(null);
      setShowEmployeeModal(false);
    }
  };

  const handleRequestToggle = (user: UserItem) => {
    setUserToToggle(user);
    setConfirmOpen(true);

  };

  const handleConfirmToggle = async () => {
    // Placeholder: toggle user active status action not implemented yet
    try {
      setLoading(true);
      const res = await removeUserAction({
        id: userToToggle?.id || "",
      });

      if (res?.removeUserById.success) {
        toast.success(res?.removeUserById.message);
        const refreshData = await getAllUsersAction({
          searchFilter: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm,
          },
        });
        setUsersList(refreshData?.users?.users || []);
      } else {
        toast.error(res?.removeUserById.message || "Failed to toggle user status.");
      }
    } catch (error) {
      toast.error("Failed to toggle user status.");
    } finally {
      setUserToToggle(null);
      setConfirmOpen(false);
      setLoading(false);
    }
  };

  const handleModifyRole = (userId: string) => {
    // Placeholder: modify role action not implemented yet
  };


  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-gray-900 mb-1">User Management</h1>
          <p className="text-gray-600 text-sm">
            Manage employee accounts and permissions
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <SearchBox
            onSearchChange={handleDebounce}
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
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user: UserItem) => {
                  return (
                    <TableRow 
                      user={user} 
                      handleRequestToggle={handleRequestToggle} 
                      handleOpenEdit={handleOpenEdit} 
                      handleModifyRole={handleModifyRole} />
                  );
                })
              ) : (
                <tr>
                  <td className="px-5 py-6 text-center text-sm text-gray-500" colSpan={6}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page: number) => setCurrentPage(page)}
          onItemsPerPageChange={(pageSize: number) => setItemsPerPage(pageSize)}
        />
      </div>

      {/* Add / Edit Employee Modal */}
      <EmployeeModal
        isOpen={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        onSave={handleSaveEmployee}
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
          userToToggle?.activeStatus
            ? "Deactivate Employee"
            : "Activate Employee"
        }
        description={
          userToToggle?.activeStatus
            ? `Are you sure you want to deactivate "${userToToggle?.name}"? They will lose access.`
            : `Are you sure you want to activate "${userToToggle?.name}"? They will regain access.`
        }
        confirmLabel={userToToggle?.activeStatus ? "Deactivate" : "Activate"}
        cancelLabel="Cancel"
        variant="info"
      />
    </div>
  );
}
