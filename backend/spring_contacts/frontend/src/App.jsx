import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ContactCard from './components/ContactCard';
import './App.css';

const MOCK_CONTACTS = [
  { id: 1, name: "Anthony Edward Stark", phone: "+1 (630) 555-0101", email: "tony.stark@starkindustries.com", role: "Chief Technology Officer", company: "Marvel: Avengers", location: "Malibu, California", status: "Active" },
  { id: 2, name: "Bruce Wayne", phone: "+1 (312) 555-0199", email: "bruce.wayne@waynecorp.com", role: "Chairman", company: "DC: Justice League", location: "Gotham City", status: "Active" },
  { id: 3, name: "Natasha Romanoff", phone: "+1 (212) 555-0456", email: "black.widow@shield.gov", role: "Intelligence Operative", company: "Marvel: S.H.I.E.L.D.", location: "Moscow / New York", status: "Active" },
  { id: 4, name: "Diana Prince", phone: "+1 (202) 555-0789", email: "diana.prince@themiscira.org", role: "Ambassador", company: "DC: Amazonia", location: "Themyscira", status: "Active" },
  { id: 5, name: "Wanda Maximoff", phone: "+1 (518) 555-0123", email: "scarlet.witch@avengers.com", role: "Specialist", company: "Marvel: Avengers", location: "Westview, NJ", status: "Active" },
  { id: 6, name: "Clark Kent", phone: "+1 (316) 555-0444", email: "clark.kent@dailyplanet.com", role: "Senior Journalist", company: "DC: Daily Planet", location: "Metropolis", status: "Active" },
  { id: 7, name: "Selina Kyle", phone: "+1 (312) 555-0911", email: "cat@kyle-antiques.com", role: "Artifact Specialist", company: "DC: Independent", location: "Gotham City", status: "Active" },
  { id: 8, name: "Scarlett Johansson", phone: "+1 (310) 555-0888", email: "contact@scarlettj.com", role: "Lead Actress", company: "Hollywood: Talent", location: "Los Angeles, CA", status: "Active" },
  { id: 9, name: "Gal Gadot", phone: "+1 (310) 555-0777", email: "office@galgadot.com", role: "Producer / Actress", company: "Hollywood: Talent", location: "Tel Aviv / LA", status: "Active" },
  { id: 10, name: "Zendaya Coleman", phone: "+1 (310) 555-0666", email: "z@zendaya.com", role: "Creative Director", company: "Hollywood: Talent", location: "Oakland, CA", status: "Active" }
];

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchContacts = useCallback(async (attempt = 0) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
    
    try {
      setLoading(true);
      const response = await axios.get(`${apiBaseUrl}/contacts`);
      setContacts(response.data);
      setIsDemoMode(false);
      if (response.data.length > 0 && !selectedId) {
        setSelectedId(response.data[0].id);
      }
      setLoading(false);
    } catch (err) {
      if (attempt < 5) {
        console.log(`Backend not ready, retrying... (Attempt ${attempt + 1}/5)`);
        setRetryCount(attempt + 1);
        setTimeout(() => fetchContacts(attempt + 1), 2000);
      } else {
        console.warn('Backend offline after retries, enabling Demo Mode', err);
        setContacts(MOCK_CONTACTS);
        setIsDemoMode(true);
        setSelectedId(MOCK_CONTACTS[0].id);
        setLoading(false);
      }
    }
  }, [selectedId]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const selectedContact = contacts.find(c => c.id === selectedId);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Contacts</h1>
        </div>
        <div className="contacts-list">
          {loading && contacts.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#8e8e93' }}>
              {retryCount > 0 ? `Connecting (${retryCount})...` : 'Loading...'}
            </div>
          ) : (
            contacts.map(contact => (
              <div 
                key={contact.id} 
                className={`contact-item ${selectedId === contact.id ? 'active' : ''}`}
                onClick={() => setSelectedId(contact.id)}
              >
                <div className="contact-item-name">{contact.name}</div>
              </div>
            ))
          )}
        </div>
      </aside>

      <main className="main-content">
        <div className="connection-status">
          <span className={`status-dot ${isDemoMode ? 'offline' : 'online'}`}></span>
          {isDemoMode ? 'Offline Cache' : 'Cloud Secure'}
        </div>

        {loading && !selectedContact ? (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p style={{ color: '#8e8e93', fontSize: '13px' }}>
              {retryCount > 0 ? 'Waiting for Secure Kernel...' : 'Accessing Directory...'}
            </p>
          </div>
        ) : selectedContact ? (
          <ContactCard contact={selectedContact} isDemo={isDemoMode} />
        ) : (
          <div className="no-selection">
            <svg className="apple-icon-large" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <p>Select a contact to view details</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
