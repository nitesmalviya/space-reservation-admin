import { RecentOrganization } from "@/types/dashboard/super-admin";

interface RecentOrganizationsProps {
    recentOrganizations: RecentOrganization[];
}

const RecentOrganizations = ({ recentOrganizations }: RecentOrganizationsProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Recent Organizations</h2>
            <div className="space-y-4">
                {
                    recentOrganizations?.length > 0 ?
                        recentOrganizations?.map((org) => (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" >
                                <div>
                                    <p className="text-gray-900">{org.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {org.employees} employees • {org.industry}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${org.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {org.status}
                                </span>
                            </div>
                        ))
                        :
                        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-md">
                            <p className="text-gray-500">No recent organizations</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default RecentOrganizations;