import React, { useState, useEffect } from 'react';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import StatusBadge from '../components/common/StatusBadge';
import { LogoutIcon } from '../components/common/Icons';

const CoachDashboard = ({ db, auth, setView, events, competitions }) => {
    const [myTeams, setMyTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth.currentUser) return;
        const q = query(collection(db, "teams"), where("leadCoachId", "==", auth.currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const teamsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMyTeams(teamsData);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching coach's teams: ", error);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [db, auth.currentUser]);

    const handleClone = (teamToClone) => {
        setView({ name: 'register', cloneData: teamToClone });
    };
    
    const myCompetitionNames = [...new Set(myTeams.map(t => t.competition))];
    const myCompetitionIds = competitions.filter(c => myCompetitionNames.includes(c.name)).map(c => c.id);
    const relevantEvents = events.filter(e => myCompetitionIds.includes(e.competitionId));

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage your registered teams and view upcoming events.</p>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <button onClick={() => setView({ name: 'register' })} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700">Register New Team</button>
                    <button onClick={() => signOut(auth)} className="flex items-center bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">
                        <LogoutIcon /> Logout
                    </button>
                </div>
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">My Teams</h2>
                    <div className="overflow-x-auto">
                        {isLoading ? <div className="text-center py-16">Loading your teams...</div> : 
                            <table className="min-w-full divide-y">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase">Team Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase">Competition</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {myTeams.map((team) => (
                                        <tr key={team.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium">{team.name}</td>
                                            <td className="px-6 py-4 text-sm">{team.competition}</td>
                                            <td className="px-6 py-4"><StatusBadge status={team.status} /></td>
                                            <td className="px-6 py-4 text-right text-sm space-x-4">
                                                <button onClick={() => handleClone(team)} className="text-green-600 hover:text-green-900 font-medium">Clone</button>
                                                <button onClick={() => setView({ name: 'manage_team', teamId: team.id })} className="text-blue-600 hover:text-blue-900 font-medium">Manage</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                        {relevantEvents.length > 0 ? relevantEvents.map(event => (
                            <div key={event.id} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <h4 className="font-bold">{event.name}</h4>
                                <p className="text-sm text-gray-600">{new Date(event.startDate).toDateString()}</p>
                                <p className="text-xs mt-1">{event.description}</p>
                            </div>
                        )) : <p className="text-sm text-gray-500">No upcoming events for your competitions.</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CoachDashboard;
