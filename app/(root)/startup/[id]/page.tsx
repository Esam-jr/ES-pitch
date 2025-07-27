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
const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: toppicks }] = await Promise.all([
    client.fetch(STARTUP_BYID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "top-picks",
    }),
  ]);
  const parsedContent = md.render(post?.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section className="pink_container !min-h-[280px]">
        <div className="tag mb-4">{formateDate(post?._createdAt)}</div>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !min-w-5xl">{post.description}</p>
      </section>
      <section className="section_container bg-gradient-to-b from-white to-accent-50">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-2xl shadow-xl border border-accent-200"
        />
        <div className="space-y-6 mt-12 max-w-4xl mx-auto">
          <div className="flex-between gap-5 bg-white p-6 rounded-2xl shadow-lg border border-accent-200">
            <Link
              href={`/user/${post.author?.id}`}
              className="flex gap-4 items-center hover:bg-accent-50 p-3 rounded-xl transition-all duration-200"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg border-3 border-primary-200"
              />
              <div>
                <p className="text-lg font-semibold text-black-700">
                  {post.author.name}
                </p>
                <p className="text-sm font-medium text-accent-500">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <div className="category-tag">{post.category}</div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-accent-200">
            <h3 className="text-2xl font-bold text-black-700 mb-6 border-b border-accent-200 pb-4">
              Pitch Details
            </h3>
          {parsedContent ? (
            <article
              className="prose prose-lg max-w-none font-work-sans break-words prose-headings:text-black-700 prose-p:text-accent-700 prose-a:text-primary-600 prose-strong:text-black-700"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
              <p className="text-accent-500 italic">No detail provided</p>
          )}
          </div>
        </div>
        <hr className="divider" />

        {/* SELECTED STARTUPS */}
        {toppicks?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-black-700 mb-8">Top Picks</h2>

            <ul className="mt-7 card_grid-sm">
              {toppicks.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
