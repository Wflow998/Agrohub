import React from "react";
import { PostCard } from "./post-card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { RefreshCw } from "lucide-react";

interface Post {
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

interface PostListProps {
  posts?: Post[];
  currentUser: {
    name: string;
    avatar: string;
  };
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
}

const PostList = ({
  posts = [],
  currentUser,
  isLoading = false,
  hasMore = true,
  onLoadMore = () => {},
  onRefresh = () => {},
}: PostListProps) => {
  return (
    <div className="space-y-4 bg-background">
      {/* Refresh button */}
      <div className="flex justify-end mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          className="flex items-center gap-1 text-muted-foreground"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Posts list */}
      {!isLoading && posts.length === 0 && (
        <div className="text-center py-8 border rounded-xl">
          <p className="text-muted-foreground">No posts to display</p>
          <Button onClick={onRefresh} className="mt-4">
            Refresh Feed
          </Button>
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} currentUser={currentUser} />
            ))}
          </div>

          {/* Load more button */}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={onLoadMore}
                className="w-full max-w-md"
              >
                Load More Posts
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
