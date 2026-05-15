import { TopEmployeesType } from "@/types/organization-analytics";
import { Users } from "lucide-react";

interface TopEmployeesProps {
  topEmployees: TopEmployeesType[];
  handleExportReport: (reportType: string) => void;
}

const TopEmployees = ({
  topEmployees,
  handleExportReport,
}: TopEmployeesProps) => {
  return (
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
                  {employee.employeeName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <p className="text-sm text-gray-900 font-medium">
                    {employee.employeeName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Bookings</p>

                  <p className="text-sm text-gray-900 font-medium">
                    {employee.bookingsCount}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Hours</p>

                  <p className="text-sm text-gray-900 font-medium">
                    {employee.totalHours}h
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopEmployees;