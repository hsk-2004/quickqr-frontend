import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../services/api';
import QRForm from '../components/QRForm';
import QRCard from '../components/QRCard';
import './Dashboard.css';

/**
 * Dashboard page – authenticated user dashboard
 * Shows QR form + generated QR codes
 */
export default function Dashboard() {
  const { user } = useAuth();

  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 🔥 Load QR history from backend
  useEffect(() => {
    const loadQRCodes = async () => {
      try {
        const res = await qrAPI.getHistory();
        setQrCodes(res.data.map(normalizeQR));
      } catch (err) {
        console.error('Failed to load QR codes', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadQRCodes();
  }, []);

  // 🔥 Handle create
  const handleCreateQR = (qrFromBackend) => {
    const qrData = qrFromBackend.qr || qrFromBackend;
    setQrCodes((prev) => [normalizeQR(qrData), ...prev]);
  };

  // 🔥 Delete QR
  const handleDeleteQR = async (id) => {
    try {
      await qrAPI.deleteQR(id);
      setQrCodes((prev) => prev.filter((qr) => qr.id !== id));
    } catch (err) {
      alert('Failed to delete QR');
    }
  };

  const filteredQRCodes = qrCodes.filter((qr) =>
    filter === 'all' ? true : qr.type === filter
  );

  const qrTypes = ['all', ...new Set(qrCodes.map((qr) => qr.type).filter(Boolean))];

  return (
    <motion.div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            Welcome back, <span className="username">{user?.username}</span> 👋
          </h1>
          <p>Generate and manage your QR codes</p>
        </div>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-info">
            <h3>{qrCodes.length}</h3>
            <p>Total QR Codes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>
              {
                qrCodes.filter(
                  (qr) =>
                    new Date(qr.createdAt).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </h3>
            <p>Created Today</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-content">
        <div className="qr-form-section">
          <QRForm onQRGenerated={handleCreateQR} />
        </div>

        <div className="qr-cards-section">
          <div className="section-header">
            <h2>Your QR Codes</h2>

            {qrCodes.length > 0 && (
              <div className="filter-buttons">
                {qrTypes.map((type) => (
                  <button
                    key={type}
                    className={`filter-btn ${filter === type ? 'active' : ''}`}
                    onClick={() => setFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {isLoading ? (
              <p>Loading QR codes...</p>
            ) : filteredQRCodes.length === 0 ? (
              <p>No QR codes yet</p>
            ) : (
              <div className="qr-cards-grid">
                {filteredQRCodes.map((qr) => (
                  <QRCard
                    key={qr.id}
                    qr={qr}
                    onDelete={handleDeleteQR}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Normalize backend QR safely
 */
const normalizeQR = (qr) => ({
  id: qr.id,
  name: qr.name,
  url: qr.url,
  imageUrl: qr.image_url || qr.imageUrl,
  createdAt: qr.created_at || qr.createdAt || new Date().toISOString(),
  type: qr.type || 'url',
});
