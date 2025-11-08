import { useState } from 'react';
import DestinationTable from '../components/table/DestinationTable'
import DestinationModal from '../components/modal/DestionationModal';

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);

  const handleAdd = () => {
    setEditingDestination(null);
    setShowModal(true);
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      setDestinations(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingDestination) {
      setDestinations(prev => 
        prev.map(item => 
          item.id === editingDestination.id 
            ? { ...formData, id: editingDestination.id }
            : item
        )
      );
    } else {
      const newDestination = {
        ...formData,
        id: Date.now()
      };
      setDestinations(prev => [...prev, newDestination]);
    }
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Destination Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>+</span>
          Add Destination
        </button>
      </div>

      <DestinationTable 
        destinations={destinations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <DestinationModal
          destination={editingDestination}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Destination;