import { useState } from "react";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import { useUsers } from "../hook/useUser";

const User = () => {
  const { users, deleteUser, updateUser } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    }
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>

      <UserTable users={users} onEdit={handleEdit} onDelete={deleteUser} />

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
