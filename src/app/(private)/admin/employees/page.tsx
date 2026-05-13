import { Employee, OrgAdminEmployees } from "@/components/admin/employees";
import { getAllUsersAction } from "@/utils/graphql/users/actions";

const AdminEmployeesPage = async () => {
  const employeesRes = await getAllUsersAction({
    page: 1,
    limit: 10,
    search: "",
  });

  const employeesData = employeesRes?.users ?? [];

  return <OrgAdminEmployees employeesData={employeesData} />;
}

export default AdminEmployeesPage;