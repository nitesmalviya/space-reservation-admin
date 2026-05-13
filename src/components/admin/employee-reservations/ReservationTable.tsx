import { EmployeeReservation } from "@/types/employee-reservations";
import { Calendar, Check, Clock, MapPin, User, X } from "lucide-react";

interface ReservationTableProps {
    reservation: EmployeeReservation;
    handleReject: (id: string) => void;
    handleApprove: (id: string) => void;
}

const ReservationTable = ({ reservation, handleReject, handleApprove }: ReservationTableProps) => {
    return (
         <div
              key={reservation.id}
              className="p-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {reservation.user.name
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-sm font-medium">
                        {reservation.user.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {reservation?.department ?? "--"} • {reservation?.user?.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ml-auto ${reservation?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : reservation.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {reservation?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Space</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.space.name ?? "--"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {reservation?.space.type ?? "--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.bookingDate ?? "--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.startTime ?? "--"} - {reservation?.endTime ?? "--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Attendees</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.attendeesCount ?? "--"} people
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Purpose</p>
                      <p className="text-sm text-gray-900">
                        {reservation?.purpose ?? "--"}
                      </p>
                    </div>
                  </div>

                  {reservation?.status === "Pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(reservation.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(reservation.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        <X  className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
    )
}

export default ReservationTable;