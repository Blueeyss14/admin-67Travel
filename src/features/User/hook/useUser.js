import { useState, useEffect, useCallback } from "react";
import { config } from "../../../config/config";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("admin_token");

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${config.api}/user/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure want to delete?")) return;
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${config.api}/user/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async (userId, payload) => {
    if (!token) return;
    try {
      const formData = new FormData();
      formData.append("nama", payload.name);
      formData.append("email", payload.email);
      formData.append("password", payload.password || "");
      formData.append("_method", "PUT");

      const res = await fetch(`${config.api}/user/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update user");
      await fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, fetchUsers, deleteUser, updateUser };
};
