import { Edit, Power, Trash2 } from "lucide-react";
import { Space } from ".";

interface ListViewProps {
  readonly handleViewDetails: (space: Space) => void;
  readonly spaces: Space[];
  readonly handleEditSpace: (space: Space) => void;
  readonly handleToggleStatus: (id: string) => void;
  readonly handleDeleteSpace: (id: string) => void;
}

export default function ListView({
  spaces,
  handleViewDetails,
  handleEditSpace,
  handleToggleStatus,
  handleDeleteSpace,
}: ListViewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                Space Name
              </th>
              <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                Type
              </th>
              <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                Location
              </th>
              <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                Capacity
              </th>
              <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                Utilization
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
            {spaces.map((space) => (
              <tr
                key={space.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewDetails(space)}
              >
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-900 font-medium">
                    {space.name}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {space.type}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-900">
                    {space.location.name}
                  </p>
                  <p className="text-xs text-gray-500">{space.location.address ?? "-"}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-900">
                    {space.capacity} people
                  </p>
                </td>
                <td className="px-5 py-4">
                  {space.utilization}%
                  {/* {space.currentOccupancy?.isOccupied ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {space.currentOccupancy.user
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900 font-medium">
                            {space.currentOccupancy.user}
                          </p>
                          <p className="text-xs text-gray-500">
                            {space.currentOccupancy.department}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {space.currentOccupancy.startTime} -{" "}
                        {space.currentOccupancy.endTime}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Available</span>
                  )} */}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      space.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {space.status}
                  </span>
                </td>
                <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditSpace(space);
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(space.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        space.status === "Active"
                          ? "text-red-600 hover:bg-red-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                      title={
                        space.status === "Active" ? "Deactivate" : "Activate"
                      }
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSpace(space.id);
                      }}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
