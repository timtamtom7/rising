import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import './PropertyCard.css';

export function PropertyCard({ property, currency = 'USD', onDelete, onPriceDrop }) {
  const hasPriceDrop = !!property.priceDroppedAt;
  const daysOnMarket = Math.ceil(
    (new Date() - new Date(property.listedAt)) / (1000 * 60 * 60 * 24)
  );
  const isPriceDropped = hasPriceDrop && property.price < property.priceDroppedAt;

  return (
    <article className={`property-card ${hasPriceDrop ? 'property-card--price-dropped' : ''}`}>
      <div className="property-card-photo">
        {property.photos && property.photos.length > 0 ? (
          <img src={property.photos[0]} alt={property.name} />
        ) : (
          <div className="property-card-photo--placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        )}
        {hasPriceDrop && (
          <div className="property-card-badge property-card-badge--drop">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 14h7v8l8-12h-7z"/>
            </svg>
            Price Drop
          </div>
        )}
        {property.link && (
          <a
            href={property.link}
            target="_blank"
            rel="noopener noreferrer"
            className="property-card-link-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label="View listing"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        )}
      </div>

      <div className="property-card-body">
        <div className="property-card-header">
          <div>
            <h3 className="property-card-name">{property.name}</h3>
            <p className="property-card-address">{property.address}</p>
          </div>
          <div className="property-card-actions">
            {onDelete && (
              <button
                className="btn btn-ghost btn-icon btn-sm"
                onClick={(e) => { e.preventDefault(); onDelete(property.id); }}
                aria-label="Delete property"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="property-card-price">
          <span className="property-card-price-amount amount">{formatCurrency(property.price, currency)}</span>
          {property.estimatedValue && property.estimatedValue !== property.price && (
            <span className="property-card-est">
              Est. value: {formatCurrency(property.estimatedValue, currency)}
            </span>
          )}
        </div>

        <div className="property-card-meta">
          {daysOnMarket > 0 && (
            <span className={`property-card-days ${daysOnMarket > 30 ? 'property-card-days--stale' : ''}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {daysOnMarket} days on market
            </span>
          )}
        </div>

        {property.notes && (
          <p className="property-card-notes">{property.notes}</p>
        )}
      </div>
    </article>
  );
}
