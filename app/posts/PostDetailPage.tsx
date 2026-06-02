import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { PostBody } from "./PostBody";
import {
  formatPostDate,
  getRelatedPosts,
  type Post
} from "./posts";

const categoryMeta: Record<Post["category"], { en: string; ja: string; indexPath: string }> = {
  news: { en: "NEWS", ja: "お知らせ", indexPath: "/news" },
  blog: { en: "BLOG", ja: "ブログ", indexPath: "/blog" }
};

export function PostDetailPage({ post }: { post: Post }) {
  const meta = categoryMeta[post.category];
  const related = getRelatedPosts(post, 2);

  return (
    <>
      <SiteHeader />

      <main className="post-page">
        <article>
          <header className="post-header">
            <div className="inner">
              <p className="post-breadcrumb">
                <Link href="/">HOME</Link>
                <span aria-hidden="true">／</span>
                <Link href={meta.indexPath}>{meta.en}</Link>
                <span aria-hidden="true">／</span>
                <span>{post.title}</span>
              </p>

              <div className="post-meta" data-reveal>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className="post-category">{meta.ja}</span>
                {post.tags.map((tag) => (
                  <span className="post-tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="post-title" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                {post.title}
              </h1>

              <p
                className="post-excerpt"
                data-reveal
                style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
              >
                {post.excerpt}
              </p>
            </div>
          </header>

          <div className="post-content">
            <div className="inner inner--narrow" data-reveal>
              <PostBody sections={post.body} />
            </div>
          </div>

          <footer className="post-footer">
            <div className="inner inner--narrow">
              <p className="post-footer-label">この記事を書いた会社</p>
              <p className="post-footer-org">合同会社NY33 / NY33 LLC</p>
              <p className="post-footer-desc">
                瀬戸内の会社の航海をWebとAIで整備する、経営のドック。
                ホームページ制作・AI活用支援・Webドック診断などを通じて、
                尾道・福山・因島の経営者の隣で支え続けています。
              </p>
              <div className="post-footer-actions">
                <Link className="link-btn" href={meta.indexPath}>
                  <span>{meta.en} 一覧へ</span>
                </Link>
                <Link className="link-btn-arrow" href="/service">
                  <span className="text-wrap">
                    <span className="text">SERVICE</span>
                    <span className="text mask">SERVICE</span>
                  </span>
                  <span className="circle" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </footer>
        </article>

        {related.length > 0 && (
          <section className="post-related">
            <div className="inner">
              <p className="post-related-label">RELATED {meta.en}</p>
              <ul className="post-related-list">
                {related.map((rp) => (
                  <li key={rp.slug}>
                    <Link href={`${meta.indexPath}/${rp.slug}`} className="post-related-card">
                      <time dateTime={rp.date}>{formatPostDate(rp.date)}</time>
                      <h3>{rp.title}</h3>
                      <p>{rp.excerpt}</p>
                      <span className="post-related-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
      <ScrollReveal />

      <PostJsonLd post={post} />
    </>
  );
}

function PostJsonLd({ post }: { post: Post }) {
  const url = `https://ny33.jp/${post.category}/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": post.category === "news" ? "NewsArticle" : "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "ja",
    keywords: post.tags.join(", "),
    author: {
      "@type": "Organization",
      name: "合同会社NY33",
      url: "https://ny33.jp/"
    },
    publisher: {
      "@type": "Organization",
      name: "合同会社NY33",
      url: "https://ny33.jp/"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
