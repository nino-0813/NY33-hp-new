import Image from "next/image";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollReveal } from "./components/ScrollReveal";

const heroImage =
  "https://commons.wikimedia.org/wiki/Special:FilePath/%E5%B0%BE%E9%81%93%E6%B8%AF%20OnomIchi%20Port%20-%20panoramio.jpg";

// 背景動画を使う場合はここにURLを設定（空ならheroImageの固定背景にフォールバック）
const heroVideo = "/hero.mp4";

const portfolioItems = [
  ["Company Website", "想いが伝わる会社サイト", "ホームページ"],
  ["Recruit Page", "人柄で選ばれる採用導線", "採用サイト"],
  ["Local Store", "地域店舗の集客ページ", "店舗サイト"],
  ["AI Support", "AI活用の相談窓口設計", "業務改善"],
  ["Brand Story", "代表の理念を言葉にする設計", "ブランディング"],
  ["SEO Base", "尾道・福山で見つかる土台", "SEO"]
];

const serviceItems = [
  ["HOME PAGE", "コーポレートサイト・採用サイト・LPなどのホームページ制作"],
  ["AI SUPPORT", "現場で使えるAI活用支援・業務改善の相談"],
  ["SEO / AIO", "尾道・福山エリアで見つけてもらう検索導線の設計"],
  ["WEB GROWTH", "公開後の更新・分析・改善・発信サポート"],
  ["LOCAL BRIDGE", "地域の人・企業・専門家をつなぐ橋渡し"],
  ["CONSULTING", "事業の課題整理から制作方針までの伴走"]
];

const newsItems = [
  ["2026.05.21", "地域企業がホームページで伝えるべき「らしさ」"],
  ["2026.05.21", "AIを地方の仕事にどう活かすか"],
  ["2026.05.21", "尾道・福山を盛り上げるためにNY33ができること"]
];

const blogItems = [
  ["2026.05.21", "ウェブ制作を入口に、人と企業をつなぐということ"],
  ["2026.05.21", "野球で学んだチームづくりを会社経営に活かす"],
  ["2026.05.21", "地方だからこそ必要な、相談できるウェブ担当"]
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ny33.jp/#organization",
      name: "合同会社NY33",
      url: "https://ny33.jp/",
      founder: { "@type": "Person", name: "二宮佑介" },
      areaServed: ["広島県尾道市", "広島県福山市", "備後エリア"],
      slogan: "人と人のつながりで、地域の未来をつくる。"
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://ny33.jp/#localbusiness",
      name: "合同会社NY33",
      url: "https://ny33.jp/",
      address: {
        "@type": "PostalAddress",
        addressRegion: "広島県",
        addressLocality: "尾道市",
        addressCountry: "JP"
      },
      description:
        "広島県尾道市を拠点に、ホームページ制作・AI活用支援・地域企業の課題解決を行うウェブ制作会社です。",
      founder: "二宮佑介"
    },
    {
      "@type": "WebSite",
      "@id": "https://ny33.jp/#website",
      name: "合同会社NY33",
      url: "https://ny33.jp/",
      publisher: { "@id": "https://ny33.jp/#organization" },
      inLanguage: "ja"
    }
  ]
};

function SectionCopy({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="section-copy" data-reveal>
      <p className="en">{en}</p>
      <h2 className="ja">{ja}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <div className="fixed-visual" aria-hidden="true">
        {heroVideo ? (
          <video
            className="fixed-visual-video"
            src={heroVideo}
            poster={heroImage}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image src={heroImage} alt="" fill priority sizes="100vw" className="fixed-visual-image" />
        )}
      </div>

      <main id="top" className="top">
        <section className="fv">
          <div className="fv-copy inner-wide">
            <p>広島県尾道市から、地域企業の課題解決へ。</p>
            <h1>
              <span className="sr-only">合同会社NY33 | 尾道・福山のウェブ制作とAI活用支援</span>
              <span aria-hidden="true">with CONNECTION</span>
            </h1>
          </div>

          <div className="fv-bottom inner-wide">
            <article className="fv-news">
              <a href="#news">
                <span className="fv-news-thumb">NY33</span>
                <span className="fv-news-body">
                  <time>2026.05.21</time>
                  <strong>尾道・福山のウェブ制作とAI活用支援をはじめます</strong>
                </span>
              </a>
            </article>
          </div>

          <div className="scroll-navi" aria-hidden="true">
            <span className="scroll-navi-txt">SCROLL</span>
            <span className="scroll-navi-bar" />
          </div>
        </section>

        <section className="top-about" id="concept">
          <div className="inner">
            <div className="about-inner">
              <h2 data-reveal>
                ウェブ制作は、
                <br />
                つながりを生むための手段。
              </h2>
              <p className="about-text" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
                合同会社NY33は、ホームページ制作を入口として、地域の人・企業・社会をつなぐ会社です。
                地方だからこそ、人の協力が力になる。尾道・福山で挑戦する人の想いを整理し、伝わる形にし、必要な出会いまで橋渡しします。
                <br />
                <br />
                16年間の野球で学んだのは、良い仲間と良いライバルが互いを成長させるということ。
                一人の利益より、みんなで何を残せるのか。NY33はその問いを持って、地域の未来に向き合います。
              </p>
            </div>
          </div>
        </section>

        <section className="top-portfolio" id="portfolio">
          <div className="inner">
            <SectionCopy en="PORTFOLIO" ja="制作事例" />
          </div>
          <div className="portfolio-track" aria-label="制作の方向性">
            {[...portfolioItems, ...portfolioItems].map(([label, title, tag], index) => (
              <article className="portfolio-card" key={`${label}-${index}`}>
                <div className="portfolio-visual">
                  <span>{String((index % portfolioItems.length) + 1).padStart(2, "0")}</span>
                </div>
                <p>{label}</p>
                <h3>{title}</h3>
                <ul>
                  <li>{tag}</li>
                </ul>
              </article>
            ))}
          </div>
          <div className="btn-line">
            <a className="link-btn" href="#contact">
              <span>VIEW ALL</span>
            </a>
          </div>
        </section>

        <section className="top-service" id="service">
          <div className="service-copy inner" data-reveal>
            <h2>
              <span>OUR</span>
              <br />
              <span>SERVICE</span>
            </h2>
            <p className="sub">私たちができること</p>
            <p className="text">
              ウェブとAIの可能性は無限大。
              <br />
              地域の課題を、つながりで解決する。
            </p>
            <a className="link-btn" href="#contact">
              <span>ALL SERVICE</span>
            </a>
          </div>
          <ul className="service-list">
            {serviceItems.map(([title, text], index) => (
              <li key={title} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}>
                <a href="#contact">
                  <div className="inner">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="top-company" id="company">
          <div className="inner">
            <div className="company-content" data-reveal>
              <SectionCopy en="COMPANY" ja="会社情報" />
              <p>
                合同会社NY33は、広島県尾道市を拠点に、尾道・福山・備後エリアの企業や地域活動をウェブとAIで支えます。
                「ウェブのことならNY33の二宮に聞いたら解決する」と思ってもらえる存在を目指し、相談から制作、運用、必要なつながりづくりまで伴走します。
              </p>
              <dl className="company-table">
                <div>
                  <dt>会社名</dt>
                  <dd>合同会社NY33</dd>
                </div>
                <div>
                  <dt>代表社員</dt>
                  <dd>二宮佑介</dd>
                </div>
                <div>
                  <dt>所在地</dt>
                  <dd>広島県尾道市</dd>
                </div>
              </dl>
              <div className="btn-line">
                <a className="link-btn-arrow" href="#contact">
                  <span className="text-wrap">
                    <span className="text">READ MORE</span>
                    <span className="text mask">READ MORE</span>
                  </span>
                  <span className="circle" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="top-news" id="news">
          <div className="inner">
            <div className="news-grid">
              <div>
                <SectionCopy en="NEWS" ja="お知らせ" />
                <ul className="post-list">
                  {newsItems.map(([date, title], index) => (
                    <li key={title} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
                      <a href="#contact">
                        <span className="post-thumb" />
                        <span>
                          <time>{date}</time>
                          <strong>{title}</strong>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SectionCopy en="BLOG" ja="ブログ" />
                <ul className="post-list">
                  {blogItems.map(([date, title], index) => (
                    <li key={title} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
                      <a href="#contact">
                        <span className="post-thumb" />
                        <span>
                          <time>{date}</time>
                          <strong>{title}</strong>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="btn-line">
              <a className="btn-wide" href="#news">
                一覧を見る
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <ScrollReveal />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
