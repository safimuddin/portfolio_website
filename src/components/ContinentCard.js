import React from "react";
import { X } from "lucide-react";
import "../styles/ContinentCard.css";

export function ContinentCard({ continent, onClose }) {
  if (!continent) return null;

  return (
    <div className="continent-card-overlay" onClick={onClose}>
      <div className="continent-card-wrapper">
        <div className="continent-card" onClick={(e) => e.stopPropagation()}>
          <div className="card-header-top">
            <div className="card-icon-wrapper">
              <span className="card-icon">{continent.icon}</span>
            </div>
            <div className="card-header-info">
              <h2 className="card-title">{continent.description}</h2>
            </div>
            <button
              type="button"
              className="card-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="card-divider"></div>

          <div className="card-content">
            <ul className="card-details">
              {continent.details.map((detail, idx) => (
                <li key={idx} className="detail-item">
                  <span className="detail-bullet">•</span>
                  <span className="detail-text">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-divider"></div>

          <div className="card-footer">
            <span className="card-timestamp">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
