"use client";
import { useMemo, useState } from "react";
import { Plus, Edit, MapPin, Users } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import NewSpaceModal from "../../space-modal";
import { CreateSpaceInput, Space } from "@/types/spaces-type";
import PageHeading from "@/components/ui/page-heading";
import { create } from "domain";
import { createSpaceAction, getAllSpaceAction, updateSpaceAction } from "@/utils/graphql/spaces/actions";
import { toast } from "sonner";

interface SpaceDataProps {
  spaceData: Space[];
}

export function Spaces({ spaceData }: SpaceDataProps) {
  const [spaceDataList, setSpaceDataList] = useState<Space[]>(spaceData);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  const filteredSpaces = useMemo(() => {
    return spaceDataList.filter(
      (space: Space) =>
        space.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.building?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.location?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [spaceDataList, searchTerm]);


  const handleOpenAdd = () => {
    setSelectedSpace(null);
    setIsModalOpen(true);
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const handleEditSpace = (space: Space) => {
    setSelectedSpace(space);
    setIsModalOpen(true); // open modal
  };

  const handleAddCSpace = async (newSpace: CreateSpaceInput) => {
    try {
      setLoading(true);

      if (selectedSpace) {
        const res = await updateSpaceAction({ id: selectedSpace.id, ...newSpace });
        if (res?.updateSpace?.success) {
          toast.success(res.updateSpace.message);
        } else {
          toast.error(res?.updateSpace?.message || "Failed to update space");
        }
      } else {
        const res = await createSpaceAction(newSpace);
        if (res?.createSpace?.success) {
          toast.success(res.createSpace.message);
        } else {
          toast.error(res?.createSpace?.message || "Failed to create space");
        }
      }
      setIsModalOpen(false);
      const refreshedList = await getAllSpaceAction({
        page: 1,
        limit: 10,
      });
      setSpaceDataList(refreshedList.spaces.items);
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
                onClick={() => handleEditSpace(space)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Space Modal */}
      <NewSpaceModal
        selectedSpace={selectedSpace}
        onSave={handleAddCSpace}
        loading={loading}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSpace(null);
        }}
      />
    </div>
  );
}
