import React, { useState } from 'react';
import './USerPostUpload.css';

const UserPostUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="post-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {file && <img src={URL.createObjectURL(file)} alt="Uploaded" className="uploaded-image" />}
    </div>
  );
};

export default UserPostUpload;
