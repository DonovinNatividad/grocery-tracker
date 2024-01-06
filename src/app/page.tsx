import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  /* This is a sample backend call from a trpc api endpoint that
  /* loads a message from the post.ts file in the server/api/routers/post.ts file
  This can be used for other items such as database CRUD operations and maybe authentication? not sure */ 
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#769774] to-[#35dd30] text-[#dde4dd]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to <span className="text-[#dde4dd]">Grocery Tracker</span>
        </h1>
        <p className="text-2xl">
          Track the expiration dates of your groceries and minimize food waste.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/get-started"
          >
            <h3 className="text-2xl font-bold">Get Started →</h3>
            <div className="text-lg">
              Learn how to track your groceries and minimize food waste.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/about"
          >
            <h3 className="text-2xl font-bold">About →</h3>
            <div className="text-lg">
              Learn more about our mission to reduce food waste.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}