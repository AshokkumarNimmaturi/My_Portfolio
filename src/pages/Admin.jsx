import { API_BASE_URL } from '../config';
import { useState, useEffect } from 'react';
import './Admin.css';
import AdminSkills from '../components/admin/AdminSkills';
import AdminProjects from '../components/admin/AdminProjects';
import AdminTimeline from '../components/admin/AdminTimeline';
import AdminServices from '../components/admin/AdminServices';
import AdminCertificates from '../components/admin/AdminCertificates';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('skills');
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${API_BASE_URL}/api/visits/count`)
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.value === 'number') {
            setVisitCount(data.value);
          }
        })
        .catch(err => console.error("Error fetching stats:", err));
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="admin-login-form glass">
          <h2>Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container">
      <div className="admin-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '30px', gap: '20px'}}>
        <div>
          <h2 style={{margin: 0}}>Welcome to the CMS Admin Panel</h2>
          <a href="/" className="btn btn-outline" style={{marginTop: '10px', display: 'inline-block'}}>← Back to Portfolio</a>
        </div>
        <div className="visitor-stats-card glass" style={{padding: '15px 25px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)'}}>
          <span className="live-dot" style={{width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #10b981'}}></span>
          <div>
            <div style={{fontSize: '12px', opacity: 0.7}}>Total Portfolio Views</div>
            <div style={{fontSize: '24px', fontWeight: 'bold', color: '#3b82f6'}}>{visitCount.toLocaleString()}</div>
          </div>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
        <button className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
        <button className={`admin-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>Timeline</button>
        <button className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>Services</button>
        <button className={`admin-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>Certificates</button>
      </div>

      <div className="admin-tab-renderer">
        {activeTab === 'skills' && <AdminSkills />}
        {activeTab === 'projects' && <AdminProjects />}
        {activeTab === 'timeline' && <AdminTimeline />}
        {activeTab === 'services' && <AdminServices />}
        {activeTab === 'certificates' && <AdminCertificates />}
      </div>
    </div>
  );
};

export default Admin;
