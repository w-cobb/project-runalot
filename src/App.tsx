import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map.tsx';
import Upload from './components/Upload.tsx';

function App() {
  return (
    <div className="App">
      <Map />
      <Upload />
    </div>
  );
}

export default App;
