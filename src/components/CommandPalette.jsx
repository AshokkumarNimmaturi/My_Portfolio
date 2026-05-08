import { useState, useEffect } from 'react';
import './CommandPalette.css';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const commands = [
    { id: 'home', title: 'Go to Home', icon: '🏠', action: () => scrollToSection('home') },
    { id: 'about', title: 'Go to About', icon: '👤', action: () => scrollToSection('about') },
    { id: 'skills', title: 'Go to Skills', icon: '🛠️', action: () => scrollToSection('skills') },
    { id: 'projects', title: 'Go to Projects', icon: '🚀', action: () => scrollToSection('projects') },
    { id: 'contact', title: 'Go to Contact', icon: '📧', action: () => scrollToSection('contact') },
    { id: 'resume', title: 'Download Resume', icon: '📄', action: () => window.open('/Ashokkumar_Resume.pdf', '_blank') },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="cp-overlay" onClick={() => setIsOpen(false)}>
      <div className="cp-modal glass" onClick={e => e.stopPropagation()}>
        <div className="cp-search-container">
          <span className="cp-search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Type a command or search..." 
            className="cp-input"
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="cp-list">
          {filteredCommands.length > 0 ? (
            filteredCommands.map(cmd => (
              <div key={cmd.id} className="cp-item" onClick={cmd.action}>
                <span className="cp-item-icon">{cmd.icon}</span>
                <span className="cp-item-title">{cmd.title}</span>
                <span className="cp-item-shortcut">Enter</span>
              </div>
            ))
          ) : (
            <div className="cp-no-results">No commands found.</div>
          )}
        </div>
        <div className="cp-footer">
          <span>Esc to close</span>
          <span>&copy; Ashokkumar</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
