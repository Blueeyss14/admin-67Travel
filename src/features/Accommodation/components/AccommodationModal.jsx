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
    isLoading
  } = useAddAccommodation(accommodation, onSubmit, onClose);

  const [showMap, setShowMap] = useState(false);

  const handleCoordinateClick = () => setShowMap(true);
  const handleMapClick = (lat, long) => {
    handleInputChange({ target: { name: "latitude", value: lat } });
    handleInputChange({ target: { name: "longitude", value: long } });
    setShowMap(false);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-[10px] flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
      >
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {accommodation ? "Edit Accommodation" : "Add New Accommodation"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Tambah akomodasi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Ex: Hotel"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Coordinates
              </label>
              <div
                onClick={handleCoordinateClick}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="text-sm text-gray-700">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Latitude:</span>
                    <span className="font-mono">{formData.latitude}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Longitude:</span>
                    <span className="font-mono">{formData.longitude}</span>
                  </div>
                  <div className="text-xs text-blue-600 font-medium text-center mt-2">
                    Pilih kordinat
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
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Rp. 
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Thumbnail
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer outline-none"
                />
                {thumbnailPreview && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50 border-b">
                      <span className="text-sm font-medium text-gray-700">
                        Preview
                      </span>
                    </div>
                    <img
                      src={thumbnailPreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 py-3 px-4 ${!isLoading ? 'bg-blue-600 text-white  hover:bg-blue-700' : 'bg-blue-600/80 text-white/80 ' }  transition-colors shadow-sm font-medium rounded-lg`}
              >
                {isLoading ? "Memproses..." : accommodation ? "Update" : "Create"}
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60 p-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden"
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Select Location on Map
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Click on the map to choose coordinates
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
          >
            <span className="text-xl text-gray-500">×</span>
          </button>
        </div>

        <div className="relative">
          <MapContainer
            center={[lat, long]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
          </MapContainer>
        </div>

        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="font-medium text-gray-800">Selected Coordinates</span>
          </div>
          <div className="font-mono text-lg bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex gap-6">
              <div>
                <span className="text-gray-500 text-sm">Latitude:</span>
                <span className="ml-2 text-gray-900">
                  {position[0].toFixed(6)}
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Longitude:</span>
                <span className="ml-2 text-gray-900">
                  {position[1].toFixed(6)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Click "Confirm" in the main form to save these coordinates
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationModal;