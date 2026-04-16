import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen p-6">
      <h1>Page not Found</h1>
      <p className="font-bold text-5xl">404</p>
      <Button asChild>
        <Link href="/dashboard">Go Home</Link>
      </Button>
    </div>
  );
}
