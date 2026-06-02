import Image from "next/image";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollReveal } from "./components/ScrollReveal";

const heroImage =
  "https://commons.wikimedia.org/wiki/Special:FilePath/%E5%B0%BE%E9%81%93%E6%B8%AF%20OnomIchi%20Port%20-%20panoramio.jpg";

// 背景動画を使う場合はここにURLを設定（空ならheroImageの固定背景にフォールバック）
const heroVideo = "/hero.mp4";

const portfolioItems = [
  ["Company Renewal", "信頼が伝わるコーポレート整備", "サイト改修"],
  ["Booking Flow", "予約・問い合わせまでの導線整備", "予約導線"],
  ["Local Store", "地域で見つけてもらう店舗ページ", "店舗サイト"],
  ["AI Workflow", "現場で効くAIの導入設計", "AI活用"],
  ["Brand Voice", "想いを言葉に整える整備", "ブランディング"],
  ["SEO Dock", "検索とAIに見つけられる土台", "SEO / AIO"]
];

const serviceItems = [
  ["WEB DOCK", "会社のWeb・AIの現在地を点検する、入口の「Webドック診断」"],
  ["REPAIR", "サイト・LP・問い合わせ導線などを安全に直す改修"],
  ["AI ASSIST", "現場と経営に効くAIの導入・運用支援"],
  ["NAVIGATION", "検索・SNS・口コミ・予約までの集客導線を整える"],
  ["MAINTENANCE", "公開後のアクセス・改善・運用を続ける定期整備"],
  ["PARTNERSHIP", "整備士として、経営者の隣で航海を支え続ける伴走"]
];

const newsItems = [
  ["2026.05.21", "「Webドック診断」の受付をはじめます"],
  ["2026.05.21", "瀬戸内の経営者へ。AIをどう仕事に取り入れるか"],
  ["2026.05.21", "ホームページ制作から『経営のドック』へ ― NY33の新しい届け方"]
];

const blogItems = [
  ["2026.05.21", "船と経営に共通する、「安全に前へ進む」ということ"],
  ["2026.05.21", "Webの現在地は、年に一度のドック点検で見えてくる"],
  ["2026.05.21", "造船の現場で学んだ、整備という仕事の重み"]
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
      areaServed: ["広島県尾道市", "広島県福山市", "広島県因島", "備後エリア", "瀬戸内"],
      slogan: "会社の航海に、Webのドックを。"
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
        "広島県尾道市を拠点に、瀬戸内の会社の航海をWebとAIで整備する『経営のドック』。診断・改修・運用・AI活用まで、経営者の隣で支え続けます。",
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
            <p>会社の航海に、Webのドックを。</p>
            <h1>
              <span className="sr-only">合同会社NY33 | 瀬戸内の会社を支えるWebとAIのドック</span>
              <span aria-hidden="true">with DOCK</span>
            </h1>
          </div>

          <div className="fv-bottom inner-wide">
            <article className="fv-news">
              <a href="#news">
                <span className="fv-news-thumb">NY33</span>
                <span className="fv-news-body">
                  <time>2026.05.21</time>
                  <strong>「Webドック診断」の受付をはじめます</strong>
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
                Webは、
                <br />
                会社の航海を支える整備。
              </h2>
              <p className="about-text" data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
                船が安全に海を進むためには、定期的な点検と整備を行う「ドック」が欠かせません。
                会社も同じです。ホームページ、検索、予約、SNS、顧客データ、AI活用 ―
                経営とインターネットが切り離せない今、何を直すべきか、どこから始めるべきかが見えないまま航海を続けている経営者は少なくありません。
                <br />
                <br />
                NY33は、ただホームページを作るだけの会社ではありません。
                瀬戸内の造船文化を受け継ぎ、会社の現在地を診断し、必要な整備を行い、
                経営者が自信を持って次の航海へ漕ぎ出せる状態をつくる、Webとは整備の仕事だと考えています。
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
            <p className="sub">瀬戸内の会社を整備するメニュー</p>
            <p className="text">
              つくって終わりではなく、診断・修繕・定期整備まで。
              <br />
              会社の航海をWebとAIで支え続けます。
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
                合同会社NY33は、広島県尾道市を拠点に、瀬戸内の会社の航海をWebとAIで整備する「経営のドック」です。
                代表の二宮は造船の現場に身を置いた経験を持ち、船の世界で感じた「安全に進む責任と孤独」を、地方の経営者の隣で支えるためにこの会社を立ち上げました。
                サイトを作って終わりではなく、診断・修繕・定期整備まで、会社が自信を持って次の航海へ漕ぎ出せるよう伴走します。
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
