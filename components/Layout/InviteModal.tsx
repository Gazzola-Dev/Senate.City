"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

export function InviteModal({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState("");
  const [useMultiple, setUseMultiple] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  // Validate a single email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate multiple emails
  const hasValidEmails = () => {
    if (!useMultiple) {
      return isValidEmail(email);
    }
    const emailList = emails.split(",").map((e) => e.trim());
    return emailList.some(isValidEmail);
  };

  const handleSubmit = () => {
    if (useMultiple) {
      console.log(
        "Inviting multiple users:",
        emails.split(",").map((e) => e.trim())
      );
    } else {
      console.log("Inviting user:", email);
    }
    // Reset form and close modal
    setEmail("");
    setEmails("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to Senate.City</DialogTitle>
          <DialogDescription>
            Invite colleagues to join your network on Senate.City.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 my-4">
          <Label htmlFor="multiple-mode">Multiple emails</Label>
          <Switch
            id="multiple-mode"
            checked={useMultiple}
            onCheckedChange={setUseMultiple}
          />
        </div>
        {!useMultiple ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="email"
                className="text-right"
              >
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@example.com"
                className="col-span-3"
              />
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="emails"
                className="text-right"
              >
                Emails
              </Label>
              <Textarea
                id="emails"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="colleague1@example.com, colleague2@example.com"
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!hasValidEmails()}
          >
            Send Invites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
