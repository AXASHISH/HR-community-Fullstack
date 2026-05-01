import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  FileText,
  Award,
  CheckCircle,
  X,
  User,
  Image,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

// Image Preview Modal Component
const ImagePreviewModal = ({ isOpen, onClose, imageSrc, fileName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{fileName}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <img
          src={imageSrc}
          alt={fileName}
          className="max-w-full max-h-[70vh] object-contain mx-auto"
        />
      </div>
    </div>
  );
};

// Progress Indicator Component
const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index < currentStep
                    ? "bg-green-600 text-white"
                    : index === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 text-gray-600">
                {index === 0 && "Company"}
                {index === 1 && "About You"}
                {index === 2 && "Details"}
                {index === 3 && "Review"}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2",
                  index < currentStep ? "bg-green-600" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Material Input Components
const MaterialInput = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  className = "",
  disabled = false,
  required = false,
  size = "sm",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value && value.toString().length > 0);
  }, [value]);

  const sizeMap = {
    sm: "h-8 px-2 text-xs",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base",
  };
  const baseSizeClasses = sizeMap[size] || sizeMap.sm;

  return (
    <div className="relative mb-4">
      <input
        id={id}
        type={type}
        value={value || ""}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={cn(
          "w-full border border-gray-400 rounded-md transition-all duration-200 outline-none",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          "bg-white peer",
          baseSizeClasses,
          disabled && "bg-gray-50 cursor-not-allowed",
          className
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1",
          "peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xs",
          "peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-medium",
          "peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:font-medium",
          isFocused || hasValue
            ? "-top-2 left-3 text-xs text-blue-600 font-medium"
            : "top-1/2 -translate-y-1/2 text-xs text-gray-500",
          required && "after:content-['*'] after:text-red-500 after:ml-1"
        )}
      >
        {label}
      </label>
    </div>
  );
};

const MaterialTextArea = ({
  label,
  id,
  value,
  onChange,
  rows = 2,
  required = false,
  size = "sm",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value && value.toString().length > 0);
  }, [value]);

  const sizeMap = {
    sm: "px-2 text-xs",
    md: "px-3 text-sm",
    lg: "px-4 text-base",
  };
  const baseSizeClasses = sizeMap[size] || sizeMap.sm;

  return (
    <div className="relative mb-4">
      <textarea
        id={id}
        value={value || ""}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className={cn(
          "w-full border border-gray-400 rounded-md transition-all duration-200 outline-none resize-y",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
          "bg-white peer py-2",
          baseSizeClasses
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none bg-white px-1",
          "peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs",
          "peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:font-medium",
          "peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600 peer-[:not(:placeholder-shown)]:font-medium",
          isFocused || hasValue
            ? "-top-2 left-3 text-xs text-blue-600 font-medium"
            : "top-3 text-xs text-gray-500",
          required && "after:content-['*'] after:text-red-500 after:ml-1"
        )}
      >
        {label}
      </label>
    </div>
  );
};

const MaterialFileUpload = ({
  label,
  uploadedFile,
  onFileChange,
  error,
  required = false,
  size = "sm",
  acceptedTypes = ".pdf",
  fileType = "document",
  onImagePreview,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileChange({ target: { files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const sizeMap = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };
  const paddingClass = sizeMap[size] || sizeMap.sm;

  return (
    <div className="relative mb-4">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200",
          paddingClass,
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
          uploadedFile
            ? "border-green-500 bg-green-50"
            : "hover:border-gray-400"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            {fileType === "image" && uploadedFile.type?.startsWith("image/") ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Preview"
                    className="h-8 w-8 rounded object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onImagePreview(URL.createObjectURL(uploadedFile), uploadedFile.name);
                    }}
                    className="absolute -top-1 -right-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-0.5 h-5 w-5"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
                <span className="font-medium text-xs">{uploadedFile.name}</span>
              </div>
            ) : (
              <span className="font-medium text-xs">{uploadedFile.name}</span>
            )}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFileChange({ target: { files: null } });
              }}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0.5 h-5 w-5"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="space-y-1">
            {fileType === "image" ? (
              <Image className="h-5 w-5 text-gray-400 mx-auto" />
            ) : (
              <Upload className="h-5 w-5 text-gray-400 mx-auto" />
            )}
            <p className="text-xs text-gray-600">
              Click to upload or drag and drop
            </p>
          </div>
        )}
        <input
          type="file"
          accept={acceptedTypes}
          onChange={onFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <label
        className={cn(
          "absolute -top-2 left-3 text-xs font-medium bg-white px-1 text-gray-600",
          required && "after:content-['*'] after:text-red-500 after:ml-1"
        )}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default function NominationForm() {
  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Step management
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  const [nominationStatus, setNominationStatus] = useState({
    loading: true,
    hasOpenNomination: false,
    error: null,
  });

  const [formData, setFormData] = useState({
    aboutCompany: "",
    companyWebsite: "",
    aboutYou: "",
    achievement: "",
    reasonForClaim: "",
    applicantName: "",
    email: "",
    mobileNumber: "",
    companyEmail: "",
    designation: "",
    industry: "",
    linkedinId: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image preview modal state
  const [imagePreview, setImagePreview] = useState({
    isOpen: false,
    src: "",
    fileName: "",
  });

  const params = useParams();
  const nominationId = params.nominationId;
  const selectedCategory = useLocation().state?.selectedCategory || "";

  // Get auth token from localStorage or context
  const authToken = sessionStorage.getItem("authToken") || "your-auth-token-here";

  // Check nomination status on component mount
  useEffect(() => {
    const checkNominationStatus = async () => {
      if (!nominationId || !selectedCategory?.id) {
        setNominationStatus({
          loading: false,
          hasOpenNomination: false,
          error: "Missing nomination or category information",
        });
        return;
      }

      try {
        setNominationStatus(prev => ({ ...prev, loading: true }));

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/check-nomination-status`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // If we get a successful response, it means there's an open nomination
        setNominationStatus({
          loading: false,
          hasOpenNomination: true,
          error: null,
        });

        toast.warning("You have a pending nomination for a category. Please wait for the current nomination to be processed.");

      } catch (error) {
        if (error.response?.status === 404) {
          // No open nomination found - user can proceed
          setNominationStatus({
            loading: false,
            hasOpenNomination: false,
            error: null,
          });
        } else {
          // Other errors
          setNominationStatus({
            loading: false,
            hasOpenNomination: false,
            error: error.response?.data?.detail || "Failed to check nomination status",
          });

          toast.error("Failed to check nomination status. You may proceed, but please contact support if issues persist.");
        }
      }
    };

    checkNominationStatus();
  }, [nominationId, selectedCategory?.id, authToken]);

  const handleFormChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Handle image preview
  const handleImagePreview = (src, fileName) => {
    setImagePreview({
      isOpen: true,
      src,
      fileName,
    });
  };

  const closeImagePreview = () => {
    setImagePreview({
      isOpen: false,
      src: "",
      fileName: "",
    });
  };

  // Handle PDF file change and validate (2MB limit)
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setUploadedFile(null);
      setError("file", { type: "required", message: "A file is required" });
      return;
    }
    if (file.type !== "application/pdf") {
      setError("file", {
        type: "filetype",
        message: "Only PDF files are allowed",
      });
      setUploadedFile(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("file", { type: "filesize", message: "File must be ≤2MB" });
      setUploadedFile(null);
      return;
    }
    clearErrors("file");
    setUploadedFile(file);
    setValue("file", e.target.files);
  };

  // Handle photo upload and validate (200KB limit)
  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setUploadedPhoto(null);
      setError("photo", { type: "required", message: "A photo is required" });
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("photo", {
        type: "filetype",
        message: "Only image files (JPG, PNG, etc.) are allowed",
      });
      setUploadedPhoto(null);
      return;
    }

    if (file.size > 200 * 1024) {
      setError("photo", { type: "filesize", message: "Image must be ≤200KB" });
      setUploadedPhoto(null);
      return;
    }

    clearErrors("photo");
    setUploadedPhoto(file);
    setValue("photo", e.target.files);
  };

  // Updated step validation functions - ALL FIELDS REQUIRED
  const isStepValid = (step) => {
    switch (step) {
      case 0: // Company Information
        return formData.aboutCompany && formData.companyWebsite;
      case 1: // About You & Documentation
        return (
          formData.aboutYou &&
          formData.achievement &&
          formData.reasonForClaim &&
          uploadedFile &&
          uploadedPhoto
        );
      case 2: // Applicant Details
        return (
          formData.applicantName &&
          formData.email &&
          formData.mobileNumber &&
          formData.companyEmail &&
          formData.designation &&
          formData.industry &&
          formData.linkedinId
        );
      case 3: // Review
        return true;
      default:
        return false;
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps - 1 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else if (!isStepValid(currentStep)) {
      toast.error("Please complete all required fields in this step.");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Updated form validation - ALL FIELDS REQUIRED
  const isFormValid = () => {
    const requiredFields = [
      "aboutCompany",
      "companyWebsite",
      "aboutYou",
      "achievement",
      "reasonForClaim",
      "applicantName",
      "email",
      "mobileNumber",
      "companyEmail",
      "designation",
      "industry",
      "linkedinId",
    ];
    return (
      requiredFields.every((field) => Boolean(formData[field])) &&
      uploadedFile &&
      uploadedPhoto
    );
  };

  const onSubmit = async (data) => {
    if (!isFormValid()) {
      toast.error("Please complete all required fields and upload photo and documents.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Map React form data to API expected format
      // formDataToSend.append("leader_id", nominationId || "");
      formDataToSend.append("category_id", selectedCategory?.id || "");
      formDataToSend.append("company_id", "1");
      formDataToSend.append("nomination_type", "individual");

      // Add files
      if (uploadedPhoto) {
        formDataToSend.append("profile_image", uploadedPhoto);
      }
      if (uploadedFile) {
        formDataToSend.append("supporting_document", uploadedFile);
      }

      // Add form fields
      formDataToSend.append("about_company", formData.aboutCompany);
      formDataToSend.append("company_website", formData.companyWebsite);
      formDataToSend.append("about_yourself", formData.aboutYou);
      formDataToSend.append("achievements", formData.achievement);
      formDataToSend.append("reason_for_claiming", formData.reasonForClaim);
      formDataToSend.append("phone_number", formData.mobileNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("industry", formData.industry);
      formDataToSend.append("linkedin_profile", formData.linkedinId);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/fill-nomination`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Nomination submitted successfully:", response.data);
      toast.success("Nomination submitted successfully!");

    } catch (error) {
      console.error("Error submitting nomination:", error);

      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
      } else if (error.response?.status === 413) {
        toast.error("File size too large. Please ensure photo is ≤200KB and document is ≤2MB.");
      } else if (error.response?.status === 422) {
        toast.error("Validation error. Please check your form data.");
      } else {
        toast.error(
          error?.response?.data?.detail ||
          "Error submitting nomination. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <MaterialTextArea
                  size="sm"
                  label="About Company"
                  id="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={(e) =>
                    handleFormChange("aboutCompany", e.target.value)
                  }
                  rows={2}
                  required
                />
                <MaterialInput
                  size="lg" // Changed from "lg" to "sm"
                  label="Company Website"
                  id="companyWebsite"
                  type="url"
                  value={formData.companyWebsite}
                  onChange={(e) =>
                    handleFormChange("companyWebsite", e.target.value)
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                About You & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              {/* First Row - 3 Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mb-4">
                <MaterialTextArea
                  size="sm"
                  label="About You"
                  id="aboutYou"
                  value={formData.aboutYou}
                  onChange={(e) => handleFormChange("aboutYou", e.target.value)}
                  rows={2}
                  required
                />
                <MaterialTextArea
                  size="sm"
                  label="Achievement"
                  id="achievement"
                  value={formData.achievement}
                  onChange={(e) =>
                    handleFormChange("achievement", e.target.value)
                  }
                  rows={2}
                  required
                />
                <MaterialTextArea
                  size="sm"
                  label="Reason for Claim"
                  id="reasonForClaim"
                  value={formData.reasonForClaim}
                  onChange={(e) =>
                    handleFormChange("reasonForClaim", e.target.value)
                  }
                  rows={2}
                  required
                />
              </div>

              {/* Second Row - 2 File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <MaterialFileUpload
                  size="sm"
                  label="Supporting Documentation (PDF only, max 2MB)"
                  uploadedFile={uploadedFile}
                  onFileChange={handleFileChange}
                  error={errors.file}
                  acceptedTypes=".pdf"
                  fileType="document"
                  required
                />
                <MaterialFileUpload
                  size="sm"
                  label="Upload Photo (JPG, PNG, max 200KB)"
                  uploadedFile={uploadedPhoto}
                  onFileChange={handlePhotoChange}
                  onImagePreview={handleImagePreview}
                  error={errors.photo}
                  acceptedTypes="image/*"
                  fileType="image"
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Applicant Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                <MaterialInput
                  size="sm"
                  label="Applicant Name"
                  id="applicantName"
                  value={formData.applicantName}
                  onChange={(e) =>
                    handleFormChange("applicantName", e.target.value)
                  }
                  required
                />

                <MaterialInput
                  size="sm"
                  label="Email ID"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  required
                />

                <MaterialInput
                  size="sm"
                  label="Mobile Number"
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleFormChange("mobileNumber", e.target.value)
                  }
                  required
                />

                <MaterialInput
                  size="sm"
                  label="Company Email ID"
                  id="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) =>
                    handleFormChange("companyEmail", e.target.value)
                  }
                  required
                />

                <MaterialInput
                  size="sm"
                  label="Designation"
                  id="designation"
                  value={formData.designation}
                  onChange={(e) =>
                    handleFormChange("designation", e.target.value)
                  }
                  required
                />
                <MaterialInput
                  size="sm"
                  label="Industry"
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleFormChange("industry", e.target.value)}
                  required
                />
                <MaterialInput
                  size="sm"
                  label="LinkedIn ID"
                  id="linkedinId"
                  type="url"
                  value={formData.linkedinId}
                  onChange={(e) => handleFormChange("linkedinId", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Review & Submit
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  Please review your information before submitting:
                </div>

                {/* Complete Review sections */}
                <div className="space-y-4">
                  {/* Company Information */}
                  <div className="border-b pb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Company Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">About Company:</span>
                        <p className="text-gray-800 mt-1">{formData.aboutCompany || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Website:</span>
                        <p className="text-gray-800 mt-1 break-all">{formData.companyWebsite || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* About You Section */}
                  <div className="border-b pb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">About You</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">About You:</span>
                        <p className="text-gray-800 mt-1">{formData.aboutYou || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Achievement:</span>
                        <p className="text-gray-800 mt-1">{formData.achievement || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Reason for Claim:</span>
                        <p className="text-gray-800 mt-1">{formData.reasonForClaim || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="border-b pb-3">
                    <h4 className="font-semibold text-gray-800 mb-2">Uploaded Files</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Supporting Document:</span>
                        <p className="text-gray-800 mt-1">{uploadedFile?.name || "Not uploaded"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Photo:</span>
                        <p className="text-gray-800 mt-1">{uploadedPhoto?.name || "Not uploaded"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Applicant Details */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Applicant Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="text-gray-800 mt-1">{formData.applicantName || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Mobile:</span>
                        <p className="text-gray-800 mt-1">{formData.mobileNumber || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-800 mt-1 break-all">{formData.email || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Company Email:</span>
                        <p className="text-gray-800 mt-1 break-all">{formData.companyEmail || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Designation:</span>
                        <p className="text-gray-800 mt-1">{formData.designation || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Industry:</span>
                        <p className="text-gray-800 mt-1">{formData.industry || "Not provided"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-600">LinkedIn Profile:</span>
                        <p className="text-gray-800 mt-1 break-all">{formData.linkedinId || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning if any field is missing */}
                {!isFormValid() && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-600 text-sm font-medium">
                      ⚠️ Please complete all required fields before submitting.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  if (nominationStatus.loading) {
    return (
      <div className="space-y-4 p-4 mx-auto bg-white w-[50%]">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking nomination status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (nominationStatus.hasOpenNomination) {
    return (
      <div className="space-y-4 p-4 mx-auto bg-white w-[50%]">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Nomination Status
          </h1>
        </div>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Clock className="h-5 w-5" />
              Pending Nomination
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-orange-800 font-medium mb-2">
                    You have a pending nomination.
                  </p>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    Your nomination is currently being processed. You cannot submit a new nomination
                     while one is pending. Please wait for the current nomination
                    to be reviewed and processed.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Go Back
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  Refresh Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const showErrorBanner = nominationStatus.error && !nominationStatus.hasOpenNomination;

  return (
    <div className="space-y-4 p-4 mx-auto bg-white w-[50%]">
      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={imagePreview.isOpen}
        onClose={closeImagePreview}
        imageSrc={imagePreview.src}
        fileName={imagePreview.fileName}
      />

      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Submit Nomination
        </h1>
        <p className="text-sm text-gray-600">
          Complete your leadership award nomination
        </p>
      </div>

      {showErrorBanner && (
        <Card className="border-yellow-200 bg-yellow-50 mb-4">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-yellow-800 font-medium">
                  Unable to verify nomination status
                </p>
                <p className="text-yellow-700 mt-1">
                  {nominationStatus.error}. You may proceed with the submission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      {/* Selected Category */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Award className="h-4 w-4 text-blue-600" />
            Selected Category
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-4">
          <div className="flex flex-col gap-1">
            <Badge className="bg-blue-600 text-white max-w-max text-xs">
              {selectedCategory?.name}
            </Badge>
            <span className="text-xs text-gray-600">
              {selectedCategory?.description}
            </span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Render current step content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex gap-2">
            {currentStep < totalSteps - 1 ? (
              <Button
                type="button"
                size="sm"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-8 px-6 rounded-md transition-colors text-xs flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="sm"
                disabled={!isFormValid() || isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold h-8 px-6 rounded-md transition-colors text-xs"
              >
                {isSubmitting ? "Submitting..." : "Submit Nomination"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
