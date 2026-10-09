import type { APIRoute, GetStaticPaths } from 'astro';
import { ogPng } from '../../../lib/og';
import { BLOG_DESCRIPTION, BLOG_TITLE, getPosts } from '../../../lib/posts';

type Card = { title: string; description: string };

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  return [
    { params: { key: 'index' }, props: { title: 'Blog', description: BLOG_DESCRIPTION } },
    ...posts.map((post) => ({
      params: { key: post.id },
      props: { title: post.data.title, description: post.data.description },
    })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as Card;
  const png = await ogPng({ title, description, site: BLOG_TITLE });
  return new Response(new Uint8Array(png), { headers: { 'content-type': 'image/png' } });
};
