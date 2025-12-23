/**
 * Extracts initials: 
 * - If one word: first two letters.
 * - If multiple words: first letter of the first word and first letter of the second word.
 * @param name - The string to extract initials from.
 * @returns The initials in uppercase, or empty string if name is invalid.
 */

export const getInitials = (name?: string): string => {
    if (!name || name.trim() === "") return "";

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    const firstInitial = words[0].charAt(0);
    const secondInitial = words[1].charAt(0);

    return (firstInitial + secondInitial).toUpperCase();
};