"use client";

import { useState } from "react";
import { Plus, Calendar, Edit, Trash2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  date: Date;
  status: "draft" | "scheduled" | "published";
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Remote Work",
    content: "🚀 The remote work revolution isn't just about working from home...\n\nIt's about:\n→ Redefining productivity\n→ Building trust-based teams\n→ Creating global opportunities\n\nWhat's your take on remote work? Share below! 👇\n\n#RemoteWork #FutureOfWork #Productivity",
    date: new Date(2025, 10, 10),
    status: "draft",
  },
  {
    id: "2",
    title: "AI and Creative Industries",
    content: "💡 AI isn't replacing creativity—it's amplifying it.\n\nHere's what I've learned:\n\n1. AI handles the repetitive\n2. Humans focus on the strategic\n3. Together, we achieve more\n\nThe future is collaborative, not competitive.\n\n#AI #Creativity #Innovation",
    date: new Date(2025, 10, 9),
    status: "draft",
  },
  {
    id: "3",
    title: "Building Personal Brands",
    content: "Your personal brand isn't what you say about yourself.\n\nIt's what others say about you when you're not in the room.\n\nConsistency > Perfection\nAuthenticity > Polish\nValue > Vanity Metrics\n\n#PersonalBrand #LinkedInTips #ContentCreation",
    date: new Date(2025, 10, 8),
    status: "scheduled",
  },
];

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(posts[0]);
  const [editedContent, setEditedContent] = useState(posts[0]?.content || "");

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setEditedContent(post.content);
  };

  const handleSavePost = () => {
    if (selectedPost) {
      setPosts(posts.map(p =>
        p.id === selectedPost.id
          ? { ...p, content: editedContent }
          : p
      ));
      toast.success("Post saved successfully!");
    }
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    if (selectedPost?.id === id) {
      setSelectedPost(posts[0] || null);
      setEditedContent(posts[0]?.content || "");
    }
    toast.success("Post deleted");
  };

  const handleNewPost = () => {
    toast.success("Redirecting to Generate Post...");
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            My Posts
          </h1>
          <p className="text-text-secondary">
            Manage your drafts and scheduled content
          </p>
        </div>
        <button onClick={handleNewPost} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Posts List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text-primary">
              All Posts ({posts.length})
            </h2>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => handleSelectPost(post)}
                className={`card p-4 w-full text-left transition-all hover:scale-[1.02] ${
                  selectedPost?.id === post.id
                    ? "ring-2 ring-primary shadow-medium"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      post.status === "draft"
                        ? "bg-gray-100 text-gray-600"
                        : post.status === "scheduled"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {post.content}
                </p>
                <div className="flex items-center text-xs text-text-secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  {format(post.date, "MMM d, yyyy")}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="lg:col-span-2">
          {selectedPost ? (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">
                  Edit Post
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={selectedPost.title}
                  onChange={(e) =>
                    setSelectedPost({ ...selectedPost, title: e.target.value })
                  }
                  className="input-field"
                />
              </div>

              {/* Content Editor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Content
                </label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="input-field resize-none h-80"
                />
                <p className="text-xs text-text-secondary mt-2">
                  {editedContent.length} characters
                </p>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Preview
                </label>
                <div className="bg-white border border-border rounded-xl p-4">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">John Doe</p>
                      <p className="text-xs text-text-secondary">
                        Content Creator • Just now
                      </p>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap text-text-primary leading-relaxed">
                    {editedContent}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <button onClick={handleSavePost} className="btn-secondary flex-1">
                  <Edit className="w-4 h-4 mr-2 inline" />
                  Save Draft
                </button>
                <button className="btn-primary flex-1">
                  <Send className="w-4 h-4 mr-2 inline" />
                  Schedule Post
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="w-16 h-16 bg-card-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit className="w-8 h-8 text-text-secondary" />
              </div>
              <p className="text-text-secondary">
                Select a post to edit or create a new one
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
