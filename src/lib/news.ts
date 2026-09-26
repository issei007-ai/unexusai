/**
 * Company news, written by the team in the admin panel (CMS section
 * "news.posts"), with the same shape as blog articles.
 */
export type NewsPost = {
  slug: string;
  image?: string;
  imageAlt?: string;
  author?: string;
  cat: string; // e.g. Announcement, Client win, Event, Award
  title: string;
  excerpt: string;
  date: string; // shown as written, e.g. "26 Sep 2026"
  metaTitle?: string;
  metaDescription?: string;
  body: string; // HTML
};

/** Starts empty on purpose: every item is written by the team. */
export const NEWS_POSTS: NewsPost[] = [];
