"use client";

import { useState } from "react";
import { Copy, Bookmark, Repeat2, Heart, MessageCircle, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

interface TrendingPost {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  likes: number;
  comments: number;
  reposts: number;
  outlierIndex: number;
  timeAgo: string;
}

const mockTrendingPosts: TrendingPost[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    authorRole: "Product Designer",
    content: "The best product decisions come from saying 'no' more often than 'yes'.\n\nEvery feature you add:\n→ Increases complexity\n→ Dilutes your message\n→ Confuses your users\n\nSimplicity is the ultimate sophistication.\n\n#ProductDesign #UX",
    likes: 1247,
    comments: 83,
    reposts: 156,
    outlierIndex: 94,
    timeAgo: "2h ago",
  },
  {
    id: "2",
    author: "Marcus Chen",
    authorRole: "Tech Entrepreneur",
    content: "I just spent 6 months building the wrong product.\n\nHere's what I learned:\n\n1. Talk to users BEFORE building\n2. Validate assumptions early\n3. Ship fast, iterate faster\n4. Your first idea is rarely your best\n\nFailure is expensive education.\n\n#Startup #Lessons",
    likes: 2103,
    comments: 145,
    reposts: 289,
    outlierIndex: 97,
    timeAgo: "5h ago",
  },
  {
    id: "3",
    author: "Emily Rodriguez",
    authorRole: "Content Strategist",
    content: "Stop optimizing for the algorithm.\nStart optimizing for humans.\n\nThe best content:\n✓ Solves real problems\n✓ Tells authentic stories\n✓ Creates genuine connections\n\nAlgorithms reward engagement.\nHumans reward value.\n\n#ContentStrategy",
    likes: 892,
    comments: 67,
    reposts: 124,
    outlierIndex: 89,
    timeAgo: "8h ago",
  },
  {
    id: "4",
    author: "David Park",
    authorRole: "Engineering Manager",
    content: "The best engineers I've hired weren't the ones with the most impressive resumes.\n\nThey were the ones who:\n→ Asked thoughtful questions\n→ Showed genuine curiosity\n→ Admitted what they didn't know\n→ Demonstrated how they learn\n\nHumility beats hubris every time.\n\n#Engineering #Leadership",
    likes: 1567,
    comments: 98,
    reposts: 201,
    outlierIndex: 92,
    timeAgo: "12h ago",
  },
  {
    id: "5",
    author: "Lisa Thompson",
    authorRole: "Marketing Director",
    content: "Everyone wants to go viral.\nNobody wants to build an audience.\n\nViral = lottery ticket\nAudience = compound interest\n\nOne disappears overnight.\nThe other compounds forever.\n\nChoose wisely.\n\n#Marketing #GrowthStrategy",
    likes: 3241,
    comments: 187,
    reposts: 412,
    outlierIndex: 98,
    timeAgo: "1d ago",
  },
  {
    id: "6",
    author: "James Wilson",
    authorRole: "Career Coach",
    content: "Your network isn't about how many people you know.\n\nIt's about:\n• Who trusts you\n• Who values you\n• Who thinks of you when opportunities arise\n\nQuality relationships > Quantity connections\n\n#Networking #CareerGrowth",
    likes: 1876,
    comments: 112,
    reposts: 245,
    outlierIndex: 91,
    timeAgo: "1d ago",
  },
];

export default function TrendingPage() {
  const [posts] = useState<TrendingPost[]>(mockTrendingPosts);
  const [creatorFilter, setCreatorFilter] = useState("all");
  const [outlierFilter, setOutlierFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("week");

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Post copied to clipboard!");
  };

  const handleSave = (id: string) => {
    toast.success("Post saved!");
  };

  const handleRepurpose = (id: string) => {
    toast.success("Repurposing post...");
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-text-primary">
            Trending Posts
          </h1>
        </div>
        <p className="text-text-secondary">
          Discover high-performing content from top creators
        </p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Creator Type
            </label>
            <select
              value={creatorFilter}
              onChange={(e) => setCreatorFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Creators</option>
              <option value="designers">Designers</option>
              <option value="engineers">Engineers</option>
              <option value="marketers">Marketers</option>
              <option value="founders">Founders</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Outlier Index
            </label>
            <select
              value={outlierFilter}
              onChange={(e) => setOutlierFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Posts</option>
              <option value="high">95+ (Exceptional)</option>
              <option value="medium">85-94 (Strong)</option>
              <option value="low">Below 85</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Range
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="input-field"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="card p-5 hover:scale-[1.02] transition-all animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {post.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">
                    {post.author}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {post.authorRole}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {post.timeAgo}
                  </p>
                </div>
              </div>

              {/* Outlier Badge */}
              <div
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  post.outlierIndex >= 95
                    ? "bg-green-100 text-green-700"
                    : post.outlierIndex >= 90
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {post.outlierIndex}
              </div>
            </div>

            {/* Content */}
            <div className="mb-4 whitespace-pre-wrap text-text-primary text-sm leading-relaxed">
              {post.content}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between text-xs text-text-secondary mb-4 pb-4 border-b border-border">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Repeat2 className="w-4 h-4" />
                <span>{post.reposts}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleCopy(post.content)}
                className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center space-x-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => handleSave(post.id)}
                className="p-2 border border-border rounded-lg hover:bg-card-bg transition-colors"
                title="Save"
              >
                <Bookmark className="w-4 h-4 text-text-secondary" />
              </button>
              <button
                onClick={() => handleRepurpose(post.id)}
                className="p-2 border border-border rounded-lg hover:bg-card-bg transition-colors"
                title="Repurpose"
              >
                <Repeat2 className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
