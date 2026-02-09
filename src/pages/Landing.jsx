import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Landing.css';

/**
 * Landing page - entry point for unauthenticated users
 * Displays feature overview and navigation to login/register with smooth animations
 */
export default function Landing() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        delay: index * 0.1,
      },
    }),
  };

  const features = [
    {
      icon: '⚡',
      title: 'Fast Generation',
      description: 'Create QR codes instantly with our optimized engine',
      color: '#667eea',
    },
    {
      icon: '📊',
      title: 'Track History',
      description: 'Keep a detailed record of all your QR codes',
      color: '#764ba2',
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Your data is protected with JWT authentication',
      color: '#f093fb',
    },
  ];

  return (
    <div className="landing-container">
      {/* Animated Background Elements */}
      <div className="background-shapes">
        <motion.div
          className="shape shape-1"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="shape shape-2"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="shape shape-3"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="landing-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="hero-section">
          <motion.h1 variants={titleVariants} whileHover={{ scale: 1.05 }}>
            <span className="logo-icon">📱</span>
            QuickQR
          </motion.h1>

          <motion.p className="subtitle" variants={itemVariants}>
            Generate and Manage QR Codes{' '}
            <span className="gradient-text">with Ease</span>
          </motion.p>

          <motion.p className="description" variants={itemVariants}>
            Create, track, and manage your QR codes all in one place.
            <br />
            Perfect for businesses, marketing campaigns, and personal projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="cta-buttons" variants={itemVariants}>
            <Link to="/register" className="btn btn-primary">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-content"
              >
                <span className="btn-icon">🚀</span>
                Get Started
              </motion.span>
            </Link>
            <Link to="/login" className="btn btn-secondary">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-content"
              >
                <span className="btn-icon">👋</span>
                Sign In
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div className="trust-indicators" variants={itemVariants}>
            <motion.div
              className="trust-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="trust-icon">✓</span>
              <span>No credit card required</span>
            </motion.div>
            <motion.div
              className="trust-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="trust-icon">✓</span>
              <span>Free forever</span>
            </motion.div>
            <motion.div
              className="trust-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="trust-icon">✓</span>
              <span>Secure & private</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="features" variants={itemVariants}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature"
              custom={index}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 300 },
              }}
            >
              <motion.div
                className="feature-icon"
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.2,
                }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <motion.div
                className="feature-accent"
                style={{ background: feature.color }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="stats-section"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.h3
              className="stat-number"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              10K+
            </motion.h3>
            <p className="stat-label">QR Codes Generated</p>
          </motion.div>

          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.h3
              className="stat-number"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              5K+
            </motion.h3>
            <p className="stat-label">Happy Users</p>
          </motion.div>

          <motion.div
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.h3
              className="stat-number"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.4 }}
            >
              99.9%
            </motion.h3>
            <p className="stat-label">Uptime</p>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="final-cta"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="final-cta-title">Ready to get started?</h2>
          <p className="final-cta-description">
            Join thousands of users creating amazing QR codes today
          </p>
          <Link to="/register" className="btn btn-primary btn-large">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-content"
            >
              Start Creating Now →
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="landing-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p>&copy; 2024 QuickQR. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <span>·</span>
          <a href="#terms">Terms</a>
          <span>·</span>
          <a href="#contact">Contact</a>
        </div>
      </motion.footer>
    </div>
  );
}