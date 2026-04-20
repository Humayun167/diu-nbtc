/**
 * Visitor Counter Component
 * 
 * Displays the total visitor count with animated number.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Users } from 'lucide-react';
import { useVisitorCount } from '@/hooks/use-visitor-count';

interface VisitorCounterProps {
  variant?: 'default' | 'compact' | 'badge';
  className?: string;
}

export function VisitorCounter({ variant = 'default', className = '' }: VisitorCounterProps) {
  const { visitorCount, isLoading } = useVisitorCount();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  if (variant === 'badge') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium ${className}`}
      >
        <Eye className="w-4 h-4" />
        <span>{isLoading ? '...' : formatNumber(visitorCount)}</span>
        <span className="text-xs opacity-70">visitors</span>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-2 text-sm text-primary-foreground/70 ${className}`}
      >
        <Users className="w-4 h-4" />
        <span>
          <span className="font-semibold text-primary-foreground">
            {isLoading ? '...' : formatNumber(visitorCount)}
          </span>
          {' '}visitors
        </span>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/5 border border-secondary/20 ${className}`}
    >
      <div className="flex items-center gap-2 text-secondary">
        <Eye className="w-5 h-5" />
        <span className="text-sm font-medium uppercase tracking-wider">Site Visitors</span>
      </div>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="text-3xl font-display font-bold text-foreground"
      >
        {isLoading ? (
          <span className="animate-pulse">...</span>
        ) : (
          formatNumber(visitorCount)
        )}
      </motion.div>
      <p className="text-xs text-muted-foreground">Thank you for visiting!</p>
    </motion.div>
  );
}

export default VisitorCounter;
