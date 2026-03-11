import { Location, OrgAdminProfile } from "@/components/admin/organization-profile";
  const locations: Location[] = [
    {
      id: "1",
      name: "Headquarters",
      type: "Main Office",
      address: "Bitcot Tower, Sector 15",
      city: "Indore",
      state: "Madhya Pradesh",
      pincode: "452001",
      phone: "+91 731 1234567",
    },
    {
      id: "2",
      name: "Bitcot West",
      type: "Branch Office",
      address: "Sector 10, Hinjewadi",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411057",
      phone: "+91 20 12345678",
    },
    {
      id: "3",
      name: "Bitcot South",
      type: "Branch Office",
      address: "Sector 5, Electronic City",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560100",
      phone: "+91 80 12345678",
    },
  ];
export default function AdminOrganizationProfilePage() {
  return <OrgAdminProfile locations={locations} />;
}