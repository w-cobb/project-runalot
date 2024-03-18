import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.tsx';
import Upload from './components/Upload.tsx';
import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
  },
});

function App() {
  return (
    <div className="App">
      <Map s3Client={s3Client} />
      <Upload s3Client={s3Client} />
    </div>
  );
}

export default App;
