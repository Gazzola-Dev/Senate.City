import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Users,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const IntroSlides = ({ email }: { email: string }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const totalPages = 5;
  const slideDuration = 4500;
  const progressUpdateInterval = 50; // Update progress every 50ms for smooth animation

  // Function to reset and restart all timers
  const resetAndRestartTimers = useCallback(() => {
    // Clear existing timers
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }

    // Reset progress
    setProgress(0);

    // Only start timers if not on the last page
    if (currentPage < totalPages - 1) {
      // Start progress animation
      const startTime = Date.now();

      progressTimerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / slideDuration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(progressTimerRef.current!);
        }
      }, progressUpdateInterval);

      // Start auto slideshow
      autoSlideTimerRef.current = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev === totalPages - 1) return prev;
          return prev + 1;
        });
      }, slideDuration);
    }
  }, [currentPage, totalPages, slideDuration]);

  // Effect to handle timer resets and restarts when page or pause state changes
  useEffect(() => {
    resetAndRestartTimers();

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [currentPage, resetAndRestartTimers]);

  // Define explicit handlers for prev and next buttons
  const handlePrevClick = () => {
    // Go to previous page if not already at the first page
    setCurrentPage((prev) => (prev === 0 ? prev : prev - 1));
    // Timer will automatically reset because of the useEffect triggered by currentPage change
  };

  const handleNextClick = () => {
    // Go to next page if not already at the last page
    setCurrentPage((prev) => (prev === totalPages - 1 ? prev : prev + 1));
    // Timer will automatically reset because of the useEffect triggered by currentPage change
  };

  const handleDotClick = (index: number) => {
    // Update the current page
    setCurrentPage(index);
    // Timer will automatically reset because of the useEffect triggered by currentPage change
  };

  return (
    <div className="h-full w-full flex items-center justify-center pt-24 select-none font-semibold">
      <div className="bg-white rounded-lg shadow-lg w-80 h-120 overflow-hidden relative">
        {/* Page Content */}
        <div className="h-full">
          {/* Page 1 - Welcome User */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col items-center justify-center transition-opacity duration-500",
              currentPage === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <h2 className="text-xl font-bold text-center mb-3">Welcome</h2>
            <p className="text-center text-slate-600 mb-4 font-medium italic">
              {email}
            </p>
            <p className="text-center text-slate-600">Thank you for joining!</p>
          </div>

          {/* Page 2 - Why Senate.City */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col items-center justify-center transition-opacity duration-500",
              currentPage === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <h2 className="text-xl font-bold text-center mb-3">
              Why Senate.City?
            </h2>
            <ul className="text-center text-slate-600">
              <li>
                Because we need transparent, accessible and flexible
                communication tools
              </li>
            </ul>
          </div>

          {/* Page 3 - Open Source */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col items-center justify-center transition-opacity duration-500",
              currentPage === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Github className="w-16 h-16 mb-6 text-slate-800" />
            <h2 className="text-xl font-bold text-center mb-3">Open Source</h2>
            <p className="text-center text-slate-600">
              This project is open source on GitHub!
            </p>
          </div>

          {/* Page 4 - Community Driven */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col items-center justify-center transition-opacity duration-500",
              currentPage === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Users className="w-16 h-16 mb-6 text-slate-800" />
            <h2 className="text-xl font-bold text-center mb-3">
              Community Driven
            </h2>
            <p className="text-center text-slate-600">
              Your algorith, your data, your community.
            </p>
          </div>

          {/* Page 5 - Coming Soon */}
          <div
            className={cn(
              "absolute inset-0 p-6 flex flex-col items-center justify-center transition-opacity duration-500",
              currentPage === 4 ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <h2 className="text-xl font-bold text-center mb-4">Coming Soon!</h2>
            <Youtube className="w-12 h-12 mx-auto mb-4 text-slate-800" />

            <p className="text-center text-slate-600 mb-4">
              This project is a work in progress. Stay tuned for exciting
              updates!
            </p>

            <a
              href="https://www.youtube.com/@AzAnything"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-blue-500 hover:text-blue-700 mt-2 font-medium"
            >
              @AzAnything
            </a>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-4 items-center z-10">
          <Button
            variant="ghost"
            onClick={handlePrevClick}
            disabled={currentPage === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </Button>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "rounded-full transition-all duration-300",
                  currentPage === index
                    ? "w-3 h-3 bg-blue-600"
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={handleNextClick}
            disabled={currentPage === totalPages - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 px-0 z-20">
          <Progress
            value={progress}
            className={cn(
              "h-1 rounded-none transition-opacity",
              currentPage === totalPages - 1 ? "opacity-0" : "opacity-100"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSlides;
