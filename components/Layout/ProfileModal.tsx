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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useAppData from "@/hooks/useAppData";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Eye,
  Laptop,
  Lock,
  Moon,
  Settings as SettingsIcon,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";

export function UserProfileModal({ children }: { children: React.ReactNode }) {
  const {
    user,
    updateUser,
    theme,
    setTheme,
    reduceMotion,
    setReduceMotion,
    highContrast,
    setHighContrast,
    emailNotifications,
    setEmailNotifications,
    pushNotifications,
    setPushNotifications,
    profileVisibility,
    setProfileVisibility,
  } = useAppData();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name,
    subtitle: user?.subtitle || "",
    bio: user?.bio || "",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSaveProfile = () => {
    updateUser({
      id: user?.id ?? "",
      ...formData,
    });
    setIsOpen(false);
  };

  const handleChangePassword = () => {
    // In a real app, this would send a password change request to the backend
    console.log("Password change functionality would be implemented here");
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl  flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Profile Settings</DialogTitle>
        </DialogHeader>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="theme">
              <Sun className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="account">
              <Lock className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>
          {/* Profile Tab */}
          <TabsContent
            value="profile"
            className="flex-1 overflow-auto"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.avatar ?? ""}
                    alt={user?.name}
                  />
                  <AvatarFallback>
                    {getInitials(user?.name ?? "")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                >
                  Change Avatar
                </Button>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="name"
                    className="text-right"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="email"
                    className="text-right"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue={user?.email}
                    className="col-span-3"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="subtitle"
                    className="text-right"
                  >
                    Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Your role or position"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label
                    htmlFor="bio"
                    className="text-right pt-2"
                  >
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="col-span-3"
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          {/* Theme Tab */}
          <TabsContent
            value="theme"
            className="flex-1 overflow-auto"
          >
            <div className="flex flex-col space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-gray-500">
                  Customize how Senate.City looks for you.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="theme-mode">Theme</Label>
                    <span className="text-sm text-gray-500">
                      Select your preferred theme mode
                    </span>
                  </div>
                  <Select
                    value={theme}
                    onValueChange={(value) =>
                      setTheme(value as "light" | "dark" | "system")
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center">
                          <Laptop className="h-4 w-4 mr-2" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label>Reduced Motion</Label>
                    <span className="text-sm text-gray-500">
                      Reduce animation effects
                    </span>
                  </div>
                  <Switch
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label>High Contrast</Label>
                    <span className="text-sm text-gray-500">
                      Improve text visibility
                    </span>
                  </div>
                  <Switch
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button onClick={onClose}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          {/* Settings Tab */}
          <TabsContent
            value="settings"
            className="flex-1 overflow-auto"
          >
            <div className="flex flex-col space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-gray-500">
                  Configure your notification preferences.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label>Email Notifications</Label>
                    <span className="text-sm text-gray-500">
                      Receive email updates about activity
                    </span>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label>Push Notifications</Label>
                    <span className="text-sm text-gray-500">
                      Receive push notifications in-app
                    </span>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <Separator />
                <h3 className="text-lg font-medium">Privacy</h3>
                <p className="text-sm text-gray-500">
                  Manage your privacy settings.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label>Profile Visibility</Label>
                    <span className="text-sm text-gray-500">
                      Control who can see your profile
                    </span>
                  </div>
                  <Select
                    value={profileVisibility}
                    onValueChange={(value) =>
                      setProfileVisibility(
                        value as "public" | "contacts" | "private"
                      )
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Public
                        </div>
                      </SelectItem>
                      <SelectItem value="contacts">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Contacts
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2" />
                          Private
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button onClick={onClose}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
          {/* Account Tab */}
          <TabsContent
            value="account"
            className="flex-1 overflow-auto"
          >
            <div className="flex flex-col space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Security</h3>
                <p className="text-sm text-gray-500">
                  Manage your account security settings.
                </p>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="current-password"
                      className="text-right"
                    >
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="new-password"
                      className="text-right"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="confirm-password"
                      className="text-right"
                    >
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-start-2 col-span-3">
                      <Button onClick={handleChangePassword}>
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <h3 className="text-lg font-medium">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <Label>Enable 2FA</Label>
                    <span className="text-sm text-gray-500">
                      Use an authenticator app
                    </span>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <h3 className="text-lg font-medium text-red-600">
                  Danger Zone
                </h3>
                <p className="text-sm text-gray-500">
                  Permanent actions related to your account.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
