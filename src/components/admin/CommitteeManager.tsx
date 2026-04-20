import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CommitteeItem } from '@/lib/admin-content';
import type { MessageType } from '@/hooks/useAdminForm';
import { getNextId } from '@/hooks/useAdminForm';

export type CommitteeForm = {
  name: string;
  title: string;
  role: string;
  department: string;
  research: string;
  email: string;
  image: string;
  tenure: string;
  currentPosition: string;
  achievement: string;
};

export const blankCommitteeForm: CommitteeForm = {
  name: '',
  title: '',
  role: '',
  department: '',
  research: '',
  email: '',
  image: '',
  tenure: '',
  currentPosition: '',
  achievement: '',
};

interface CommitteeManagerProps {
  label: string;
  members: CommitteeItem[];
  onSubmit: (e: React.FormEvent, form: CommitteeForm) => Promise<void>;
  onEdit: (member: CommitteeItem) => void;
  onDelete: (id: number) => Promise<void>;
  onCancel: () => void;
  form: CommitteeForm;
  setForm: (form: CommitteeForm | ((prev: CommitteeForm) => CommitteeForm)) => void;
  editingId: number | null;
  showExtraFields?: boolean;
  isLoading?: boolean;
  onMessage: (text: string, type: MessageType) => void;
}

export default function CommitteeManager({
  label,
  members,
  onSubmit,
  onEdit,
  onDelete,
  onCancel,
  form,
  setForm,
  editingId,
  showExtraFields = false,
  isLoading = false,
  onMessage,
}: CommitteeManagerProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.title) {
      onMessage('Please fill name and title', 'error');
      return;
    }
    await onSubmit(e, form);
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">{label}</CardTitle>
        <CardDescription>Manage committee members for this section</CardDescription>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Name *"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
            <Input
              placeholder="Title *"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
            <Input
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
              className="bg-slate-800 border-slate-700 text-white"
              disabled={isLoading}
            />
          </div>
          <Textarea
            placeholder="Research / Expertise"
            value={form.research}
            onChange={(e) => setForm((prev) => ({ ...prev, research: e.target.value }))}
            className="bg-slate-800 border-slate-700 text-white"
            disabled={isLoading}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
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
          {showExtraFields && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Tenure"
                  value={form.tenure}
                  onChange={(e) => setForm((prev) => ({ ...prev, tenure: e.target.value }))}
                  className="bg-slate-800 border-slate-700 text-white"
                  disabled={isLoading}
                />
                <Input
                  placeholder="Current Position"
                  value={form.currentPosition}
                  onChange={(e) => setForm((prev) => ({ ...prev, currentPosition: e.target.value }))}
                  className="bg-slate-800 border-slate-700 text-white"
                  disabled={isLoading}
                />
              </div>
              <Textarea
                placeholder="Achievement"
                value={form.achievement}
                onChange={(e) => setForm((prev) => ({ ...prev, achievement: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
                disabled={isLoading}
              />
            </>
          )}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {editingId ? 'Update' : 'Add'} Member
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="space-y-3 max-h-[620px] overflow-auto pr-2">
          {members.length === 0 ? (
            <div className="text-slate-400 text-sm py-8 text-center border border-dashed border-slate-700 rounded-lg">
              No members found
            </div>
          ) : (
            members.map((member) => (
              <div key={member.id} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-white font-semibold">{member.name}</h4>
                    <p className="text-slate-300 text-sm">{member.title}</p>
                    {member.role && (
                      <Badge className="mt-2 bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/20">
                        {member.role}
                      </Badge>
                    )}
                    {member.department && <p className="text-slate-400 text-xs mt-2">{member.department}</p>}
                    {member.tenure && <p className="text-slate-400 text-xs mt-1">Tenure: {member.tenure}</p>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => onEdit(member)}
                      disabled={isLoading || isDeleting}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(member.id)}
                      disabled={isLoading || isDeleting}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
