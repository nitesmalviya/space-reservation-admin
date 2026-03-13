import { X } from "lucide-react";
import { spaceTypes, CreateSpaceInput } from "../../../types/spaces-type";
import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";

export interface SpaceFormData {
  amenityIds: string[] | undefined;
  amenities: any;
  description: string | undefined;
  locationName: string;
  name: string;
  type: string;
  capacity: string;
  floor: string;
  wing: string;
  building: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

interface NewSpaceModalProps {
  selectedSpace?: any;
  onSave: (payload: CreateSpaceInput) => void;
  loading?: boolean;
  onClose: () => void;
  isOpen: boolean;
}

const generalAmenities = [
  "Air Conditioning",
  "Heating",
  "WiFi",
  "Drinking Water",
  "Power Backup",
  "Washrooms",
];

const meetingAmenities = [
  "Projector",
  "TV Screen",
  "HDMI Connector",
  "Type-C Connector",
];

const equipmentAmenities = [
  "Projectors",
  "Extra Chairs",
  "Portable Whiteboards",
  "Laptops",
];

const emptyForm: SpaceFormData = {
  name: "",
  type: "",
  capacity: "",
  floor: "",
  wing: "",
  building: "",
  startTime: "",
  endTime: "",
  slotDuration: 30,
  locationName: "",
  amenityIds: [],
  amenities: [],
  description: ""
};

const NewSpaceModal = ({
  selectedSpace,
  isOpen,
  onClose,
  onSave,
  loading: isSubmitting = false,
}: NewSpaceModalProps) => {

  const [formData, setFormData] = useState<SpaceFormData>(emptyForm);
  const [, forceUpdate] = useState(0);



  const validator = useRef(
    new SimpleReactValidator({
      className: "text-[13px] font-semibold text-[#F4364C] mt-1",
    })
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;


  // Payload mapper
  const mapFormToPayload = (data: SpaceFormData): CreateSpaceInput => ({
    name: data.name,
    type: data.type,
    locationName: data.locationName,
    orgId: "cf117671-e13c-4232-849a-dfe9f3265c87",
    capacity: Number(data.capacity) || 0,
    wing: data.wing,
    building: data.building,
    floor: data.floor,
    slotDuration: Number(data.slotDuration) || 30,
    startTime: data.startTime,
    endTime: data.endTime,
    description: data.description,
    amenityIds: data.amenityIds,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      const payload = mapFormToPayload(formData);
      onSave(payload);

    } else {
      validator.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  const renderAmenitiesArray = (list: string[]) =>
    list.map((item) => (
      <label key={item} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"

          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
        />
        <span className="text-sm text-gray-700">{item}</span>
      </label>
    ));
  const renderAmenities = (list: string[]) =>
    list.map((item) => (
      <label key={item} className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"

          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
        />
        <span className="text-sm text-gray-700">{item}</span>
      </label>
    ));

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900 text-lg">
            {isOpen ? "Add New Space" : "Edit Space"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Basic Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Space Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              {validator.message("name", formData.name, "required|min:5")}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Space Type *</label>
              <select
                name="type"
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
              <label className="text-sm">Capacity *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              {validator.message("capacity", formData.capacity, "required|min:1")}
            </div>
            <div>
              <label className="text-sm">Location Name *</label>
              <input
                placeholder="Location Name"
                type="text"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              {validator.message("locationName", formData.locationName, "required|min:5")}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm font-medium mb-3">General Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {renderAmenitiesArray(generalAmenities)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Meeting Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {renderAmenities(meetingAmenities)}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">Equipment</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {renderAmenities(equipmentAmenities)}
            </div>
          </div>

          {/* Availability */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Start Time*</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">End Time*</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />


              <input
                placeholder="description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <input
                placeholder="amenityIds"
                type="text"
                name="amenityIds"
                value={formData.amenityIds}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Slot Duration*</label>
              <select
                name="slotDuration"
                value={formData.slotDuration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg"
            >
              {isSubmitting ? "Saving..." : "Save Space"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg"
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
