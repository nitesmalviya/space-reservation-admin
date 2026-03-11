import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Location } from "./admin/organization-profile";

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

interface LocationModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (data: Omit<Location, "id">) => void;
  readonly selectedLocation?: Location | null;
  readonly mode: "create" | "edit";
}

const emptyForm = {
  name: "",
  type: LOCATION_TYPES[0],
  address: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
};

export default function LocationModal({
  isOpen,
  onClose,
  onSubmit,
  selectedLocation,
  mode,
}: LocationModalProps) {
  const [formData, setFormData] = useState(emptyForm);

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && selectedLocation) {
      setFormData({
        name: selectedLocation.name,
        type: selectedLocation.type,
        address: selectedLocation.address,
        city: selectedLocation.city,
        state: selectedLocation.state,
        pincode: selectedLocation.pincode,
        phone: selectedLocation.phone,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [mode, selectedLocation, isOpen]);

  if (!isOpen) return null;

  const set =
    (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const inputCls =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm";

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 shrink-0">
          <h2 className="text-gray-900 text-lg">
            {mode === "create" ? "Add New Location" : "Edit Location"}
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
                value={formData.name}
                onChange={set("name")}
                className={inputCls}
                placeholder="e.g. Bitcot Tower"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loc-type"
                className="block text-gray-700 mb-2 text-sm"
              >
                Location Type *
              </label>
              <select
                id="loc-type"
                value={formData.type}
                onChange={set("type")}
                className={inputCls}
                required
              >
                {LOCATION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
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
              value={formData.address}
              onChange={set("address")}
              className={inputCls}
              placeholder="Enter street address"
              required
            />
          </div>

          {/* City / State / Pincode */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="loc-city"
                className="block text-gray-700 mb-2 text-sm"
              >
                City *
              </label>
              <input
                id="loc-city"
                type="text"
                value={formData.city}
                onChange={set("city")}
                className={inputCls}
                placeholder="City"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loc-state"
                className="block text-gray-700 mb-2 text-sm"
              >
                State *
              </label>
              <input
                id="loc-state"
                type="text"
                value={formData.state}
                onChange={set("state")}
                className={inputCls}
                placeholder="State"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loc-pincode"
                className="block text-gray-700 mb-2 text-sm"
              >
                Pincode *
              </label>
              <input
                id="loc-pincode"
                type="text"
                value={formData.pincode}
                onChange={set("pincode")}
                className={inputCls}
                placeholder="000000"
                maxLength={10}
                required
              />
            </div>
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
              id="loc-phone"
              type="tel"
              value={formData.phone}
              onChange={set("phone")}
              className={inputCls}
              placeholder="+91 00000 00000"
              required
            />
          </div>

          {/* Footer actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
            >
              {mode === "create" ? "Add Location" : "Save Changes"}
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
