import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { UploadIcon, FileIcon, TrashIcon, EditIcon, PlusIcon } from '../components/common/Icons';
import AddMemberModal from '../components/modals/AddMemberModal';

const ManageTeamPage = ({ db, storage, teamId, setView, competitions }) => {
    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    useEffect(() => {
        const teamRef = doc(db, 'teams', teamId);
        const unsubscribe = onSnapshot(teamRef, (doc) => {
            if (doc.exists()) {
                setTeam({ id: doc.id, ...doc.data() });
            } else {
                console.error("No such team!");
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [db, teamId]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const storageRef = ref(storage, `documents/${teamId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        setUploading(true);
        
        uploadTask.on('state_changed', 
            (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100), 
            (error) => { console.error("Upload failed:", error); alert("Upload failed!"); setUploading(false); }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const teamRef = doc(db, 'teams', teamId);
                    await updateDoc(teamRef, { 
                        documents: arrayUnion({ 
                            name: file.name, 
                            url: downloadURL, 
                            path: storageRef.fullPath, 
                            uploadedAt: new Date() 
                        }) 
                    });
                    setUploading(false);
                });
            }
        );
    };
    
    const handleDeleteDocument = async (docToDelete) => {
        if (!window.confirm(`Are you sure you want to delete ${docToDelete.name}?`)) return;
        
        try {
            const fileRef = ref(storage, docToDelete.path);
            await deleteObject(fileRef);
            
            const teamRef = doc(db, 'teams', teamId);
            await updateDoc(teamRef, { documents: arrayRemove(docToDelete) });
            
            alert("Document deleted successfully.");
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Failed to delete document. It may have already been removed.");
        }
    };

    const handleAddMember = async (newMember) => {
        const teamRef = doc(db, 'teams', teamId);
        await updateDoc(teamRef, {
            members: arrayUnion(newMember),
            students: newMember.role === 'Student' ? (team.students || 0) + 1 : team.students
        });
    };

    const handleRemoveMember = async (memberToRemove) => {
        if (!window.confirm(`Are you sure you want to remove ${memberToRemove.name}?`)) return;
        
        const teamRef = doc(db, 'teams', teamId);
        await updateDoc(teamRef, {
            members: arrayRemove(memberToRemove),
            students: memberToRemove.role === 'Student' ? team.students - 1 : team.students
        });
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading Team Details...</div>;

    const competitionRules = competitions.find(c => c.name === team?.competition)?.rules;
    const isEditable = ['Pending', 'Rejected'].includes(team?.status);

    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <button onClick={() => setView({name: 'coach_dashboard'})} className="text-blue-600 hover:underline mb-4">&larr; Back to Dashboard</button>
                        <h1 className="text-3xl font-bold">{team?.name}</h1>
                        <p className="text-gray-600 mt-1">Manage your team members and documents.</p>
                    </div>
                    {isEditable && (
                         <button onClick={() => setView({ name: 'register', editData: team })} className="flex items-center mt-4 md:mt-0 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600">
                             <EditIcon /> Edit Team Details
                         </button>
                    )}
                </header>
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Document Uploads</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                            <label htmlFor="file-upload" className={`cursor-pointer flex flex-col items-center justify-center ${uploading ? 'opacity-50' : ''}`}>
                                <UploadIcon />
                                <span className="mt-2 text-sm font-medium text-gray-600">{uploading ? `Uploading: ${Math.round(progress)}%` : 'Click to upload a document'}</span>
                                <p className="text-xs text-gray-500">PDF, PNG, JPG, DOCX</p>
                            </label>
                            {uploading && 
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                                </div>
                            }
                        </div>
                        <div className="mt-8">
                            <h3 className="font-bold mb-3">Uploaded Files</h3>
                            <ul className="space-y-3">
                                {team?.documents?.map((doc, index) => (
                                    <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <FileIcon />
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="ml-3 font-medium text-blue-600 hover:underline">{doc.name}</a>
                                        </div>
                                        <button onClick={() => handleDeleteDocument(doc)} className="text-gray-400 hover:text-red-600 p-1"><TrashIcon /></button>
                                    </li>
                                ))}
                                {(!team?.documents || team.documents.length === 0) && 
                                    <p className="text-sm text-gray-500">No documents have been uploaded yet.</p>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Team Members</h2>
                            {isEditable && 
                                <button onClick={() => setIsAddMemberModalOpen(true)} className="flex items-center text-sm bg-blue-100 text-blue-700 font-semibold py-1 px-3 rounded-lg hover:bg-blue-200">
                                    <PlusIcon /> Add
                                </button>
                            }
                         </div>
                          <ul className="space-y-3">
                            {team?.members?.map((member, index) => (
                                <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-xs text-gray-500">{member.email}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">{member.role}</span>
                                        {isEditable && <button onClick={() => handleRemoveMember(member)} className="p-1 text-gray-400 hover:text-red-600"><TrashIcon /></button>}
                                    </div>
                                </li>
                            ))}
                         </ul>
                    </div>
                </main>
            </div>
            {competitionRules && 
                <AddMemberModal 
                    isOpen={isAddMemberModalOpen} 
                    onClose={() => setIsAddMemberModalOpen(false)} 
                    onSave={handleAddMember} 
                    team={team} 
                    competitionRules={competitionRules} 
                />
            }
        </>
    );
};

export default ManageTeamPage;
