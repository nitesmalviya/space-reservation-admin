"use client";
import { PUBLIC_PATH, SUPER_ADMIN_PATH } from "@/utils/constant";
import {
  LayoutDashboard,
  Building2,
  Users,
  MapPin,
  Calendar,
  BarChart3,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { ConfirmationModal } from "../ConfirmationModal";
import { useState } from "react";
import { logout } from "@/store/actions/auth-action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type View =
  | "dashboard"
  | "organizations"
  | "users"
  | "spaces"
  | "bookings"
  | "analytics";

const menuSections = [
  {
    id:1,
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
    id:2,
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
    id:3,
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
];

export function SuperAdminSidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.role?.toLowerCase() === "superadmin"?"Super Admin":"--";

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };
  const handleLogoutConfirm = async () => {
    try {
      setIsLoading(true);
      const res = await dispatch(logout);
      if (res.success) {
        router.replace(PUBLIC_PATH.LOGIN);
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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <img
          src={"/assets/logo.png"}
          alt="GM Workspace"
          className="h-8 w-auto"
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-6">
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
                    href={item.path}
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors text-sm ${
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="px-3 mt-auto">
          <div className="px-6 mb-2">
            <p className="text-xs text-gray-500 tracking-wider">SYSTEM</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm">
            SA
          </div>
          <div>
            <p className="text-sm text-gray-900">{role}</p>
            <p className="text-xs text-gray-500">{user?.email || "--"}</p>
          </div>
        </div>
        <ConfirmationModal
          variant="danger"
          description="Are you sure you want to logout?"
          title="Logout"
          isOpen={isLogoutModalOpen}
          isLoading={isLoading}
          onClose={() => {
            setIsLogoutModalOpen(false);
          }}
          onConfirm={handleLogoutConfirm}
        />
      </div>
    </aside>
  );
}
