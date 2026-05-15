import { LocationByOrgType } from "@/types/location";
import { Edit, MapPin, Phone, Plus, Trash2 } from "lucide-react";

interface locationListProps {
    locationList: LocationByOrgType[];
    openCreateModal: () => void;
    openEditModal: (location: LocationByOrgType) => void;
    requestDeleteLocation: (location: LocationByOrgType) => void;
}

const LocationList = ({
    locationList,
    openCreateModal,
    openEditModal,
    requestDeleteLocation }: locationListProps) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-gray-900 text-base">Office Locations</h2>
                    <p className="text-xs text-gray-500 mt-1">
                        {locationList.length} locations registered
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Location
                </button>
            </div>

            <div className="space-y-3">
                {locationList.map((location: LocationByOrgType) => (
                    <div
                        key={location.id}
                        className="border border-gray-200 rounded-lg p-3.5 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 text-sm font-medium">
                                        {location.name ?? "-"}
                                    </h3>
                                    <p className="text-xs text-gray-500">{location.type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openEditModal(location)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit Location"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => requestDeleteLocation(location)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Location"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Address</p>
                                <p className="text-sm text-gray-900">{location.address}</p>
                                 
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Contact</p>
                                <div className="flex items-center gap-2 text-sm text-gray-900">
                                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                                    {location.contactNumber ?? "-"}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {locationList.length === 0 && (
                    <div className="text-center py-10">
                        <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No locations added yet.</p>
                        <p className="text-xs text-gray-400">
                            Click &quot;Add Location&quot; to register your first office.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LocationList;