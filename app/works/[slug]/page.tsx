import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ScrollReveal } from "../../components/ScrollReveal";

import { getRelatedWorks, getWorkBySlug, works } from "../works";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    return {};
  }
  return {
    title: `${work.client}${work.clientHonor || ""} ｜ 制作実績`,
    description: `${work.tagline} ${work.excerpt}`,
    alternates: { canonical: `/works/${work.slug}` },
    openGraph: {
      type: "article",
      title: `${work.client}${work.clientHonor || ""}`,
      description: work.excerpt,
      url: `/works/${work.slug}`
    }
  };
}

export default async function WorkDetail({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    notFound();
  }
  const related = getRelatedWorks(work, 2);

  return (
    <>
      <SiteHeader />

      <main className="post-page work-page">
        <article>
          <header className="post-header">
            <div className="inner">
              <p className="post-breadcrumb">
                <Link href="/">HOME</Link>
                <span aria-hidden="true">／</span>
                <Link href="/works">WORKS</Link>
                <span aria-hidden="true">／</span>
                <span>{work.client}</span>
              </p>

              <div className="work-hero" data-reveal>
                <div className="work-hero-visual" aria-hidden="true">
                  <span className="work-hero-initial">{work.client.charAt(0)}</span>
                </div>
                <div className="work-hero-info">
                  <p className="work-hero-industry">
                    {work.industry} ／ {work.year}
                  </p>
                  <h1 className="work-hero-client">
                    {work.client}
                    {work.clientHonor && (
                      <span className="work-hero-honor">{work.clientHonor}</span>
                    )}
                  </h1>
                  <p className="work-hero-tagline">{work.tagline}</p>
                  <p className="work-hero-excerpt">{work.excerpt}</p>
                  <ul className="work-hero-scope">
                    {work.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  {work.externalUrl && (
                    <a
                      className="link-btn-arrow work-hero-link"
                      href={work.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-wrap">
                        <span className="text">VIEW SITE</span>
                        <span className="text mask">VIEW SITE</span>
                      </span>
                      <span className="circle" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="post-content">
            <div className="inner inner--narrow">
              <div className="post-body">
                <h2 className="post-h2">課題 ／ Challenge</h2>
                <p className="post-p">{work.challenge}</p>

                <h2 className="post-h2">アプローチ ／ Approach</h2>
                <p className="post-p">{work.approach}</p>

                <h2 className="post-h2">結果 ／ Outcome</h2>
                <p className="post-p">{work.outcome}</p>

                {work.testimonial && (
                  <blockquote className="work-testimonial">
                    <p>{work.testimonial.quote}</p>
                    <footer>
                      — {work.testimonial.person}
                      {work.testimonial.position && (
                        <span className="work-testimonial-position">
                          ／ {work.testimonial.position}
                        </span>
                      )}
                    </footer>
                  </blockquote>
                )}
              </div>
            </div>
          </div>

          <footer className="post-footer">
            <div className="inner inner--narrow">
              <p className="post-footer-label">同じような整備をお考えの方へ</p>
              <p className="post-footer-org">合同会社NY33 / NY33 LLC</p>
              <p className="post-footer-desc">
                {work.client}さまの航海と同じように、瀬戸内の会社さまの現在地から整備をはじめます。
                まずは無料の Webドック診断 をお試しください。
              </p>
              <div className="post-footer-actions">
                <Link className="link-btn" href="/contact">
                  <span>CONTACT</span>
                </Link>
                <Link className="link-btn-arrow" href="/works">
                  <span className="text-wrap">
                    <span className="text">WORKS 一覧へ</span>
                    <span className="text mask">WORKS 一覧へ</span>
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
              <p className="post-related-label">OTHER WORKS</p>
              <ul className="post-related-list">
                {related.map((rw) => (
                  <li key={rw.slug}>
                    <Link href={`/works/${rw.slug}`} className="post-related-card">
                      <time>{rw.industry}</time>
                      <h3>
                        {rw.client}
                        {rw.clientHonor || ""}
                      </h3>
                      <p>{rw.tagline}</p>
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

      <WorkJsonLd work={work} />
    </>
  );
}

function WorkJsonLd({ work }: { work: ReturnType<typeof getWorkBySlug> }) {
  if (!work) return null;
  const url = `https://ny33.jp/works/${work.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${work.client}${work.clientHonor || ""}｜${work.tagline}`,
    description: work.excerpt,
    url,
    inLanguage: "ja",
    dateCreated: work.year,
    creator: {
      "@type": "Organization",
      name: "合同会社NY33",
      url: "https://ny33.jp/"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
      }}
    />
  );
}
