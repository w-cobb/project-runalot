import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.tsx';
import Upload from './components/Upload.tsx';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
})

function App() {
  return (
    <div className="App">
      <Map />
      <Upload />
    </div>
  );
}

export default App;
