import React, { useState } from 'react';
import { XIcon } from '../common/Icons';
import Input from '../common/Input';
import Select from '../common/Select';

const AddMemberModal = ({ isOpen, onClose, onSave, team, competitionRules }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('Student');

    if (!isOpen) return null;
    
    const studentsCount = team.members.filter(m => m.role === 'Student').length;
    const coachesCount = team.members.filter(m => m.role.includes('Coach')).length;

    const canAddStudent = studentsCount < competitionRules.maxStudents;
    const canAddCoach = coachesCount < competitionRules.maxCoaches;

    const handleSave = () => {
        if (!name) return alert("Please enter a name.");
        onSave({ name, role, email: '', phone: '', dob: '', gender: '' });
        setName('');
        setRole('Student');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Add New Member</h2>
                    <button onClick={onClose}><XIcon /></button>
                </div>
                <div className="space-y-4">
                    <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option disabled={!canAddStudent} value="Student">Student</option>
                        <option disabled={!canAddCoach} value="Lead Coach">Lead Coach</option>
                        <option disabled={!canAddCoach} value="Secondary Coach">Secondary Coach</option>
                    </Select>
                    {!canAddStudent && role === 'Student' && <p className="text-sm text-red-500">Maximum number of students reached.</p>}
                    {!canAddCoach && role.includes('Coach') && <p className="text-sm text-red-500">Maximum number of coaches reached.</p>}
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-200 py-2 px-4 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Add Member</button>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;
