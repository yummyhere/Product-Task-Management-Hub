import React from 'react';
import { Layers, Plus, Database } from 'lucide-react';

const Navbar = ({ onOpenCreateModal, isConnected = true }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Layers size={22} color="#ffffff" />
          </div>
          <div>
            <h1 className="brand-title">Product &amp; Task Hub</h1>
            <p className="brand-subtitle">Level 4 • Full-Stack Architecture</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="api-badge" title="Backend & Database status">
            <span className="api-pulse" />
            <Database size={13} />
            <span>{isConnected ? 'MongoDB Connected' : 'Connecting...'}</span>
          </div>

          <button 
            type="button" 
            className="btn-primary" 
            onClick={onOpenCreateModal}
            id="nav-create-btn"
          >
            <Plus size={18} />
            <span>New Item</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
