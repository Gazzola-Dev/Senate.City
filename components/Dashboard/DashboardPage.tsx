"use client";
import { FeedTabs } from "@/components/Dashboard/FeedTabs";
import { ProfileList } from "@/components/Profile/ProfileList";
import { UserMenu } from "@/components/Profile/UserMenu";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAppData from "@/hooks/useAppData";

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, LoaderCircle, MailOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DashboardPage() {
  const { user } = useAppData();
  const { signInWithMagicLink, isAuthLoading } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = form.watch("email");
  const { isValid } = form.formState;
  const emailIsValid = emailValue && isValid;

  const handleSubmit = async (data: FormValues) => {
    try {
      const success = await signInWithMagicLink(data.email);

      if (success) {
        toast("Success! Check your email for a magic link to sign in");
      }
    } catch (error) {
      const err = error as Error;
      toast(err?.message || "Failed to send magic link");
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="w-full max-w-sm p-8 space-y-8">
          <div className="flex flex-col items-center justify-center gap-6 mb-8">
            <h1 className="text-2xl font-bold text-center">Senate.City</h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!emailIsValid || isAuthLoading}
              >
                <div
                  className={cn(
                    "flex items-center justify-center gap-2",
                    isAuthLoading && "animate-pulse"
                  )}
                >
                  Send Magic Link
                  <div className="ml-2">
                    {isAuthLoading ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <MailOpen className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </Button>
            </form>
          </Form>

          <div className="mt-4 p-3 border border-green-200 rounded-md bg-green-50 text-sm text-green-700">
            <div className="flex items-start gap-2">
              <MailOpen className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                <span className="font-medium">Privacy Notice:</span> Your email
                will not be used for anything other than authentication.
              </p>
            </div>
          </div>

          <div className="mt-3 p-4 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <InfoIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p>
                <span className="font-medium">Beta Notice:</span> User data will
                be periodically deleted until the app reaches a stable state.
                Any data added might be lost at any time, and the user
                experience could change without notice. To delete your account,
                please email{" "}
                <a
                  href="mailto:az@gazzola.dev"
                  className="text-blue-600 hover:underline"
                >
                  az@gazzola.dev
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
