import { useState } from "react";
import { config } from "../../../config/config";
import toast from "react-hot-toast";

export const useAddVehicle = (vehicle, onSubmit, onClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: vehicle?.name || "",
    price: vehicle?.price || "",
    maxPassenger: vehicle?.maxPassenger || "",
    thumbnail: vehicle?.thumbnail || null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(
    // vehicle?.thumbnailUrl
    //   ? `${config.api.replace("/api", "")}/storage/${vehicle.thumbnailUrl}`
    //   : ""
    vehicle?.thumbnailUrl ? vehicle.thumbnailUrl : ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    const payload = new FormData();
    if (vehicle) payload.append("_method", "PUT");
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("maxPassenger", formData.maxPassenger);
    if (formData.thumbnail instanceof File) {
      payload.append("thumbnailUrl", formData.thumbnail);
    }

    try {
      const url = vehicle
        ? `${config.api}/vehicles/${vehicle.id}`
        : `${config.api}/vehicles`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      toast.success(vehicle ? "berhasil diupdate" : "berhasil ditambahkan");

      if (!res.ok) throw new Error("Failed to submit vehicle");

      onSubmit();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit vehicle");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    thumbnailPreview,
    handleInputChange,
    handleThumbnailUpload,
    handleSubmit,
    isLoading
  };
};