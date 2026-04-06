"use client";

import React, { useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  clearable?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

/**
 * SearchBox component
 * Reusable search input with left search icon and optional clear button
 */

export const SearchBox: React.FC<SearchBoxProps> = ({
  onDebounce,
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  clearable = true,
  autoFocus = false,
  disabled = false,
  id,
  name,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={` ${className}`}>

      {/* Clear Button */}



      <div className="relative w-full">
        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm    disabled:bg-gray-50
          disabled:text-gray-400
          disabled:cursor-not-allowed
          transition-colors ${inputClassName}`}
        />
      </div>
    </div>
  );
};

export default SearchBox;
