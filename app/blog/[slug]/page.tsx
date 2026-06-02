import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetailPage } from "../../posts/PostDetailPage";
import { getPost, getPostsByCategory } from "../../posts/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostsByCategory("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title}｜ブログ`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags
    }
  };
}

export default async function BlogDetail({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost("blog", slug);
  if (!post) {
    notFound();
  }
  return <PostDetailPage post={post} />;
}
