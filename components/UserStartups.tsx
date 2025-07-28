import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Lightbulb, Plus } from "lucide-react";
import Link from "next/link";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <div className="col-span-full">
          <div className="text-center py-16 bg-white rounded-2xl shadow-soft border border-neutral-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No startups yet
            </h3>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              Start sharing your innovative ideas with the entrepreneurial community and get valuable feedback.
            </p>
            <Link 
              href="/startup/create"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 focus-ring"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Pitch
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserStartups;