import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  ShieldAlert
} from 'lucide-react';

export default function AuthView({ setActiveScreen, setRole }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState('both'); // borrower, lender, both, admin
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: 'Sarmad Rj',
    email: 'sarmad@comsats.edu.pk',
    password: '••••••••••••',
    agreeTerms: true
  });

  const handleQuickFill = (type) => {
    if (type === 'member') {
      setIsSignUp(false);
      setSelectedRole('both');
      setFormData({
        name: 'Sarmad Rj',
        email: 'sarmad@comsats.edu.pk',
        password: 'password123',
        agreeTerms: true
      });
    } else if (type === 'admin') {
      setIsSignUp(false);
      setSelectedRole('admin');
      setFormData({
        name: 'Admin Moderator',
        email: 'admin@passiton.pk',
        password: 'adminpassword',
        agreeTerms: true
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      setActiveScreen('admin');
    } else {
      setActiveScreen('home');
    }
  };

  return (
    <div className="auth-view-wrapper">
      {/* Background Decorative Ambient Blobs */}
      <div className="auth-blob blob-1"></div>
      <div className="auth-blob blob-2"></div>

      <div className="auth-card glass-panel">
        {/* Brand Header */}
        <div className="auth-brand-header">
          <div className="auth-logo-box">
            <img src="/images/logo.jpg" alt="Pass It On" className="auth-logo-img" />
          </div>
          <h2 className="auth-title">
            {isSignUp ? 'Join Pass It On' : 'Welcome Back'}
          </h2>
          <p className="auth-sub">
            {isSignUp 
              ? 'Start borrowing and lending idle gear with confidence' 
              : 'Enter your credentials to manage conflict-free bookings'}
          </p>
        </div>

        {/* Quick Demo Autofill Bar */}
        <div className="quick-demo-fill-box neu-sunken">
          <div className="demo-fill-label">
            <Sparkles size={13} className="text-amber" />
            <span>Teacher / Demo Quick Test:</span>
          </div>
          <div className="demo-fill-actions">
            <button 
              type="button"
              className="demo-btn-pill"
              onClick={() => handleQuickFill('member')}
            >
              Fill Member (Sarmad Rj)
            </button>
            <button 
              type="button"
              className="demo-btn-pill admin-demo"
              onClick={() => handleQuickFill('admin')}
            >
              Fill Admin Hub
            </button>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up (Neumorphic Inset with Clay Switch) */}
        <div className="auth-tabs neu-sunken-pill">
          <button 
            type="button"
            className={`auth-tab-btn ${!isSignUp ? 'active-clay' : ''}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-tab-btn ${isSignUp ? 'active-clay' : ''}`}
            onClick={() => setIsSignUp(true)}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="neu-input-wrapper neu-sunken">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="e.g. Sarmad Rj" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Role Selection (Claymorphic Chips) */}
              <div className="form-group">
                <label className="form-label">Select Your Community Role</label>
                <div className="role-options-grid">
                  <div 
                    className={`role-clay-option ${selectedRole === 'both' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('both')}
                  >
                    <div className="role-top">
                      <span className="role-name">Dual Member</span>
                      {selectedRole === 'both' && <CheckCircle2 size={16} className="text-emerald" />}
                    </div>
                    <span className="role-desc">Both lend idle gear & borrow</span>
                  </div>

                  <div 
                    className={`role-clay-option ${selectedRole === 'borrower' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('borrower')}
                  >
                    <div className="role-top">
                      <span className="role-name">Borrower</span>
                      {selectedRole === 'borrower' && <CheckCircle2 size={16} className="text-emerald" />}
                    </div>
                    <span className="role-desc">Rent items for projects</span>
                  </div>

                  <div 
                    className={`role-clay-option ${selectedRole === 'lender' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('lender')}
                  >
                    <div className="role-top">
                      <span className="role-name">Lender</span>
                      {selectedRole === 'lender' && <CheckCircle2 size={16} className="text-emerald" />}
                    </div>
                    <span className="role-desc">Earn from unused tools & tech</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">University / Work Email</label>
            <div className="neu-input-wrapper neu-sunken">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="sarmad@comsats.edu.pk" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div className="label-row">
              <label className="form-label">Password</label>
              {!isSignUp && (
                <a href="#forgot" className="forgot-link" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              )}
            </div>
            <div className="neu-input-wrapper neu-sunken">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button 
                type="button" 
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Action (Claymorphic 3D Button) */}
          <button type="submit" className="clay-button-primary auth-submit-btn">
            <span>{isSignUp ? 'Create Community Account' : 'Sign In with Confidence'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Trust Safeguard Footer */}
        <div className="auth-trust-box neu-sunken">
          <ShieldCheck size={18} className="text-emerald" />
          <div className="trust-text">
            <strong>Conflict-Free Security:</strong> Every account is linked to verified COMSATS community records with guaranteed mock deposit escrow.
          </div>
        </div>
      </div>
    </div>
  );
}
