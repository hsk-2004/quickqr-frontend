import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QRForm from '../components/QRForm';
import QRCard from '../components/QRCard';
import './Dashboard.css';

/**
 * Dashboard page - main authenticated page where users manage QR codes
 * Shows QR form and generated QR codes
 */
export default function Dashboard() {
  const { user } = useAuth();
  const [qrCodes, setQrCodes] = useState([]);

  // Handle creating new QR code (from QRForm component)
  const handleCreateQR = (qrData) => {
    const newQR = {
      id: Date.now(),
      ...qrData,
      createdAt: new Date().toLocaleDateString(),
    };
    setQrCodes((prev) => [newQR, ...prev]);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.username}!</h1>
          <p>Generate and manage your QR codes</p>
        </div>
        <Link to="/dashboard/history" className="btn-history">
          📊 View History
        </Link>
      </div>

      <div className="dashboard-content">
        <div className="qr-form-section">
          <QRForm onCreateQR={handleCreateQR} />
        </div>

        <div className="qr-cards-section">
          <h2>Recent QR Codes</h2>
          {qrCodes.length === 0 ? (
            <p className="no-qr-message">
              No QR codes generated yet. Create one to get started!
            </p>
          ) : (
            <div className="qr-cards-grid">
              {qrCodes.map((qr) => (
                <QRCard key={qr.id} qrData={qr} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
