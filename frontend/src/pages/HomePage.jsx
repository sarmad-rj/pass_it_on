import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Lock, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter,
  DollarSign,
  Heart,
  Layers,
  Cpu,
  Database
} from 'lucide-react';
import { LISTINGS, CATEGORIES } from '../data/mockData';

export default function HomePage({ setActiveScreen, setSelectedListingId }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState({});

  const filteredListings = selectedCategory === 'all' 
    ? LISTINGS 
    : LISTINGS.filter(item => {
        if (selectedCategory === 'tools') return item.category.includes('Tools');
        if (selectedCategory === 'cameras') return item.category.includes('Cameras');
        if (selectedCategory === 'outdoor') return item.category.includes('Outdoor');
        if (selectedCategory === 'bicycles') return item.category.includes('Bicycles');
        return true;
      });

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardClick = (listingId) => {
    if (setSelectedListingId) setSelectedListingId(listingId);
    setActiveScreen('item-detail');
  };

  return (
    <div className="home-view-container">
      {/* Hero Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="clay-badge-emerald">
              <ShieldCheck size={14} />
              <span>Zero Double-Booking Guarantee</span>
            </span>
            <span className="neu-sunken-pill hero-sub-badge">
              <Sparkles size={14} className="text-amber" />
              <span>COMSATS Neighborhood Peer-to-Peer</span>
            </span>
          </div>

          <h1 className="hero-title">
            Borrow with <span className="gradient-text">confidence</span>.
            <br />Share tools, cameras & gear nearby.
          </h1>

          <p className="hero-subtitle">
            Most people own items they only use twice a year. Pass It On connects neighbors
            with trustworthy availability calendars, conflict-free bookings, and guaranteed mock escrow.
          </p>

          {/* Quick Metrics (Clay Cards) */}
          <div className="hero-stats-row">
            <div className="hero-stat-card clay-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Conflict-Free Bookings</div>
            </div>
            <div className="hero-stat-card clay-card">
              <div className="stat-number">&lt; 1 min</div>
              <div className="stat-label">Fast Booking Request</div>
            </div>
            <div className="hero-stat-card clay-card">
              <div className="stat-number">0 Clashes</div>
              <div className="stat-label">Multi-layer Guard</div>
            </div>
          </div>
        </div>

        {/* Hero Interactive Floating Visual */}
        <div className="hero-visual-card glass-panel-subtle animate-float">
          <div className="hero-visual-header">
            <div className="live-status-pill">
              <span className="pulse-dot"></span>
              <span>Live Overlap Engine Active</span>
            </div>
            <span className="visual-date">October 2026</span>
          </div>

          <div className="visual-mock-item">
            <img 
              src="/images/camera.jpg" 
              alt="Sony A7 IV" 
              className="visual-item-thumb" 
            />
            <div className="visual-item-info">
              <h4>Sony Alpha A7 IV Kit</h4>
              <p>Reserved: Oct 22 — Oct 25</p>
              <span className="locked-pill neu-sunken">Locked & Protected</span>
            </div>
          </div>

          <div className="visual-guard-notice">
            <ShieldCheck size={18} className="text-emerald" />
            <div className="notice-text">
              <strong>Simultaneous Attempt Safe:</strong> 2 borrowers requested same dates at 10:42 AM. Overlap guard accepted 1st and cleanly routed 2nd without clashing!
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills (Neumorphic Inset with Clay Active) */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Explore Idle Items</h2>
            <p className="section-sub">High-quality gear ready for your weekend project</p>
          </div>
          <div className="category-counter-pill neu-sunken">
            <span>Showing {filteredListings.length} community items</span>
          </div>
        </div>

        <div className="categories-scroll neu-sunken-pill">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-pill-btn ${selectedCategory === cat.id ? 'active-clay' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.name}</span>
              <span className="cat-count">({cat.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Listings Grid */}
      <section className="listings-grid">
        {filteredListings.map(item => (
          <div 
            key={item.id} 
            className="listing-card glass-panel"
            onClick={() => handleCardClick(item.id)}
          >
            {/* Image Header with Badges */}
            <div className="card-image-box">
              <img src={item.image} alt={item.title} className="card-img" />
              <button 
                className={`fav-btn neu-sunken-pill ${favorites[item.id] ? 'favorited' : ''}`}
                onClick={(e) => toggleFavorite(item.id, e)}
                title="Save to favorites"
              >
                <Heart size={16} fill={favorites[item.id] ? '#f43f5e' : 'none'} color={favorites[item.id] ? '#f43f5e' : '#64748b'} />
              </button>

              <div className="card-badges-floating">
                <span className="clay-badge-emerald">
                  <ShieldCheck size={12} />
                  <span>Conflict-Free</span>
                </span>
                <span className="deposit-tag neu-sunken">
                  ${item.depositAmount} Mock Deposit
                </span>
              </div>
            </div>

            {/* Listing Body */}
            <div className="card-body">
              <div className="card-top-row">
                <span className="card-category-label">{item.category}</span>
                <div className="card-rating">
                  <Star size={14} className="star-icon" fill="#f59e0b" color="#f59e0b" />
                  <span>{item.owner.rating}</span>
                </div>
              </div>

              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description.slice(0, 88)}...</p>

              {/* Location & Lender info */}
              <div className="card-lender-row neu-sunken">
                <img src={item.owner.avatar} alt={item.owner.name} className="lender-avatar" />
                <div className="lender-info">
                  <div className="lender-name">{item.owner.name}</div>
                  <div className="lender-meta">
                    <MapPin size={11} />
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className="lender-speed">
                  <Clock size={11} />
                  <span>{item.owner.responseTime}</span>
                </div>
              </div>

              {/* Price & CTA Row */}
              <div className="card-footer-row">
                <div className="price-box">
                  <div className="daily-price">
                    <span className="price-symbol">$</span>
                    <span className="price-val">{item.dailyPrice}</span>
                    <span className="price-unit">/day</span>
                  </div>
                  <span className="deposit-note">Escrow held</span>
                </div>

                <button 
                  className="clay-button-primary check-cal-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.id);
                  }}
                >
                  <Calendar size={15} />
                  <span>Check Dates</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Standout Feature: The 3-Layer Overlap Rule Architecture */}
      <section className="overlap-architecture-section glass-panel">
        <div className="arch-header">
          <span className="clay-badge-amber">
            <Sparkles size={14} />
            <span>Standout Architecture</span>
          </span>
          <h2 className="arch-title">The Three-Layer Overlap Guard</h2>
          <p className="arch-sub">
            Pass It On guarantees two active bookings never share a date.
            Enforced in 3 independent layers so no single bug or race condition can break trust.
          </p>
        </div>

        <div className="arch-layers-grid">
          <div className="arch-layer-card clay-card">
            <div className="layer-step">Layer 1</div>
            <div className="layer-icon-box bg-indigo">
              <Calendar size={24} />
            </div>
            <h3>Calendar Screen</h3>
            <p>
              Greys out taken and blocked days on the dynamic calendar and instantly refuses invalid ranges before submission. Stops honest mistakes early.
            </p>
            <div className="layer-tag neu-sunken">Client Verification</div>
          </div>

          <div className="arch-layer-card clay-card">
            <div className="layer-step">Layer 2</div>
            <div className="layer-icon-box bg-teal">
              <Cpu size={24} />
            </div>
            <h3>Booking Service Lock</h3>
            <p>
              Re-checks date availability inside an isolated transaction before saving. Eliminates race conditions when two neighbors click at the same second.
            </p>
            <div className="layer-tag neu-sunken">Atomic Transaction</div>
          </div>

          <div className="arch-layer-card clay-card">
            <div className="layer-step">Layer 3</div>
            <div className="layer-icon-box bg-rose">
              <Database size={24} />
            </div>
            <h3>Database Exclusion Rule</h3>
            <p>
              Strict exclusion constraint: <code>A.start &lt; B.end AND B.start &lt; A.end</code>. Rejects any duplicate booking at the database level as final safety net.
            </p>
            <div className="layer-tag neu-sunken">Hard Constraint</div>
          </div>
        </div>
      </section>
    </div>
  );
}
