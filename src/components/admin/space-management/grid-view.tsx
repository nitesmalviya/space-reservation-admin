import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { Space } from "@/types/spaces-type";
import {
  Edit,
  Power,
  Trash2,
  Users,
  MapPin,
  Clock,
  UserCheck,
} from "lucide-react";
import { formatSpaceType } from "@/utils/constant";

interface GridViewProps {
  readonly spaces: Space[];
  readonly handleViewDetails: (space: Space) => void;
  readonly handleEditSpace: (space: Space) => void;
  readonly handleToggleStatus: (spaceId: string) => void;
  readonly handleDeleteSpace: (spaceId: string) => void;
}

export default function GridView({
  spaces,
  handleViewDetails,
  handleEditSpace,
  handleToggleStatus,
  handleDeleteSpace,
}: GridViewProps) {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {spaces?.map((space: Space) => (
        <div
          key={space?.id}
          className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleViewDetails(space)}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-gray-900 text-base font-medium mb-1">
                {space?.name}

              </h3>
              <p className="text-xs text-gray-500"> {formatSpaceType(space.type)}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`px-2 py-1 rounded-full text-xs ${space?.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {space?.status}
              </span>
              {space?.currentOccupancy?.isOccupied && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  Occupied
                </span>
              )}
            </div>
          </div>

          {/* Current Occupancy Info */}
          {space?.currentOccupancy?.isOccupied && (
            <div className="mb-3 p-2.5 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs font-medium text-orange-900 mb-1">
                Currently in use by:
              </p>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-xs font-medium">
                  {space?.currentOccupancy?.user
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-xs text-orange-900 font-medium">
                    {space?.currentOccupancy?.user}
                  </p>
                  <p className="text-xs text-orange-700">
                    {space?.currentOccupancy?.department}
                  </p>
                </div>
              </div>
              <p className="text-xs text-orange-800">
                {space?.currentOccupancy?.startTime} -{" "}
                {space?.currentOccupancy?.endTime}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">{space?.capacity} people</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {space?.startTime} - {space?.endTime}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-start gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>
                  {space?.location?.name},{space?.floor}, {space?.wing}
                </p>
                <p className="text-xs text-gray-500">
                  {space?.building}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-600">Utilization</p>
              <p className="text-xs text-gray-900 font-medium">
                {space?.utilization}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-orange-600 h-1.5 rounded-full"
                style={{ width: `${space?.utilization}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {space?.bookings} bookings this month
            </p>
          </div>

          <div className="mb-3 pb-3 border-b border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Key Amenities:</p>
            <div className="flex flex-wrap gap-1">
              {space?.amenities?.slice(0, 3).map((amenity) => (
                <span
                  key={amenity.id}
                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                >
                  {amenity?.name}
                </span>
              ))}
              {space?.amenities?.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                  +{space?.amenities?.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditSpace(space);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleStatus(space?.id);
              }}
              className={`px-3 py-2 border rounded-lg transition-colors ${space?.status === "Active"
                ? "border-orange-600 text-orange-600 hover:bg-orange-50"
                : "border-green-600 text-green-600 hover:bg-green-50"
                }`}
              title={space?.status === "Active" ? "Deactivate" : "Activate"}
            >
              <Power className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSpace(space?.id);
              }}
              className="px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
