import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  Mail,
  Shield,
  User,
  Building2,
  Info,
  ArrowRight,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const JoinCommunity = ({ onSuccessfulRegister }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    trigger,
    setValue,
  } = useForm();

  // Email OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState("");

  // Phone OTP states
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [phoneOtp, setPhoneOtp] = useState("");

  // General states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const watchEmail = watch("email");
  const watchName = watch("name");
  const watchPhone = watch("phone_number");
  const watchWhatsApp = watch("whatsapp_number");
  const watchLinkedIn = watch("linkedin_profile");
  const watchWhereDidYouHear = watch("where_did_you_hear_about_us");
  const watchWhyJoin = watch("why_you_want_to_join");

  // Tab order
  const tabs = ["personal", "company", "additional"];
  const currentTabIndex = tabs.indexOf(activeTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === tabs.length - 1;

  // Function to count words
  const countWords = (text) => {
    if (!text) return 0;
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Email OTP handlers
  const handleSendOtp = async () => {
    if (!watchName || !watchEmail) {
      setErrorMessage("Please provide both name and email.");
      return;
    }

    setErrorMessage("");
    setIsSendingOtp(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/registered-user/verify-email/initiate`,
        {
          name: watchName,
          email: watchEmail,
        }
      );

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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/registered-user/verify-email/verify`,
        {
          email: watchEmail,
          otp,
        }
      );

      setOtpVerified(true);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.detail || "OTP verification failed.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Phone OTP handlers
  const handleSendPhoneOtp = async () => {
    if (!watchPhone) {
      setErrorMessage("Please provide a phone number.");
      return;
    }

    setErrorMessage("");
    setIsSendingPhoneOtp(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/registered-user/verify-phone/initiate`,
        {
          email: watchEmail,
          phone: watchPhone,
        }
      );

      setPhoneOtpSent(true);
      setPhoneCountdown(60);
      const timer = setInterval(() => {
        setPhoneCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.detail || "Failed to send phone OTP.");
    } finally {
      setIsSendingPhoneOtp(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (!phoneOtp || phoneOtp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit phone OTP.");
      return;
    }

    setIsVerifyingPhoneOtp(true);
    setErrorMessage("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/registered-user/verify-phone/verify`,
        {
          phone: watchPhone,
          otp: phoneOtp,
        }
      );

      setPhoneOtpVerified(true);
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.detail || "Phone OTP verification failed.");
    } finally {
      setIsVerifyingPhoneOtp(false);
    }
  };

  const onSubmit = async (data) => {
    if (!otpVerified) {
      setErrorMessage("Please verify your email with OTP before continuing.");
      return;
    }

    if (!phoneOtpVerified) {
      setErrorMessage("Please verify your phone number with OTP before continuing.");
      return;
    }

    // Validate word count before submission
    const wordCount = countWords(data.why_you_want_to_join);
    if (wordCount < 20) {
      setErrorMessage(`Please write at least 20 words explaining why you want to join. Current: ${wordCount} words`);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Prepare payload with correct field names matching backend
      const payload = {
        email: data.email,
        otp: otp,
        name: data.name,
        phone_number: data.phone_number,
        whatsapp_number: data.whatsapp_number,
        linkedin_profile: data.linkedin_profile,
        company_name: data.company_name || null,
        role: data.role || null,
        company_website: data.company_website || null,
        where_did_you_hear_about_us: showOtherInput 
          ? data.where_did_you_hear_about_us_other 
          : data.where_did_you_hear_about_us,
        why_you_want_to_join: data.why_you_want_to_join,
      };

      console.log("Submitting payload:", payload);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/registered-user/verify-email/confirm`,
        payload
      );

      console.log("Registration successful:", response.data);
      setShowSuccessPopup(true);
      resetFormState();
    } catch (err) {
      console.error("Registration error:", err);
      const errorDetail = err.response?.data?.detail;
      
      // Handle different error formats
      if (typeof errorDetail === 'string') {
        setErrorMessage(errorDetail);
      } else if (Array.isArray(errorDetail)) {
        // FastAPI validation errors
        const errors = errorDetail.map(e => `${e.loc.join('.')}: ${e.msg}`).join('; ');
        setErrorMessage(errors);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
    setCountdown(0);
    setPhoneOtpSent(false);
    setPhoneOtpVerified(false);
    setPhoneOtp("");
    setPhoneCountdown(0);
    setErrorMessage("");
    setShowOtherInput(false);
    setActiveTab("personal");
    reset();
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    onSuccessfulRegister?.();
  };

  // Navigate to next tab with validation
  const handleNext = async () => {
    let isValid = true;

    // Validate current tab fields before moving forward
    if (activeTab === "personal") {
      if (!otpVerified) {
        setErrorMessage("Please verify your email with OTP before proceeding.");
        return;
      }
      if (!phoneOtpVerified) {
        setErrorMessage("Please verify your phone number with OTP before proceeding.");
        return;
      }
      isValid = await trigger([
        "name",
        "email",
        "phone_number",
        "whatsapp_number",
        "linkedin_profile",
      ]);
    } else if (activeTab === "company") {
      isValid = await trigger(["company_name", "role", "company_website"]);
    }

    if (isValid && !isLastTab) {
      setErrorMessage("");
      setActiveTab(tabs[currentTabIndex + 1]);
    }
  };

  // Navigate to previous tab
  const handlePrevious = () => {
    if (!isFirstTab) {
      setErrorMessage("");
      setActiveTab(tabs[currentTabIndex - 1]);
    }
  };

  // Handle dropdown change
  const handleWhereDidYouHearChange = (value) => {
    setValue("where_did_you_hear_about_us", value);
    if (value === "others") {
      setShowOtherInput(true);
      setValue("where_did_you_hear_about_us_other", "");
    } else {
      setShowOtherInput(false);
      setValue("where_did_you_hear_about_us_other", "");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white">
        <CardHeader className="text-center space-y-3 pb-8 bg-brand_orange text-white rounded-t-lg">
          <CardTitle className="text-2xl font-light">Join Community</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 p-8">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Personal Information
                </TabsTrigger>
                <TabsTrigger
                  value="company"
                  disabled={!otpVerified || !phoneOtpVerified}
                  className="flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  Company Details
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  disabled={!otpVerified || !phoneOtpVerified}
                  className="flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Additional Information
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="name"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your full name"
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={otpVerified}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email / Login ID */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      Email ID / Login ID{" "}
                      <span className="text-red-500">*</span>
                    </Label>
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
                        className="h-10 flex-1 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                        disabled={otpSent}
                        placeholder="your.email@example.com"
                      />
                      {!otpSent && (
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || !watchName || !watchEmail}
                          className="h-10 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                        >
                          {isSendingOtp ? "Sending..." : "Verify Email"}
                        </Button>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Email OTP Field - Only show if OTP sent but not verified */}
                  {otpSent && !otpVerified && (
                    <div className="space-y-1 md:col-span-2">
                      <div className="flex items-center gap-3">
                        <Label
                          htmlFor="otp"
                          className="text-slate-700 font-medium"
                        >
                          Enter Email OTP
                        </Label>
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-700 border border-amber-200 text-xs px-2 py-1 rounded-full"
                        >
                          Pending
                        </Badge>
                      </div>
                      <div className="flex gap-2 max-w-md">
                        <Input
                          id="otp"
                          value={otp}
                          onChange={(e) =>
                            setOtp(
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            )
                          }
                          placeholder="000000"
                          maxLength={6}
                          className="h-10 text-center tracking-widest text-lg font-mono border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={otp.length !== 6 || isVerifyingOtp}
                          className="h-10 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-medium transition-all duration-200"
                        >
                          {isVerifyingOtp ? "..." : "Verify"}
                        </Button>
                      </div>

                      {/* Resend functionality */}
                      <div className="text-sm text-slate-600">
                        {countdown > 0 ? (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Resend in {countdown}s
                          </span>
                        ) : (
                          <Button
                            type="button"
                            onClick={handleSendOtp}
                            variant="link"
                            disabled={isSendingOtp}
                            className="h-auto p-0 text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {isSendingOtp ? "Resending..." : "Resend OTP"}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email verified notification */}
                  {otpVerified && (
                    <div className="md:col-span-2 flex items-center gap-3 text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>
                        Email <strong>{watchEmail}</strong> has been successfully verified
                      </span>
                    </div>
                  )}

                  {/* Phone Number with Verification - NOW REQUIRED */}
                  <div className="space-y-1 md:col-span-2">
                    <Label
                      htmlFor="phone_number"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone_number"
                        {...register("phone_number", {
                          required: "Phone number is required",
                        })}
                        className="h-10 flex-1 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                        disabled={!otpVerified || phoneOtpSent}
                        placeholder="+91 9876543210"
                      />
                      {otpVerified && !phoneOtpSent && watchPhone && (
                        <Button
                          type="button"
                          onClick={handleSendPhoneOtp}
                          disabled={isSendingPhoneOtp}
                          className="h-10 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                        >
                          {isSendingPhoneOtp ? "Sending..." : "Verify Phone"}
                        </Button>
                      )}
                    </div>
                    {errors.phone_number && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  {/* Phone OTP Field - Only show if OTP sent but not verified */}
                  {phoneOtpSent && !phoneOtpVerified && (
                    <div className="space-y-1 md:col-span-2">
                      <div className="flex items-center gap-3">
                        <Label
                          htmlFor="phone_otp"
                          className="text-slate-700 font-medium"
                        >
                          Enter Phone OTP
                        </Label>
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-700 border border-amber-200 text-xs px-2 py-1 rounded-full"
                        >
                          Pending
                        </Badge>
                      </div>
                      <div className="flex gap-2 max-w-md">
                        <Input
                          id="phone_otp"
                          value={phoneOtp}
                          onChange={(e) =>
                            setPhoneOtp(
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            )
                          }
                          placeholder="000000"
                          maxLength={6}
                          className="h-10 text-center tracking-widest text-lg font-mono border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyPhoneOtp}
                          disabled={phoneOtp.length !== 6 || isVerifyingPhoneOtp}
                          className="h-10 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-medium transition-all duration-200"
                        >
                          {isVerifyingPhoneOtp ? "..." : "Verify"}
                        </Button>
                      </div>

                      {/* Resend phone OTP */}
                      <div className="text-sm text-slate-600">
                        {phoneCountdown > 0 ? (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Resend in {phoneCountdown}s
                          </span>
                        ) : (
                          <Button
                            type="button"
                            onClick={handleSendPhoneOtp}
                            variant="link"
                            disabled={isSendingPhoneOtp}
                            className="h-auto p-0 text-sm text-purple-600 hover:text-purple-700 font-medium"
                          >
                            {isSendingPhoneOtp ? "Resending..." : "Resend Phone OTP"}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Phone verified notification */}
                  {phoneOtpVerified && (
                    <div className="md:col-span-2 flex items-center gap-3 text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-xl">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>
                        Phone number <strong>{watchPhone}</strong> has been successfully verified
                      </span>
                    </div>
                  )}

                  {/* WhatsApp Number - NOW REQUIRED */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="whatsapp_number"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      WhatsApp Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="whatsapp_number"
                      {...register("whatsapp_number", {
                        required: "WhatsApp number is required",
                      })}
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={!otpVerified}
                      placeholder="+91 9876543210"
                    />
                    {errors.whatsapp_number && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {errors.whatsapp_number.message}
                      </p>
                    )}
                  </div>

                  {/* LinkedIn Profile - NOW REQUIRED */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="linkedin_profile"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      LinkedIn Profile URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="linkedin_profile"
                      {...register("linkedin_profile", {
                        required: "LinkedIn profile is required",
                        pattern: {
                          value:
                            /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|public-profile\/in)\/[a-zA-Z0-9_-]{3,100}\/?$/i,
                          message:
                            "Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/yourname)",
                        },
                      })}
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={!otpVerified}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                    {errors.linkedin_profile && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {errors.linkedin_profile.message}
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Company Details Tab */}
              <TabsContent value="company" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="company_name"
                      className="text-slate-700 font-medium"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company_name"
                      {...register("company_name")}
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={!otpVerified || !phoneOtpVerified}
                      placeholder="Your Company Name"
                    />
                  </div>

                  {/* Role/Designation */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="role"
                      className="text-slate-700 font-medium"
                    >
                      Role/Designation
                    </Label>
                    <Input
                      id="role"
                      {...register("role")}
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={!otpVerified || !phoneOtpVerified}
                      placeholder="HR Manager, VP HR, etc."
                    />
                  </div>

                  {/* Company Website */}
                  <div className="space-y-1 md:col-span-2">
                    <Label
                      htmlFor="company_website"
                      className="text-slate-700 font-medium"
                    >
                      Company Website
                    </Label>
                    <Input
                      id="company_website"
                      {...register("company_website")}
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={!otpVerified || !phoneOtpVerified}
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Additional Information Tab */}
              <TabsContent value="additional" className="space-y-4">
                {/* Where did you hear about us */}
                <div className="space-y-1">
                  <Label
                    htmlFor="where_did_you_hear_about_us"
                    className="text-slate-700 font-medium flex items-center gap-2"
                  >
                    Where did you hear about us?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={handleWhereDidYouHearChange}
                    disabled={!otpVerified || !phoneOtpVerified}
                    value={watchWhereDidYouHear}
                  >
                    <SelectTrigger className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register("where_did_you_hear_about_us", {
                      required:
                        "Please tell us where you heard about us",
                    })}
                  />
                  {errors.where_did_you_hear_about_us && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      {errors.where_did_you_hear_about_us.message}
                    </p>
                  )}
                </div>

                {/* Others input */}
                {showOtherInput && (
                  <div className="space-y-1">
                    <Label
                      htmlFor="where_did_you_hear_about_us_other"
                      className="text-slate-700 font-medium flex items-center gap-2"
                    >
                      Please specify <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="where_did_you_hear_about_us_other"
                      {...register("where_did_you_hear_about_us_other", {
                        required: showOtherInput
                          ? "Please specify where you heard about us"
                          : false,
                      })}
                      className="h-10 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50"
                      disabled={!otpVerified || !phoneOtpVerified}
                      placeholder="Please specify..."
                    />
                    {errors.where_did_you_hear_about_us_other && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                        {errors.where_did_you_hear_about_us_other.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Why do you want to join */}
                <div className="space-y-1">
                  <Label
                    htmlFor="why_you_want_to_join"
                    className="text-slate-700 font-medium flex items-center gap-2"
                  >
                    Why do you want to join this community?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="why_you_want_to_join"
                    {...register("why_you_want_to_join", {
                      required:
                        "Please explain why you want to join this community",
                      validate: {
                        minWords: (value) => {
                          const wordCount = countWords(value);
                          if (wordCount < 20) {
                            return `Please write at least 20 words. Current: ${wordCount} words`;
                          }
                          return true;
                        },
                      },
                    })}
                    placeholder="Please tell us about your motivation to join this community, what you hope to achieve, how you plan to contribute, and what value you believe you can add to the community..."
                    rows={8}
                    className="w-full border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl bg-slate-50/50 p-3 text-sm resize-y min-h-[150px] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!otpVerified || !phoneOtpVerified}
                  />
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>
                      {watchWhyJoin ? countWords(watchWhyJoin) : 0} / 20 words
                      minimum
                    </span>
                    <span
                      className={
                        countWords(watchWhyJoin || "") >= 20
                          ? "text-green-600 font-medium"
                          : "text-slate-400"
                      }
                    >
                      {countWords(watchWhyJoin || "") >= 20
                        ? "✓ Requirement met"
                        : ""}
                    </span>
                  </div>
                  {errors.why_you_want_to_join && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      {errors.why_you_want_to_join.message}
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 gap-4">
              {/* Previous Button */}
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={isFirstTab}
                variant="outline"
                className="h-12 px-6 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              {/* Next/Submit Button */}
              {isLastTab ? (
                <Button
                  type="submit"
                  className="h-12 px-6 text-lg font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={!otpVerified || !phoneOtpVerified || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin mr-3" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-3" />
                      Submit Registration
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!otpVerified || !phoneOtpVerified}
                  className="h-12 px-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in fade-in duration-300">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Thank you for your interest! Our team will contact you soon.
              </p>

              <Button
                onClick={closeSuccessPopup}
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] mt-6"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinCommunity;
