import { useState } from 'react';
import LocationTable from '../components/LocationTable';
import LocationModal from '../components/LocationModal';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);

  const handleAdd = () => {
    setEditingLocation(null);
    setShowModal(true);
  };

  const handleEdit = (location) => {
    setEditingLocation(location);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      setLocations(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingLocation) {
      setLocations(prev => 
        prev.map(item => 
          item.id === editingLocation.id 
            ? { ...formData, id: editingLocation.id }
            : item
        )
      );
    } else {
      const newLocation = {
        ...formData,
        id: Date.now()
      };
      setLocations(prev => [...prev, newLocation]);
    }
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accomodation Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>+</span>
          Add Accomodation
        </button>
      </div>

      <LocationTable 
        locations={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <LocationModal
          location={editingLocation}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Location;