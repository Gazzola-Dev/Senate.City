"use client";

import { InviteModal } from "@/components/Layout/InviteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConnections } from "@/hooks/useConnections";
import { useUser } from "@/hooks/useUser";

import { User } from "@/types/app.types";
import {
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";

export function ProfileList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
  const [doubleExpandedProfile, setDoubleExpandedProfile] = useState<
    string | null
  >(null);

  const { users, fetchUsers, isLoadingUser } = useUser();
  const { addConnection, isLoadingConnections } = useConnections();

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, [fetchUsers]);

  // Filter users based on search query
  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProfileClick = (userId: string) => {
    console.log("Profile clicked:", userId);

    if (doubleExpandedProfile === userId) {
      // Collapse fully if already double expanded
      setDoubleExpandedProfile(null);
      setExpandedProfile(null);
    } else if (expandedProfile === userId) {
      // Double expand if already expanded
      setDoubleExpandedProfile(userId);
    } else {
      // Expand if not expanded
      setExpandedProfile(userId);
      setDoubleExpandedProfile(null);
    }
  };

  const handleConnect = async (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await addConnection({ connectedUserId: userId });
  };

  const handleShare = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Share profile:", userId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 mr-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search profiles..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <InviteModal>
          <Button
            size="icon"
            aria-label="Add new contact"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </InviteModal>
      </div>

      {isLoadingUser ? (
        <div className="flex justify-center p-8">Loading profiles...</div>
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto">
          {filteredUsers.map((user) => (
            <ProfileListItem
              key={user.id}
              user={user}
              isExpanded={expandedProfile === user.id}
              isDoubleExpanded={doubleExpandedProfile === user.id}
              onClick={() => handleProfileClick(user.id)}
              onConnect={(e) => handleConnect(user.id, e)}
              onShare={(e) => handleShare(user.id, e)}
              isConnecting={isLoadingConnections}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProfileListItemProps {
  user: User;
  isExpanded: boolean;
  isDoubleExpanded: boolean;
  onClick: () => void;
  onConnect: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
  isConnecting: boolean;
}

function ProfileListItem({
  user,
  isExpanded,
  isDoubleExpanded,
  onClick,
  onConnect,
  onShare,
  isConnecting,
}: ProfileListItemProps) {
  let className =
    "transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer";

  // Default (square)
  if (!isExpanded && !isDoubleExpanded) {
    className += " col-span-1 aspect-square flex items-center justify-center";
  }
  // Expanded (full width)
  else if (isExpanded && !isDoubleExpanded) {
    className += " col-span-2 flex items-center";
  }
  // Double expanded (taller)
  else if (isDoubleExpanded) {
    className += " col-span-2 grid grid-rows-[auto_auto_auto] gap-2";
  }

  return (
    <div
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Default view - just avatar */}
      {!isExpanded && !isDoubleExpanded && (
        <Avatar className="h-14 w-14">
          <AvatarImage
            src={user.avatar ?? ""}
            alt={user.name}
          />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      )}

      {/* Expanded view - avatar and name */}
      {isExpanded && !isDoubleExpanded && (
        <>
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={user.avatar ?? ""}
              alt={user.name}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{user.name}</div>
        </>
      )}

      {/* Double expanded view - avatar, name, subtitle, bio, action buttons */}
      {isDoubleExpanded && (
        <div className="flex flex-col h-full">
          <div className="flex items-start mb-2">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage
                src={user.avatar ?? ""}
                alt={user.name}
              />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              {user.subtitle && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {user.subtitle}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-start space-x-2 mb-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Message user:", user.id);
              }}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onConnect}
              disabled={isConnecting}
            >
              <Plus className="h-4 w-4 mr-1" />
              Connect
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onShare}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                console.log("More options for user:", user.id);
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {user.bio && (
            <div className="text-sm text-gray-600 dark:text-gray-300 overflow-hidden">
              {user.bio}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function
function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
