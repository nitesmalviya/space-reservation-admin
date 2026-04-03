import { CreateSpaceInput } from "@/types/spaces-type";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";

export interface SpaceFormData {
  name: string;
  type: string;
  capacity: string;
  floor: string;
  wing: string;
  building: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  generalAmenities: string[];
  meetingAmenities: string[];
  equipment: string[];
}

interface NewSpaceModalProps {
  selectedSpace?: any;
  onSave: (payload: CreateSpaceInput) => void;
  loading?: boolean;
  onClose: () => void;
  isOpen: boolean;
}

export const spaceTypes = [
  { label: "Meeting Room", value: "MEETING_ROOM" },
  { label: "Conference Room", value: "CONFERENCE_ROOM" },
  { label: "Desk", value: "DESK" },
  { label: "Cabin", value: "CABIN" },
  { label: "Auditorium", value: "AUDITORIUM" },
  { label: "Training Room", value: "TRAINING_ROOM" },
  { label: "Event Space", value: "EVENT_SPACE" },
];

export const equipmentList = [
  "Extra Chairs",
  "Projectors",
  "Portable Whiteboards",
  "Laptops",
  "Extension Boards",
  "Printing/Scanning",
];
const generalAmenitiesList = [
  "Air Conditioning",
  "Heating",
  "WiFi",
  "Drinking Water",
  "Power Backup",
  "Washrooms",
  "Pantry",
  "Coffee",
  "Lift",
  "Games",
  "Whiteboard",
];
const meetingAmenitiesList = [
  "Projector",
  "TV Screen",
  "HDMI Connector",
  "Type-C Connector",
  "Audio System",
  "Microphone",
  "Whiteboard + Markers",
  "Video Conferencing",
  "Speakerphone",
  "Webcam",
];

const emptyForm: SpaceFormData = {
  name: "",
  type: "Meeting Room",
  capacity: "",
  floor: "",
  wing: "",
  building: "",
  startTime: "09:00",
  endTime: "18:00",
  slotDuration: 30,
  generalAmenities: [],
  meetingAmenities: [],
  equipment: [],
};

const NewSpaceModal = ({
  selectedSpace,
  onSave,
  isOpen,
  onClose,
  loading: isSubmitting = false,
}: NewSpaceModalProps) => {
  const [formData, setFormData] = useState<SpaceFormData>(emptyForm);
  const [, forceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      className: "text-xs text-red-500",
    })
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const mapFormToPayload = (data: SpaceFormData): CreateSpaceInput => ({

    name: data.name,
    type: data.type,
    capacity: Number(data.capacity),
    location: {
      floor: data.floor,
      wing: data.wing,
      building: data.building,
    },
    availability: {
      startTime: data.startTime,
      endTime: data.endTime,
      slotDuration: data.slotDuration,
    },
    amenities: {
      general: data.generalAmenities,
      meeting: data.meetingAmenities,
      equipment: data.equipment,
    },

  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      const formPayload = mapFormToPayload(formData);

      if (selectedSpace) {
        formPayload.id = selectedSpace.id; // include ID for updates
      }

      onSave(formPayload);
    }
    else {
      validator.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  }

  const toggleAmenity = (
    category: "generalAmenities" | "meetingAmenities" | "equipment",
    amenity: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].includes(amenity)
        ? prev[category].filter((a) => a !== amenity)
        : [...prev[category], amenity],
    }));
  };

  const handleClose = () => {
    setFormData(emptyForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900 text-lg">
            {selectedSpace ? "Edit Space" : "Add New Space"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Details */}
          <div>
            <h3 className="text-gray-900 text-sm font-medium mb-4">
              Basic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Space Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder="e.g., Conference Room A"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Space Type *
                </label>
                <select
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  {spaceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder="Number of people"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-gray-900 text-sm font-medium mb-4">
              Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Floor *
                </label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder="e.g., 3rd Floor"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Wing *
                </label>
                <input
                  type="text"
                  value={formData.wing}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder="e.g., North Wing"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Building *
                </label>
                <input
                  type="text"
                  value={formData.building}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  placeholder="e.g., Bitcot Tower"
                  required
                />
              </div>
            </div>
          </div>

          {/* General Amenities */}
          <div>
            <h3 className="text-gray-900 text-sm font-medium mb-4">
              General Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {generalAmenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.generalAmenities.includes(amenity)}
                    onChange={() => toggleAmenity("generalAmenities", amenity)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Meeting/Conference Amenities */}
          <div>
            <h3 className="text-gray-900 text-sm font-medium mb-4">
              Meeting/Conference Amenities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {meetingAmenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.meetingAmenities.includes(amenity)}
                    onChange={() => toggleAmenity("meetingAmenities", amenity)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Equipment/Add-ons */}
          <div>
            <h3 className="text-gray-900 text-sm font-medium mb-4">
              Equipment / Add-ons
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {equipmentList.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(item)}
                    onChange={() => toggleAmenity("equipment", item)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability & Time Slots */}
          <div>
            <h3 className="text-gray-900 text-sm font-medium mb-4">
              Availability & Time Slots
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  End Time *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm">
                  Slot Duration *
                </label>
                <select
                  name="slotDuration"
                  value={formData.slotDuration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slotDuration: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Space"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default NewSpaceModal;