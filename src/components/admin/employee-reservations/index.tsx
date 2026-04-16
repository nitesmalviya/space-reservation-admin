"use client";
import { useState } from "react";
import { Filter } from "lucide-react";
import { EmployeeReservationsInput } from "@/types/employee-type";
import SummaryCards from "./summary-cards";
import PageHeading from "@/components/ui/page-heading";
import ReservationCard from "./reservation-card";

interface ReservationListProps {
  readonly employeeReservations: EmployeeReservationsInput[];
}

export function OrgAdminReservations({ employeeReservations }: ReservationListProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>("pending");

  const filteredReservations =
    filterStatus === "all"
      ? employeeReservations
      : employeeReservations?.filter((r) => r?.status?.toLowerCase() === filterStatus);


  const pendingCount =
    employeeReservations?.filter((r) => r?.status === "Pending")?.length ?? 0;

  const approvedCount =
    employeeReservations?.filter((r) => r?.status === "Approved",)?.length ?? 0;

  const rejectedCount =
    employeeReservations?.filter((r) => r?.status === "Rejected",)?.length ?? 0;

  const handleApprove = (id: string) => {
    alert("Approved")
  };

  const handleReject = (id: string) => {
    alert("Rejected")
  };



  return (
    <div className="p-5">
      <PageHeading title="Employee Reservations" description="Manage booking requests from employees" />

      {/* Summary Cards */}
      <SummaryCards
        employeeReservations={employeeReservations}
        pendingCount={pendingCount ?? 0}
        approvedCount={approvedCount ?? 0}
        rejectedCount={rejectedCount ?? 0}
      />

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

        <ReservationCard
          filteredReservations={filteredReservations}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}
