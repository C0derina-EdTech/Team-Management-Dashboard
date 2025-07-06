import React, { useState, useEffect } from 'react';
import { doc, addDoc, updateDoc, collection } from 'firebase/firestore';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { TrashIcon } from '../components/common/Icons';
import { NIGERIAN_STATES, REGIONS } from '../utils/constants';

const RegistrationForm = ({ competitions, db, auth, setView, initialData = null, editData = null }) => {
    const [step, setStep] = useState(1);
    const [teamData, setTeamData] = useState({ teamName: '', institution: '', state: '', region: '', competitionId: '', members: [] });
    const [selectedComp, setSelectedComp] = useState(null);

    useEffect(() => {
        const data = editData || initialData;
        if (data) {
            const initialTeamState = {
                teamName: editData ? data.name : `${data.name} (New Season)`,
                institution: data.institution || '',
                state: data.state || '',
                region: data.region || '',
                competitionId: editData ? competitions.find(c => c.name === data.competition)?.id || '' : '',
                members: data.members?.map(m => ({...m, tempId: Date.now() + Math.random()})) || []
            };
            setTeamData(initialTeamState);
            if(editData) {
                const currentComp = competitions.find(c => c.name === data.competition);
                setSelectedComp(currentComp || null);
            }
        }
    }, [initialData, editData, competitions]);


    const handleTeamDataChange = (e) => setTeamData(p => ({ ...p, [e.target.name]: e.target.value }));
    
    const handleCompetitionChange = (e) => {
        const compId = e.target.value;
        const comp = competitions.find(c => c.id === compId) || null;
        setSelectedComp(comp);
        setTeamData(p => ({ ...p, competitionId: compId }));
    };

    const addMember = (role) => {
        const newMember = { tempId: Date.now(), name: '', email: '', phone: '', dob: '', gender: '', role: role };
        if (role === 'Student') newMember.grade = '';
        setTeamData(p => ({ ...p, members: [...p.members, newMember] }));
    };

    const handleMemberChange = (tempId, e) => setTeamData(p => ({...p, members: p.members.map(m => m.tempId === tempId ? {...m, [e.target.name]: e.target.value} : m)}));
    
    const removeMember = (tempId) => setTeamData(p => ({...p, members: p.members.filter(m => m.tempId !== tempId)}));
    
    const handleSubmit = async () => {
        if (!db || !auth.currentUser) return alert("You must be logged in.");
        
        const { teamName, competitionId, members, ...rest } = teamData;
        const competition = competitions.find(c => c.id === competitionId);
        
        const finalData = {
            ...rest,
            name: teamName,
            competition: competition?.name || 'N/A',
            leader: members.find(m => m.role.includes('Coach') || m.role.includes('Leader'))?.name || 'N/A',
            students: members.filter(m => m.role === 'Student').length,
            members: members.map(({tempId, ...m}) => m),
            status: 'Pending',
            leadCoachId: auth.currentUser.uid,
        };

        try {
            if (editData) {
                const teamRef = doc(db, 'teams', editData.id);
                await updateDoc(teamRef, finalData);
                alert('Team updated successfully! Awaiting admin re-approval.');
                setView({ name: 'manage_team', teamId: editData.id });
            } else {
                finalData.createdAt = new Date();
                finalData.documents = [];
                await addDoc(collection(db, 'teams'), finalData);
                alert('Team registered successfully! Awaiting admin approval.');
                setView({ name: 'coach_dashboard' });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('Submission failed. Please try again.');
        }
    };

    const students = teamData.members.filter(m => m.role === 'Student');
    const coaches = teamData.members.filter(m => m.role.includes('Coach'));
    const canAddStudent = selectedComp && students.length < selectedComp.rules.maxStudents;
    const canAddCoach = selectedComp && coaches.length < selectedComp.rules.maxCoaches;
    const formTitle = editData ? 'Edit Team' : initialData ? 'Clone Team for New Season' : 'Team Registration';

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">{formTitle}</h1>
                <p className="text-gray-600 mt-1">Register your team for a Coderina competition.</p>
            </header>
            <div className="bg-white p-8 rounded-2xl shadow-md">
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Step 1: Team Information</h2>
                        <Input label="Team Name" name="teamName" value={teamData.teamName} onChange={handleTeamDataChange} />
                        <Input label="Institution/School" name="institution" value={teamData.institution} onChange={handleTeamDataChange} />
                        <Select label="State" name="state" value={teamData.state} onChange={handleTeamDataChange}>
                            <option value="">Select State</option>
                            {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </Select>
                        <Select label="Region" name="region" value={teamData.region} onChange={handleTeamDataChange}>
                            <option value="">Select Region</option>
                            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </Select>
                        <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">Next</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 2: Select Competition</h2>
                        <Select label="Competition" name="competitionId" value={teamData.competitionId} onChange={handleCompetitionChange}>
                            <option value="">Select a competition</option>
                            {competitions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </Select>
                        {selectedComp && 
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800">
                                Rules: {selectedComp.rules.minStudents}-{selectedComp.rules.maxStudents} students, {selectedComp.rules.minCoaches}-{selectedComp.rules.maxCoaches} coaches.
                            </div>
                        }
                        <div className="flex justify-between mt-6">
                            <button onClick={() => setStep(1)} className="bg-gray-200 py-2 px-6 rounded-lg">Back</button>
                            <button onClick={() => setStep(3)} disabled={!selectedComp} className="bg-blue-600 text-white py-2 px-6 rounded-lg disabled:bg-gray-400">Next</button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 3: Add Team Members</h2>
                        <div className="mb-6">
                            <h3 className="font-bold">Coaches ({coaches.length} / {selectedComp?.rules.maxCoaches || 'N/A'})</h3>
                            {coaches.map(m => (
                                <div key={m.tempId} className="p-4 border rounded-lg mt-2 space-y-2 relative">
                                    <button onClick={() => removeMember(m.tempId)} className="absolute top-2 right-2"><TrashIcon/></button>
                                    <Input label="Full Name" name="name" value={m.name} onChange={(e) => handleMemberChange(m.tempId, e)} />
                                    <Input label="Email" name="email" type="email" value={m.email} onChange={(e) => handleMemberChange(m.tempId, e)} />
                                </div>
                            ))}
                            {canAddCoach && <button onClick={() => addMember('Lead Coach')} className="mt-2 text-blue-600 font-semibold">Add Coach</button>}
                        </div>
                        <div>
                            <h3 className="font-bold">Students ({students.length} / {selectedComp?.rules.maxStudents || 'N/A'})</h3>
                            {students.map(m => (
                                <div key={m.tempId} className="p-4 border rounded-lg mt-2 space-y-2 relative">
                                    <button onClick={() => removeMember(m.tempId)} className="absolute top-2 right-2"><TrashIcon/></button>
                                    <Input label="Full Name" name="name" value={m.name} onChange={(e) => handleMemberChange(m.tempId, e)} />
                                    <Input label="Grade/Class" name="grade" value={m.grade} onChange={(e) => handleMemberChange(m.tempId, e)} />
                                </div>
                            ))}
                            {canAddStudent && <button onClick={() => addMember('Student')} className="mt-2 text-blue-600 font-semibold">Add Student</button>}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={() => setStep(2)} className="bg-gray-200 py-2 px-6 rounded-lg">Back</button>
                            <button onClick={() => setStep(4)} className="bg-blue-600 text-white py-2 px-6 rounded-lg">Review</button>
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Step 4: Review & Submit</h2>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <p><strong>Team Name:</strong> {teamData.teamName}</p>
                            <p><strong>Competition:</strong> {selectedComp?.name}</p>
                            <p><strong>Members:</strong> {teamData.members.length}</p>
                            <ul>
                                {teamData.members.map(m => <li key={m.tempId} className="ml-4">- {m.name} ({m.role})</li>)}
                            </ul>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={() => setStep(3)} className="bg-gray-200 py-2 px-6 rounded-lg">Back</button>
                            <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-6 rounded-lg">Submit for Review</button>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={() => setView({name: 'coach_dashboard'})} className="text-center block w-full mt-8 text-blue-600">Back to Dashboard</button>
        </div>
    );
};

export default RegistrationForm;
