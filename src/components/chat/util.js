/**
 * Chat util
 */

/**
 * Automatically resizes the target textarea based on the size of the content entered.
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
 */
const resizeTextarea = (event) => {
    const textarea = event.target;
    const minHeight = 50;
    textarea.style.height = `${minHeight}px`;
    let scrollHeight = event.target.scrollHeight;
    if (scrollHeight > minHeight) {
        textarea.style.height = `${scrollHeight}px`;
    }
}

export { resizeTextarea, }