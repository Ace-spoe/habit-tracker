import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (!res.ok) {
        setErr(response.message);
        return;
      }

      login(response.userData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErr("Unable to connect. Please check your internet connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type = 'email' placeholder="email"
      required
      value = {formData.email}
      onChange = {e => setFormData({ ...formData, email: e.target.value })}  />
       <input 
      type = 'password' placeholder="password" 
      required
      value = {formData.password}
      onChange = {e => setFormData({ ...formData, password: e.target.value })}  />
      <input 
      type = 'submit' value="Login" />
      {err && <p>{err}</p>}
    </form>

    
  );
}

export default Login;