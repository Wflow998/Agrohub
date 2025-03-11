"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  viewed: boolean;
  timestamp: string;
}

interface StoriesCarouselProps {
  stories?: Story[];
  currentUser?: {
    name: string;
    avatar: string;
  };
  onStoryClick?: (storyId: string) => void;
  onCreateStory?: () => void;
}

const StoriesCarousel = ({
  stories = [
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
    {
      id: "6",
      user: {
        name: "Michael Omondi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      },
      viewed: true,
      timestamp: "1d",
    },
    {
      id: "7",
      user: {
        name: "Grace Akinyi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace",
      },
      viewed: false,
      timestamp: "2d",
    },
  ],
  currentUser = {
    name: "John Farmer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  onStoryClick = () => {},
  onCreateStory = () => {},
}: StoriesCarouselProps) => {
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);

  return (
    <Card className="w-full bg-card mb-6">
      <CardContent className="p-4">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* Create Story Item */}
            <CarouselItem className="basis-1/6 sm:basis-1/6 md:basis-1/7 lg:basis-1/8">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-background bg-muted">
                    <AvatarImage src={currentUser.avatar} alt="Your avatar" />
                    <AvatarFallback>
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="primary"
                    className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground"
                    onClick={onCreateStory}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xs font-medium text-center">
                  Add Story
                </span>
              </div>
            </CarouselItem>

            {/* Story Items */}
            {stories.map((story) => (
              <CarouselItem
                key={story.id}
                className="basis-1/6 sm:basis-1/6 md:basis-1/7 lg:basis-1/8"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="flex flex-col items-center space-y-2 cursor-pointer"
                        onClick={() => onStoryClick(story.id)}
                        onMouseEnter={() => setHoveredStory(story.id)}
                        onMouseLeave={() => setHoveredStory(null)}
                      >
                        <Avatar
                          className={`h-16 w-16 border-2 ${story.viewed ? "border-muted" : "border-primary"}`}
                        >
                          <AvatarImage
                            src={story.user.avatar}
                            alt={story.user.name}
                          />
                          <AvatarFallback>
                            {story.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-center truncate w-full">
                          {story.user.name.split(" ")[0]}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{story.user.name}</p>
                      <p className="text-xs opacity-70">{story.timestamp}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-2">
            <CarouselPrevious className="static translate-y-0 h-8 w-8" />
            <CarouselNext className="static translate-y-0 h-8 w-8" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default StoriesCarousel;
