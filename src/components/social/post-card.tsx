"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostInteraction } from "./post-interaction";
import { CommentSection } from "./comment-section";
import { ShareDialog } from "./share-dialog";

export interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
  currentUser: {
    name: string;
    avatar: string;
  };
}

export function PostCard({ post, currentUser }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <span>{post.author.role}</span>
              <span className="mx-1">•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3">{post.content}</p>
        {post.image && (
          <div className="rounded-md overflow-hidden">
            <img
              src={post.image}
              alt="Post image"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col border-t pt-3">
        <PostInteraction
          initialLikes={post.likes}
          initialComments={post.comments}
          onComment={toggleComments}
          onShare={handleShare}
        />

        {showComments && (
          <div className="mt-4 w-full">
            <CommentSection
              postId={post.id}
              currentUser={currentUser}
              initialComments={[
                // Mock initial comments
                {
                  id: "comment-1",
                  author: {
                    name: "Jane Doe",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
                  },
                  content:
                    "Great post! Looking forward to seeing more of your produce.",
                  timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                },
              ]}
            />
          </div>
        )}
      </CardFooter>

      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        postId={post.id}
        postTitle={post.content.substring(0, 50) + "..."}
      />
    </Card>
  );
}
