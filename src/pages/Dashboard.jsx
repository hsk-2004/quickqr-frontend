import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../services/api';
import QRForm from '../components/QRForm';
import QRCard from '../components/QRCard';

/* ── Normalizer ─────────────────────────────────────────────── */
const normalizeQR = (qr = {}) => ({
  id: qr.id,
  name: qr.name ?? '',
  url: qr.url ?? '',
  imageUrl: qr.image_url ?? qr.imageUrl ?? '',
  createdAt: qr.created_at ?? qr.createdAt ?? new Date().toISOString(),
  type: qr.type ?? 'url',
});

/* ── Animated Counter ────────────────────────────────────────── */
function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (start === end) return;
    const step = Math.ceil(end / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 40);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
}

/* ── Glow Orb Background ─────────────────────────────────────── */
function GlowOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float1 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float2 10s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float3 12s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,30px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,-40px)} }
        @keyframes float3 { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,20px)} }
      `}</style>
    </div>
  );
}

/* ── Stat Card ───────────────────────────────────────────────── */
function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, type: 'spring', stiffness: 200 }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{
        background: 'rgba(15,15,25,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '24px 28px',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Gradient accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: stat.accent,
        opacity: 0.8,
      }} />
      {/* Glow behind icon */}
      <div style={{
        position: 'absolute', top: 20, right: 20,
        fontSize: 38, opacity: 0.12,
        filter: 'blur(6px)',
        transform: 'scale(2)',
      }}>{stat.icon}</div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'monospace' }}>
            {stat.label}
          </p>
          <p style={{ color: '#fff', fontSize: 42, fontWeight: 800, lineHeight: 1, letterSpacing: '-2px', fontFamily: '"Space Grotesk", sans-serif' }}>
            <AnimatedNumber value={stat.value} />
          </p>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: stat.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
          boxShadow: `0 0 20px ${stat.shadowColor}`,
        }}>
          {stat.icon}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Filter Pill ─────────────────────────────────────────────── */
function FilterPill({ type, active, onClick }) {
  const label = type === 'all' ? '⚡ All' : type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.04 }}
      style={{
        padding: '8px 18px',
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 600,
        border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
        background: active
          ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
          : 'rgba(255,255,255,0.05)',
        color: active ? '#fff' : 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        transition: 'color 0.2s',
        boxShadow: active ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
        letterSpacing: '0.02em',
        fontFamily: 'monospace',
      }}
    >
      {label}
    </motion.button>
  );
}

/* ── Main Dashboard ──────────────────────────────────────────── */
export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    const fetchQRCodes = async () => {
      try {
        const res = await qrAPI.getHistory();
        setQrCodes((res?.data || []).map(normalizeQR));
      } catch (err) {
        console.error('Failed to load QR codes', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQRCodes();
  }, [isAuthenticated]);

  const handleCreateQR = useCallback((qrFromBackend) => {
    if (!qrFromBackend) return;
    const qrData = normalizeQR(qrFromBackend.qr || qrFromBackend);
    setQrCodes((prev) => {
      if (prev.some((q) => q.id === qrData.id)) return prev;
      return [qrData, ...prev];
    });
  }, []);

  const handleDeleteQR = useCallback(async (id) => {
    try {
      await qrAPI.deleteQR(id);
      setQrCodes((prev) => prev.filter((q) => q.id !== id));
    } catch {
      alert('Failed to delete QR. Try again.');
    }
  }, []);

  const qrTypes = useMemo(
    () => ['all', ...new Set(qrCodes.map((q) => q.type).filter(Boolean))],
    [qrCodes]
  );

  const filteredQRCodes = useMemo(() => {
    if (filter === 'all') return qrCodes;
    return qrCodes.filter((qr) => qr.type === filter);
  }, [qrCodes, filter]);

  const stats = useMemo(() => [
    {
      icon: '◈',
      label: 'Total Generated',
      value: qrCodes.length,
      accent: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
      bg: 'rgba(99,102,241,0.15)',
      shadowColor: 'rgba(99,102,241,0.3)',
    },
    {
      icon: '◉',
      label: "Today's Batch",
      value: qrCodes.filter(
        (q) => new Date(q.createdAt).toDateString() === new Date().toDateString()
      ).length,
      accent: 'linear-gradient(90deg, #10b981, #34d399)',
      bg: 'rgba(16,185,129,0.15)',
      shadowColor: 'rgba(16,185,129,0.3)',
    },
    {
      icon: '◇',
      label: 'Unique Types',
      value: qrTypes.length - 1,
      accent: 'linear-gradient(90deg, #f59e0b, #fb923c)',
      bg: 'rgba(245,158,11,0.15)',
      shadowColor: 'rgba(245,158,11,0.3)',
    },
  ], [qrCodes, qrTypes]);

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: #08080f;
          font-family: 'Space Grotesk', sans-serif;
          color: #fff;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.4); border-radius: 99px; }

        .dashboard-container {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          padding: 40px 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 24px;
          align-items: start;
        }

        .qr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        @media (max-width: 1200px) {
          .dashboard-grid { grid-template-columns: 380px 1fr; }
        }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .dashboard-container { padding: 32px 24px; }
        }

        @media (max-width: 640px) {
          .dashboard-container { padding: 24px 16px; }
          .qr-grid { grid-template-columns: 1fr; }
          .stat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <GlowOrbs />

      <div className="dashboard-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 12px #10b981',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                System Ready
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(32px, 8vw, 52px)',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-1.5px',
              background: 'linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {isAuthenticated ? `Hey, ${user?.username || 'User'} 👾` : 'Welcome to QuickQR ⚡'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', marginTop: 8, fontSize: 'clamp(14px, 2vw, 15px)', letterSpacing: '0.01em' }}>
              {isAuthenticated
                ? 'Your QR command center — generate, track, destroy.'
                : 'The ultimate terminal for rapid QR generation. Ready for deployment.'}
            </p>
          </div>

          {/* Time stamp */}
          <div style={{
            fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.1em', textAlign: 'right', minWidth: 150
          }}>
            <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <div style={{ color: 'rgba(255,255,255,0.12)' }}>SYSTEM_CLOCK // {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 36 }}>
          {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
        </div>

        {/* ── Main 2-col layout ── */}
        <div className="dashboard-grid">

          {/* Left: QR Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 160 }}
          >
            <div style={{
              background: 'rgba(15,15,25,0.7)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24,
              padding: 28,
              backdropFilter: 'blur(24px)',
              position: 'sticky',
              top: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, boxShadow: '0 0 16px rgba(99,102,241,0.4)',
                }}>⚡</div>
                <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px' }}>New QR Code</span>
              </div>

              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: 16,
                    padding: '20px',
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ color: '#a5b4fc', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                    Authentication Required
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 16 }}>
                    Please login to initialize the QR generation engine.
                  </p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                    <Link to="/login" style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}>SIGN IN</Link>
                    <Link to="/register" style={{
                      padding: '8px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}>JOIN NOW</Link>
                  </div>
                </motion.div>
              )}

              <QRForm onQRGenerated={handleCreateQR} />
            </div>
          </motion.div>

          {/* Right: QR List */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 160 }}
          >
            <div style={{
              background: 'rgba(15,15,25,0.7)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24,
              padding: 28,
              backdropFilter: 'blur(24px)',
            }}>
              {/* List header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.4px' }}>Your Codes</h2>
                  <span style={{
                    background: 'rgba(99,102,241,0.2)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#a5b4fc',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    padding: '2px 8px',
                    borderRadius: 6,
                    letterSpacing: '0.05em',
                  }}>
                    {filteredQRCodes.length} total
                  </span>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {qrTypes.map((type) => (
                    <FilterPill key={type} type={type} active={filter === type} onClick={() => setFilter(type)} />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }} />

              {/* Content */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '60px 0' }}
                  >
                    <div style={{ display: 'inline-block', marginBottom: 16 }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                          width: 40, height: 40, border: '2px solid rgba(255,255,255,0.08)',
                          borderTop: '2px solid #6366f1', borderRadius: '50%',
                        }}
                      />
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.1em' }}>
                      LOADING CODES...
                    </p>
                  </motion.div>
                ) : filteredQRCodes.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '60px 0' }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>◈</div>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
                      {!isAuthenticated
                        ? '// LOGIN TO SYNC YOUR DATA'
                        : (filter === 'all' ? '// No QR codes yet. Generate one.' : `// No codes of type "${filter}"`)}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="qr-grid"
                  >
                    <AnimatePresence>
                      {filteredQRCodes.map((qr, i) => (
                        <motion.div
                          key={qr.id}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ delay: i * 0.04, type: 'spring', stiffness: 220 }}
                        >
                          <QRCard qr={qr} onDelete={handleDeleteQR} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}