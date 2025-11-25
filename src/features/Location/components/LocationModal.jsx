import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationModal = ({ location, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: location?.name || "",
    lat: location?.lat || -6.914744,
    long: location?.long || 107.60981,
    price: location?.price || "",
  });
  const [showMap, setShowMap] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoordinateClick = () => {
    setShowMap(true);
  };

  const handleMapClick = (lat, long) => {
    setFormData((prev) => ({
      ...prev,
      lat: lat,
      long: long,
    }));
    setShowMap(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      lat: parseFloat(formData.lat),
      long: parseFloat(formData.long),
      price: parseInt(formData.price.replace(/\./g, "")),
    };
    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {location ? "Edit Accomodation" : "Add New Accomodation"}
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
                placeholder="Wisata 1"
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
                {formData.lat && formData.long ? (
                  <div className="text-sm">
                    <div>Lat: {formData.lat}</div>
                    <div>Long: {formData.long}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Click to change location
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    Click to select location on map
                  </div>
                )}
              </div>
            </div>

            {showMap && (
              <MapPicker
                lat={formData.lat}
                long={formData.long}
                onMapClick={handleMapClick}
                onClose={() => setShowMap(false)}
              />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="100000"
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
                {location ? "Update" : "Create"}
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
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Select Location on Map</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Click anywhere on the map to select location
          </p>
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

        <div className="p-4 border-t">
          <div className="text-sm">
            <div>Selected Coordinates:</div>
            <div className="font-mono">
              Lat: {position[0].toFixed(6)}, Long: {position[1].toFixed(6)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
