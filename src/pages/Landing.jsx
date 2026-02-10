import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Landing page – mobile smooth + desktop premium
 */

export default function Landing() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const enableMotion = !prefersReducedMotion && !isMobile;

  const smoothTransition = enableMotion
    ? { type: 'spring', stiffness: 90, damping: 14 }
    : { type: 'tween', duration: 0.25, ease: 'easeOut' };

  /* Variants */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: enableMotion
        ? { staggerChildren: 0.12, delayChildren: 0.1 }
        : {},
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: enableMotion ? 24 : 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: smoothTransition,
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: enableMotion ? 0.9 : 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: smoothTransition,
    },
  };

  const features = [
    {
      icon: '⚡',
      title: 'Fast Generation',
      description: 'Create QR codes instantly with our optimized engine',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: '📊',
      title: 'Track History',
      description: 'Keep a detailed record of all your QR codes',
      color: 'from-secondary-500 to-pink-600',
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Your data is protected with JWT authentication',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">

      {/* Background blobs – desktop only */}
      {enableMotion && (
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <motion.div
            className="absolute -top-40 -right-40 w-72 h-72 rounded-full bg-primary-500 opacity-10 blur-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Hero */}
        <motion.div className="text-center mb-20">
          <motion.h1
            variants={titleVariants}
            className="flex flex-col items-center gap-4 mb-6"
          >
            <span className="text-5xl sm:text-7xl">📱</span>
            <span className="text-3xl sm:text-6xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              QuickQR
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-3xl font-bold text-gray-800 mb-4"
          >
            Generate & Manage QR Codes Easily
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Create, track and organize all your QR codes in one place.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to="/register">
              <motion.button
                whileHover={enableMotion ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold shadow-lg"
              >
                🚀 Get Started
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={enableMotion ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-full border-2 border-primary-200 text-primary-600 font-bold bg-white"
              >
                👋 Sign In
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
        >
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={enableMotion ? { y: -8 } : {}}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-600 mb-4">{f.description}</p>
              <div className={`h-1 rounded-full bg-gradient-to-r ${f.color}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
        >
          {[
            { n: '10K+', l: 'QR Codes Generated' },
            { n: '5K+', l: 'Happy Users' },
            { n: '99.9%', l: 'Uptime' },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <h3 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {s.n}
              </h3>
              <p className="text-gray-600 font-semibold">{s.l}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-10 border"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands creating QR codes effortlessly.
          </p>
          <Link to="/register">
            <motion.button
              whileHover={enableMotion ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-bold shadow-lg"
            >
              Start Creating →
            </motion.button>
          </Link>
        </motion.div>

      </motion.div>

      {/* Footer */}
      <footer className="border-t bg-white py-6 text-center text-gray-600">
        © 2024 QuickQR. All rights reserved.
      </footer>

    </div>
  );
}
