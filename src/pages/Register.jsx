import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#08080f] px-4 py-12">
      {/* Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float1 15s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-10%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float2 20s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 24,
          padding: '40px 32px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}>
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                width: 60, height: 60, borderRadius: 16,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: 28,
                boxShadow: '0 0 30px rgba(99,102,241,0.4)',
              }}
            >⚡</motion.div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-1px', marginBottom: 8, fontFamily: 'Syne, sans-serif' }}>New Operative</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>Create your secure credentials to join the network</p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {(error || validationError) && (
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
                  fontSize: 14,
                  marginBottom: 24,
                }}
              >
                <p className="flex items-center gap-2">⚠️ {error || validationError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                Codename
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: 15, outline: 'none', transition: 'all 0.2s',
                }}
                className="focus:border-indigo-500/50 focus:bg-indigo-500/5 placeholder:text-gray-700"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="commander@quickqr.io"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: 15, outline: 'none', transition: 'all 0.2s',
                }}
                className="focus:border-indigo-500/50 focus:bg-indigo-500/5 placeholder:text-gray-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                  Secret Key
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff', fontSize: 15, outline: 'none', transition: 'all 0.2s',
                  }}
                  className="focus:border-indigo-500/50 focus:bg-indigo-500/5 placeholder:text-gray-700"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                  Confirm key
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff', fontSize: 15, outline: 'none', transition: 'all 0.2s',
                  }}
                  className="focus:border-indigo-500/50 focus:bg-indigo-500/5 placeholder:text-gray-700"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01, boxShadow: '0 0 25px rgba(99,102,241,0.4)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', py: 3, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', fontWeight: 700, borderRadius: 12, border: 'none',
                height: 52, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 10, transition: 'all 0.3s', marginTop: 12,
              }}
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                  INITIALIZING...
                </>
              ) : (
                <>SIGN UP ⚡</>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
              Active operative?{' '}
              <Link to="/login" style={{ color: '#818cf8', fontWeight: 600 }} className="hover:underline">Login</Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} className="hover:text-white transition-colors">
            <span>←</span> Back to Terminal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
