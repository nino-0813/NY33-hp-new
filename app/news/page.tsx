import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { formatPostDate, getPostsByCategory } from "../posts/posts";

export const metadata: Metadata = {
  title: "お知らせ",
  description:
    "合同会社NY33からのお知らせ一覧。新サービス「Webドック診断」のご案内、ブランドの変更、AI活用に関するご案内など、瀬戸内の経営者さま向けの最新情報を掲載しています。",
  alternates: { canonical: "/news" }
};

export default function NewsIndex() {
  const newsPosts = getPostsByCategory("news");

  return (
    <>
      <SiteHeader />

      <main className="post-page">
        <header className="post-index-hero">
          <div className="inner">
            <p className="post-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>NEWS</span>
            </p>
            <p className="post-index-en" data-reveal>NEWS</p>
            <h1
              className="post-index-title"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              お知らせ
            </h1>
            <p
              className="post-index-lead"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              NY33からの新サービス・ブランド・取り組みに関するお知らせをまとめています。
            </p>
          </div>
        </header>

        <section className="post-index-list-wrap">
          <div className="inner">
            <ul className="post-index-list">
              {newsPosts.map((post, index) => (
                <li
                  key={post.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <Link href={`/news/${post.slug}`} className="post-index-card">
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
