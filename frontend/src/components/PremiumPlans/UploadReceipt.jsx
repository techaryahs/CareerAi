import React, { useState } from 'react';
import './UploadReceipt.css';

const CLOUDINARY_UPLOAD_PRESET = 'unsigned_receipts';
const CLOUDINARY_CLOUD_NAME = 'dvxsgxp3f';

const UploadReceipt = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setPreviewURL(URL.createObjectURL(selected));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDone = async () => {
    if (!file) {
      alert("⚠️ Please upload your receipt first.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser?.email) {
      alert("⚠️ Login required to upload receipt.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      // Upload to Cloudinary
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (!data.secure_url) throw new Error('No secure_url returned from Cloudinary');

      console.log('✅ Uploaded Image URL:', data.secure_url);

      // Send to backend
      const backendRes = await fetch(`${process.env.REACT_APP_API_URL}/api/receipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // 🔐 Uncomment if backend needs token
        },
        body: JSON.stringify({
          email: currentUser.email,
          receiptUrl: data.secure_url
        })
      });

      const backendData = await backendRes.json();

      if (!backendRes.ok) {
        throw new Error(backendData.error || 'Failed to save receipt URL');
      }

      // Optionally update localStorage
      currentUser.receiptUrl = data.secure_url;
      localStorage.setItem('user', JSON.stringify(currentUser));

      alert("✅ Receipt uploaded & saved successfully!");
      window.location.href = '/';
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Failed to upload and save receipt.");
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="upload-receipt-container">
      <h2>📤 Upload Payment Receipt</h2>
      <p>Please upload a screenshot or image of your payment receipt for verification.</p>

      <div className="upload-box">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="receiptUpload"
          style={{ display: 'none' }}
        />
        <label htmlFor="receiptUpload" className="upload-label">
          {file ? "Change Receipt" : "Choose Receipt"}
        </label>

        {previewURL && (
          <div className="preview">
            <img src={previewURL} alt="Receipt Preview" />
          </div>
        )}
      </div>

      <button className="done-btn" onClick={handleDone} disabled={uploading}>
        {uploading ? "Uploading..." : "✅ Done"}
      </button>
    </div>
  );
};

export default UploadReceipt;
