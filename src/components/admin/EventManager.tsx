import React, { useState } from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EventItem } from '@/lib/admin-content';
import type { MessageType } from '@/hooks/useAdminForm';
import {
  saveEventToFirebase,
  updateEventInFirebase,
  deleteEventFromFirebase,
} from '@/lib/firebaseService';
import { getNextId, toDateInput } from '@/hooks/useAdminForm';

export type EventForm = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: string;
  registrationFee: string;
  deadline: string;
  includes: string;
  image: string;
};

const blankEventForm: EventForm = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'Seminar',
  attendees: '',
  registrationFee: '',
  deadline: '',
  includes: '',
  image: '',
};

interface EventManagerProps {
  events: EventItem[];
  onSync: (items: EventItem[]) => void;
  onMessage: (text: string, type: MessageType) => void;
}

export default function EventManager({
  events,
  onSync,
  onMessage,
}: EventManagerProps) {
  const [form, setForm] = useState<EventForm>(blankEventForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.date || !form.time || !form.location) {
      onMessage('Please fill all required event fields', 'error');
      return;
    }

    const payload: EventItem = {
      id: editingId ?? getNextId(events as { id?: number }[]),
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      time: form.time.trim(),
      location: form.location.trim(),
      category: form.category,
      attendees: form.attendees ? Number(form.attendees) : undefined,
      registrationFee: form.registrationFee.trim() || undefined,
      deadline: form.deadline || undefined,
      includes: form.includes
        ? form.includes.split(',').map((item) => item.trim()).filter(Boolean)
        : undefined,
      image: form.image.trim() || undefined,
    };

    try {
      setIsLoading(true);
      if (editingId) {
        const firebaseEventId = events.find((e) => e.id === editingId)?._id;
        if (firebaseEventId) {
          const success = await updateEventInFirebase(firebaseEventId, payload);
          if (!success) {
            onMessage('Error updating event in Firebase', 'error');
            return;
          }
          payload._id = firebaseEventId;
        }
      } else {
        const firebaseId = await saveEventToFirebase(payload);
        if (!firebaseId) {
          onMessage('Error saving event to Firebase', 'error');
          return;
        }
        payload._id = firebaseId;
      }

      const next = editingId
        ? events.map((item) => (item.id === editingId ? payload : item))
        : [payload, ...events];

      onSync(next);
      resetForm();
      onMessage(
        editingId ? 'Event updated successfully' : 'Event created successfully',
        'success'
      );
    } catch (error) {
      console.error('Error saving event:', error);
      onMessage(
        'Error saving event: ' + (error instanceof Error ? error.message : 'Unknown error'),
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: EventItem) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description,
      date: toDateInput(event.date),
      time: event.time,
      location: event.location,
      category: event.category,
      attendees: event.attendees ? String(event.attendees) : '',
      registrationFee: event.registrationFee || '',
      deadline: toDateInput(event.deadline || ''),
      includes: event.includes?.join(', ') || '',
      image: event.image || '',
    });
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const firebaseEventId = events.find((e) => e.id === id)?._id;
      if (firebaseEventId) {
        await deleteEventFromFirebase(firebaseEventId);
      }

      const next = events.filter((item) => item.id !== id);
      onSync(next);
      if (editingId === id) resetForm();
      onMessage('Event deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting event:', error);
      onMessage('Error deleting event', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm(blankEventForm);
    setEditingId(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">{editingId ? 'Edit Event' : 'Add Event'}</CardTitle>
          <CardDescription>Create or update site events</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Event title *"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
            <Textarea
              placeholder="Description *"
              rows={5}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
              <Input
                placeholder="Time *"
                value={form.time}
                onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Location *"
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2"
                disabled={isLoading}
              >
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Symposium">Symposium</option>
                <option value="Lecture">Lecture</option>
                <option value="Summit">Summit</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Attendees"
                value={form.attendees}
                onChange={(e) => setForm((prev) => ({ ...prev, attendees: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
              <Input
                placeholder="Registration Fee"
                value={form.registrationFee}
                onChange={(e) => setForm((prev) => ({ ...prev, registrationFee: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm((prev) => ({ ...prev, deadline: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
              <Input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
            </div>
            <Input
              placeholder="Includes (comma separated)"
              value={form.includes}
              onChange={(e) => setForm((prev) => ({ ...prev, includes: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                disabled={isLoading}
              >
                <Plus size={16} />
                {editingId ? 'Update Event' : 'Add Event'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Events</CardTitle>
          <CardDescription>Existing events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[760px] overflow-auto pr-2">
          {events.length === 0 ? (
            <div className="text-slate-400 text-sm py-8 text-center border border-dashed border-slate-700 rounded-lg">
              No events yet
            </div>
          ) : (
            events.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/20">{item.category}</Badge>
                      <Badge className="bg-slate-700/60 text-slate-200 hover:bg-slate-700/60">{item.date}</Badge>
                    </div>
                    <h3 className="text-white font-semibold leading-snug">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-3">{item.description}</p>
                    <p className="text-slate-300 text-sm mt-2">{item.location}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleEdit(item)}
                      disabled={isLoading}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                      disabled={isLoading}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
