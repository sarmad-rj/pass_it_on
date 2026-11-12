import React, { useState } from 'react';
import { Navbar, Footer } from './components/layout';
import { 
  HomePage, 
  AuthPage, 
  AdminPage, 
  ItemDetailPage, 
  BookingLifecyclePage,
  UserDashboardPage
} from './pages';
import { LISTINGS, CURRENT_USER } from './data/mockData';
import './App.css';

const INITIAL_BORROWS = [
  {
    id: 'BK-1084',
    itemTitle: 'DeWalt 20V MAX Cordless Drill & Impact Driver Combo Kit',
    itemId: 'item_2',
    image: '/images/drill.jpg',
    category: 'Power Tools',
    lenderName: 'Usman Ghani',
    lenderAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    dates: 'Oct 23 — Oct 24, 2026',
    dailyPrice: 18,
    depositHeld: 80,
    totalCost: 116,
    status: 'ACTIVE_BORROW',
    lifecycleStep: 5,
    depositState: 'HELD_IN_ESCROW'
  },
  {
    id: 'BK-1089',
    itemTitle: 'Trek Fuel EX 8 Full-Suspension Mountain Bike (Size L)',
    itemId: 'item_3',
    image: '/images/bike.jpg',
    category: 'Bicycles & Mobility',
    lenderName: 'Zainab Malik',
    lenderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    dates: 'Oct 27 — Oct 29, 2026',
    dailyPrice: 38,
    depositHeld: 250,
    totalCost: 326,
    status: 'ACCEPTED_CONFIRMED',
    lifecycleStep: 3,
    depositState: 'HELD_IN_ESCROW'
  }
];

function App() {
  // Available screens: 'home', 'dashboard', 'auth', 'admin', 'item-detail', 'booking-lifecycle'
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState('item_1');
  const [userRole, setUserRole] = useState('member'); // member or admin
  
  // Lifted Platform State for Dynamic User Dashboard & Marketplace
  const [listings, setListings] = useState(LISTINGS);
  const [myBorrows, setMyBorrows] = useState(INITIAL_BORROWS);
  const [activeBooking, setActiveBooking] = useState(INITIAL_BORROWS[0]);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [authInitialSignUp, setAuthInitialSignUp] = useState(false);

  const handleNavigateAuth = (isSignUp = false) => {
    setAuthInitialSignUp(isSignUp);
    setActiveScreen('auth');
  };

  // Dynamic Handlers
  const handleAddListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const handleRemoveListing = (listingId) => {
    setListings(prev => prev.filter(item => item.id !== listingId));
    // If the currently viewed detail item was deleted, fallback to first available
    if (selectedListingId === listingId) {
      const remaining = listings.filter(item => item.id !== listingId);
      if (remaining.length) setSelectedListingId(remaining[0].id);
    }
  };

  const handleBorrowItem = (borrowData) => {
    setMyBorrows(prev => [borrowData, ...prev]);
    setActiveBooking(borrowData);

    // Lock chosen dates in listings so calendar immediately reflects the double-booking block
    if (borrowData.itemId && borrowData.range) {
      setListings(prev => prev.map(item => {
        if (item.id === borrowData.itemId) {
          return {
            ...item,
            bookedRanges: [
              ...(item.bookedRanges || []),
              {
                start: borrowData.range.startDate,
                end: borrowData.range.endDate,
                borrower: CURRENT_USER.name,
                bookingId: borrowData.id
              }
            ]
          };
        }
        return item;
      }));
    }
  };

  const handleCancelBorrow = (borrowId) => {
    setMyBorrows(prev => prev.filter(b => b.id !== borrowId));
  };

  return (
    <div className="app-root">
      {/* Universal Top Glassmorphic Navigation */}
      <Navbar 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        role={userRole}
        setRole={setUserRole}
        onNavigateAuth={handleNavigateAuth}
        onOpenAddModal={() => {
          setActiveScreen('dashboard');
          setIsAddItemModalOpen(true);
        }}
      />

      {/* Main Viewport Content based on activeScreen */}
      <main className="main-content">
        {activeScreen === 'home' && (
          <HomePage 
            setActiveScreen={setActiveScreen}
            setSelectedListingId={setSelectedListingId}
            listings={listings}
          />
        )}

        {activeScreen === 'dashboard' && (
          <UserDashboardPage 
            setActiveScreen={setActiveScreen}
            setSelectedListingId={setSelectedListingId}
            listings={listings}
            onRemoveListing={handleRemoveListing}
            onAddListing={handleAddListing}
            myBorrows={myBorrows}
            onCancelBorrow={handleCancelBorrow}
            setActiveBooking={setActiveBooking}
            isAddItemModalOpen={isAddItemModalOpen}
            setIsAddItemModalOpen={setIsAddItemModalOpen}
            onNavigateAuth={handleNavigateAuth}
          />
        )}

        {activeScreen === 'auth' && (
          <AuthPage 
            key={authInitialSignUp ? 'signup' : 'signin'}
            setActiveScreen={setActiveScreen}
            setRole={setUserRole}
            initialSignUp={authInitialSignUp}
          />
        )}

        {activeScreen === 'admin' && (
          <AdminPage 
            setActiveScreen={setActiveScreen}
            listings={listings}
            onRemoveListing={handleRemoveListing}
          />
        )}

        {activeScreen === 'item-detail' && (
          <ItemDetailPage 
            setActiveScreen={setActiveScreen}
            selectedListingId={selectedListingId}
            listings={listings}
            onBorrowItem={handleBorrowItem}
            setActiveBooking={setActiveBooking}
          />
        )}

        {activeScreen === 'booking-lifecycle' && (
          <BookingLifecyclePage 
            setActiveScreen={setActiveScreen}
            activeBooking={activeBooking}
          />
        )}
      </main>

      {/* Real Website Footer */}
      <Footer setActiveScreen={setActiveScreen} />
    </div>
  );
}

export default App;
