import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container min-h-screen">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-xl font-black text-black-800 uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-2xl font-extrabold text-primary-700 mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-3 text-center text-sm text-accent-600 max-w-xs leading-relaxed">
            {user?.bio || "No bio available"}
          </p>
          <div className="mt-4 flex justify-center">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              Entrepreneur
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 lg:-mt-5">
          <h2 className="text-2xl font-bold text-black-700">
            {session?.id === id ? "Your" : "All"} Startups
          </h2>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
