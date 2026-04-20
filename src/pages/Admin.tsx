import React, { useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLoginForm from '@/components/AdminLoginForm';
import PublicationManager from '@/components/admin/PublicationManager';
import EventManager from '@/components/admin/EventManager';
import CommitteeManager, { CommitteeForm, blankCommitteeForm } from '@/components/admin/CommitteeManager';
import { useAdminForm } from '@/hooks/useAdminForm';
import { useAdminData } from '@/hooks/useAdminData';
import { CommitteeItem } from '@/lib/admin-content';
import {
  saveFacultyMemberToFirebase,
  updateFacultyMemberInFirebase,
  deleteFacultyMemberFromFirebase,
  saveStudentMemberToFirebase,
  updateStudentMemberInFirebase,
  deleteStudentMemberFromFirebase,
  saveExMemberToFirebase,
  updateExMemberInFirebase,
  deleteExMemberFromFirebase,
} from '@/lib/firebaseService';
import { getNextId } from '@/hooks/useAdminForm';

const ADMIN_AUTH_STORAGE = 'adminAuth';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthLoading, setIsAuthLoading] = React.useState(false);

  // Data management
  const {
    publications,
    events,
    facultyCommittee,
    studentCommittee,
    exCommittee,
    isLoading,
    loadAllContent,
    syncPublications,
    syncEvents,
    syncFaculty,
    syncStudents,
    syncEx,
  } = useAdminData();

  // Message management
  const { message, messageType, showMessage } = useAdminForm();

  // Faculty committee state
  const [facultyForm, setFacultyForm] = React.useState<CommitteeForm>(blankCommitteeForm);
  const [editingFacultyId, setEditingFacultyId] = React.useState<number | null>(null);

  // Student committee state
  const [studentForm, setStudentForm] = React.useState<CommitteeForm>(blankCommitteeForm);
  const [editingStudentId, setEditingStudentId] = React.useState<number | null>(null);

  // Ex committee state
  const [exForm, setExForm] = React.useState<CommitteeForm>(blankCommitteeForm);
  const [editingExId, setEditingExId] = React.useState<number | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem(ADMIN_AUTH_STORAGE);
    if (storedAuth) {
      try {
        const auth = JSON.parse(storedAuth);
        if (auth.authenticated) {
          setIsAuthenticated(true);
          loadAllContent();
        }
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        localStorage.removeItem(ADMIN_AUTH_STORAGE);
      }
    }
  }, [loadAllContent]);

  const handleLogin = async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials not configured');
      }

      if (email.trim() !== adminEmail || password !== adminPassword) {
        throw new Error('Invalid email or password');
      }

      localStorage.setItem(ADMIN_AUTH_STORAGE, JSON.stringify({ authenticated: true, email }));
      setIsAuthenticated(true);
      await loadAllContent();
      showMessage('Admin authenticated successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      showMessage(errorMessage, 'error');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_STORAGE);
    setIsAuthenticated(false);
    showMessage('Logged out successfully', 'success');
  };

  // Faculty handlers
  const handleFacultySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CommitteeItem = {
      id: editingFacultyId ?? getNextId(facultyCommittee as { id?: number }[]),
      ...facultyForm,
    };

    try {
      if (editingFacultyId) {
        const firebaseId = facultyCommittee.find((m) => m.id === editingFacultyId)?._id;
        if (firebaseId) {
          const success = await updateFacultyMemberInFirebase(firebaseId, payload);
          if (!success) {
            showMessage('Error updating faculty member in Firebase', 'error');
            return;
          }
          payload._id = firebaseId;
        }
      } else {
        const firebaseId = await saveFacultyMemberToFirebase(payload);
        if (!firebaseId) {
          showMessage('Error saving faculty member to Firebase', 'error');
          return;
        }
        payload._id = firebaseId;
      }

      const next = editingFacultyId
        ? facultyCommittee.map((item) => (item.id === editingFacultyId ? payload : item))
        : [payload, ...facultyCommittee];

      syncFaculty(next);
      resetFacultyForm();
      showMessage(
        editingFacultyId ? 'Faculty member updated successfully' : 'Faculty member added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error saving faculty member:', error);
      showMessage('Error saving faculty member', 'error');
    }
  };

  const deleteFaculty = async (id: number) => {
    try {
      const firebaseId = facultyCommittee.find((m) => m.id === id)?._id;
      if (firebaseId) {
        await deleteFacultyMemberFromFirebase(firebaseId);
      }
      const next = facultyCommittee.filter((item) => item.id !== id);
      syncFaculty(next);
      if (editingFacultyId === id) resetFacultyForm();
      showMessage('Faculty member deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting faculty member:', error);
      showMessage('Error deleting faculty member', 'error');
    }
  };

  const resetFacultyForm = () => {
    setFacultyForm(blankCommitteeForm);
    setEditingFacultyId(null);
  };

  // Student handlers
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CommitteeItem = {
      id: editingStudentId ?? getNextId(studentCommittee as { id?: number }[]),
      ...studentForm,
    };

    try {
      if (editingStudentId) {
        const firebaseId = studentCommittee.find((m) => m.id === editingStudentId)?._id;
        if (firebaseId) {
          const success = await updateStudentMemberInFirebase(firebaseId, payload);
          if (!success) {
            showMessage('Error updating student member in Firebase', 'error');
            return;
          }
          payload._id = firebaseId;
        }
      } else {
        const firebaseId = await saveStudentMemberToFirebase(payload);
        if (!firebaseId) {
          showMessage('Error saving student member to Firebase', 'error');
          return;
        }
        payload._id = firebaseId;
      }

      const next = editingStudentId
        ? studentCommittee.map((item) => (item.id === editingStudentId ? payload : item))
        : [payload, ...studentCommittee];

      syncStudents(next);
      resetStudentForm();
      showMessage(
        editingStudentId ? 'Student member updated successfully' : 'Student member added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error saving student member:', error);
      showMessage('Error saving student member', 'error');
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      const firebaseId = studentCommittee.find((m) => m.id === id)?._id;
      if (firebaseId) {
        await deleteStudentMemberFromFirebase(firebaseId);
      }
      const next = studentCommittee.filter((item) => item.id !== id);
      syncStudents(next);
      if (editingStudentId === id) resetStudentForm();
      showMessage('Student member deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting student member:', error);
      showMessage('Error deleting student member', 'error');
    }
  };

  const resetStudentForm = () => {
    setStudentForm(blankCommitteeForm);
    setEditingStudentId(null);
  };

  // Ex committee handlers
  const handleExSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CommitteeItem = {
      id: editingExId ?? getNextId(exCommittee as { id?: number }[]),
      ...exForm,
    };

    try {
      if (editingExId) {
        const firebaseId = exCommittee.find((m) => m.id === editingExId)?._id;
        if (firebaseId) {
          const success = await updateExMemberInFirebase(firebaseId, payload);
          if (!success) {
            showMessage('Error updating ex-member in Firebase', 'error');
            return;
          }
          payload._id = firebaseId;
        }
      } else {
        const firebaseId = await saveExMemberToFirebase(payload);
        if (!firebaseId) {
          showMessage('Error saving ex-member to Firebase', 'error');
          return;
        }
        payload._id = firebaseId;
      }

      const next = editingExId
        ? exCommittee.map((item) => (item.id === editingExId ? payload : item))
        : [payload, ...exCommittee];

      syncEx(next);
      resetExForm();
      showMessage(
        editingExId ? 'Ex-committee member updated successfully' : 'Ex-committee member added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error saving ex-committee member:', error);
      showMessage('Error saving ex-committee member', 'error');
    }
  };

  const deleteEx = async (id: number) => {
    try {
      const firebaseId = exCommittee.find((m) => m.id === id)?._id;
      if (firebaseId) {
        await deleteExMemberFromFirebase(firebaseId);
      }
      const next = exCommittee.filter((item) => item.id !== id);
      syncEx(next);
      if (editingExId === id) resetExForm();
      showMessage('Ex-committee member deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting ex-committee member:', error);
      showMessage('Error deleting ex-committee member', 'error');
    }
  };

  const resetExForm = () => {
    setExForm(blankCommitteeForm);
    setEditingExId(null);
  };

  if (!isAuthenticated) {
    return <AdminLoginForm onLogin={handleLogin} isLoading={isAuthLoading} />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container-wide px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-2">Manage research papers, events, and team committee data</p>
          </div>
          <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2 w-fit">
            <LogOut size={18} />
            Logout
          </Button>
        </div>

        {message && (
          <Alert className={`mb-6 ${messageType === 'success' ? 'bg-green-950 border-green-800' : 'bg-red-950 border-red-800'}`}>
            <AlertDescription
              className={messageType === 'success' ? 'text-green-200' : 'text-red-200'}
            >
              {message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800 mb-6 flex flex-wrap h-auto p-1">
            <TabsTrigger value="publications" className="text-white data-[state=active]:bg-blue-600">
              Research Papers ({publications.length})
            </TabsTrigger>
            <TabsTrigger value="events" className="text-white data-[state=active]:bg-blue-600">
              Events ({events.length})
            </TabsTrigger>
            <TabsTrigger value="team" className="text-white data-[state=active]:bg-blue-600">
              Team Committee
            </TabsTrigger>
          </TabsList>

          <TabsContent value="publications">
            <PublicationManager
              publications={publications}
              onSync={syncPublications}
              onMessage={showMessage}
            />
          </TabsContent>

          <TabsContent value="events">
            <EventManager events={events} onSync={syncEvents} onMessage={showMessage} />
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-6">
              <CommitteeManager
                label="Faculty Committee"
                members={facultyCommittee}
                form={facultyForm}
                setForm={setFacultyForm}
                editingId={editingFacultyId}
                onSubmit={handleFacultySubmit}
                onEdit={(member) => {
                  setEditingFacultyId(member.id);
                  setFacultyForm({
                    name: member.name || '',
                    title: member.title || '',
                    role: member.role || '',
                    department: member.department || '',
                    research: member.research || '',
                    email: member.email || '',
                    image: member.image || '',
                    tenure: member.tenure || '',
                    currentPosition: member.currentPosition || '',
                    achievement: member.achievement || '',
                  });
                }}
                onDelete={deleteFaculty}
                onCancel={resetFacultyForm}
                isLoading={isLoading}
                onMessage={showMessage}
              />

              <CommitteeManager
                label="Student Committee"
                members={studentCommittee}
                form={studentForm}
                setForm={setStudentForm}
                editingId={editingStudentId}
                onSubmit={handleStudentSubmit}
                onEdit={(member) => {
                  setEditingStudentId(member.id);
                  setStudentForm({
                    name: member.name || '',
                    title: member.title || '',
                    role: member.role || '',
                    department: member.department || '',
                    research: member.research || '',
                    email: member.email || '',
                    image: member.image || '',
                    tenure: member.tenure || '',
                    currentPosition: member.currentPosition || '',
                    achievement: member.achievement || '',
                  });
                }}
                onDelete={deleteStudent}
                onCancel={resetStudentForm}
                isLoading={isLoading}
                onMessage={showMessage}
              />

              <CommitteeManager
                label="Ex-Committee Members"
                members={exCommittee}
                form={exForm}
                setForm={setExForm}
                editingId={editingExId}
                onSubmit={handleExSubmit}
                onEdit={(member) => {
                  setEditingExId(member.id);
                  setExForm({
                    name: member.name || '',
                    title: member.title || '',
                    role: member.role || '',
                    department: member.department || '',
                    research: member.research || '',
                    email: member.email || '',
                    image: member.image || '',
                    tenure: member.tenure || '',
                    currentPosition: member.currentPosition || '',
                    achievement: member.achievement || '',
                  });
                }}
                onDelete={deleteEx}
                onCancel={resetExForm}
                showExtraFields={true}
                isLoading={isLoading}
                onMessage={showMessage}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
