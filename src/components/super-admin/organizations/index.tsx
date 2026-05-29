"use client";

import { useCallback, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { OrganizationForm } from "@/components/OrganizationForm";
import SearchBox from "@/components/SearchBox";
import {
  CreateOrganizationInput,
  Organization,
  UpdateOrganizationInput,
} from "@/types/organization";
import {
  createOrganization,
  removeOrganizationById,
  updateOrganizationById,
} from "@/store/actions/organization-action";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { getAllOrganizationsAction } from "@/utils/graphql/organization/action";
import { debounce } from "@/utils/common-service";
import TableRow from "./table-row";

interface OrganizationsProps {
  readonly organizationsData: Organization[];
}

export function Organizations({ organizationsData }: OrganizationsProps) {
  const [organizationsList, setOrganizationsList] = useState<OrganizationsProps[]>(
    organizationsData || []
  );

  const [showForm, setShowForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState<"edit" | "create" | "view">("create");
  const [loading, setLoading] = useState(false);
  const [showDltModel, setShowDltModel] = useState(false);

  const filteredOrgs = useMemo(() => {
    return organizationsList.filter(
      (org) =>
        (org.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (org.industry?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (org.location?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [organizationsList, searchTerm]);

  console.log(organizationsData, "organization data")

  const handleEdit = (org: Organization) => {
    setState("edit");
    setEditingOrg(org);
    setShowForm(true);
  };
  const handleView = (org: Organization) => {
    setState("view");
    setEditingOrg(org);
    setShowForm(true);
  };

  const handleAdd = () => {
    setState("create");

    setEditingOrg(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingOrg(null);
  };

  //open dlt modal
  const openDltCnfrModel = (org: Organization) => {
    setEditingOrg(org);
    setShowDltModel(true);
  };

  //create org
  const handleCreateOrg = async (data: CreateOrganizationInput) => {
    setLoading(true);

    try {
      const res = await createOrganization(data);
      debugger
      if (res?.success) {
        toast.success(res?.message);

        const refreshData = await getAllOrganizationsAction({
          searchFilter: {
            page: 1,
            limit: 10,
            search: ""
          }
        });

        setOrganizationsList(refreshData?.organizations.organizations || []);

        setShowForm(false);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  //update org
  const handleUpdateOrg = async (data: UpdateOrganizationInput) => {
    setLoading(true);

    try {
      const res = await updateOrganizationById(data);
      if (res?.success) {
        toast.success(res?.message);

        const refreshData = await getAllOrganizationsAction({
          searchFilter: {
            page: 1,
            limit: 10,
            search: ""
          }
        });
        setOrganizationsList(refreshData?.organizations.organizations || []);

        setShowForm(false);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  //delete org
  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      const res = await removeOrganizationById(id);
      if (res?.success) {
        toast.success(res?.message);

        const refreshData = await getAllOrganizationsAction({
          searchFilter: {
            page: 1,
            limit: 10,
            search: ""
          }
        });
        setOrganizationsList(refreshData?.organizations.organizations || []);

        setShowDltModel(false);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "something went wrong!");
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
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-gray-900 mb-1">Organization Management</h1>
          <p className="text-gray-600 text-sm">
            Manage all organizations in the workspace
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Organization
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <SearchBox
            onSearchChange={handleDebounce}
            placeholder="Search organizations..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Organization Name
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Primary Admin
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Industry
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Location
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Employees
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

              {filteredOrgs?.map((organization) => (
                <TableRow
                  key={organization.id}
                  organization={organization}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  openDltCnfrModel={openDltCnfrModel} />
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <OrganizationForm
            organization={editingOrg}
            onClose={handleCloseForm}
            handleCreate={handleCreateOrg}
            handleUpdate={handleUpdateOrg}
            state={state}
            loading={loading}
          />
        )}

        <ConfirmationModal
          isOpen={showDltModel}
          onClose={() => {
            setShowDltModel(false);
          }}
          isLoading={loading}
          title="Delete Organization"
          description={`Are you sure,you want to delete this ${editingOrg?.name || ""} organization?`}
          onConfirm={() => {
            handleDelete(editingOrg?.id!);
          }}
          variant="danger"
          confirmLabel="Delete"
        />
      </div>
    </div>
  );
}
