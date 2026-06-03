"use client";

import { useState } from "react";

const footerMenu: { label: string; en: string; links: { label: string; href: string }[] }[] = [
  {
    label: "会社情報",
    en: "COMPANY",
    links: [
      { label: "私たちの想い", href: "/#concept" },
      { label: "会社概要", href: "/#company" },
      { label: "お知らせ", href: "/news" }
    ]
  },
  {
    label: "サービス情報",
    en: "SERVICE",
    links: [
      { label: "Webドック診断", href: "#service" },
      { label: "修繕・改修", href: "#service" },
      { label: "AI活用支援", href: "#service" },
      { label: "集客導線整備", href: "#service" },
      { label: "定期整備（運用）", href: "#service" },
      { label: "経営伴走", href: "#service" }
    ]
  },
  {
    label: "制作実績",
    en: "WORKS",
    links: [
      { label: "制作実績 一覧", href: "/works" },
      { label: "イケベジさま", href: "/works/ikebeji" }
    ]
  },
  {
    label: "その他",
    en: "ABOUT",
    links: [
      { label: "お問い合わせ", href: "/contact" },
      { label: "ブログ", href: "/blog" },
      { label: "お知らせ", href: "/news" },
      { label: "個人情報保護方針", href: "/privacy" }
    ]
  }
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

  return (
    <footer className="site-footer" id="contact">
      {/* SET SAIL — recruit / contact CTA */}
      <div className="footer-contact">
        <div className="footer-image" aria-hidden="true" />
        <div className="loop-text" aria-hidden="true">
          <div>
            <span>SET SAIL TOGETHER</span>
            <span>SET SAIL TOGETHER</span>
            <span>SET SAIL TOGETHER</span>
            <span>SET SAIL TOGETHER</span>
          </div>
        </div>

        <div className="footer-cta recruit">
          <div className="footer-cta-left" data-reveal>
            <h2>
              瀬戸内の会社を、
              <br />
              一緒に整備する仲間へ。
            </h2>
          </div>
          <div className="footer-cta-right" data-reveal style={{ "--reveal-delay": "140ms" } as React.CSSProperties}>
            <p>
              制作・写真・動画・文章・AI・地域活動。整備士のように丁寧に、伴走者として誠実に。
              瀬戸内の経営者の航海を支えるチームを広げています。
            </p>
            <div className="btn-line">
              <ArrowLink href="/contact" label="READ MORE" />
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
              「何から始めればいいか分からない」という相談から始められます。
              Webドック診断は無料で承ります。航海の前に、まず現在地を確認しませんか。
            </p>
            <div className="btn-line">
              <ArrowLink href="/contact" label="CONTACT US" />
            </div>
          </div>
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
              対応エリア 尾道・因島・福山・瀬戸内／オンライン全国
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


      {/* フッター下部 */}
      <div className="footer-btm">
        <div className="inner-wide">
          <p className="footer-catch">瀬戸内の会社をWebで支える、経営のドック。</p>
          <ul className="footer-btm-banner">
            <li>
              <span className="footer-banner-tile">WEB DOCK</span>
            </li>
            <li>
              <span className="footer-banner-tile alt">SETOUCHI</span>
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
