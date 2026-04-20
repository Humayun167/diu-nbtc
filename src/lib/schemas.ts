import { z } from 'zod';

// ============ EVENT VALIDATION ============
export const EventItemSchema = z.object({
  _id: z.string().optional(),
  id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  attendees: z.number().int().nonnegative().optional(),
  image: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  registrationFee: z.string().optional(),
  deadline: z.string().optional(),
  includes: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type EventItem = z.infer<typeof EventItemSchema>;

// ============ PUBLICATION VALIDATION ============
export const PublicationItemSchema = z.object({
  _id: z.string().optional(),
  id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required'),
  authors: z.string().min(1, 'Authors are required'),
  journal: z.string().min(1, 'Journal is required'),
  year: z.number().int().min(1900, 'Year must be 1900 or later').max(2100, 'Year must be 2100 or earlier'),
  type: z.enum([
    'Journal Article',
    'Journal (Accepted)',
    'Conference Paper',
    'Conference (Accepted)',
    'Review Article',
  ], { message: 'Invalid publication type' }),
  doi: z.string().optional(),
  abstract: z.string().min(1, 'Abstract is required'),
});

export type PublicationItem = z.infer<typeof PublicationItemSchema>;

// ============ COMMITTEE VALIDATION ============
export const CommitteeItemSchema = z.object({
  _id: z.string().optional(),
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  role: z.string().optional(),
  department: z.string().optional(),
  research: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  image: z.string().optional(),
  tenure: z.string().optional(),
  currentPosition: z.string().optional(),
  achievement: z.string().optional(),
});

export type CommitteeItem = z.infer<typeof CommitteeItemSchema>;

// ============ VALIDATION UTILITY FUNCTIONS ============

/**
 * Safely validate and parse event data
 * Returns validated data or null if invalid
 */
export function validateEvent(data: unknown): EventItem | null {
  try {
    return EventItemSchema.parse(data);
  } catch (error) {
    console.warn('Event validation failed:', error);
    return null;
  }
}

/**
 * Safely validate and parse publication data
 * Returns validated data or null if invalid
 */
export function validatePublication(data: unknown): PublicationItem | null {
  try {
    return PublicationItemSchema.parse(data);
  } catch (error) {
    console.warn('Publication validation failed:', error);
    return null;
  }
}

/**
 * Safely validate and parse committee member data
 * Returns validated data or null if invalid
 */
export function validateCommittee(data: unknown): CommitteeItem | null {
  try {
    return CommitteeItemSchema.parse(data);
  } catch (error) {
    console.warn('Committee member validation failed:', error);
    return null;
  }
}

/**
 * Validate arrays of data
 */
export function validateEvents(data: unknown): EventItem[] {
  return z.array(EventItemSchema).parse(data).filter((item) => item !== null);
}

export function validatePublications(data: unknown): PublicationItem[] {
  return z.array(PublicationItemSchema).parse(data).filter((item) => item !== null);
}

export function validateCommittees(data: unknown): CommitteeItem[] {
  return z.array(CommitteeItemSchema).parse(data).filter((item) => item !== null);
}
