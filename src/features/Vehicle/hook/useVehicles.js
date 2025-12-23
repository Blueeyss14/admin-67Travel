import { useState, useEffect, useCallback } from "react";
import { config } from "../../../config/config";
import toast from "react-hot-toast";


export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const token = localStorage.getItem("admin_token");

  const fetchVehicles = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${config.api}/vehicles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch vehicles");
      const data = await res.json();
      setVehicles(data.content || []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const deleteVehicle = async (id) => {
    if (!token || !window.confirm("Are you sure want to delete?")) return;
    try {
      const res = await fetch(`${config.api}/vehicles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("berhasil dihapus");

      if (!res.ok) throw new Error("Failed to delete vehicle");
      setVehicles((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const submitVehicle = async (formData, editingVehicle = null) => {
    if (!token) return;
    try {
      const payload = new FormData();
      if (editingVehicle) payload.append("_method", "PUT");
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("maxPassenger", formData.maxPassenger);
      if (formData.thumbnail instanceof File) payload.append("thumbnail", formData.thumbnail);

      const url = editingVehicle
        ? `${config.api}/vehicles/${editingVehicle.id}`
        : `${config.api}/vehicles`;

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      if (!res.ok) throw new Error("Failed to submit vehicle");
      await fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, fetchVehicles, deleteVehicle, submitVehicle };
};
