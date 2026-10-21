import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Users, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  FileText, 
  ArrowUpRight, 
  Clock, 
  Search,
  Filter,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { ADMIN_STATS, DISPUTES, OVERLAP_MONITOR_LOGS, LISTINGS } from '../data/mockData';

export default function AdminView({ setActiveScreen }) {
  const [activeTab, setActiveTab] = useState('disputes'); // disputes, logs, listings
  const [disputesList, setDisputesList] = useState(DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState(DISPUTES[0]);
  const [actionSuccessMsg, setActionSuccessMsg] = useState(null);

  const handleResolveDispute = (disputeId, decision) => {
    setDisputesList(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: 'resolved',
          resolution: decision
        };
      }
      return d;
    }));

    if (selectedDispute && selectedDispute.id === disputeId) {
      setSelectedDispute(prev => ({
        ...prev,
        status: 'resolved',
        resolution: decision
      }));
    }

    setActionSuccessMsg(`Dispute #${disputeId} successfully resolved: ${decision}`);
    setTimeout(() => setActionSuccessMsg(null), 5000);
  };

  return (
    <div className="admin-view-wrapper">
      {/* Admin Top Header Bar */}
      <div className="admin-header glass-panel">
        <div className="admin-header-left">
          <div className="admin-shield-icon clay-card">
            <ShieldAlert size={26} className="text-indigo" />
          </div>
          <div>
            <div className="admin-title-row">
              <h1 className="admin-title">Admin Moderation & Escrow Console</h1>
              <span className="clay-badge-emerald">Live System Active</span>
            </div>
            <p className="admin-subtitle">
              Fairness enforcement, dispute resolution, and conflict-free calendar audit for Pass It On.
            </p>
          </div>
        </div>

        <div className="admin-header-right">
          <div className="admin-live-pulse neu-sunken">
            <span className="pulse-dot"></span>
            <span>Overlap Rule: <strong>A.start &lt; B.end</strong> (Enforced)</span>
          </div>
          <button 
            className="clay-button-primary exit-admin-btn"
            onClick={() => setActiveScreen('home')}
          >
            <span>Switch to Member View</span>
          </button>
        </div>
      </div>

      {/* Top Claymorphic Metric Cards Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card clay-card">
          <div className="stat-header">
            <span className="stat-name">Total Community Members</span>
            <div className="stat-icon-clay bg-indigo">
              <Users size={18} />
            </div>
          </div>
          <div className="stat-main-number">{ADMIN_STATS.totalMembers}</div>
          <div className="stat-footer">
            <span className="trend-green">↑ +14%</span>
            <span className="stat-footer-sub">Verified COMSATS accounts</span>
          </div>
        </div>

        <div className="admin-stat-card clay-card">
          <div className="stat-header">
            <span className="stat-name">Conflict-Free Bookings</span>
            <div className="stat-icon-clay bg-emerald">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="stat-main-number">{ADMIN_STATS.conflictFreeBookings}</div>
          <div className="stat-footer">
            <span className="stat-zero-badge">0 Double-Bookings</span>
            <span className="stat-footer-sub">100% calendar accuracy</span>
          </div>
        </div>

        <div className="admin-stat-card clay-card">
          <div className="stat-header">
            <span className="stat-name">Held Mock Escrow</span>
            <div className="stat-icon-clay bg-teal">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="stat-main-number">${ADMIN_STATS.mockEscrowHeld.toLocaleString()}</div>
          <div className="stat-footer">
            <span className="trend-neutral">Escrow Protected</span>
            <span className="stat-footer-sub">Mock security deposits</span>
          </div>
        </div>

        <div className="admin-stat-card clay-card">
          <div className="stat-header">
            <span className="stat-name">Open Disputes</span>
            <div className="stat-icon-clay bg-rose">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="stat-main-number">{ADMIN_STATS.openDisputes}</div>
          <div className="stat-footer">
            <span className="stat-action-needed">Action Required</span>
            <span className="stat-footer-sub">{ADMIN_STATS.disputeResolutionRate} resolution</span>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {actionSuccessMsg && (
        <div className="admin-toast glass-panel animate-float">
          <CheckCircle2 size={18} className="text-emerald" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Admin Module Tabs (Neumorphic Inset with Clay Switch) */}
      <div className="admin-nav-tabs neu-sunken-pill">
        <button 
          className={`admin-tab-btn ${activeTab === 'disputes' ? 'active-clay' : ''}`}
          onClick={() => setActiveTab('disputes')}
        >
          <AlertTriangle size={16} />
          <span>Dispute Resolution Center ({disputesList.filter(d => d.status !== 'resolved').length})</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'logs' ? 'active-clay' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <Activity size={16} />
          <span>Live Overlap & Concurrency Logs</span>
        </button>

        <button 
          className={`admin-tab-btn ${activeTab === 'listings' ? 'active-clay' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          <Layers size={16} />
          <span>Listings Moderation ({LISTINGS.length})</span>
        </button>
      </div>

      {/* TAB 1: Dispute Resolution Center */}
      {activeTab === 'disputes' && (
        <div className="disputes-layout-grid">
          {/* Dispute List (Glassmorphic) */}
          <div className="disputes-list-panel glass-panel">
            <div className="panel-header-row">
              <h3>Active Disputes Queue</h3>
              <span className="neu-sunken-pill queue-count">
                {disputesList.length} Total Cases
              </span>
            </div>

            <div className="dispute-items-stack">
              {disputesList.map(dispute => (
                <div 
                  key={dispute.id}
                  className={`dispute-row-card neu-sunken ${selectedDispute?.id === dispute.id ? 'active-dispute-card' : ''}`}
                  onClick={() => setSelectedDispute(dispute)}
                >
                  <div className="dispute-row-top">
                    <span className="dispute-id-tag">{dispute.id}</span>
                    <span className={`dispute-status-pill ${dispute.status}`}>
                      {dispute.status.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="dispute-item-title">{dispute.itemTitle}</h4>
                  <p className="dispute-parties">
                    <strong>Reported by:</strong> {dispute.reporter}
                  </p>

                  <div className="dispute-row-bottom">
                    <span className="deposit-held-badge">
                      ${dispute.heldDeposit} Held Deposit
                    </span>
                    <span className="dispute-date">{dispute.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Detail & Decision Workbench (Clay/Glass Hybrid) */}
          {selectedDispute && (
            <div className="dispute-workbench glass-panel">
              <div className="workbench-header">
                <div>
                  <div className="workbench-top-meta">
                    <span className="clay-badge-amber">Booking {selectedDispute.bookingId}</span>
                    <span className="workbench-date">Filed on {selectedDispute.createdAt}</span>
                  </div>
                  <h2 className="workbench-title">{selectedDispute.itemTitle}</h2>
                </div>

                <div className="workbench-deposit-badge clay-card">
                  <span className="w-label">Held Escrow</span>
                  <span className="w-amount">${selectedDispute.heldDeposit}.00</span>
                </div>
              </div>

              {/* Dispute Parties Breakdown */}
              <div className="workbench-parties-box neu-sunken">
                <div className="party-col">
                  <span className="party-role">Reporter:</span>
                  <strong>{selectedDispute.reporter}</strong>
                </div>
                <div className="divider-v"></div>
                <div className="party-col">
                  <span className="party-role">Respondent:</span>
                  <strong>{selectedDispute.respondent}</strong>
                </div>
              </div>

              {/* Reported Reason */}
              <div className="dispute-reason-card neu-raised-card">
                <label className="section-mini-label">Reported Issue & Case Notes</label>
                <p className="reason-text">"{selectedDispute.reason}"</p>
              </div>

              {/* Proposed Admin Resolution from Brief */}
              <div className="proposed-resolution-box glass-panel-subtle">
                <Sparkles size={16} className="text-amber" />
                <div className="prop-text">
                  <strong>Recommended Resolution Formula:</strong>
                  <p>{selectedDispute.proposedResolution}</p>
                </div>
              </div>

              {/* Resolution Outcome Controls */}
              {selectedDispute.status !== 'resolved' ? (
                <div className="admin-actions-workbench">
                  <h4 className="actions-header-title">Admin Decision: Escrow Outcome</h4>
                  <div className="decision-buttons-grid">
                    <button 
                      className="clay-button-primary bg-emerald-btn"
                      onClick={() => handleResolveDispute(selectedDispute.id, 'Deposit 100% Released to Borrower')}
                    >
                      <CheckCircle2 size={16} />
                      <span>Release 100% to Borrower</span>
                    </button>

                    <button 
                      className="clay-button-primary bg-amber-btn"
                      onClick={() => handleResolveDispute(selectedDispute.id, 'Partial Compensation to Lender; Remaining Refunded')}
                    >
                      <DollarSign size={16} />
                      <span>Compensate Lender for Damage</span>
                    </button>

                    <button 
                      className="clay-button-primary bg-rose-btn"
                      onClick={() => handleResolveDispute(selectedDispute.id, 'Deposit Kept for Lender due to total loss')}
                    >
                      <AlertTriangle size={16} />
                      <span>Forfeit Full Deposit to Lender</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="resolved-banner clay-card">
                  <CheckCircle2 size={24} className="text-emerald" />
                  <div>
                    <h4>Case Successfully Resolved by Admin</h4>
                    <p>Outcome: <strong>{selectedDispute.resolution}</strong></p>
                    <span className="ledger-update-tag neu-sunken">Mock Escrow Ledger Updated Automatically</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Live Overlap & Concurrency Logs */}
      {activeTab === 'logs' && (
        <div className="logs-panel glass-panel">
          <div className="logs-header-row">
            <div>
              <h3>Real-Time Double-Booking Prevention Logs</h3>
              <p className="logs-sub">
                Audit feed of concurrent booking attempts processed through the 3-layer overlap protection rule.
              </p>
            </div>
            <button className="neu-sunken-pill refresh-btn">
              <RefreshCw size={14} />
              <span>Auto-refreshing (Active)</span>
            </button>
          </div>

          <div className="logs-table-wrapper neu-sunken">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action / Event</th>
                  <th>Item Under Request</th>
                  <th>Attempted Dates</th>
                  <th>Protected Layer</th>
                  <th>Outcome Status</th>
                </tr>
              </thead>
              <tbody>
                {OVERLAP_MONITOR_LOGS.map(log => (
                  <tr key={log.id}>
                    <td className="log-time font-mono">{log.timestamp}</td>
                    <td>
                      <span className="clay-badge-emerald font-sm">
                        {log.action}
                      </span>
                    </td>
                    <td className="font-semibold">{log.item}</td>
                    <td className="font-mono">{log.attemptedRange}</td>
                    <td>
                      <span className="neu-sunken-pill font-xs">{log.layerCaught}</span>
                    </td>
                    <td>
                      <span className="status-indicator-tag success">
                        <Check size={12} />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Listings Moderation */}
      {activeTab === 'listings' && (
        <div className="listings-mod-panel glass-panel">
          <div className="mod-header-row">
            <h3>Community Listings Audit</h3>
            <p className="mod-sub">Review community gear, pause flagged listings, and audit daily rates.</p>
          </div>

          <div className="mod-listings-grid">
            {LISTINGS.map(item => (
              <div key={item.id} className="mod-listing-card clay-card">
                <div className="mod-card-top">
                  <img src={item.image} alt={item.title} className="mod-thumb" />
                  <div className="mod-meta">
                    <h4>{item.title}</h4>
                    <span className="mod-category-pill neu-sunken">{item.category}</span>
                    <p className="mod-owner">Owner: <strong>{item.owner.name}</strong></p>
                  </div>
                </div>

                <div className="mod-prices-row neu-sunken">
                  <div>Daily Rate: <strong>${item.dailyPrice}/day</strong></div>
                  <div>Mock Deposit: <strong>${item.depositAmount}</strong></div>
                  <div>Active Status: <span className="text-emerald">ACTIVE</span></div>
                </div>

                <div className="mod-actions-row">
                  <button className="clay-button-primary mod-pause-btn">
                    <span>Pause Listing</span>
                  </button>
                  <button 
                    className="neu-sunken-pill mod-view-btn"
                    onClick={() => setActiveScreen('item-detail')}
                  >
                    <span>View Calendar</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
