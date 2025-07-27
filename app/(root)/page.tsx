import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log("session id: ", session?.id);
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startups <br /> connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container bg-gradient-to-b from-white to-accent-50">
        <h2 className="text-2xl font-bold text-black-700 mb-8">
          {query ? `Search result for "${query}"` : "All Startups"}
        </h2>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-accent-500">No Startups Found.</p>
              <p className="text-sm text-accent-400 mt-2">
                Try adjusting your search terms or browse all startups.
              </p>
            </div>
          )}
        </ul>
      </section>
    </>
  );
}
