import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAddAccommodation } from "../hook/useAddAccommodation";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const AccommodationModal = ({ accommodation, onSubmit, onClose }) => {
  const {
    formData,
    thumbnailPreview,
    handleInputChange,
    handleThumbnailUpload,
    handleSubmit,
  } = useAddAccommodation(accommodation, onSubmit, onClose);

  const [showMap, setShowMap] = useState(false);

  const handleCoordinateClick = () => setShowMap(true);
  const handleMapClick = (lat, long) => {
    handleInputChange({ target: { name: "latitude", value: lat } });
    handleInputChange({ target: { name: "longitude", value: long } });
    setShowMap(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {accommodation ? "Edit Accommodation" : "Add New Accommodation"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coordinates
              </label>
              <div
                onClick={handleCoordinateClick}
                className="w-full p-3 border border-gray-300 rounded bg-gray-50 cursor-pointer hover:bg-gray-100 text-center"
              >
                <div className="text-sm">
                  <div>Lat: {formData.latitude}</div>
                  <div>Long: {formData.longitude}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Click to change location
                  </div>
                </div>
              </div>
            </div>

            {showMap && (
              <MapPicker
                lat={formData.latitude}
                long={formData.longitude}
                onMapClick={handleMapClick}
                onClose={() => setShowMap(false)}
              />
            )}

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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail
              </label>
              {/* <input type="file" accept="image/*" onChange={handleThumbnailUpload} /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {thumbnailPreview && (
                <div className="w-20 h-20 mt-2 border rounded overflow-hidden">
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
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
                {accommodation ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const MapPicker = ({ lat, long, onMapClick, onClose }) => {
  const [position, setPosition] = useState([lat, long]);

  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onMapClick(lat, lng);
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-96">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">Select Location on Map</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <MapContainer
          center={[lat, long]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
        </MapContainer>

        <div className="p-4 border-t text-sm">
          <div>Selected Coordinates:</div>
          <div className="font-mono">
            Lat: {position[0].toFixed(6)}, Long: {position[1].toFixed(6)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationModal;
