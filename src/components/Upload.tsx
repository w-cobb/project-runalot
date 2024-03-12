import React, { useState } from "react";
import AWS from 'aws-sdk';

import "../styles/upload.scss";

const s3 = new AWS.S3();

const Upload = () => {
    const [isFormOpen, setFormOpen] = useState(false);

    const handleUploadClick = () => {
        setFormOpen(true);
    }

    const handleFormSubmit = (event) => {
        // Submit gpx files to s3 bucket
        // Get files from event.target.files
    }

    const handleCancel = () => {
        setFormOpen(false);
    }

    return (
        <div className="upload">
            <button onClick={handleUploadClick} className="upload-button">Upload GPX</button>
            {isFormOpen && (
                <form className="form" onSubmit={handleFormSubmit}>
                    <input type="file" multiple/>
                    <div className="cancel-submit">
                        <button onClick={handleCancel} className="cancel-button">Cancel</button>
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Upload;