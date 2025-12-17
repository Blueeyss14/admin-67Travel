import { useState } from "react";
import AccommodationModal from "../components/AccommodationModal";
import AccommodationTable from "../components/AccommodationTable";
import { useAccommodations } from "../hook/useAccommodation";

const Accommodation = () => {
  const { accommodations, deleteAccommodation, submitAccommodation } = useAccommodations();
  const [showModal, setShowModal] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState(null);

  const handleAdd = () => {
    setEditingAccommodation(null);
    setShowModal(true);
  };

  const handleEdit = (accommodation) => {
    setEditingAccommodation(accommodation);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    await submitAccommodation(formData, editingAccommodation);
    setShowModal(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Accommodation Management</h1>
        <button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>+</span> Add Accommodation
        </button>
      </div>

      <AccommodationTable
        accommodations={accommodations}
        onEdit={handleEdit}
        onDelete={deleteAccommodation}
      />

      {showModal && (
        <AccommodationModal
          accommodation={editingAccommodation}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Accommodation;
