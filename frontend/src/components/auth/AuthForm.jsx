import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import axios from "../../services/api";

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  showNameField = false,
  showPassword,
  togglePassword,
  PasswordIcon,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("/auth/google", {
        token: credentialResponse.credential, // Rename credential to token
      });
      const { token, user } = response.data;
      login(token, user);
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Google login failed!");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-rose-900 mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {showNameField && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              required
            />
          </div>
        )}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            required
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
          />
          {PasswordIcon && (
            <PasswordIcon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-400 cursor-pointer"
              onClick={togglePassword}
            />
          )}
        </div>
        <button type="submit" className="auth-button">
          {buttonText}
        </button>
      </form>
      <div className="mt-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  );
}