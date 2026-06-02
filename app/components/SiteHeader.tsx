"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#concept", label: "私たちの想い", en: "CONCEPT" },
  { href: "#portfolio", label: "制作事例", en: "PORTFOLIO" },
  { href: "#service", label: "サービス", en: "SERVICE" },
  { href: "#company", label: "会社情報", en: "COMPANY" },
  { href: "#news", label: "お知らせ", en: "NEWS" }
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 16);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isOpen ? "is-open" : ""}`}>
      <div className="header-lead">
        <span className="header-copy">瀬戸内のWeb & AI ドック</span>
        <a className="brand" href="#top" aria-label="合同会社NY33 ホーム">
          <span className="brand-mono" aria-hidden="true">
            NY<span className="brand-mono-num">33</span>
          </span>
          <span className="brand-tag" aria-hidden="true">LLC</span>
        </a>
      </div>

      <div className="header-sp-items">
        <a className="header-contact-fixed" href="#contact">
          <span>お問い合わせ</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav className={`site-nav ${isOpen ? "is-open" : ""}`} aria-label="主要ナビゲーション">
        <a className="nav-contact" href="#contact" onClick={() => setIsOpen(false)}>
          <span className="sp-only">資料請求・</span>お問い合わせ
        </a>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
                <span className="en">{item.en}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-foot sp-only">
          <p className="nav-foot-copy">人と人のつながりで、地域の未来をつくる。</p>
          <small>© NY33 LLC.</small>
        </div>
      </nav>
    </header>
  );
}
