"use client";
import { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Upload,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import LocationModal from "../../location-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}
interface OrgAdminProfileProps {
  readonly locations: Location[];
}

export function OrgAdminProfile({ locations }: OrgAdminProfileProps) {
  const [orgName, setOrgName] = useState("Bitcot Technology");
  const [orgEmail, setOrgEmail] = useState("contact@bitcot.com");
  const [orgDomain, setOrgDomain] = useState("bitcot.com");

  // Location modal state
  const [locationList, setLocationList] = useState<Location[]>(locations);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  // Delete confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(
    null,
  );

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedLocation(null);
    setModalOpen(true);
  };

  const openEditModal = (location: Location) => {
    setModalMode("edit");
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const handleLocationSubmit = (data: Omit<Location, "id">) => {
    if (modalMode === "create") {
      const newLocation: Location = { ...data, id: Date.now().toString() };
      setLocationList((prev) => [...prev, newLocation]);
    } else if (modalMode === "edit" && selectedLocation) {
      setLocationList((prev) =>
        prev.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, ...data } : loc,
        ),
      );
    }
  };

  const requestDeleteLocation = (location: Location) => {
    setLocationToDelete(location);
    setConfirmOpen(true);
  };

  const confirmDeleteLocation = () => {
    if (locationToDelete) {
      setLocationList((prev) =>
        prev.filter((loc) => loc.id !== locationToDelete.id),
      );
      setLocationToDelete(null);
    }
    setConfirmOpen(false);
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Organization Profile</h1>
        <p className="text-gray-600 text-sm">
          Manage your organization details and locations
        </p>
      </div>

      {/* Organization Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-gray-900 text-base">Organization Details</h2>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
            <Edit className="w-4 h-4 inline mr-2" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Logo Upload */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm">
              Organization Logo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                <Upload className="w-4 h-4" />
                Upload Logo
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Organization Name
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Contact Email
            </label>
            <input
              type="email"
              value={orgEmail}
              onChange={(e) => setOrgEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Company Domain
            </label>
            <input
              type="text"
              value={orgDomain}
              onChange={(e) => setOrgDomain(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Employees with @{orgDomain} can book spaces
            </p>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-gray-900 text-base">Office Locations</h2>
            <p className="text-xs text-gray-500 mt-1">
              {locationList.length} locations registered
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Location
          </button>
        </div>

        <div className="space-y-3">
          {locationList.map((location) => (
            <div
              key={location.id}
              className="border border-gray-200 rounded-lg p-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-sm font-medium">
                      {location.name}
                    </h3>
                    <p className="text-xs text-gray-500">{location.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(location)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Location"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => requestDeleteLocation(location)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Location"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-gray-900">{location.address}</p>
                  <p className="text-sm text-gray-900">
                    {location.city}, {location.state} - {location.pincode}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contact</p>
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {location.phone}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {locationList.length === 0 && (
            <div className="text-center py-10">
              <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No locations added yet.</p>
              <p className="text-xs text-gray-400">
                Click &quot;Add Location&quot; to register your first office.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleLocationSubmit}
        selectedLocation={selectedLocation}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDeleteLocation}
        title="Delete Location"
        description={`Are you sure you want to delete "${locationToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
}
