"use client";
import { useState } from "react";
import LocationModal from "./location-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { createLocationAction, getLocationsByOrgAction } from "@/utils/graphql/location/actions";
import { toast } from "sonner";
import { CreateLocationInput, LocationByOrg } from "@/types/location-type";
import Locations from "./locations";
import OrganizationDetails from "./organization-details";


interface OrgAdminProfileProps {
  readonly locations: LocationByOrg[];
}

const OrgAdminProfile = ({ locations }: OrgAdminProfileProps) => {
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState("Bitcot Technology");
  const [orgEmail, setOrgEmail] = useState("contact@bitcot.com");
  const [orgDomain, setOrgDomain] = useState("bitcot.com");

  // Location modal state
  const [locationList, setLocationList] = useState<LocationByOrg[]>(locations);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedLocation, setSelectedLocation] = useState<LocationByOrg | null>(
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

  const handleLocationSubmit = async (newLocation: CreateLocationInput) => {
    if (modalMode === "create") {
      try {
        setLoading(true);
        const res = await createLocationAction(newLocation);
        debugger
        if (res?.createLocation?.success) {
          toast.success(res.createLocation.message);
          const updated = await getLocationsByOrgAction({});
          setLocationList(updated.locationsByOrg.locations);
          setModalOpen(false);
        } else {
          toast.error(res?.createLocation?.message || "Failed to create location");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (modalMode === "edit" && selectedLocation) {
      setLocationList((prev) =>
        prev.map((loc) =>
          loc.id === selectedLocation.id ? { ...loc, ...newLocation } : loc,
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
      <OrganizationDetails
        orgName={orgName}
        orgEmail={orgEmail}
        orgDomain={orgDomain}
      />

      {/* Locations */}
      <Locations locationList={locationList}
        openCreateModal={openCreateModal}
        openEditModal={openEditModal}
        requestDeleteLocation={requestDeleteLocation} />

      {/* Location Modal */}
      <LocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleLocationSubmit}
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


export default OrgAdminProfile;