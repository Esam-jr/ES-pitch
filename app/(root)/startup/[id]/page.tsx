import { client } from "@/sanity/lib/client";
import { STARTUP_BYID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";

const expermental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BYID_QUERY, { id });

  if (!post) return notFound();
  return <h1>startup id:{post.title}</h1>;
};

export default page;
