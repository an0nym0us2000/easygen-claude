"use client";

import { Save, Copy, Edit, Send } from "lucide-react";
import toast from "react-hot-toast";

interface PostPreviewProps {
  content: string;
  isGenerating: boolean;
}

export default function PostPreview({ content, isGenerating }: PostPreviewProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleSave = () => {
    toast.success("Post saved to drafts!");
  };

  const handleEdit = () => {
    toast.success("Opening editor...");
  };

  const handlePublish = () => {
    toast.success("Post scheduled for publishing!");
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Post Preview
        </h3>
        {content && (
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-card-bg rounded-lg transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4 text-text-secondary" />
            </button>
            <button
              onClick={handleSave}
              className="p-2 hover:bg-card-bg rounded-lg transition-colors"
              title="Save"
            >
              <Save className="w-4 h-4 text-text-secondary" />
            </button>
            <button
              onClick={handleEdit}
              className="p-2 hover:bg-card-bg rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        )}
      </div>

      {/* Preview Content */}
      <div className="bg-white border border-border rounded-xl p-6 min-h-[400px]">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-text-secondary">Generating your post...</p>
          </div>
        ) : content ? (
          <div className="space-y-4">
            {/* Mock LinkedIn Post */}
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <p className="font-semibold text-text-primary">John Doe</p>
                <p className="text-xs text-text-secondary">
                  Content Creator • 2nd
                </p>
                <p className="text-xs text-text-secondary">Just now</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="whitespace-pre-wrap text-text-primary leading-relaxed">
              {content}
            </div>

            {/* Mock Engagement */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>0 reactions</span>
                <span>0 comments • 0 reposts</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-16 h-16 bg-card-bg rounded-full flex items-center justify-center mb-4">
              <Edit className="w-8 h-8 text-text-secondary" />
            </div>
            <p className="text-text-secondary">
              Your generated post will appear here
            </p>
            <p className="text-sm text-text-secondary mt-2">
              Enter a topic and click Generate Post to begin
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {content && !isGenerating && (
        <div className="flex space-x-3 mt-4">
          <button onClick={handleSave} className="btn-secondary flex-1">
            Save Draft
          </button>
          <button onClick={handlePublish} className="btn-primary flex-1 flex items-center justify-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      )}
    </div>
  );
}
