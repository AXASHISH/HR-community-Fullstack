import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Award,
  Calendar,
  Timer,
  Clock,
  Loader2,
  CheckCircle,
  Share2,
  Lock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [userNominations, setUserNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nominationsLoading, setNominationsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nominationsError, setNominationsError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = sessionStorage.getItem("authToken");

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper: Check for active nomination
  const hasActiveNomination = useCallback(() => {
    return userNominations.some((nom) => {
      const endDate = new Date(nom.end_date);
      return endDate > currentTime && nom.status.toLowerCase() !== "rejected";
    });
  }, [userNominations, currentTime]);

  // Check if user nominated for given category
  const isUserNominatedCategory = useCallback(
    (categoryId) => {
      return userNominations.some(
        (nom) =>
          nom.category_id === categoryId && nom.status.toLowerCase() !== "rejected"
      );
    },
    [userNominations]
  );

  // Fetch user nominations (without vote count)
  useEffect(() => {
    const fetchNominations = async () => {
      try {
        setNominationsLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-nomination-by-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserNominations(res.data || []);
        setNominationsError(null);
      } catch (err) {
        setNominationsError("Failed to load nominations. Please try again later.");
        setUserNominations([]);
      } finally {
        setNominationsLoading(false);
      }
    };
    if (token) fetchNominations();
    else setNominationsLoading(false);
  }, [token]);

  // Fetch nomination categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/nomination-categories`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const transformed = res.data.map((cat) => ({
          id: cat.category_id,
          name: cat.category_name,
          description: cat.description,
          nominees: cat.nominees_count || 0,
          deadline: formatDate(cat.end_date),
          isOpen: cat.is_open,
          startDate: cat.start_date,
          endDate: cat.end_date,
        }));
        setCategories(transformed);
        setError(null);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        setCategories([
          {
            id: 1,
            name: "Innovation Leader",
            description: "Recognizes individuals who drive innovation and creative solutions",
            nominees: 8,
            deadline: "2024-02-15",
            isOpen: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [token]);

  // Date formatting utility
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Countdown calculation and coloring
  const calculatePreciseCountdown = (endDate) => {
    try {
      const end = new Date(endDate);
      const diff = end - currentTime;
      if (diff <= 0) {
        return { expired: true, text: "00:00:00", color: "#dc2626", days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (t) => t.toString().padStart(2, "0");
      let text = "";
      let color = "#1161A0";

      if (days > 0) {
        text = `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        if (days <= 3) color = "#ea580c";
        if (days <= 1) color = "#dc2626";
      } else if (hours > 0) {
        text = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        color = "#dc2626";
      } else {
        text = `${pad(minutes)}:${pad(seconds)}`;
        color = "#dc2626";
      }

      return {
        expired: false,
        text,
        color,
        days,
        hours,
        minutes,
        seconds,
        urgent: days === 0 && hours < 24,
        warning: days <= 3 && days > 0,
      };
    } catch {
      return {
        expired: false,
        text: "Invalid date",
        color: "#6b7280",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  };

  // Human readable time left
  const calculateTimeRemaining = (endDate) => {
    try {
      const end = new Date(endDate);
      const diff = end - currentTime;
      if (diff <= 0) return "Ended";
      const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (diffDays === 1) return "1 day left";
      if (diffDays <= 7) return `${diffDays} days left`;
      if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks left`;
      return `${Math.ceil(diffDays / 30)} months left`;
    } catch {
      return "Invalid date";
    }
  };

  const isCategoryOpen = (category) => {
    if (!category?.isOpen) return false;
    try {
      const endDate = new Date(category?.endDate);
      return endDate > currentTime;
    } catch {
      return category?.isOpen;
    }
  };

  const isCategoryClickable = (category) => {
    const open = isCategoryOpen(category);
    const userHasNom = hasActiveNomination();
    const userNominatedHere = isUserNominatedCategory(category?.id);
    return open && (!userHasNom || userNominatedHere);
  };

  const getCategoryCardStyling = (category) => {
    const open = isCategoryOpen(category);
    const clickable = isCategoryClickable(category);
    const userNominated = isUserNominatedCategory(category?.id);
    const userHasNom = hasActiveNomination();

    if (!open) {
      return {
        className: "opacity-70 grayscale border-gray-200 bg-gray-100 cursor-not-allowed",
        clickable: false,
      };
    }
    if (userNominated) {
      return {
        className: "border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer",
        clickable: true,
      };
    }
    if (userHasNom && !clickable) {
      return {
        className: "opacity-50 grayscale border-gray-300 bg-gray-100 cursor-not-allowed",
        clickable: false,
      };
    }
    return {
      className:
        "border-blue-200 hover:border-blue-300 bg-blue-50 hover:shadow-lg cursor-pointer transition-transform hover:scale-[1.03]",
      clickable: true,
    };
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 text-[10px]">
            Approved
          </Badge>
        );
      case "submitted":
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 text-[10px]">
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 text-[10px]">
            Rejected
          </Badge>
        );
      case "not-started":
        return (
          <Badge variant="outline" className="border-gray-300 hover:bg-gray-50 text-[10px]">
            Not Started
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-[10px]">
            {status || "Unknown"}
          </Badge>
        );
    }
  };

  const getCategoryStatusBadge = (category) => {
    const open = isCategoryOpen(category);
    const timeInfo = calculatePreciseCountdown(category?.endDate);
    const userNominated = isUserNominatedCategory(category?.id);

    if (userNominated)
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 text-[10px]">
          Nominated
        </Badge>
      );
    if (timeInfo.expired)
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 text-[10px]">
          Closed
        </Badge>
      );
    if (timeInfo.urgent)
      return (
        <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200 animate-pulse text-[10px]">
          Urgent
        </Badge>
      );
    if (timeInfo.warning)
      return (
        <Badge className="bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 text-[10px]">
          Closing Soon
        </Badge>
      );
    if (open)
      return (
        <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200 text-[10px]">
          Open
        </Badge>
      );
    return (
      <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-[10px]">
        Closed
      </Badge>
    );
  };

  const getCategoryActionButton = (category) => {
    const open = isCategoryOpen(category);
    const clickable = isCategoryClickable(category);
    const userNominated = isUserNominatedCategory(category?.id);
    const userHasNom = hasActiveNomination();

    if (!open) return null;
    if (userNominated)
      return (
        <Button
          size="sm"
          className="text-white hover:opacity-90 transition-opacity text-[11px] px-3 py-1 h-7 bg-green-600 rounded"
          disabled
        >
          Nominated
        </Button>
      );
    if (userHasNom && !clickable)
      return (
        <Button
          size="sm"
          className="text-gray-400 bg-gray-300 cursor-not-allowed text-[11px] px-3 py-1 h-7 rounded flex items-center gap-1"
          disabled
        >
          <Lock className="h-4 w-4" /> Locked
        </Button>
      );
    if (clickable)
      return (
        <Button
          size="sm"
          className="text-white hover:opacity-90 transition-opacity text-[11px] px-3 py-1 h-7 rounded"
          style={{ backgroundColor: "#ea580c" }}
        >
          Nominate
        </Button>
      );
    return null;
  };

  const handleShareLink = (shareableLink) => {
    if (navigator.share) {
      navigator.share({
        title: "My Leadership Award Nomination",
        url: shareableLink,
      });
    } else {
      navigator.clipboard.writeText(shareableLink);
      alert("Link copied to clipboard!");
    }
  };

  const handleCategoryClick = (category) => {
    const styling = getCategoryCardStyling(category);
    if (styling.clickable) {
      navigate(`/nominate/${category.id}`, { state: { selectedCategory: category } });
    }
  };

  // Redesigned category card component with smaller font sizes
  const CategoryCard = ({ category }) => {
    const styling = getCategoryCardStyling(category);
    const timeInfo = calculatePreciseCountdown(category.endDate);
    const clickable = styling.clickable;

    const totalDurationSeconds = (new Date(category.endDate) - new Date(category.startDate)) / 1000;
    const timeLeftSeconds =
      timeInfo.days * 86400 + timeInfo.hours * 3600 + timeInfo.minutes * 60 + timeInfo.seconds;
    const progressPercent = Math.min(100, Math.max(0, 100 - (timeLeftSeconds / totalDurationSeconds) * 100));

    return (
      <div
        tabIndex={clickable ? 0 : -1}
        onClick={() => clickable && handleCategoryClick(category)}
        onKeyDown={(e) => (clickable && (e.key === "Enter" || e.key === " ")) && handleCategoryClick(category)}
        role={clickable ? "button" : undefined}
        aria-disabled={!clickable}
        className={`
          rounded-xl border transition-shadow duration-300
          ${clickable ? "cursor-pointer shadow hover:shadow-xl transform hover:scale-[1.02]" : "opacity-60 cursor-not-allowed"}
          bg-white
        `}
        style={{ boxShadow: "0 4px 15px rgb(17 97 160 / 0.25)" }}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-blue-900 font-semibold text-sm uppercase tracking-wide leading-tight">{category.name}</h3>
              <p className="text-gray-600 text-[11px] mt-1 line-clamp-3">{category.description}</p>
            </div>
            <div>{getCategoryStatusBadge(category)}</div>
          </div>

          <div className="mb-3">
            <p className="text-[10px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-blue-600" /> Ends:{" "}
              <span className="text-blue-900 text-[11px]">{formatDate(category.endDate)}</span>
            </p>
            <div className="relative w-full h-2 rounded-full bg-blue-100 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  timeInfo.expired
                    ? "bg-red-500"
                    : timeInfo.urgent
                    ? "bg-red-500 animate-pulse"
                    : timeInfo.warning
                    ? "bg-orange-400"
                    : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-1 text-[10px] font-mono font-bold" style={{ color: timeInfo.color }}>
              {timeInfo.expired ? "EXPIRED" : timeInfo.text}
            </p>
          </div>

          <div className="mt-auto flex justify-between items-center text-[10px]">
            <div className="flex items-center text-gray-600 space-x-1">
              <Clock className="h-3 w-3" />
              <span>{isCategoryOpen(category) ? calculateTimeRemaining(category.endDate) : "Closed"}</span>
            </div>
            <div>{getCategoryActionButton(category)}</div>
          </div>
        </div>
      </div>
    );
  };

  // Redesigned nominations list without heading and smaller fonts
  const NominationsList = () => {
    return (
      <div className="space-y-4 mt-8">
        {nominationsLoading ? (
          <div className="flex justify-center items-center py-10 text-sm">
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
            <span className="ml-3 text-green-700 font-medium">Loading nominations...</span>
          </div>
        ) : nominationsError ? (
          <div className="text-center py-10 text-sm text-red-600 font-semibold">
            {nominationsError}
          </div>
        ) : (
          userNominations.map((nomination) => {
            const timeInfo = calculatePreciseCountdown(nomination.vote_end_date);

            // Progress Bar Calculation
            const start = new Date(nomination.submitted_at || nomination.start_date);
            const end = new Date(nomination.vote_end_date);
            const total = end - start;
            const elapsed = Math.min(total, Math.max(0, currentTime - start));
            const progress = Math.max(0, Math.min(100, (elapsed / total) * 100));

            return (
              <div
                key={nomination.nomination_id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col relative animate-fadeIn min-h-[230px] text-[12px]"
              >
                <div className="mb-1 flex gap-3 flex-wrap items-center">
                  <h4 className="text-blue-900 font-semibold tracking-wide text-sm">{nomination.category_name}</h4>
                  {getStatusBadge(nomination.status)}
                </div>
                <div className="text-gray-700 mb-1 truncate">
                  <span className="font-semibold">Nominated Leader:</span> {nomination.leader_name}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3 mt-1">
                  <div className="flex items-center gap-1 rounded bg-blue-50 p-2 text-[11px]">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold whitespace-nowrap">Submitted: </span>
                    <span>{formatDate(nomination.submitted_at)}</span>
                  </div>
                  <div className="flex items-center gap-1 rounded bg-green-50 p-2 text-[11px]">
                    <Clock className="h-4 w-4 text-green-700" />
                    <span className="font-semibold whitespace-nowrap">Status: </span>
                    <span className="capitalize">{nomination.status.replace("_", " ")}</span>
                  </div>
                </div>
                <div className="w-full mt-2 mb-2 relative">
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      <Timer className="h-3 w-3 text-blue-700" />
                      Voting Ends: {formatDate(nomination.vote_end_date)}
                    </span>
                    <span style={{ color: timeInfo.color }}>{timeInfo.expired ? "Expired" : timeInfo.text}</span>
                  </div>
                  <div className="relative w-full h-1.5 rounded bg-blue-100">
                    <div
                      className={
                        `absolute top-0 left-0 h-1.5 rounded transition-all ` +
                        (timeInfo.expired
                          ? "bg-red-500"
                          : timeInfo.urgent
                          ? "bg-red-500 animate-pulse"
                          : timeInfo.warning
                          ? "bg-orange-400"
                          : "bg-blue-600")
                      }
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  {(timeInfo.urgent || timeInfo.warning) && (
                    <Badge
                      className={`absolute right-5 top-3 text-[10px] px-2 py-0.5 ${
                        timeInfo.urgent ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {timeInfo.urgent ? "Urgent" : "Closing Soon"}
                    </Badge>
                  )}
                </div>
                {/* Outcome/Status Message */}
                {nomination.status.toLowerCase() === "approved" && nomination.sharable_link && (
                  <div className="flex items-center gap-3 mt-3 p-3 bg-green-50 border-l-4 border-green-600 rounded text-[12px]">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900 text-[13px]">
                        🎉 Congratulations! Your nomination has been approved.
                      </p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 ml-2 text-xs"
                        onClick={() => handleShareLink(nomination.sharable_link)}
                      >
                        <Share2 className="h-4 w-4 mr-1" /> Share
                      </Button>
                    </div>
                  </div>
                )}
                {nomination.status.toLowerCase() === "pending" && (
                  <div className="flex items-center gap-3 mt-3 p-3 bg-orange-50 border-l-4 border-orange-400 rounded text-[12px]">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-orange-800">⏳ Your nomination is under review</p>
                      <p className="text-xs mt-0.5">We are carefully evaluating your submission.</p>
                    </div>
                  </div>
                )}
                {nomination.status.toLowerCase() === "rejected" && (
                  <div className="flex items-center gap-3 mt-3 p-3 bg-red-50 border-l-4 border-red-400 rounded text-[12px]">
                    <Clock className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-700">❌ Not Approved</p>
                      <p className="text-xs">
                        Unfortunately, this nomination did not meet the criteria. You may try nominating again.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-3 py-4 max-w-7xl bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-6 text-[13px]">
        <h1 className="text-sm sm:text-xs md:text-sm lg:text-base font-bold mb-1" style={{ color: "#1161A0" }}>
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600 text-xs">
          <span className="font-semibold uppercase text-orange-600">{user?.role || "Member"} </span>
          at <span className="font-medium">{user?.company_name || "Your Company"}</span>
        </p>
      </div>

      {/* Active Nomination Warning */}
      {hasActiveNomination() && (
        <Card className="shadow-md border-0 mb-6" style={{ borderTop: "3px solid #f59e0b" }}>
          <CardContent className="p-3 bg-amber-50 flex items-start gap-3 text-xs">
            <Lock className="h-4 w-4 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 text-xs mb-1">Active Nomination in Progress</h3>
              <p className="text-amber-700 leading-relaxed">
                You have an active nomination that is still in the voting period.&nbsp;
                You cannot submit new nominations until your current nomination ends.
                Only the category you've nominated for remains accessible.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Award Categories Section */}
      <Card className="shadow-md border-0 mb-6" style={{ borderTop: "3px solid #1161A0" }}>
        <CardHeader className="text-center py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-t-lg select-none">
          <CardTitle className="flex items-center justify-center gap-2 text-xs uppercase font-semibold tracking-wide">
            <Award className="h-4 w-4 text-yellow-400 animate-pulse" />
            Award Categories
          </CardTitle>
          <CardDescription className="text-blue-200 text-xs italic mt-1 font-light">
            Explore all available leadership award categories and nominate deserving leaders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-6 text-xs">
              <Loader2 className="h-5 w-5 animate-spin" style={{ color: "#1161A0" }} />
              <span className="ml-2 text-gray-600">Loading categories...</span>
            </div>
          ) : error ? (
            <div className="text-center py-6 text-xs">
              <p className="text-red-500 mb-3">{error}</p>
              <Button onClick={() => window.location.reload()} className="text-white hover:opacity-90 px-3 py-1 text-xs" style={{ backgroundColor: "#1161A0" }}>
                Retry Loading
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Nominations List Without Heading */}
      {userNominations.length > 0 && <NominationsList />}
    </div>
  );
};

export default Dashboard;
