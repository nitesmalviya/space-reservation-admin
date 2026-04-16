import { OrgAdminReservations } from "@/components/admin/employee-reservations";
import { getAllEmployeeReservationsAction } from "@/utils/graphql/employee/actions";

const EmployeeReservationsPage = async () => {

  const res = await getAllEmployeeReservationsAction({ filter: {} });
  const employeeReservations = res.employeeReservations.items;

  return (
    <OrgAdminReservations employeeReservations={employeeReservations} />
  )
}

export default EmployeeReservationsPage;