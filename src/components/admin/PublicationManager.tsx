import React, { useState } from 'react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PublicationItem } from '@/lib/admin-content';
import type { MessageType } from '@/hooks/useAdminForm';
import {
  savePublicationToFirebase,
  updatePublicationInFirebase,
  deletePublicationFromFirebase,
} from '@/lib/firebaseService';
import { getNextId } from '@/hooks/useAdminForm';

export type PublicationForm = {
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: PublicationItem['type'];
  doi: string;
  abstract: string;
};

const blankPublicationForm: PublicationForm = {
  title: '',
  authors: '',
  journal: '',
  year: '2026',
  type: 'Journal Article',
  doi: '',
  abstract: '',
};

interface PublicationManagerProps {
  publications: PublicationItem[];
  onSync: (items: PublicationItem[]) => void;
  onMessage: (text: string, type: MessageType) => void;
}

export default function PublicationManager({
  publications,
  onSync,
  onMessage,
}: PublicationManagerProps) {
  const [form, setForm] = useState<PublicationForm>(blankPublicationForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.authors || !form.journal || !form.abstract) {
      onMessage('Please fill all required publication fields', 'error');
      return;
    }

    const payload: PublicationItem = {
      id: editingId ?? getNextId(publications as { id?: number }[]),
      title: form.title.trim(),
      authors: form.authors.trim(),
      journal: form.journal.trim(),
      year: Number(form.year),
      type: form.type,
      doi: form.doi.trim(),
      abstract: form.abstract.trim(),
    };

    try {
      setIsLoading(true);
      if (editingId) {
        const firebasePubId = publications.find((p) => p.id === editingId)?._id;
        if (firebasePubId) {
          const success = await updatePublicationInFirebase(firebasePubId, payload);
          if (!success) {
            onMessage('Error updating publication in Firebase', 'error');
            return;
          }
          payload._id = firebasePubId;
        }
      } else {
        const firebaseId = await savePublicationToFirebase(payload);
        if (!firebaseId) {
          onMessage('Error saving publication to Firebase', 'error');
          return;
        }
        payload._id = firebaseId;
      }

      const next = editingId
        ? publications.map((item) => (item.id === editingId ? payload : item))
        : [payload, ...publications];

      onSync(next);
      resetForm();
      onMessage(
        editingId ? 'Publication updated successfully' : 'Publication added successfully',
        'success'
      );
    } catch (error) {
      console.error('Error saving publication:', error);
      onMessage(
        'Error saving publication: ' + (error instanceof Error ? error.message : 'Unknown error'),
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pub: PublicationItem) => {
    setEditingId(pub.id);
    setForm({
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: String(pub.year),
      type: pub.type,
      doi: pub.doi,
      abstract: pub.abstract,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);
      const firebasePubId = publications.find((p) => p.id === id)?._id;
      if (firebasePubId) {
        await deletePublicationFromFirebase(firebasePubId);
      }

      const next = publications.filter((item) => item.id !== id);
      onSync(next);
      if (editingId === id) resetForm();
      onMessage('Publication deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting publication:', error);
      onMessage('Error deleting publication', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm(blankPublicationForm);
    setEditingId(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">{editingId ? 'Edit Research Paper' : 'Add Research Paper'}</CardTitle>
          <CardDescription>Update publications shown on the site</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Paper title *"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Authors *"
                value={form.authors}
                onChange={(e) => setForm((prev) => ({ ...prev, authors: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
              <Input
                placeholder="Journal / Conference *"
                value={form.journal}
                onChange={(e) => setForm((prev) => ({ ...prev, journal: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Year *"
                value={form.year}
                onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
              <select
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as PublicationItem['type'] }))}
                className="bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2"
                disabled={isLoading}
              >
                <option value="Journal Article">Journal Article</option>
                <option value="Journal (Accepted)">Journal (Accepted)</option>
                <option value="Conference Paper">Conference Paper</option>
                <option value="Conference (Accepted)">Conference (Accepted)</option>
                <option value="Review Article">Review Article</option>
              </select>
              <Input
                placeholder="DOI"
                value={form.doi}
                onChange={(e) => setForm((prev) => ({ ...prev, doi: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
            </div>
            <Textarea
              placeholder="Abstract *"
              rows={7}
              value={form.abstract}
              onChange={(e) => setForm((prev) => ({ ...prev, abstract: e.target.value }))}
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
                {editingId ? 'Update Paper' : 'Add Paper'}
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
          <CardTitle className="text-white">Research Papers</CardTitle>
          <CardDescription>Existing publications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[760px] overflow-auto pr-2">
          {publications.length === 0 ? (
            <div className="text-slate-400 text-sm py-8 text-center border border-dashed border-slate-700 rounded-lg">
              No publications yet
            </div>
          ) : (
            publications.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/20">{item.year}</Badge>
                      <Badge className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/20">{item.type}</Badge>
                    </div>
                    <h3 className="text-white font-semibold leading-snug">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{item.authors}</p>
                    <p className="text-slate-300 text-sm mt-1">{item.journal}</p>
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
