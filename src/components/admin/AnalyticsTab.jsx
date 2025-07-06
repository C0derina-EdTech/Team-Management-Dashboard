import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsTab = ({ teams }) => {
    const stateData = teams.reduce((acc, team) => {
        const state = team.state || "Unknown";
        acc[state] = (acc[state] || 0) + 1;
        return acc;
    }, {});

    const stateChartData = Object.keys(stateData).map(state => ({
        name: state,
        teams: stateData[state]
    })).sort((a,b) => b.teams - a.teams);

    const competitionData = teams.reduce((acc, team) => {
        const comp = team.competition || "Unknown";
        acc[comp] = (acc[comp] || 0) + 1;
        return acc;
    }, {});
    
    const competitionChartData = Object.keys(competitionData).map(comp => ({
        name: comp,
        value: competitionData[comp]
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    if (teams.length === 0) {
        return <div className="text-center py-16 text-gray-500">No data available to generate analytics.</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-4">Teams by State</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stateChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="teams" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="p-4 border rounded-lg">
                <h3 className="font-bold mb-4">Competition Breakdown</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={competitionChartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {competitionChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsTab;
