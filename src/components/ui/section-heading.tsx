/**
 * Section Heading Component
 */

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  icon?: React.ReactNode;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className = '',
  icon,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={`${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-secondary/10 text-secondary mb-3 sm:mb-4">
          {icon}
          {badge}
        </span>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg text-muted-foreground ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
