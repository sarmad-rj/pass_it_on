import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  DollarSign, 
  AlertTriangle, 
  Star, 
  FileText, 
  ChevronRight, 
  Calendar, 
  RotateCcw,
  Sparkles,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { LISTINGS } from '../data/mockData';

export default function BookingLifecycleView({ setActiveScreen }) {
  const item = LISTINGS[0]; // Sony Alpha A7 IV

  // Interactive current step in the 9-state lifecycle
  // 1: Requested, 2: Accepted, 3: Deposit Held, 4: Handover Confirmed, 5: In Use, 6: Returned, 7: Deposit Released
  const [currentStep, setCurrentStep] = useState(3);
  const [rating, setRating] = useState(5);
  const [reviewNote, setReviewNote] = useState('Camera was in pristine condition, battery fully charged, lenses spotless. Handover was on time at COMSATS campus!');
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeReported, setDisputeReported] = useState(false);

  const steps = [
    { num: 1, title: 'Requested', desc: 'Borrower picked free dates' },
    { num: 2, title: 'Lender Accepted', desc: 'Dates locked exclusively' },
    { num: 3, title: 'Deposit Held', desc: 'Mock $300 escrow reserved' },
    { num: 4, title: 'Handover Done', desc: 'Physical check & pickup' },
    { num: 5, title: 'In-Use', desc: 'Active project shoot' },
    { num: 6, title: 'Returned Clean', desc: 'Lender checks equipment' },
    { num: 7, title: 'Deposit Released', desc: '100% Escrow refunded' },
  ];

  return (
    <div className="lifecycle-view-container">
      {/* Top Header */}
      <div className="lifecycle-header glass-panel">
        <div className="lifecycle-header-left">
          <button 
            className="back-btn neu-sunken-pill"
            onClick={() => setActiveScreen('home')}
          >
            <ArrowLeft size={16} />
            <span>Marketplace</span>
          </button>
          <div>
            <div className="lifecycle-title-row">
              <h2>Booking Lifecycle & Mock Escrow</h2>
              <span className="clay-badge-emerald">Active Booking #BK-1082</span>
            </div>
            <p className="lifecycle-sub">
              Demonstrating the 9-state lifecycle and tamper-proof deposit tracking from the Pass It On brief.
            </p>
          </div>
        </div>

        <div className="lifecycle-header-actions">
          <button 
            className="neu-sunken-pill simulate-next-btn"
            onClick={() => setCurrentStep(prev => prev < 7 ? prev + 1 : 1)}
          >
            <Sparkles size={15} className="text-amber" />
            <span>Simulate Next Lifecycle Step ({currentStep}/7)</span>
          </button>
        </div>
      </div>

      {/* Main Lifecycle Stepper (Claymorphic & Glassmorphic) */}
      <div className="stepper-glass-card glass-panel">
        <div className="stepper-track">
          {steps.map((st, i) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <div 
                key={st.num} 
                className={`step-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => setCurrentStep(st.num)}
                style={{ cursor: 'pointer' }}
                title="Click to jump to this lifecycle stage"
              >
                <div className="step-circle clay-card">
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-emerald" />
                  ) : (
                    <span>{st.num}</span>
                  )}
                </div>
                <div className="step-labels">
                  <span className="step-title">{st.title}</span>
                  <span className="step-desc">{st.desc}</span>
                </div>
                {i < steps.length - 1 && <div className="step-connector-line"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Columns: Active Booking Info + Mock Escrow Ledger */}
      <div className="lifecycle-columns-grid">
        {/* Left: Active Booking Item Card */}
        <div className="booking-summary-card glass-panel">
          <div className="booking-item-header">
            <img src={item.image} alt={item.title} className="summary-thumb" />
            <div className="summary-info">
              <span className="summary-id font-mono">BOOKING #BK-1082</span>
              <h3>{item.title}</h3>
              <p className="summary-dates">
                <Calendar size={14} />
                <span>Oct 22, 2026 — Oct 25, 2026 (4 days)</span>
              </p>
            </div>
          </div>

          <div className="parties-summary-box neu-sunken">
            <div className="p-party">
              <span className="p-label">Lender:</span>
              <strong>{item.owner.name}</strong>
              <span className="p-sub">Sector H-8 / COMSATS</span>
            </div>
            <div className="p-divider"></div>
            <div className="p-party">
              <span className="p-label">Borrower:</span>
              <strong>Hamza Tariq</strong>
              <span className="p-sub">Verified Student #FA23-BCS-041</span>
            </div>
          </div>

          {/* Current State Details */}
          <div className="current-state-card clay-card">
            <div className="state-badge-row">
              <span className="state-pill neu-sunken">Stage {currentStep} of 7</span>
              <span className="clay-badge-emerald">Conflict-Free Locked</span>
            </div>
            <h4>
              Current Status: {steps[currentStep - 1]?.title}
            </h4>
            <p className="state-explanation">
              {currentStep === 1 && "Request submitted by borrower. Dates are temporarily marked pending."}
              {currentStep === 2 && "Lender accepted request! The 3-layer overlap guard has locked Oct 22-25 exclusively."}
              {currentStep === 3 && "Mock deposit of $300.00 is held safely in escrow. No real money moves."}
              {currentStep === 4 && "Borrower met lender at COMSATS campus and inspected the camera condition."}
              {currentStep === 5 && "Item is currently in use for university semester media production."}
              {currentStep === 6 && "Camera returned safely to lender with lens and accessories verified intact."}
              {currentStep === 7 && "Clean return verified! Mock escrow deposit of $300.00 released back to borrower."}
            </p>
          </div>

          {/* Dispute Reporting Trigger */}
          <div className="dispute-trigger-box neu-sunken">
            <div className="trigger-left">
              <AlertTriangle size={18} className="text-rose" />
              <div>
                <strong>Problem with this booking?</strong>
                <p>Either side can report an issue to trigger admin dispute moderation.</p>
              </div>
            </div>
            <button 
              className="clay-badge-rose dispute-btn"
              onClick={() => {
                setDisputeReported(true);
                alert('Dispute Logged! An admin moderator has been notified to review the held deposit in the Admin Dashboard.');
              }}
            >
              {disputeReported ? 'Dispute Under Review' : 'Report Dispute'}
            </button>
          </div>
        </div>

        {/* Right: Mock Deposit Escrow Ledger */}
        <div className="escrow-ledger-card glass-panel">
          <div className="ledger-header">
            <div>
              <h3>Mock Deposit Escrow History</h3>
              <p className="ledger-sub">Immutable transaction log for Booking #BK-1082</p>
            </div>
            <div className="escrow-pill clay-card">
              <span className="esc-t">Escrow Balance</span>
              <span className="esc-v font-mono">
                {currentStep >= 3 && currentStep < 7 ? '$300.00 HELD' : '$0.00 (RELEASED)'}
              </span>
            </div>
          </div>

          <div className="ledger-timeline neu-sunken">
            <div className="tx-item">
              <div className="tx-icon-box bg-indigo">
                <FileText size={14} />
              </div>
              <div className="tx-body">
                <div className="tx-title-row">
                  <span className="tx-type">REQUEST CREATED</span>
                  <span className="tx-amt">$0.00</span>
                </div>
                <p className="tx-desc">Borrower selected 4 days (Oct 22 - 25)</p>
                <span className="tx-time font-mono">2026-10-20 09:12:00</span>
              </div>
            </div>

            {currentStep >= 2 && (
              <div className="tx-item">
                <div className="tx-icon-box bg-teal">
                  <Lock size={14} />
                </div>
                <div className="tx-body">
                  <div className="tx-title-row">
                    <span className="tx-type">DATES ATOMICALLY LOCKED</span>
                    <span className="tx-amt">RESERVED</span>
                  </div>
                  <p className="tx-desc">Lender @Sarmad Rj accepted request</p>
                  <span className="tx-time font-mono">2026-10-20 09:24:15</span>
                </div>
              </div>
            )}

            {currentStep >= 3 && (
              <div className="tx-item">
                <div className="tx-icon-box bg-amber">
                  <DollarSign size={14} />
                </div>
                <div className="tx-body">
                  <div className="tx-title-row">
                    <span className="tx-type">MOCK DEPOSIT HELD</span>
                    <span className="tx-amt font-mono text-amber">+$300.00 HELD</span>
                  </div>
                  <p className="tx-desc">Held in escrow pending safe return</p>
                  <span className="tx-time font-mono">2026-10-20 09:25:01</span>
                </div>
              </div>
            )}

            {currentStep >= 6 && (
              <div className="tx-item">
                <div className="tx-icon-box bg-emerald">
                  <CheckCircle2 size={14} />
                </div>
                <div className="tx-body">
                  <div className="tx-title-row">
                    <span className="tx-type">RETURN CONFIRMED</span>
                    <span className="tx-amt font-mono text-emerald">INSPECTED</span>
                  </div>
                  <p className="tx-desc">Zero damages reported by lender</p>
                  <span className="tx-time font-mono">2026-10-25 18:30:00</span>
                </div>
              </div>
            )}

            {currentStep >= 7 && (
              <div className="tx-item">
                <div className="tx-icon-box bg-emerald">
                  <RotateCcw size={14} />
                </div>
                <div className="tx-body">
                  <div className="tx-title-row">
                    <span className="tx-type">DEPOSIT RELEASED</span>
                    <span className="tx-amt font-mono text-emerald">-$300.00 REFUNDED</span>
                  </div>
                  <p className="tx-desc">Full mock deposit refunded to borrower</p>
                  <span className="tx-time font-mono">2026-10-25 18:31:22</span>
                </div>
              </div>
            )}
          </div>

          {/* Mutual Rating & Review Section (Brief requirement) */}
          <div className="rating-review-card clay-card">
            <div className="rating-card-header">
              <Star size={18} className="text-amber" />
              <h4>Mutual Community Review</h4>
            </div>
            <p className="rating-sub">Both sides rate each other after a completed booking.</p>

            <div className="stars-row">
              {[1, 2, 3, 4, 5].map(st => (
                <button 
                  key={st}
                  className="star-click-btn"
                  onClick={() => setRating(st)}
                >
                  <Star 
                    size={22} 
                    fill={st <= rating ? '#f59e0b' : 'none'} 
                    color={st <= rating ? '#f59e0b' : '#94a3b8'} 
                  />
                </button>
              ))}
              <span className="rating-count-pill neu-sunken">{rating}.0 / 5.0 Stars</span>
            </div>

            <textarea 
              className="neu-input review-textarea"
              rows={3}
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="Leave feedback on item condition and handover experience..."
            />

            <button 
              className="clay-button-primary submit-review-btn"
              onClick={() => alert('Review submitted and added to lender profile!')}
            >
              <span>Submit Verified Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
