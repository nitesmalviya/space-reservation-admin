import { OrgAdminDashboard } from "@/components/admin/dashboard";
import { Calendar, Users, MapPin, TrendingUp, Clock } from "lucide-react";


const statsData = [
  {
    id: "1",
    title: "Total Employees",
    value: "45",
    change: "+3 this month",
    icon: Users,
    color: "blue",
  },
  {
    id: "2",
    title: "Active Spaces",
    value: "8",
    change: "All operational",
    icon: MapPin,
    color: "green",
  },
  {
    id: "3",
    title: "Upcoming Bookings",
    value: "23",
    change: "Next 7 days",
    icon: Calendar,
    color: "purple",
  },
  {
    id: "4",
    title: "Space Utilization",
    value: "76%",
    change: "+8% from last week",
    icon: TrendingUp,
    color: "orange",
  },
];

const upcomingBookings = [
  {
    id: "1",
    space: "Conference Room A",
    employee: "Alex Martinez",
    date: "Dec 8, 2025",
    time: "10:00 AM - 11:30 AM",
    status: "Confirmed",
  },
  {
    id: "2",
    space: "Small Meeting Room",
    employee: "Emma Wilson",
    date: "Dec 8, 2025",
    time: "2:00 PM - 3:00 PM",
    status: "Confirmed",
  },
  {
    id: "3",
    space: "Executive Boardroom",
    employee: "David Lee",
    date: "Dec 9, 2025",
    time: "9:00 AM - 10:30 AM",
    status: "Pending",
  },
  {
    id: "4",
    space: "Conference Room A",
    employee: "Sophie Chen",
    date: "Dec 9, 2025",
    time: "3:00 PM - 4:30 PM",
    status: "Confirmed",
  },
];

const spaceUtilization = [
  { id: "1", name: "Conference Room A", utilization: 85, bookings: 12 },
  { id: "2", name: "Small Meeting Room", utilization: 68, bookings: 8 },
  { id: "3", name: "Executive Boardroom", utilization: 72, bookings: 9 },
  { id: "4", name: "Training Room", utilization: 45, bookings: 5 },
];

const recentEmployees = [
  {
    id: "1",
    name: "Sophie Chen",
    email: "sophie.c@bitcot.com",
    role: "User",
    joinDate: "Nov 15, 2025",
  },
  {
    id: "2",
    name: "Michael Park",
    email: "michael.p@bitcot.com",
    role: "Manager",
    joinDate: "Nov 8, 2025",
  },
  {
    id: "3",
    name: "Lisa Anderson",
    email: "lisa.a@bitcot.com",
    role: "User",
    joinDate: "Oct 28, 2025",
  },
];

const DashboardPage = async () => {




  return (
    <OrgAdminDashboard
      statsData={statsData}
      upcomingBookings={upcomingBookings}
      spaceUtilization={spaceUtilization}
      recentEmployees={recentEmployees}
    />
  );
}

export default DashboardPage;