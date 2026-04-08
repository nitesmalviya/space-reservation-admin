"use client";
import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
  removeOrganizationById,
  updateOrganizationById,
} from "@/store/actions/organization-action";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import OrganizationTable from "./OrganizationTable";
import PageHeading from "@/components/ui/page-heading";
import { debounce } from "@/utils/common-service";
import { getAllOrganizationsAction } from "@/utils/graphql/organization/action";
import { DEFAULT_PAGINATION, paginationType } from "@/types/pagination-type";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

interface OrganizationsProps {
  readonly organizationsData: AllOrganizationsData | null;
}

export function Organizations({ organizationsData }: OrganizationsProps) {
  const [organizationsList, setOrganizationsList] = useState<AllOrganizationsData | null>(organizationsData);
  const [pagination, setPagination] = useState<paginationType>(DEFAULT_PAGINATION);
  const [showForm, setShowForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [state, setState] = useState<"edit" | "create" | "view">("create");
  const [loading, setLoading] = useState(false);
  const [showDltModel, setShowDltModel] = useState(false);

  const fetchOrganizationData = async (paginate: paginationType) => {

    try {
      setLoading(true)
      const res = await getAllOrganizationsAction({
        searchFilter: {
          page: paginate.page,
          limit: paginate.limit,
          search: paginate.search || "",
        }
      });

      const orgData = res?.organizations;
      setOrganizationsList({
        ...orgData,
        organizations: orgData?.organizations || []
      });
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchOrganizationData(pagination);
  }, [pagination]);

  // search 
  const handleDebounce = useCallback(
    debounce((search: string) => {
      setPagination(prev => ({ ...prev, page: 1, search }));
    }, 500),
    []
  );


  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

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

      if (res?.success) {
        toast.success(res?.message);
        setShowForm(false);
        await fetchOrganizationData(pagination);
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
        setShowForm(false);
        await fetchOrganizationData(pagination);
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
        await fetchOrganizationData(pagination);
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
      <PageHeading
        title="Organization Management"
        description="Manage all organizations in the workspace"
        action={
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Plus className="w-5 h-5" />
            Add Organization
          </button>
        }
      />

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <SearchBox
            onSearchChange={handleDebounce}
            placeholder="Search organizations..."
          />
        </div>

        <OrganizationTable
          organizationsList={organizationsList?.organizations ?? []}
          handleView={handleView}
          handleEdit={handleEdit}
          openDltCnfrModel={openDltCnfrModel}
        />

        <div className="mt-4 border-t border-gray-100">
          <Pagination
            currentPage={pagination.page}
            totalItems={organizationsList?.totalItems || 0}
            itemsPerPage={pagination.limit}
            onPageChange={handlePageChange}
          />
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
