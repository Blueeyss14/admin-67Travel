import { useState } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

const User = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Felicia", 
      email: "felifeli@gmail.com", 
      password: "password123" 
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      setUsers(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingUser) {
      setUsers(prev => 
        prev.map(item => 
          item.id === editingUser.id 
            ? { ...formData, id: editingUser.id }
            : item
        )
      );
    }
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>

      <UserTable 
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <UserModal
          user={editingUser}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default User;