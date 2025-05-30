import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import axios from "../../services/api";
import { toast } from "react-hot-toast";
import AuthForm from "./AuthForm";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false); // Toggle OTP input
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // Store email for OTP verification
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      toast.success(response.data.message); // "OTP sent to your email."
      setEmail(formData.email); // Store email for OTP verification
      setShowOTP(true); // Show OTP input
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/verify-login-otp", {
        email,
        otp,
      });
      const { token, user } = response.data;
      login(token, user);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("OTP verification error:", error.response || error.message);
      toast.error(error.response?.data?.message || "OTP verification failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="auth-card w-full max-w-md">
        {!showOTP ? (
          <>
            <AuthForm
              title="Log In"
              buttonText="Log In"
              onSubmit={handleLogin}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              PasswordIcon={showPassword ? EyeOff : Eye}
            />
            <p className="mt-4 text-center text-rose-900">
              Don't have an account?{" "}
              <Link to="/signup" className="text-rose-600 hover:underline">
                Sign up
              </Link>
            </p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-rose-900 mb-6">
              Enter OTP
            </h2>
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
              <button type="submit" className="auth-button">
                Verify OTP
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}