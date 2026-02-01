import { TrendingUp, TrendingDown, DollarSign, Users, Target, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', opportunities: 45, conversions: 12 },
  { month: 'Feb', opportunities: 52, conversions: 18 },
  { month: 'Mar', opportunities: 61, conversions: 22 },
  { month: 'Apr', opportunities: 58, conversions: 19 },
  { month: 'May', opportunities: 72, conversions: 28 },
  { month: 'Jun', opportunities: 85, conversions: 34 },
];

const sourceDistribution = [
  { name: 'Referrals', value: 35, color: '#3b82f6' },
  { name: 'Social Media', value: 25, color: '#8b5cf6' },
  { name: 'Email Campaigns', value: 20, color: '#10b981' },
  { name: 'Events', value: 12, color: '#f59e0b' },
  { name: 'Direct', value: 8, color: '#ef4444' },
];

export function AnalyticsSection() {
  const metrics = [
    {
      label: 'Total Opportunities',
      value: '1,284',
      change: '+12.5%',
      trend: 'up',
      icon: Target,
      color: 'blue',
    },
    {
      label: 'Conversion Rate',
      value: '38.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Activity,
      color: 'green',
    },
    {
      label: 'Active Sources',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'purple',
    },
    {
      label: 'Revenue Generated',
      value: '$485k',
      change: '-2.1%',
      trend: 'down',
      icon: DollarSign,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const bgColorMap: Record<string, string> = {
            blue: 'bg-blue-100',
            green: 'bg-green-100',
            purple: 'bg-purple-100',
            orange: 'bg-orange-100',
          };
          const textColorMap: Record<string, string> = {
            blue: 'text-blue-600',
            green: 'text-green-600',
            purple: 'text-purple-600',
            orange: 'text-orange-600',
          };

          return (
            <div key={metric.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${bgColorMap[metric.color]} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${textColorMap[metric.color]}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-3xl font-semibold mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Opportunities Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="opportunities" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Opportunities"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Conversions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Source Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart - Full Width */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="opportunities" fill="#3b82f6" name="Opportunities" radius={[8, 8, 0, 0]} />
            <Bar dataKey="conversions" fill="#10b981" name="Conversions" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
