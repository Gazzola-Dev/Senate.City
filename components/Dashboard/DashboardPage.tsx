// app/dashboard/page.tsx
"use client";

import { FeedTabs } from "@/components/Dashboard/FeedTabs";
import { ProfileList } from "@/components/Profile/ProfileList";
import { UserMenu } from "@/components/Profile/UserMenu";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="fixed top-4 right-4 z-50">
        <UserMenu />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <ProfileList />
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <FeedTabs />
        </div>
      </div>
    </div>
  );
}
