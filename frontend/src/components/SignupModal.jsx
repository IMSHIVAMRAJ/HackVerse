"use client";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
    profilePicPreview: "",
    skills: [],
    github: "",
    linkedin: "",
  });
  const [skillInput, setSkillInput] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        profilePic: file,
        profilePicPreview: previewUrl,
      }));
    }
  };

  const removeProfilePic = () => {
    // Clean up the preview URL to prevent memory leaks
    if (formData.profilePicPreview) {
      URL.revokeObjectURL(formData.profilePicPreview);
    }

    setFormData((prev) => ({
      ...prev,
      profilePic: null,
      profilePicPreview: "",
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      if (formData.profilePic) {
        submitData.append("profilePic", formData.profilePic);
      }
      submitData.append("skills", JSON.stringify(formData.skills));
      submitData.append("github", formData.github);
      submitData.append("linkedin", formData.linkedin);

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/signup`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("✅ Signup Success:", res.data);
      alert("Signup successful!");
      onClose();
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data || err.message);
      alert(
        "Signup failed: " +
          (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  const renderStep1 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className="flex w-full h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          className="flex w-full h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password *
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          className="flex w-full h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700"
        >
          Confirm Password *
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          className="flex w-full h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <button
        onClick={nextStep}
        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
      >
        Next Step
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Profile Picture
        </label>

        {/* File Upload Area */}
        <div className="flex flex-col items-center space-y-4">
          {formData.profilePicPreview ? (
            <div className="relative">
              <img
                src={formData.profilePicPreview || "/placeholder.svg"}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
              />
              <button
                onClick={removeProfilePic}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}

          <div className="flex flex-col items-center">
            <label
              htmlFor="profilePicFile"
              className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              {formData.profilePic ? "Change Photo" : "Upload Photo"}
            </label>
            <input
              id="profilePicFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max size: 5MB (JPG, PNG, GIF)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="github" className="text-sm font-medium text-gray-700">
          GitHub Profile
        </label>
        <input
          id="github"
          name="github"
          type="url"
          value={formData.github}
          onChange={handleInputChange}
          placeholder="https://github.com/yourusername"
          className="flex w-full h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="linkedin" className="text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          id="linkedin"
          name="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={handleInputChange}
          placeholder="https://linkedin.com/in/yourusername"
          className="flex w-full h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={prevStep}
          className="flex-1 h-12 border border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition-all duration-300"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="skillInput"
          className="text-sm font-medium text-gray-700"
        >
          Skills & Technologies
        </label>
        <div className="flex space-x-2">
          <input
            id="skillInput"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., React, Python, Node.js"
            className="flex-1 h-12 rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            onClick={addSkill}
            type="button"
            className="px-4 h-12 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Add
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Press Enter or click Add to add a skill
        </p>
      </div>

      {formData.skills.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Your Skills:
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={prevStep}
          className="flex-1 h-12 border border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition-all duration-300"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Create Account
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-[500px] mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Join Hackverse
              </h2>
              <p className="text-gray-600 mt-2">
                {currentStep === 1 && "Let's start with the basics"}
                {currentStep === 2 && "Tell us about your online presence"}
                {currentStep === 3 && "What are your skills?"}
              </p>

              {/* Progress Indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full ${
                      step <= currentStep ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Steps */}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Separator */}
            <div className="my-6">
              <div className="h-[1px] w-full bg-gray-200"></div>
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
              >
                Sign in here
              </button>
            </div>

            {currentStep === 1 && (
              <div className="text-center text-sm text-gray-600 mt-4">
                By signing up, you agree to our{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
