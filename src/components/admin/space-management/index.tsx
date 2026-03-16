"use client";
import { useMemo, useState } from "react";
import { Plus, Grid3x3, List, Filter, CloudCog } from "lucide-react";
import SpaceDetail from "./space-detail";
import GridView from "./grid-view";
import ListView from "./list-view";
import SearchBox from "@/components/SearchBox";
import { ConfirmationModal } from "@/components/ConfirmationModal";

import NewSpaceModal from "./space-modal";
import type { CreateSpaceInput, Space } from "@/types/spaces-type";
import { createSpaceAction, getAllSpaceAction, removeSpaceAction } from "@/utils/graphql/spaces/actions";
import { toast } from "sonner";


interface SpaceStats {
  totalSpaces: number;
  activeSpaces: number;
  currentlyOccupied: number;
  avgUtilization: number;
  totalBookings: number;
}

interface SpaceManagementComponentProps {
  spaceStatsData: SpaceStats;
  allSpaceData: Space[];
}



export const spaceTypes = [
  "Meeting Room",
  "Conference Room",
  "Desk",
  "Cabin",
  "Auditorium",
  "Training Room",
  "Event Space",
];

export function OrgAdminSpaces({
  spaceStatsData,
  allSpaceData,
}: SpaceManagementComponentProps) {
  const [spacesList, setSpaceList] = useState<Space[]>(allSpaceData);

  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDetailView, setShowDetailView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    floor: "all",
    capacity: "all",
  });

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "toggle" | null
  >(null);


  // Filter and search logic
  const filteredSpaces = useMemo(() => {
    return spacesList
      .filter(Boolean)
      .filter((space) => {
        const name = space.name?.toLowerCase() || "";
        const type = space.type?.toLowerCase() || "";
        const location = space.location?.name?.toLowerCase() || "";

        const search = searchTerm.toLowerCase();

        return (
          name.includes(search) ||
          type.includes(search) ||
          location.includes(search)
        );
      });
  }, [spacesList, searchTerm, filters]);

  const uniqueFloors = useMemo(() => {
    return Array.from(new Set(spacesList.map((s) => s.location.name)));
  }, [spacesList]);

  const handleEditSpace = (space: Space) => {
    setSelectedSpace(space);
    setIsModalOpen(true); // open modal
  };

  const handleDeleteSpace = (id: string) => {
    setDeleteId(id);
    setConfirmAction("delete");
  };

  const handleToggleStatus = (id: string) => {
    setSpaceList(prev => prev.map(space => space.id === id ? { ...space, status: space.status === "Active" ? "Inactive" : "Active" } : space))
    setConfirmAction("toggle");
  };

  const handleConfirmAction = async () => {
    debugger;
    if (confirmAction === "delete" && deleteId) {
      try {
        setLoading(true);
        const res = await removeSpaceAction({ id: deleteId });
        console.log(res, "res of id");
        if (res?.removeSpace?.success) {
          toast.success(res.removeSpace.message);
          const refreshedList = await getAllSpaceAction({

          });

          setSpaceList(refreshedList.spaces.items);
        } else {
          toast.error(res?.removeSpace?.message || "Failed to delete space");
        }
      } catch (error: any) {
        toast.error(error?.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
        setConfirmAction(null);
        setDeleteId(null);
      }
    }
  };

  const handleViewDetails = (space: Space) => {
    setSelectedSpace(space);
    setShowDetailView(true);
  };

  const resetFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      floor: "all",
      capacity: "all"
    });
    setSearchTerm("");
  };

  // Detail View
  // if (showDetailView && selectedSpace) {
  //   return (
  //     <SpaceDetail
  //       selectedSpace={selectedSpace}
  //       handleEditSpace={handleEditSpace}
  //       handleToggleStatus={handleToggleStatus}
  //       setSelectedSpace={setSelectedSpace}
  //       setShowDetailView={setShowDetailView}
  //     />
  //   );
  // }

  // Add space
  const handleAddCSpace = async (newSpace: CreateSpaceInput) => {
    try {
      setLoading(true);

      const res = await createSpaceAction(newSpace);
      debugger
      if (res?.createSpace?.success) {
        toast.success(res.createSpace.message);
        setIsModalOpen(false);
        const refreshedList = await getAllSpaceAction({
          page: 1,
          limit: 10,
        });
        setSpaceList(refreshedList.spaces.items);
      } else {
        toast.error(res?.createSpace?.message || "Failed to create space");
      }

    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-gray-900 mb-1">Space Management</h1>
          <p className="text-gray-600 text-sm">
            Manage your organization's workspaces and facilities
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Space
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Total Spaces</p>
          <p className="text-gray-900 text-xl">{spaceStatsData.totalSpaces}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Active Spaces</p>
          <p className="text-gray-900 text-xl">
            {spaceStatsData.activeSpaces}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Currently Occupied</p>
          <p className="text-gray-900 text-xl">{spaceStatsData.currentlyOccupied}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Avg. Utilization</p>
          <p className="text-gray-900 text-xl">{spaceStatsData.avgUtilization}%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Total Bookings</p>
          <p className="text-gray-900 text-xl">
            {spaceStatsData.totalBookings}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 relative">
            <div className="p-3  border-gray-200">
              <SearchBox
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search workspaces..."
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${showFilters
              ? "border-orange-600 text-orange-600 bg-orange-50"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${viewMode === "grid"
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-100"
                }`}
              title="Grid View"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${viewMode === "list"
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-100"
                }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-gray-700 mb-2 text-xs">
                Space Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="all">All Types</option>
                {spaceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xs">Status</label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* <div>
              <label className="block text-gray-700 mb-2 text-xs">
                Occupancy
              </label>
              <select
                value={filters.occupancy}
                onChange={(e) =>
                  setFilters({ ...filters, occupancy: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="all">All Spaces</option>
                <option value="occupied">Occupied</option>
                <option value="available">Available</option>
              </select>
            </div> */}

            <div>
              <label className="block text-gray-700 mb-2 text-xs">Floor</label>
              <select
                value={filters.floor}
                onChange={(e) =>
                  setFilters({ ...filters, floor: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="all">All Floors</option>
                {uniqueFloors.map((floor) => (
                  <option key={floor} value={floor}>
                    {floor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xs">
                Capacity
              </label>
              <select
                value={filters.capacity}
                onChange={(e) =>
                  setFilters({ ...filters, capacity: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value="all">All Capacities</option>
                <option value="small">Small (1-10)</option>
                <option value="medium">Medium (11-30)</option>
                <option value="large">Large (30+)</option>
              </select>
            </div>

            <div className="md:col-span-5 flex justify-end">
              <button
                onClick={resetFilters}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      {(searchTerm ||
        filters.type !== "all" ||
        filters.status !== "all" ||
        filters.floor !== "all" ||
        filters.capacity !== "all") && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredSpaces.length} of {spacesList.length} spaces
            </p>
          </div>
        )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <GridView
          spaces={filteredSpaces}
          handleDeleteSpace={handleDeleteSpace}
          handleEditSpace={handleEditSpace}
          handleToggleStatus={handleToggleStatus}
          handleViewDetails={handleViewDetails}
        />
      )}

      {/* List View */}
      {viewMode === "list" && (
        <ListView
          spaces={filteredSpaces}
          handleViewDetails={handleViewDetails}
          handleEditSpace={handleEditSpace}
          handleToggleStatus={handleToggleStatus}
          handleDeleteSpace={handleDeleteSpace}
        />
      )}

      {/* No Results */}
      {filteredSpaces.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-2">No spaces found</p>
          <p className="text-sm text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}

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


      {/* Delete / Status Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmAction !== null}
        onClose={() => {
          setConfirmAction(null);
          setDeleteId(null);
        }}
        onConfirm={handleConfirmAction}
        title="Delete Space"
        description="Are you sure you want to delete this space? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
}


export { Space };

