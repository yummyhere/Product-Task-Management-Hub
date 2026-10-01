import React from 'react';
import { Layers, Plus } from 'lucide-react';

const Navbar = ({ onOpenCreateModal, isConnected = true }) => {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Layers size={18} color="#ffffff" />
          </div>
          <div>
            <h1 className="brand-title">Product &amp; Task Hub</h1>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="status-indicator" title="Database connection status">
            <span className={`status-dot ${!isConnected ? 'offline' : ''}`} />
            <span>{isConnected ? 'Connected' : 'Offline'}</span>
          </div>

          <button 
            type="button" 
            className="btn-primary" 
            onClick={onOpenCreateModal}
            id="nav-create-btn"
          >
            <Plus size={16} />
            <span>New Item</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
