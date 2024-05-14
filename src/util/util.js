/**
 * Utility functions
 */

/**
 * Accepts a Date object and returns the time as Hh:mm.
 * @param {Date} date 
 * @returns {String} Time in formart Hh:mm
 */
function formatTime (date) {
    if (date !== null && date !== undefined && date !== '') {
        const hours = date.getHours().toString().padStart(2, '0'); // Ensure leading zero if needed
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure leading zero if needed
        return `${hours}:${minutes}`;
    }
    return `--:--`;
}

export { formatTime, }