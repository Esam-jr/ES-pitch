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

export const STARTUP_BYID_QUERY = defineQuery(`
  *[_type == "startups" && _id == $id][0]{
    _id,
    title,
    _createdAt,
    author -> { id, name, image, bio,username },
    view,
    categories,
    description,
    slug,
    image,
    pitch
  }
`);
export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type == "startups" && _id == $id][0]{
  _id, view
 }`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);
