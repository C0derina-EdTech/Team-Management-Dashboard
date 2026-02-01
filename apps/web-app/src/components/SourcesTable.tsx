import { useState } from 'react';
import { TrendingUp, TrendingDown, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

interface Source {
    id: string;
    name: string;
    type: string;
    opportunities: number;
    conversions: number;
    revenue: string;
    conversionRate: number;
    trend: 'up' | 'down';
    trendValue: string;
    status: 'active' | 'paused';
}

const mockSources: Source[] = [
    {
        id: '1',
        name: 'LinkedIn Referrals',
        type: 'Social Media',
        opportunities: 145,
        conversions: 58,
        revenue: '$142,500',
        conversionRate: 40.0,
        trend: 'up',
        trendValue: '+12%',
        status: 'active',
    },
    {
        id: '2',
        name: 'Email Newsletter',
        type: 'Email Campaign',
        opportunities: 238,
        conversions: 89,
        revenue: '$218,900',
        conversionRate: 37.4,
        trend: 'up',
        trendValue: '+8%',
        status: 'active',
    },
    {
        id: '3',
        name: 'Industry Conference 2025',
        type: 'Event',
        opportunities: 89,
        conversions: 34,
        revenue: '$98,200',
        conversionRate: 38.2,
        trend: 'up',
        trendValue: '+15%',
        status: 'active',
    },
    {
        id: '4',
        name: 'Partner Referrals',
        type: 'Referral',
        opportunities: 167,
        conversions: 71,
        revenue: '$185,400',
        conversionRate: 42.5,
        trend: 'up',
        trendValue: '+5%',
        status: 'active',
    },
    {
        id: '5',
        name: 'Google Ads',
        type: 'Paid Advertising',
        opportunities: 312,
        conversions: 98,
        revenue: '$156,800',
        conversionRate: 31.4,
        trend: 'down',
        trendValue: '-3%',
        status: 'active',
    },
    {
        id: '6',
        name: 'Website Contact Form',
        type: 'Direct',
        opportunities: 198,
        conversions: 67,
        revenue: '$124,300',
        conversionRate: 33.8,
        trend: 'up',
        trendValue: '+7%',
        status: 'active',
    },
    {
        id: '7',
        name: 'Facebook Ads',
        type: 'Paid Advertising',
        opportunities: 156,
        conversions: 42,
        revenue: '$78,900',
        conversionRate: 26.9,
        trend: 'down',
        trendValue: '-5%',
        status: 'paused',
    },
    {
        id: '8',
        name: 'Webinar Series',
        type: 'Event',
        opportunities: 124,
        conversions: 51,
        revenue: '$132,600',
        conversionRate: 41.1,
        trend: 'up',
        trendValue: '+18%',
        status: 'active',
    },
];

export function SourcesTable() {
    const [sources] = useState<Source[]>(mockSources);
    const [selectedSource, setSelectedSource] = useState<string | null>(null);

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            'Social Media': 'bg-blue-100 text-blue-700',
            'Email Campaign': 'bg-purple-100 text-purple-700',
            'Event': 'bg-green-100 text-green-700',
            'Referral': 'bg-orange-100 text-orange-700',
            'Paid Advertising': 'bg-red-100 text-red-700',
            'Direct': 'bg-gray-100 text-gray-700',
        };
        return colors[type] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Opportunity Sources</h2>
                        <p className="text-sm text-gray-600 mt-1">Track and manage all your lead sources</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Add Source
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Source Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Opportunities
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Conversions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Conv. Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Revenue
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trend
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sources.map((source) => (
                            <tr key={source.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{source.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(source.type)}`}>
                                        {source.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                    {source.opportunities}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                    {source.conversions}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${source.conversionRate}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-900">{source.conversionRate}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                                    {source.revenue}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className={`flex items-center gap-1 ${source.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {source.trend === 'up' ? (
                                            <TrendingUp className="w-4 h-4" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4" />
                                        )}
                                        <span className="text-sm font-medium">{source.trendValue}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${source.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {source.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="relative">
                                        <button
                                            onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
                                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-500" />
                                        </button>

                                        {selectedSource === source.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                                    <Edit className="w-4 h-4" />
                                                    Edit Source
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete Source
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">1-8</span> of <span className="font-medium">{sources.length}</span> sources
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
