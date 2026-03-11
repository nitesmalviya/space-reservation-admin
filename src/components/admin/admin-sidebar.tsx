"use client";
import { ADMIN_PATH, PUBLIC_PATH } from "@/utils/constant";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Calendar,
  Settings,
  BarChart3,
  LogOut,
  Building2,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { ConfirmationModal } from "../ConfirmationModal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/actions/auth-action";

type View =
  | "dashboard"
  | "spaces"
  | "reservations"
  | "employees"
  | "profile"
  | "analytics"
  | "booking-rules"
  | "settings";

const menuSections = [
  {id:1,
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
    id:2,
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
    id:3,
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
    id:4,
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
];

export function OrgAdminSidebar() {
    const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };
  const handleLogoutConfirm = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(logout);
      if (res.success) {
        router.push(PUBLIC_PATH.LOGIN);
        toast.success("Logout successfully");
      } else {
        toast.error(res?.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error?.message || "Logout failed");
    } finally {
      setIsLogoutModalOpen(false);
      setIsLoading(false);
    }
  };
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden ">
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <img
          src={"/assets/logo.png"}
          alt="GM Workspace"
          className="h-8 w-auto"
        />
      </div>

      <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-4">
            <div className="px-6 mb-2">
              <p className="text-xs text-gray-500 tracking-wider">
                {section.title}
              </p>
            </div>
            <div className="px-3">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.path.includes(pathname);

                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors text-sm ${
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="px-3">
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
            BT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 truncate">{user?.role || "--"}</p>
            <p className="text-xs text-gray-500 truncate">Bitcot Technology</p>
          </div>
        </div>
        <ConfirmationModal
          variant="danger"
          description="Are you sure you want to logout?"
          title="Logout"
          isOpen={isLogoutModalOpen}
          onClose={() => {
            setIsLogoutModalOpen(false);
          }}
          isLoading={isLoading}
          onConfirm={handleLogoutConfirm}
        />
      </div>
    </aside>
  );
}
