import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const QRCard = ({ qr, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

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

  const handleDownload = useCallback(() => {
    if (!qr?.imageUrl) return;

    const link = document.createElement('a');
    link.href = qr.imageUrl;
    link.download = `${qr.name || 'qr-code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qr]);

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
    <motion.article
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      aria-busy={isDeleting}
    >
      {/* QR Image Container */}
      {qr?.imageUrl && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
          <img
            src={qr.imageUrl}
            alt={`QR code for ${qr.name}`}
            className="w-40 h-40 object-contain"
            loading="lazy"
          />
        </div>
      )}

      {/* QR Info */}
      <div className="flex-1 p-6">
        <h3
          className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors"
          title={qr.name}
        >
          {qr.name}
        </h3>

        <p
          className="text-sm text-gray-600 mb-3 line-clamp-2 break-all font-mono"
          title={qr.url}
        >
          {qr.url}
        </p>

        {qr.createdAt && (
          <time
            className="text-xs text-gray-500 flex items-center gap-2"
            dateTime={new Date(qr.createdAt).toISOString()}
          >
            <span>📅</span>
            Created: {new Date(qr.createdAt).toLocaleDateString()}
          </time>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
          >
            <p className="text-red-700 text-xs font-medium">{error}</p>
          </motion.div>
        )}
      </div>

      {/* QR Actions */}
      <div className="grid grid-cols-3 gap-3 p-4 border-t border-gray-200 bg-gray-50">
        <motion.button
          type="button"
          onClick={handleCopyUrl}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1 py-2 px-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600 transition-all text-sm font-medium"
          aria-label="Copy QR URL"
          title="Copy URL"
        >
          <span>📋</span>
          <span className="hidden sm:inline text-xs">Copy</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleDownload}
          disabled={!qr?.imageUrl}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1 py-2 px-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-300 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
          aria-disabled={!qr?.imageUrl}
          aria-label="Download QR"
          title="Download QR Code"
        >
          <span>⬇️</span>
          <span className="hidden sm:inline text-xs">Save</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-1 py-2 px-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
          aria-disabled={isDeleting}
          aria-label="Delete QR"
          title="Delete QR Code"
        >
          <span>🗑️</span>
          <span className="hidden sm:inline text-xs">{isDeleting ? 'Del...' : 'Del'}</span>
        </motion.button>
      </div>
    </motion.article>
  );
};

export default React.memo(QRCard);
