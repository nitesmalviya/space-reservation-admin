import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Location } from "./index";
import SimpleReactValidator from "simple-react-validator";
import { CreateLocationInput } from "@/types/location-type";

interface LocationModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: CreateLocationInput) => void; // ✅ FIX
  readonly selectedLocation?: Location | null;
  readonly mode: "create" | "edit";
}

const emptyForm: CreateLocationInput = {
  name: "",
  address: "",
  timezone: "",
  orgId: "",
  label: "",
  contactNumber: "",
};

interface LocationFormData {
  name: string;
  address: string;
  timezone: string;
  orgId: string;
  label: string;
  contactNumber: string;
}

export default function LocationModal({
  isOpen,
  onClose,
  onSave,
  selectedLocation,
  mode,
}: LocationModalProps) {
  const [formData, setFormData] = useState<CreateLocationInput>(emptyForm);
  const [, forceUpdate] = useState(0);

  const validator = useRef(
    new SimpleReactValidator({
      className: "text-[13px] font-semibold text-[#F4364C] mt-1",
    })
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && selectedLocation) {
      setFormData({
        name: selectedLocation.name,
        label: selectedLocation.label,
        address: selectedLocation.address,
        // city: selectedLocation.city,
        // state: selectedLocation.state,
        // pincode: selectedLocation.pincode,
        contactNumber: selectedLocation.contactNumber,
        timezone: selectedLocation.timezone,
        orgId: selectedLocation.orgId,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [mode, selectedLocation, isOpen]);

  if (!isOpen) return null;


  const mapToPayload = (data: LocationFormData): CreateLocationInput => ({
    name: data.name,
    orgId: "b51cc444-81ab-4509-9e2d-69a2e0b2e688",
    label: data.label,
    contactNumber: data.contactNumber,
    address: data.address,
    timezone: data.timezone || null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      const payload = mapToPayload(formData); // ✅ clean
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
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. Bitcot Tower"
                required
              />
            </div>
            <div>
              <label
                htmlFor="loc-label"
                className="block text-gray-700 mb-2 text-sm"
              >
                Location Type *
              </label>
              <input
                id="loc-label"
                name="label"
                type="text"
                value={formData.label}
                onChange={handleChange}
                className={inputCls}
                placeholder="e.g. Bitcot Tower"
                required
              />
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
            </div> */}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="loc-address"
              className="block text-gray-700 mb-2 text-sm"
            >
              Street Address
            </label>
            <input
              id="loc-address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className={inputCls}
              placeholder="Enter street address"

            />
          </div>

          {/* City / State / Pincode */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="loc-city"
                className="block text-gray-700 mb-2 text-sm"
              >
                orgId
              </label>
              <input
                id="loc-city"
                name="orgId"
                type="text"
                value={formData.orgId}
                onChange={handleChange}
                className={inputCls}
                placeholder="orgId"

              />
            </div>
            <div>
              <label
                htmlFor="loc-state"
                className="block text-gray-700 mb-2 text-sm"
              >
                timezone
              </label>
              <input
                id="loc-timezone"
                name="timezone"
                type="text"
                value={formData.timezone || ""}
                onChange={handleChange}
                className={inputCls}
                placeholder="timezone"

              />
            </div>
            {/* <div>
              <label
                htmlFor="loc-pincode"
                className="block text-gray-700 mb-2 text-sm"
              >
                Pincode
              </label>
              <input
                id="loc-pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                className={inputCls}
                placeholder="000000"
                maxLength={10}

              />
            </div> */}
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
