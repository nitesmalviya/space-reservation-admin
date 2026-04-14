"use client";

import { useEffect, useState } from "react";
import OrgAdminProfile from "@/components/admin/organization-profile";
import { useAppSelector } from "@/store/hooks";
import { getLocationsByOrgAction } from "@/utils/graphql/location/actions";
import { getOrganizationAction } from "@/utils/graphql/organization/action";
import { LocationByOrg } from "@/types/location-type";
import { Organization } from "@/types/organization";

const AdminOrganizationProfilePage = () => {
  const userData = useAppSelector((state) => state.auth.user);
  const orgId = userData?.orgId;

  const [locations, setLocations] = useState<LocationByOrg[]>([]);
  const [organizationData, setOrganizationData] = useState<Organization | null>(null);

  useEffect(() => {
    if (!orgId) return; // ✅ important guard

    const fetchData = async () => {
      try {

        // Fetch locations
        const res = await getLocationsByOrgAction({
          page: 1,
          limit: 10,
        });
        setLocations(res?.locationsByOrg?.locations ?? []);

        // Fetch organization
        const organizationRes = await getOrganizationAction({
          organizationId: orgId,
        });

        const orgData = organizationRes?.organization?.organization;

        setOrganizationData({
          id: orgId,
          ...orgData,
        }
        );

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [orgId]);



  return (
    <OrgAdminProfile
      locations={locations}
      organizationData={organizationData}
    />
  );
};

export default AdminOrganizationProfilePage;