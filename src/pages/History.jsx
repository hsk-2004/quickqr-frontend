import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../services/api';

export default function History() {
  const { user } = useAuth();
  const [qrHistory, setQrHistory] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await qrAPI.getHistory();
        setQrHistory((res?.data || []).map((qr) => ({
          id: qr.id,
          data: qr.url || qr.name || 'Unknown',
          name: qr.name || 'Untitled',
          createdAt: qr.created_at ? new Date(qr.created_at).toLocaleDateString() : 'Unknown',
          scans: qr.scans || 0,
        })));
      } catch (err) {
        console.error('Failed to load history:', err);
        // Fallback to demo data
        setQrHistory([
          {
            id: 1,
            data: 'https://example.com',
            name: 'Website QR',
            createdAt: new Date().toLocaleDateString(),
            scans: 5,
          },
          {
            id: 2,
            data: 'Contact: john@example.com',
            name: 'Contact QR',
            createdAt: new Date(Date.now() - 86400000).toLocaleDateString(),
            scans: 12,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = qrHistory.filter((qr) => {
    if (filter === 'today') {
      return qr.createdAt === new Date().toLocaleDateString();
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#08080f] text-white overflow-x-hidden">
      {/* Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-3xl sm:text-4xl font-extrabold mb-3">
              Operation History 📂
            </h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              Review and manage your deployed digital bridging fleet.
            </p>
          </div>
          <Link
            to="/dashboard"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl hover:bg-white/5 transition-all text-sm"
          >
            <span>←</span>
            <span>Return to Console</span>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex gap-2 sm:gap-4 mb-8"
        >
          {[
            { value: 'all', label: 'All Deployment', icon: '📋' },
            { value: 'today', label: 'Today Only', icon: '📅' },
          ].map((btn) => (
            <motion.button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              whileTap={{ scale: 0.95 }}
              style={{
                background: filter === btn.value ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.03)',
                border: filter === btn.value ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all text-xs sm:text-sm ${filter === btn.value ? 'text-white shadow-lg' : 'text-gray-400'
                }`}
            >
              {btn.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            background: 'rgba(15,15,25,0.7)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)'
          }}
          className="rounded-3xl shadow-2xl overflow-hidden"
        >
          {isLoading ? (
            <div className="py-24 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-block w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 mb-4"
              />
              <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Loading History...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-4xl mb-6 opacity-30">◈</p>
              <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                // No Data Found
              </p>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Codename</th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Target Data</th>
                      <th className="px-8 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Timestamp</th>
                      <th className="px-8 py-5 text-center text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Access</th>
                      <th className="px-8 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-widest font-mono">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredHistory.map((qr) => (
                      <motion.tr
                        key={qr.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/2 transition-colors group"
                      >
                        <td className="px-8 py-5 text-sm font-bold text-white">
                          {qr.name}
                        </td>
                        <td className="px-8 py-5 text-xs text-gray-500 font-mono">
                          <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                            {qr.data.length > 50 ? qr.data.substring(0, 50) + '...' : qr.data}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-xs text-center text-gray-500 font-mono">
                          {qr.createdAt}
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg font-mono text-xs font-bold">
                            {qr.scans} SCANS
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all">📥</button>
                            <button className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400 transition-all">🗑️</button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tablet/Mobile Card View */}
              <div className="lg:hidden divide-y divide-white/5">
                {filteredHistory.map((qr) => (
                  <motion.div
                    key={qr.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 sm:p-8 hover:bg-white/2 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-white mb-2">{qr.name}</h3>
                        <div className="font-mono text-[10px] text-gray-600 bg-white/2 px-2 py-1 rounded inline-block break-all max-w-full">
                          {qr.data}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded text-[10px] font-mono font-bold">
                        {qr.scans} SCANS
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                        Deployed: {qr.createdAt}
                      </p>

                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white/5 text-xs font-bold rounded-lg hover:bg-white/10 transition-all">
                          DOWNLOAD
                        </button>
                        <button className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-all">
                          PURGE
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Console Summary */}
        {!isLoading && filteredHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
            className="mt-8 p-5 rounded-2xl flex items-center justify-between"
          >
            <p className="font-mono text-[11px] sm:text-xs text-gray-500 uppercase tracking-widest">
              Fleet Status: <span className="text-indigo-400">{filteredHistory.length} Deployments Active</span>
            </p>
            <div className="hidden sm:block h-px flex-1 mx-8 bg-white/5"></div>
            <p className="font-mono text-[11px] text-gray-700">Ver 1.0.4</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
