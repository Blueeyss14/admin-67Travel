import { useState, useEffect, useCallback } from "react";
import { config } from "../../../config/config";
import toast from "react-hot-toast";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const token = localStorage.getItem("admin_token");

  const fetchDestinations = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${config.api}/destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch destinations");
      const data = await res.json();
      setDestinations(data.content || []);
    } catch (err) {
      console.error("Failed to fetch destinations:", err);
    }
  }, [token]);

  const deleteDestination = async (id) => {
    if (!token) return;
    if (!window.confirm("Are you sure want to delete?")) return;

    try {
      const res = await fetch(`${config.api}/destinations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("berhasil dihapus");
      if (!res.ok) throw new Error("Failed to delete destination");
      setDestinations((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete destination:", err);
    }
  };

  const submitDestination = async (formData, editingDestination = null) => {
    if (!token) return;

    try {
      let url = `${config.api}/destinations`;
      let method = "POST";

      if (editingDestination) {
        url += `/${editingDestination.id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit destination");
      const data = await res.json();

      if (editingDestination) {
        setDestinations((prev) =>
          prev.map((item) => (item.id === editingDestination.id ? data : item))
        );
      } else {
        setDestinations((prev) => [...prev, data]);
      }
    } catch (err) {
      console.error("Failed to submit destination:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return {
    destinations,
    fetchDestinations,
    deleteDestination,
    submitDestination,
  };
};
