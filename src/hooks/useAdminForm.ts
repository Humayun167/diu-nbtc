import { useState, useCallback } from 'react';

export type MessageType = 'success' | 'error';

interface UseAdminFormProps {
  onMessage?: (text: string, type: MessageType) => void;
}

export function useAdminForm({ onMessage }: UseAdminFormProps = {}) {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('success');

  const showMessage = useCallback(
    (text: string, type: MessageType = 'success') => {
      setMessage(text);
      setMessageType(type);
      onMessage?.(text, type);
      window.setTimeout(() => setMessage(''), 2500);
    },
    [onMessage]
  );

  return { message, messageType, showMessage };
}

export function getNextId<T extends { id?: number }>(items: T[]): number {
  const validIds = items.map((item) => item.id).filter((id): id is number => typeof id === 'number');
  return validIds.length ? Math.max(...validIds) + 1 : 1;
}

export function toDateInput(value: string): string {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
}
