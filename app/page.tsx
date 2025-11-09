import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
          Self-Coaching App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md">
          Start your journey to personal growth and self-discovery
        </p>
        <Link href="/onboarding">
          <Button variant="default" className="px-8 h-14 text-lg" size="lg">
            Start Onboarding
          </Button>
        </Link>
      </main>
    </div>
  );
}
