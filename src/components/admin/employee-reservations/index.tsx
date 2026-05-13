"use client";
import { useState } from "react";
import { Calendar, Clock, MapPin, User, Check, X, Filter } from "lucide-react";
import { EmployeeReservation } from "@/types/employee-reservations";
import ReservationTable from "./ReservationTable";
import EmployeeReservationsStats from "./employee-reservations-stats";

interface ReservationListProps {
  employeeReservations: EmployeeReservation[];
}

const OrgAdminReservations = ({ employeeReservations }: ReservationListProps) => {

  const [filterStatus, setFilterStatus] = useState<string>("pending");

  const filteredReservations =
    filterStatus === "all"
      ? employeeReservations
      : employeeReservations?.filter((r) => r?.status?.toLowerCase() === filterStatus);

  const pendingCount = employeeReservations?.filter(
    (r) => r?.status === "Pending",
  ).length;
  const approvedCount = employeeReservations?.filter(
    (r) => r?.status === "Approved",
  ).length;
  const rejectedCount = employeeReservations?.filter(
    (r) => r?.status === "Rejected",
  ).length;

  const totalEmployeeReservations = employeeReservations?.length ?? 0;



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
      <EmployeeReservationsStats
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        rejectedCount={rejectedCount} 
        totalEmployeeReservations={totalEmployeeReservations} />
    

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
            <ReservationTable key={reservation.id} reservation={reservation} handleReject={handleReject} handleApprove={handleApprove} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrgAdminReservations;