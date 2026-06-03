import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ScrollReveal } from "../../components/ScrollReveal";

import { approaches, getApproachBySlug } from "../approach";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return approaches.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getApproachBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.titleJa} ／ ${a.title}`,
    description: `${a.tagline} ${a.excerpt}`,
    alternates: { canonical: `/approach/${a.slug}` },
    openGraph: {
      type: "article",
      title: `${a.titleJa} ／ ${a.title}`,
      description: a.excerpt,
      url: `/approach/${a.slug}`
    }
  };
}

export default async function ApproachDetail({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const a = getApproachBySlug(slug);
  if (!a) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="service-page">
        {/* Hero */}
        <section className="service-hero">
          <div className="inner">
            <p className="service-hero-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <Link href="/approach">APPROACH</Link>
              <span aria-hidden="true">／</span>
              <span>{a.titleJa}</span>
            </p>
            <p className="approach-hero-num" data-reveal>
              APPROACH {a.number}
            </p>
            <p
              className="service-hero-en"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              {a.title}
            </p>
            <h1
              className="service-hero-title"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              {a.titleJa}
            </h1>
            <p
              className="service-hero-tagline"
              data-reveal
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            >
              {a.tagline}
            </p>
            <p
              className="service-hero-lead"
              data-reveal
              style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
            >
              {a.excerpt}
            </p>
          </div>
        </section>

        {/* For Who */}
        <section className="service-for">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">FOR YOU</p>
              <h2>こんな会社さまの整備に向いています</h2>
            </div>
            <ul className="service-for-list">
              {a.forWho.map((item, index) => (
                <li
                  key={index}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <span className="service-for-check" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Problem we solve */}
        <section className="approach-problem">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">PROBLEM</p>
              <h2>解決する課題</h2>
            </div>
            <p
              className="approach-problem-text"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              {a.problem}
            </p>
          </div>
        </section>

        {/* What we build */}
        <section className="service-what">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">WHAT WE BUILD</p>
              <h2>{a.whatWeBuild.heading}</h2>
              <p className="service-section-lead">{a.whatWeBuild.description}</p>
            </div>
            <ul className="service-what-list">
              {a.whatWeBuild.items.map((item, index) => (
                <li
                  key={item.title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <p className="service-what-num">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="service-process">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">PROCESS</p>
              <h2>整備の流れ</h2>
            </div>
            <ol className="service-process-list">
              {a.process.map((step, index) => (
                <li
                  key={step.step}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
                >
                  <p className="service-process-step">{step.step}</p>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section className="service-info">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">PRICING</p>
              <h2>費用・期間の目安</h2>
            </div>
            <dl className="service-info-table" data-reveal>
              <div>
                <dt>期間目安</dt>
                <dd>{a.pricing.durationNote}</dd>
              </div>
              <div>
                <dt>費用</dt>
                <dd>
                  ご相談後にご提案します
                  <span className="service-info-sub">
                    ヒアリングのうえ、お見積もりをお渡しします
                  </span>
                </dd>
              </div>
            </dl>
            {a.pricing.note && (
              <p
                className="service-info-note"
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              >
                {a.pricing.note}
              </p>
            )}
          </div>
        </section>

        {/* Metrics (Expected outcomes) */}
        {a.metrics.length > 0 && (
          <section className="approach-metrics">
            <div className="inner">
              <div className="service-section-head" data-reveal>
                <p className="en">EXPECTED OUTCOMES</p>
                <h2>よくある成果の例</h2>
              </div>
              <ul className="approach-metrics-list">
                {a.metrics.map((m, index) => (
                  <li
                    key={index}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  >
                    <span className="approach-metrics-bullet" aria-hidden="true">●</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              <p
                className="approach-metrics-note"
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                ※ 結果は事業内容・市況・実装範囲により変動します。NY33は保証ではなく、根拠のある改善の積み重ねを伴走します。
              </p>
            </div>
          </section>
        )}

        {/* Related services */}
        {a.relatedServices.length > 0 && (
          <section className="approach-related">
            <div className="inner">
              <div className="service-section-head" data-reveal>
                <p className="en">RELATED SERVICES</p>
                <h2>この整備に組み合わせるサービス</h2>
              </div>
              <ul className="approach-related-list">
                {a.relatedServices.map((rs, index) => (
                  <li
                    key={rs.slug}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  >
                    <Link href={`/service/${rs.slug}`} className="approach-related-card">
                      <span className="approach-related-label">{rs.label}</span>
                      <span className="approach-related-arrow" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="service-cta">
          <div className="inner">
            <h2 data-reveal>
              {a.titleJa}について、
              <br />
              まずは現在地のすり合わせから。
            </h2>
            <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              いきなり整備を始める前に、無料の Webドック診断 で現在地と必要な整備の優先順位を整理することをおすすめしています。
            </p>
            <div
              className="service-cta-actions"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <Link className="link-btn" href="/contact">
                <span>CONTACT US</span>
              </Link>
              <Link className="link-btn-arrow" href="/approach">
                <span className="text-wrap">
                  <span className="text">OTHER APPROACH</span>
                  <span className="text mask">OTHER APPROACH</span>
                </span>
                <span className="circle" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
