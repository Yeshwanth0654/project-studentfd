import React, { useState } from 'react';
import { useFeedback } from '../../context/FeedbackContext';

const AdminUsers = () => {
  const { users, updateUser, deleteUser, register, generateAdminCode } = useFeedback();
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'student'
  });
  const [newUserForm, setNewUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    adminCode: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isRequestingCode, setIsRequestingCode] = useState(false);

  // Show all users for admin management
  const allUsers = users;

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleSave = () => {
    if (editingUser) {
      updateUser({ id: editingUser, ...editForm });
      setEditingUser(null);
      setEditForm({ name: '', email: '', role: 'student' });
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({ name: '', email: '', role: 'student' });
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this student account?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="admin-users">
      <div className="page-header">
        <h2>Manage User Accounts</h2>
        <p>View, edit, create, and manage all user accounts in the system</p>
      </div>

      {/* Create New User Form */}
      <div className="create-user-form" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Create New User</h3>
        <form onSubmit={handleCreateUser}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="First Name"
              value={newUserForm.firstName}
              onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})}
              required
              style={{ flex: '1', minWidth: '150px' }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUserForm.lastName}
              onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})}
              required
              style={{ flex: '1', minWidth: '150px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserForm.email}
              onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
              required
              style={{ flex: '1', minWidth: '200px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUserForm.password}
              onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
              required
              style={{ flex: '1', minWidth: '150px' }}
            />
            <select
              value={newUserForm.role}
              onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
              style={{ flex: '1', minWidth: '150px' }}
            >
              <option value="student">Student</option>
              <option value="admin">Administrator</option>
            </select>
            {newUserForm.role === 'admin' && (
              <input
                type="text"
                placeholder="Admin Code"
                value={newUserForm.adminCode}
                onChange={(e) => setNewUserForm({...newUserForm, adminCode: e.target.value})}
                required
                style={{ flex: '1', minWidth: '150px' }}
              />
            )}
            <button type="submit" disabled={isCreating} style={{ padding: '8px 16px' }}>
              {isCreating ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>

      <div className="users-table">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(user => (
              <tr key={user.id}>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.role}</td>
                <td>
                  {editingUser === user.id ? (
                    <>
                      <button onClick={handleSave} className="btn btn-success btn-sm">Save</button>
                      <button onClick={handleCancel} className="btn btn-secondary btn-sm">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="btn btn-primary btn-sm">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allUsers.length === 0 && (
          <div className="empty-state">
            <p>No user accounts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
