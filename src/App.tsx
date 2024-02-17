import React, { ChangeEvent, useState } from 'react';
import './App.css';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_REGION'
});

const bucketName = 'YOUR_BUCKET_NAME';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected File:', file.name);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        const params = {
          Bucket: bucketName,
          Key: selectedFile.name,
          Body: selectedFile,
          ACL: 'public-read', // Set ACL for public access
        };
        const response = await s3.upload(params).promise();
        console.log('File uploaded successfully:', response.Location);
        // Now you have the URL of the uploaded image in response.Location
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file. Please try again.');
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="tc">
      <h1 className="f2">Becca & David</h1>
      <p>Please select media to upload</p>
      <div className="pa4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
        />
        <button
          onClick={handleSubmit}
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-green"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
