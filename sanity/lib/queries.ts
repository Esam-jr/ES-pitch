import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startups" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc) {
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
  category,
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
    category,
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
export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);
export const STARTUPS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startups" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  view,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    view,
    description,
    category,
    image,
    pitch
  }
}`);
