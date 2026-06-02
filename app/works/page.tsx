import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { works } from "./works";

export const metadata: Metadata = {
  title: "制作実績",
  description:
    "合同会社NY33が整備を支援した瀬戸内の会社さまの制作実績一覧。Webドック診断・サイト制作・ブランド整備・集客導線整備など、実例をご紹介します。",
  alternates: { canonical: "/works" }
};

export default function WorksIndex() {
  const total = works.length;

  return (
    <>
      <SiteHeader />

      <main className="post-page">
        <header className="post-index-hero">
          <div className="inner">
            <p className="post-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>WORKS</span>
            </p>
            <p className="post-index-en" data-reveal>
              WORKS
            </p>
            <h1
              className="post-index-title"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              制作実績
            </h1>
            <p
              className="post-index-lead"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              瀬戸内の会社さまの航海を、Webとブランドで支えてきた事例をご紹介します。
              つくって終わりではなく、診断・修繕・定期整備までを伴走する仕事の積み重ねです。
            </p>
          </div>
        </header>

        <section className="works-list-section">
          <div className="inner">
            <div className="works-meta" data-reveal>
              <p>
                <strong>{total}</strong> case{total > 1 ? "s" : ""}
              </p>
              <p className="works-meta-note">
                順次掲載。掲載をご快諾いただいた事例から公開しています。
              </p>
            </div>

            <ul className="works-grid">
              {works.map((work, index) => (
                <li
                  key={work.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
                >
                  <Link href={`/works/${work.slug}`} className="works-card">
                    <div className="works-card-visual" aria-hidden="true">
                      <span className="works-card-initial">{work.client.charAt(0)}</span>
                      <span className="works-card-num">
                        CASE {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="works-card-body">
                      <p className="works-card-industry">
                        {work.industry} ／ {work.year}
                      </p>
                      <h2 className="works-card-client">
                        {work.client}
                        {work.clientHonor && (
                          <span className="works-card-honor">{work.clientHonor}</span>
                        )}
                      </h2>
                      <p className="works-card-tagline">{work.tagline}</p>
                      <p className="works-card-excerpt">{work.excerpt}</p>
                      <ul className="works-card-scope">
                        {work.scope.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <span className="works-card-arrow" aria-hidden="true">
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
                記載されていない領域・業種でも対応可能です。
                <br />
                まずは <Link href="/service/web-dock">Webドック診断</Link> から
                現在地の確認をおすすめしています。
              </p>
              <div className="works-cta-actions">
                <Link className="link-btn" href="/contact">
                  <span>CONTACT US</span>
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
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
