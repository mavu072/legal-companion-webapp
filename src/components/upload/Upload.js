import './Upload.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';

function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
        console.log(`Selected file: ${selectedFiles}`);
        // Do something with the selected file if needed
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
                    onChange={(e) => handleFileChange(e)}
                />
            </div>
        </>
    )
}

export { FileUpload, }