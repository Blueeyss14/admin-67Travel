import { useState } from "react";
import { config } from "../../../config/config";
import toast from "react-hot-toast";

export const useAddAccommodation = (accommodation, onSubmit, onClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: accommodation?.name || "",
    latitude: accommodation?.latitude || -6.914744,
    longitude: accommodation?.longitude || 107.60981,
    price: accommodation?.price || "",
    thumbnail: accommodation?.thumbnail || null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(
    // accommodation?.thumbnail
    //   ? `${config.api.replace("/api", "")}/storage/${accommodation.thumbnail}`
    //   : ""
    accommodation?.thumbnail ? accommodation.thumbnail : ""
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
    if (accommodation) payload.append("_method", "PUT");

    payload.append("name", formData.name);
    payload.append("latitude", formData.latitude);
    payload.append("longitude", formData.longitude);
    payload.append("price", formData.price);
    if (formData.thumbnail instanceof File) {
      payload.append("thumbnail", formData.thumbnail);
    }

    try {
      const url = accommodation
        ? `${config.api}/accommodations/${accommodation.id}`
        : `${config.api}/accommodations`;

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      toast.success(
        accommodation ? "berhasil diupdate" : "berhasil ditambahkan"
      );

      if (!res.ok) throw new Error("Failed to submit accommodation");

      onSubmit();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to submit accommodation");
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
