import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BYID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import formateDate from "../../../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Calendar, Eye, User, Tag, ExternalLink } from "lucide-react";

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: topPicks }] = await Promise.all([
    client.fetch(STARTUP_BYID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "top-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="hero-container !min-h-[400px]">
        <div className="hero-badge">
          <Calendar className="w-4 h-4 mr-2" />
          <time dateTime={post._createdAt}>
            {formateDate(post._createdAt)}
          </time>
        </div>
        
        <h1 className="hero-title !text-4xl md:!text-5xl">
          {post.title}
        </h1>
        
        <p className="hero-subtitle">
          {post.description}
        </p>
      </section>

      <section className="section-container bg-gradient-to-b from-white to-neutral-50">
        <div className="detail-container">
          {/* Startup Image */}
          {post.image && (
            <div className="detail-content">
              <img
                src={post.image}
                alt={`${post.title} preview`}
                className="w-full h-auto max-h-96 object-cover rounded-xl shadow-medium"
              />
            </div>
          )}

          {/* Author & Category Info */}
          <div className="detail-header">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <Link
                href={`/user/${post.author?.id}`}
                className="detail-author focus-ring rounded-xl"
              >
                <div className="detail-author-avatar">
                  {post.author?.image ? (
                    <Image
                      src={post.author.image}
                      alt={`${post.author.name}'s profile`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-600" />
                    </div>
                  )}
                </div>
                
                <div className="detail-author-info">
                  <h3 className="detail-author-name">
                    {post.author?.name || "Anonymous"}
                  </h3>
                  <p className="detail-author-username">
                    @{post.author?.username || "unknown"}
                  </p>
                  {post.author?.bio && (
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                      {post.author.bio}
                    </p>
                  )}
                </div>
                
                <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors duration-200" />
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium">{post.category}</span>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-600 rounded-full">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">{post.view || 0} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pitch Content */}
          <div className="detail-content">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
              Pitch Details
            </h2>
            
            {parsedContent ? (
              <article
                className="prose prose-lg max-w-none font-work-sans break-words"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-neutral-500 italic">
                  No detailed pitch provided yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Top Picks Section */}
        {topPicks?.length > 0 && (
          <>
            <hr className="my-16 border-neutral-200" />
            <div className="detail-container">
              <div className="text-center mb-12">
                <h2 className="section-title">Editor's Top Picks</h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  Discover other innovative startups that caught our attention
                </p>
              </div>

              <div className="card-grid-sm">
                {topPicks.map((startup: StartupTypeCard, i: number) => (
                  <StartupCard key={i} post={startup} />
                ))}
              </div>
            </div>
          </>
        )}

        <Suspense fallback={<Skeleton className="h-12 w-32 fixed bottom-6 right-6 rounded-full" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;