import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startups" && defined(slug.current) && (!defined($search) || title match $search || categories match $search || author->name match $search)] | order(_createdAt desc) {
  _id,
  title,
  _createdAt,
  author->{
    id,
    name,
    image,
    bio
  },
  view,
  categories,
  description,
  slug,
  image
}`);
