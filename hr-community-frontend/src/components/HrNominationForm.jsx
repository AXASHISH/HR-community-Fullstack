import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const educationOptions = [
  "Bachelor of Business Administration (BBA)",
  "Master of Business Administration (MBA)",
  "Chartered Accountant (CA)",
  "Certified Human Resources Professional (CHRP)",
  "Post Graduate Diploma in HR",
  "Doctorate (PhD)",
  "Other",
];

const HRNominationForm = ({ userNomination }) => {
  const [activeSection, setActiveSection] = useState("category");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [nominationId, setNominationId] = useState(userNomination?.nomination_id || null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [documentUrls, setDocumentUrls] = useState({
    supportingDocs: null,
    cv: null,
    id_card: null,
    awards: []
  });
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [pendingSectionChange, setPendingSectionChange] = useState(null);
  const [showDeclarationModal, setShowDeclarationModal] = useState(false);

  // Form state using useState
  const [formData, setFormData] = useState({
    categoryId: "",
    nominationType: "individual",
    fullName: "",
    designation: "",
    organization: "",
    workAddress: {
      lane1: "",
      lane2: "",
      city: "",
      state: "",
      pin: "",
    },
    gender: "",
    email: "",
    mobile: "",
    linkedin: "",
    totalExperience: "",
    currentOrgExperience: "",
    // education: "",
    certifications: "",
    whyConsider: "",
    supportingDocs: null,
    cv: null,
    id_card: null,
    keyInitiatives: "",
    talentStrategy: "",
    employeeEngagement: "",
    deiInitiatives: "",
    hrTechnology: "",
    quantifiableOutcomes: "",
    awards: [],
    hrVision: "",
    publications: "",
    profileImage: null,
    declarationChecked: false,
    submissionDate: new Date().toISOString().split("T")[0],
    education: "",
    educationOther: "",
  });

  console.log("userNomination", userNomination);

  // Handle form field changes
  const handleInputChange = (fieldPath, value) => {
    setFormData(prev => {
      if (fieldPath.includes('.')) {
        // Handle nested objects (like workAddress)
        const [parent, child] = fieldPath.split('.');
        if (parent.startsWith('awards[')) {
          // Handle awards array fields like awards[0].title
          const match = parent.match(/awards\[(\d+)\]/);
          if (match) {
            const index = parseInt(match[1]);
            const newAwards = [...prev.awards];
            if (!newAwards[index]) {
              newAwards[index] = {};
            }
            newAwards[index] = {
              ...newAwards[index],
              [child]: value
            };
            return { ...prev, awards: newAwards };
          }
        } else {
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: value
            }
          };
        }
      } else if (fieldPath.startsWith('awards[')) {
        // Handle array fields like awards[0].title (alternative pattern)
        const match = fieldPath.match(/awards\[(\d+)\]\.(.+)/);
        if (match) {
          const [, index, field] = match;
          const newAwards = [...prev.awards];
          if (!newAwards[parseInt(index)]) {
            newAwards[parseInt(index)] = {};
          }
          newAwards[parseInt(index)] = {
            ...newAwards[parseInt(index)],
            [field]: value
          };
          return { ...prev, awards: newAwards };
        }
      }
      return { ...prev, [fieldPath]: value };
    });

    // Clear error for this field
    if (errors[fieldPath]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath];
        return newErrors;
      });
    }
  };

  // Handle file changes
  const handleFileChange = (fieldName, files,documentType) => {
    const file = files[0];
    if (!file) return;

    // Default 2MB limit
    let maxSize = 2 * 1024 * 1024;

    // Special case: 200KB for profileImage
    if (fieldName === "profileImage") {
      maxSize = 200 * 1024;
    }

    if (file.size > maxSize) {
      alert(
        `File size exceeds ${fieldName === "profileImage" ? "200KB" : "2MB"
        }. Please upload a smaller file.`
      );
      return; // Don't set formData or upload
    }

    // Only set if size is valid
    setFormData(prev => ({ ...prev, [fieldName]: file }));

    // Proceed to upload
    handleFileUpload(file, documentType, fieldName);
  };


  // Remove file function
  const removeFile = (fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: null }));
    setDocumentUrls(prev => ({ ...prev, [fieldName]: null }));
  };

  // Remove award document
  const removeAwardDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.map((award, i) =>
        i === index ? { ...award, document: null } : award
      )
    }));

    setDocumentUrls(prev => ({
      ...prev,
      awards: prev.awards.map((url, i) => i === index ? null : url)
    }));
  };

  // Add/Remove awards
  const addAward = () => {
    setFormData(prev => ({
      ...prev,
      awards: [...prev.awards, { title: "", document: null }]
    }));
  };

  const removeAward = (index) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index)
    }));

    // Remove corresponding document URL
    setDocumentUrls(prev => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo);
      setUserInfo(user);
      setFormData(prev => ({
        ...prev,
        fullName: user.name || "",
        organization: user.company_name || "",
        email: user.email || "",
        designation: user.role || "",
        mobile: user.phone_number || ""
      }));
    }

    if (userNomination) {
      setNominationId(userNomination?.nomination_id);
      setFormData(prev => ({
        ...prev,
        categoryId: userNomination?.category_id.toString()
      }));
      populateFormWithData(userNomination);
    }

    const fetchCategories = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const apiUrl = import.meta.env.VITE_API_URL;
        
        console.log("=== CATEGORY FETCH DEBUG ===");
        console.log("API URL:", apiUrl);
        console.log("Auth Token:", token ? "✅ Present" : "❌ Missing");
        console.log("Endpoint:", `${apiUrl}/nomination-categories`);
        
        const res = await fetch(
          `${apiUrl}/nomination-categories`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        console.log("Response Status:", res.status, res.statusText);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Error response:", errorText);
          throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Categories fetched successfully:", data);
        console.log("Data type:", Array.isArray(data) ? "Array" : typeof data);
        console.log("Number of categories:", Array.isArray(data) ? data.length : "N/A");
        
        if (Array.isArray(data)) {
          setCategories(data);
          console.log("✅ Categories set successfully");
        } else {
          console.warn("❌ Categories response is not an array:", data);
          setCategories([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error.message);
        console.error("Full error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [userNomination]);

  // Upload document function
  const uploadDocument = async (file, documentType) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const formDataUpload = new FormData();
      formDataUpload.append("document_type", documentType);
      formDataUpload.append("file", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/upload-document`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataUpload,
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result.document_url;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`Upload failed: ${error.message}`);
      throw error;
    }
  };

  // Handle file uploads
  const handleFileUpload = async (file, documentType, fieldName) => {
    if (!file) return;

    // Check file size > 2MB
    const MAX_SIZE_MB = 2 * 1024 * 1024; // 2 MB in bytes
    if (file.size > MAX_SIZE_MB) {
      alert("File size exceeds 2MB. Please upload a smaller file.");
      return;
    }

    setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));

    try {
      if (fieldName === "profileImage") {
        // Directly store file in formData without API upload
        setFormData(prev => ({
          ...prev,
          profileImage: file
        }));
        return file;
      } else {
        // Proceed with upload for other document types
        const documentUrl = await uploadDocument(file, documentType);
        setDocumentUrls(prev => ({
          ...prev,
          [fieldName]: documentUrl
        }));
        return documentUrl;
      }
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Handle award document uploads
  const handleAwardDocumentUpload = async (file, index) => {
    if (!file) return;

    const fieldName = `award_${index}`;
    setUploadingFiles(prev => ({ ...prev, [fieldName]: true }));

    try {
      const documentUrl = await uploadDocument(file, "awards");
      setDocumentUrls(prev => {
        const newAwards = [...(prev.awards || [])];
        newAwards[index] = documentUrl;
        return {
          ...prev,
          awards: newAwards
        };
      });
      return documentUrl;
    } catch (error) {
      console.error("Award document upload failed:", error);
    } finally {
      setUploadingFiles(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // Create or get existing nomination
  const createOrGetNomination = async (categoryId) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const formDataCreate = new FormData();
      formDataCreate.append("category_id", categoryId);
      formDataCreate.append("nomination_type", "individual");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fill-nomination`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataCreate,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setNominationId(result.nomination_id);
        populateFormWithData(result);
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create nomination");
      }
    } catch (error) {
      console.error("Error creating nomination:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Populate form with existing data
  const populateFormWithData = (nominationData) => {
    if (!nominationData) return;

    // Start with current formData to preserve existing values like categoryId
    const newFormData = { ...formData };

    /* ---------- personal section ---------- */
    // full name: try full_name, then leader_name
    newFormData.fullName =
      nominationData.full_name ??
      nominationData.leader_name ??
      newFormData.fullName;

    // organization: try organization, then nested company.company_name
    newFormData.organization =
      nominationData.organization ??
      nominationData.company?.company_name ??
      newFormData.organization;

    // the rest of the current mapping …
    if (nominationData.designation)
      newFormData.designation = nominationData.designation;
    if (nominationData.email) newFormData.email = nominationData.email;
    if (nominationData.phone_number)
      newFormData.mobile = nominationData.phone_number;
    if (nominationData.gender) newFormData.gender = nominationData.gender;
    if (nominationData.linkedin_profile)
      newFormData.linkedin = nominationData.linkedin_profile;

    // Ensure categoryId is set correctly
    if (nominationData.category_id) {
      newFormData.categoryId = nominationData.category_id.toString();
    }

    // Work address - improved parsing
    if (nominationData.work_address) {
      const addressString = nominationData.work_address;

      try {
        const commaParts = addressString.split(',').map(part => part.trim());

        if (commaParts.length >= 4) {
          newFormData.workAddress.lane1 = commaParts[0] || "";
          newFormData.workAddress.lane2 = commaParts[1] || "";
          newFormData.workAddress.city = commaParts[2] || "";

          const statePinPart = commaParts[3];
          if (statePinPart.includes('-')) {
            const [state, pin] = statePinPart.split('-').map(part => part.trim());
            newFormData.workAddress.state = state || "";
            newFormData.workAddress.pin = pin || "";
          } else {
            newFormData.workAddress.state = statePinPart || "";
          }
        } else if (commaParts.length === 3) {
          newFormData.workAddress.lane1 = commaParts[0] || "";
          newFormData.workAddress.city = commaParts[1] || "";

          const statePinPart = commaParts[2];
          if (statePinPart.includes('-')) {
            const [state, pin] = statePinPart.split('-').map(part => part.trim());
            newFormData.workAddress.state = state || "";
            newFormData.workAddress.pin = pin || "";
          }
        }
      } catch (error) {
        console.log("Error parsing work address:", error);
        newFormData.workAddress.lane1 = addressString;
      }
    }

    // Professional fields
    if (nominationData.total_years_of_experience_in_hr)
      newFormData.totalExperience = nominationData.total_years_of_experience_in_hr;
    if (nominationData.years_with_current_organization)
      newFormData.currentOrgExperience = nominationData.years_with_current_organization;
    if (nominationData.educational_qualifications)
      newFormData.education = nominationData.educational_qualifications;
    if (nominationData.professional_certifications)
      newFormData.certifications = nominationData.professional_certifications;

    // Award section
    if (nominationData.why_consider) newFormData.whyConsider = nominationData.why_consider;

    // Leadership section
    if (nominationData.key_initiatives) newFormData.keyInitiatives = nominationData.key_initiatives;
    if (nominationData.talent_strategy) newFormData.talentStrategy = nominationData.talent_strategy;
    if (nominationData.employee_engagement) newFormData.employeeEngagement = nominationData.employee_engagement;
    if (nominationData.dei_initiatives) newFormData.deiInitiatives = nominationData.dei_initiatives;
    if (nominationData.technology_and_innovation) newFormData.hrTechnology = nominationData.technology_and_innovation;

    // Impact section
    if (nominationData.quantifiable_outcomes) newFormData.quantifiableOutcomes = nominationData.quantifiable_outcomes;

    // Vision section
    if (nominationData.your_vision) newFormData.hrVision = nominationData.your_vision;
    if (nominationData.published_articles) newFormData.publications = nominationData.published_articles;

    // Awards data
    if (nominationData.awards_and_recognition?.length > 0) {
      newFormData.awards = nominationData.awards_and_recognition.map((award) => ({
        title: award.name,
        document: null
      }));
    }

    setFormData(newFormData);

    // Set document URLs
    setDocumentUrls({
      supportingDocs: nominationData.supporting_document_url,
      cv: nominationData.cv_url,
      id_card: nominationData.id_card_url,
      awards: nominationData.awards_and_recognition?.map(award => award.document_url) || []
    });
  };

  // Enhanced validation function
  const validateSection = (section) => {
    const newErrors = {};

    switch (section) {
      case "category":
        if (!formData.categoryId) {
          newErrors.categoryId = "Please select a category";
        }
        break;

      case "personal":
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.designation) newErrors.designation = "Designation is required";
        if (!formData.organization) newErrors.organization = "Organization name is required";
        if (!formData.profileImage) newErrors.profileImage = "Profile image is required";
        if (!formData.workAddress.lane1) newErrors["workAddress.lane1"] = "Lane 1 is required";
        if (!formData.workAddress.city) newErrors["workAddress.city"] = "City is required";
        if (!formData.workAddress.state) newErrors["workAddress.state"] = "State is required";
        if (!formData.workAddress.pin) newErrors["workAddress.pin"] = "PIN is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.linkedin) newErrors.linkedin = "LinkedIn profile URL is required";

        // Email validation
        if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
          newErrors.email = "Invalid email address";
        }

        // Mobile validation
        if (formData.mobile && !/^[+]?[0-9]{10,15}$/.test(formData.mobile.replace(/\s/g, ''))) {
          newErrors.mobile = "Invalid mobile number";
        }

        // PIN validation
        if (formData.workAddress.pin && !/^[0-9]{6}$/.test(formData.workAddress.pin)) {
          newErrors["workAddress.pin"] = "Invalid PIN code (6 digits required)";
        }
        break;

      case "professional":
        if (!formData.totalExperience) newErrors.totalExperience = "Total experience is required";
        if (!formData.currentOrgExperience) newErrors.currentOrgExperience = "Current organization experience is required";
        if (!formData.education) newErrors.education = "Educational qualifications are required";

        // Experience validation
        if (formData.totalExperience && parseFloat(formData.totalExperience) < 0) {
          newErrors.totalExperience = "Experience cannot be negative";
        }
        if (formData.currentOrgExperience && parseFloat(formData.currentOrgExperience) < 0) {
          newErrors.currentOrgExperience = "Experience cannot be negative";
        }
        if (formData.totalExperience && formData.currentOrgExperience &&
          parseFloat(formData.currentOrgExperience) > parseFloat(formData.totalExperience)) {
          newErrors.currentOrgExperience = "Cannot exceed total experience";
        }
        break;

      case "award":
        // Validate descriptive fields for minimum word count
        if (!formData.whyConsider || getWordCount(formData.whyConsider) === 0) {
          newErrors.whyConsider = "This field is required";
        } else if (getWordCount(formData.whyConsider) < 200) {
          newErrors.whyConsider = "Please write at least 200 words";
        }

        if (!formData.id_card) newErrors.id_card = "ID card is required";
        if (!formData.cv) newErrors.cv = "CV is required";
        break;

      case "leadership":
        // Validate descriptive fields for minimum word count
        if (formData.keyInitiatives && getWordCount(formData.keyInitiatives) > 0 && getWordCount(formData.keyInitiatives) < 200) {
          newErrors.keyInitiatives = "Please write at least 200 words";
        }
        if (formData.talentStrategy && getWordCount(formData.talentStrategy) > 0 && getWordCount(formData.talentStrategy) < 100) {
          newErrors.talentStrategy = "Please write at least 100 words";
        }
        if (formData.employeeEngagement && getWordCount(formData.employeeEngagement) > 0 && getWordCount(formData.employeeEngagement) < 100) {
          newErrors.employeeEngagement = "Please write at least 100 words";
        }
        if (formData.deiInitiatives && getWordCount(formData.deiInitiatives) > 0 && getWordCount(formData.deiInitiatives) < 100) {
          newErrors.deiInitiatives = "Please write at least 100 words";
        }
        if (formData.hrTechnology && getWordCount(formData.hrTechnology) > 0 && getWordCount(formData.hrTechnology) < 100) {
          newErrors.hrTechnology = "Please write at least 100 words";
        }
        break;

      case "impact":
        if (formData.quantifiableOutcomes && getWordCount(formData.quantifiableOutcomes) > 0 && getWordCount(formData.quantifiableOutcomes) < 100) {
          newErrors.quantifiableOutcomes = "Please write at least 100 words";
        }
        break;

      case "vision":
        if (formData.hrVision && getWordCount(formData.hrVision) > 0 && getWordCount(formData.hrVision) < 100) {
          newErrors.hrVision = "Please write at least 100 words";
        }
        break;

      case "declaration":
        if (!formData.declarationChecked) {
          newErrors.declarationChecked = "You must accept the declaration to proceed";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save section data
  const saveSectionData = async (sectionName, isFinalSubmit = false) => {
    if (!nominationId) return;

    try {
      const token = sessionStorage.getItem("authToken");
      const formDataSave = new FormData();

      formDataSave.append("final_submit", isFinalSubmit);

      switch (sectionName) {
        case "category":
          formDataSave.append("category_id", formData.categoryId);
          formDataSave.append("nomination_type", formData.nominationType);
          break;

        case "personal":
          if (formData.profileImage) {
            formDataSave.append("profile_image", formData.profileImage);
          }
          formDataSave.append("full_name", formData.fullName || "");
          formDataSave.append("designation", formData.designation || "");
          formDataSave.append("organization", formData.organization || "");

          const { lane1, lane2, city, state, pin } = formData.workAddress;
          let combinedWorkAddress = lane1;
          if (lane2 && lane2.trim().length > 0) combinedWorkAddress += `, ${lane2}`;
          combinedWorkAddress += `, ${city}, ${state} - ${pin}`;
          formDataSave.append("work_address", combinedWorkAddress);

          formDataSave.append("gender", formData.gender || "");
          formDataSave.append("email", formData.email || "");
          formDataSave.append("phone_number", formData.mobile || "");
          formDataSave.append("linkedin_profile", formData.linkedin || "");
          break;

        case "professional":
          formDataSave.append("total_years_of_experience_in_hr", formData.totalExperience || "");
          formDataSave.append("years_with_current_organization", formData.currentOrgExperience || "");
          const educationValue = formData.education === "Other"
            ? formData.educationOther || ""
            : formData.education || "";
          formDataSave.append("educational_qualifications", educationValue);
          formDataSave.append("professional_certifications", formData.certifications || "");
          break;

        case "award":
          formDataSave.append("why_consider", formData.whyConsider || "");

          if (documentUrls.supportingDocs) {
            formDataSave.append("supporting_document", documentUrls.supportingDocs);
          }
          if (documentUrls.cv) {
            formDataSave.append("cv_url", documentUrls.cv);
          }
          if (documentUrls.id_card) {
            formDataSave.append("id_card_url", documentUrls.id_card);
          }
          break;

        case "leadership":
          formDataSave.append("key_initiatives", formData.keyInitiatives || "");
          formDataSave.append("talent_strategy", formData.talentStrategy || "");
          formDataSave.append("employee_engagement", formData.employeeEngagement || "");
          formDataSave.append("dei_initiatives", formData.deiInitiatives || "");
          formDataSave.append("technology_and_innovation", formData.hrTechnology || "");
          break;

        case "impact":
          formDataSave.append("quantifiable_outcomes", formData.quantifiableOutcomes || "");

          if (formData.awards?.length > 0 && documentUrls.awards?.length > 0) {
            const awardsData = formData.awards.map((award, index) => ({
              name: award.title,
              document_url: documentUrls.awards[index] || "",
              description: award.description || "",
              date: award.date || "",
              organization: award.organization || ""
            })).filter(award => award.document_url);

            if (awardsData.length > 0) {
              formDataSave.append("awards_data", JSON.stringify(awardsData));
            }
          }
          break;

        case "vision":
          formDataSave.append("your_vision", formData.hrVision || "");
          formDataSave.append("published_articles", formData.publications || "");
          break;

        case "declaration":
          // formDataSave.append("declaration_date", formData.submissionDate || "");
          break;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/nomination/${nominationId}/section/${sectionName}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataSave,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(`${sectionName} section saved successfully:`, result);
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to save section");
      }
    } catch (error) {
      console.error(`Error saving ${sectionName} section:`, error);
      alert(`Error saving ${sectionName}: ${error.message}`);
      throw error;
    }
  };

  const getWordCount = (text) => {
    return text
      ? text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
      : 0;
  };


  // Handle popup actions
  const handleSaveAndContinue = async () => {
    try {
      if (nominationId && activeSection !== "category") {
        await saveSectionData(activeSection);
      }
      const valid = validateSection(activeSection);
      if (!valid) return;
      setActiveSection(pendingSectionChange);
      setShowSavePopup(false);
      setPendingSectionChange(null);
    } catch (error) {
      console.error("Failed to save section:", error);
    }
  };

  const handleContinueWithoutSaving = () => {
    setActiveSection(pendingSectionChange);
    setShowSavePopup(false);
    setPendingSectionChange(null);
  };

  const handleCancelSectionChange = () => {
    setShowSavePopup(false);
    setPendingSectionChange(null);
  };

  // Handle section change with popup
  const handleSectionChange = (sectionId) => {
    if (sectionId === activeSection) return;

    // For category section or if no nomination ID exists, switch directly
    if (activeSection === "category" || !nominationId) {
      if (activeSection === "category" && !nominationId && formData.categoryId) {
        createOrGetNomination(formData.categoryId).then(() => {
          setActiveSection(sectionId);
        }).catch(error => {
          console.error("Failed to create nomination:", error);
        });
      } else {
        setActiveSection(sectionId);
      }
      return;
    }

    // Show popup for other sections
    setPendingSectionChange(sectionId);
    setShowSavePopup(true);
  };

  // Final submission
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.declarationChecked) {
      setShowDeclarationModal(true);
      return;
    }

    setShowSubmitConfirmModal(true);

    // setIsSubmitting(true);

    // try {
    //   await saveSectionData("declaration", true);
    //   alert("Nomination submitted successfully!");
    //   localStorage.removeItem("hrNominationDraft");
    //   window.location.reload();
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   alert(`Submission failed: ${error.message}`);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleFinalSubmit = async () => {
    setShowSubmitConfirmModal(false);
    setIsSubmitting(true);

    try {
      await saveSectionData("declaration", true);
      alert("Nomination submitted successfully!");
      localStorage.removeItem("hrNominationDraft");
      window.location.reload();
    } catch (error) {
      console.error("Submission error:", error);
      alert(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: "category", title: "Category Selection", icon: "🎯" },
    { id: "personal", title: "Personal Information", icon: "👤" },
    { id: "professional", title: "Professional Profile", icon: "💼" },
    { id: "award", title: "Award Consideration", icon: "🏆" },
    { id: "leadership", title: "Leadership Achievements", icon: "🚀" },
    { id: "impact", title: "Impact & Recognition", icon: "📈" },
    { id: "vision", title: "Vision & Leadership", icon: "🌍" },
    { id: "declaration", title: "Declaration", icon: "📝" },
  ];

  const canProceedToNextSection = () => {
    if (activeSection === "category") {
      return !!formData.categoryId || !!userNomination;
    }
    return true;
  };

  const updateNominationCategory = async (categoryId) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const formDataUpdate = new FormData();
      formDataUpdate.append("category_id", categoryId);
      formDataUpdate.append("nomination_type", "individual");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/nomination/${nominationId}/section/category`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataUpdate,
        }
      );

      if (response.ok) {
        const result = await response.json();
        populateFormWithData(result);
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update nomination category");
      }
    } catch (error) {
      console.error("Error updating nomination category:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const createNominationWithUserInfo = async (categoryId) => {
    try {
      const token = sessionStorage.getItem("authToken");
      const formDataCreate = new FormData();
      formDataCreate.append("category_id", categoryId);
      formDataCreate.append("nomination_type", "individual");

      if (userInfo) {
        formDataCreate.append("full_name", userInfo.name || "");
        formDataCreate.append("organization", userInfo.company_name || "");
        formDataCreate.append("email", userInfo.email || "");
        formDataCreate.append("phone_number", userInfo.phone_number || "");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/fill-nomination`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataCreate,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setNominationId(result.nomination_id);
        console.log('result', result);
        populateFormWithData(result);
        return result;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create nomination");
      }
    } catch (error) {
      console.error("Error creating nomination:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // File display component with remove option
  const FileUploadWithPreview = ({
    fieldName,
    label,
    accept,
    documentType,
    required = false,
    description
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!formData[fieldName] && !documentUrls[fieldName] ? (
        <input
          type="file"
          onChange={(e) => {
            handleFileChange(fieldName, e.target.files, documentType);
            // if (e.target.files?.[0]) {
            //   handleFileUpload(e.target.files[0], documentType, fieldName);
            // }
          }}
          accept={accept}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${required && errors[fieldName] ? "border-red-500" : "border-gray-300"
            }`}
        />
      ) : (
        <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              {formData[fieldName]?.name || 'Previously uploaded file'}
            </div>
            <div className="text-xs text-gray-500">
              {formData[fieldName] ? 'Ready to upload' : 'Already uploaded'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeFile(fieldName)}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
          >
            Remove
          </button>
        </div>
      )}

      {uploadingFiles[fieldName] && (
        <p className="text-blue-500 text-sm">Uploading...</p>
      )}

      {documentUrls[fieldName] && !uploadingFiles[fieldName] && (
        <p className="text-green-500 text-sm">✓ Document uploaded successfully</p>
      )}

      {required && errors[fieldName] && (
        <p className="text-red-500 text-sm">{errors[fieldName]}</p>
      )}

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );

  // Declaration Modal Component
  const DeclarationModal = () => (
    showDeclarationModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Declaration Required
            </h3>
            <p className="text-gray-600 mb-6">
              You must accept the declaration before submitting your nomination.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeclarationModal(false);
                  setActiveSection("declaration");
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Declaration
              </button>
              <button
                onClick={() => setShowDeclarationModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Save confirmation popup
  const SaveConfirmationPopup = () => (
    showSavePopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-xl w-full mx-4">
          <div className="text-center">
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Save Current Section?
            </h3>
            <p className="text-gray-600 mb-6">
              Do you want to save your current changes before switching sections?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSaveAndContinue}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save & Continue
              </button>

              <button
                onClick={handleContinueWithoutSaving}
                title="Continue without saving your changes"
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Skip Saving
              </button>

              <button
                onClick={handleCancelSectionChange}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Render category section
  const renderCategorySection = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
          Category Selection
        </h3>
        {/* <p className="text-red-600 text-sm">
          Only one file can be uploaded for this field. If you have multiple PDFs, please combine them into one and upload it. Accepted formats: PDF (Max 2MB)
        </p> */}

        <div className="space-y-6">
          {/* Show selected category info if one exists */}
          {nominationId && formData.categoryId && (
            <div className="space-y-4">
              <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎯</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      Currently Selected: {categories.find(
                        (cat) => cat.category_id == formData.categoryId
                      )?.category_name || "Loading..."}
                    </div>
                    <div className="text-sm text-blue-600">
                      You can change your selection below
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Always show category selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              {nominationId ? "Change Award Category" : "Select Award Category"} <span className="text-red-500">*</span>
            </label>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <div className="p-6 border-2 border-red-300 bg-red-50 rounded-lg text-center">
                <div className="text-red-600 font-semibold mb-2">⚠️ No Categories Found</div>
                <p className="text-red-600 text-sm mb-4">
                  We couldn't load the award categories. This could be due to:
                </p>
                <ul className="text-red-600 text-sm text-left mb-4 list-disc list-inside">
                  <li>Server connection issue</li>
                  <li>No categories have been created yet</li>
                  <li>Authentication problem</li>
                </ul>
                <button
                  onClick={() => {
                    setLoading(true);
                    const fetchCategories = async () => {
                      try {
                        const token = sessionStorage.getItem("authToken");
                        console.log("Retrying categories fetch...");
                        
                        const res = await fetch(
                          `${import.meta.env.VITE_API_URL}/nomination-categories`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        );

                        if (!res.ok) {
                          throw new Error(`Failed to fetch: ${res.status}`);
                        }

                        const data = await res.json();
                        console.log("Retry successful:", data);
                        
                        if (Array.isArray(data)) {
                          setCategories(data);
                        }
                      } catch (error) {
                        console.error("Retry failed:", error);
                      } finally {
                        setLoading(false);
                      }
                    };
                    fetchCategories();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  🔄 Retry Loading
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.category_id}
                    className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-400 ${formData.categoryId === category.category_id.toString()
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-opacity-20"
                      : errors.categoryId
                        ? "border-red-500"
                        : "border-gray-300 bg-white"
                      }`}
                  >
                    <input
                      type="radio"
                      value={category.category_id}
                      checked={formData.categoryId === category.category_id.toString()}
                      onChange={async (e) => {
                        handleInputChange("categoryId", e.target.value);

                        // Check if nomination already exists
                        if (nominationId) {
                          // Update existing nomination
                          await updateNominationCategory(e.target.value);
                          alert("Category updated successfully!");
                        } else {
                          // Create new nomination
                          await createOrGetNomination(e.target.value);
                        }
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center w-full">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.categoryId === category.category_id.toString()
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300"
                          }`}
                      >
                        {formData.categoryId === category.category_id.toString() && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {category.category_name}
                        </div>
                        {formData.categoryId === category.category_id.toString() && (
                          <div className="text-sm text-blue-600 mt-1">
                            ✓ Currently selected
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {errors.categoryId && (
              <p className="text-red-500 text-sm">{errors.categoryId}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Personal Information
      </h3>
      <p className="text-red-600 text-sm">Only one file can be uploaded for this field. If you have multiple filess, please combine them into one and upload it. Accepted formats: PNG, JPEG, JPG (Max 2MB)</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            disabled
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            placeholder="Enter your full name"
          />
          <p className="text-xs text-gray-500">
            This field is auto-filled from your profile
          </p>
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Designation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.designation ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="e.g., Senior HR Manager"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            disabled
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            placeholder="Your company name"
          />
          <p className="text-xs text-gray-500">
            This field is auto-filled from your profile
          </p>
          {errors.organization && (
            <p className="text-red-500 text-sm">{errors.organization}</p>
          )}
        </div>

        <div className="relative space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email ID <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled
            className={`w-full pr-20 px-4 py-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="your.email@company.com"
          />
          <span
            className="absolute right-3 top-[46px] text-blue-600 font-semibold text-sm select-none"
            title="Verified"
          >
            Verified
          </span>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="+91 9876543210"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        <FileUploadWithPreview
          fieldName="profileImage"
          label="Profile Image"
          accept=".jpg,.jpeg,.png"
          documentType="profile_image"
          required={true}
          description="Upload your profile picture (JPG, PNG - Max 200KB)"
        />

        {/* Work Address Fields */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Work Address <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Lane 1 *"
                value={formData.workAddress.lane1}
                onChange={(e) => handleInputChange("workAddress.lane1", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors["workAddress.lane1"] ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors["workAddress.lane1"] && (
                <p className="text-red-500 text-sm">{errors["workAddress.lane1"]}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Lane 2"
                value={formData.workAddress.lane2}
                onChange={(e) => handleInputChange("workAddress.lane2", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* City, State, PIN */}
        <div className="md:col-span-2 space-y-2">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="City *"
                value={formData.workAddress.city}
                onChange={(e) => handleInputChange("workAddress.city", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors["workAddress.city"] ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors["workAddress.city"] && (
                <p className="text-red-500 text-sm">{errors["workAddress.city"]}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="State *"
                value={formData.workAddress.state}
                onChange={(e) => handleInputChange("workAddress.state", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors["workAddress.state"] ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors["workAddress.state"] && (
                <p className="text-red-500 text-sm">{errors["workAddress.state"]}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="PIN Code *"
                value={formData.workAddress.pin}
                onChange={(e) => handleInputChange("workAddress.pin", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors["workAddress.pin"] ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors["workAddress.pin"] && (
                <p className="text-red-500 text-sm">{errors["workAddress.pin"]}</p>
              )}
            </div>
          </div>
        </div>

        {/* Gender Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm">{errors.linkedin}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfessionalSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Professional Profile
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Total Years of Experience in HR <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={formData.totalExperience}
            onChange={(e) => handleInputChange("totalExperience", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.totalExperience ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="e.g., 5.5"
          />
          {errors.totalExperience && (
            <p className="text-red-500 text-sm">{errors.totalExperience}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Years with Current Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={formData.currentOrgExperience}
            onChange={(e) => handleInputChange("currentOrgExperience", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.currentOrgExperience ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="e.g., 2.5"
          />
          {errors.currentOrgExperience && (
            <p className="text-red-500 text-sm">{errors.currentOrgExperience}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Educational Qualifications <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.education}
            onChange={(e) => handleInputChange("education", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.education ? "border-red-500" : "border-gray-300"
              }`}
          >
            <option value="">Select your highest qualification</option>
            {educationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.education && (
            <p className="text-red-500 text-sm">{errors.education}</p>
          )}
        </div>
        {formData.education === "Other" && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify your qualification <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.educationOther || ""}
              onChange={(e) => handleInputChange("educationOther", e.target.value)}
              placeholder="Enter your educational qualification"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.educationOther ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.educationOther && (
              <p className="text-red-500 text-sm">{errors.educationOther}</p>
            )}
          </div>
        )}

        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Professional Certifications
          </label>
          <textarea
            value={formData.certifications}
            onChange={(e) => handleInputChange("certifications", e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="e.g., SHRM-CP, HRCI PHR, NLP Practitioner, etc."
          />
          <p className="text-sm text-gray-500">
            Examples: SHRM, HRCI, NLP, etc.
          </p>
        </div>
      </div>
    </div>
  );

  const renderAwardSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Why should you be considered for this award?
      </h3>
      <p className="text-red-600 text-sm">Only one file can be uploaded for this field. If you have multiple PDFs, please combine them into one and upload it. Accepted formats: PDF (Max 2MB)</p>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Highlight your most impactful HR contributions, leadership initiatives, measurable outcomes, and alignment with the award category
          </label>
          <textarea
            value={formData.whyConsider}
            required
            onChange={(e) => handleInputChange("whyConsider", e.target.value)}
            rows="8"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.whyConsider ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Describe your most impactful contributions..."
          />
          <div className="flex justify-between items-center">
            <div
              className={`text-sm ${getWordCount(formData.whyConsider) > 0 && getWordCount(formData.whyConsider) < 200
                ? "text-orange-500"
                : getWordCount(formData.whyConsider) > 500
                  ? "text-red-500"
                  : "text-gray-500"
                }`}
            >
              {getWordCount(formData.whyConsider)}/500 words
              {getWordCount(formData.whyConsider) > 0 && getWordCount(formData.whyConsider) < 200 && (
                <span className="text-orange-500"> (Min: 200 words)</span>
              )}
            </div>
          </div>
          {errors.whyConsider && (
            <p className="text-red-500 text-sm">{errors.whyConsider}</p>
          )}
        </div>

        {/* File Upload Fields with Remove Option */}
        <FileUploadWithPreview
          fieldName="supportingDocs"
          label="Supporting Documents"
          accept=".pdf"
          documentType="supporting_documents"
          description="Only one file can be uploaded for this field. If you have multiple PDFs, please combine them into one and upload it. Accepted formats: PDF (Max 2MB)"
        />

        <FileUploadWithPreview
          fieldName="cv"
          label="CV"
          accept=".pdf"
          documentType="cv_documents"
          required={true}
          description="Accepted formats: PDF (Max 2MB)"
        />

        <FileUploadWithPreview
          fieldName="id_card"
          label="Company Identity Card"
          accept=".pdf"
          documentType="id_card_documents"
          required={true}
          description="Accepted formats: PDF (Max 2MB)"
        />
      </div>
    </div>
  );

  const renderLeadershipSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Leadership Achievements
      </h3>
      <p className="text-red-600 text-sm">Only one file can be uploaded for this field. If you have multiple PDFs, please combine them into one and upload it. Accepted formats: PDF (Max 2MB)</p>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Key HR Initiatives Led in the Last 2 Years
          </label>
          <textarea
            value={formData.keyInitiatives}
            onChange={(e) => handleInputChange("keyInitiatives", e.target.value)}
            rows="6"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.keyInitiatives ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Describe at least 2 major initiatives: objectives, implementation strategy, and organizational impact"
          />
          <div
            className={`text-sm ${getWordCount(formData.keyInitiatives) > 0 && getWordCount(formData.keyInitiatives) < 200
              ? "text-orange-500"
              : getWordCount(formData.keyInitiatives) > 300
                ? "text-red-500"
                : "text-gray-500"
              }`}
          >
            {getWordCount(formData.keyInitiatives)}/300 words
            {getWordCount(formData.keyInitiatives) > 0 && getWordCount(formData.keyInitiatives) < 200 && (
              <span className="text-orange-500"> (Min: 200 words)</span>
            )}
          </div>
          {errors.keyInitiatives && (
            <p className="text-red-500 text-sm">{errors.keyInitiatives}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Talent Acquisition & Development Strategy
            </label>
            <textarea
              value={formData.talentStrategy}
              onChange={(e) => handleInputChange("talentStrategy", e.target.value)}
              rows="5"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.talentStrategy ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="How have you transformed talent pipelines, campus relations, or early career hiring?"
            />
            <div
              className={`text-sm ${getWordCount(formData.talentStrategy) > 0 && getWordCount(formData.talentStrategy) < 100
                ? "text-orange-500"
                : getWordCount(formData.talentStrategy) > 250
                  ? "text-red-500"
                  : "text-gray-500"
                }`}
            >
              {getWordCount(formData.talentStrategy)}/250 words
              {getWordCount(formData.talentStrategy) > 0 && getWordCount(formData.talentStrategy) < 100 && (
                <span className="text-orange-500"> (Min: 100 words)</span>
              )}
            </div>
            {errors.talentStrategy && (
              <p className="text-red-500 text-sm">{errors.talentStrategy}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Employee Engagement & Retention
            </label>
            <textarea
              value={formData.employeeEngagement}
              onChange={(e) => handleInputChange("employeeEngagement", e.target.value)}
              rows="5"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.employeeEngagement ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Key practices implemented to enhance satisfaction and reduce attrition"
            />
            <div
              className={`text-sm ${getWordCount(formData.employeeEngagement) > 0 && getWordCount(formData.employeeEngagement) < 100
                ? "text-orange-500"
                : getWordCount(formData.employeeEngagement) > 250
                  ? "text-red-500"
                  : "text-gray-500"
                }`}
            >
              {getWordCount(formData.employeeEngagement)}/250 words
              {getWordCount(formData.employeeEngagement) > 0 && getWordCount(formData.employeeEngagement) < 100 && (
                <span className="text-orange-500"> (Min: 100 words)</span>
              )}
            </div>
            {errors.employeeEngagement && (
              <p className="text-red-500 text-sm">{errors.employeeEngagement}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Diversity, Equity, and Inclusion (DEI)
            </label>
            <textarea
              value={formData.deiInitiatives}
              onChange={(e) => handleInputChange("deiInitiatives", e.target.value)}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.deiInitiatives ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Specific DEI initiatives or practices introduced or championed"
            />
            <div
              className={`text-sm ${getWordCount(formData.deiInitiatives) > 0 && getWordCount(formData.deiInitiatives) < 100
                ? "text-orange-500"
                : getWordCount(formData.deiInitiatives) > 200
                  ? "text-red-500"
                  : "text-gray-500"
                }`}
            >
              {getWordCount(formData.deiInitiatives)}/200 words
              {getWordCount(formData.deiInitiatives) > 0 && getWordCount(formData.deiInitiatives) < 100 && (
                <span className="text-orange-500"> (Min: 100 words)</span>
              )}
            </div>
            {errors.deiInitiatives && (
              <p className="text-red-500 text-sm">{errors.deiInitiatives}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Technology & Innovation in HR
            </label>
            <textarea
              value={formData.hrTechnology}
              onChange={(e) => handleInputChange("hrTechnology", e.target.value)}
              rows="4"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.hrTechnology ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="How you've leveraged HRTech (AI, analytics, automation) for strategic transformation"
            />
            <div
              className={`text-sm ${getWordCount(formData.hrTechnology) > 0 && getWordCount(formData.hrTechnology) < 100
                ? "text-orange-500"
                : getWordCount(formData.hrTechnology) > 200
                  ? "text-red-500"
                  : "text-gray-500"
                }`}
            >
              {getWordCount(formData.hrTechnology)}/200 words
              {getWordCount(formData.hrTechnology) > 0 && getWordCount(formData.hrTechnology) < 100 && (
                <span className="text-orange-500"> (Min: 100 words)</span>
              )}
            </div>
            {errors.hrTechnology && (
              <p className="text-red-500 text-sm">{errors.hrTechnology}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisionSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Vision and Thought Leadership
      </h3>
      <p className="text-red-600 text-sm">Only one file can be uploaded for this field. If you have multiple PDFs, please combine them into one and upload it. Accepted formats: PDF (Max 2MB)</p>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Vision for the Future of HR in India
          </label>
          <textarea
            value={formData.hrVision}
            onChange={(e) => handleInputChange("hrVision", e.target.value)}
            rows="6"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.hrVision ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Share your vision for the future of HR in India"
          />
          <div
            className={`text-sm ${getWordCount(formData.hrVision) > 0 && getWordCount(formData.hrVision) < 100
              ? "text-orange-500"
              : getWordCount(formData.hrVision) > 250
                ? "text-red-500"
                : "text-gray-500"
              }`}
          >
            {getWordCount(formData.hrVision)}/250 words
            {getWordCount(formData.hrVision) > 0 && getWordCount(formData.hrVision) < 100 && (
              <span className="text-orange-500"> (Min: 100 words)</span>
            )}
          </div>
          {errors.hrVision && (
            <p className="text-red-500 text-sm">{errors.hrVision}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Published Articles / White Papers / Speaker Engagements
          </label>
          <textarea
            value={formData.publications}
            onChange={(e) => handleInputChange("publications", e.target.value)}
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="List notable conferences, journals, events where you've shared HR insights"
          />
        </div>
      </div>
    </div>
  );

  const renderImpactSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Measurable Impact & Recognition
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Quantifiable Outcomes from Your HR Leadership
          </label>
          <textarea
            value={formData.quantifiableOutcomes}
            onChange={(e) => handleInputChange("quantifiableOutcomes", e.target.value)}
            rows="5"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.quantifiableOutcomes ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="KPIs such as improved retention %, faster TAT in hiring, engagement scores, etc."
          />
          <div
            className={`text-sm ${getWordCount(formData.quantifiableOutcomes) > 0 && getWordCount(formData.quantifiableOutcomes) < 100
              ? "text-orange-500"
              : getWordCount(formData.quantifiableOutcomes) > 200
                ? "text-red-500"
                : "text-gray-500"
              }`}
          >
            {getWordCount(formData.quantifiableOutcomes)}/200 words
            {getWordCount(formData.quantifiableOutcomes) > 0 && getWordCount(formData.quantifiableOutcomes) < 100 && (
              <span className="text-orange-500"> (Min: 100 words)</span>
            )}
          </div>
          {errors.quantifiableOutcomes && (
            <p className="text-red-500 text-sm">{errors.quantifiableOutcomes}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Awards & Recognitions (Internal/External)
          </label>

          {formData.awards.map((award, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg mb-4 relative bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => removeAward(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-xl leading-none"
                title="Remove award"
              >
                &times;
              </button>

              <div className="space-y-4">
                {/* Award Title Input */}
                <div className="pr-8">
                  <input
                    type="text"
                    value={award.title || ''}
                    onChange={(e) => handleInputChange(`awards[${index}].title`, e.target.value)}
                    placeholder="Award Name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors[`awards[${index}].title`] ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors[`awards[${index}].title`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`awards[${index}].title`]}
                    </p>
                  )}
                </div>

                {/* Award Document Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Award Document
                  </label>
                  {!formData.awards[index]?.document && !documentUrls.awards?.[index] ? (
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          // Update the awards array with the document
                          const updatedAwards = [...formData.awards];
                          updatedAwards[index] = {
                            ...updatedAwards[index],
                            document: e.target.files[0]
                          };
                          setFormData(prev => ({ ...prev, awards: updatedAwards }));

                          // Upload the document
                          handleAwardDocumentUpload(e.target.files[0], index);
                        }
                      }}
                      accept=".pdf"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {formData.awards[index]?.document?.name || 'Award document uploaded'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formData.awards[index]?.document ? 'Ready to upload' : 'Already uploaded'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAwardDocument(index)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {uploadingFiles[`award_${index}`] && (
                    <p className="text-blue-500 text-sm">Uploading...</p>
                  )}
                  {documentUrls.awards?.[index] && !uploadingFiles[`award_${index}`] && (
                    <p className="text-green-500 text-sm">✓ Document uploaded successfully</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Only one file can be uploaded for this field. If you have multiple PDFs,
                    please combine them into one and upload it. Accepted formats: PDF (Max 2MB)
                  </p>
                </div>
              </div>
            </div>
          ))}

          {formData.awards.length < 3 && (
            <button
              type="button"
              onClick={addAward}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span className="text-lg">+</span>
              Add Award
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderDeclarationSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-2">
        Declaration
      </h3>
      {/* <p className="text-red-600 text-sm">Only one file can be uploaded for this field. If you have multiple PDFs, please combine them into one and upload it. Accepted formats: PDF (Max 2MB)</p> */}

      <div className="mt-2 p-6 border border-gray-300 rounded-lg bg-white shadow-sm">
        <label className="inline-flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.declarationChecked}
            onChange={(e) => handleInputChange("declarationChecked", e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-800">
            I hereby certify that all the information provided is true and accurate. I authorize EduSkills to verify the details for award evaluation purposes.
          </span>
        </label>
        {errors.declarationChecked && (
          <p className="text-red-500 text-sm mt-1">{errors.declarationChecked}</p>
        )}

        {/* <div className="mt-4 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.submissionDate}
            onChange={(e) => handleInputChange("submissionDate", e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.submissionDate ? "border-red-500" : "border-gray-300"
              }`}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.submissionDate && (
            <p className="text-red-500 text-sm mt-1">{errors.submissionDate}</p>
          )}
        </div> */}
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "category":
        return renderCategorySection();
      case "personal":
        return renderPersonalSection();
      case "professional":
        return renderProfessionalSection();
      case "award":
        return renderAwardSection();
      case "leadership":
        return renderLeadershipSection();
      case "impact":
        return renderImpactSection();
      case "vision":
        return renderVisionSection();
      case "declaration":
        return renderDeclarationSection();
      default:
        return renderCategorySection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Dialog open={showSubmitConfirmModal} onOpenChange={setShowSubmitConfirmModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Please Confirm</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your final nomination?{" "}
              <strong>Once submitted, this nomination can't be edited.</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowSubmitConfirmModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFinalSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Yes, Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-80 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">HR Award Nomination</h2>
                <div className="w-16 h-1 bg-orange-500 mx-auto rounded"></div>
              </div>

              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeSection === section.id
                      ? "bg-orange-500 text-white shadow-lg transform translate-x-1"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-blue-700/50 rounded-lg">
                <p className="text-xs text-blue-100">
                  💡 <strong>Tip:</strong> Your progress is automatically saved as you complete each section.
                </p>
              </div>

              {userInfo && (
                <div className="mt-6 p-3 bg-blue-700/30 rounded-lg">
                  <p className="text-xs text-blue-100 font-medium">Logged in as:</p>
                  <p className="text-sm text-white">{userInfo.name}</p>
                  <p className="text-xs text-blue-200">{userInfo.company_name}</p>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              <form onSubmit={onSubmit} className="space-y-8">
                {renderCurrentSection()}

                {/* Navigation & Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                  <div className="flex-1" />

                  {activeSection !== "declaration" && canProceedToNextSection() && (
                    <button
                      type="button"
                      onClick={async () => {
                        const valid = validateSection(activeSection);
                        if (!valid) return;
                        const currentIndex = sections.findIndex((s) => s.id === activeSection);
                        if (currentIndex < sections.length - 1) {
                          handleSectionChange(sections[currentIndex + 1].id);
                        }
                      }}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      Save & Proceed →
                    </button>
                  )}

                  {activeSection === "declaration" && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="opacity-25"
                            />
                            <path
                              fill="currentColor"
                              className="opacity-75"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "🚀 Submit Nomination"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Declaration Modal */}
      <DeclarationModal />

      {/* Save Confirmation Popup */}
      <SaveConfirmationPopup />
    </div>
  );
};

export default HRNominationForm;
