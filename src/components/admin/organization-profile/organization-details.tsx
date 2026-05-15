import { Organization, UpdateOrganizationInput } from "@/types/organization";
import { Building2, Edit, Upload } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

interface OrganizationDetailsProps {
    readonly onSave: (data: UpdateOrganizationInput) => void; // ✅ FIX
    readonly selectedOraganizationDetails?: Organization | null;
    orgId: string;
}

const defaultForm = {
    name: "",
    domain: "",
    contactEmail: "",
    logoUrl: ""
}

const OrganizationDetails = ({
    onSave,
    orgId,
    selectedOraganizationDetails
}: OrganizationDetailsProps) => {
    const [formData, setFormData] = useState<UpdateOrganizationInput>(defaultForm);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (selectedOraganizationDetails) {
            setFormData({
                name: selectedOraganizationDetails.name,
                contactEmail: selectedOraganizationDetails.contactEmail,
                domain: selectedOraganizationDetails.domain,
                logoUrl: selectedOraganizationDetails.logoUrl
            })
        }
    }, [selectedOraganizationDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            id: orgId,   // ✅ always last
        };

        onSave(payload);
        setIsEditing(false);
    };



    const handleCancel = () => {
        setIsEditing(false);
        if (selectedOraganizationDetails) {
            setFormData({
                name: selectedOraganizationDetails.name,
                contactEmail: selectedOraganizationDetails.contactEmail,
                domain: selectedOraganizationDetails.domain,
                logoUrl: selectedOraganizationDetails.logoUrl
            })
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-900 text-base">Organization Details</h2>
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Edit className="w-4 h-4 inline mr-2" />
                    Edit
                </button>
            </div>
            <form onSubmit={handleFormSubmit}>
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
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
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
                            name="name"
                            type="text"

                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className=
                            {`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm
                                ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 text-sm">
                            Contact Email
                        </label>
                        <input
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg text-sm
    ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 text-sm">
                            Company Domain
                        </label>

                        <input
                            name="domain"
                            type="text"
                            value={formData.domain}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg text-sm
    ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Employees with @{formData.name} can book spaces
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    {
                        isEditing ? (
                            <>
                                <button disabled={loading}
                                    type="submit"
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg">
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 border rounded-lg"
                                >Cancel</button>
                            </>
                        ) : null
                    }
                </div>

            </form>
        </div>
    );
};

export default OrganizationDetails;