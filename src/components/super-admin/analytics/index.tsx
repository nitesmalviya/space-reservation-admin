"use client";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Analytics() {
  const bookingsByOrganization = [
    { name: 'Tech Solutions', bookings: 145 },
    { name: 'Global Marketing', bookings: 98 },
    { name: 'Finance Partners', bookings: 112 },
    { name: 'Creative Studios', bookings: 76 },
    { name: 'Healthcare Group', bookings: 134 },
    { name: 'Legal Associates', bookings: 89 },
  ];

  const bookingsBySpace = [
    { name: 'Conference Room A', value: 234 },
    { name: 'Meeting Room B', value: 189 },
    { name: 'Boardroom', value: 156 },
    { name: 'Conference Room C', value: 143 },
    { name: 'Training Room', value: 98 },
    { name: 'Other Spaces', value: 180 },
  ];

  const feedbackTrends = [
    { month: 'Jun', rating: 4.2, responses: 45 },
    { month: 'Jul', rating: 4.3, responses: 52 },
    { month: 'Aug', rating: 4.1, responses: 48 },
    { month: 'Sep', rating: 4.4, responses: 61 },
    { month: 'Oct', rating: 4.5, responses: 58 },
    { month: 'Nov', rating: 4.6, responses: 67 },
    { month: 'Dec', rating: 4.7, responses: 42 },
  ];

  const COLORS = ['#ea580c', '#2563eb', '#16a34a', '#9333ea', '#eab308', '#64748b'];

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-gray-900 mb-1">Analytics Dashboard</h1>
        <p className="text-gray-600 text-sm">Insights and trends across your workspace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        {/* Bookings by Organization */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-gray-900 mb-3 text-base">Bookings by Organization</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsByOrganization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#ea580c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings by Space */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-gray-900 mb-3 text-base">Bookings by Space</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingsBySpace}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {bookingsBySpace.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feedback Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
        <h2 className="text-gray-900 mb-3 text-base">Feedback Trends</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={feedbackTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" domain={[0, 5]} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="rating" stroke="#ea580c" strokeWidth={2} name="Average Rating" />
            <Line yAxisId="right" type="monotone" dataKey="responses" stroke="#2563eb" strokeWidth={2} name="Total Responses" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1 text-xs">Average Booking Duration</p>
          <p className="text-gray-900 text-xl">1.8 hours</p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1 text-xs">Space Utilization Rate</p>
          <p className="text-gray-900 text-xl">76%</p>
          <p className="text-sm text-green-600 mt-1">+5% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 mb-1 text-xs">Average Satisfaction Score</p>
          <p className="text-gray-900 text-xl">4.6 / 5.0</p>
          <p className="text-sm text-green-600 mt-1">+0.2 from last month</p>
        </div>
      </div>
    </div>
  );
}