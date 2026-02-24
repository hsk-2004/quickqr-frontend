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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: 20,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Type badge */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'rgba(99, 102, 241, 0.2)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        color: '#a5b4fc',
        fontSize: 10,
        padding: '2px 8px',
        borderRadius: 6,
        fontFamily: 'monospace',
        zIndex: 2,
        textTransform: 'uppercase',
      }}>
        {qr.type || 'URL'}
      </div>

      {/* QR Image Container */}
      <div style={{
        padding: 24,
        background: 'rgba(255, 255, 255, 0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative corner */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderLeft: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.1)' }} />

        {qr?.imageUrl ? (
          <motion.img
            src={qr.imageUrl}
            alt={qr.name}
            style={{
              width: 140,
              height: 140,
              objectFit: 'contain',
              borderRadius: 8,
              background: '#fff',
              padding: 8,
              boxShadow: '0 0 30px rgba(0,0,0,0.3)',
            }}
            whileHover={{ scale: 1.1, rotate: 2 }}
          />
        ) : (
          <div style={{ width: 140, height: 140, background: 'rgba(255,255,255,0.05)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.1)', fontSize: 40 }}>◈</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px', flex: 1 }}>
        <h3 style={{
          margin: '0 0 6px 0',
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '-0.3px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {qr.name || 'Untitled Project'}
        </h3>

        <p style={{
          margin: 0,
          fontSize: 11,
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
          marginBottom: 16,
          lineHeight: 1.4
        }}>
          {qr.url}
        </p>

        {error && (
          <div style={{ fontSize: 11, color: '#fca5a5', marginBottom: 12, background: 'rgba(239, 68, 68, 0.1)', padding: '6px 10px', borderRadius: 8 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <ActionButton icon="📋" onClick={handleCopyUrl} tooltip="Copy URL" />
          <ActionButton icon="⬇️" onClick={handleDownload} disabled={!qr?.imageUrl} tooltip="Download" />
          <ActionButton icon="🗑️" onClick={handleDelete} danger disabled={isDeleting} tooltip="Delete" />
        </div>
      </div>

      {/* Footer date */}
      <div style={{
        padding: '12px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        fontSize: 10,
        color: 'rgba(255,255,255,0.2)',
        fontFamily: 'monospace',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>CREATED</span>
        <span>{new Date(qr.createdAt).toLocaleDateString()}</span>
      </div>
    </motion.article>
  );
};

/* ── Internal Button Component ─────────────────────────────── */
function ActionButton({ icon, onClick, danger, disabled, tooltip }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, background: danger ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      style={{
        height: 36,
        borderRadius: 10,
        border: danger ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.03)',
        color: danger ? '#fca5a5' : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.2s',
      }}
    >
      {icon}
    </motion.button>
  );
}

export default React.memo(QRCard);
