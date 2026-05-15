"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Upload,
  Edit
} from "lucide-react";
import LocationModal from "../../location-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { CreateLocationInput, Location, LocationByOrgType, LocationsByOrgData } from "@/types/location";
import { createLocationAction, getLocationsByOrgAction, removeLocationAction, updateLocationAction } from "@/utils/graphql/locations/action";
import { toast } from "sonner";
import LocationList from "./location-list";
import OrganizationDetails from "./organization-details";
import { updateOrganizationAction } from "@/utils/graphql/organization/action";
import { Organization, OrganizationResponse, UpdateOrganizationInput } from "@/types/organization";
import { useAppSelector } from "@/store/hooks";

interface OrgAdminProfileProps {
   readonly locationsData: LocationByOrg[];
  readonly organizationData: Organization | null;
}

export function OrgAdminProfile({ locationsData,organizationData  }: OrgAdminProfileProps) {
  const userData = useAppSelector((state) => state.auth.user);

  // Location modal state
  const [locationList, setLocationList] = useState<Location[]>(locationsData);
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  // For organization profile
  const [selectedOraganizationDetails, setSelectedOraganizationDetails] =
    useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Delete confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState<"delete" | null>(null);
  // Confirmation modal state
  const [locationToDelete, setLocationToDelete] = useState<LocationByOrgType | null>(null);

  useEffect(() => {
    if (organizationData) {
      setSelectedOraganizationDetails(organizationData);
    }
  }, [organizationData]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedLocation(null);
    setIsModalOpen(true);
  };

  const openEditModal = (location: Location) => {
    setModalMode("edit");
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  // For update organization profile
  const handleUpdateOrganizationProfile = async (data: UpdateOrganizationInput) => {
    try {
      setLoading(true)
      if (selectedOraganizationDetails) {
        const res = await updateOrganizationAction({ data });
        debugger
        if (res?.updateOrganization?.success) {
          toast.success(res.updateOrganization.message);


        } else {
          toast.error(res?.updateOrganization.message);
        }
      }

    } catch (error: any) {
      toast.error(error?.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  // For Add location
  const handleAddLocation = async (newLocation: CreateLocationInput) => {
    try {
      setLoading(true);

      if (selectedLocation) {

        const res = await updateLocationAction({ id: selectedLocation.id, ...newLocation });

        if (res?.updateLocation.success) {
          toast.success(res.updateLocation.message);

          const refreshedList = await getLocationsByOrgAction({
            page: 1,
            limit: 10,
          });
          setLocationList(refreshedList?.locationsByOrg?.locations)

          setSelectedLocation(null);
        } else {
          toast.error(res?.updateLocation?.message || "Failed to update location");
        }

      } else {
        const res = await createLocationAction(newLocation);

        if (res?.createLocation.success) {
          toast.success(res.createLocation.message);

          const refreshedList = await getLocationsByOrgAction({
            page: 1,
            limit: 10,
          });
          setLocationList(refreshedList?.locationsByOrg?.locations);

          setSelectedLocation(null)
        } else {
          toast.error(res?.createLocation?.message || "Failed to create space");
        }
      }
    } catch (error) {
      console.error("Error adding/updating location:", error);
    } finally {
      setLoading(false);
    }
  }

  // For remove location
  const requestDeleteLocation = (location: LocationsByOrgData) => {
    setLocationToDelete(location);
    setConfirmOpen("delete");
  };

  const confirmDeleteLocation = async () => {

    if (locationToDelete) {
      try {
        setLoading(true);

        const res = await removeLocationAction({
          removeLocationId: locationToDelete.id
        });
        debugger
        if (res?.removeLocation?.success) {
          toast.success(res.removeLocation.message);

          const refreshedList = await getLocationsByOrgAction({
            page: 1,
            limit: 10,
          });
          setLocationList(refreshedList?.locationsByOrg?.locations);

        } else {
          toast.error(res?.removeLocation?.message || "Failed to delete location");
        }

      } catch (error: any) {
        toast.error(error.message || "An error occurred while deleting the location");
      } finally {
        setLoading(false);
        setConfirmOpen(null);
        setLocationToDelete(null);
      }

    }

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
        onSave={handleUpdateOrganizationProfile}
        selectedOraganizationDetails={selectedOraganizationDetails}
        orgId={userData?.orgId}
      />


      {/* Locations */}
      <LocationList
        locationList={locationList}
        openCreateModal={openCreateModal}
        openEditModal={openEditModal}
        requestDeleteLocation={requestDeleteLocation}
      />


      {/* Location Modal */}
      <LocationModal
        selectedLocation={selectedLocation}
        onSave={handleAddLocation}
        isOpen={isModalOpen}
        loading={loading}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLocation(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen === "delete"}
        onClose={() => setConfirmOpen(null)}
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
