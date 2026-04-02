"use client";
import { useMemo, useState } from "react";
import { Plus, Edit, Search, MapPin, Users } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import NewSpaceModal from "@/components/space-modal";
import { Space } from "@/types/spaces-type";
import Page from "@/app/(private)/admin/booking-rules/page";
import PageHeading from "@/components/ui/page-heading";

interface SpaceDataProps {
  spaceData: Space[];
}

export function Spaces({ spaceData }: SpaceDataProps) {
  const [spaceDataList, setSpaceDataList] = useState<Space[]>(spaceData);
  console.log("space Data", spaceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  const filteredSpaces = useMemo(() => {
    return spaceDataList.filter(
      (space) =>
        space.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.building?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.location?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [spaceDataList, searchTerm]);


  const handleOpenAdd = () => {
    setSelectedSpace(null);
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const handleOpenEdit = (space: Space) => {
    setSelectedSpace(space);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleSubmitSpace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up API call here
    setShowAddForm(false);
    setShowEditForm(false);
  };

  return (
    <div className="p-5">

      <PageHeading title="Space Management" description="Manage workspace rooms and facilities" action={
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Space
        </button>
      } />

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search workspaces..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
          {filteredSpaces.map((space) => (
            <div
              key={space.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-gray-900 text-base">{space.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${space.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {space.status}
                </span>
              </div>

              <p className="text-gray-600 mb-3 text-sm">{space.building}</p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    Capacity: {space.capacity} people
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{space.location?.name}</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-1.5">
                  {space.amenities?.map((amenity) => (
                    <span
                      key={amenity.id}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {amenity.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenEdit(space)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Space Modal */}
      {(showAddForm || showEditForm) && (
        <NewSpaceModal
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          handleAddSpace={handleSubmitSpace}
          selectedSpace={
            selectedSpace
              ? {
                name: selectedSpace.name,
                type: undefined,
                capacity: selectedSpace.capacity,
                location: { floor: selectedSpace.location },
                availability: undefined,
                amenities: { general: selectedSpace.amenities },
              }
              : null
          }
        />
      )}
    </div>
  );
}
