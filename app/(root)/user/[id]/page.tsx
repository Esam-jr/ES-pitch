import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";
import { User, MapPin, Calendar, Briefcase } from "lucide-react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  const isOwnProfile = session?.id === id;

  return (
    <>
      <section className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="relative">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  width={128}
                  height={128}
                  className="profile-avatar"
                />
              ) : (
                <div className="profile-avatar bg-primary-100 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-600" />
                </div>
              )}
              
              {/* Online indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 border-4 border-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <h1 className="profile-name">
                {user.name || "Anonymous User"}
              </h1>
              
              <p className="profile-username">
                @{user?.username || "unknown"}
              </p>
              
              {user?.bio && (
                <p className="profile-bio mt-4">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          {/* Profile Stats */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Briefcase className="w-4 h-4" />
                <span>Entrepreneur</span>
              </div>
              
              {user.email && (
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Calendar className="w-4 h-4" />
                  <span>Member since 2024</span>
                </div>
              )}
            </div>
            
            <div className="profile-badge mt-6">
              <span>Active Member</span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">
                {isOwnProfile ? "Your Startup Pitches" : `${user.name}'s Startup Pitches`}
              </h2>
              
              <div className="text-sm text-neutral-500">
                {isOwnProfile ? "Manage your ideas" : "Explore their innovations"}
              </div>
            </div>
            
            <div className="card-grid-sm">
              <Suspense fallback={<StartupCardSkeleton />}>
                <UserStartups id={id} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;