import React, { useState } from 'react';
import { qrAPI } from '../services/api';
import './QRForm.css';

const QRForm = ({ onQRGenerated, loading: parentLoading }) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const response = await qrAPI.generateQR({
        url: url.trim(),
        name: name.trim() || 'Untitled QR Code',
      });

      setSuccess('QR Code generated successfully!');
      setUrl('');
      setName('');

      if (onQRGenerated) {
        onQRGenerated(response.data);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to generate QR code';
      setError(errorMessage);
      console.error('QR generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="qr-form" onSubmit={handleSubmit}>
      <h2>Generate QR Code</h2>

      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          disabled={loading || parentLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">QR Code Name (Optional)</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., My Website"
          disabled={loading || parentLoading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <button
        type="submit"
        className="submit-btn"
        disabled={loading || parentLoading}
      >
        {loading || parentLoading ? 'Generating...' : 'Generate QR Code'}
      </button>
    </form>
  );
};

export default QRForm;
