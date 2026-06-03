import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { approaches } from "./approach";

export const metadata: Metadata = {
  title: "整備の型",
  description:
    "NY33が提供する6つの整備の型（Approach）。Company Renewal / Booking Flow / Local Store / AI Workflow / Brand Voice / SEO Dock。それぞれ「誰のため・何を解く・何が含まれる・期間と費用」をご紹介します。",
  alternates: { canonical: "/approach" }
};

export default function ApproachIndex() {
  return (
    <>
      <SiteHeader />

      <main className="post-page">
        <header className="post-index-hero">
          <div className="inner">
            <p className="post-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>APPROACH</span>
            </p>
            <p className="post-index-en" data-reveal>
              APPROACH
            </p>
            <h1
              className="post-index-title"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              整備の型
            </h1>
            <p
              className="post-index-lead"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              NY33が日々取り組んでいる「整備の型」を6つの方向に整理しました。
              ご自身の会社の現在地に近いものから、ご覧ください。
            </p>
          </div>
        </header>

        <section className="works-list-section">
          <div className="inner">
            <ul className="approach-grid">
              {approaches.map((a, index) => (
                <li
                  key={a.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <Link href={`/approach/${a.slug}`} className="approach-card">
                    <div className="approach-card-visual">
                      <Image
                        src={a.image}
                        alt={a.titleJa}
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="approach-card-visual-img"
                      />
                      <span className="approach-card-num" aria-hidden="true">{a.number}</span>
                    </div>
                    <div className="approach-card-body">
                      <p className="approach-card-cat">{a.category}</p>
                      <p className="approach-card-en">{a.title}</p>
                      <h2 className="approach-card-ja">{a.titleJa}</h2>
                      <p className="approach-card-tag">{a.tagline}</p>
                      <p className="approach-card-excerpt">{a.excerpt}</p>
                    </div>
                    <span className="approach-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="works-cta"
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
              <p>
                どの型に該当するか分からないときは、まず <Link href="/service/web-dock">Webドック診断（無料）</Link> から始めるのがおすすめです。
              </p>
              <div className="works-cta-actions">
                <Link className="link-btn" href="/contact">
                  <span>CONTACT</span>
                </Link>
                <Link className="link-btn-arrow" href="/works">
                  <span className="text-wrap">
                    <span className="text">実例を見る</span>
                    <span className="text mask">実例を見る</span>
                  </span>
                  <span className="circle" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
