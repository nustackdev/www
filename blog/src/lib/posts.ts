import { getCollection, type CollectionEntry } from 'astro:content';
import { appName } from '@www/shared/lib/site';

export type Post = CollectionEntry<'posts'>;

export const BLOG_TITLE = `${appName} blog`;
export const BLOG_DESCRIPTION = 'Announcements, notes, and thinking from the nustack team.';

/** Published posts, newest first. Drafts show up in dev only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export const postPath = (post: Post) => `/blog/${post.id}/`;

/** OG image for a post id, or `index` for the blog index. */
export const ogImagePath = (key: string) => `/blog/og/${key}/image.png`;
