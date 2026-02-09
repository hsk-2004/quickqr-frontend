import React, { useState, useCallback } from 'react';
import './QRCard.css';

const QRCard = ({ qr, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  /**
   * Delete QR (delegates actual delete to parent)
   */
  const handleDelete = useCallback(async () => {
    if (!qr?.id) {
      console.error('[QRCard] Missing QR id:', qr);
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${qr.name}"?`
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError('');
      await onDelete(qr.id);
    } catch (err) {
      console.error('[QRCard] Delete failed:', err);
      setError('Failed to delete QR code. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }, [qr, onDelete]);

  /**
   * Download QR image
   */
  const handleDownload = useCallback(() => {
    if (!qr?.imageUrl) return;

    const link = document.createElement('a');
    link.href = qr.imageUrl;
    link.download = `${qr.name || 'qr-code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qr]);

  /**
   * Copy QR URL
   */
  const handleCopyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(qr.url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('[QRCard] Clipboard error:', err);
      setError('Unable to copy URL.');
    }
  }, [qr]);

  return (
    <article className="qr-card" aria-busy={isDeleting}>
      {/* Image */}
      {qr?.imageUrl && (
        <div className="qr-image-container">
          <img
            src={qr.imageUrl}
            alt={`QR code for ${qr.name}`}
            className="qr-image"
            loading="lazy"
          />
        </div>
      )}

      {/* Info */}
      <div className="qr-info">
        <h3 className="qr-title" title={qr.name}>
          {qr.name}
        </h3>

        <p className="qr-url" title={qr.url}>
          {qr.url}
        </p>

        {qr.createdAt && (
          <time
            className="qr-date"
            dateTime={new Date(qr.createdAt).toISOString()}
          >
            Created: {new Date(qr.createdAt).toLocaleDateString()}
          </time>
        )}

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="qr-actions">
        <button
          type="button"
          onClick={handleCopyUrl}
          aria-label="Copy QR URL"
        >
          📋 Copy
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!qr?.imageUrl}
          aria-disabled={!qr?.imageUrl}
          aria-label="Download QR"
        >
          ⬇️ Download
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-disabled={isDeleting}
          className="danger"
          aria-label="Delete QR"
        >
          {isDeleting ? '🗑️ Deleting…' : '🗑️ Delete'}
        </button>
      </div>
    </article>
  );
};

export default React.memo(QRCard);
