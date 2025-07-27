import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-accent-200">
          <p className="text-lg text-accent-500 mb-2">No posts yet</p>
          <p className="text-sm text-accent-400">
            Start sharing your innovative ideas with the community!
          </p>
        </div>
      )}
    </>
  );
};
export default UserStartups;
