import { API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [techStackStr, setTechStackStr] = useState('');
  const [respStr, setRespStr] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', techStackStr: '' });

  const startEdit = (proj) => {
    setEditingId(proj.id);
    setEditData({ title: proj.title, techStackStr: proj.tech_stack.join(', ') });
  };

  const handleUpdate = async (id) => {
    const techArray = editData.techStackStr.split(',').map(s => s.trim()).filter(s => s);
    try {
      const res = await fetch(`http://localhost:8000/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editData.title, tech_stack: techArray })
      });
      if (res.ok) { setEditingId(null); fetchProjects(); }
    } catch (err) { console.error(err); }
  };

  const fetchProjects = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const techArray = techStackStr.split(',').map(s => s.trim()).filter(s => s);
    const respArray = respStr.split(';').map(s => s.trim()).filter(s => s); // Semicolon separated for sentences
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          image: image || null,
          tech_stack: techArray,
          responsibilities: respArray,
          github_url: githubUrl || null
        })
      });
      if (res.ok) {
        setTitle(''); setDescription(''); setImage(''); setTechStackStr(''); setRespStr(''); setGithubUrl('');
        fetchProjects();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProjects();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section glass">
        <h3>Add New Project</h3>
        <form onSubmit={handleAddProject} className="admin-form">
          <div className="form-group">
            <label>Project Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" style={{width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.2)'}}></textarea>
          </div>
          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/my_project.png or https://..." />
          </div>
          <div className="form-group">
            <label>Tech Stack (Comma separated)</label>
            <input type="text" value={techStackStr} onChange={(e) => setTechStackStr(e.target.value)} placeholder="React, Node, Python" required />
          </div>
          <div className="form-group">
            <label>Key Responsibilities (Semicolon ; separated)</label>
            <input type="text" value={respStr} onChange={(e) => setRespStr(e.target.value)} placeholder="Built API; Designed DB;" required />
          </div>
          <div className="form-group">
            <label>GitHub URL (Optional)</label>
            <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Add Project</button>
        </form>
      </div>

      <div className="admin-section glass" style={{marginTop: '30px'}}>
        <h3>Manage Projects</h3>
        {loading ? <p>Loading projects...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Tech Stack</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(proj => (
                                <tr key={proj.id}>
                  {editingId === proj.id ? (
                    <>
                      <td><input value={editData.title} onChange={e => setEditData({...editData, title: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td><input value={editData.techStackStr} onChange={e => setEditData({...editData, techStackStr: e.target.value})} style={{width:'100%', padding:'5px'}} /></td>
                      <td>
                        <button onClick={() => handleUpdate(proj.id)} style={{marginRight: '5px', padding: '5px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '3px'}}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{padding: '5px 10px', background: 'gray', color: 'white', border: 'none', borderRadius: '3px'}}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{proj.title}</td>
                      <td>{proj.tech_stack.join(', ')}</td>
                      <td>
                        <button onClick={() => startEdit(proj)} style={{marginRight: '10px', padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>Edit</button>
                        <button onClick={() => handleDeleteProject(proj.id)} className="btn-delete" style={{padding: '5px 10px'}}>Delete</button>
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

export default AdminProjects;
