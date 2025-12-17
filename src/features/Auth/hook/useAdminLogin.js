import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config/config";

const useAdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!formData.email || !formData.password) {
      setLoginError("Email dan password harus diisi!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${config.api}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("admin_token", data.data.token);
        localStorage.setItem("admin_info", JSON.stringify(data.data.admin));
        navigate("/admin-navigation", {replace : true});
      } else {
        setLoginError(data.message || "Login gagal!");
      }
    } catch {
      setLoginError("Terjadi kesalahan, coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, loginError };
};

export default useAdminLogin;
