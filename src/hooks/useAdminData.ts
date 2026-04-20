import { useState, useEffect, useCallback } from 'react';
import {
  CommitteeItem,
  EventItem,
  PublicationItem,
  getEvents,
  getPublications,
  getExCommittee,
  getFacultyCommittee,
  getStudentCommittee,
  saveExCommittee,
  saveEvents,
  saveFacultyCommittee,
  savePublications,
  saveStudentCommittee,
} from '@/lib/admin-content';
import {
  getEventsFromFirebase,
  getPublicationsFromFirebase,
  getFacultyCommitteeFromFirebase,
  getStudentCommitteeFromFirebase,
  getExCommitteeFromFirebase,
} from '@/lib/firebaseService';

interface AdminData {
  publications: PublicationItem[];
  events: EventItem[];
  facultyCommittee: CommitteeItem[];
  studentCommittee: CommitteeItem[];
  exCommittee: CommitteeItem[];
  isLoading: boolean;
}

export function useAdminData() {
  const [data, setData] = useState<AdminData>({
    publications: [],
    events: [],
    facultyCommittee: [],
    studentCommittee: [],
    exCommittee: [],
    isLoading: false,
  });

  const loadAllContent = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, isLoading: true }));
      const [firebaseEvents, firebasePublications, firebaseFaculty, firebaseStudents, firebaseEx] = await Promise.all([
        getEventsFromFirebase(),
        getPublicationsFromFirebase(),
        getFacultyCommitteeFromFirebase(),
        getStudentCommitteeFromFirebase(),
        getExCommitteeFromFirebase(),
      ]);

      setData({
        publications: firebasePublications.length > 0 ? firebasePublications : getPublications(),
        events: firebaseEvents.length > 0 ? firebaseEvents : getEvents(),
        facultyCommittee: firebaseFaculty.length > 0 ? firebaseFaculty : getFacultyCommittee(),
        studentCommittee: firebaseStudents.length > 0 ? firebaseStudents : getStudentCommittee(),
        exCommittee: firebaseEx.length > 0 ? firebaseEx : getExCommittee(),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading content from Firebase:', error);
      setData({
        publications: getPublications(),
        events: getEvents(),
        facultyCommittee: getFacultyCommittee(),
        studentCommittee: getStudentCommittee(),
        exCommittee: getExCommittee(),
        isLoading: false,
      });
    }
  }, []);

  const syncPublications = useCallback((items: PublicationItem[]) => {
    setData((prev) => ({ ...prev, publications: items }));
    savePublications(items);
  }, []);

  const syncEvents = useCallback((items: EventItem[]) => {
    setData((prev) => ({ ...prev, events: items }));
    saveEvents(items);
  }, []);

  const syncFaculty = useCallback((items: CommitteeItem[]) => {
    setData((prev) => ({ ...prev, facultyCommittee: items }));
    saveFacultyCommittee(items);
  }, []);

  const syncStudents = useCallback((items: CommitteeItem[]) => {
    setData((prev) => ({ ...prev, studentCommittee: items }));
    saveStudentCommittee(items);
  }, []);

  const syncEx = useCallback((items: CommitteeItem[]) => {
    setData((prev) => ({ ...prev, exCommittee: items }));
    saveExCommittee(items);
  }, []);

  return {
    ...data,
    loadAllContent,
    syncPublications,
    syncEvents,
    syncFaculty,
    syncStudents,
    syncEx,
  };
}
