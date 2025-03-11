"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image, MapPin, Smile } from "lucide-react";
import { useState } from "react";

interface CreatePostProps {
  user: {
    name: string;
    avatar: string;
  };
  onPostCreated?: (content: string) => void;
}

export function CreatePost({ user, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    // Simulate post creation - in a real app, this would call an API
    setTimeout(() => {
      if (onPostCreated) onPostCreated(content);
      setContent("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea
            placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
            className="flex-1 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Image className="h-4 w-4 mr-2" />
            Photo
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Camera className="h-4 w-4 mr-2" />
            Video
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Smile className="h-4 w-4 mr-2" />
            Feeling
          </Button>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
