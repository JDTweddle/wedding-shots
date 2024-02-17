import React, { ChangeEvent, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // You can implement your upload logic here
      console.log('Uploading:', selectedFile.name);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="tc">
      <h1 className="f2">Media Uploader</h1>
      <div className="pa4">
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <button
          onClick={handleUpload}
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-green"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default App;
