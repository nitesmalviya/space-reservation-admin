import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import SimpleReactValidator from "simple-react-validator";
import { CreateLocationInput } from "@/types/location";
import { useAppSelector } from "@/store/hooks";


const LOCATION_TYPES = [
  "Head Office",
  "Branch Office",
  "Regional Office",
  "Satellite Office",
  "Co-working Space",
  "Data Center",
  "Warehouse",
  "Other",
];

const emptyForm = {
  name: "",
  address: "",
  label: "",
  contactNumber: "",
};

interface LocationFormData {
  name: string;
  address: string;
  label: string;
  contactNumber: string;
}

interface LocationModalProps {
  selectedLocation?: any;
  onSave: (data: CreateLocationInput) => void;
  loading?: boolean;
  onClose: () => void;
  isOpen: boolean;
}

const LocationModal = ({
  selectedLocation,
  isOpen,
  onClose,
  onSave,
  loading: isSubmitting = false,
}: LocationModalProps) => {

  const userData = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState<LocationFormData>(emptyForm);
  const [, forceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      className: "text-red-500 text-xs mt-1",
    })
  ).current;

  // Populate form when editing
  useEffect(() => {
    if (selectedLocation) {
      setFormData({
        name: selectedLocation.name || "",
        label: selectedLocation.label || "",
        address: selectedLocation.address || "",
        contactNumber: selectedLocation.contactNumber || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [selectedLocation, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { name, value } = e.target;

    if (name === "contactNumber") {
      value = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const mapToPayload = (
    data: LocationFormData
  ): CreateLocationInput => ({
    name: data.name,
    address: data.address,
    label: data.label,
    contactNumber: data.contactNumber,
    orgId: userData?.orgId || "",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      const payload = mapToPayload(formData);
      onSave(payload);
      setFormData(emptyForm);
      onClose();
    } else {
      validator.showMessages();
      forceUpdate((prev) => prev + 1);
    }
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm";

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 shrink-0">
          <h2 className="text-gray-900 text-lg">
            {selectedLocation ? "Edit Location" : "Add New Location"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {/* Name + Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="loc-name"
                className="block text-gray-700 mb-2 text-sm"
              >
                Location Name *
              </label>
              <input
                id="loc-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. Bitcot Tower"
                required
              />
              {validator.message("name", formData.name, "required|min:5")}
            </div>
            <div>
              <label
                htmlFor="loc-label"
                className="block text-gray-700 mb-2 text-sm"
              >
                Label *
              </label>
              <input
                id="loc-label"
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                className={inputCls}
                placeholder="Enter label for location"
                required
              />
              {validator.message("label", formData.label, "required|min:5")}
            </div>
            {/* <div>
              <label
                htmlFor="loc-type"
                className="block text-gray-700 mb-2 text-sm"
              >
                Location Type *
              </label>
              <select
                id="loc-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputCls}
                required
              >
                {LOCATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div> */}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="loc-address"
              className="block text-gray-700 mb-2 text-sm"
            >
              Street Address *
            </label>
            <input
              id="loc-address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputCls}
              placeholder="Enter street address"
              required
            />
            {validator.message("address", formData.address, "required|min:10")}
          </div>
          {/* Phone */}
          <div>
            <label
              htmlFor="loc-phone"
              className="block text-gray-700 mb-2 text-sm"
            >
              Contact Phone *
            </label>
            <input
              id="loc-contactNumber"
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              className={inputCls}
              placeholder="+91 00000 00000"
              maxLength={12}
              required
            />
            {validator.message("contactNumber", formData.contactNumber, "required|numeric|min:10|max:10")}
          </div>

          {/* Footer actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              {isSubmitting ? "Saving..." : "Save Location"}
            </button>
            <button
              type="button"
              onClick={onClose}
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


export default LocationModal;