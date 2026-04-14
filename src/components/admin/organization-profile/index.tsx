"use client";
import { useEffect, useState } from "react";
import LocationModal from "./location-modal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { createLocationAction, getLocationsByOrgAction, removeLocationAction, updateLocationAction } from "@/utils/graphql/location/actions";
import { toast } from "sonner";
import { CreateLocationInput, LocationByOrg } from "@/types/location-type";
import Locations from "./locations";
import OrganizationDetails from "./organization-details";
import { updateOrganizationAction } from "@/utils/graphql/organization/action";
import { Organization, OrganizationResponse, UpdateOrganizationInput } from "@/types/organization";
import { useAppSelector } from "@/store/hooks";



interface OrgAdminProfileProps {
  readonly locations: LocationByOrg[];
  readonly organizationData: Organization | null;
}

const OrgAdminProfile = ({ locations, organizationData }: OrgAdminProfileProps) => {
  const userData = useAppSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);

  // Location modal state
  const [locationList, setLocationList] = useState<LocationByOrg[]>(locations);
  useEffect(() => {
    if (locations?.length) {
      setLocationList(locations);
    }
  }, [locations]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedLocation, setSelectedLocation] = useState<LocationByOrg | null>(
    null,
  );
  const [selectedOraganizationDetails, setSelectedOraganizationDetails] =
    useState<Organization | null>(null);

  useEffect(() => {
    if (organizationData) {
      setSelectedOraganizationDetails(organizationData);
    }
  }, [organizationData]);

  // Delete confirmation modal state

  const [confirmOpen, setConfirmOpen] = useState<"delete" | null>(null);
  // Confirmation modal state
  const [locationToDelete, setLocationToDelete] = useState<LocationByOrg | null>(null);

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

  const handleUpdateOraniztionSubmit = async (data: UpdateOrganizationInput) => {
    try {
      setLoading(true)

      const res = await updateOrganizationAction(data);

      debugger

      if (res?.updateOrganization?.success) {
        toast.success(res.updateOrganization.message);

        const updatedOrg = res.updateOrganization.organization;

        setSelectedOraganizationDetails(updatedOrg);
      } else {
        toast.error(res?.updateOrganization?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleLocationSubmit = async (newLocation: CreateLocationInput) => {
    try {
      setLoading(true);

      debugger
      if (selectedLocation) {

        const res = await updateLocationAction({ id: selectedLocation.id, ...newLocation });
        if (res.updateLocation.success) {
          toast.success(res.updateLocation.message);

          const refreshedList = await getLocationsByOrgAction({
            page: 1,
            limit: 10,
          });
          setLocationList(refreshedList?.locationsByOrg?.locations)

          setSelectedLocation(null)
        } else {
          toast.error(res?.updateLocation?.message || "Failed to update loaction")
        }
      } else {
        const res = await createLocationAction(newLocation);
        if (res.createLocation.success) {
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
      console.log(error);
    } finally {
      setLoading(false);
    }

  };



  const requestDeleteLocation = (location: LocationByOrg) => {
    setLocationToDelete(location);
    setConfirmOpen("delete");
  };

  const confirmDeleteLocation = async () => {
    if (!locationToDelete) return;

    try {
      setLoading(true);

      const res = await removeLocationAction({
        removeLocationId: locationToDelete.id,
      });
      debugger

      if (res?.removeLocation?.success) {
        toast.success(res.removeLocation.message);
        // ✅ Optimistic update (BEST)
        setLocationList((prev) =>
          prev.filter((loc) => loc.id !== locationToDelete.id)
        );

      } else {
        toast.error(res.removeLocation.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected  error occured")
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setLocationToDelete(null);
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
        onSave={handleUpdateOraniztionSubmit}
        selectedOraganizationDetails={selectedOraganizationDetails}
        orgId={userData?.orgId}
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


export default OrgAdminProfile;