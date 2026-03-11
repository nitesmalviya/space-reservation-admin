import { DashboardPRops } from "@/types/dashboard/admin";
import { Calendar, Clock } from "lucide-react";



export function OrgAdminDashboard({
  statsData,
  upcomingBookings,
  spaceUtilization,
  recentEmployees,
}: DashboardPRops) {
  const colorStyles = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-600 text-sm">
          Welcome back! Here's your organization overview.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {statsData?.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-lg ${colorStyles[stat.color as keyof typeof colorStyles]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                {stat?.title || "--"}
              </p>
              <p className="text-gray-900 text-xl mb-1">
                {stat?.value || "--"}
              </p>
              <p className="text-xs text-gray-500">{stat?.change || "--"}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-gray-900 mb-3 text-base">Upcoming Bookings</h2>
          <div className="space-y-2">
            {upcomingBookings?.map((booking) => (
              <div key={booking.id} className="p-2.5 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-gray-900 text-sm">
                      {booking.space || "--"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.employee || "--"}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      booking?.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking?.status || "--"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {booking?.date || "--"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {booking?.time || "--"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Space Utilization */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-gray-900 mb-3 text-base">Space Utilization</h2>
          <div className="space-y-2.5">
            {spaceUtilization?.map((space) => (
              <div key={space.id}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-900">{space?.name || "--"}</p>
                  <p className="text-xs text-gray-600">
                    {space?.utilization || "--"}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-orange-600 h-1.5 rounded-full"
                    style={{ width: `${space?.utilization || 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {space?.bookings || "--"} bookings this week
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-gray-900 mb-3 text-base">Recent Employees</h2>
        <div className="space-y-2">
          {recentEmployees.map((employee) => (
            <div
              key={employee?.id}
              className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
                  {employee?.name
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")}
                </div>
                <div>
                  <p className="text-gray-900 text-sm">
                    {employee?.name || "--"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {employee?.email || "--"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    employee.role === "Admin"
                      ? "bg-purple-100 text-purple-700"
                      : employee.role === "Manager"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {employee.role}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Joined {employee?.joinDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
