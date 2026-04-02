import {
    FeedbackTrend,
} from "@/types/super-admin-analytics";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const FeedbackTrends = ({ feedbackTrends }: { feedbackTrends: FeedbackTrend[] }) => {

    const formattedFeedbackTrends = feedbackTrends.map((item) => ({
        month: item.month,
        rating: item.avgRating,
        responses: item.totalResponses,
    }));

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3">
            <h2 className="text-gray-900 mb-3 text-base">Feedback Trends</h2>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={formattedFeedbackTrends}>
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
    )
}

export default FeedbackTrends