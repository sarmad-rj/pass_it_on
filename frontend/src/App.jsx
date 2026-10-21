import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AuthView from './components/AuthView';
import AdminView from './components/AdminView';
import ItemDetailView from './components/ItemDetailView';
import BookingLifecycleView from './components/BookingLifecycleView';
import './App.css';

function App() {
  // Available screens: 'home', 'auth', 'admin', 'item-detail', 'booking-lifecycle'
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState('item_1');
  const [userRole, setUserRole] = useState('member'); // member or admin

  return (
    <div className="app-root">
      {/* Universal Top Glassmorphic Navigation */}
      <Navbar 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        role={userRole}
        setRole={setUserRole}
      />

      {/* Main Viewport Content based on activeScreen */}
      <main className="main-content">
        {activeScreen === 'home' && (
          <HomeView 
            setActiveScreen={setActiveScreen}
            setSelectedListingId={setSelectedListingId}
          />
        )}

        {activeScreen === 'auth' && (
          <AuthView 
            setActiveScreen={setActiveScreen}
            setRole={setUserRole}
          />
        )}

        {activeScreen === 'admin' && (
          <AdminView 
            setActiveScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'item-detail' && (
          <ItemDetailView 
            setActiveScreen={setActiveScreen}
            selectedListingId={selectedListingId}
          />
        )}

        {activeScreen === 'booking-lifecycle' && (
          <BookingLifecycleView 
            setActiveScreen={setActiveScreen}
          />
        )}
      </main>

      {/* Real Website Footer */}
      <Footer setActiveScreen={setActiveScreen} />
    </div>
  );
}

export default App;
