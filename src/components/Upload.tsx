import React, { useState } from "react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import "../styles/upload.scss";

// AWS.config.update({
//     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//     region: process.env.REACT_APP_AWS_REGION,
// });

const S3_BUCKET_NAME = "running-tracks";

const s3Client = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
});


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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (selectedFiles) {
            try {
                const promises = Array.from(selectedFiles).map(async (file) => {
                    console.log("Sending file " + file.name );
                    const params = {
                        Bucket: S3_BUCKET_NAME,
                        Key: "input/" + file.name,
                        Body: file,
                    };
                    await s3Client.send(new PutObjectCommand(params));
                });

                await Promise.all(promises);
                console.log("Files uploaded successfully!");
                setFormOpen(false);
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