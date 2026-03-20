import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "403",
  description: "You don’t have permission to view this page",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500">403</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Access Denied
        </h2>

        <p className="mt-2 text-gray-600">
          You don’t have permission to view this page.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          {/* <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
          >
            Go Back
          </button> */}
          <Button asChild>
            <Link href="/dashboard">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
