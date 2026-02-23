import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { qrAPI } from '../services/api';

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
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
      }}
    >
      <div className="space-y-6">
        {/* URL Input */}
        <div>
          <label htmlFor="url" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Target URL
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔗</span>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-link.com"
              disabled={loading || parentLoading}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '14px 14px 14px 42px',
                color: '#fff',
                fontSize: 14,
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              className="focus:border-indigo-500/50 focus:bg-indigo-500/5"
            />
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginBottom: 8, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Display Name
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>📝</span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Portfolio Site"
              disabled={loading || parentLoading}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '14px 14px 14px 42px',
                color: '#fff',
                fontSize: 14,
                outline: 'none',
                transition: 'all 0.2s',
              }}
              className="focus:border-indigo-500/50 focus:bg-indigo-500/5"
            />
          </div>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 12,
                padding: '12px',
                color: '#fca5a5',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>⚠️</span> {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.2)',
                borderRadius: 12,
                padding: '12px',
                color: '#a7f3d0',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>✓</span> {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading || parentLoading}
          whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            height: 52,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            fontWeight: 700,
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            fontSize: 15,
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'all 0.3s',
            marginTop: 12,
          }}
        >
          {loading || parentLoading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
              />
              GENERATING...
            </>
          ) : (
            <>
              <span style={{ fontSize: 18 }}>⚡</span>
              INITIALIZE QR
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default QRForm;
