import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to MindPad
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Your collaborative knowledge space. Create, share and organize
                  your thoughts with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/sign">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Collaborative Editing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Work together in real-time with your team members.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Smart Organization</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep your notes organized with intelligent categorization.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your data is encrypted and securely stored in the cloud.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 py-6 md:flex-row md:justify-between md:py-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 MindPad. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center justify-center gap-4 md:justify-end">
            <Link
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
              href="/terms"
            >
              Terms
            </Link>
            <Link
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
              href="/privacy"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
