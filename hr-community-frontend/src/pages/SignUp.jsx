import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SignUp = ({ onSuccessfulRegister }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState("");

  const watchEmail = watch("email");
  const watchName = watch("name");

  const handleSendOtp = async () => {
    if (!watchName || !watchEmail) {
      setErrorMessage("Please provide both name and email.");
      return;
    }

    setErrorMessage("");
    setIsSendingOtp(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-email/initiate`, {
        name: watchName,
        email: watchEmail,
      });

      setOtpSent(true);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.detail || "Failed to send OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifyingOtp(true);
    setErrorMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/verify`, {
        email: watchEmail,
        otp,
      });

      setOtpVerified(true);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.detail || "OTP verification failed.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const onSubmit = async (data) => {
    if (!otpVerified) {
      setErrorMessage("Please verify OTP before continuing.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    let fullAddress = data.lane1;
    if (data.lane2) fullAddress += `, ${data.lane2}`;
    fullAddress += `, ${data.city}, ${data.state} - ${data.pin}`;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-email/confirm`, {
        email: data.email,
        otp: otp,
        name: data.name,
        company_name: data.company_name,
        role: data.role,
        phone_number: data.phone_number,
        working_address: fullAddress,
        company_website: data.company_website,
        personal_email: data.personal_email,
        official_number: data.official_number,
        whatsapp_number: data.whatsapp_number,
      });

      alert("Registered successfully!");
      onSuccessfulRegister?.();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.detail || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-none border-0">
      <CardHeader className="text-center space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-base">
          Join the HR Leadership Awards
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information - Always Enabled */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                className="h-9"
                disabled={otpVerified}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email field - Dynamic width based on OTP state */}
            <div className={`space-y-1 ${otpSent ? '' : 'md:col-span-2 lg:col-span-2'}`}>
              <Label htmlFor="email">Corporate Email *</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="h-9 flex-1"
                  disabled={otpSent}
                  placeholder="your.email@company.com"
                />
                {!otpSent && (
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || !watchName || !watchEmail}
                    className="h-9 px-4 whitespace-nowrap"
                  >
                    {isSendingOtp ? "Sending..." : "Verify"}
                  </Button>
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* OTP Field - Shows after verify is clicked, takes remaining space */}
            {otpSent && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Badge variant={otpVerified ? "default" : "secondary"} className="text-xs">
                    {otpVerified ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </>
                    ) : (
                      "Pending"
                    )}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="000000"
                    maxLength={6}
                    className="h-9 text-center tracking-widest"
                    disabled={otpVerified}
                  />
                  {!otpVerified && (
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6 || isVerifyingOtp}
                      className="h-9 px-3 whitespace-nowrap"
                    >
                      {isVerifyingOtp ? "..." : "Submit"}
                    </Button>
                  )}
                </div>
                
                {/* Resend functionality */}
                {!otpVerified && (
                  <div className="text-xs text-gray-600">
                    {countdown > 0 ? (
                      <span>Resend in {countdown}s</span>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSendOtp}
                        variant="link"
                        disabled={isSendingOtp}
                        className="h-auto p-0 text-xs text-blue-600"
                      >
                        {isSendingOtp ? "Resending..." : "Resend OTP"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Email sent notification */}
          {otpSent && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
              <Mail className="w-4 h-4" />
              <span>OTP sent to {watchEmail}</span>
            </div>
          )}

          {/* Other Fields - Disabled until OTP verified */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                {...register("phone_number")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="+91 9876543210"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role">Designation/Role</Label>
              <Input
                id="role"
                {...register("role")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="HR Manager, VP HR, etc."
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                {...register("company_name")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="Your Company Name"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="company_website">Company Website</Label>
              <Input
                id="company_website"
                {...register("company_website")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="https://company.com"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="personal_email">Personal Email</Label>
              <Input
                id="personal_email"
                type="email"
                {...register("personal_email")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="personal@gmail.com"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="official_number">Official Number</Label>
              <Input
                id="official_number"
                {...register("official_number")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="Office landline"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
              <Input
                id="whatsapp_number"
                {...register("whatsapp_number")}
                className="h-9"
                disabled={!otpVerified}
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          {/* Working Address Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-1">Working Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="lane1">Address Line 1 *</Label>
                <Input
                  id="lane1"
                  {...register("lane1", { 
                    required: "Address line 1 is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters long"
                    }
                  })}
                  placeholder="Street, Building, etc."
                  className="h-9"
                  disabled={!otpVerified}
                />
                {errors.lane1 && <p className="text-red-500 text-sm">{errors.lane1.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="lane2">Address Line 2</Label>
                <Input
                  id="lane2"
                  {...register("lane2")}
                  placeholder="Landmark, Area, etc."
                  className="h-9"
                  disabled={!otpVerified}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register("city", { 
                    required: "City is required",
                    minLength: {
                      value: 2,
                      message: "City name must be at least 2 characters long"
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "City name can only contain letters and spaces"
                    }
                  })}
                  placeholder="Enter city"
                  className="h-9"
                  disabled={!otpVerified}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  {...register("state", { 
                    required: "State is required",
                    minLength: {
                      value: 2,
                      message: "State name must be at least 2 characters long"
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "State name can only contain letters and spaces"
                    }
                  })}
                  placeholder="Enter state"
                  className="h-9"
                  disabled={!otpVerified}
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="pin">PIN Code *</Label>
                <Input
                  id="pin"
                  {...register("pin", { 
                    required: "PIN code is required",
                    pattern: {
                      value: /^[1-9][0-9]{5}$/,
                      message: "Enter a valid 6-digit PIN code"
                    }
                  })}
                  placeholder="Enter PIN code"
                  className="h-9"
                  disabled={!otpVerified}
                />
                {errors.pin && <p className="text-red-500 text-sm">{errors.pin.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 text-base font-medium"
            disabled={!otpVerified || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
