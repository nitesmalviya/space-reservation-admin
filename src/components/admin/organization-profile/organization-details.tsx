import { Building2, Edit, Upload } from "lucide-react";

interface OrganizationDetailsProps {
    orgName: string;
    orgEmail: string;
    orgDomain: string;
}

const OrganizationDetails = ({ orgName, orgEmail, orgDomain }: OrganizationDetailsProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-900 text-base">Organization Details</h2>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Logo Upload */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2 text-sm">
                        Organization Logo
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            <Building2 className="w-10 h-10 text-gray-400" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <Upload className="w-4 h-4" />
                            Upload Logo
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2 text-sm">
                        Organization Name
                    </label>
                    <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2 text-sm">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2 text-sm">
                        Company Domain
                    </label>
                    <input
                        type="text"
                        value={orgDomain}
                        onChange={(e) => setOrgDomain(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Employees with @{orgDomain} can book spaces
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationDetails;