import { useState, useEffect, useCallback } from "react";
import { config } from "../../../config/config";

export const useAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const token = localStorage.getItem("admin_token");

  const fetchAccommodations = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${config.api}/accommodations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch accommodations");
      const data = await res.json();
      setAccommodations(data.content || []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const deleteAccommodation = async (id) => {
    if (!token || !window.confirm("Are you sure want to delete?")) return;
    try {
      const res = await fetch(`${config.api}/accommodations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete accommodation");
      setAccommodations((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const submitAccommodation = async (formData, editingAccommodation = null) => {
    if (!token) return;
    try {
      const payload = new FormData();
      if (editingAccommodation) payload.append("_method", "PUT");
      payload.append("name", formData.name);
      payload.append("latitude", formData.latitude);
      payload.append("longitude", formData.longitude);
      payload.append("price", formData.price);
      if (formData.thumbnail instanceof File) payload.append("thumbnail", formData.thumbnail);

      const url = editingAccommodation
        ? `${config.api}/accommodations/${editingAccommodation.id}`
        : `${config.api}/accommodations`;

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      if (!res.ok) throw new Error("Failed to submit accommodation");
      await fetchAccommodations();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccommodations();
  }, [fetchAccommodations]);

  return { accommodations, fetchAccommodations, deleteAccommodation, submitAccommodation };
};
