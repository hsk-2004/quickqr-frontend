import { Link } from 'react-router-dom';
import './Landing.css';

/**
 * Landing page - entry point for unauthenticated users
 * Displays feature overview and navigation to login/register
 */
export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>QuickQR</h1>
        <p className="subtitle">Generate and Manage QR Codes with Ease</p>
        
        <p className="description">
          Create, track, and manage your QR codes all in one place. 
          Perfect for businesses, marketing campaigns, and personal projects.
        </p>

        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Sign In
          </Link>
        </div>

        <div className="features">
          <div className="feature">
            <h3>⚡ Fast Generation</h3>
            <p>Create QR codes instantly</p>
          </div>
          <div className="feature">
            <h3>📊 Track History</h3>
            <p>Keep a record of all your QR codes</p>
          </div>
          <div className="feature">
            <h3>🔒 Secure</h3>
            <p>Your data is protected with JWT authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
}
