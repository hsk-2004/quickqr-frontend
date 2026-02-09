import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './History.css';

/**
 * History page - displays all historical QR codes
 * Shows a list or table of previously generated codes
 */
export default function History() {
  const { user } = useAuth();
  const [qrHistory, setQrHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  // Simulate loading history from API (in real app, fetch from backend)
  useEffect(() => {
    // In a real application, you would call:
    // const data = await qrAPI.getHistory();
    // setQrHistory(data);

    // For now, using mock data
    setQrHistory([
      {
        id: 1,
        data: 'https://example.com',
        createdAt: '2024-02-05',
        scans: 5,
      },
      {
        id: 2,
        data: 'Contact: john@example.com',
        createdAt: '2024-02-04',
        scans: 12,
      },
      {
        id: 3,
        data: 'WiFi SSID',
        createdAt: '2024-02-03',
        scans: 3,
      },
    ]);
  }, []);

  // Filter history based on selected filter
  const filteredHistory = qrHistory.filter((qr) => {
    if (filter === 'today') {
      return qr.createdAt === new Date().toLocaleDateString();
    }
    return true;
  });

  return (
    <div className="history-container">
      <div className="history-header">
        <div>
          <h1>QR Code History</h1>
          <p>View all your previously generated codes</p>
        </div>
        <Link to="/dashboard" className="btn-back">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="history-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Time
        </button>
        <button
          className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
          onClick={() => setFilter('today')}
        >
          Today
        </button>
      </div>

      <div className="history-content">
        {filteredHistory.length === 0 ? (
          <p className="no-history-message">
            No QR codes found for this period.
          </p>
        ) : (
          <div className="history-table">
            <div className="table-header">
              <div className="col-data">Data</div>
              <div className="col-date">Created</div>
              <div className="col-scans">Scans</div>
              <div className="col-actions">Actions</div>
            </div>
            {filteredHistory.map((qr) => (
              <div key={qr.id} className="table-row">
                <div className="col-data">
                  <code>{qr.data}</code>
                </div>
                <div className="col-date">{qr.createdAt}</div>
                <div className="col-scans">{qr.scans}</div>
                <div className="col-actions">
                  <button className="btn-small">Download</button>
                  <button className="btn-small">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
