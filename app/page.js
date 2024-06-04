"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the add page when the component mounts
    router.push("/add");
  }, []);

  // Render nothing on the index page as we are redirecting
  return null;
}
