"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useComments } from "@/hooks/useComments";
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { Post } from "@/types/app.types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Bookmark, MessageSquare, Share, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

export function PostModal({
  children,
  post,
}: {
  children: React.ReactNode;
  post: Post;
}) {
  const { user, users } = useUser();
  const { updatePost } = usePosts();
  const { addComment } = useComments();

  const [commentText, setCommentText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  // Sync the post data when it changes or dialog opens
  useEffect(() => {
    setCurrentPost(post);
  }, [post, isOpen]);

  const postUser = users.find((u) => u.id === currentPost.user_id);
  if (!postUser) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLike = () => {
    const updatedPost = {
      ...currentPost,
      likes: currentPost.likes + 1,
    };
    updatePost({
      postId: currentPost.id,
      likes: currentPost.likes + 1,
    });
    setCurrentPost(updatedPost);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // Add a comment through the hook
    await addComment({
      postId: currentPost.id,
      content: commentText,
    });

    setCommentText("");
  };

  const handleShare = () => {
    // Share post functionality would be implemented here
    console.log("Share post:", currentPost.id);
  };

  const handleBookmark = () => {
    // Bookmark post functionality would be implemented here
    console.log("Bookmark post:", currentPost.id);
  };

  // Prepare comments for display
  const comments = currentPost.commentsList || [];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={postUser.avatar ?? ""}
                alt={postUser.name}
              />
              <AvatarFallback>{getInitials(postUser.name)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-lg">{postUser.name}</DialogTitle>
              <p className="text-sm text-gray-500">
                {new Date(currentPost.created_at ?? "").toLocaleString(
                  undefined,
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }
                )}
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-2 mb-4">
          <p className="text-base whitespace-pre-line">{currentPost.content}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 py-2">
          <span>{currentPost.likes} likes</span>
          <span>{currentPost.comments} comments</span>
        </div>
        <Separator />
        <div className="flex justify-between py-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              document
                .getElementById(`comment-input-${currentPost.id}`)
                ?.focus()
            }
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        <Separator />

        {/* Comment form */}
        <form
          onSubmit={handleComment}
          className="flex items-center space-x-2 mt-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar ?? ""}
              alt={user?.name}
            />
            <AvatarFallback>{getInitials(user?.name ?? "")}</AvatarFallback>
          </Avatar>
          <Input
            id={`comment-input-${currentPost.id}`}
            className="flex-1"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!commentText.trim()}
          >
            Post
          </Button>
        </form>

        {/* Comments section */}
        <div className="mt-4 max-h-60 overflow-y-auto space-y-3">
          {comments && comments.length > 0 ? (
            comments.map((comment) => {
              const commentUser = users.find((u) => u.id === comment.user_id);
              if (!commentUser) return null;

              return (
                <div
                  key={comment.id}
                  className="flex space-x-2"
                >
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarImage
                      src={commentUser.avatar ?? ""}
                      alt={commentUser.name}
                    />
                    <AvatarFallback>
                      {getInitials(commentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">
                        {commentUser.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(comment.created_at ?? "").toLocaleString(
                          undefined,
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-sm mt-1 break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 my-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
