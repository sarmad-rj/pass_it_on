import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lock,
  Share2,
  Heart
} from 'lucide-react';
import { LISTINGS } from '../data/mockData';

export default function ItemDetailPage({ setActiveScreen, selectedListingId }) {
  const listing = LISTINGS.find(item => item.id === selectedListingId) || LISTINGS[0];

  // Calendar State for October 2026
  const [selectedRange, setSelectedRange] = useState({ start: 18, end: 20 });
  const [conflictDetected, setConflictDetected] = useState(false);
  const [conflictDetails, setConflictDetails] = useState(null);

  // October 2026 days configuration (31 days)
  // Booked: 22, 23, 24, 25 (Hamza Tariq)
  // Blocked: 29, 30 (Lender calibration)
  const bookedDays = [22, 23, 24, 25];
  const blockedDays = [29, 30];

  const handleDayClick = (day) => {
    // If user clicks a booked or blocked day directly
    if (bookedDays.includes(day)) {
      setConflictDetected(true);
      setConflictDetails(`October ${day} is already booked by Hamza Tariq (BK-1082). Overlap Guard prevents overlapping reservations!`);
      return;
    }
    if (blockedDays.includes(day)) {
      setConflictDetected(true);
      setConflictDetails(`October ${day} is blocked by lender for lens maintenance and calibration.`);
      return;
    }

    // Toggle range selection
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
      setConflictDetected(false);
      setConflictDetails(null);
    } else {
      const start = Math.min(selectedRange.start, day);
      const end = Math.max(selectedRange.start, day);

      // Check if range encompasses any booked day
      const hasConflict = bookedDays.some(b => b >= start && b <= end);
      const hasBlocked = blockedDays.some(b => b >= start && b <= end);

      if (hasConflict) {
        setConflictDetected(true);
        setConflictDetails(`Requested range (Oct ${start} - Oct ${end}) intersects an existing booking (Oct 22 - Oct 25). Double-booking rule: A.start < B.end AND B.start < A.end triggered!`);
        setSelectedRange({ start, end });
      } else if (hasBlocked) {
        setConflictDetected(true);
        setConflictDetails(`Requested range intersects lender maintenance blackout dates (Oct 29 - Oct 30).`);
        setSelectedRange({ start, end });
      } else {
        setConflictDetected(false);
        setConflictDetails(null);
        setSelectedRange({ start, end });
      }
    }
  };

  const daysCount = selectedRange.start && selectedRange.end 
    ? (selectedRange.end - selectedRange.start + 1)
    : 1;

  const rentalTotal = daysCount * listing.dailyPrice;
  const grandTotal = rentalTotal + listing.depositAmount;

  return (
    <div className="item-detail-container">
      {/* Navigation Breadcrumb */}
      <div className="detail-breadcrumb-bar">
        <button 
          className="back-btn neu-sunken-pill"
          onClick={() => setActiveScreen('home')}
        >
          <ArrowLeft size={16} />
          <span>Back to Marketplace</span>
        </button>
        <span className="breadcrumb-path">
          Explore / {listing.category} / <strong className="active-item-crumb">{listing.title}</strong>
        </span>
      </div>

      <div className="item-detail-layout">
        {/* Left Column: Visuals & Specifications */}
        <div className="detail-left-col">
          {/* Main Hero Image */}
          <div className="detail-image-card glass-panel">
            <img src={listing.image} alt={listing.title} className="detail-main-img" />
            <div className="image-overlay-badges">
              <span className="clay-badge-emerald">
                <ShieldCheck size={14} />
                <span>Conflict-Free Verified</span>
              </span>
              <span className="deposit-floating-chip neu-sunken">
                ${listing.depositAmount} Mock Escrow Deposit
              </span>
            </div>
          </div>

          {/* Description & Specs Card */}
          <div className="detail-info-card glass-panel">
            <div className="info-top-row">
              <span className="detail-cat-pill neu-sunken">{listing.category}</span>
              <div className="rating-pill">
                <Star size={15} fill="#f59e0b" color="#f59e0b" />
                <span>{listing.owner.rating} (38 verified reviews)</span>
              </div>
            </div>

            <h1 className="detail-title">{listing.title}</h1>
            <p className="detail-desc">{listing.description}</p>

            <div className="features-list-box neu-sunken">
              <h4 className="features-header">Included Gear & Specifications</h4>
              <div className="features-chips">
                {listing.features.map((feat, idx) => (
                  <span key={idx} className="feat-chip">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Lender Profile Card */}
            <div className="lender-profile-card clay-card">
              <img src={listing.owner.avatar} alt={listing.owner.name} className="lender-big-avatar" />
              <div className="lender-big-info">
                <div className="lender-header-row">
                  <h3>{listing.owner.name}</h3>
                  <span className="verified-badge">COMSATS Verified</span>
                </div>
                <div className="lender-meta-grid">
                  <div className="meta-item">
                    <MapPin size={13} />
                    <span>{listing.location}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={13} />
                    <span>Avg Response: {listing.owner.responseTime}</span>
                  </div>
                  <div className="meta-item">
                    <Star size={13} className="text-amber" />
                    <span>{listing.owner.responseRate} Acceptance Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Standout Availability Calendar */}
        <div className="detail-right-col">
          <div className="calendar-booking-card glass-panel">
            {/* Header with Pricing */}
            <div className="calendar-card-header">
              <div>
                <span className="rate-label">Daily Community Rate</span>
                <div className="big-price">
                  <span className="curr">$</span>
                  <span className="val">{listing.dailyPrice}</span>
                  <span className="per">/day</span>
                </div>
              </div>
              <div className="escrow-chip neu-sunken">
                <ShieldCheck size={16} className="text-emerald" />
                <div>
                  <div className="chip-t">Mock Deposit Escrow</div>
                  <div className="chip-sub">${listing.depositAmount} (100% Refundable)</div>
                </div>
              </div>
            </div>

            {/* Standout Feature Header: Availability Calendar */}
            <div className="calendar-title-banner">
              <div className="cal-banner-left">
                <Calendar size={18} className="text-indigo" />
                <h4>Live Availability Calendar</h4>
              </div>
              <span className="month-tag font-mono">October 2026</span>
            </div>

            {/* Calendar Legend */}
            <div className="calendar-legend-bar neu-sunken">
              <div className="legend-item">
                <span className="legend-dot dot-free"></span>
                <span>Free</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-booked"></span>
                <span>Booked</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-blocked"></span>
                <span>Maintenance</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-selected"></span>
                <span>Selected</span>
              </div>
            </div>

            {/* Calendar Grid Component */}
            <div className="calendar-grid-box">
              <div className="cal-weekdays">
                <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
              </div>
              <div className="cal-days-grid">
                {/* Blank days for October 2026 (Starts on Thursday, so 3 empty padding cells) */}
                <span className="cal-empty-day"></span>
                <span className="cal-empty-day"></span>
                <span className="cal-empty-day"></span>

                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  const isBooked = bookedDays.includes(day);
                  const isBlocked = blockedDays.includes(day);
                  const isSelected = selectedRange.start && (
                    selectedRange.end 
                      ? (day >= selectedRange.start && day <= selectedRange.end)
                      : day === selectedRange.start
                  );

                  let cellClass = 'cal-day-cell neu-sunken';
                  if (isBooked) cellClass += ' day-booked';
                  if (isBlocked) cellClass += ' day-blocked';
                  if (isSelected) cellClass += ' day-selected';

                  return (
                    <button
                      key={day}
                      className={cellClass}
                      onClick={() => handleDayClick(day)}
                      title={
                        isBooked 
                          ? `Oct ${day}: Booked (Hamza Tariq)` 
                          : isBlocked 
                          ? `Oct ${day}: Maintenance Blocked` 
                          : `Oct ${day}: Available`
                      }
                    >
                      <span className="day-number">{day}</span>
                      {isBooked && <span className="day-state-tag">LOCK</span>}
                      {isBlocked && <span className="day-state-tag">MAINT</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Overlap Detection Alert Banner */}
            {conflictDetected ? (
              <div className="conflict-alert-card clay-card animate-glow">
                <AlertTriangle size={22} className="text-rose" />
                <div className="conflict-text">
                  <h4 className="conflict-title">Double-Booking Blocked!</h4>
                  <p>{conflictDetails}</p>
                  <span className="overlap-rule-sub neu-sunken">
                    Enforced by Overlap Rule: <code>A.start &lt; B.end AND B.start &lt; A.end</code>
                  </span>
                </div>
              </div>
            ) : (
              <div className="safe-dates-card glass-panel-subtle">
                <CheckCircle2 size={20} className="text-emerald" />
                <div className="safe-text">
                  <h4>Selected Dates Conflict-Free</h4>
                  <p>Oct {selectedRange.start} — Oct {selectedRange.end || selectedRange.start}, 2026 ({daysCount} {daysCount === 1 ? 'day' : 'days'})</p>
                </div>
              </div>
            )}

            {/* Transparent Cost & Mock Escrow Summary */}
            <div className="cost-breakdown-card neu-sunken">
              <div className="cost-row">
                <span>Daily Rental (${listing.dailyPrice} × {daysCount} days)</span>
                <span className="cost-val font-mono">${rentalTotal}.00</span>
              </div>
              <div className="cost-row">
                <span className="escrow-term">
                  Refundable Mock Deposit
                  <Info size={13} className="info-icon" />
                </span>
                <span className="cost-val font-mono">${listing.depositAmount}.00</span>
              </div>
              <div className="cost-row">
                <span>Pass It On Community Protection</span>
                <span className="cost-free">FREE</span>
              </div>
              <div className="cost-divider"></div>
              <div className="cost-row total-row">
                <strong>Total Mock Escrow</strong>
                <strong className="grand-val font-mono">${grandTotal}.00</strong>
              </div>
              <div className="mock-money-disclaimer">
                *Mock transaction: No real money leaves your account. Deposit is held until safe return.
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              className={`clay-button-primary booking-submit-cta ${conflictDetected ? 'btn-disabled' : ''}`}
              disabled={conflictDetected}
              onClick={() => setActiveScreen('booking-lifecycle')}
            >
              <ShieldCheck size={18} />
              <span>
                {conflictDetected ? 'Dates Conflicted (Choose Free Days)' : 'Request Booking with Escrow'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
