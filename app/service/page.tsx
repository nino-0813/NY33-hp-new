import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { services } from "./services";

export const metadata: Metadata = {
  title: "サービス一覧",
  description:
    "NY33が提供する、瀬戸内の会社を整備する6つのサービス。Webドック診断・修繕・AI活用支援・集客導線整備・定期整備・経営伴走。",
  alternates: { canonical: "/service" }
};

export default function ServiceIndexPage() {
  return (
    <>
      <SiteHeader />

      <main className="service-page">
        <section className="service-hero">
          <div className="inner">
            <p className="service-hero-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>SERVICE</span>
            </p>
            <p className="service-hero-en" data-reveal>SERVICE</p>
            <h1 className="service-hero-title" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              瀬戸内の会社を整備する、
              <br />
              6つのメニュー。
            </h1>
            <p
              className="service-hero-tagline"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              つくって終わりではなく、診断・修繕・定期整備まで。
            </p>
            <p
              className="service-hero-lead"
              data-reveal
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            >
              船が安全に海を進むために、定期的なドック整備が欠かせないように。
              会社の航海にも、Webの整備が必要です。NY33は、入口の「Webドック診断」から、
              修繕・運用・伴走まで、6つのサービスで経営者の隣に立ち続けます。
            </p>
          </div>
        </section>

        <section className="service-index">
          <div className="inner">
            <ul className="service-index-list">
              {services.map((service, index) => (
                <li
                  key={service.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <Link href={`/service/${service.slug}`} className="service-index-card">
                    <p className="service-index-num">{String(index + 1).padStart(2, "0")}</p>
                    <p className="service-index-en">{service.title}</p>
                    <h2>{service.titleJa}</h2>
                    <p className="service-index-tag">{service.tagline}</p>
                    <span className="service-index-arrow" aria-hidden="true">
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
