import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { validateEvent, validatePublication, validateCommittee } from './schemas';
import type { EventItem, PublicationItem, CommitteeItem } from './schemas';

// Collections names
export const COLLECTIONS = {
  events: 'events',
  publications: 'publications',
  facultyCommittee: 'faculty_committee',
  studentCommittee: 'student_committee',
  exCommittee: 'ex_committee',
} as const;

// ============ EVENTS ============
export async function getEventsFromFirebase(): Promise<EventItem[]> {
  try {
    const collectionRef = collection(db, COLLECTIONS.events);
    let q;
    try {
      q = query(collectionRef, orderBy('date', 'asc'));
    } catch {
      // If orderBy fails (empty collection), just get without order
      q = collectionRef;
    }
    const querySnapshot = await getDocs(q);
    const events = querySnapshot.docs
      .map((doc) => validateEvent({ ...doc.data(), _id: doc.id }))
      .filter((event) => event !== null) as EventItem[];
    return events;
  } catch (error) {
    console.error('Error fetching events from Firebase:', error);
    return [];
  }
}

export async function saveEventToFirebase(event: EventItem): Promise<string | null> {
  try {
    console.log('Saving event to Firebase:', event);
    const { _id, ...eventData } = event; // Remove _id if present
    const docRef = await addDoc(collection(db, COLLECTIONS.events), {
      ...eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('Event saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving event to Firebase:', error);
    return null;
  }
}

export async function updateEventInFirebase(eventId: string, event: Partial<EventItem>): Promise<boolean> {
  try {
    const { _id, ...eventData } = event; // Remove _id if present
    await updateDoc(doc(db, COLLECTIONS.events, eventId), {
      ...eventData,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating event in Firebase:', error);
    return false;
  }
}

export async function deleteEventFromFirebase(eventId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.events, eventId));
    return true;
  } catch (error) {
    console.error('Error deleting event from Firebase:', error);
    return false;
  }
}

// ============ PUBLICATIONS ============
export async function getPublicationsFromFirebase(): Promise<PublicationItem[]> {
  try {
    const collectionRef = collection(db, COLLECTIONS.publications);
    let q;
    try {
      q = query(collectionRef, orderBy('year', 'desc'));
    } catch {
      q = collectionRef;
    }
    const querySnapshot = await getDocs(q);
    const publications = querySnapshot.docs
      .map((doc) => validatePublication({ ...doc.data(), _id: doc.id }))
      .filter((pub) => pub !== null) as PublicationItem[];
    return publications;
  } catch (error) {
    console.error('Error fetching publications from Firebase:', error);
    return [];
  }
}

export async function savePublicationToFirebase(publication: PublicationItem): Promise<string | null> {
  try {
    console.log('Saving publication to Firebase:', publication);
    const { _id, ...pubData } = publication; // Remove _id if present
    const docRef = await addDoc(collection(db, COLLECTIONS.publications), {
      ...pubData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('Publication saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving publication to Firebase:', error);
    return null;
  }
}

export async function updatePublicationInFirebase(pubId: string, publication: Partial<PublicationItem>): Promise<boolean> {
  try {
    const { _id, ...pubData } = publication; // Remove _id if present
    await updateDoc(doc(db, COLLECTIONS.publications, pubId), {
      ...pubData,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating publication in Firebase:', error);
    return false;
  }
}

export async function deletePublicationFromFirebase(pubId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTIONS.publications, pubId));
    return true;
  } catch (error) {
    console.error('Error deleting publication from Firebase:', error);
    return false;
  }
}

// ============ COMMITTEE MEMBERS ============
export async function getFacultyCommitteeFromFirebase(): Promise<CommitteeItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.facultyCommittee));
    const members = querySnapshot.docs
      .map((doc) => validateCommittee({ ...doc.data(), _id: doc.id }))
      .filter((member) => member !== null) as CommitteeItem[];
    return members;
  } catch (error) {
    console.error('Error fetching faculty committee from Firebase:', error);
    return [];
  }
}

export async function getStudentCommitteeFromFirebase(): Promise<CommitteeItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.studentCommittee));
    const members = querySnapshot.docs
      .map((doc) => validateCommittee({ ...doc.data(), _id: doc.id }))
      .filter((member) => member !== null) as CommitteeItem[];
    return members;
  } catch (error) {
    console.error('Error fetching student committee from Firebase:', error);
    return [];
  }
}

export async function getExCommitteeFromFirebase(): Promise<CommitteeItem[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.exCommittee));
    const members = querySnapshot.docs
      .map((doc) => validateCommittee({ ...doc.data(), _id: doc.id }))
      .filter((member) => member !== null) as CommitteeItem[];
    return members;
  } catch (error) {
    console.error('Error fetching ex committee from Firebase:', error);
    return [];
  }
}

// Generic committee save
async function saveCommitteeMemberToFirebase(
  collectionName: string,
  member: CommitteeItem
): Promise<string | null> {
  try {
    console.log('Saving committee member to', collectionName, ':', member);
    const { _id, ...memberData } = member; // Remove _id if present
    const docRef = await addDoc(collection(db, collectionName), {
      ...memberData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('Committee member saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error(`Error saving committee member to ${collectionName}:`, error);
    return null;
  }
}

export async function saveFacultyMemberToFirebase(member: CommitteeItem): Promise<string | null> {
  return saveCommitteeMemberToFirebase(COLLECTIONS.facultyCommittee, member);
}

export async function saveStudentMemberToFirebase(member: CommitteeItem): Promise<string | null> {
  return saveCommitteeMemberToFirebase(COLLECTIONS.studentCommittee, member);
}

export async function saveExMemberToFirebase(member: CommitteeItem): Promise<string | null> {
  return saveCommitteeMemberToFirebase(COLLECTIONS.exCommittee, member);
}

// Generic committee update
async function updateCommitteeMemberInFirebase(
  collectionName: string,
  memberId: string,
  member: Partial<CommitteeItem>
): Promise<boolean> {
  try {
    const { _id, ...memberData } = member; // Remove _id if present
    await updateDoc(doc(db, collectionName, memberId), {
      ...memberData,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error(`Error updating committee member in ${collectionName}:`, error);
    return false;
  }
}

export async function updateFacultyMemberInFirebase(memberId: string, member: Partial<CommitteeItem>): Promise<boolean> {
  return updateCommitteeMemberInFirebase(COLLECTIONS.facultyCommittee, memberId, member);
}

export async function updateStudentMemberInFirebase(memberId: string, member: Partial<CommitteeItem>): Promise<boolean> {
  return updateCommitteeMemberInFirebase(COLLECTIONS.studentCommittee, memberId, member);
}

export async function updateExMemberInFirebase(memberId: string, member: Partial<CommitteeItem>): Promise<boolean> {
  return updateCommitteeMemberInFirebase(COLLECTIONS.exCommittee, memberId, member);
}

// Generic committee delete
async function deleteCommitteeMemberFromFirebase(collectionName: string, memberId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, collectionName, memberId));
    return true;
  } catch (error) {
    console.error(`Error deleting committee member from ${collectionName}:`, error);
    return false;
  }
}

export async function deleteFacultyMemberFromFirebase(memberId: string): Promise<boolean> {
  return deleteCommitteeMemberFromFirebase(COLLECTIONS.facultyCommittee, memberId);
}

export async function deleteStudentMemberFromFirebase(memberId: string): Promise<boolean> {
  return deleteCommitteeMemberFromFirebase(COLLECTIONS.studentCommittee, memberId);
}

export async function deleteExMemberFromFirebase(memberId: string): Promise<boolean> {
  return deleteCommitteeMemberFromFirebase(COLLECTIONS.exCommittee, memberId);
}

// ============ FILE UPLOAD ============
export async function uploadImageToStorage(file: File, path: string): Promise<string | null> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function deleteImageFromStorage(imagePath: string): Promise<boolean> {
  try {
    const fileRef = ref(storage, imagePath);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}
