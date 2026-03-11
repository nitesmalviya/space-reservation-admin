import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  overlay?: boolean;
  inline?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullScreen = false,
  overlay = false,
  inline = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const strokeWidths = {
    sm: "4",
    md: "5",
    lg: "6",
  };

  const spinner = (
    <div className={`relative inline-flex ${sizeClasses[size]} ${className}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }
        @keyframes dash {
          0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
        .md-spinner-svg {
          animation: rotate 2s linear infinite;
          width: 100%;
          height: 100%;
        }
        .md-spinner-circle {
          stroke: currentColor;
          stroke-linecap: round;
          animation: dash 1.5s ease-in-out infinite;
        }
      `,
        }}
      />
      <svg className="md-spinner-svg" viewBox="0 0 50 50">
        <circle
          className="md-spinner-circle"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth={strokeWidths[size]}
        ></circle>
      </svg>
    </div>
  );

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-[9999] text-orange-600">
        <Loader size="lg" inline className={className} />
      </div>
    );
  }

  // Section overlay loader
  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50 text-orange-600">
        {spinner}
      </div>
    );
  }

  if (inline || size === "sm") {
    return spinner;
  }

  return (
    <div className="flex justify-center items-center w-full min-h-[100px] text-orange-600">
      {spinner}
    </div>
  );
};

export default Loader;
