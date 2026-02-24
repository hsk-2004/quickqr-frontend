import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'History', path: '/history' },
  ];

  const socialLinks = [
    { icon: '🐙', label: 'GitHub', href: '#' },
    { icon: '🔗', label: 'LinkedIn', href: '#' },
    { icon: '𝕏', label: 'Twitter', href: '#' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'rgba(8, 8, 15, 0.4)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        marginTop: 'clamp(40px, 10vw, 80px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, boxShadow: '0 0 20px rgba(99,102,241,0.3)',
              }}>⚡</div>
              <span style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                fontFamily: 'Syne, sans-serif'
              }}>QuickQR</span>
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: 'clamp(14px, 2vw, 15px)',
              lineHeight: 1.6,
              maxWidth: 400
            }}>
              The definitive command center for digital bridging.
              Generate, monitor, and encrypt your assets with industrial-grade precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 20,
              fontFamily: 'monospace'
            }}>
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-indigo-500 transition-all opacity-0 group-hover:opacity-100" />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 20,
              fontFamily: 'monospace'
            }}>
              Connect
            </h3>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, backgroundColor: 'rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.4)' }}
                  style={{
                    width: 40, height: 40,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    fontSize: 16,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }} className="sm:flex-row">
          <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: 12, fontFamily: 'monospace' }}>
            © {currentYear} QUICKQR_GENSYS. <span style={{ color: 'rgba(99,102,241,0.3)' }}>VER_1.0.4</span>
          </p>
          <div className="flex gap-6 sm:gap-8">
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a key={item} href="#" style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }} className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
