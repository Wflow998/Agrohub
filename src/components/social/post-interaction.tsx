"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostInteractionProps {
  initialLikes: number;
  initialComments: number;
  onComment?: () => void;
  onShare?: () => void;
}

export function PostInteraction({
  initialLikes,
  initialComments,
  onComment,
  onShare,
}: PostInteractionProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="flex justify-between w-full">
      <Button
        variant="ghost"
        size="sm"
        className={cn("flex items-center gap-1", liked && "text-red-500")}
        onClick={handleLike}
      >
        <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        <span>{likes}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={onComment}
      >
        <MessageCircle className="h-4 w-4" />
        <span>{initialComments}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn("flex items-center gap-1", saved && "text-primary")}
        onClick={handleSave}
      >
        <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
        <span>Save</span>
      </Button>
    </div>
  );
}
