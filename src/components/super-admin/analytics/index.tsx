"use client";
import {
  BookingsByOrganization,
  BookingsBySpace,
  FeedbackTrend,
  SummaryStats,
} from "@/types/super-admin-analytics";
import SummaryStatistics from "./summary-statistics";
import FeedbackTrends from "./feedback-trends";
import BookingsOrganization from "./bookings-organization";
import BookingsSpace from "./bookings-space";
import PageHeading from "@/components/ui/page-heading";

interface AnalyticsProps {
  bookingsByOrganization: BookingsByOrganization[];
  bookingsBySpace: BookingsBySpace[];
  feedbackTrends: FeedbackTrend[];
  summaryStats: SummaryStats;
}

const Analytics = ({
  bookingsByOrganization,
  bookingsBySpace,
  feedbackTrends,
  summaryStats,
}: AnalyticsProps) => {
  return (
    <div className="p-5">
      <PageHeading title="Analytics Dashboard" description="Insights and trends across your workspace" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Bookings by Organization */}
        <BookingsOrganization bookingsByOrganization={bookingsByOrganization} />
        {/* Bookings by Space */}
        <BookingsSpace bookingsBySpace={bookingsBySpace} />
      </div>

      {/* Feedback Trends */}
      <FeedbackTrends feedbackTrends={feedbackTrends} />
      {/* Summary Statistics */}
      <SummaryStatistics summaryStats={summaryStats} />
    </div>
  );
}

export default Analytics;