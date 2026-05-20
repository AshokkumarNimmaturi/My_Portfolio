import { API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';

const AdminCertificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [date, setDate] = useState('');
  const [grade, setGrade] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCerts();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', organization: '' });

  const startEdit = (cert) => {
    setEditingId(cert.id);
    setEditData({ title: cert.title, organization: cert.organization });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/certificates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editData.title, organization: editData.organization })
      });
      if (res.ok) { setEditingId(null); fetchCerts(); }
    } catch (err) { console.error(err); }
  };

  const fetchCerts = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/certificates`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, organization, date, grade, image, description })
      });
      if (res.ok) {
        setTitle(''); setOrganization(''); setDate(''); setGrade(''); setImage(''); setDescription('');
        fetchCerts();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/certificates/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCerts();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section glass">
        <h3>Add New Certificate</h3>
        <form onSubmit={handleAddCert} className="admin-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Organization / Issuer</label>
            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Grade / Score</label>
            <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/cert1.png or https://..." required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" style={{width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)'}}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Certificate</button>
        </form>
      </div>

      <div className="admin-section glass" style={{marginTop: '30px'}}>
        <h3>Manage Certificates</h3>
        {loading ? <p>Loading certificates...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Organization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certs.map(cert => (
                                <tr key={cert.id}>
                  {editingId === cert.id ? (
                    <>
                      <td><input value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td><input value={editData.organization} onChange={e => setEditData({...editData, organization: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td>
                        <button onClick={() => handleUpdate(cert.id)} style={{marginRight: '5px', padding: '5px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '3px'}}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{padding: '5px 10px', background: 'gray', color: 'white', border: 'none', borderRadius: '3px'}}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{cert.title}</td>
                      <td>{cert.organization}</td>
                      <td>
                        <button onClick={() => startEdit(cert)} style={{marginRight: '10px', padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>Edit</button>
                        <button onClick={() => handleDeleteCert(cert.id)} className="btn-delete" style={{padding: '5px 10px'}}>Delete</button>
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

export default AdminCertificates;
