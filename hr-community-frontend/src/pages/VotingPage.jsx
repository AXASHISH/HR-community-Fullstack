import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Step Indicator Component
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, name: "Candidate", active: currentStep === "candidate" },
    { number: 2, name: "Verify", active: currentStep === "verify" },
    { number: 3, name: "Details", active: currentStep === "details" },
    { number: 4, name: "Declaration", active: currentStep === "declare" },
    { number: 5, name: "Success", active: currentStep === "success" },
  ];

  return (
    <div className="flex justify-center my-6">
      <div className="flex items-center space-x-3">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step.active
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500"
                }`}
            >
              {step.active && step.number !== 1 ? "✓" : step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="w-12 h-0.5 bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Header Component
const Header = () => (
  <div className="bg-blue-600 text-white rounded-t-lg shadow-lg border border-blue-700">
    <div className="p-6 text-center">
      <div className="inline-flex items-center mb-3">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold">VOTING PORTAL</h1>
          <p className="text-sm opacity-90">
            Secure • Transparent • Democratic
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Loading Component
const LoadingComponent = () => (
  <div className="p-8 bg-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading nomination details...</p>
    </div>
  </div>
);

// Error Component
const ErrorComponent = ({ message, onRetry }) => (
  <div className="p-8 bg-white">
    <div className="text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-red-600 mb-2">Error</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Candidate Card Component
const CandidateCard = ({ nomination, onStartVerification, isVotingActive }) => {
  const getFormattedProfileImage = (profileImage) => {
    const defaultImage =
      "https://images.unsplash.com/photo-1494790108755-2616c27b131c?w=300&h=300&fit=crop&crop=face";

    if (!profileImage) {
      return defaultImage;
    }

    if (
      profileImage.startsWith("http://") ||
      profileImage.startsWith("https://")
    ) {
      return profileImage;
    }

    if (typeof profileImage === "string" && profileImage.length > 100) {
      if (profileImage.startsWith("data:image")) {
        return profileImage;
      }
      return `data:image/png;base64,${profileImage}`;
    }

    return defaultImage;
  };

  return (
    <div className="p-8 bg-white">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <img
            src={getFormattedProfileImage(nomination.profile_image)}
            alt={nomination.leader_name}
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-400 shadow-lg"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1494790108755-2616c27b131c?w=300&h=300&fit=crop&crop=face";
            }}
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 shadow-md border mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            {nomination.leader_name}
          </h2>
          <div className="w-16 h-0.5 bg-orange-400 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600 mb-3">Nominated for:</p>
          <div className="bg-blue-50 p-3 rounded-lg border">
            <p className="text-sm font-semibold text-blue-800">
              {nomination.category_name}
            </p>
          </div>

          {nomination.about_yourself && (
            <div className="mt-4 text-left">
              <p className="text-xs font-bold text-gray-600 mb-2">About:</p>
              <p className="text-sm text-gray-700">{nomination.about_yourself}</p>
            </div>
          )}

          {nomination.achievements && (
            <div className="mt-4 text-left">
              <p className="text-xs font-bold text-gray-600 mb-2">Achievements:</p>
              <p className="text-sm text-gray-700">{nomination.achievements}</p>
            </div>
          )}
        </div>

        <button
          disabled={!isVotingActive}
          onClick={onStartVerification}
          className={`${isVotingActive
              ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {isVotingActive ? "Verify to Vote" : "Voting Closed"}
          </span>
        </button>
      </div>
    </div>
  );
};

// OTP Verification Component
const OTPVerification = ({
  email,
  otp,
  showOtp,
  isEmailVerified,
  onEmailChange,
  onOtpChange,
  onSendOtp,
  onVerifyOtp,
  isLoading,
}) => (
  <div className="bg-gray-50 p-4 rounded-lg border">
    <label className="block text-xs font-bold text-blue-800 mb-2">
      Email Address *
    </label>
    <div className="space-y-3">
      <input
        type="email"
        name="email"
        value={email}
        onChange={onEmailChange}
        required
        className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all font-medium"
        placeholder="Enter your email"
        disabled={isEmailVerified}
      />
      <p className="text-xs text-orange-500 mt-1">
        Please enter your domain email ID (e.g., yourname@company.com)
      </p>
      {!showOtp ? (
        <button
          type="button"
          onClick={onSendOtp}
          disabled={isLoading || !email}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          {isLoading ? "Sending..." : "Send OTP to Email"}
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={onOtpChange}
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            className="w-full p-3 border-2 border-orange-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all font-medium text-center"
            disabled={isEmailVerified}
          />
          {!isEmailVerified && (
            <button
              type="button"
              onClick={onVerifyOtp}
              disabled={isLoading || !otp}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          )}
          {isEmailVerified && (
            <div className="bg-green-100 border border-green-400 text-green-800 font-bold text-center py-2 rounded-lg text-sm">
              ✓ Email Verified Successfully
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

// Verification Form Component
const VerificationForm = ({
  formData,
  showOtp,
  isEmailVerified,
  onInputChange,
  onVerifyEmail,
  onVerifyOtp,
  onSubmit,
  isLoading,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-lg border max-w-md mx-auto">
    <h3 className="text-xl font-bold text-blue-800 mb-6 text-center flex items-center justify-center">
      <svg
        className="w-5 h-5 mr-2 text-orange-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
      Email Verification
    </h3>

    <div className="space-y-4">
      <OTPVerification
        email={formData.email}
        otp={formData.otp}
        showOtp={showOtp}
        isEmailVerified={isEmailVerified}
        onEmailChange={onInputChange}
        onOtpChange={onInputChange}
        onSendOtp={onVerifyEmail}
        onVerifyOtp={onVerifyOtp}
        isLoading={isLoading}
      />

      <button
        onClick={onSubmit}
        disabled={!isEmailVerified || isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isLoading ? "Processing..." : "Proceed →"}
      </button>
    </div>
  </div>
);

// User Details Form Component
const UserDetailsForm = ({
  formData,
  onInputChange,
  onSubmit,
  isLoading,
}) => {
  const isFormValid = () => {
    return (
      formData.name &&
      formData.phone_number &&
      formData.designation &&
      formData.company_name &&
      formData.company_website &&
      formData.linkedin_profile
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-blue-800 mb-6 text-center flex items-center justify-center">
        <svg
          className="w-5 h-5 mr-2 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={onInputChange}
              required
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2">
              Designation *
            </label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={onInputChange}
              required
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all"
              placeholder="Enter your job title/designation"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={onInputChange}
              required
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2">
              Company Website *
            </label>
            <input
              type="url"
              name="company_website"
              value={formData.company_website}
              onChange={onInputChange}
              required
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all"
              placeholder="https://www.company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-blue-800 mb-2">
              Linkedin Profile*
            </label>
            <input
              name="linkedin_profile"
              value={formData.linkedin_profile}
              onChange={onInputChange}
              required
              className="w-full p-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all resize-none"
              placeholder="Enter your LinkedIn profile URL"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={!isFormValid() || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? "Processing..." : "Continue →"}
        </button>
      </div>
    </div>
  );
};

// Declaration Step Component with Checkbox
const DeclarationStep = ({ nomination, onSubmitVote, isLoading }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto text-center">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Vote Declaration</h2>

      <label className="inline-flex cursor-pointer text-lg text-gray-700">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-5 w-5 text-blue-600 ml-9 mt-1"
          style={{ flexShrink: 0 }}
        />
        <span className="ml-3 text-[15px]">
          I am casting my vote in favor of{" "}
          <span className="font-semibold">{nomination.leader_name}</span> in the{" "}
          <span className="font-semibold">{nomination.category_name}</span> category.
        </span>
      </label>

      <button
        onClick={onSubmitVote}
        disabled={!isChecked || isLoading}
        className={`${isChecked
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-400 cursor-not-allowed"
          } text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-6`}
      >
        {isLoading ? "Submitting Vote..." : "Submit Vote"}
      </button>
    </div>
  );
};

// Success Message Component
const SuccessMessage = ({ nomination, formData }) => (
  <div className="p-8 bg-white">
    <div className="text-center max-w-lg mx-auto">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg mb-6">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-blue-800 mb-4">
        Vote Submitted Successfully!
      </h3>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for participating in the democratic process.
      </p>

      <div className="bg-blue-50 border-2 border-orange-300 p-6 rounded-lg shadow-lg">
        <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center justify-center">
          <svg
            className="w-4 h-4 mr-2 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Vote Summary
        </h4>
        <div className="space-y-3 text-left text-sm">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700">Candidate:</span>
            <span className="text-blue-800 font-bold">{nomination.leader_name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700">Award:</span>
            <span className="text-orange-700 font-medium">
              {nomination.category_name}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700">Voter:</span>
            <span className="text-blue-800 font-bold">{formData.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="font-semibold text-gray-700">Company:</span>
            <span className="text-blue-800 font-bold">{formData.company_name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-600">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <span className="font-bold">Note:</span> Your vote has been recorded
          securely. You will receive a confirmation email shortly.
        </p>
      </div>
    </div>
  </div>
);

// Main Voting Page Component
const VotingPage = () => {
  const [currentStep, setCurrentStep] = useState("candidate");
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    name: "",
    phone_number: "",
    designation: "",
    company_name: "",
    company_website: "",
    linkedin_profile: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nomination, setNomination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isVotingActive = nomination
    ? today >= new Date(nomination.vote_start_date) &&
    today <= new Date(nomination.vote_end_date)
    : false;

  const { leader_id, category_id } = useParams();
  console.log("Leader ID:", leader_id);
  console.log("Category ID:", category_id);

  // Fetch nomination data
  const fetchNomination = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fetch_nomination_by_leader_and_category`,
        {
          params: {
            leader_id,
            category_id,
          },
        }
      );

      if (response.data) {
        setNomination(response.data);
      } else {
        setError("No nomination found for the given parameters.");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Failed to load nomination details. Please try again."
      );
      console.error("Error fetching nomination:", err);
    } finally {
      setLoading(false);
    }
  };

  // Send OTP API
  const sendOtp = async (email) => {
    try {
      setIsLoading(true);

      const payload = {
        nomination_id: nomination.nomination_id,
        email,
      };

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/send-vote-otp`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
      };

      const response = await axios.request(config);
      console.log("OTP Response:", response.data);

      alert("OTP sent to your email successfully!");
      setShowOtp(true);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "Failed to send OTP. Please try again.";
      alert(errorMessage);
      console.error("Error sending OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP API
  const verifyOtp = async (email, otp) => {
    try {
      setIsLoading(true);

      const payload = {
        nomination_id: nomination.nomination_id,
        email,
        otp,
      };

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/verify-vote-otp`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
      };

      const response = await axios.request(config);
      console.log("OTP Verification Response:", response.data);

      setIsEmailVerified(true);
      alert("OTP verified successfully! Please fill in your details.");
      setCurrentStep("details"); // Go to details step after successful OTP verification
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "Invalid OTP. Please try again.";
      alert(errorMessage);
      console.error("Error verifying OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Vote API with all required fields
  const submitVote = async () => {
    try {
      setIsLoading(true);

      const payload = {
        nomination_id: nomination.nomination_id,
        category_id: nomination.category_id,
        email: formData.email,
        name: formData.name,
        phone_number: formData.phone_number,
        designation: formData.designation,
        company_name: formData.company_name,
        company_website: formData.company_website,
        linkedin_profile: formData.linkedin_profile,
        answers: [], // empty because no questions
      };

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_API_URL}/submit-vote`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
      };

      const response = await axios.request(config);
      console.log("Vote Submission Response:", response.data);

      setCurrentStep("success");
      alert("Vote submitted successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || "Failed to submit vote. Please try again.";
      alert(errorMessage);
      console.error("Error submitting vote:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (leader_id && category_id) {
      fetchNomination();
    } else {
      setError("Invalid URL parameters.");
      setLoading(false);
    }
  }, [leader_id, category_id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifyEmail = () => {
    if (formData.email) {
      sendOtp(formData.email);
    } else {
      alert("Please enter your email address.");
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp && formData.otp.length === 6) {
      verifyOtp(formData.email, formData.otp);
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  const handleVerificationSubmit = () => {
    if (formData.email && isEmailVerified) {
      setCurrentStep("details");
    } else {
      alert("Please complete email verification first.");
    }
  };

  const handleDetailsSubmit = () => {
    setCurrentStep("declare");
  };

  const handleStartVerification = () => {
    setCurrentStep("verify");
  };

  const handleRetry = () => {
    fetchNomination();
  };

  const handleSubmitVote = () => {
    submitVote();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Header />
          <div className="bg-white rounded-b-lg shadow-lg border border-gray-200 overflow-hidden">
            <LoadingComponent />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Header />
          <div className="bg-white rounded-b-lg shadow-lg border border-gray-200 overflow-hidden">
            <ErrorComponent message={error} onRetry={handleRetry} />
          </div>
        </div>
      </div>
    );
  }

  if (!nomination) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Header />
          <div className="bg-white rounded-b-lg shadow-lg border border-gray-200 overflow-hidden">
            <ErrorComponent message="No nomination found." onRetry={handleRetry} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="bg-white rounded-b-lg shadow-lg border border-gray-200 overflow-hidden">
          <StepIndicator currentStep={currentStep} />

          {currentStep === "candidate" && (
            <CandidateCard
              nomination={nomination}
              onStartVerification={handleStartVerification}
              isVotingActive={isVotingActive}
            />
          )}

          {currentStep === "verify" && (
            <VerificationForm
              formData={formData}
              showOtp={showOtp}
              isEmailVerified={isEmailVerified}
              onInputChange={handleInputChange}
              onVerifyEmail={handleVerifyEmail}
              onVerifyOtp={handleVerifyOtp}
              onSubmit={handleVerificationSubmit}
              isLoading={isLoading}
            />
          )}

          {currentStep === "details" && (
            <UserDetailsForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleDetailsSubmit}
              isLoading={isLoading}
            />
          )}

          {currentStep === "declare" && (
            <DeclarationStep
              nomination={nomination}
              onSubmitVote={handleSubmitVote}
              isLoading={isLoading}
            />
          )}

          {currentStep === "success" && (
            <SuccessMessage nomination={nomination} formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
