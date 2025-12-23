/**
 * Extracts the first two letters of a string as initials and converts them to uppercase.
 * @param name - The string to extract initials from.
 * @returns The first two letters in uppercase, or empty string if name is invalid.
 */

export const getInitials = (name?: string): string => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
};
