import { Edit, Eye, Trash2 } from "lucide-react";

interface OrganizationProps {
    organization: any;
    handleView: (org: any) => void;
    handleEdit: (org: any) => void;
    openDltCnfrModel: (org: any) => void;
}

const TableRow = ({ organization, handleView, handleEdit, openDltCnfrModel }: OrganizationProps) => {
    return (
        <tr key={organization.id} className="hover:bg-gray-50">
            <td className="px-5 py-3 text-gray-900 text-sm">
                {organization.name}
            </td>
            <td className="px-5 py-3 text-gray-600 text-sm">
                {organization.primaryAdmin.name}
            </td>
            <td className="px-5 py-3 text-gray-600 text-sm">
                {organization.industry}
            </td>
            <td className="px-5 py-3 text-gray-600 text-sm">
                {organization.location.name}
            </td>
            <td className="px-5 py-3 text-gray-600 text-sm">
                {organization.employeeCount}
            </td>
            <td className="px-5 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {organization.status}
                </span>
            </td>
            <td className="px-5 py-3">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleView(organization)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleEdit(organization)}
                        className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => openDltCnfrModel(organization)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow;