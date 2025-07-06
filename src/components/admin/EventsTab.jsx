import React, { useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import EventModal from '../modals/EventModal';
import { PlusIcon } from '../common/Icons';

const EventsTab = ({ events, competitions, isLoading, db }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const handleSave = async (eventData) => {
        if (!db) return;
        if (eventData.id) {
            const eventRef = doc(db, 'events', eventData.id);
            await updateDoc(eventRef, eventData);
        } else {
            await addDoc(collection(db, 'events'), eventData);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this event?")){
            await deleteDoc(doc(db, 'events', id));
        }
    };

    const getCompetitionName = (id) => competitions.find(c => c.id === id)?.name || "N/A";

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Manage Events</h3>
                <button onClick={() => { setEditingEvent(null); setIsModalOpen(true); }} className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg"><PlusIcon /> Add Event</button>
            </div>
            {isLoading ? <div className="text-center py-16">Loading events...</div> : (
                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-gray-50 border rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">{event.name}</h4>
                                <p className="text-sm text-blue-600 font-medium">{getCompetitionName(event.competitionId)}</p>
                                <p className="text-sm text-gray-600">{new Date(event.startDate).toDateString()} - {new Date(event.endDate).toDateString()}</p>
                                <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => { setEditingEvent(event); setIsModalOpen(true); }} className="text-sm text-blue-600">Edit</button>
                                <button onClick={() => handleDelete(event.id)} className="text-sm text-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} event={editingEvent} competitions={competitions} />
        </div>
    );
};

export default EventsTab;
