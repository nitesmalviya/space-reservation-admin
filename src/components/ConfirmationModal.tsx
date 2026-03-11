"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, AlertCircle, Info } from "lucide-react";
import Loader from "./Loader";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger" | "info";
  isLoading?: boolean;
}

/**
 * ConfirmationModal component
 * A reusable modal for confirming actions (e.g., delete, logout, etc.)
 * Specifically designed to match the application's design system and modal style.
 */
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  isLoading = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleConfirm = () => {
    if (isLoading) return;
    onConfirm();
  };

  // Determine styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
          button: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-200",
          iconBg: "bg-orange-50",
        };
      case "info":
        return {
          icon: <Info className="w-6 h-6 text-blue-600" />,
          button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200",
          iconBg: "bg-blue-50",
        };
      default: // primary (orange)
        return {
          icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
          button: "bg-orange-600 hover:bg-orange-700 focus:ring-orange-200",
          iconBg: "bg-orange-50",
        };
    }
  };

  const styles = getVariantStyles();

  return createPortal(
    <button
      className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-9999 transition-opacity duration-300 "
    >
      <div
        className="bg-white  shadow-2xl max-w-md w-full overflow-hidden transform transition-all p-2 duration-300 scale-100 border border-gray-100 rounded-lg cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-2">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-lg ${styles.iconBg}`}>
              {styles.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <p className="text-gray-600 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 transition-all text-sm disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 text-white font-semibold rounded-lg focus:ring-4 transition-all text-sm flex items-center justify-center min-w-[100px] disabled:opacity-50 ${styles.button}`}
          >
            {isLoading ? <Loader size="sm" /> : confirmLabel}
          </button>
        </div>
      </div>
    </button>,
    document.body,
  );
};
