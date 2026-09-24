/**
 * Anchored patterns, so each one matches a whole string rather than a
 * substring. They are declared as factories: a shared /g regex would carry
 * `lastIndex` between calls, which is a classic source of flaky validation.
 */
export const patterns = {
  email: () => /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/,
  url: () => /^https?:\/\/[^\s/$.?#][^\s]*$/i,
  slug: () => /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  hexColor: () => /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,
  ipv4: () =>
    /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/,
  uuid: () =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  isoDate: () => /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,
  semver: () =>
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9a-z-]+(?:\.[0-9a-z-]+)*)?(?:\+[0-9a-z-]+(?:\.[0-9a-z-]+)*)?$/i,
} as const;

export type PatternName = keyof typeof patterns;

export const patternNames = Object.keys(patterns) as PatternName[];
