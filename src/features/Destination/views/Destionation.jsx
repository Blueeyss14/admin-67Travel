import { useState } from "react";
import DestinationTable from "../components/table/DestinationTable";
import DestinationModal from "../components/modal/DestionationModal";
import { useDestinations } from "../hook/useDestination";

const Destination = () => {
  const { destinations, deleteDestination, submitDestination } =
    useDestinations();
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
    deleteDestination(id);
  };

  const handleSubmit = async (formData) => {
    await submitDestination(formData, editingDestination);
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Destination Management
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>+</span> Add Destination
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
