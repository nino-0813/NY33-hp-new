import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "合同会社NY33へのお問い合わせはこちらから。Webドック診断（無料）・サイト改修・AI活用支援など、瀬戸内の経営者さまのご相談を受け付けています。営業電話・売り込みはいたしません。",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="contact-page">
        <header className="contact-hero">
          <div className="inner">
            <p className="post-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>CONTACT</span>
            </p>

            <p className="contact-hero-en" data-reveal>
              CONTACT
            </p>
            <h1
              className="contact-hero-title"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              まずは現在地を、
              <br />
              教えてください。
            </h1>
            <p
              className="contact-hero-lead"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              「何から始めればいいか分からない」という相談から始められます。
              相談内容が固まっていなくて構いません。
              <br />
              ご記入いただいた内容をもとに、二宮より直接ご返信します。
            </p>

            <ul
              className="contact-promise"
              data-reveal
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            >
              <li>
                <strong>営業電話はしません</strong>
                <span>ご返信はメールで。望まれた場合のみ電話・面談に進みます。</span>
              </li>
              <li>
                <strong>Webドック診断は無料</strong>
                <span>まずは現在地の確認から、お気軽にご相談ください。</span>
              </li>
              <li>
                <strong>瀬戸内・全国対応</strong>
                <span>尾道・福山・因島は対面、それ以外はオンラインで承ります。</span>
              </li>
            </ul>
          </div>
        </header>

        <section className="contact-form-section">
          <div className="inner inner--narrow">
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
