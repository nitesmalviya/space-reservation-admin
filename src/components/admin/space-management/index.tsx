"use client";
import { useState } from "react";
import { Plus, Grid3x3, List, Search, Filter } from "lucide-react";
import SpaceDetail from "./space-detail";
import GridView from "./grid-view";
import ListView from "./list-view";
import NewSpaceModal from "../../space-modal";
import SearchBox from "@/components/SearchBox";
import { ConfirmationModal } from "@/components/ConfirmationModal";

const spaces: Space[] = [
  {
    id: "1",
    name: "Conference Room A",
    type: "Conference Room",
    capacity: 20,
    location: {
      floor: "2nd Floor",
      wing: "South Wing",
      building: "Bitcot Tower",
    },
    amenities: {
      general: ["Air Conditioning", "WiFi", "Drinking Water", "Power Backup"],
      meeting: [
        "Projector",
        "Whiteboard",
        "Video Conferencing",
        "Audio System",
        "Microphone",
      ],
      equipment: ["Extra Chairs", "Extension Boards"],
    },
    availability: {
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      slotDuration: 30,
      schedule: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
    },
    status: "Active",
    bookings: 45,
    utilization: 85,
    currentOccupancy: {
      isOccupied: true,
      user: "John Doe",
      department: "HR",
      startTime: "02:00 PM",
      endTime: "04:00 PM",
      purpose: "Team Meeting",
    },
  },
  {
    id: "2",
    name: "Meeting Room B",
    type: "Meeting Room",
    capacity: 10,
    location: {
      floor: "3rd Floor",
      wing: "North Wing",
      building: "Bitcot Tower",
    },
    amenities: {
      general: ["Air Conditioning", "WiFi", "Whiteboard"],
      meeting: ["TV Screen", "HDMI Connector", "Whiteboard"],
      equipment: ["Portable Whiteboard"],
    },
    availability: {
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      slotDuration: 30,
      schedule: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
    },
    status: "Active",
    bookings: 32,
    utilization: 68,
    currentOccupancy: {
      isOccupied: false,
    },
  },
  {
    id: "3",
    name: "Auditorium",
    type: "Auditorium",
    capacity: 50,
    location: {
      floor: "1st Floor",
      wing: "Central",
      building: "Bitcot Tower",
    },
    amenities: {
      general: [
        "Air Conditioning",
        "WiFi",
        "Drinking Water",
        "Washrooms",
        "Lift",
      ],
      meeting: [
        "Projector",
        "Audio System",
        "Microphone",
        "Speakerphone",
        "Video Conferencing",
      ],
      equipment: ["Extra Chairs", "Extension Boards", "Laptop"],
    },
    availability: {
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      slotDuration: 60,
      schedule: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: true,
        Sun: false,
      },
    },
    status: "Active",
    bookings: 28,
    utilization: 72,
    currentOccupancy: {
      isOccupied: true,
      user: "Sarah Williams",
      department: "Engineering",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      purpose: "Product Launch Event",
    },
  },
  {
    id: "4",
    name: "Training Room",
    type: "Training Room",
    capacity: 30,
    location: {
      floor: "2nd Floor",
      wing: "East Wing",
      building: "Bitcot Tower",
    },
    amenities: {
      general: ["Air Conditioning", "WiFi", "Drinking Water", "Whiteboard"],
      meeting: ["Projector", "Whiteboard", "Audio System", "HDMI Connector"],
      equipment: ["Extra Chairs", "Portable Whiteboard", "Extension Boards"],
    },
    availability: {
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      slotDuration: 60,
      schedule: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
    },
    status: "Active",
    bookings: 18,
    utilization: 45,
    currentOccupancy: {
      isOccupied: false,
    },
  },
  {
    id: "5",
    name: "Small Meeting Room C",
    type: "Meeting Room",
    capacity: 6,
    location: {
      floor: "3rd Floor",
      wing: "South Wing",
      building: "Bitcot Tower",
    },
    amenities: {
      general: ["Air Conditioning", "WiFi"],
      meeting: ["TV Screen", "Whiteboard"],
      equipment: [],
    },
    availability: {
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      slotDuration: 30,
      schedule: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
    },
    status: "Inactive",
    bookings: 0,
    utilization: 0,
    currentOccupancy: {
      isOccupied: false,
    },
  },
];

export const spaceTypes = [
  "Meeting Room",
  "Conference Room",
  "Desk",
  "Cabin",
  "Auditorium",
  "Training Room",
  "Event Space",
];

export const equipmentList = [
  "Extra Chairs",
  "Projectors",
  "Portable Whiteboards",
  "Laptops",
  "Extension Boards",
  "Printing/Scanning",
];

export interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: {
    floor: string;
    wing: string;
    building: string;
  };
  amenities: {
    general: string[];
    meeting: string[];
    equipment: string[];
  };
  availability: {
    startTime: string;
    endTime: string;
    slotDuration: number;
    schedule: { [key: string]: boolean };
  };
  status: "Active" | "Inactive";
  bookings: number;
  utilization: number;
  currentOccupancy?: {
    isOccupied: boolean;
    user?: string;
    department?: string;
    startTime?: string;
    endTime?: string;
    purpose?: string;
  };
}

export function OrgAdminSpaces() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showDetailView, setShowDetailView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    floor: "all",
    capacity: "all",
    occupancy: "all",
  });
  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "toggle" | null
  >(null);
  const [spaceToAct, setSpaceToAct] = useState<Space | null>(null);

  // Filter and search logic
  const filteredSpaces = spaces.filter((space) => {
    const matchesSearch =
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.floor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.type === "all" || space.type === filters.type;
    const matchesStatus =
      filters.status === "all" || space.status === filters.status;
    const matchesFloor =
      filters.floor === "all" || space.location.floor === filters.floor;
    const matchesCapacity =
      filters.capacity === "all" ||
      (filters.capacity === "small" && space.capacity <= 10) ||
      (filters.capacity === "medium" &&
        space.capacity > 10 &&
        space.capacity <= 30) ||
      (filters.capacity === "large" && space.capacity > 30);
    const matchesOccupancy =
      filters.occupancy === "all" ||
      (filters.occupancy === "occupied" &&
        space.currentOccupancy?.isOccupied) ||
      (filters.occupancy === "available" &&
        !space.currentOccupancy?.isOccupied);

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      matchesFloor &&
      matchesCapacity &&
      matchesOccupancy
    );
  });

  const uniqueFloors = Array.from(new Set(spaces.map((s) => s.location.floor)));
  const occupiedCount = spaces.filter(
    (s) => s.currentOccupancy?.isOccupied,
  ).length;

  const handleAddSpace = (data: any) => {
    setShowAddForm(false);
  };

  const handleEditSpace = (space: Space) => {
    setSelectedSpace(space);
    setShowEditForm(true);
  };

  const handleDeleteSpace = (id: string) => {
    const space = spaces.find((s) => s.id === id) ?? null;
    setSpaceToAct(space);
    setConfirmAction("delete");
  };

  const handleToggleStatus = (id: string) => {
    const space = spaces.find((s) => s.id === id) ?? null;
    setSpaceToAct(space);
    setConfirmAction("toggle");
  };

  const handleConfirmAction = () => {
    if (!spaceToAct) return;
    if (confirmAction === "delete") {
      // TODO: call delete API
    } else if (confirmAction === "toggle") {
      // TODO: call status toggle API
    }
    setConfirmAction(null);
    setSpaceToAct(null);
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
      capacity: "all",
      occupancy: "all",
    });
    setSearchTerm("");
  };

  // Detail View
  if (showDetailView && selectedSpace) {
    return (
      <SpaceDetail
        selectedSpace={selectedSpace}
        handleEditSpace={handleEditSpace}
        handleToggleStatus={handleToggleStatus}
        setSelectedSpace={setSelectedSpace}
        setShowDetailView={setShowDetailView}
      />
    );
  }

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
          onClick={() => setShowAddForm(true)}
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
          <p className="text-gray-900 text-xl">{spaces.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Active Spaces</p>
          <p className="text-gray-900 text-xl">
            {spaces.filter((s) => s.status === "Active").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Currently Occupied</p>
          <p className="text-gray-900 text-xl">{occupiedCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Avg. Utilization</p>
          <p className="text-gray-900 text-xl">68%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Total Bookings</p>
          <p className="text-gray-900 text-xl">
            {spaces.reduce((acc, s) => acc + s.bookings, 0)}
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
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${
              showFilters
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
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
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

            <div>
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
            </div>

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
        filters.capacity !== "all" ||
        filters.occupancy !== "all") && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredSpaces.length} of {spaces.length} spaces
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
      {(showAddForm || showEditForm) && (
        <NewSpaceModal
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          handleAddSpace={handleAddSpace}
          selectedSpace={selectedSpace}
        />
      )}

      {/* Delete / Status Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmAction !== null}
        onClose={() => {
          setConfirmAction(null);
          setSpaceToAct(null);
        }}
        onConfirm={handleConfirmAction}
        title={
          confirmAction === "delete"
            ? "Delete Space"
            : spaceToAct?.status === "Active"
              ? "Deactivate Space"
              : "Activate Space"
        }
        description={
          confirmAction === "delete"
            ? `Are you sure you want to delete "${spaceToAct?.name}"? This action cannot be undone.`
            : spaceToAct?.status === "Active"
              ? `Are you sure you want to deactivate "${spaceToAct?.name}"? It will no longer be bookable.`
              : `Are you sure you want to activate "${spaceToAct?.name}"? It will become available for bookings.`
        }
        confirmLabel={
          confirmAction === "delete"
            ? "Delete"
            : spaceToAct?.status === "Active"
              ? "Deactivate"
              : "Activate"
        }
        cancelLabel="Cancel"
        variant={confirmAction === "delete" ? "danger" : "info"}
      />
    </div>
  );
}
