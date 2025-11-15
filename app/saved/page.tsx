"use client";

import { useState } from "react";
import { Bookmark, Search, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SavedPage() {
  const [hasSavedPosts] = useState(false);

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Saved Posts
        </h1>
        <p className="text-text-secondary">
          Your collection of inspiring content
        </p>
      </div>

      {hasSavedPosts ? (
        // This would show saved posts in a similar format to My Posts
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Saved posts would go here */}
        </div>
      ) : (
        // Empty State
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center max-w-md animate-slide-up">
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-full mx-auto flex items-center justify-center">
                <Bookmark className="w-16 h-16 text-primary" />
              </div>
              {/* Floating decorative elements */}
              <div className="absolute top-0 right-1/4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: "0.1s" }}>
                <Search className="w-6 h-6 text-purple-500" />
              </div>
              <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: "0.3s" }}>
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              No Saved Posts Yet
            </h2>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Start building your inspiration library by saving posts from trending creators.
              Your saved posts will appear here for easy access.
            </p>

            {/* CTA Button */}
            <Link href="/trending" className="btn-primary inline-flex items-center space-x-2 px-8 py-3">
              <TrendingUp className="w-5 h-5" />
              <span>Explore Posts</span>
            </Link>

            {/* Tips */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm font-medium text-text-primary mb-4">
                💡 Quick Tips
              </p>
              <div className="space-y-3 text-sm text-text-secondary text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">1</span>
                  </div>
                  <p>Browse trending posts to find high-performing content</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">2</span>
                  </div>
                  <p>Click the bookmark icon to save posts for later</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-xs font-bold">3</span>
                  </div>
                  <p>Use saved posts as inspiration for your own content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
