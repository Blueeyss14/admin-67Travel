import { useState } from 'react';

const VehicleModal = ({ vehicle, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    img: vehicle?.img || null,
    name: vehicle?.name || "",
    price: vehicle?.price || "",
    maxPassenger: vehicle?.maxPassenger || ""
  });
  const [imagePreview, setImagePreview] = useState(vehicle?.img || "");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, img: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseInt(formData.price),
      maxPassenger: parseInt(formData.maxPassenger)
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Image
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-gray-300 rounded"
                    required={!vehicle}
                  />
                </div>
                {imagePreview && (
                  <div className="w-20 h-16 border rounded overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload image of the vehicle
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nissan GTR"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="200000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Passenger
              </label>
              <input
                type="number"
                name="maxPassenger"
                value={formData.maxPassenger}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="4"
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                {vehicle ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;