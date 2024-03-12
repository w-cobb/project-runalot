import React, { useState } from "react";
import AWS from 'aws-sdk';

import "../styles/upload.scss";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
});

const S3_BUCKET_NAME = "running-tracks/input";


const Upload = () => {
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleUploadClick = () => {
        setFormOpen(true);
    }

    const handleCancel = () => {
        setFormOpen(false);
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedFiles(files);
        }
    }

    const handleFormSubmit = async () => {
        // Submit gpx files to s3 bucket
        // Get files from event.target.files

        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET_NAME },
            region: process.env.REACT_APP_AWS_REGION,
        });

        if (selectedFiles) {
            try {
                const promises = Array.from(selectedFiles).map(file => {
                    const params = {
                        Bucket: S3_BUCKET_NAME,
                        Key: file.name,
                        Body: file,
                    };
                    return s3.putObject(params).promise();
                });

                await Promise.all(promises);
                console.log("Files uploaded successfully!");
            } catch (error) {
                console.error("Error uploading files:", error);
            }
        }
    };

    return (
        <div className="upload">
            <button onClick={handleUploadClick} className="upload-button">Upload GPX</button>
            {isFormOpen && (
                <form className="form" onSubmit={handleFormSubmit}>
                    <input type="file" multiple onChange={handleFileInputChange}/>
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