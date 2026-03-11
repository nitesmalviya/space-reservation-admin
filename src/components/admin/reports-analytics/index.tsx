
"use client"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  MapPin,
  Clock,
} from "lucide-react";

export function OrgAdminAnalytics() {
  const overviewStats = [
    { label: "Total Bookings", value: "1,248", change: "+12.5%", trend: "up" },
    { label: "Active Spaces", value: "24", change: "+3", trend: "up" },
    { label: "Total Employees", value: "156", change: "+8", trend: "up" },
    { label: "Avg. Utilization", value: "68%", change: "-2.3%", trend: "down" },
  ];

  const spaceUtilizationData = [
    {
      space: "Conference Room A",
      bookings: 45,
      utilization: 85,
      revenue: 0,
      hours: 112,
    },
    {
      space: "Meeting Room B",
      bookings: 38,
      utilization: 72,
      revenue: 0,
      hours: 95,
    },
    {
      space: "Auditorium",
      bookings: 28,
      utilization: 68,
      revenue: 0,
      hours: 168,
    },
    {
      space: "Training Room",
      bookings: 25,
      utilization: 62,
      revenue: 0,
      hours: 150,
    },
    {
      space: "Event Space",
      bookings: 22,
      utilization: 58,
      revenue: 0,
      hours: 132,
    },
  ];

  const bookingTrends = [
    { month: "Jan", bookings: 98 },
    { month: "Feb", bookings: 112 },
    { month: "Mar", bookings: 125 },
    { month: "Apr", bookings: 118 },
    { month: "May", bookings: 134 },
    { month: "Jun", bookings: 145 },
  ];

  const topEmployees = [
    { name: "John Doe", department: "HR", bookings: 24, hours: 48 },
    {
      name: "Sarah Williams",
      department: "Engineering",
      bookings: 22,
      hours: 44,
    },
    { name: "Mike Johnson", department: "Sales", bookings: 20, hours: 60 },
    { name: "Emily Davis", department: "Marketing", bookings: 18, hours: 36 },
    { name: "David Chen", department: "IT", bookings: 16, hours: 32 },
  ];

  const peakHours = [
    { time: "09:00 AM", bookings: 45 },
    { time: "10:00 AM", bookings: 68 },
    { time: "11:00 AM", bookings: 82 },
    { time: "12:00 PM", bookings: 35 },
    { time: "01:00 PM", bookings: 42 },
    { time: "02:00 PM", bookings: 75 },
    { time: "03:00 PM", bookings: 88 },
    { time: "04:00 PM", bookings: 62 },
    { time: "05:00 PM", bookings: 38 },
  ];

  const maxPeakBookings = Math.max(...peakHours.map((p) => p.bookings));

  const handleExportReport = (type: string) => {
    // console.log(`Exporting ${type} report...`);
    alert(`${type} report exported successfully!`);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-gray-900 mb-1">Reports & Analytics</h1>
          <p className="text-gray-600 text-sm">
            Comprehensive insights into space utilization and booking patterns
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportReport("PDF")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => handleExportReport("Excel")}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
        {overviewStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-600">{stat.label}</p>
              <span
                className={`flex items-center gap-1 text-xs ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-gray-900 text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Booking Trends */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-base font-medium">
              Booking Trends
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {bookingTrends.map((data, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{data.month}</span>
                  <span className="text-sm text-gray-900 font-medium">
                    {data.bookings} bookings
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${(data.bookings / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-base font-medium">
              Peak Booking Hours
            </h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            {peakHours.map((data, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-20">{data.time}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all"
                    style={{
                      width: `${(data.bookings / maxPeakBookings) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-900 font-medium w-8">
                  {data.bookings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Space Utilization Report */}
      <div className="bg-white rounded-lg border border-gray-200 mb-3">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 text-base font-medium">
                Space Utilization Report
              </h2>
            </div>
            <button
              onClick={() => handleExportReport("Space Utilization")}
              className="text-orange-600 hover:text-orange-700 text-sm"
            >
              Export Details
            </button>
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Space Name
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Total Bookings
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Total Hours
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Utilization
                </th>
                <th className="px-5 py-3 text-left text-gray-700 text-xs font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {spaceUtilizationData.map((space, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-900">
                    {space.space}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {space.bookings}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {space.hours}h
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-600 h-1.5 rounded-full"
                          style={{ width: `${space.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900 font-medium">
                        {space.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        space.utilization >= 70
                          ? "bg-green-100 text-green-700"
                          : space.utilization >= 50
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {space.utilization >= 70
                        ? "High"
                        : space.utilization >= 50
                          ? "Medium"
                          : "Low"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Employees */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-400" />
              <h2 className="text-gray-900 text-base font-medium">
                Top Employees by Booking Activity
              </h2>
            </div>
            <button
              onClick={() => handleExportReport("Employee Activity")}
              className="text-orange-600 hover:text-orange-700 text-sm"
            >
              Export Details
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {topEmployees.map((employee, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-medium">
                      {employee.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {employee.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Bookings</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {employee.bookings}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Hours</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {employee.hours}h
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
