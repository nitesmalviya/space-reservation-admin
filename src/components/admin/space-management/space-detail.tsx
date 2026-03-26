import {
  Plus,
  Edit,
  Power,
  Trash2,
  Users,
  MapPin,
  X,
  Clock,
  ArrowLeft,
  Grid3x3,
  List,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  UserCheck,
} from "lucide-react";
import type { Amenity, Space } from "@/types/spaces-type";
import { formatSpaceType } from "@/utils/constant";

interface SpaceDetailProps {
  setShowDetailView: (show: boolean) => void;
  handleEditSpace: (space: Space) => void;
  handleToggleStatus: (spaceId: string) => void;
  selectedSpace: Space;
  setSelectedSpace: React.Dispatch<React.SetStateAction<Space | null>>;
}

export default function SpaceDetail({
  selectedSpace,
  setShowDetailView,
  setSelectedSpace,
  handleEditSpace,
  handleToggleStatus,
}: SpaceDetailProps) {

  const amenities: Amenity[] = selectedSpace?.amenities || [];

  const generalAmenities = amenities.filter(
    (a) => a.category === "GENERAL"
  );

  const meetingAmenities = amenities.filter(
    (a) => a.category === "MEETING"
  );

  const equipmentAmenities = amenities.filter(
    (a) => a.category === "EQUIPMENT"
  );

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setShowDetailView(false);
          setSelectedSpace(null);
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Spaces
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-gray-900 text-2xl mb-2">
                  {selectedSpace.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {formatSpaceType(selectedSpace.type)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${selectedSpace.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {selectedSpace.status}
                  </span>

                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    Occupied
                  </span>


                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditSpace(selectedSpace)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(selectedSpace.id)}
                  className={`px-4 py-2 border rounded-lg transition-colors text-sm ${selectedSpace.status === "Active"
                    ? "border-orange-600 text-orange-600 hover:bg-orange-50"
                    : "border-green-600 text-green-600 hover:bg-green-50"
                    }`}
                >
                  <Power className="w-4 h-4 inline mr-2" />
                  {selectedSpace.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
                </button>
              </div>
            </div>

            {/* Current Occupancy Alert */}
            {/* {selectedSpace.currentOccupancy?.isOccupied && (
              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <UserCheck className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-900 mb-1">
                      Currently Occupied
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm text-orange-800">
                      <div>
                        <span className="text-orange-600">User:</span>{" "}
                        {selectedSpace.currentOccupancy.user}
                      </div>
                      <div>
                        <span className="text-orange-600">Department:</span>{" "}
                        {selectedSpace.currentOccupancy.department}
                      </div>
                      <div>
                        <span className="text-orange-600">Time:</span>{" "}
                        {selectedSpace.currentOccupancy.startTime} -{" "}
                        {selectedSpace.currentOccupancy.endTime}
                      </div>
                      <div>
                        <span className="text-orange-600">Purpose:</span>{" "}
                        {selectedSpace.currentOccupancy.purpose}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Capacity</p>
                <p className="text-gray-900 font-medium">
                  {selectedSpace.capacity} people
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Bookings</p>
                <p className="text-gray-900 font-medium">
                  {selectedSpace.bookings} this month
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Utilization</p>
                <p className="text-gray-900 font-medium">
                  {selectedSpace.utilization}%
                </p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 text-base font-medium mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              Location Details
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Floor</p>
                <p className="text-gray-900">{selectedSpace?.floor || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Wing</p>
                <p className="text-gray-900">{selectedSpace?.wing || "N/A"} </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Building</p>
                <p className="text-gray-900">
                  {selectedSpace?.building || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 text-base font-medium mb-4">
              Amenities & Equipment
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  General Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {generalAmenities.slice(0, 3).map((amenity: any) => (
                    <span
                      key={amenity.id}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Meeting/Conference Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {meetingAmenities.map((amenity) => (
                    <span
                      key={amenity.id}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>


              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Equipment / Add-ons
                </p>
                <div className="flex flex-wrap gap-2">
                  {equipmentAmenities.map((amenity) => (
                    <span
                      key={amenity.id}
                      className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-sm flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-gray-900 text-base font-medium mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Availability
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Operating Hours</p>
                <p className="text-gray-900 font-medium">
                  {selectedSpace.startTime} -{" "}
                  {selectedSpace.endTime}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Slot Duration</p>
                <p className="text-gray-900 font-medium">
                  {selectedSpace.slotDuration} minutes
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-gray-900 text-base font-medium mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              Weekly Schedule
            </h2>
            <div className="space-y-2">

              <div

                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm text-gray-700">Monday</span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs" >
                  Available
                </span>
              </div>

            </div>
          </div>

          {/* Utilization */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-gray-900 text-base font-medium mb-4">
              Utilization Rate
            </h2>
            <div className="text-center mb-3">
              <div className="text-4xl font-semibold text-gray-900 mb-1">
                {selectedSpace.utilization}%
              </div>
              <p className="text-xs text-gray-500">Current Month</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${selectedSpace.utilization}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
