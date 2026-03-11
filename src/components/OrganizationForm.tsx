import { useState } from "react";
import { X } from "lucide-react";
import {
  CreateOrganizationInput,
  Organization,
  UpdateOrganizationInput,
} from "@/types/organization";
import Loader from "./Loader";
import { INDUSTRY_OPTIONS } from "@/utils/constant";

interface OrganizationFormProps {
  readonly organization: Organization | null;
  readonly onClose: () => void;
  readonly state: "edit" | "create" | "view";
  readonly handleCreate?: (data: CreateOrganizationInput) => Promise<void>;
  readonly handleUpdate?: (data: UpdateOrganizationInput) => Promise<void>;
  readonly loading?: boolean;
}

export function OrganizationForm({
  organization,
  onClose,
  state,
  handleCreate,
  handleUpdate,
  loading,
}: OrganizationFormProps) {
  const [formData, setFormData] = useState({
    name: organization?.name || "",
    primaryAdminName: organization?.primaryAdmin.name || "",
    industry: organization?.industry || "",
    primaryAdminEmail: organization?.primaryAdmin.email || "",
    domain: organization?.domain || "",
    locationName: organization?.location.name || "",
    employeeCount: organization?.employeeCount || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission
    if (state === "create") {
      const {
        domain,
        employeeCount,
        industry,
        locationName,
        name,
        primaryAdminName,
        primaryAdminEmail,
      } = formData;
      const data = {
        domain,
        employeeCount: Number(employeeCount),
        industry,
        locationName,
        name,
        primaryAdminName,
        primaryAdminEmail,
      };
      await handleCreate?.(data);
    } else {
      const {
        domain,
        employeeCount,
        industry,
        locationName,
        name,
        primaryAdminName,
        primaryAdminEmail,
      } = formData;
      const data = {
        id: organization?.id!,
        domain,
        employeeCount: Number(employeeCount),
        industry,
        locationName,
        name,
        primaryAdminName,
        primaryAdminEmail,
      };

      await handleUpdate?.(data);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "employees" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-50 flex items-center justify-center z-50 p-4 min-h-screen">
      <div className="max-w-3xl bg-white rounded-lg border border-gray-200 p-5 w-full">
        <div className="flex items-center justify-between mb-5 w-full">
          <div>
            <h1 className="text-gray-900 mb-1 ">
              {state === "edit" ? "Edit Organization" : "Add New Organization"}
            </h1>
            <p className="text-gray-600 text-sm">
              {state === "edit"
                ? "Update organization details"
                : "Register a new organization"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-gray-200 p-5"
        >
          <div className="space-y-4">
            {/* Organization Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 mb-2 text-sm"
              >
                Organization Name *
              </label>
              <input
                type="text"
                id="name"
                readOnly={state === "view"}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                placeholder="Enter organization name"
              />
            </div>
            {/* Domain Name */}
            <div>
              <label
                htmlFor="domain"
                className="block text-gray-700 mb-2 text-sm"
              >
                Domain Name *
              </label>
              <input
                type="text"
                readOnly={state === "view"}
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                placeholder="Enter organization domain"
              />
            </div>

            {/* Primary Admin */}
            <div>
              <label
                htmlFor="primaryAdmin"
                className="block text-gray-700 mb-2 text-sm"
              >
                Primary Admin Name *
              </label>
              <input
                type="text"
                id="primaryAdmin"
                readOnly={state === "view"}
                name="primaryAdminName"
                value={formData.primaryAdminName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                placeholder="Enter admin name"
              />
            </div>
            {/* Primary Email */}
            <div>
              <label
                htmlFor="primaryAdmin"
                className="block text-gray-700 mb-2 text-sm"
              >
                Primary Admin Email *
              </label>
              <input
                type="email"
                id="primaryAdminEmail"
                readOnly={state === "view"}
                name="primaryAdminEmail"
                value={formData.primaryAdminEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                placeholder="Enter admin name"
              />
            </div>

            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="block text-gray-700 mb-2 text-sm"
              >
                Industry *
              </label>
              <select
                id="industry"
                disabled={state === "view"}
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="locationName"
                className="block text-gray-700 mb-2 text-sm"
              >
                Location *
              </label>
              <input
                type="text"
                readOnly={state === "view"}
                id="locationName"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                placeholder="City, State"
              />
            </div>

            {/* Number of Employees */}
            <div>
              <label
                htmlFor="employeeCount"
                className="block text-gray-700 mb-2 text-sm"
              >
                Number of Employees *
              </label>
              <input
                type="number"
                readOnly={state === "view"}
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                placeholder="Enter number of employees"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-5">
            {state !== "view" && (
              <button
                disabled={loading}
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm disabled:cursor-not-allowed  flex items-center gap-2 justify-center"
              >
                {!loading &&
                  (state === "edit"
                    ? "Update Organization"
                    : "Create Organization")}
                {loading && <Loader size="sm" />}
              </button>
            )}
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm disabled:cursor-not-allowed "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
