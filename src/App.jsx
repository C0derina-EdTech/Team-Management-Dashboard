import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, auth, storage } from './services/firebase';
import { firestoreRules } from './utils/constants';

import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import CoachDashboard from './pages/CoachDashboard';
import RegistrationForm from './pages/RegistrationForm';
import ManageTeamPage from './pages/ManageTeamPage';
import PermissionErrorOverlay from './components/modals/PermissionErrorOverlay';

export default function App() {
    const [view, setView] = useState({ name: 'loading' });
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authReady, setAuthReady] = useState(false);
    const [permissionError, setPermissionError] = useState(false);
    const [teams, setTeams] = useState([]);
    const [competitions, setCompetitions] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState({ teams: true, competitions: true, events: true });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                setIsAdmin(false);
                setView({ name: 'auth' });
                setAuthReady(true);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const userDocRef = doc(db, 'users', user.uid);
        getDoc(userDocRef).then(userDoc => {
            if (userDoc.exists() && userDoc.data().admin) {
                setIsAdmin(true);
                setView({ name: 'admin' });
            } else {
                setIsAdmin(false);
                setView({ name: 'coach_dashboard' });
            }
        }).catch(error => {
            console.error("Error fetching user role:", error);
            if (error.code === 'permission-denied') setPermissionError(true);
            setIsAdmin(false);
            setView({ name: 'coach_dashboard' });
        }).finally(() => {
            setAuthReady(true);
        });
    }, [user]);

    useEffect(() => {
        if (!authReady || !user) return;

        const handlePermissionError = (error, type) => {
            if (error.code === 'permission-denied') {
                console.error(`Permission denied for ${type}. Check Firestore rules.`);
                setPermissionError(true);
            } else {
                console.error(`${type} listener error:`, error);
            }
        };

        const compsUnsub = onSnapshot(collection(db, 'competitions'), 
            (snap) => { setCompetitions(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({ ...p, competitions: false })); }, 
            (err) => handlePermissionError(err, 'competitions')
        );

        const eventsUnsub = onSnapshot(collection(db, 'events'), 
            (snap) => { setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({ ...p, events: false })); },
            (err) => handlePermissionError(err, 'events')
        );

        let teamsUnsub;
        if (isAdmin) {
            teamsUnsub = onSnapshot(collection(db, 'teams'), 
                (snap) => { setTeams(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setIsLoading(p => ({ ...p, teams: false })); }, 
                (err) => handlePermissionError(err, 'admin teams')
            );
        } else {
            setIsLoading(p => ({ ...p, teams: false }));
        }

        return () => {
            compsUnsub();
            eventsUnsub();
            if (teamsUnsub) teamsUnsub();
        };
    }, [authReady, user, isAdmin]);
  
    const renderView = () => {
        if (!authReady) {
            return <div className="min-h-screen flex items-center justify-center">Initializing...</div>
        }

        switch(view.name) {
            case 'auth': return <AuthPage auth={auth} db={db} />;
            case 'admin': return <AdminDashboard teams={teams} competitions={competitions} events={events} isLoading={isLoading} db={db} auth={auth} />;
            case 'coach_dashboard': return <CoachDashboard db={db} auth={auth} setView={setView} events={events} competitions={competitions} />;
            case 'register': return <RegistrationForm competitions={competitions} db={db} auth={auth} setView={setView} initialData={view.cloneData} editData={view.editData} />;
            case 'manage_team': return <ManageTeamPage db={db} storage={storage} teamId={view.teamId} setView={setView} competitions={competitions} />;
            default: return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            {permissionError && <PermissionErrorOverlay rules={firestoreRules} />}
            {renderView()}
        </div>
    );
}
