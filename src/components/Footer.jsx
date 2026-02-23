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
        marginTop: 80,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: '0 0 20px rgba(99,102,241,0.3)',
              }}>⚡</div>
              <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-1px', fontFamily: '"Space Grotesk", sans-serif' }}>QuickQR</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, lineHeight: 1.6, maxWidth: 400 }}>
              The definitive command center for digital bridging.
              Generate, monitor, and encrypt your assets with industrial-grade precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'monospace' }}>
              Navigation
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-white/50 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-indigo-500 transition-all opacity-0 group-hover:opacity-100" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'monospace' }}>
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -4, backgroundColor: 'rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.4)' }}
                  style={{
                    width: 44, height: 44,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    fontSize: 18,
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
          paddingTop: 32,
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          mdDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }} className="md:flex-row">
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 13, fontFamily: 'monospace' }}>
            © {currentYear} QUICKQR_GENSYS. <span style={{ color: 'rgba(99,102,241,0.4)' }}>VER_1.0.4</span>
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Security'].map(item => (
              <a key={item} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', hover: { color: '#fff' } }} className="hover:text-white transition-colors">
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
