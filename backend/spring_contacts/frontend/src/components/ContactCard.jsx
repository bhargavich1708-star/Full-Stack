import './ContactCard.css';

export default function ContactCard({ contact, isDemo }) {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="contact-card">
      <div className="card-header">
        <div className="avatar-large">
          {getInitials(contact.name)}
        </div>
        <h2 className="profile-name">{contact.name}</h2>
        <p className="profile-company">{contact.role} — {contact.company}</p>
      </div>

      <div className="action-buttons">
        <button className="action-item">
          <div className="action-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <span className="action-label">message</span>
        </button>
        <button className="action-item">
          <div className="action-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </div>
          <span className="action-label">mobile</span>
        </button>
        <button className="action-item">
          <div className="action-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
          </div>
          <span className="action-label">video</span>
        </button>
        <button className="action-item">
          <div className="action-circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>
          </div>
          <span className="action-label">mail</span>
        </button>
      </div>

      <div className="info-sections">
        <div className="info-group">
          <div className="info-row">
            <span className="info-label">mobile</span>
            <span className="info-value" style={{ color: 'var(--apple-blue)' }}>{contact.phone}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-row">
            <span className="info-label">home</span>
            <span className="info-value" style={{ color: 'var(--apple-blue)' }}>{contact.email}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-row">
            <span className="info-label">work</span>
            <span className="info-value">{contact.company}</span>
          </div>
          <div className="info-row">
            <span className="info-label">department</span>
            <span className="info-value">{contact.role}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-row">
            <span className="info-label">location</span>
            <span className="info-value">{contact.location}</span>
          </div>
        </div>

        {isDemo ? (
          <div style={{ padding: '10px', textAlign: 'center', fontSize: '11px', color: '#ff3b30', background: '#fff1f0', borderRadius: '8px' }}>
            Note: Displaying information from local secure cache.
          </div>
        ) : null}
      </div>
    </div>
  );
}
