import { OrgAdminEmployees } from "@/components/admin/employees";
import { getAllUsersAction } from "@/utils/graphql/users/actions";

const AdminEmployeesPage = async () => {
  const res = await getAllUsersAction({});
  return <OrgAdminEmployees employees={res.users} />;
}

export default AdminEmployeesPage;