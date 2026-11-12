import React, { useState } from 'react';
import { 
  PlusCircle, 
  Trash2, 
  CalendarCheck, 
  Calendar, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  MapPin, 
  Star, 
  X, 
  Layers, 
  UserPlus,
  ChevronRight
} from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

const SAMPLE_IMAGES = [
  { label: 'Camera Kit', url: '/images/camera.jpg' },
  { label: 'Power Drill', url: '/images/drill.jpg' },
  { label: 'Mountain Bike', url: '/images/bike.jpg' },
  { label: 'Camping Tent', url: '/images/tent.jpg' },
  { label: '4K Drone', url: '/images/drone.jpg' }
];

export default function UserDashboardPage({ 
  setActiveScreen, 
  setSelectedListingId,
  listings = [],
  onRemoveListing,
  onAddListing,
  myBorrows = [],
  onCancelBorrow,
  setActiveBooking,
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  onNavigateAuth
}) {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'borrows'
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState(null);

  // Sync external & internal modal state
  const isModalVisible = isAddItemModalOpen !== undefined ? isAddItemModalOpen : localModalOpen;
  const setModalVisible = (val) => {
    if (setIsAddItemModalOpen) setIsAddItemModalOpen(val);
    setLocalModalOpen(val);
  };

  // Form State for Adding an Item
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Cameras & Video',
    dailyPrice: '35',
    depositAmount: '150',
    location: 'Sector H-8 / COMSATS Campus',
    image: '/images/camera.jpg',
    description: '',
    featuresText: 'Clean & tested, High performance, Includes original bag'
  });

  const showToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // Filter listings owned by CURRENT_USER (Sarmad Rj)
  const myListings = listings.filter(item => 
    item.owner && (item.owner.name === CURRENT_USER.name || item.owner.id === CURRENT_USER.id)
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) {
      alert('Please enter an equipment title.');
      return;
    }

    const priceNum = parseFloat(newItem.dailyPrice) || 20;
    const depositNum = parseFloat(newItem.depositAmount) || 100;
    const featuresArr = newItem.featuresText
      .split(',')
      .map(f => f.trim())
      .filter(Boolean);

    const createdListing = {
      id: `item_${Date.now()}`,
      title: newItem.title.trim(),
      category: newItem.category,
      dailyPrice: priceNum,
      depositAmount: depositNum,
      image: newItem.image || '/images/camera.jpg',
      owner: {
        name: CURRENT_USER.name,
        avatar: CURRENT_USER.avatar,
        rating: CURRENT_USER.rating,
        responseRate: '100%',
        responseTime: '< 15 mins'
      },
      location: newItem.location || 'COMSATS Campus',
      description: newItem.description.trim() || 'Well-maintained equipment available for campus community rental.',
      status: 'active',
      features: featuresArr.length ? featuresArr : ['Fully Functional', 'Campus Pickup'],
      bookedRanges: [],
      blockedRanges: []
    };

    if (onAddListing) {
      onAddListing(createdListing);
    }
    showToast(`"${createdListing.title}" successfully added to the marketplace!`);
    setModalVisible(false);
    setActiveTab('listings');

    // Reset form
    setNewItem({
      title: '',
      category: 'Cameras & Video',
      dailyPrice: '35',
      depositAmount: '150',
      location: 'Sector H-8 / COMSATS Campus',
      image: '/images/camera.jpg',
      description: '',
      featuresText: 'Clean & tested, High performance, Includes original bag'
    });
  };

  const handleDeleteItem = (itemId, itemTitle) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${itemTitle}" from your listings?`);
    if (confirmDelete) {
      if (onRemoveListing) {
        onRemoveListing(itemId);
      }
      showToast(`Listing "${itemTitle}" was removed.`);
    }
  };

  const handleTrackBorrow = (borrow) => {
    if (setActiveBooking) {
      setActiveBooking(borrow);
    }
    if (setSelectedListingId && borrow.itemId) {
      setSelectedListingId(borrow.itemId);
    }
    setActiveScreen('booking-lifecycle');
  };

  return (
    <div className="user-dashboard-container">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="dashboard-toast glass-panel animate-float">
          <CheckCircle2 size={18} className="text-emerald" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header Profile Section */}
      <div className="dashboard-profile-header glass-panel">
        <div className="profile-hero-left">
          <div className="profile-avatar-wrapper clay-card">
            <img 
              src={CURRENT_USER.avatar} 
              alt={CURRENT_USER.name} 
              className="profile-avatar-img"
            />
            <span className="profile-status-online" title="Online Member"></span>
          </div>
          <div className="profile-details">
            <div className="profile-name-row">
              <h1 className="profile-title">{CURRENT_USER.name}</h1>
              <span className="clay-badge-emerald">Verified Member</span>
              <span className="campus-badge-pill neu-sunken">COMSATS Islamabad</span>
              <button 
                type="button"
                className="neu-sunken-pill switch-auth-chip"
                onClick={() => {
                  if (onNavigateAuth) onNavigateAuth(true);
                  else setActiveScreen('auth');
                }}
                title="Create a new account or sign in as another user"
              >
                <UserPlus size={12} className="text-emerald" />
                <span>Sign Up / Switch Account</span>
              </button>
            </div>
            <p className="profile-sub">
              Campus Peer-to-Peer Equipment Lender & Active Borrower
            </p>
            <div className="profile-meta-chips">
              <span className="meta-chip">
                <Star size={13} className="text-amber" />
                <strong>{CURRENT_USER.rating}</strong> (38 verified reviews)
              </span>
              <span className="meta-chip">
                <ShieldCheck size={13} className="text-indigo" />
                100% Mock Escrow Protected
              </span>
              <span className="meta-chip">
                <MapPin size={13} className="text-rose" />
                Sector H-8 Campus Hub
              </span>
            </div>
          </div>
        </div>

        {/* Profile Action & Stats */}
        <div className="profile-hero-right">
          <div className="dashboard-quick-stats">
            <div className="d-stat-box neu-sunken">
              <span className="d-stat-num">{myListings.length}</span>
              <span className="d-stat-lbl">My Listings</span>
            </div>
            <div className="d-stat-box neu-sunken">
              <span className="d-stat-num">{myBorrows.length}</span>
              <span className="d-stat-lbl">Active Borrows</span>
            </div>
            <div className="d-stat-box neu-sunken highlight-escrow">
              <span className="d-stat-num">$330</span>
              <span className="d-stat-lbl">Escrow Held</span>
            </div>
          </div>

          <button 
            className="clay-button-primary add-item-header-cta"
            onClick={() => setModalVisible(true)}
          >
            <PlusCircle size={16} />
            <span>List New Equipment</span>
          </button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="dashboard-tabs-bar neu-sunken-pill">
        <button 
          className={`dash-tab-btn ${activeTab === 'listings' ? 'active-clay' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          <Layers size={16} />
          <span>My Equipment Listed for Rent ({myListings.length})</span>
        </button>

        <button 
          className={`dash-tab-btn ${activeTab === 'borrows' ? 'active-clay' : ''}`}
          onClick={() => setActiveTab('borrows')}
        >
          <Package size={16} />
          <span>My Borrowed Gear & Escrows ({myBorrows.length})</span>
        </button>
      </div>

      {/* TAB 1: My Listings (Lender Mode) */}
      {activeTab === 'listings' && (
        <div className="dashboard-tab-content">
          <div className="tab-section-header">
            <div>
              <h2 className="tab-title">Equipment You Own & Rent Out</h2>
              <p className="tab-subtitle">
                Manage your idle gear, view live calendar bookings, or remove listings you no longer wish to share.
              </p>
            </div>
            <button 
              className="clay-button-primary tab-action-cta"
              onClick={() => setModalVisible(true)}
            >
              <PlusCircle size={15} />
              <span>Add Equipment</span>
            </button>
          </div>

          {myListings.length === 0 ? (
            <div className="empty-dashboard-card glass-panel">
              <Package size={44} className="text-slate-400" />
              <h3>No equipment listed yet</h3>
              <p>Have tools, cameras, or bikes you only use occasionally? List them now to earn safely with mock escrow.</p>
              <button 
                className="clay-button-primary"
                onClick={() => setModalVisible(true)}
              >
                <PlusCircle size={16} />
                <span>List Your First Item</span>
              </button>
            </div>
          ) : (
            <div className="my-listings-grid">
              {myListings.map(item => {
                const totalBookings = item.bookedRanges ? item.bookedRanges.length : 0;
                return (
                  <div key={item.id} className="my-listing-card clay-card">
                    <div className="my-card-visual">
                      <img src={item.image} alt={item.title} className="my-card-img" />
                      <span className="my-category-badge neu-sunken">{item.category}</span>
                      <span className="my-status-pill clay-badge-emerald">LIVE ON MARKET</span>
                    </div>

                    <div className="my-card-body">
                      <h3 className="my-card-title">{item.title}</h3>
                      <p className="my-card-desc">{item.description}</p>
                      
                      <div className="my-card-meta-row neu-sunken">
                        <div className="meta-pair">
                          <span className="pair-label">Daily Rental</span>
                          <span className="pair-val">${item.dailyPrice}/day</span>
                        </div>
                        <div className="meta-pair">
                          <span className="pair-label">Mock Deposit</span>
                          <span className="pair-val text-indigo">${item.depositAmount}</span>
                        </div>
                        <div className="meta-pair">
                          <span className="pair-label">Upcoming Bookings</span>
                          <span className="pair-val text-emerald">{totalBookings} Reserved</span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="my-card-actions">
                        <button 
                          className="clay-button-secondary view-cal-btn"
                          onClick={() => {
                            if (setSelectedListingId) setSelectedListingId(item.id);
                            setActiveScreen('item-detail');
                          }}
                        >
                          <Calendar size={14} />
                          <span>View Calendar</span>
                        </button>

                        <button 
                          className="remove-listing-btn clay-badge-rose"
                          onClick={() => handleDeleteItem(item.id, item.title)}
                          title="Permanently remove this listing"
                        >
                          <Trash2 size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: My Borrowed Items (Borrower Mode) */}
      {activeTab === 'borrows' && (
        <div className="dashboard-tab-content">
          <div className="tab-section-header">
            <div>
              <h2 className="tab-title">Active Borrows & Escrow Reservations</h2>
              <p className="tab-subtitle">
                Track your active rental gear, monitor locked mock escrow deposits, and access the 9-step handover stepper.
              </p>
            </div>
            <button 
              className="neu-sunken-pill browse-more-btn"
              onClick={() => setActiveScreen('home')}
            >
              <span>Explore More Gear</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {myBorrows.length === 0 ? (
            <div className="empty-dashboard-card glass-panel">
              <CalendarCheck size={44} className="text-slate-400" />
              <h3>No active borrow requests</h3>
              <p>You haven't requested any equipment yet. Explore the community marketplace to find camera gear, tools, and bikes.</p>
              <button 
                className="clay-button-primary"
                onClick={() => setActiveScreen('home')}
              >
                <span>Browse Marketplace</span>
              </button>
            </div>
          ) : (
            <div className="borrowed-items-stack">
              {myBorrows.map(borrow => (
                <div key={borrow.id} className="borrowed-card glass-panel">
                  <div className="borrow-left-col">
                    <img src={borrow.image} alt={borrow.itemTitle} className="borrow-thumb" />
                    <div className="borrow-info">
                      <div className="borrow-title-row">
                        <h3>{borrow.itemTitle}</h3>
                        <span className="booking-ref-badge font-mono">{borrow.id}</span>
                      </div>
                      <div className="borrow-lender-info">
                        <img src={borrow.lenderAvatar} alt={borrow.lenderName} className="lender-micro-avatar" />
                        <span>Lender: <strong>{borrow.lenderName}</strong></span>
                        <span className="dot-divider">•</span>
                        <span className="borrow-dates font-mono">
                          <Calendar size={13} className="text-indigo" />
                          {borrow.dates}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="borrow-right-col">
                    <div className="borrow-financials neu-sunken">
                      <div>
                        <span className="fin-label">Daily Price</span>
                        <span className="fin-val">${borrow.dailyPrice}/day</span>
                      </div>
                      <div className="fin-divider"></div>
                      <div>
                        <span className="fin-label">Escrow Deposit</span>
                        <span className="fin-val text-emerald">${borrow.depositHeld} Locked</span>
                      </div>
                      <div className="fin-divider"></div>
                      <div>
                        <span className="fin-label">Status</span>
                        <span className="clay-badge-emerald font-xs">{borrow.status}</span>
                      </div>
                    </div>

                    <div className="borrow-actions">
                      <button 
                        className="clay-button-primary track-btn"
                        onClick={() => handleTrackBorrow(borrow)}
                      >
                        <ShieldCheck size={15} />
                        <span>Track Lifecycle (Step {borrow.lifecycleStep || 3}/7)</span>
                      </button>

                      {onCancelBorrow && (
                        <button 
                          className="cancel-borrow-btn neu-sunken"
                          onClick={() => {
                            if (window.confirm(`Cancel or complete return for ${borrow.itemTitle}?`)) {
                              onCancelBorrow(borrow.id);
                              showToast(`Borrow booking ${borrow.id} completed.`);
                            }
                          }}
                        >
                          Return / Done
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Add New Equipment Listing */}
      {isModalVisible && (
        <div className="modal-backdrop-blur">
          <div className="add-item-modal glass-panel animate-float">
            <div className="modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-clay bg-indigo">
                  <PlusCircle size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="modal-title">List Equipment for Rent</h2>
                  <p className="modal-subtitle">Share your gear with the COMSATS neighborhood safely with zero double bookings.</p>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn neu-sunken"
                onClick={() => setModalVisible(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="add-item-form">
              <div className="form-group">
                <label className="form-label">Equipment Title *</label>
                <input 
                  type="text" 
                  className="clay-input"
                  placeholder="e.g. Sony Alpha A7 IV Camera or DeWalt Cordless Drill"
                  value={newItem.title}
                  onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="clay-input form-select"
                    value={newItem.category}
                    onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    <option value="Cameras & Video">Cameras & Video</option>
                    <option value="Power Tools">Power Tools</option>
                    <option value="Outdoor & Camping">Outdoor & Camping</option>
                    <option value="Bicycles & Mobility">Bicycles & Mobility</option>
                    <option value="Electronics & Audio">Electronics & Audio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Campus Location</label>
                  <input 
                    type="text" 
                    className="clay-input"
                    value={newItem.location}
                    onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Daily Rental Rate ($/day) *</label>
                  <div className="input-with-adornment">
                    <span className="adornment">$</span>
                    <input 
                      type="number" 
                      min="1"
                      className="clay-input with-adornment-input"
                      value={newItem.dailyPrice}
                      onChange={e => setNewItem({ ...newItem, dailyPrice: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Refundable Mock Deposit ($) *</label>
                  <div className="input-with-adornment">
                    <span className="adornment">$</span>
                    <input 
                      type="number" 
                      min="1"
                      className="clay-input with-adornment-input"
                      value={newItem.depositAmount}
                      onChange={e => setNewItem({ ...newItem, depositAmount: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sample Photo Selector */}
              <div className="form-group">
                <label className="form-label">Equipment Photo (Select Preset or enter path)</label>
                <div className="sample-photos-row">
                  {SAMPLE_IMAGES.map(img => (
                    <button
                      key={img.url}
                      type="button"
                      className={`sample-photo-btn ${newItem.image === img.url ? 'active-sample' : ''}`}
                      onClick={() => setNewItem({ ...newItem, image: img.url })}
                    >
                      <img src={img.url} alt={img.label} className="sample-thumb" />
                      <span>{img.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description & Usage Guidelines</label>
                <textarea 
                  className="clay-input form-textarea"
                  rows={3}
                  placeholder="Describe included accessories, condition, and pickup arrangements..."
                  value={newItem.description}
                  onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Features (comma separated)</label>
                <input 
                  type="text" 
                  className="clay-input"
                  placeholder="e.g. 4K 60fps, 2x Batteries, Includes Charger"
                  value={newItem.featuresText}
                  onChange={e => setNewItem({ ...newItem, featuresText: e.target.value })}
                />
              </div>

              <div className="modal-actions-bar">
                <button 
                  type="button" 
                  className="neu-sunken-pill cancel-modal-btn"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="clay-button-primary submit-item-btn"
                >
                  <PlusCircle size={16} />
                  <span>Publish to Marketplace</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

