import './Upload.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';

function FileUpload(props) {
    const callback = props.onFileUpload;
    const [selectedFiles, setSelectedFiles] = useState([]);

    /**
     * Handle file channge event.
     * @param {Event} event 
     */
    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);

        // Trigger callback function to handle files
        if (selectedFiles && selectedFiles.length > 0) {
            callback(selectedFiles);
        }
    };

    return (
        <>
            <div className="file-upload">
                <label htmlFor="file-input">
                    <FontAwesomeIcon icon="fa-solid fa-paperclip" className='icon' />
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf" // Accepts images and PDFs
                    multiple={true}
                    onInput={(e) => setSelectedFiles(e.target.files)}
                    onChange={(e) => handleFileChange(e)}
                />
            </div>
        </>
    )
}

export { FileUpload, }