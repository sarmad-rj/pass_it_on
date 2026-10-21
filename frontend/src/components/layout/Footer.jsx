import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Heart, 
  Calendar, 
  Lock, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function Footer({ setActiveScreen }) {
  return (
    <footer className="real-footer glass-panel">
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand-header">
            <div className="footer-logo-box">
              <img src="/images/logo.jpg" alt="Pass It On" className="footer-logo-img" />
            </div>
            <div>
              <div className="footer-brand-title">Pass It On</div>
              <div className="footer-brand-sub">Borrow with confidence</div>
            </div>
          </div>
          <p className="footer-tagline">
            A community platform where neighbors lend and rent items they rarely use — without ever clashing over dates.
          </p>
          <div className="footer-badges">
            <span className="clay-badge-emerald">
              <ShieldCheck size={12} />
              <span>Zero Double-Bookings</span>
            </span>
            <span className="neu-sunken-pill campus-pill">
              <MapPin size={12} className="text-indigo" />
              <span>COMSATS Islamabad</span>
            </span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Platform Navigation</h4>
          <ul className="footer-links">
            <li>
              <button onClick={() => setActiveScreen('home')}>
                Browse Community Gear
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('item-detail')}>
                Live Availability Calendar
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('booking-lifecycle')}>
                Mock Escrow & Booking Lifecycle
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('admin')}>
                Admin Moderation & Disputes
              </button>
            </li>
            <li>
              <button onClick={() => setActiveScreen('auth')}>
                Sign In / Create Account
              </button>
            </li>
          </ul>
        </div>

        {/* The Overlap Guarantee Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">The Trust Guarantee</h4>
          <div className="footer-trust-card neu-sunken">
            <div className="trust-item">
              <strong>Atomic Overlap Rule</strong>
              <p>Two active bookings never share a date (A.start &lt; B.end AND B.start &lt; A.end).</p>
            </div>
            <div className="trust-item">
              <strong>100% Mock Escrow</strong>
              <p>Deposits are safely held and refunded without real payment hassle.</p>
            </div>
          </div>
        </div>

        {/* Student & Project Details */}
        <div className="footer-col project-col">
          <h4 className="footer-col-title">Semester Web Project</h4>
          <p className="project-detail-text">
            <strong>Course:</strong> Advanced Web Technologies Lab<br />
            <strong>Author:</strong> Sarmad Rj (@Sarmad Rj)<br />
            <strong>Stack:</strong> MERN (MongoDB, Express, React, Node.js)<br />
            <strong>Status:</strong> Release 1.0 (UI Screens & Conflict Engine)
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-copyright">
          © 2026 Pass It On. All community gear bookings protected by 3-layer overlap guard.
        </div>
        <div className="footer-meta">
          <span>COMSATS University Islamabad</span>
          <span>•</span>
          <span>6th Semester Web Tech</span>
        </div>
      </div>
    </footer>
  );
}
