"use client";
import { PostModal } from "@/components/Layout/PostModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAppData from "@/hooks/useAppData";
import { useNetworkData } from "@/hooks/useNetworkData";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { format } from "date-fns";
import { MessageSquare, Share, ThumbsUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the network visualization component to avoid SSR issues
const NetworkGraph = dynamic(
  () => import("@/components/Dashboard/NetworkGraph"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        Loading network visualization...
      </div>
    ),
  }
);

export function FeedTabs() {
  const { setPost } = useAppData();
  const { posts, updatePost, fetchPosts, isLoadingPosts } = usePosts();
  const { users, fetchUsers, isLoadingUser } = useUser();
  const { fetchNetworkData, isLoadingNetwork } = useNetworkData();
  const [activeTab, setActiveTab] = useState("posts");

  // Fetch posts, users, and network data when component mounts
  useEffect(() => {
    fetchPosts();
    fetchUsers();
    fetchNetworkData();
  }, [fetchPosts, fetchUsers, fetchNetworkData]);

  const handlePostClick = (postId: string) => {
    const selectedPost = posts.find((post) => post.id === postId);
    if (selectedPost) {
      setPost(selectedPost);
    }
  };

  const handleLikePost = (
    postId: string,
    currentLikes: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    updatePost({
      postId: postId,
      likes: currentLikes + 1,
    });
  };

  const getUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  const isLoading = isLoadingPosts || isLoadingUser || isLoadingNetwork;

  return (
    <Tabs
      defaultValue="posts"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        {isLoading ? (
          <div className="flex justify-center p-8">Loading posts...</div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const user = getUserById(post.user_id);
              return (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePostClick(post.id)}
                >
                  <PostModal post={post}>
                    <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                      <Avatar>
                        <AvatarImage
                          src={user?.avatar ?? ""}
                          alt={user?.name}
                        />
                        <AvatarFallback>
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : ""}
                        </AvatarFallback>
                      </Avatar>
                      <div onClick={() => handlePostClick(post.id)}>
                        <CardTitle className="text-lg">{user?.name}</CardTitle>
                        {post.created_at && (
                          <CardDescription>
                            {format(
                              new Date(post.created_at),
                              "MMM d, yyyy, h:mm a"
                            )}
                          </CardDescription>
                        )}
                        <CardContent className="p-0 pt-2">
                          <p className="text-sm line-clamp-2">{post.content}</p>
                        </CardContent>
                      </div>
                    </CardHeader>
                  </PostModal>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500"
                        onClick={(e) => handleLikePost(post.id, post.likes, e)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostClick(post.id);
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span>{post.comments}</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Share post:", post.id);
                      }}
                    >
                      <Share className="h-4 w-4 mr-2" />
                      <span>Share</span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </TabsContent>
      <TabsContent value="network">
        <Card>
          <CardHeader>
            <CardTitle>Network Visualization</CardTitle>
            <CardDescription>
              Interactive visualization of post connections and weights
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                Loading network data...
              </div>
            ) : (
              <NetworkGraph onNodeClick={(nodeId) => handlePostClick(nodeId)} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
