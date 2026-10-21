import React, { useState } from 'react';
import { Navbar, Footer } from './components/layout';
import { 
  HomePage, 
  AuthPage, 
  AdminPage, 
  ItemDetailPage, 
  BookingLifecyclePage 
} from './pages';
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
          <HomePage 
            setActiveScreen={setActiveScreen}
            setSelectedListingId={setSelectedListingId}
          />
        )}

        {activeScreen === 'auth' && (
          <AuthPage 
            setActiveScreen={setActiveScreen}
            setRole={setUserRole}
          />
        )}

        {activeScreen === 'admin' && (
          <AdminPage 
            setActiveScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'item-detail' && (
          <ItemDetailPage 
            setActiveScreen={setActiveScreen}
            selectedListingId={selectedListingId}
          />
        )}

        {activeScreen === 'booking-lifecycle' && (
          <BookingLifecyclePage 
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
