// Util functions

export const formatTime = (date) => {
    if (date !== null && date !== undefined && date !== '') {
        const hours = date.getHours().toString().padStart(2, '0'); // Ensure leading zero if needed
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure leading zero if needed
        return `${hours}:${minutes}`;
    }
    return `--:--`;
}