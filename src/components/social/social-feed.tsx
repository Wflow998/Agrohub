"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import StoriesCarousel from "./stories-carousel";
import FeedFilters from "./feed-filters";
import PostList from "./post-list";
import FeedSidebar from "./feed-sidebar";
import { CreatePost } from "./create-post";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
    role?: string;
  };
  viewed: boolean;
  timestamp: string;
  content?: {
    type: "image" | "video" | "text";
    src?: string;
    text?: string;
    location?: string;
    tags?: string[];
  }[];
}

interface SocialFeedProps {
  userRole?: string;
  currentUser?: {
    name: string;
    avatar: string;
  };
}

const SocialFeed = ({
  userRole = "farmer",
  currentUser = {
    name: "John Farmer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
}: SocialFeedProps) => {
  // State for feed management
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("latest");
  const [activeView, setActiveView] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Story viewer state
  const [storyViewerOpen, setStoryViewerOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeStoryContentIndex, setActiveStoryContentIndex] = useState(0);
  const [activeUserStories, setActiveUserStories] = useState<Story[]>([]);

  // Mock posts data
  const [posts, setPosts] = useState([
    {
      id: "1",
      author: {
        name: "Maria Rodriguez",
        role: "Farmer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      },
      content:
        "Just harvested our first batch of organic tomatoes for the season! They're looking great and will be available at the marketplace tomorrow. #OrganicFarming #FreshProduce",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
      likes: 24,
      comments: 5,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      author: {
        name: "David Kimani",
        role: "Distributor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
      content:
        "Looking for farmers in the Central Region with maize ready for distribution. We have several retailers looking for quality produce. Contact me for details. #Distribution #Maize",
      likes: 18,
      comments: 12,
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      author: {
        name: "Sarah Ochieng",
        role: "Agricultural Expert",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      content:
        "Weather alert: Heavy rains expected in the Eastern Region next week. Farmers should prepare their drainage systems and consider delaying any new plantings. Stay safe! #WeatherAlert #FarmingTips",
      likes: 42,
      comments: 8,
      timestamp: "Yesterday",
    },
  ]);

  // Enhanced stories data with content
  const stories: Story[] = [
    {
      id: "1",
      user: {
        name: "Maria Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
        role: "Farmer",
      },
      viewed: false,
      timestamp: "2h",
      content: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80",
          location: "Eastern Region Farm",
          tags: ["OrganicFarming", "Tomatoes"],
        },
        {
          type: "text",
          text: "Our tomato harvest is looking amazing this season! 🍅",
          tags: ["FreshProduce"],
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "David Kimani",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        role: "Distributor",
      },
      viewed: false,
      timestamp: "4h",
      content: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80",
          location: "Central Region Distribution Center",
          tags: ["Maize", "Distribution"],
        },
        {
          type: "text",
          text: "Looking for quality maize suppliers! Contact me for details.",
          tags: ["BusinessOpportunity"],
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1591086429666-004a4b6a1241?w=800&q=80",
          location: "Central Region",
          tags: ["Logistics", "FarmToTable"],
        },
      ],
    },
    {
      id: "3",
      user: {
        name: "Sarah Ochieng",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        role: "Agricultural Expert",
      },
      viewed: true,
      timestamp: "8h",
      content: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800&q=80",
          location: "Western Region Agricultural Center",
          tags: ["WeatherAlert", "FarmingTips"],
        },
        {
          type: "text",
          text: "⚠️ Weather Alert: Heavy rains expected next week. Prepare your drainage systems!",
          tags: ["FarmSafety"],
        },
      ],
    },
    {
      id: "4",
      user: {
        name: "John Mwangi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        role: "Retailer",
      },
      viewed: true,
      timestamp: "12h",
      content: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
          location: "Nairobi Farmers Market",
          tags: ["FreshProduce", "LocalMarket"],
        },
      ],
    },
    {
      id: "5",
      user: {
        name: "Elizabeth Wanjiku",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elizabeth",
        role: "Farmer",
      },
      viewed: false,
      timestamp: "1d",
      content: [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=800&q=80",
          location: "Northern Region Farm",
          tags: ["Sustainability", "OrganicFarming"],
        },
        {
          type: "text",
          text: "Our new sustainable irrigation system is up and running! 💧",
          tags: ["WaterConservation", "AgriTech"],
        },
      ],
    },
  ];

  // Mock trending hashtags
  const trendingHashtags = [
    { tag: "OrganicFarming", posts: 1243 },
    { tag: "AgriTech", posts: 876 },
    { tag: "FarmToTable", posts: 654 },
    { tag: "Sustainability", posts: 521 },
    { tag: "LocalProduce", posts: 498 },
  ];

  // Mock suggested connections
  const suggestedConnections = [
    {
      id: "1",
      name: "Maria Rodriguez",
      role: "Farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      mutualConnections: 5,
      location: "Eastern Region",
    },
    {
      id: "2",
      name: "David Kimani",
      role: "Distributor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      mutualConnections: 3,
      location: "Central Region",
    },
    {
      id: "3",
      name: "Sarah Ochieng",
      role: "Agricultural Expert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      mutualConnections: 8,
      location: "Western Region",
    },
  ];

  // Story progress timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (storyViewerOpen && activeUserStories.length > 0) {
      const currentStory = activeUserStories[activeStoryIndex];
      const contentCount = currentStory.content?.length || 0;

      if (contentCount > 0) {
        timer = setTimeout(() => {
          if (activeStoryContentIndex < contentCount - 1) {
            // Move to next content in the same story
            setActiveStoryContentIndex(activeStoryContentIndex + 1);
          } else if (activeStoryIndex < activeUserStories.length - 1) {
            // Move to next story
            setActiveStoryIndex(activeStoryIndex + 1);
            setActiveStoryContentIndex(0);
          } else {
            // End of stories
            setStoryViewerOpen(false);
          }
        }, 5000); // 5 seconds per story content
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    storyViewerOpen,
    activeStoryIndex,
    activeStoryContentIndex,
    activeUserStories,
  ]);

  // Handler functions
  const handleFilterChange = (filter: string) => {
    setIsLoading(true);
    setActiveFilter(filter);
    // Simulate API call to filter posts
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleSortChange = (sort: string) => {
    setIsLoading(true);
    setActiveSort(sort);
    // Simulate API call to sort posts
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleViewChange = (view: "grid" | "list") => {
    setActiveView(view);
  };

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    // Simulate API call to search posts
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      // Add more mock posts
      const newPosts = [
        {
          id: `${posts.length + 1}`,
          author: {
            name: "Michael Omondi",
            role: "Farmer",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
          },
          content:
            "Just received my new irrigation system! Can't wait to set it up and improve our farm's efficiency. #AgriTech #Irrigation",
          likes: 15,
          comments: 3,
          timestamp: "1 day ago",
        },
        {
          id: `${posts.length + 2}`,
          author: {
            name: "Grace Akinyi",
            role: "Agricultural Expert",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
          },
          content:
            "Hosting a workshop on sustainable farming practices next weekend. All farmers in the Western Region are welcome to attend! #Sustainability #FarmerEducation",
          image:
            "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80",
          likes: 32,
          comments: 7,
          timestamp: "2 days ago",
        },
      ];
      setPosts([...posts, ...newPosts]);
      setIsLoading(false);

      // If we've loaded enough posts, set hasMore to false
      if (posts.length >= 10) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refreshing the feed
    setTimeout(() => {
      // Shuffle the order of posts to simulate new content
      const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
      setPosts(shuffledPosts);
      setIsLoading(false);
      setHasMore(true);
    }, 1000);
  };

  const handleStoryClick = (storyId: string) => {
    // Find the clicked story and all stories from the same user
    const clickedStoryIndex = stories.findIndex(
      (story) => story.id === storyId,
    );
    if (clickedStoryIndex !== -1) {
      const clickedStory = stories[clickedStoryIndex];
      const userStories = stories.filter(
        (story) => story.user.name === clickedStory.user.name,
      );

      setActiveUserStories(userStories);
      setActiveStoryIndex(
        userStories.findIndex((story) => story.id === storyId),
      );
      setActiveStoryContentIndex(0);
      setStoryViewerOpen(true);
    }
  };

  const handleCreateStory = () => {
    // In a real app, this would open a story creator modal
    alert("Story creation feature would open here");
  };

  const handlePostCreated = (content: string) => {
    // Create a new post and add it to the top of the feed
    const newPost = {
      id: `${Date.now()}`,
      author: {
        name: currentUser.name,
        role: userRole.charAt(0).toUpperCase() + userRole.slice(1),
        avatar: currentUser.avatar,
      },
      content: content,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };

    setPosts([newPost, ...posts]);
  };

  const handleTagClick = (tag: string) => {
    // Handle hashtag click - in a real app, this would filter posts by tag
    setSearchQuery(tag);
    handleSearch(tag);
  };

  const handleNextStory = () => {
    const currentStory = activeUserStories[activeStoryIndex];
    const contentCount = currentStory.content?.length || 0;

    if (activeStoryContentIndex < contentCount - 1) {
      // Move to next content in the same story
      setActiveStoryContentIndex(activeStoryContentIndex + 1);
    } else if (activeStoryIndex < activeUserStories.length - 1) {
      // Move to next story
      setActiveStoryIndex(activeStoryIndex + 1);
      setActiveStoryContentIndex(0);
    } else {
      // End of stories
      setStoryViewerOpen(false);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryContentIndex > 0) {
      // Move to previous content in the same story
      setActiveStoryContentIndex(activeStoryContentIndex - 1);
    } else if (activeStoryIndex > 0) {
      // Move to previous story
      setActiveStoryIndex(activeStoryIndex - 1);
      const prevStoryContentCount =
        activeUserStories[activeStoryIndex - 1].content?.length || 0;
      setActiveStoryContentIndex(prevStoryContentCount - 1);
    }
  };

  // Render the current story content
  const renderStoryContent = () => {
    if (activeUserStories.length === 0) return null;

    const currentStory = activeUserStories[activeStoryIndex];
    if (!currentStory.content || currentStory.content.length === 0) return null;

    const content = currentStory.content[activeStoryContentIndex];

    return (
      <div className="relative h-full w-full flex flex-col items-center justify-center bg-black">
        {/* Story header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center space-x-2">
            <img
              src={currentStory.user.avatar}
              alt={currentStory.user.name}
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
            <div>
              <p className="text-white font-medium">{currentStory.user.name}</p>
              <p className="text-white/70 text-xs">
                {currentStory.user.role} • {currentStory.timestamp}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setStoryViewerOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Story progress bar */}
        <div className="absolute top-16 left-0 right-0 z-10 flex space-x-1 px-4">
          {currentStory.content.map((_, index) => (
            <div
              key={index}
              className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden"
            >
              <div
                className={`h-full bg-white ${index === activeStoryContentIndex ? "animate-progress" : index < activeStoryContentIndex ? "w-full" : "w-0"}`}
              />
            </div>
          ))}
        </div>

        {/* Story content */}
        {content.type === "image" && (
          <img
            src={content.src}
            alt="Story"
            className="h-full w-full object-contain"
          />
        )}

        {content.type === "text" && (
          <div className="bg-gradient-to-b from-primary/80 to-primary p-8 rounded-lg max-w-md text-center">
            <p className="text-white text-xl font-medium">{content.text}</p>
          </div>
        )}

        {/* Story footer */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/70 to-transparent">
          {content.location && (
            <p className="text-white/90 text-sm mb-2">📍 {content.location}</p>
          )}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-primary-foreground bg-primary/80 px-2 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation controls */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-1 text-white/90 hover:bg-black/50"
          onClick={handlePrevStory}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 rounded-full p-1 text-white/90 hover:bg-black/50"
          onClick={handleNextStory}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Feed</h1>
        <p className="text-muted-foreground">
          Connect with the agricultural community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Main feed column */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          {/* Stories carousel */}
          <StoriesCarousel
            stories={stories}
            currentUser={currentUser}
            onStoryClick={handleStoryClick}
            onCreateStory={handleCreateStory}
          />

          {/* Create post component */}
          <CreatePost
            user={currentUser}
            onPostCreated={(content) => handlePostCreated(content)}
          />

          {/* Feed filters */}
          <FeedFilters
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
            onSearch={handleSearch}
            activeFilter={activeFilter}
            activeSort={activeSort}
            activeView={activeView}
          />

          {/* Post list */}
          <PostList
            posts={posts}
            currentUser={currentUser}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onRefresh={handleRefresh}
          />
        </div>

        {/* Sidebar column */}
        <div className="hidden md:block">
          <FeedSidebar
            location="Nairobi, Kenya"
            hashtags={trendingHashtags}
            connections={suggestedConnections}
            onTagClick={handleTagClick}
          />
        </div>
      </div>

      {/* Story Viewer Dialog */}
      <Dialog open={storyViewerOpen} onOpenChange={setStoryViewerOpen}>
        <DialogContent className="max-w-3xl w-full h-[80vh] p-0 overflow-hidden">
          {renderStoryContent()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialFeed;
