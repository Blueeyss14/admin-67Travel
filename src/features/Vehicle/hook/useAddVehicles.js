import { useState } from "react";
import { config } from "../../../config/config";

export const useAddVehicle = (vehicle, onSubmit, onClose) => {
  const [formData, setFormData] = useState({
    name: vehicle?.name || "",
    price: vehicle?.price || "",
    maxPassenger: vehicle?.maxPassenger || "",
    thumbnail: vehicle?.thumbnail || null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(
    vehicle?.thumbnailUrl
      ? `${config.api.replace("/api", "")}/storage/${vehicle.thumbnailUrl}`
      : ""
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
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    let payload;

    if (formData.thumbnail instanceof File) {
      payload = new FormData();
      if (vehicle) payload.append("_method", "PUT");
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("maxPassenger", formData.maxPassenger);
      payload.append("thumbnailUrl", formData.thumbnail);
    } else {
      payload = {
        name: formData.name,
        price: formData.price,
        maxPassenger: formData.maxPassenger,
        thumbnailUrl: formData.thumbnail || "",
      };
    }

    try {
      const url = vehicle
        ? `${config.api}/vehicles/${vehicle.id}`
        : `${config.api}/vehicles`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(payload instanceof FormData ? {} : { "Content-Type": "application/json" }),
        },
        body: payload instanceof FormData ? payload : JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit vehicle");

      onSubmit();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit vehicle");
    }
  };

  return {
    formData,
    thumbnailPreview,
    handleInputChange,
    handleThumbnailUpload,
    handleSubmit,
  };
};
