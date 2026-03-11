"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      expand
      position="top-right"
      style={
        {
          // Default
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          // Success
          "--success-bg": "#2bc764ff",
          "--success-text": "#ffffff",
          "--success-border": "hsla(142, 86%, 66%, 1.00)",

          // Error
          "--error-bg": "#dc2626",
          "--error-text": "#ffffff",
          "--error-border": "#b91c1c",

          // Info
          "--info-bg": "#2563eb",
          "--info-text": "#ffffff",
          "--info-border": "#1d4ed8",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
