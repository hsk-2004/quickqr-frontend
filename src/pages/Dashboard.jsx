import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../services/api';
import QRForm from '../components/QRForm';
import QRCard from '../components/QRCard';

export default function Dashboard() {
  const { user } = useAuth();

  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
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
  }, []);

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

  const stats = useMemo(
    () => [
      {
        icon: '📊',
        label: 'Total QR Codes',
        value: qrCodes.length,
        color: 'from-primary-100 to-primary-200 text-primary-700',
      },
      {
        icon: '📅',
        label: 'Created Today',
        value: qrCodes.filter(
          (q) =>
            new Date(q.createdAt).toDateString() ===
            new Date().toDateString()
        ).length,
        color: 'from-green-100 to-green-200 text-green-700',
      },
      {
        icon: '🏷️',
        label: 'QR Types',
        value: qrTypes.length - 1,
        color: 'from-secondary-100 to-pink-200 text-secondary-700',
      },
    ],
    [qrCodes, qrTypes]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50"
    >
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Welcome back,
            <span className="ml-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {user?.username || 'User'}
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage and track all your QR codes in one place
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 bg-gradient-to-br ${stat.color} shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold opacity-75 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
                <span className="text-4xl opacity-40">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* QR Form */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <QRForm onQRGenerated={handleCreateQR} />
          </motion.div>

          {/* QR List */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-primary-50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Your QR Codes</h2>
                  <span className="text-sm font-medium text-gray-600">
                    {filteredQRCodes.length} {filteredQRCodes.length === 1 ? 'code' : 'codes'}
                  </span>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                  {qrTypes.map((type) => (
                    <motion.button
                      key={type}
                      onClick={() => setFilter(type)}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        filter === type
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {type === 'all' ? '📋 All' : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center"
                    >
                      <div className="inline-flex gap-2 mb-4">
                        <span className="inline-block w-3 h-3 rounded-full bg-primary-400 animate-bounce" />
                        <span className="inline-block w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="inline-block w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <p className="text-gray-600 font-medium">Loading your QR codes...</p>
                    </motion.div>
                  ) : filteredQRCodes.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-16 text-center"
                    >
                      <p className="text-5xl mb-4">📭</p>
                      <p className="text-gray-600 font-medium">
                        {filter === 'all'
                          ? 'No QR codes yet. Create your first one!'
                          : `No QR codes of type "${filter}"`}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      layout
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      <AnimatePresence>
                        {filteredQRCodes.map((qr) => (
                          <QRCard key={qr.id} qr={qr} onDelete={handleDeleteQR} />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

/* Normalizer */
const normalizeQR = (qr = {}) => ({
  id: qr.id,
  name: qr.name ?? '',
  url: qr.url ?? '',
  imageUrl: qr.image_url ?? qr.imageUrl ?? '',
  createdAt: qr.created_at ?? qr.createdAt ?? new Date().toISOString(),
  type: qr.type ?? 'url',
});
