import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1>Page not Found</h1>
      <p className="font-bold text-5xl">404</p>
      <Button>
        <Link href="/dashboard">Return Home</Link>
      </Button>
    </div>
  );
}
