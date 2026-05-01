import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { LockKeyhole, FileText } from "lucide-react";
import { Lightbulb } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SignUp from "../pages/SignUp";

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((timer) => timer - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const storeAuthData = (authToken, userInfo = null) => {
    sessionStorage.setItem("authToken", authToken);
    if (userInfo) localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("savedEmail", formData.email);
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/request`, {
        email: formData.email,
      });
      setStep("otp");
      setResendTimer(30);
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login/verify`,
        { email: formData.email, otp: formData.otp }
      );
      const { token, access_token, user, ...userData } = response.data;
      const authToken = token || access_token;
      if (authToken) {
        storeAuthData(authToken, user || userData);
        navigate("/nomination-form");
      } else {
        setError("Login successful but no token received.");
      }
    } catch (error) {
      setError(error.response?.data?.detail || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/request`, {
        email: formData.email,
      });
      setResendTimer(30);
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-y-auto max-h-[90vh]">
          <SignUp onSuccessfulRegister={() => setIsSignUpOpen(false)} />
        </DialogContent>
      </Dialog>
      <div className="flex w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Accent Side Bar */}
        <div className="w-2 bg-gradient-to-b from-cyan-500 to-blue-700" />

        {/* Form and content */}
        <div className="flex-1 flex flex-col py-10 px-8 md:px-12">

          {error && (
            <div className="mb-5 text-sm rounded-md bg-red-100 text-red-600 px-4 py-2 border border-red-200">
              {error}
            </div>
          )}

          {step === "email" ? (
            <>
              <h2 className="font-semibold text-lg mb-2 text-gray-700">
                Sign in with Email
              </h2>

              <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">
                <a
                  href="/sample-nomination.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:underline font-medium"
                >
                  How to fill the nomination form (Sample PDF)
                </a>
                <Lightbulb className="w-6 h-6 text-yellow-700" />
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm mb-1 text-gray-600"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="someone@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    disabled={loading}
                    required
                    className="h-11 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition font-semibold"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
                <p>If you don't have an account, please <span><a href="#" className="text-brand_blue hover:underline font-medium" onClick={() => setIsSignUpOpen(true)}>Register</a></span></p>
              </form>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-lg mb-2 text-gray-700">
                Enter OTP
              </h2>
              <p className="mb-4 text-sm text-gray-500">
                OTP sent to{" "}
                <span className="font-semibold">{formData.email}</span>
              </p>
              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="otp"
                    className="block text-sm mb-1 text-gray-600"
                  >
                    Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit code"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        otp: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    maxLength={6}
                    disabled={loading}
                    required
                    className="h-11 px-3 rounded-md border border-gray-300 text-center text-lg tracking-widest"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={handleResendOtp}
                    disabled={resendLoading || resendTimer > 0}
                    className="text-cyan-700 hover:text-cyan-900"
                  >
                    {resendLoading
                      ? "Resending..."
                      : resendTimer > 0
                        ? `Resend in ${resendTimer}`
                        : "Resend OTP"}
                  </Button>
                  <button
                    type="button"
                    className="rounded px-2 py-1 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setStep("email");
                      setError("");
                      setFormData((prev) => ({ ...prev, otp: "" }));
                      setResendTimer(0);
                    }}
                    disabled={loading}
                  >
                    &larr; Change email
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition font-semibold"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </Button>
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-cyan-700 hover:text-cyan-900"
                    onClick={() => setIsSignUpOpen(true)}
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
