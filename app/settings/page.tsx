"use client";

import { useState } from "react";
import { Upload, Check, Linkedin } from "lucide-react";
import toast from "react-hot-toast";

const jobDescriptions = [
  "Content Creator",
  "Marketing Manager",
  "Entrepreneur",
  "Software Engineer",
  "Product Designer",
  "Sales Professional",
  "Consultant",
  "Founder/CEO",
  "Other",
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"info" | "preferences">("info");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    linkedinUrl: "linkedin.com/in/johndoe",
    timezone: "America/New_York",
    jobDescription: ["Content Creator", "Entrepreneur"],
  });
  const [preferences, setPreferences] = useState({
    aiTone: "Balanced and professional with a touch of personality",
    contentLength: "medium",
    emojiUsage: "moderate",
    hashtagCount: "3-5",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile photo uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJobDescriptionToggle = (job: string) => {
    setFormData({
      ...formData,
      jobDescription: formData.jobDescription.includes(job)
        ? formData.jobDescription.filter(j => j !== job)
        : [...formData.jobDescription, job],
    });
  };

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Account Settings
        </h1>
        <p className="text-text-secondary">
          Manage your profile and AI preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-border mb-6">
        <button
          onClick={() => setActiveTab("info")}
          className={`pb-3 px-1 transition-all ${
            activeTab === "info" ? "tab-active" : "tab-inactive"
          }`}
        >
          My Info
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`pb-3 px-1 transition-all ${
            activeTab === "preferences" ? "tab-active" : "tab-inactive"
          }`}
        >
          Preferences
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "info" ? (
        <div className="space-y-6">
          {/* Profile Photo */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Profile Photo
            </h3>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {formData.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors shadow-md"
                >
                  <Upload className="w-4 h-4 text-white" />
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm text-text-primary font-medium mb-1">
                  Upload a new photo
                </p>
                <p className="text-xs text-text-secondary">
                  JPG, PNG or GIF (max. 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="text"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="input-field"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Central European Time</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                  <option value="Asia/Singapore">Singapore (SGT)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Job Description
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Select all that apply to help personalize your content
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {jobDescriptions.map((job) => (
                <button
                  key={job}
                  onClick={() => handleJobDescriptionToggle(job)}
                  className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    formData.jobDescription.includes(job)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-white text-text-primary hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{job}</span>
                    {formData.jobDescription.includes(job) && (
                      <Check className="w-4 h-4 ml-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* AI Preferences */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Fine-tune Your AI Preferences
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Customize how AI generates content for you
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Default AI Tone & Style
                </label>
                <textarea
                  value={preferences.aiTone}
                  onChange={(e) => setPreferences({ ...preferences, aiTone: e.target.value })}
                  className="input-field resize-none h-24"
                  placeholder="Describe your preferred writing style..."
                />
                <p className="text-xs text-text-secondary mt-2">
                  Example: "Professional but approachable, with storytelling elements and actionable insights"
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preferred Content Length
                </label>
                <select
                  value={preferences.contentLength}
                  onChange={(e) => setPreferences({ ...preferences, contentLength: e.target.value })}
                  className="input-field"
                >
                  <option value="short">Short (100-150 words)</option>
                  <option value="medium">Medium (150-250 words)</option>
                  <option value="long">Long (250-400 words)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Emoji Usage
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["minimal", "moderate", "frequent"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setPreferences({ ...preferences, emojiUsage: option })}
                      className={`p-3 rounded-xl border-2 transition-all capitalize ${
                        preferences.emojiUsage === option
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-border bg-white text-text-primary hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Hashtag Count
                </label>
                <select
                  value={preferences.hashtagCount}
                  onChange={(e) => setPreferences({ ...preferences, hashtagCount: e.target.value })}
                  className="input-field"
                >
                  <option value="none">No hashtags</option>
                  <option value="1-2">1-2 hashtags</option>
                  <option value="3-5">3-5 hashtags</option>
                  <option value="6+">6+ hashtags</option>
                </select>
              </div>
            </div>
          </div>

          {/* Content Guidelines */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Content Guidelines
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Set boundaries for what AI should avoid
            </p>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                <div>
                  <p className="text-sm font-medium text-text-primary">Avoid controversial topics</p>
                  <p className="text-xs text-text-secondary">Skip politics, religion, and sensitive subjects</p>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                <div>
                  <p className="text-sm font-medium text-text-primary">Professional language only</p>
                  <p className="text-xs text-text-secondary">Maintain workplace-appropriate tone</p>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Include call-to-action</p>
                  <p className="text-xs text-text-secondary">End posts with engagement prompts</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="sticky bottom-6 mt-8">
        <button onClick={handleSaveChanges} className="btn-primary w-full py-4 shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
