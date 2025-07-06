import React, { useState, useEffect } from 'react';
import { XIcon } from '../common/Icons';

const CompetitionModal = ({ isOpen, onClose, onSave, competition }) => {
    const [formData, setFormData] = useState({ name: '', rules: { minCoaches: 0, maxCoaches: 0, minStudents: 0, maxStudents: 0 } });
    
    useEffect(() => { 
        if (competition) setFormData(competition); 
        else setFormData({ name: '', rules: { minCoaches: 0, maxCoaches: 0, minStudents: 0, maxStudents: 0 } }); 
    }, [competition, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleRuleChange = (e) => setFormData(p => ({ ...p, rules: { ...p.rules, [e.target.name]: Number(e.target.value) } }));
    const handleSave = () => { onSave(formData); onClose(); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{competition ? 'Edit' : 'Add'} Competition</h2>
                    <button onClick={onClose}><XIcon /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label>Min Students</label><input type="number" name="minStudents" value={formData.rules.minStudents} onChange={handleRuleChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                        <div><label>Max Students</label><input type="number" name="maxStudents" value={formData.rules.maxStudents} onChange={handleRuleChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                        <div><label>Min Coaches</label><input type="number" name="minCoaches" value={formData.rules.minCoaches} onChange={handleRuleChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                        <div><label>Max Coaches</label><input type="number" name="maxCoaches" value={formData.rules.maxCoaches} onChange={handleRuleChange} className="mt-1 block w-full border-gray-300 rounded-md p-2" /></div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-200 py-2 px-4 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save</button>
                </div>
            </div>
        </div>
    );
};

export default CompetitionModal;
