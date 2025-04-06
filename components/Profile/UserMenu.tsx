// components/user-menu.tsx
"use client";

import { UserProfileModal } from "@/components/Layout/ProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppData } from "@/Providers/AppProvider";

export function UserMenu() {
  const { user } = useAppData();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <UserProfileModal>
        <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage
            src={user.avatar}
            alt={user.name}
          />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </UserProfileModal>
    </>
  );
}
