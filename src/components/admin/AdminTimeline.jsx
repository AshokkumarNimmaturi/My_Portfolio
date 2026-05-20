import { API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';

const AdminTimeline = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('work');

  useEffect(() => {
    fetchTimeline();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', company: '', date: '' });

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setEditData({ title: exp.title, company: exp.company, date: exp.date });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/timeline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editData.title, company: editData.company, date: editData.date })
      });
      if (res.ok) { setEditingId(null); fetchTimeline(); }
    } catch (err) { console.error(err); }
  };

  const fetchTimeline = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/timeline`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setExperiences(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, company, location, date, description, type })
      });
      if (res.ok) {
        setTitle(''); setCompany(''); setLocation(''); setDate(''); setDescription(''); setType('work');
        fetchTimeline();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Delete this timeline entry?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/timeline/${id}`, { method: 'DELETE' });
      if (res.ok) fetchTimeline();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section glass">
        <h3>Add New Timeline Entry</h3>
        <form onSubmit={handleAddExperience} className="admin-form">
          <div className="form-group">
            <label>Title / Role</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Company / Organization</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Date / Duration</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g., 2020 - 2024" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" style={{width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)'}}></textarea>
          </div>
          <div className="form-group">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={{width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)'}}>
              <option value="work">Work / Experience</option>
              <option value="education">Education</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Timeline Entry</button>
        </form>
      </div>

      <div className="admin-section glass" style={{marginTop: '30px'}}>
        <h3>Manage Timeline</h3>
        {loading ? <p>Loading timeline...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map(exp => (
                                <tr key={exp.id}>
                  {editingId === exp.id ? (
                    <>
                      <td><input value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td><input value={editData.company} onChange={e => setEditData({...editData, company: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td><input value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td>
                        <button onClick={() => handleUpdate(exp.id)} style={{marginRight: '5px', padding: '5px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '3px'}}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{padding: '5px 10px', background: 'gray', color: 'white', border: 'none', borderRadius: '3px'}}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{exp.title}</td>
                      <td>{exp.company}</td>
                      <td>{exp.date}</td>
                      <td>
                        <button onClick={() => startEdit(exp)} style={{marginRight: '10px', padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>Edit</button>
                        <button onClick={() => handleDeleteExperience(exp.id)} className="btn-delete" style={{padding: '5px 10px'}}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTimeline;
