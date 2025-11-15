"use client";

import { BarChart3, TrendingUp, Heart, MessageCircle, Repeat2 } from "lucide-react";

export default function EngagementPage() {
  const stats = [
    { label: "Total Posts", value: "48", change: "+12%", icon: BarChart3, color: "bg-blue-500" },
    { label: "Total Likes", value: "2,847", change: "+23%", icon: Heart, color: "bg-pink-500" },
    { label: "Comments", value: "432", change: "+18%", icon: MessageCircle, color: "bg-purple-500" },
    { label: "Reposts", value: "156", change: "+31%", icon: Repeat2, color: "bg-green-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-text-primary">
            Engagement Analytics
          </h1>
        </div>
        <p className="text-text-secondary">
          Track your content performance and audience engagement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="card p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Performance Overview</h2>
          <select className="input-field w-auto">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
        <div className="h-80 bg-gradient-to-br from-primary/5 to-pink-500/5 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/20">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-text-secondary">Chart visualization coming soon</p>
          </div>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">Top Performing Posts</h2>
        <div className="space-y-4">
          {[
            { title: "The Future of Remote Work", likes: 847, comments: 64, engagement: "12.4%" },
            { title: "AI in Creative Industries", likes: 692, comments: 52, engagement: "9.8%" },
            { title: "Building Personal Brands", likes: 534, comments: 41, engagement: "8.2%" },
          ].map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-card-bg rounded-xl">
              <div>
                <p className="font-semibold text-text-primary">{post.title}</p>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mt-2">
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" /> {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" /> {post.comments}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{post.engagement}</p>
                <p className="text-xs text-text-secondary">Engagement</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
