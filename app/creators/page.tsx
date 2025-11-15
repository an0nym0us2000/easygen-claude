"use client";

import { Users, TrendingUp, Star } from "lucide-react";

const topCreators = [
  { name: "Sarah Johnson", role: "Product Designer", followers: "12.5K", engagement: "8.2%" },
  { name: "Marcus Chen", role: "Tech Entrepreneur", followers: "25.3K", engagement: "12.4%" },
  { name: "Emily Rodriguez", role: "Content Strategist", followers: "18.7K", engagement: "9.8%" },
  { name: "David Park", role: "Engineering Manager", followers: "15.2K", engagement: "7.5%" },
  { name: "Lisa Thompson", role: "Marketing Director", followers: "32.1K", engagement: "15.2%" },
];

export default function CreatorsPage() {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-text-primary">
            Top Creators
          </h1>
        </div>
        <p className="text-text-secondary">
          Discover and learn from high-performing content creators
        </p>
      </div>

      <div className="grid gap-4">
        {topCreators.map((creator, index) => (
          <div key={index} className="card p-6 hover:scale-[1.01] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {creator.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-text-primary">{creator.name}</h3>
                  <p className="text-text-secondary">{creator.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-text-primary">{creator.followers}</p>
                  <p className="text-xs text-text-secondary">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{creator.engagement}</p>
                  <p className="text-xs text-text-secondary">Engagement</p>
                </div>
                <button className="btn-secondary">
                  <Star className="w-4 h-4 mr-2 inline" />
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
