"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Plus, Clock, X } from "lucide-react";
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns";
import toast from "react-hot-toast";

interface ScheduledPost {
  id: string;
  title: string;
  time: string;
  color: string;
}

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month">("week");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("09:00");

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const [scheduledPosts, setScheduledPosts] = useState<Record<string, ScheduledPost[]>>({
    [format(weekDays[1], "yyyy-MM-dd")]: [
      { id: "1", title: "Remote Work Future", time: "09:00", color: "bg-blue-500" },
      { id: "2", title: "AI in Creative Industries", time: "14:00", color: "bg-purple-500" },
    ],
    [format(weekDays[3], "yyyy-MM-dd")]: [
      { id: "3", title: "Building Personal Brands", time: "10:00", color: "bg-green-500" },
    ],
    [format(weekDays[5], "yyyy-MM-dd")]: [
      { id: "4", title: "Leadership Lessons", time: "16:00", color: "bg-orange-500" },
    ],
  });

  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleSchedulePost = (day: Date, hour: number) => {
    setSelectedDate(day);
    setSelectedTime(`${hour.toString().padStart(2, "0")}:00`);
    setShowScheduleModal(true);
  };

  const handleExportCSV = () => {
    toast.success("Calendar exported to CSV!");
  };

  const getPostsForDateTime = (date: Date, hour: number) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const hourStr = hour.toString().padStart(2, "0");
    return scheduledPosts[dateKey]?.filter(post => post.time.startsWith(hourStr)) || [];
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Content Calendar
          </h1>
          <p className="text-text-secondary">
            Schedule and manage your content publishing timeline
          </p>
        </div>
        <button onClick={handleExportCSV} className="btn-secondary flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousWeek}
              className="p-2 hover:bg-card-bg rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-text-primary min-w-[200px] text-center">
              {format(startDate, "MMMM d")} - {format(addDays(startDate, 6), "MMMM d, yyyy")}
            </h2>
            <button
              onClick={handleNextWeek}
              className="p-2 hover:bg-card-bg rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === "week"
                  ? "bg-primary text-white"
                  : "bg-card-bg text-text-secondary hover:bg-gray-200"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("month")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === "month"
                  ? "bg-primary text-white"
                  : "bg-card-bg text-text-secondary hover:bg-gray-200"
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-border bg-card-bg sticky top-0 z-10">
              <div className="p-3 border-r border-border">
                <span className="text-sm font-medium text-text-secondary">Time</span>
              </div>
              {weekDays.map((day) => (
                <div key={day.toString()} className="p-3 border-r border-border last:border-r-0">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-text-primary">
                      {format(day, "EEE")}
                    </p>
                    <p className={`text-xs mt-1 ${
                      format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                        ? "text-primary font-semibold"
                        : "text-text-secondary"
                    }`}>
                      {format(day, "MMM d")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-border hover:bg-gray-50/50 transition-colors">
                  <div className="p-3 border-r border-border bg-card-bg/50">
                    <span className="text-xs text-text-secondary font-medium">
                      {hour.toString().padStart(2, "0")}:00
                    </span>
                  </div>
                  {weekDays.map((day) => {
                    const posts = getPostsForDateTime(day, hour);
                    return (
                      <div
                        key={`${day}-${hour}`}
                        onClick={() => handleSchedulePost(day, hour)}
                        className="p-2 border-r border-border last:border-r-0 min-h-[60px] cursor-pointer hover:bg-primary/5 transition-colors relative group"
                      >
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className={`${post.color} text-white rounded-lg p-2 mb-1 text-xs shadow-sm hover:shadow-md transition-all`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{post.title}</p>
                                <p className="text-xs opacity-90 mt-0.5">{post.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="w-5 h-5 text-text-secondary" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-text-primary">Schedule Post</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-card-bg rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={format(selectedDate, "yyyy-MM-dd")}
                    readOnly
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Select Post
                  </label>
                  <select className="input-field">
                    <option>Remote Work Future</option>
                    <option>AI in Creative Industries</option>
                    <option>Building Personal Brands</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    className="input-field resize-none h-20"
                    placeholder="Add scheduling notes..."
                  />
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Post scheduled successfully!");
                      setShowScheduleModal(false);
                    }}
                    className="btn-primary flex-1"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
