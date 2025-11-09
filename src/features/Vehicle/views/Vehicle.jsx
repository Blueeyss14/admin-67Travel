import { useState } from 'react';
import VehicleTable from '../components/VehicleTable';
import VehicleModal from '../components/VehicleModal';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleAdd = () => {
    setEditingVehicle(null);
    setShowModal(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this vehicle?")) {
      setVehicles(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (formData) => {
    if (editingVehicle) {
      setVehicles(prev => 
        prev.map(item => 
          item.id === editingVehicle.id 
            ? { ...formData, id: editingVehicle.id }
            : item
        )
      );
    } else {
      const newVehicle = {
        ...formData,
        id: Date.now()
      };
      setVehicles(prev => [...prev, newVehicle]);
    }
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Management</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>+</span>
          Add Vehicle
        </button>
      </div>

      <VehicleTable 
        vehicles={vehicles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <VehicleModal
          vehicle={editingVehicle}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Vehicle;