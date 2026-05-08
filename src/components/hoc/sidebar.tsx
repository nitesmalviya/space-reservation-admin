"use client";

import { PUBLIC_PATH, SIDEBAR_MENU, USER_ROLE } from "@/utils/constant";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { ConfirmationModal } from "../ConfirmationModal";
import { useEffect, useMemo, useState } from "react";
import { logout } from "@/store/actions/auth-action";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const displayRole =
    user?.role?.toLowerCase() === USER_ROLE.SUPER_ADMIN
      ? "Super Admin"
      : "Admin";

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

  const menuSections = useMemo(() => {
    if (!user?.role) return [];

    return user.role.toLowerCase() === USER_ROLE.SUPER_ADMIN.toLowerCase()
      ? SIDEBAR_MENU.SUPER_ADMIN
      : SIDEBAR_MENU.ADMIN;
  }, [user?.role]);

  useEffect(() => {
    if (!user) {
      router.replace(PUBLIC_PATH.LOGIN);
    }
  }, [user]);
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <img
          src={"/assets/logo.png"}
          alt="GM Workspace"
          className="h-8 w-auto"
        />
      </div>

      {/* menu itmes */}
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
        {/* logout button */}
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
            {user?.role?.toLowerCase() === USER_ROLE.ADMIN.toLowerCase()
              ? "A"
              : "SA"}
          </div>
          <div>
            <p className="text-sm text-gray-900">{displayRole || "--"}</p>
            <p className="text-xs text-gray-500">{user?.email || "--"}</p>
          </div>
        </div>
        {/* logout confirmation modal */}
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
