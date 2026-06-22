export const truncateText = (
    text: string,
    length: number = 100
) => {
    if (!text) return "";

    return text.length > length
        ? text.substring(0, length) + "..."
        : text;
};

export const capitalize = (text: string) => {
    if (!text) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatYear = (year: number) => {
    return year.toString();
};

export const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};