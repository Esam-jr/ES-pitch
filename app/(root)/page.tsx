import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { Rocket, TrendingUp, Users, ArrowRight, PlayCircle } from "lucide-react";
import Particles from "@/components/Particles";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  return (
    <>
      <section className="hero-container">
        {/* particle background */}
        <Particles className="absolute inset-0 z-0 pointer-events-none" density={0.00006} maxParticles={140} connectDistance={120} />
        {/* backdrop visuals */}
        <div aria-hidden className="hero-spotlight" />
        <div aria-hidden className="hero-orb primary one" />
        <div aria-hidden className="hero-orb secondary two" />
        <div aria-hidden className="hero-orb primary three" />

        <div className="hero-badge">
          <Rocket className="w-4 h-4 mr-2" />
          <span>Welcome to ES Pitch</span>
        </div>
        
        <h1 className="hero-title">
          Pitch Your Startup,<br />
          Connect with Entrepreneurs
        </h1>
        
        <p className="hero-subtitle">
          Submit innovative ideas, vote on promising pitches, and get noticed in our thriving entrepreneurial community. Turn your vision into reality.
        </p>
        
        <SearchForm query={query} />

        <div className="hero-cta-group">
          <a href="/startup/create" className="hero-cta-primary">
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a href="#discover" className="hero-cta-secondary">
            Watch Demo <PlayCircle className="w-5 h-5 ml-2 text-primary-500" />
          </a>
        </div>
        
        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary-500" />
            <span>Trending Ideas</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-secondary-500" />
            <span>Active Community</span>
          </div>
        </div>
      </section>

      <section id="discover" className="section-container bg-gradient-to-b from-white to-neutral-50">
        <div className="text-center mb-12">
          <h2 className="section-title">
            {query ? (
              <>
                Search Results for <span className="text-primary-600">"{query}"</span>
              </>
            ) : (
              "Discover Innovative Startups"
            )}
          </h2>
          {!query && (
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore groundbreaking ideas from entrepreneurs around the world. Find inspiration, provide feedback, and connect with innovators.
            </p>
          )}
        </div>

        {posts?.length > 0 ? (
          <div className="card-grid">
            {posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
              <Rocket className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
              {query ? "No results found" : "No startups yet"}
            </h3>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              {query 
                ? "Try adjusting your search terms or browse all startups to discover amazing ideas."
                : "Be the first to share your innovative startup idea with our community."
              }
            </p>
            {!query && session && (
              <a
                href="/startup/create"
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105 focus-ring"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Submit Your Pitch
              </a>
            )}
          </div>
        )}
      </section>
    </>
  );
}