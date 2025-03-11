"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import StoriesCarousel from "./stories-carousel";
import FeedFilters from "./feed-filters";
import PostList from "./post-list";
import FeedSidebar from "./feed-sidebar";
import { CreatePost } from "./create-post";

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

  // Mock stories data
  const stories = [
    {
      id: "1",
      user: {
        name: "Maria Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      },
      viewed: false,
      timestamp: "2h",
    },
    {
      id: "2",
      user: {
        name: "David Kimani",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
      viewed: false,
      timestamp: "4h",
    },
    {
      id: "3",
      user: {
        name: "Sarah Ochieng",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      viewed: true,
      timestamp: "8h",
    },
    {
      id: "4",
      user: {
        name: "John Mwangi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      viewed: true,
      timestamp: "12h",
    },
    {
      id: "5",
      user: {
        name: "Elizabeth Wanjiku",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elizabeth",
      },
      viewed: false,
      timestamp: "1d",
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
    // Handle story click - in a real app, this would open the story viewer
    console.log(`Viewing story ${storyId}`);
  };

  const handleCreateStory = () => {
    // Handle create story - in a real app, this would open the story creator
    console.log("Creating a new story");
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
    </div>
  );
};

export default SocialFeed;
