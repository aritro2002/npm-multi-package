import { patternNames, patterns, type PatternName } from './patterns.ts';

export { patternNames, patterns };
export type { PatternName };

/** Tests a string against one of the built-in patterns. */
export function matches(name: PatternName, value: string): boolean {
  return patterns[name]().test(value);
}

export const isEmail = (value: string): boolean => matches('email', value);
export const isUrl = (value: string): boolean => matches('url', value);
export const isSlug = (value: string): boolean => matches('slug', value);
export const isHexColor = (value: string): boolean =>
  matches('hexColor', value);
export const isIpv4 = (value: string): boolean => matches('ipv4', value);
export const isUuid = (value: string): boolean => matches('uuid', value);
export const isIsoDate = (value: string): boolean => matches('isoDate', value);
export const isSemver = (value: string): boolean => matches('semver', value);

/** Every pattern the value satisfies, e.g. `['slug']`. */
export function classify(value: string): PatternName[] {
  return patternNames.filter((name) => matches(name, value));
}

/** Escapes a string so it can be dropped into a `RegExp` literally. */
export function escape(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Turns arbitrary text into a URL-safe slug. */
export function toSlug(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
