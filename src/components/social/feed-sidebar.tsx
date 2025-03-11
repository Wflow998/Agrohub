import React from "react";
import { Card } from "../ui/card";
import TrendingHashtags from "./trending-hashtags";
import SuggestedConnections from "./suggested-connections";
import { WeatherWidget } from "../dashboard/weather-widget";
import { CropRecommendations } from "../dashboard/crop-recommendations";

interface FeedSidebarProps {
  location?: string;
  hashtags?: Array<{ tag: string; posts: number }>;
  connections?: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
    mutualConnections?: number;
    location?: string;
  }>;
  onTagClick?: (tag: string) => void;
}

const FeedSidebar = ({
  location = "Nairobi, Kenya",
  hashtags = [
    { tag: "OrganicFarming", posts: 1243 },
    { tag: "AgriTech", posts: 876 },
    { tag: "FarmToTable", posts: 654 },
    { tag: "Sustainability", posts: 521 },
    { tag: "LocalProduce", posts: 498 },
  ],
  connections = [
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
  ],
  onTagClick = () => {},
}: FeedSidebarProps) => {
  return (
    <div className="space-y-6 bg-background">
      <WeatherWidget location={location} />

      <CropRecommendations location={location.split(",")[0] + " Region"} />

      <TrendingHashtags hashtags={hashtags} onTagClick={onTagClick} />

      <SuggestedConnections
        connections={connections}
        title="People to Connect With"
        showLocation={true}
        maxDisplay={3}
      />
    </div>
  );
};

export default FeedSidebar;
