import React, { useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import CompetitionModal from '../modals/CompetitionModal';
import { PlusIcon } from '../common/Icons';

const CompetitionsTab = ({ competitions, isLoading, db }) => {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [editing, setEditing] = useState(null);

    const handleSave = async (data) => { 
        if (!db) return; 
        if (data.id) await updateDoc(doc(db, 'competitions', data.id), data); 
        else await addDoc(collection(db, 'competitions'), data); 
    };

    const handleDelete = async (id) => { 
        if(window.confirm("Are you sure?")) await deleteDoc(doc(db, 'competitions', id)); 
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Manage Competitions</h3>
                <button onClick={() => {setEditing(null); setIsModalOpen(true)}} className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg"><PlusIcon /> Add New</button>
            </div>
            {isLoading ? <div className="text-center py-16">Loading...</div> : 
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competitions.map(c => (
                        <div key={c.id} className="bg-gray-50 border rounded-lg p-6">
                            <h4 className="font-bold">{c.name}</h4>
                            <div className="text-sm mt-4 space-y-2">
                                <p><strong>Students:</strong> {c.rules.minStudents} - {c.rules.maxStudents}</p>
                                <p><strong>Coaches:</strong> {c.rules.minCoaches} - {c.rules.maxCoaches}</p>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button onClick={() => {setEditing(c); setIsModalOpen(true)}} className="text-sm text-blue-600">Edit</button>
                                <button onClick={() => handleDelete(c.id)} className="text-sm text-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <CompetitionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} competition={editing} />
        </div>
    );
};

export default CompetitionsTab;
