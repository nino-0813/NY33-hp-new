import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "資料プレゼント｜The Data Action Blueprint",
  description:
    "NY33からのプレゼント資料『The Data Action Blueprint ─ 9割のデジタルマーケターが陥る「データ分析」の罠』。データ活用の3ステップ（取る・見る・使う）と、アクションから逆算するKPI設計の全体像を14ページにまとめた、無料ダウンロード資料です。",
  alternates: { canonical: "/resource" }
};

const PDF_PATH = "/downloads/data-action-blueprint.pdf";
const COVER_PATH = "/downloads/data-action-blueprint-cover.jpg";

const highlights = [
  {
    no: "01",
    title: "「データ＝分析」という最大の錯覚",
    description:
      "なぜGA4を入れても多くの組織で活用されないのか。その根本にある『言葉の誤解』を解きほぐします。"
  },
  {
    no: "02",
    title: "取る・見る・使うの3つの基本構造",
    description:
      "専門用語を全部削ぎ落とした、データ活用の極めてシンプルな3ステップ。目的は常に『使う』にある。"
  },
  {
    no: "03",
    title: "「分析」の正体は「比較」である",
    description:
      "知りたいことを、データの中から見つけ出す作業。シンプルだけど本質的な、分析の定義を視覚化。"
  },
  {
    no: "04",
    title: "アクションから逆算するKPI設計",
    description:
      "「数字の分解」ではなく、「現場のアクションを正しく評価する指標」としてKPIを設計し直す方法。"
  }
];

export default function ResourcePage() {
  return (
    <>
      <SiteHeader />

      <main className="resource-page">
        <header className="resource-hero">
          <div className="inner resource-hero-inner">
            <div className="resource-hero-text">
              <p className="post-breadcrumb">
                <Link href="/">HOME</Link>
                <span aria-hidden="true">／</span>
                <span>RESOURCE</span>
              </p>
              <p className="resource-hero-label" data-reveal>
                FREE GIFT — 無料プレゼント
              </p>
              <h1
                className="resource-hero-title"
                data-reveal
                style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              >
                The Data Action Blueprint
              </h1>
              <p
                className="resource-hero-sub"
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                9割のデジタルマーケターが陥る「データ分析」の罠 ─
                <br />
                羅針盤なき時代の、迷わないためのデータ活用設計図。
              </p>
              <p
                className="resource-hero-lead"
                data-reveal
                style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
              >
                「データはあるのに、どこをどう見ればいいかわからない」 ─
                そんな経営者・現場担当者のために、データ活用の全体像を
                14ページにまとめた無料の設計図（PDF）です。NY33からの
                プレゼントとして、メールアドレスの登録なし・直接ダウンロード形式でお届けします。
              </p>

              <div
                className="resource-hero-actions"
                data-reveal
                style={{ "--reveal-delay": "400ms" } as React.CSSProperties}
              >
                <a
                  className="link-btn resource-download-btn"
                  href={PDF_PATH}
                  download
                >
                  <span>DOWNLOAD PDF ↓</span>
                </a>
                <p className="resource-hero-meta">
                  PDF / 14ページ / 3.3MB / 日本語
                </p>
              </div>
            </div>

            <div
              className="resource-hero-cover"
              data-reveal="right"
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              <a href={PDF_PATH} download aria-label="PDF をダウンロード">
                <Image
                  src={COVER_PATH}
                  alt="The Data Action Blueprint 表紙"
                  width={1400}
                  height={781}
                  className="resource-cover-img"
                  priority
                />
                <span className="resource-cover-badge">↓ DOWNLOAD</span>
              </a>
            </div>
          </div>
        </header>

        <section className="resource-highlights">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">WHAT&apos;S INSIDE</p>
              <h2>14ページに詰まっている内容</h2>
              <p className="service-section-lead">
                データ活用の本質を、構造化された4つの章で。難しい統計学はゼロ。
                その日の打ち合わせから使える考え方ばかりです。
              </p>
            </div>
            <ul className="resource-highlight-list">
              {highlights.map((h, index) => (
                <li
                  key={h.no}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <p className="resource-highlight-num">{h.no}</p>
                  <h3>{h.title}</h3>
                  <p>{h.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="resource-author">
          <div className="inner">
            <div className="resource-author-card" data-reveal>
              <p className="resource-author-label">PUBLISHER / 発行</p>
              <p className="resource-author-body">
                本資料は <strong>合同会社NY33（代表社員 二宮 佑介）</strong>が、
                データ活用の領域における公開知見を再構成・編集して発行しています。
                難解な統計用語を削ぎ落とし、瀬戸内の中小企業の経営者さま・現場
                担当者さまに伝わる形に整え直しました。
              </p>
              <p className="resource-author-note">
                内容のご感想・改善のリクエストはもちろん、社内勉強会等での利用に
                ついても歓迎しています。お気軽に
                <Link href="/contact">お問い合わせ</Link>からご連絡ください。
              </p>
            </div>
          </div>
        </section>

        <section className="resource-related">
          <div className="inner">
            <div className="service-section-head" data-reveal>
              <p className="en">RELATED READING</p>
              <h2>あわせて読みたい記事</h2>
            </div>
            <ul className="resource-related-list">
              <li data-reveal>
                <Link href="/blog/data-analysis-is-comparison" className="resource-related-card">
                  <p className="resource-related-en">BLOG 01</p>
                  <h3>データ分析の正体は「比較」である</h3>
                  <p>野菜の収穫の例で、データが知恵に変わる3ステップを解説。本資料の前提となる考え方。</p>
                  <span className="resource-related-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
              <li
                data-reveal
                style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              >
                <Link href="/blog/kpi-from-action" className="resource-related-card">
                  <p className="resource-related-en">BLOG 02</p>
                  <h3>アクションから逆算するKPI設計ガイドライン</h3>
                  <p>「上から降ってきたKPI」を追ってもPDCAは回らない。アクション起点で再設計する実務指針。</p>
                  <span className="resource-related-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="service-cta">
          <div className="inner">
            <h2 data-reveal>
              資料の内容を、
              <br />
              自社で実行に移したい方へ。
            </h2>
            <p data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              NY33では、「取る・見る・使う」のサイクルを実際の運用に落とし込む
              『Webドック診断』を、初回無料でお引き受けしています。
              現在地から、整備の優先順位をご提案します。
            </p>
            <div
              className="service-cta-actions"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <Link className="link-btn" href="/contact">
                <span>CONTACT US</span>
              </Link>
              <Link className="link-btn-arrow" href="/service/web-dock">
                <span className="text-wrap">
                  <span className="text">WEB DOCK 診断</span>
                  <span className="text mask">WEB DOCK 診断</span>
                </span>
                <span className="circle" aria-hidden="true">→</span>
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
