import type { Metadata } from "next";
import Link from "next/link";

import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ScrollReveal } from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "合同会社NY33のプライバシーポリシー。お問い合わせフォーム等を通じて取得した個人情報の取り扱いについて記載しています。",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main className="post-page privacy-page">
        <header className="post-header">
          <div className="inner inner--narrow">
            <p className="post-breadcrumb">
              <Link href="/">HOME</Link>
              <span aria-hidden="true">／</span>
              <span>PRIVACY POLICY</span>
            </p>
            <h1 className="post-title">プライバシーポリシー</h1>
            <p className="post-excerpt">
              合同会社NY33（以下「当社」）は、お客様の個人情報を以下のとおり大切に取り扱います。
            </p>
          </div>
        </header>

        <div className="post-content">
          <div className="inner inner--narrow">
            <div className="post-body">
              <h2 className="post-h2">1. 取得する個人情報</h2>
              <p className="post-p">
                当社は、お問い合わせフォームや業務上のやり取りを通じて、以下の個人情報を取得することがあります。
              </p>
              <ul className="post-ul">
                <li>お名前</li>
                <li>メールアドレス</li>
                <li>会社名・所属</li>
                <li>電話番号（任意でご提供いただいた場合）</li>
                <li>ご相談内容に含まれる情報</li>
              </ul>

              <h2 className="post-h2">2. 利用目的</h2>
              <p className="post-p">
                取得した個人情報は、以下の目的の範囲内でのみ利用します。
              </p>
              <ul className="post-ul">
                <li>お問い合わせ・ご相談への回答および対応</li>
                <li>サービス提供にあたって必要な連絡・調整</li>
                <li>当社サービス・お知らせのご案内（ご希望の場合のみ）</li>
                <li>業務委託契約の締結および履行</li>
                <li>法令に基づく対応</li>
              </ul>

              <h2 className="post-h2">3. 第三者への提供</h2>
              <p className="post-p">
                当社は、以下の場合を除き、取得した個人情報を第三者に提供することはありません。
              </p>
              <ul className="post-ul">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命・身体・財産の保護のために必要で、お客様の同意を得ることが困難な場合</li>
                <li>サービス提供のために必要な範囲で、業務委託先（メール配信事業者など）に共有する場合</li>
              </ul>

              <h2 className="post-h2">4. 利用する外部サービス</h2>
              <p className="post-p">
                当ウェブサイトおよびお問い合わせフォームの運用にあたり、以下の外部サービスを利用しています。各サービスの情報の取り扱いについては、それぞれのプライバシーポリシーをご確認ください。
              </p>
              <ul className="post-ul">
                <li>Vercel Inc.（ウェブサイトのホスティング）</li>
                <li>Resend, Inc.（お問い合わせフォームのメール送信）</li>
                <li>Google LLC（解析・地図等を利用する場合）</li>
              </ul>

              <h2 className="post-h2">5. 安全管理</h2>
              <p className="post-p">
                取得した個人情報は、漏えい・滅失・毀損を防止するために必要かつ適切な安全管理措置を講じます。アクセス権の制限、通信の暗号化、定期的な見直しを行っています。
              </p>

              <h2 className="post-h2">6. 保有期間</h2>
              <p className="post-p">
                取得した個人情報は、利用目的の達成に必要な期間に限り保有し、不要となった情報は速やかに削除または匿名化します。
              </p>

              <h2 className="post-h2">7. 開示・訂正・削除の請求</h2>
              <p className="post-p">
                お客様ご本人から、当社が保有する個人情報の開示・訂正・追加・削除・利用停止のご請求があった場合、合理的な範囲で速やかに対応いたします。下記の連絡先までご連絡ください。
              </p>

              <h2 className="post-h2">8. Cookie等の利用</h2>
              <p className="post-p">
                当ウェブサイトでは、サービスの品質向上のために Cookie 等の技術を利用することがあります。これらにより取得する情報は、個人を特定するものではありません。ブラウザの設定により Cookie の受け取りを拒否することができますが、その場合一部の機能がご利用いただけなくなる場合があります。
              </p>

              <h2 className="post-h2">9. 本ポリシーの改定</h2>
              <p className="post-p">
                当社は、本ポリシーを必要に応じて改定することがあります。改定時には、本ページにて変更内容を掲示します。
              </p>

              <h2 className="post-h2">10. お問い合わせ窓口</h2>
              <p className="post-p">
                個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
              </p>
              <ul className="post-ul">
                <li>合同会社NY33</li>
                <li>所在地：広島県尾道市</li>
                <li>連絡先：llc33.company@gmail.com</li>
              </ul>

              <p className="post-p" style={{ marginTop: "48px", color: "var(--muted)", fontSize: "13px" }}>
                制定日：2026年6月3日
              </p>
            </div>
          </div>
        </div>

        <footer className="post-footer">
          <div className="inner inner--narrow">
            <p className="post-footer-label">お問い合わせはこちら</p>
            <p className="post-footer-desc">
              本ポリシーに同意いただいた上で、お気軽にご相談ください。
            </p>
            <div className="post-footer-actions">
              <Link className="link-btn" href="/contact">
                <span>CONTACT</span>
              </Link>
              <Link className="link-btn-arrow" href="/">
                <span className="text-wrap">
                  <span className="text">HOME</span>
                  <span className="text mask">HOME</span>
                </span>
                <span className="circle" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </footer>
      </main>

      <SiteFooter />
      <ScrollReveal />
    </>
  );
}
