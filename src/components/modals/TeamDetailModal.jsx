import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { XIcon, FileIcon } from '../common/Icons';
import StatusBadge from '../common/StatusBadge';

const TeamDetailModal = ({ isOpen, onClose, team, db }) => {
    if (!isOpen || !team) return null;

    const handleUpdateStatus = async (status) => { 
        if (!db || !team.id) return; 
        const teamRef = doc(db, 'teams', team.id); 
        try { 
            await updateDoc(teamRef, { status }); 
            onClose(); 
        } catch (error) { 
            console.error(error); 
            alert("Failed to update status."); 
        } 
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">{team.name}</h2>
                        <p>{team.competition}</p>
                    </div>
                    <button onClick={onClose}><XIcon /></button>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Details</h4>
                        <p><strong>Lead:</strong> {team.leader}</p>
                        <p><strong>State:</strong> {team.state}</p>
                        <p><strong>Status:</strong> <StatusBadge status={team.status} /></p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Composition</h4>
                        <p><strong>Students:</strong> {team.members?.filter(m => m.role === 'Student').length || 0}</p>
                        <p><strong>Coaches:</strong> {team.members?.filter(m => m.role.includes('Coach')).length || 0}</p>
                    </div>
                </div>
                <div className="mb-6">
                    <h4 className="font-bold mb-3">Members</h4>
                    <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left py-2 px-4 text-sm font-medium">Name</th>
                                    <th className="text-left py-2 px-4 text-sm font-medium">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {team.members?.map((m, i) => (
                                    <tr key={i}>
                                        <td className="py-3 px-4">{m.name}</td>
                                        <td className="py-3 px-4">{m.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mb-6">
                    <h4 className="font-bold mb-3">Uploaded Documents</h4>
                    {team.documents && team.documents.length > 0 ? (
                        <ul className="space-y-2">
                            {team.documents.map((doc, i) => (
                                <li key={i} className="flex items-center bg-gray-50 p-2 rounded-lg">
                                    <FileIcon />
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="ml-3 font-medium text-blue-600 hover:underline">{doc.name}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">No documents uploaded.</p>
                    )}
                </div>
                {team.status === 'Pending' && (
                    <div className="mt-8 flex justify-end space-x-4">
                        <button onClick={() => handleUpdateStatus('Rejected')} className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg">Reject</button>
                        <button onClick={() => handleUpdateStatus('Approved')} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg">Approve</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamDetailModal;
