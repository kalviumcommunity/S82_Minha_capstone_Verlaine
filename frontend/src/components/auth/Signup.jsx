import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import axios from "../../services/api";
import { toast } from "react-hot-toast";
import AuthForm from "./AuthForm";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post("/auth/signup", {
        username: formData.name, // Map name to username
        email: formData.email,
        password: formData.password,
        role: "user", // Optional, defaults to "user" in backend
      });
      const { token, user } = response.data;
      login(token, user);
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="auth-card w-full max-w-md">
        <AuthForm
          title="Create an Account"
          buttonText="Sign Up"
          onSubmit={handleSignup}
          showNameField={true}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
          PasswordIcon={showPassword ? EyeOff : Eye}
        />
        <p className="mt-4 text-center text-rose-900">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}