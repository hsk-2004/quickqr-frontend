import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GlowOrbs = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <div style={{
      position: 'absolute', top: '-10%', right: '-5%',
      width: '60vw', height: '60vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
      filter: 'blur(80px)',
      animation: 'float 20s infinite alternate ease-in-out',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', left: '-5%',
      width: '50vw', height: '50vw', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
      filter: 'blur(80px)',
      animation: 'float 25s infinite alternate-reverse ease-in-out',
    }} />
    <style>{`
      @keyframes float { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px, 60px) scale(1.1); } }
    `}</style>
  </div>
);

export default function Landing() {
  const features = [
    { icon: '⚡', title: 'Tactical Speed', desc: 'Generate high-fidelity QR assets in milliseconds.' },
    { icon: '🛡️', title: 'Encrypted', desc: 'Secure asset management with industry-standard protocols.' },
    { icon: '📊', title: 'Metrics', desc: 'Real-time monitoring of your digital bridging fleet.' },
  ];

  return (
    <div style={{ background: '#08080f', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' }}>
      <GlowOrbs />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 120 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              padding: '8px 16px', borderRadius: 100, marginBottom: 32,
              color: '#a5b4fc', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
              textTransform: 'uppercase', fontFamily: 'monospace'
            }}
          >
            <span style={{ fontSize: 16 }}>🚀</span> v1.0.4 AVAILABLE NOW
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(48px, 10vw, 92px)', fontWeight: 800, lineHeight: 1,
              letterSpacing: '-4px', marginBottom: 24, fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(to bottom, #fff 60%, rgba(255,255,255,0.4))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            Digital Assets.<br />Simplified.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: 'clamp(18px, 3vw, 22px)', color: 'rgba(255,255,255,0.4)', maxWidth: 640, margin: '0 auto 48px', lineHeight: 1.6 }}
          >
            The world's most advanced command center for generating and managing mission-critical QR codes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '18px 36px', borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 17,
                  display: 'flex', alignItems: 'center', gap: 10
                }}
              >
                INITIALIZE TERMINAL ⚡
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '18px 36px', borderRadius: 14, background: 'rgba(255,255,255,0.03)',
                  color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer', fontSize: 17
                }}
              >
                ACCESS CONSOLE
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 120 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: 40, borderRadius: 24, background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 24 }}>{f.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Preview Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            position: 'relative', borderRadius: 32, overflow: 'hidden',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
            padding: '20px', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ height: 24, background: 'rgba(255,255,255,0.05)', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <div style={{ height: 400, background: 'rgba(8, 8, 15, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.1)', fontSize: 14, fontFamily: 'monospace' }}>
             // GENSYS_PREVIEW_REDACTED
          </div>
        </motion.div>

      </main>

      <footer style={{ textAlign: 'center', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.15)', fontSize: 13, fontFamily: 'monospace' }}>
        © 2024 QUICKQR_GENSYS. ALL_RIGHTS_RESERVED // [STATUS: STABLE]
      </footer>
    </div>
  );
}
