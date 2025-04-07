"use client";
import useAppData from "@/hooks/useAppData";
import { useAppInitialization } from "@/hooks/useAppInit";
import useSupabase from "@/hooks/useSupabase";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AuthConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = useSupabase();
  const { setUser, setLoading } = useAppData();
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const { initialize } = useAppInitialization();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        setLoading(true);
        // Get token hash and type from URL
        const token_hash = searchParams.get("token_hash");
        const type = searchParams.get("type");

        if (!token_hash || !type) {
          throw new Error("Invalid verification link. Missing token or type.");
        }

        const res = await supabase?.auth.verifyOtp({
          token_hash,
          /* eslint-disable @typescript-eslint/no-explicit-any */
          type: type as any,
          /* eslint-enable @typescript-eslint/no-explicit-any */
        });

        if (res?.error) throw res.error;

        // On successful verification
        setVerificationStatus("success");

        // Show success message
        toast("Email verified!");

        // Fetch the user and update app state
        const userRes = await supabase?.auth.getUser();

        if (userRes?.data?.user) {
          console.log("User data:", userRes.data.user);
          initialize(userRes.data.user.id);

          // Redirect to dashboard after a brief delay
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (error: any) {
        /* eslint-enable @typescript-eslint/no-explicit-any */
        console.error("Error during email confirmation:", error);
        setVerificationStatus("error");

        toast.error(
          error.message || "Failed to verify email. Please try again."
        );

        // Redirect to login page after error
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, router, supabase, setUser, setLoading, initialize]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        {verificationStatus === "pending" && (
          <>
            <LoaderCircle className="h-12 w-12 animate-spin mx-auto text-blue-600" />
            <h1 className="text-2xl font-semibold">Verifying your email...</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {verificationStatus === "success" && (
          <>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Email verified!</h1>
            <p className="text-gray-600 dark:text-gray-400">
              You&apos;ve successfully verified your email. Redirecting to
              dashboard...
            </p>
          </>
        )}

        {verificationStatus === "error" && (
          <>
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Verification failed</h1>
            <p className="text-gray-600 dark:text-gray-400">
              There was a problem verifying your email. Redirecting to login
              page...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
