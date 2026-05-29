import { Users } from "@/components/super-admin/users";
import { getAllUsersAction } from "@/utils/graphql/users/actions";

const UsersPage = async () => {

    const res = await getAllUsersAction({
        searchFilter: {
            page: 1,
            limit: 10,
            search: ""
        }
    });
    const usersData = res?.users || [];

    return <Users usersData={usersData} />;
}

export default UsersPage;