"use client";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

interface SearchFilterProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBox = ({
  onSearchChange,
  placeholder = "Search...",
  className,
}: SearchFilterProps) => {

  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    onSearchChange("");
  };

  return (
    <div className={`relative flex-1 sm:flex-initial gap-[16px] ${className}`}>
      
      <button
        type="button"
        onClick={handleClear}
        aria-label="Clear search"
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onSearchChange(e.target.value);
        }}
        className="w-full sm:w-[280px] pl-10 pr-4 py-2.5 sm:py-3 border border-[#E5E5E5] rounded-lg text-[14px] sm:text-[15px] text-[#525F69] placeholder:text-[#98B4BC] placeholder:text-[16px] sm:placeholder:text-[16px] focus:outline-none focus:border-[#009CA6] focus:ring-1 focus:ring-[#009CA6] h-auto"
      />
    </div>
  );
};

export default SearchBox;