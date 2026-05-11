import clsx, { type ClassValue } from 'clsx';

/**
 * Tiny className combiner. Kept as a single export point so we can
 * swap in tailwind-merge later without touching consumers.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
