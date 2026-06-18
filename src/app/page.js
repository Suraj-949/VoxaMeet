"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "./components/Header";
import MeetingFeature from "./components/MeetingFeature";


export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);

      const hasShownWelcome = localStorage.getItem("hasShownWelcome");

      if (!hasShownWelcome) {
        toast.success(`Welcome ${session.user.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }
    }
    else {
      setIsLoading(false);
    }
  }, [status, session]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow p-0 pt-32">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row item-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Video calls and meetings for everyone
              </h1>

              <p className="text-3xl text-gray-600 dark:text-gray-300 mb-12">
                Connect with your team anytime, anywhere. Join or start meetings with Google Meet.
              </p>

              Meeting Action
            </div>

            <div className="md:w-1/2 flex justify-center">
              <MeetingFeature />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
