import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  Bell, 
  User, 
  Sparkles, 
  LayoutDashboard, 
  CalendarCheck, 
  ChevronDown, 
  Menu, 
  X, 
  Compass, 
  ArrowRight 
} from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';

export default function Navbar({ activeScreen, setActiveScreen, role, setRole }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navigateTo = (screen) => {
    setActiveScreen(screen);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <header className="glass-nav sticky-top">
      <div className="nav-container">
        {/* Brand Logo & Tagline */}
        <div 
          className="brand-group" 
          onClick={() => navigateTo('home')}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-logo-wrapper">
            <img 
              src="/images/logo.jpg" 
              alt="Pass It On Logo" 
              className="brand-logo-img" 
            />
            <span className="brand-glow-ping"></span>
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Pass It On <span className="brand-badge-pill">COMSATS</span>
            </div>
            <div className="brand-sub">Borrow with confidence</div>
          </div>
        </div>

        {/* Desktop Global Search Bar (Neumorphic Inset) */}
        <div className="nav-search-bar neu-sunken desktop-only">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tools, cameras, bikes..." 
            className="search-input"
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Desktop Navigation Links & Profile */}
        <div className="nav-actions desktop-only">
          <button 
            className={`nav-link-btn ${activeScreen === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Explore
          </button>
          
          <button 
            className={`nav-link-btn ${activeScreen === 'item-detail' ? 'active' : ''}`}
            onClick={() => navigateTo('item-detail')}
          >
            <CalendarCheck size={15} />
            <span>Calendar</span>
          </button>

          <button 
            className={`nav-link-btn ${activeScreen === 'booking-lifecycle' ? 'active' : ''}`}
            onClick={() => navigateTo('booking-lifecycle')}
          >
            <ShieldCheck size={15} />
            <span>Escrow & Borrows</span>
          </button>

          <button 
            className={`nav-link-btn admin-link-pill ${activeScreen === 'admin' ? 'active' : ''}`}
            onClick={() => navigateTo('admin')}
          >
            <LayoutDashboard size={14} />
            <span>Admin Hub</span>
            <span className="admin-chip-pulse">3</span>
          </button>

          {/* List an Item (Claymorphic CTA) */}
          <button 
            className="clay-button-primary list-item-cta"
            onClick={() => {
              alert('Listing Creator: Lenders can upload photos, set daily price, mock deposit, and block maintenance days without conflict!');
            }}
          >
            <PlusCircle size={16} />
            <span>List Item</span>
          </button>

          {/* User Profile / Auth Toggle */}
          <div 
            className="user-profile-neu neu-sunken"
            onClick={() => navigateTo('auth')}
            title="Click to view Login / Profile Screen"
          >
            <img 
              src={CURRENT_USER.avatar} 
              alt={CURRENT_USER.name} 
              className="user-avatar"
            />
            <div className="user-info-text">
              <span className="user-name">{CURRENT_USER.name}</span>
              <span className="user-role-badge">★ 4.95</span>
            </div>
            <ChevronDown size={13} className="chevron-icon" />
          </div>
        </div>

        {/* Mobile Header Controls (< 1080px) */}
        <div className="mobile-header-controls">
          <button 
            className={`mobile-icon-btn neu-sunken ${mobileSearchOpen ? 'active' : ''}`}
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            title="Search"
            aria-label="Search items"
          >
            <Search size={18} />
          </button>

          <button 
            className="clay-button-primary mobile-quick-list"
            onClick={() => navigateTo('item-detail')}
            title="Browse or List"
          >
            <PlusCircle size={15} />
            <span>List</span>
          </button>

          <button 
            className="mobile-hamburger-btn clay-card"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="mobile-search-dropdown glass-panel-subtle">
          <div className="mobile-search-inner neu-sunken">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tools, cameras, camping gear, bikes..." 
              autoFocus
              className="mobile-search-input"
            />
            <button 
              className="search-close-btn"
              onClick={() => setMobileSearchOpen(false)}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Panel (Direct dropdown beneath sticky navbar) */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel glass-panel">
          {/* User Profile Mini Banner */}
          <div 
            className="mobile-drawer-user clay-card"
            onClick={() => navigateTo('auth')}
          >
            <img 
              src={CURRENT_USER.avatar} 
              alt={CURRENT_USER.name} 
              className="drawer-avatar" 
            />
            <div className="drawer-user-info">
              <span className="drawer-user-name">{CURRENT_USER.name}</span>
              <span className="drawer-user-sub">Lender & Borrower • ★ 4.95</span>
            </div>
            <span className="clay-badge-emerald drawer-login-pill">
              Account
            </span>
          </div>

          {/* Navigation Links Stack */}
          <div className="mobile-drawer-links">
            <button 
              className={`drawer-link-item ${activeScreen === 'home' ? 'active-link' : ''}`}
              onClick={() => navigateTo('home')}
            >
              <div className="drawer-link-left">
                <Compass size={18} className="text-indigo" />
                <span>Explore Marketplace</span>
              </div>
              <ArrowRight size={15} className="drawer-arrow" />
            </button>

            <button 
              className={`drawer-link-item ${activeScreen === 'item-detail' ? 'active-link' : ''}`}
              onClick={() => navigateTo('item-detail')}
            >
              <div className="drawer-link-left">
                <CalendarCheck size={18} className="text-indigo" />
                <span>Availability Calendar</span>
              </div>
              <span className="clay-badge-emerald drawer-mini-badge">Conflict-Free</span>
            </button>

            <button 
              className={`drawer-link-item ${activeScreen === 'booking-lifecycle' ? 'active-link' : ''}`}
              onClick={() => navigateTo('booking-lifecycle')}
            >
              <div className="drawer-link-left">
                <ShieldCheck size={18} className="text-indigo" />
                <span>Mock Escrow & Borrows</span>
              </div>
              <ArrowRight size={15} className="drawer-arrow" />
            </button>

            <button 
              className={`drawer-link-item ${activeScreen === 'admin' ? 'active-link' : ''}`}
              onClick={() => navigateTo('admin')}
            >
              <div className="drawer-link-left">
                <LayoutDashboard size={18} className="text-rose" />
                <span>Admin Moderation Hub</span>
              </div>
              <span className="admin-chip-pulse">3 Disputes</span>
            </button>

            <button 
              className={`drawer-link-item ${activeScreen === 'auth' ? 'active-link' : ''}`}
              onClick={() => navigateTo('auth')}
            >
              <div className="drawer-link-left">
                <User size={18} className="text-indigo" />
                <span>Login / Sign Up</span>
              </div>
              <ArrowRight size={15} className="drawer-arrow" />
            </button>
          </div>

          {/* List an Item Action inside Drawer */}
          <div className="drawer-footer-actions">
            <button 
              className="clay-button-primary drawer-list-cta"
              onClick={() => {
                alert('Listing Creator: Lenders can upload photos, set daily price, mock deposit, and block maintenance days!');
                setMobileMenuOpen(false);
              }}
            >
              <PlusCircle size={18} />
              <span>List an Item to Earn</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
