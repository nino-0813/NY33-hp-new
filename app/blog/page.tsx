import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { formatPostDate, getPostsByCategory } from "../posts/posts";

export const metadata: Metadata = {
  title: "ブログ",
  description:
    "合同会社NY33のブログ。瀬戸内・造船文化と経営、Webドック点検、AI活用、地方の経営者の隣で見えてきた『安全に前へ進む』ための考え方をお届けします。",
  alternates: { canonical: "/blog" }
};

export default function BlogIndex() {
  const blogPosts = getPostsByCategory("blog");

  return (
    <>
      <SiteHeader />

      <main className="post-page">
        <header className="post-index-hero">
          <div className="inner">
            <p className="post-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>BLOG</span>
            </p>
            <p className="post-index-en" data-reveal>BLOG</p>
            <h1
              className="post-index-title"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              ブログ
            </h1>
            <p
              className="post-index-lead"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              瀬戸内の造船文化と経営、Webとの向き合い方、AI活用について、
              NY33が現場で考えていることを綴ります。
            </p>
          </div>
        </header>

        <section className="post-index-list-wrap">
          <div className="inner">
            <ul className="post-index-list">
              {blogPosts.map((post, index) => (
                <li
                  key={post.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <Link href={`/blog/${post.slug}`} className="post-index-card">
                    <div className="post-index-card-meta">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span className="post-tag" key={tag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="post-index-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
