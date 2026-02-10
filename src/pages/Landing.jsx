import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl bg-primary-500"
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
          className="absolute -bottom-32 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-secondary-500"
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
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl bg-pink-500 transform -translate-x-1/2 -translate-y-1/2"
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
        className="relative z-10 min-h-screen flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="flex-1 flex flex-col items-center justify-center text-center mb-16">
          <motion.h1 
            variants={titleVariants} 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4 mb-6"
          >
            <span className="inline-block text-6xl sm:text-7xl">📱</span>
            <span className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent tracking-tight">
              QuickQR
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 max-w-2xl"
          >
            Generate and Manage QR Codes <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">with Ease</span>
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed"
          >
            Create, track, and manage your QR codes all in one place.
            <br className="hidden sm:block" />
            Perfect for businesses, marketing campaigns, and personal projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 w-full sm:w-auto justify-center"
            variants={itemVariants}
          >
            <Link 
              to="/register"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="mr-2">🚀</span>
                Get Started
              </motion.button>
            </Link>
            <Link 
              to="/login"
              className="inline-block"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-white border-2 border-primary-200 text-primary-600 font-bold text-lg rounded-full shadow-md hover:shadow-lg hover:bg-primary-50 transition-all"
              >
                <span className="mr-2">👋</span>
                Sign In
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 w-full"
            variants={itemVariants}
          >
            {[
              { label: 'No credit card required' },
              { label: 'Free forever' },
              { label: 'Secure & private' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center justify-center gap-2 text-gray-700 font-semibold"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">✓</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={itemVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-8 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4 inline-block"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <motion.div
                  className={`h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '10K+', label: 'QR Codes Generated', delay: 0.2 },
            { number: '5K+', label: 'Happy Users', delay: 0.3 },
            { number: '99.9%', label: 'Uptime', delay: 0.4 },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <motion.h3
                className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: stat.delay }}
              >
                {stat.number}
              </motion.h3>
              <p className="text-gray-600 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center py-12 px-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl border border-primary-100 mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users creating amazing QR codes today
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Creating Now →
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-gray-200 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 font-semibold">
            &copy; 2024 QuickQR. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-600">
            <a href="#privacy" className="hover:text-primary-600 transition-colors">Privacy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-primary-600 transition-colors">Terms</a>
            <span>·</span>
            <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}