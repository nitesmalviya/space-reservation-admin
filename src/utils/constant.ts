import {
  LayoutDashboard,
  Building2,
  Users,
  MapPin,
  Calendar,
  BarChart3,
  LogOut,
  Shield,
  Settings,
} from "lucide-react";
export const PUBLIC_PATH = {
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
};

export const ADMIN_PATH = {
  DASHBOARD: "/admin/dashboard",
  SPACE_MANAGEMENT: "/admin/space-management",
  EMPLOYEE_RESERVATIONS: "/admin/employee-reservations",
  EMPLOYEES: "/admin/employees",
  ORGANIZATION_PROFILE: "/admin/organization-profile",
  REPORTS_ANALYTICS: "/admin/reports-analytics",
  BOOKING_RULES: "/admin/booking-rules",
  SETTINGS: "/admin/settings",
};

export const SUPER_ADMIN_PATH = {
  DASHBOARD: "/super-admin/dashboard",
  ORGANIZATIONS: "/super-admin/organizations",
  USERS: "/super-admin/users",
  SPACES: "/super-admin/spaces",
  BOOKINGS: "/super-admin/bookings",
  ANALYTICS: "/super-admin/analytics",
};

export const PRIVATE_PATH = {
  ...ADMIN_PATH,
  ...SUPER_ADMIN_PATH,
};

export const ROUTES_PATH = {
  ...PUBLIC_PATH,
  ...PRIVATE_PATH,
};

export const USER_ROLE = {
  ADMIN: "admin",
  SUPER_ADMIN: "superadmin",
} as const;

type View =
  | "dashboard"
  | "organizations"
  | "users"
  | "spaces"
  | "bookings"
  | "analytics"
  | "reservations"
  | "employees"
  | "profile"
  | "booking-rules"
  | "settings";
export const SIDEBAR_MENU = {
  SUPER_ADMIN: [
    {
      id: 1,
      title: "OVERVIEW",
      items: [
        {
          id: "dashboard" as View,
          label: "Dashboard",
          icon: LayoutDashboard,
          path: SUPER_ADMIN_PATH.DASHBOARD,
        },
      ],
    },
    {
      id: 2,
      title: "MANAGEMENT",
      items: [
        {
          id: "organizations" as View,
          label: "Organizations",
          icon: Building2,
          path: SUPER_ADMIN_PATH.ORGANIZATIONS,
        },
        {
          id: "users" as View,
          label: "Users",
          icon: Users,
          path: SUPER_ADMIN_PATH.USERS,
        },
        {
          id: "spaces" as View,
          label: "Spaces",
          icon: MapPin,
          path: SUPER_ADMIN_PATH.SPACES,
        },
        {
          id: "bookings" as View,
          label: "Bookings",
          icon: Calendar,
          path: SUPER_ADMIN_PATH.BOOKINGS,
        },
      ],
    },
    {
      id: 3,
      title: "REPORTING",
      items: [
        {
          id: "analytics" as View,
          label: "Analytics",
          icon: BarChart3,
          path: SUPER_ADMIN_PATH.ANALYTICS,
        },
      ],
    },
  ],
  ADMIN: [
    {
      id: 1,
      title: "OVERVIEW",
      items: [
        {
          id: "dashboard" as View,
          label: "Dashboard",
          icon: LayoutDashboard,
          path: ADMIN_PATH.DASHBOARD,
        },
      ],
    },
    {
      id: 2,
      title: "MANAGEMENT",
      items: [
        {
          id: "spaces" as View,
          label: "Space Management",
          icon: MapPin,
          path: ADMIN_PATH.SPACE_MANAGEMENT,
        },
        {
          id: "reservations" as View,
          label: "Employee Reservations",
          icon: Calendar,
          path: ADMIN_PATH.EMPLOYEE_RESERVATIONS,
        },
        {
          id: "employees" as View,
          label: "Employees",
          icon: Users,
          path: ADMIN_PATH.EMPLOYEES,
        },
        {
          id: "profile" as View,
          label: "Organization Profile",
          icon: Building2,
          path: ADMIN_PATH.ORGANIZATION_PROFILE,
        },
      ],
    },
    {
      id: 3,
      title: "REPORTING",
      items: [
        {
          id: "analytics" as View,
          label: "Reports & Analytics",
          icon: BarChart3,
          path: ADMIN_PATH.REPORTS_ANALYTICS,
        },
      ],
    },
    {
      id: 4,
      title: "SYSTEM",
      items: [
        {
          id: "booking-rules" as View,
          label: "Booking Rules",
          icon: Shield,
          path: ADMIN_PATH.BOOKING_RULES,
        },
        {
          id: "settings" as View,
          label: "Settings",
          icon: Settings,
          path: ADMIN_PATH.SETTINGS,
        },
      ],
    },
  ],
};

export const pagePerOptions = [5, 10, 25];
export const limit = 10;

export const DEMO_CREDENTIALS = {
  superAdmin: {
    email: "admin@workspace.com",
    password: "admin123",
  },
  orgAdmin: {
    email: "admin@bitcot.com",
    password: "admin123",
  },
};

export const INDUSTRY_OPTIONS = [
  { value: "", label: "Select industry" },
  { value: "EDUCATION", label: "Education" },
  { value: "FINANCE", label: "Finance" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "LEGAL", label: "Legal" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "MARKETING", label: "Marketing" },
  { value: "MEDIA", label: "Media" },
  { value: "RETAIL", label: "Retail" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "OTHER", label: "Other" },
];

export const formatSpaceType = (type: string) => {
  return type
    ?.replace(/_/g, " ")
    ?.toLowerCase()
    ?.replace(/\b\w/g, (c) => c.toUpperCase());
};

export const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "-"; // invalid date safety

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getInitialsName = (name: string) =>
  name
    ?.split(" ")
    .map((n) => n.charAt(0))
    .join("");


    export const PAGINATION_LIMIT = {
  LIMIT: 10 as const,
  PAGE: 1 as const,
};