import React from 'react';

const PermissionErrorOverlay = ({ rules }) => (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl text-left">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Permission Denied Error</h2>
            <p className="mb-4">The application could not fetch data from the database. This is most likely caused by incorrect Firestore Security Rules in your Firebase project.</p>
            <p className="mb-4">To fix this, please go to your Firebase Console, select your project, navigate to **Firestore Database {'>'} Rules**, and replace the existing rules with the following:</p>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                <code>{rules}</code>
            </pre>
            <p className="mt-4 text-sm text-gray-600">After updating the rules, please refresh the application.</p>
        </div>
    </div>
);

export default PermissionErrorOverlay;
