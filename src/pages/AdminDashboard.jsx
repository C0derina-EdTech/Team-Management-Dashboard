import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import { UsersIcon, CheckCircleIcon, ClockIcon, LogoutIcon, DownloadIcon } from '../components/common/Icons';
import CompetitionsTab from '../components/admin/CompetitionsTab';
import EventsTab from '../components/admin/EventsTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';
import TeamDetailModal from '../components/modals/TeamDetailModal';

const AdminDashboard = ({ teams, competitions, events, isLoading, db, auth }) => {
    const [activeTab, setActiveTab] = useState('teams');
    const [filter, setFilter] = useState('All Competitions');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleViewTeam = (team) => {
        setSelectedTeam(team);
        setIsDetailModalOpen(true);
    };

    const filteredTeams = teams
        .filter(t => filter === 'All Competitions' || t.competition === filter)
        .filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.leader.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const competitionOptions = ["All Competitions", ...competitions.map(c => c.name)];
    
    const handleExportCSV = () => {
        const headers = ["Team Name", "Leader", "Competition", "Students", "State", "Region", "Status"];
        const rows = filteredTeams.map(team => 
            [
                `"${team.name.replace(/"/g, '""')}"`,
                `"${team.leader.replace(/"/g, '""')}"`,
                `"${team.competition.replace(/"/g, '""')}"`,
                team.students,
                team.state,
                team.region,
                team.status
            ].join(',')
        );

        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(',') + "\n" 
            + rows.join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "teams_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage registrations and competitions.</p>
                    </div>
                    <button onClick={() => signOut(auth)} className="flex items-center bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 mt-4 md:mt-0">
                        <LogoutIcon /> Logout
                    </button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Teams" value={isLoading.teams ? '...' : teams.length} icon={<UsersIcon />} color="blue" />
                    <StatCard title="Approved Teams" value={isLoading.teams ? '...' : teams.filter(t=>t.status==='Approved').length} icon={<CheckCircleIcon />} color="green" />
                    <StatCard title="Pending Review" value={isLoading.teams ? '...' : teams.filter(t=>t.status==='Pending').length} icon={<ClockIcon />} color="yellow" />
                </div>
                <main className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
                    <div className="border-b mb-6">
                        <nav className="-mb-px flex space-x-6">
                            <button onClick={() => setActiveTab('teams')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'teams' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Team Management</button>
                            <button onClick={() => setActiveTab('competitions')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'competitions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Competitions</button>
                            <button onClick={() => setActiveTab('events')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'events' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Events</button>
                            <button onClick={() => setActiveTab('analytics')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>Analytics</button>
                        </nav>
                    </div>
                    {activeTab === 'teams' && (
                        <div>
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="relative flex-grow">
                                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white border rounded-lg py-2 px-4">
                                    {competitionOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <button onClick={handleExportCSV} className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-700">
                                    <DownloadIcon /> Export CSV
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                {isLoading.teams ? <div className="text-center py-16">Loading...</div> : 
                                    <table className="min-w-full divide-y">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Team Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Competition</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Students</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">State</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y">
                                            {filteredTeams.map((team) => (
                                                <tr key={team.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium">{team.name}</div>
                                                        <div className="text-sm text-gray-500">{team.leader}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">{team.competition}</td>
                                                    <td className="px-6 py-4 text-sm">{team.students}</td>
                                                    <td className="px-6 py-4 text-sm">{team.state}</td>
                                                    <td className="px-6 py-4"><StatusBadge status={team.status} /></td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button onClick={() => handleViewTeam(team)} className="text-blue-600 hover:text-blue-900">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    )}
                    {activeTab === 'competitions' && <CompetitionsTab competitions={competitions} isLoading={isLoading.competitions} db={db} />}
                    {activeTab === 'events' && <EventsTab events={events} competitions={competitions} isLoading={isLoading.events} db={db} />}
                    {activeTab === 'analytics' && <AnalyticsTab teams={teams} />}
                </main>
            </div>
            <TeamDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} team={selectedTeam} db={db} />
        </>
    );
};

export default AdminDashboard;
