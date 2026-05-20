import { API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ icon: '', title: '' });

  const startEdit = (svc) => {
    setEditingId(svc.id);
    setEditData({ icon: svc.icon, title: svc.title });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icon: editData.icon, title: editData.title })
      });
      if (res.ok) { setEditingId(null); fetchServices(); }
    } catch (err) { console.error(err); }
  };

  const fetchServices = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/services`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icon, title, description })
      });
      if (res.ok) {
        setIcon(''); setTitle(''); setDescription('');
        fetchServices();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) fetchServices();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section glass">
        <h3>Add New Service</h3>
        <form onSubmit={handleAddService} className="admin-form">
          <div className="form-group">
            <label>Icon (Emoji or Text)</label>
            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" style={{width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)'}}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Service</button>
        </form>
      </div>

      <div className="admin-section glass" style={{marginTop: '30px'}}>
        <h3>Manage Services</h3>
        {loading ? <p>Loading services...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(svc => (
                                <tr key={svc.id}>
                  {editingId === svc.id ? (
                    <>
                      <td><input value={editData.icon} onChange={e => setEditData({...editData, icon: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td><input value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td>
                        <button onClick={() => handleUpdate(svc.id)} style={{marginRight: '5px', padding: '5px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '3px'}}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{padding: '5px 10px', background: 'gray', color: 'white', border: 'none', borderRadius: '3px'}}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{svc.icon}</td>
                      <td>{svc.title}</td>
                      <td>
                        <button onClick={() => startEdit(svc)} style={{marginRight: '10px', padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>Edit</button>
                        <button onClick={() => handleDeleteService(svc.id)} className="btn-delete" style={{padding: '5px 10px'}}>Delete</button>
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

export default AdminServices;
