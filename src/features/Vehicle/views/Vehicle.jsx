import { useState } from "react";
import VehicleModal from "../components/VehicleModal";
import VehicleTable from "../components/VehicleTable";
import { useVehicles } from "../hook/useVehicles";

const Vehicle = () => {
  const { vehicles, deleteVehicle, submitVehicle } = useVehicles();
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

  const handleSubmit = async (formData) => {
    await submitVehicle(formData, editingVehicle);
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
          <span>+</span> Add Vehicle
        </button>
      </div>

      <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={deleteVehicle} />

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
