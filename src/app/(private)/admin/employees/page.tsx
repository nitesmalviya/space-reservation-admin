import { OrgAdminEmployees } from "@/components/admin/employees";
import { getAllUsersAction } from "@/utils/graphql/users/actions";

const AdminEmployeesPage = async () => {

  const res = await getAllUsersAction({});
  const employees = res?.users ?? [];

  return <OrgAdminEmployees employees={employees} />;
}

export default AdminEmployeesPage;