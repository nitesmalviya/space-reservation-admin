"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { OrganizationForm } from "@/components/OrganizationForm";
import SearchBox from "@/components/SearchBox";
import {
  AllOrganizationsData,
  CreateOrganizationInput,
  Organization,
  UpdateOrganizationInput,
} from "@/types/organization";
import {
  createOrganization,
  getAllOrganizations,
  removeOrganizationById,
  updateOrganizationById,
} from "@/store/actions/organization-action";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import OrganizationTable from "./OrganizationTable";

interface OrganizationsProps {
  readonly organizationsData: AllOrganizationsData | null;
}

export function Organizations({ organizationsData }: OrganizationsProps) {
  const [organizationsDataList, setOrganizationsDataList] = useState<AllOrganizationsData | null>(organizationsData);
  const [showForm, setShowForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState<"edit" | "create" | "view">("create");
  const [loading, setLoading] = useState(false);
  const [showDltModel, setShowDltModel] = useState(false);

  const filteredOrgs = organizationsDataList?.organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

        setShowForm(false);
      } else {
        toast.error(res?.message);
      }
      setShowForm(false);
      const refreshedList = await getAllOrganizations({ limit: 10, page: 1, search: "" });
      setOrganizationsDataList(refreshedList?.data as any);
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
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search organizations..."
          />
        </div>
        <OrganizationTable
          filteredOrgs={filteredOrgs ?? []}
          handleView={handleView}
          handleEdit={handleEdit}
          openDltCnfrModel={openDltCnfrModel}
        />

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
