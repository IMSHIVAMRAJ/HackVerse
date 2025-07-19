"use client"

import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { getAuthToken } from "../utils/auth"

const UpdateRequirementModal = ({ isOpen, onClose, requirement, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    teamName: "",
    message: "",
    currentMembers: "",
    requiredMembers: "",
    domains: "",
    skillsNeeded: "",
    linkedinProfile: "",
    email: "",
    expiryDate: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Populate form with existing requirement data
  useEffect(() => {
    if (requirement && isOpen) {
      setFormData({
        teamName: requirement.teamName || "",
        message: requirement.message || "",
        currentMembers: requirement.currentMembers?.toString() || "",
        requiredMembers: requirement.requiredMembers?.toString() || "",
        domains: requirement.domains || "",
        skillsNeeded: requirement.skillsNeeded || requirement.skillNeeded || "",
        linkedinProfile: requirement.linkedinProfile || "",
        email: requirement.email || "",
        expiryDate: requirement.expiryDate ? new Date(requirement.expiryDate).toISOString().split("T")[0] : "",
      })
    }
  }, [requirement, isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const token = getAuthToken()

      if (!token) {
        throw new Error("Please log in to update requirement")
      }

      const response = await fetch(`http://localhost:5000/api/requirements/${requirement._id || requirement.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          teamName: formData.teamName,
          message: formData.message,
          currentMembers: Number.parseInt(formData.currentMembers),
          requiredMembers: Number.parseInt(formData.requiredMembers),
          domains: formData.domains,
          skillsNeeded: formData.skillsNeeded,
          linkedinProfile: formData.linkedinProfile,
          email: formData.email,
          expiryDate: formData.expiryDate,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 401) {
          throw new Error("Session expired. Please login again.")
        }

        throw new Error(errorData.message || `Failed to update requirement: ${response.status}`)
      }

      const result = await response.json()
      console.log("Requirement updated successfully:", result)

      setSubmitSuccess(true)

      // Call success callback with updated data
      setTimeout(() => {
        onUpdateSuccess(result.data || result)
        setSubmitSuccess(false)
      }, 1500)
    } catch (error) {
      console.error("Error updating requirement:", error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitError("")
      setSubmitSuccess(false)
      onClose()
    }
  }

  // Don't render anything if modal is not open
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={handleClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
            <h2 className="text-2xl font-bold text-purple-800">Update Requirement</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1 disabled:opacity-50"
              type="button"
              disabled={isSubmitting}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mx-6 mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Requirement updated successfully!</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mx-6 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Error: {submitError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Team Name */}
            <div className="space-y-2">
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
                Team Name *
              </label>
              <input
                id="teamName"
                name="teamName"
                type="text"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter your team name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell others about your team and what you're building..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Current and Required Members */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="currentMembers" className="block text-sm font-medium text-gray-700">
                  Current Members *
                </label>
                <input
                  id="currentMembers"
                  name="currentMembers"
                  type="number"
                  min="0"
                  value={formData.currentMembers}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="requiredMembers" className="block text-sm font-medium text-gray-700">
                  Members Needed *
                </label>
                <input
                  id="requiredMembers"
                  name="requiredMembers"
                  type="number"
                  min="1"
                  value={formData.requiredMembers}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Domains */}
            <div className="space-y-2">
              <label htmlFor="domains" className="block text-sm font-medium text-gray-700">
                Domains *
              </label>
              <textarea
                id="domains"
                name="domains"
                value={formData.domains}
                onChange={handleChange}
                placeholder="e.g., Frontend, Backend, UI/UX, AI/ML, Mobile Development"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Skills Needed */}
            <div className="space-y-2">
              <label htmlFor="skillsNeeded" className="block text-sm font-medium text-gray-700">
                Skills Needed *
              </label>
              <textarea
                id="skillsNeeded"
                name="skillsNeeded"
                value={formData.skillsNeeded}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, Python, Figma, AWS, Machine Learning"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* LinkedIn Profile */}
            <div className="space-y-2">
              <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">
                LinkedIn Profile *
              </label>
              <input
                id="linkedinProfile"
                name="linkedinProfile"
                type="url"
                value={formData.linkedinProfile}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date *
              </label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Requirement"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateRequirementModal
