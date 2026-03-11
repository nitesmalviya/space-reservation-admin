"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, User, Check, X, Filter } from "lucide-react";

export interface Reservation {
  id: string;
  employee: string;
  email: string;
  department: string;
  space: string;
  spaceType: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "Pending" | "Approved" | "Rejected";
  purpose: string;
  attendees: number;
}

interface ReservationListProps {
  readonly reservations: Reservation[];
}

export function OrgAdminReservations({ reservations }: ReservationListProps) {
  const [filterStatus, setFilterStatus] = useState<string>("pending");

  const filteredReservations =
    filterStatus === "all"
      ? reservations
      : reservations?.filter((r) => r?.status?.toLowerCase() === filterStatus);

  const pendingCount = reservations?.filter(
    (r) => r?.status === "Pending",
  ).length;
  const approvedCount = reservations?.filter(
    (r) => r?.status === "Approved",
  ).length;
  const rejectedCount = reservations?.filter(
    (r) => r?.status === "Rejected",
  ).length;

  const handleApprove = (id: string) => {
    // console.log("Approve reservation:", id);
    // In real app, this would call an API
  };

  const handleReject = (id: string) => {
    // console.log("Reject reservation:", id);
    // In real app, this would call an API
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Employee Reservations</h1>
        <p className="text-gray-600 text-sm">
          Manage booking requests from employees
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Total Requests</p>
          <p className="text-gray-900 text-xl">{reservations?.length ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Pending</p>
          <p className="text-gray-900 text-xl">{pendingCount ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Approved</p>
          <p className="text-gray-900 text-xl">{approvedCount ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs text-gray-600 mb-1">Rejected</p>
          <p className="text-gray-900 text-xl">{rejectedCount ?? 0}</p>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target?.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredReservations?.map((reservation) => (
            <div
              key={reservation.id}
              className="p-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium">
                      {reservation?.employee
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-sm font-medium">
                        {reservation?.employee}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {reservation?.department} • {reservation?.email}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ml-auto ${
                        reservation?.status === "Pending"
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
                          {reservation?.space ??"--"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {reservation?.spaceType ??"--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.date ??"--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.startTime ??"--"} - {reservation?.endTime ??"--"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Attendees</p>
                        <p className="text-sm text-gray-900">
                          {reservation?.attendees ?? "--"} people
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
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
