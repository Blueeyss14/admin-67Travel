import { useState } from "react";
import { config } from "../../../config/config";

export const useAddDestination = (destination, onSubmit, onClose) => {
  const [formData, setFormData] = useState({
    bg: destination?.thumbnailUrl || null,
    location: destination?.location || "",
    label: destination?.name || "",
    owner: destination?.owner || "",
    maxGuest: destination?.maxOfGuest || "",
    price: destination?.price || "",
    facility: destination?.facilities || [],
    imgs: destination?.imageUrls || [],
    description: destination?.description || "",
  });
  const [facilityInput, setFacilityInput] = useState("");
  const [bgPreview, setBgPreview] = useState(
    destination?.thumbnailUrl
      ? `${config.api.replace("/api", "")}/storage/${destination.thumbnailUrl}`
      : ""
  );
  const [additionalPreviews, setAdditionalPreviews] = useState(
    destination?.imageUrls?.map(
      (url) => `${config.api.replace("/api", "")}/storage/${url}`
    ) || []
  );

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, bg: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setBgPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, imgs: [...prev.imgs, ...files] }));

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAdditionalPreviews((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imgs: prev.imgs.filter((_, i) => i !== index),
    }));
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddFacility = () => {
    if (
      facilityInput.trim() &&
      !formData.facility.includes(facilityInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        facility: [...prev.facility, facilityInput.trim()],
      }));
      setFacilityInput("");
    }
  };

  const handleRemoveFacility = (index) => {
    setFormData((prev) => ({
      ...prev,
      facility: prev.facility.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("admin_token");
    if (!token) return;

    const formDataToSend = new FormData();

    if (destination) {
      formDataToSend.append("_method", "PUT");
    }

    formDataToSend.append("name", formData.label);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("owner", formData.owner);
    formDataToSend.append("maxOfGuest", formData.maxGuest);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);

    if (formData.bg instanceof File) {
      formDataToSend.append("thumbnailUrl", formData.bg);
    }

    formData.imgs.forEach((img) => {
      if (img instanceof File) {
        formDataToSend.append("imageUrls[]", img);
      } else if (typeof img === "string") {
        formDataToSend.append("existingImages[]", img);
      }
    });

    formData.facility.forEach((fac) => {
      formDataToSend.append("facilities[]", fac);
    });

    try {
      const url = destination
        ? `${config.api}/destinations/${destination.id}`
        : `${config.api}/destinations`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to submit destination");

      onSubmit();
      onClose();
    } catch (err) {
      console.error("Failed to submit destination:", err);
      alert("Failed to submit destination");
    }
  };

  return {
    formData,
    facilityInput,
    setFacilityInput,
    bgPreview,
    additionalPreviews,
    handleBgUpload,
    handleAdditionalImagesUpload,
    handleRemoveImage,
    handleAddFacility,
    handleRemoveFacility,
    handleInputChange,
    handleSubmit,
  };
};