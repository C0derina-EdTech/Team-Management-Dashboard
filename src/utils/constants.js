export const NIGERIAN_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
export const REGIONS = ["North Central", "North East", "North West", "South East", "South South", "South West"];

export const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Logged-in users can read competitions and events
    match /competitions/{docId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
    match /events/{docId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
    // Team rules
    match /teams/{teamId} {
      // Admins can do anything
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
      // Coaches can create teams for themselves
      allow create: if request.auth != null && request.resource.data.leadCoachId == request.auth.uid;
      // Coaches can read and update their own teams
      allow read, update: if request.auth != null && resource.data.leadCoachId == request.auth.uid;
    }
  }
}`;
