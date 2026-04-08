import { AllOrganizationsData } from "@/types/organization";
import { Eye, Edit, Trash2 } from "lucide-react";

interface OrganizationTableProps {
    organizationsList: AllOrganizationsData["organizations"];
    handleView: (org: AllOrganizationsData["organizations"][0]) => void;
    handleEdit: (org: AllOrganizationsData["organizations"][0]) => void;
    openDltCnfrModel: (org: AllOrganizationsData["organizations"][0]) => void;
}

const OrganizationTable = ({
    organizationsList,
    handleView,
    handleEdit,
    openDltCnfrModel
}: OrganizationTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Organization Name
                        </th>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Primary Admin
                        </th>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Industry
                        </th>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Location
                        </th>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Employees
                        </th>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Status
                        </th>
                        <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        organizationsList?.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-5 py-3 text-center text-gray-600 text-sm">
                                    No organizations found
                                </td>
                            </tr>
                        ) : (
                            organizationsList?.map((org) => (
                                <tr key={org.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3 text-gray-900 text-sm">
                                        {org?.name || "-"}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 text-sm">
                                        {org?.primaryAdmin?.name || "-"}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 text-sm">
                                        {org?.industry || "-"}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 text-sm">
                                        {org?.location?.name || "-"}
                                    </td>
                                    <td className="px-5 py-3 text-gray-600 text-sm">
                                        {org?.employeeCount || "-"}
                                    </td>
                                    <td className="px-5 py-3 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs ${org?.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {org?.status || "-"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleView(org)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(org)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-blue-600"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => openDltCnfrModel(org)}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrganizationTable;