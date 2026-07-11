import React from 'react';
import { X, Trash2, History, RotateCcw } from 'lucide-react';

function HistorySidebar({ isOpen, onClose, history = [], onSelectItem, onDeleteItem, onClearAll }) {
  
  // Helper to group history entries by date categories
  const groupHistory = (items) => {
    const today = [];
    const yesterday = [];
    const last7Days = [];
    const older = [];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const startOf7DaysAgo = startOfToday - 7 * 24 * 60 * 60 * 1000;

    items.forEach((item) => {
      const itemTime = new Date(item.timestamp).getTime();
      if (itemTime >= startOfToday) {
        today.push(item);
      } else if (itemTime >= startOfYesterday) {
        yesterday.push(item);
      } else if (itemTime >= startOf7DaysAgo) {
        last7Days.push(item);
      } else {
        older.push(item);
      }
    });

    return { today, yesterday, last7Days, older };
  };

  const groups = groupHistory(history);

  const renderGroup = (title, items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="history-group">
        <h4 className="history-group-title">{title}</h4>
        {items.map((item) => (
          <div 
            key={item.id} 
            className="history-item"
            onClick={() => {
              onSelectItem(item.city);
              onClose();
            }}
          >
            <div className="history-item-details">
              <History size={16} className="history-item-icon" />
              <span className="history-item-name">{item.city}</span>
            </div>
            <button
              className="history-item-delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // prevent searching when clicking delete
                onDeleteItem(item.city);
              }}
              title="Delete from history"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Overlay to close sidebar by clicking outside */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      
      <div className={`history-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <History size={20} />
            <span>Search History</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} title="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-content">
          {history.length === 0 ? (
            <div className="empty-history-text">
              <p>Your search history is empty.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>Searched cities will appear here.</p>
            </div>
          ) : (
            <>
              {renderGroup("Today", groups.today)}
              {renderGroup("Yesterday", groups.yesterday)}
              {renderGroup("Previous 7 Days", groups.last7Days)}
              {renderGroup("Older", groups.older)}
            </>
          )}
        </div>

        {history.length > 0 && (
          <div className="sidebar-footer">
            <button className="btn-clear-all" onClick={onClearAll}>
              <RotateCcw size={16} />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default HistorySidebar;
