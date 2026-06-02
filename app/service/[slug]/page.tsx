import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { ScrollReveal } from "../../components/ScrollReveal";

import { services, getServiceBySlug } from "../services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {};
  }
  return {
    title: `${service.titleJa}｜サービス`,
    description: `${service.tagline} ― ${service.lead.slice(0, 80)}…`,
    alternates: { canonical: `/service/${service.slug}` }
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const next = service.nextSlug ? getServiceBySlug(service.nextSlug) : undefined;

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
              <Link href="/service">SERVICE</Link>
              <span aria-hidden="true">／</span>
              <span>{service.titleJa}</span>
            </p>
            <p className="service-hero-en" data-reveal>{service.title}</p>
            <h1 className="service-hero-title" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              {service.titleJa}
            </h1>
            <p className="service-hero-tagline" data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
              {service.tagline}
            </p>
            <p className="service-hero-lead" data-reveal style={{ "--reveal-delay": "320ms" } as React.CSSProperties}>
              {service.lead}
            </p>
          </div>
        </section>

        {/* こんな方へ */}
        <section className="service-for">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">FOR YOU</p>
              <h2>こんな悩みを抱える方へ</h2>
            </div>
            <ul className="service-for-list">
              {service.forWho.map((item, index) => (
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

        {/* 整備内容 */}
        <section className="service-what">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">WHAT WE DO</p>
              <h2>{service.whatWeDo.heading}</h2>
              <p className="service-section-lead">{service.whatWeDo.description}</p>
            </div>
            <ul className="service-what-list">
              {service.whatWeDo.items.map((item, index) => (
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

        {/* プロセス */}
        <section className="service-process">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">PROCESS</p>
              <h2>整備の流れ</h2>
            </div>
            <ol className="service-process-list">
              {service.process.map((step, index) => (
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

        {/* 期間・費用 */}
        <section className="service-info">
          <div className="inner">
            <dl className="service-info-table" data-reveal>
              <div>
                <dt>期間目安</dt>
                <dd>{service.durationNote}</dd>
              </div>
              <div>
                <dt>費用目安</dt>
                <dd>{service.priceNote}</dd>
              </div>
            </dl>
            <p className="service-info-note" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              料金・期間は事業規模・お悩みの内容によって変動します。
              <br />
              まずは無料相談からお気軽にお問い合わせください。
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="service-cta">
          <div className="inner">
            <h2 data-reveal>
              {service.titleJa}について、
              <br />
              まずは一度ご相談ください。
            </h2>
            <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              「何から始めればいいか分からない」という相談から始められます。
              Webドック診断は無料で承ります。
            </p>
            <div
              className="service-cta-actions"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <Link className="link-btn" href="/contact">
                <span>CONTACT US</span>
              </Link>
              <Link className="link-btn-arrow" href="/service">
                <span className="text-wrap">
                  <span className="text">ALL SERVICE</span>
                  <span className="text mask">ALL SERVICE</span>
                </span>
                <span className="circle" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 次のサービス */}
        {next && (
          <section className="service-next">
            <Link href={`/service/${next.slug}`} className="service-next-link">
              <div className="inner">
                <p className="service-next-label">NEXT SERVICE</p>
                <p className="service-next-en">{next.title}</p>
                <h2>{next.titleJa}</h2>
                <p className="service-next-tag">{next.tagline}</p>
                <span className="service-next-arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          </section>
        )}
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
