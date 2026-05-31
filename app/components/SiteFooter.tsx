"use client";

import { useState } from "react";

const footerMenu: { label: string; en: string; links: { label: string; href: string }[] }[] = [
  {
    label: "会社情報",
    en: "COMPANY",
    links: [
      { label: "私たちの想い", href: "#concept" },
      { label: "会社概要", href: "#company" },
      { label: "お知らせ", href: "#news" }
    ]
  },
  {
    label: "サービス情報",
    en: "SERVICE",
    links: [
      { label: "ホームページ制作", href: "#service" },
      { label: "AI活用支援", href: "#service" },
      { label: "SEO / AIO", href: "#service" },
      { label: "WEBコンサルティング", href: "#service" },
      { label: "地域の橋渡し", href: "#service" }
    ]
  },
  {
    label: "制作事例",
    en: "PORTFOLIO",
    links: [
      { label: "ホームページ", href: "#portfolio" },
      { label: "採用サイト", href: "#portfolio" },
      { label: "店舗・地域サイト", href: "#portfolio" },
      { label: "ブランディング", href: "#portfolio" }
    ]
  },
  {
    label: "その他",
    en: "ABOUT",
    links: [
      { label: "お問い合わせ", href: "#contact" },
      { label: "ブログ", href: "#news" },
      { label: "個人情報保護方針", href: "#contact" }
    ]
  }
];

// 取引実績（プレースホルダー）。本番では実際の取引先・カテゴリに差し替えてください。
const businessRecords = [
  "尾道市内 地域企業さま",
  "福山市内 店舗・サービス業さま",
  "備後エリア スタートアップさま",
  "医療・クリニックさま",
  "士業・コンサルティングさま",
  "観光・宿泊事業者さま",
  "製造・建設業さま",
  "教育・スクール事業者さま"
];

// 認証資格（プレースホルダー）。本番では取得済みのバナー画像に差し替えてください。
const qualifications = [
  "PREPARING",
  "PREPARING",
  "PREPARING",
  "PREPARING",
  "PREPARING",
  "PREPARING"
];

const snsLinks = [
  { label: "LINE", href: "#contact" },
  { label: "Instagram", href: "#contact" },
  { label: "TikTok", href: "#contact" },
  { label: "Facebook", href: "#contact" }
];

function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="link-btn-arrow" href={href}>
      <span className="text-wrap">
        <span className="text">{label}</span>
        <span className="text mask">{label}</span>
      </span>
      <span className="circle" aria-hidden="true">
        →
      </span>
    </a>
  );
}

export function SiteFooter() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [recordOpen, setRecordOpen] = useState(false);

  return (
    <footer className="site-footer" id="contact">
      {/* JOIN OUR CIRCLE — recruit / contact CTA */}
      <div className="footer-contact">
        <div className="footer-image" aria-hidden="true" />
        <div className="loop-text" aria-hidden="true">
          <div>
            <span>JOIN OUR CIRCLE</span>
            <span>JOIN OUR CIRCLE</span>
            <span>JOIN OUR CIRCLE</span>
            <span>JOIN OUR CIRCLE</span>
          </div>
        </div>

        <div className="footer-cta recruit">
          <div className="footer-cta-left" data-reveal>
            <h2>
              一緒に地域を盛り上げる
              <br />
              仲間へ。
            </h2>
          </div>
          <div className="footer-cta-right" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            <p>
              制作・写真・動画・文章・AI・地域活動。得意なことを持ち寄って、助け合えるつながりを広げています。
              想いに共感してくれる仲間を募集しています。
            </p>
            <div className="btn-line">
              <ArrowLink href="#contact" label="READ MORE" />
            </div>
          </div>
        </div>

        <div className="footer-cta contact">
          <div className="footer-cta-left" data-reveal>
            <div className="section-copy">
              <p className="en">CONTACT</p>
              <h2 className="ja">お問い合わせ</h2>
            </div>
          </div>
          <div className="footer-cta-right" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            <p>
              ホームページを作りたい、AIを仕事に取り入れたい、まだ言葉になっていない相談でも大丈夫です。
              尾道・福山を中心に、オンラインで全国のご相談にも対応します。お気軽にどうぞ。
            </p>
            <div className="btn-line">
              <ArrowLink href="mailto:info@ny33.jp" label="CONTACT US" />
            </div>
          </div>
        </div>
      </div>

      {/* with CONNECTION ループバナー */}
      <div className="footer-loop">
        <div className="footer-loop-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="footer-loop-item" key={index}>
              <p>
                with <strong>NY33</strong>
                <br />
                with CONNECTION
              </p>
              <span className="footer-loop-banner" />
              <span className="footer-loop-banner alt" />
            </div>
          ))}
        </div>
      </div>

      {/* 会社情報 + フッターメニュー */}
      <div className="footer-main inner-wide">
        <div className="footer-about">
          <a className="footer-logo" href="#top" aria-label="合同会社NY33 ホーム">
            <span className="footer-logo-mono" aria-hidden="true">
              NY<span className="footer-logo-num">33</span>
            </span>
            <span className="footer-logo-tag" aria-hidden="true">LLC</span>
          </a>
          <div className="footer-place">
            <address>
              <strong>【合同会社NY33】</strong>
              <br />
              広島県尾道市
              <br />
              Email info@ny33.jp
              <br />
              代表社員 二宮佑介
              <br />
              対応エリア 尾道・福山・備後／オンライン全国
            </address>
          </div>
        </div>

        <ul className="footer-menu">
          {footerMenu.map((group, index) => {
            const isOpen = openMenu === index;
            return (
              <li key={group.en} className={isOpen ? "is-open" : ""}>
                <button
                  type="button"
                  className="footer-menu-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : index)}
                >
                  {group.label}
                  <span className="en">{group.en}</span>
                  <span className="open-circle" aria-hidden="true" />
                </button>
                <div className="footer-menu-body" hidden={!isOpen}>
                  <ul>
                    {group.links.map((link, linkIndex) => (
                      <li key={`${link.label}-${linkIndex}`}>
                        <a href={link.href}>
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 取引実績 BUSINESS RECORD（プレースホルダー） */}
      <section className="footer-record">
        <div className="inner-wide">
          <button
            type="button"
            className="footer-record-head"
            aria-expanded={recordOpen}
            onClick={() => setRecordOpen((current) => !current)}
          >
            <h2>
              <span className="jp">取引実績</span>
              <span className="en">BUSINESS RECORD</span>
            </h2>
            <span className="open-circle" aria-hidden="true" />
          </button>
          <div className="footer-record-body" hidden={!recordOpen}>
            <ul className="footer-record-list">
              {businessRecords.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
            <p className="footer-record-note">（順不同・準備中。実績は順次掲載していきます）</p>
          </div>
        </div>
      </section>

      {/* 認証資格 QUALIFICATION（プレースホルダー） */}
      <section className="footer-qualification">
        <div className="inner-wide">
          <div className="footer-qualification-head">
            <h2>
              <span className="jp">認証資格</span>
              <span className="en">QUALIFICATION</span>
            </h2>
          </div>
        </div>
        <div className="footer-qualification-track" aria-hidden="true">
          {[...qualifications, ...qualifications].map((item, index) => (
            <span className="footer-qualification-item" key={index}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* フッター下部 */}
      <div className="footer-btm">
        <div className="inner-wide">
          <p className="footer-catch">人と人のつながりで、地域の未来をつくる。</p>
          <ul className="footer-btm-banner">
            <li>
              <span className="footer-banner-tile">NY33 PROJECT</span>
            </li>
            <li>
              <span className="footer-banner-tile alt">ONOMICHI WEB</span>
            </li>
          </ul>
          <ul className="footer-btm-sns">
            {snsLinks.map((sns) => (
              <li key={sns.label}>
                <a href={sns.href} aria-label={sns.label}>
                  {sns.label.slice(0, 2)}
                </a>
              </li>
            ))}
          </ul>
          <small className="footer-copyright">© NY33 LLC.</small>
        </div>
      </div>
    </footer>
  );
}
