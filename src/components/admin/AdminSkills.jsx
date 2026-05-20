import { API_BASE_URL } from '../../config';
import { useState, useEffect } from 'react';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newSkillsStr, setNewSkillsStr] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSkillsStr, setEditSkillsStr] = useState('');

  const startEdit = (skill) => {
    setEditingId(skill.id);
    setEditTitle(skill.title);
    setEditSkillsStr(skill.skills.join(', '));
  };

  const handleUpdate = async (id) => {
    const skillsArray = editSkillsStr.split(',').map(s => s.trim()).filter(s => s);
    try {
      const res = await fetch(`http://localhost:8000/api/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, skills: skillsArray })
      });
      if (res.ok) { setEditingId(null); fetchSkills(); }
    } catch (err) { console.error(err); }
  };

  const fetchSkills = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/skills`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const skillsArray = newSkillsStr.split(',').map(s => s.trim()).filter(s => s);
    if (!newCategoryTitle || skillsArray.length === 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newCategoryTitle, skills: skillsArray })
      });
      if (res.ok) {
        setNewCategoryTitle('');
        setNewSkillsStr('');
        fetchSkills();
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) fetchSkills();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="admin-tab-content">
      <div className="admin-section glass">
        <h3>Add New Skill Category</h3>
        <form onSubmit={handleAddSkill} className="admin-form">
          <div className="form-group">
            <label>Category Title</label>
            <input type="text" placeholder="e.g. Cloud Computing" value={newCategoryTitle} onChange={(e) => setNewCategoryTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Skills (Comma separated)</label>
            <input type="text" placeholder="e.g. AWS, Docker, Kubernetes" value={newSkillsStr} onChange={(e) => setNewSkillsStr(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Skill Category</button>
        </form>
      </div>

      <div className="admin-section glass" style={{marginTop: '30px'}}>
        <h3>Manage Existing Skills</h3>
        {loading ? <p>Loading skills...</p> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map(skill => (
                                <tr key={skill.id}>
                  {editingId === skill.id ? (
                    <>
                      <td><input value={editTitle} onChange={e => setEditTitle(e.target.value)} style={{width:'100%', padding:'5px'}} /></td>
                      <td><input value={editSkillsStr} onChange={e => setEditSkillsStr(e.target.value)} style={{width:'100%', padding:'5px'}} /></td>
                      <td>
                        <button onClick={() => handleUpdate(skill.id)} style={{marginRight: '5px', padding: '5px 10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '3px'}}>Save</button>
                        <button onClick={() => setEditingId(null)} style={{padding: '5px 10px', background: 'gray', color: 'white', border: 'none', borderRadius: '3px'}}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{skill.title}</td>
                      <td>{skill.skills.join(', ')}</td>
                      <td>
                        <button onClick={() => startEdit(skill)} style={{marginRight: '10px', padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer'}}>Edit</button>
                        <button onClick={() => handleDeleteSkill(skill.id)} className="btn-delete" style={{padding: '5px 10px'}}>Delete</button>
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

export default AdminSkills;
