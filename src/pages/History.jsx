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
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
              QR Code History
            </h1>
            <p className="text-lg text-gray-600">
              View and manage all your previously generated codes
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex gap-3 mb-8"
        >
          {[
            { value: 'all', label: '📋 All Time', icon: '📋' },
            { value: 'today', label: '📅 Today', icon: '📅' },
          ].map((btn) => (
            <motion.button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === btn.value
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-300 hover:bg-primary-50'
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
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-flex gap-2 mb-4">
                <span className="inline-block w-3 h-3 rounded-full bg-primary-400 animate-bounce" />
                <span className="inline-block w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="inline-block w-3 h-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <p className="text-gray-600 font-medium">Loading history...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-gray-600 text-lg font-medium">
                No QR codes found for this period
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-primary-50">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Data</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Created</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Scans</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredHistory.map((qr) => (
                      <motion.tr
                        key={qr.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-primary-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {qr.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <code className="bg-gray-100 px-3 py-1 rounded text-xs break-all max-w-xs inline-block">
                            {qr.data.length > 50 ? qr.data.substring(0, 50) + '...' : qr.data}
                          </code>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          {qr.createdAt}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold">
                            {qr.scans}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <div className="flex flex-col sm:flex-row justify-end gap-2">
                            <button className="px-3 sm:px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 font-semibold transition-colors text-sm whitespace-nowrap">
                              📥 Download
                            </button>
                            <button className="px-3 sm:px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-semibold transition-colors text-sm whitespace-nowrap">
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredHistory.map((qr) => (
                  <motion.div
                    key={qr.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 hover:bg-primary-50 transition-colors"
                  >
                    <div className="mb-4">
                      <h3 className="font-bold text-gray-900 mb-2">{qr.name}</h3>
                      <code className="bg-gray-100 px-3 py-1 rounded text-xs break-all inline-block w-full mb-3">
                        {qr.data}
                      </code>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">Created</p>
                        <p className="text-sm text-gray-900">{qr.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">Scans</p>
                        <p className="text-sm font-bold bg-primary-100 text-primary-700 rounded px-2 py-1 inline-block">
                          {qr.scans}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 font-semibold transition-colors text-sm">
                        📥 Download
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-semibold transition-colors text-sm">
                        🗑️ Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Summary */}
        {!isLoading && filteredHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 p-6 bg-primary-50 border border-primary-200 rounded-2xl"
          >
            <p className="text-lg font-semibold text-gray-900">
              📊 Summary: You have <span className="text-primary-600">{filteredHistory.length}</span> QR code{filteredHistory.length !== 1 ? 's' : ''} {filter === 'today' ? 'created today' : 'in total'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
