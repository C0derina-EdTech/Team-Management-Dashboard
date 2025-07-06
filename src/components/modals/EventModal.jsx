import React, { useState, useEffect } from 'react';
import { XIcon } from '../common/Icons';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';

const EventModal = ({ isOpen, onClose, onSave, event, competitions }) => {
    const [formData, setFormData] = useState({ name: '', competitionId: '', startDate: '', endDate: '', location: '', description: '' });
    
    useEffect(() => {
        if (event) setFormData(event);
        else setFormData({ name: '', competitionId: '', startDate: '', endDate: '', location: '', description: '' });
    }, [event, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleSave = () => { onSave(formData); onClose(); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{event ? 'Edit' : 'Add'} Event</h2>
                    <button onClick={onClose}><XIcon /></button>
                </div>
                <div className="space-y-4">
                    <Input label="Event Name" name="name" value={formData.name} onChange={handleChange} />
                    <Select label="Associated Competition" name="competitionId" value={formData.competitionId} onChange={handleChange}>
                        <option value="">Select a competition</option>
                        {competitions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                        <Input label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
                    </div>
                    <Input label="Location (or 'Online')" name="location" value={formData.location} onChange={handleChange} />
                    <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} rows="3" />
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-200 py-2 px-4 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save Event</button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
