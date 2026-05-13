import OrgAdminReservations from "@/components/admin/employee-reservations";
import { getEmployeeReservationsAction } from "@/utils/graphql/employee-reservations/action";

const EmployeeReservationsPage = async () => {

  const employeeReservationsRes = await getEmployeeReservationsAction({
    page: 1,
    limit: 10,
  });
  const employeeReservations = employeeReservationsRes.employeeReservations.items;

  return <OrgAdminReservations employeeReservations={employeeReservations} />
}

export default EmployeeReservationsPage;