import React, { useState } from 'react';
import { qrAPI } from '../services/api';
import './QRCard.css';

const QRCard = ({ qr, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${qr.name}"?`)) {
      setIsDeleting(true);
      setError(null);
      try {
        await qrAPI.deleteQR(qr.id);
        if (onDelete) {
          onDelete(qr.id);
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to delete QR code';
        setError(errorMessage);
        setIsDeleting(false);
      }
    }
  };

  const handleDownload = () => {
    // Create a link to download the QR code image
    if (qr.imageUrl) {
      const link = document.createElement('a');
      link.href = qr.imageUrl;
      link.download = `${qr.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qr.url);
    // Optional: Show toast notification here
    alert('URL copied to clipboard!');
  };

  return (
    <div className="qr-card">
      {qr.imageUrl && (
        <div className="qr-image-container">
          <img src={qr.imageUrl} alt={qr.name} className="qr-image" />
        </div>
      )}

      <div className="qr-info">
        <h3 className="qr-name">{qr.name}</h3>
        <p className="qr-url">{qr.url}</p>
        
        {qr.createdAt && (
          <p className="qr-date">
            Created: {new Date(qr.createdAt).toLocaleDateString()}
          </p>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="qr-actions">
        <button
          className="action-btn copy-btn"
          onClick={handleCopyUrl}
          title="Copy URL"
        >
          📋 Copy
        </button>
        <button
          className="action-btn download-btn"
          onClick={handleDownload}
          disabled={!qr.imageUrl}
          title="Download QR Code"
        >
          ⬇️ Download
        </button>
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete QR Code"
        >
          {isDeleting ? '🗑️ Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
};

export default QRCard;
