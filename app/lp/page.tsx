import { Header, Reveal } from "./_components/SiteChrome";

/* ---------- data ---------- */

const HERO_BADGES = [
  { top: "支援業界", big: "6+", sub: "領域" },
  { top: "オリジナル", big: "デザイン", sub: "" },
  { top: "対応範囲", big: "一気通貫", sub: "" },
];

const COMPARE_COLS = ["AIで自分で作る", "一般的な制作会社", "NY33"];
const COMPARE_ROWS = [
  ["制作費用", "ツール代＋自分の作業時間", "70万円〜", "戦略込みでご提案"],
  ["運用費用", "月1,000〜3万円程度", "月3万円〜", "成果に合わせて設計"],
  ["デザイン", "似た印象になりやすい", "オリジナル", "オリジナル"],
  ["セキュリティ対策", "自分で管理・対応", "納品時に設定", "常時SSL・サーバー管理"],
  ["分析・改善", "自分で判断・実装", "別途で契約必要", "GA4＋AIで継続改善"],
  ["集客動線", "設計まで手が回らない", "サイト内のみ", "戦略から自動化まで横断"],
];

const PHONE = (label: string, sub: string, img: string) => ({ label, sub, img });
const MOCKS = [
  PHONE("HotelPG", "宿泊・尾道", "/mocks/1.svg"),
  PHONE("蓮REN", "脳洗浄・姫路", "/mocks/2.svg"),
  PHONE("larimar", "美容・福山", "/mocks/3.svg"),
  PHONE("ジプソフィル®", "痩身・福岡", "/mocks/4.svg"),
  PHONE("みんなのオンクリ", "オンライン診療", "/mocks/5.svg"),
  PHONE("イケベジ", "米・EC", "/mocks/6.svg"),
];

const PLANS = [
  {
    name: "STARTER",
    range: "1ページ / LP",
    note: "まず動線をつくる",
    feats: ["LP制作", "GA4設置", "公開サポート"],
    highlight: false,
  },
  {
    name: "GROWTH",
    range: "サイト＋集客",
    note: "集客を仕組み化する",
    feats: ["サイト一式", "LINE / GBP連携", "月次改善"],
    highlight: true,
  },
  {
    name: "PARTNER",
    range: "戦略〜自動化",
    note: "事業に伴走する",
    feats: ["戦略設計", "予約・決済基盤", "自動化・会議支援"],
    highlight: false,
  },
];

const PLAN_COMMON = [
  { title: "制作", items: ["オリジナルデザイン", "スマホ最適化", "文章作成サポート"] },
  { title: "運用", items: ["定期の修正・更新", "チャットで相談受付", "改善レポート"] },
  { title: "集客基盤", items: ["SEO内部対策", "分析アプリの提供", "SNS / LINE連携"] },
  { title: "保守", items: ["SSL対応", "サーバー管理", "独自ドメイン取得"] },
];

const PLAN_EXAMPLES = [
  {
    name: "larimar",
    tag: "GROWTH",
    desc: "美容サロンの世界観と予約導線を一画面で伝えるサイト。",
    img: "/mocks/3.svg",
  },
  {
    name: "蓮REN",
    tag: "STARTER",
    desc: "脳洗浄サロンの体験価値を、悩み起点のコピーで設計したLP。",
    img: "/mocks/2.svg",
  },
  {
    name: "HotelPG",
    tag: "PARTNER",
    desc: "OTA依存からの脱却を目指す、直予約を促す宿泊サイト。",
    img: "/mocks/1.svg",
  },
];

const AI_CARDS = [
  {
    tag: "AI診断",
    title: "AIが改善候補をご提案",
    body: "アクセス状況やページ内容をもとに、お問い合わせを増やすための改善候補を提案します。",
  },
  {
    tag: "承認",
    title: "あなたが内容を見て承認",
    body: "提案は勝手に反映されません。納得したものだけを承認できます。",
  },
  {
    tag: "実装",
    title: "NY33が実装する",
    body: "承認された改善はプロが反映。自分でサイトを触る必要はありません。",
  },
];

const STEPS = [
  {
    step: "STEP1",
    title: "ヒアリング・現状分析",
    you: "事業の強み・課題を共有",
    us: "顧客・競合・既存データを分析",
  },
  {
    step: "STEP2",
    title: "戦略・初稿確認",
    you: "完成イメージとして初稿を確認",
    us: "集客動線の設計図とデモを制作",
  },
  {
    step: "STEP3",
    title: "修正依頼",
    you: "直したい箇所を画面上で指定",
    us: "修正内容を整理し、デザイン・文章を反映",
  },
  {
    step: "STEP4",
    title: "スマホ確認",
    you: "スマホ表示で見づらい箇所を確認",
    us: "文字サイズ・ボタン・導線を最適化",
  },
  {
    step: "STEP5",
    title: "公開確認",
    you: "最終内容を確認",
    us: "ドメイン接続を行い、公開",
  },
];

/* ---------- small components ---------- */

function Phone({
  label,
  sub,
  dark,
  img,
}: {
  label: string;
  sub: string;
  dark?: boolean;
  img?: string;
}) {
  // The provided SVG mockups already include the device frame.
  if (img) {
    return (
      <div className="mx-auto w-full max-w-[170px] shrink-0">
        <img
          src={img}
          alt={`${label}（${sub}）の制作事例`}
          loading="lazy"
          className="w-full drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[150px] shrink-0">
      <div className="rounded-[1.6rem] border-[5px] border-black bg-black p-1 shadow-xl">
        <div
          className={`relative flex aspect-[9/19] flex-col items-center justify-center overflow-hidden rounded-[1.2rem] ${
            dark ? "bg-gradient-to-b from-zinc-800 to-black" : "bg-gradient-to-b from-pink to-white"
          }`}
        >
          <span className="absolute top-1 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60" />
          <div className="px-3 text-center">
            <div className={`text-sm font-black ${dark ? "text-white" : "text-ink"}`}>
              {label}
            </div>
            <div className={`mt-1 text-[10px] ${dark ? "text-white/60" : "text-ink/50"}`}>
              {sub}
            </div>
          </div>
          <span className="mt-3 rounded-full bg-[image:var(--red-grad)] px-3 py-1 text-[9px] font-bold text-white">
            お問い合わせ
          </span>
        </div>
      </div>
    </div>
  );
}

function CTAButtons({ onDark = false }: { onDark?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <a href="#contact" className="group flex flex-col items-center">
        <span className="mb-1.5 rounded-full bg-ink px-3 py-0.5 text-[10px] font-bold text-white">
          契約不要・見るだけOK
        </span>
        <span className="rounded-full bg-[image:var(--red-grad)] px-10 py-4 font-black text-white shadow-lg transition-transform group-hover:scale-[1.03]">
          無料デモサイト依頼
        </span>
      </a>
      <a href="#contact" className="group flex flex-col items-center">
        <span className="mb-1.5 rounded-full bg-ink px-3 py-0.5 text-[10px] font-bold text-white">
          検討中の方もお気軽に
        </span>
        <span className="rounded-full bg-[image:var(--orange-grad)] px-10 py-4 font-black text-white shadow-lg transition-transform group-hover:scale-[1.03]">
          オンライン無料相談
        </span>
      </a>
    </div>
  );
}

/* ---------- page ---------- */

export default function Home() {
  return (
    <main id="top" className="overflow-hidden font-sans">
      <Header />

      {/* ===== HERO ===== */}
      <section className="hero-red flex min-h-screen items-center pt-16">
        <div className="container-x relative z-10 grid items-center gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* badges */}
            <Reveal>
              <div className="mb-8 flex flex-wrap gap-3">
                {HERO_BADGES.map((b) => (
                  <div
                    key={b.top}
                    className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-yellow-300/80 bg-white/10 text-center backdrop-blur"
                  >
                    <span className="text-[10px] font-bold text-yellow-200">{b.top}</span>
                    <span className="text-lg font-black leading-tight text-white">{b.big}</span>
                    {b.sub && <span className="text-[10px] text-white/80">{b.sub}</span>}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <p className="mb-3 inline-block text-2xl font-black italic text-white drop-shadow md:text-3xl">
                “挑戦者の価値を、届ける”
              </p>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="text-4xl font-black leading-[1.3] text-white drop-shadow-lg sm:text-5xl md:text-[3.4rem]">
                集客動線設計で叶える
                <br />
                <span className="bg-white px-2 text-brand-red">Web制作 &amp; 運用代行</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90">
                戦略設計・実装・計測・自動化を一社で。
                因島・尾道発、地方の事業を伸ばすパートナーです。
              </p>
            </Reveal>
          </div>

          {/* form card */}
          <Reveal delay={160} className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-6 shadow-2xl md:p-7">
              <span className="mb-4 inline-block rounded-md bg-[image:var(--red-grad)] px-3 py-1 text-xs font-bold text-white">
                契約不要・見るだけOK
              </span>
              <h2 className="text-2xl font-black leading-snug text-ink">
                あなたの事業の
                <br />
                デモサイトを<span className="text-brand-red">無料</span>で。
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                いくつかの質問に答えるだけで、あなたの事業に合わせたデモサイトをご用意。担当者がオンラインでご提案します。
              </p>

              <form className="mt-6 space-y-4" action="#contact">
                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-bold text-ink">
                    お名前
                    <span className="rounded bg-brand-red px-1.5 py-0.5 text-[10px] text-white">必須</span>
                  </label>
                  <input
                    type="text"
                    placeholder="例）山田 太郎"
                    className="w-full rounded-lg border border-ink/15 px-3 py-3 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-bold text-ink">
                    メールアドレス
                    <span className="rounded bg-brand-red px-1.5 py-0.5 text-[10px] text-white">必須</span>
                  </label>
                  <input
                    type="email"
                    placeholder="例）mail@example.com"
                    className="w-full rounded-lg border border-ink/15 px-3 py-3 text-sm outline-none focus:border-brand-red"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[image:var(--red-grad)] py-4 font-black text-white shadow-md transition-transform hover:scale-[1.02]"
                >
                  無料デモサイト依頼へ進む
                </button>
                <p className="text-center text-[11px] text-ink/40">
                  送信によりプライバシーポリシーに同意したものとします
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section id="mission" className="bg-white py-24 md:py-32">
        <div className="container-x text-center">
          <Reveal>
            <p className="eyebrow mb-2">挑戦者の価値を届ける</p>
            <h2 className="text-4xl font-black tracking-wide text-ink md:text-5xl">MISSION</h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto mt-12 max-w-2xl space-y-7 text-left text-[15px] leading-loose text-ink/80 md:text-base">
              <p>
                SNS、広告メディアのフォーマット。
                <br />
                その枠内であなたの価値は伝わりますか？
              </p>
              <p>
                私たちNY33のミッションは
                <br />
                <span className="font-black text-brand-red">「挑戦者の価値を届ける」</span>
              </p>
              <p>
                あなたが磨き上げた価値を言語化し、
                <br />
                その価値を自由に表現する場として
                <br />
                集客の動線を設計します。
              </p>
              <p>
                勿論、作っただけで終わりません。
              </p>
              <p>
                その後の運用・改善まで伴走することで
                <br />
                「届けたい人に価値を届ける」
                <br />
                その瞬間までこだわります。
              </p>
            </div>
          </Reveal>
        </div>
        {/* photo strip */}
        <div className="mt-16 grid grid-cols-2 gap-2 px-2 sm:grid-cols-4">
          {["#fbcfc9", "#f6b7ae", "#f3a89e", "#ef9a8f"].map((c, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg"
              style={{ background: `linear-gradient(135deg, ${c}, #ffffff)` }}
            />
          ))}
        </div>
      </section>

      {/* ===== COMPARE ===== */}
      <section className="bg-white pb-24">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <h2 className="text-2xl font-black leading-relaxed text-ink md:text-3xl">
              自分で作るか。
              <br />
              納品までを頼むか。
              <br />
              公開後も<span className="text-brand-red">一緒に育てていく</span>か。
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-32 border-b border-ink/10 p-4" />
                    {COMPARE_COLS.map((c, i) => (
                      <th
                        key={c}
                        className={`border-b border-ink/10 p-4 text-center font-black ${
                          i === 2 ? "rounded-t-lg bg-[image:var(--red-grad)] text-white" : "text-ink"
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row[0]}>
                      <td className="border-b border-ink/10 p-4 font-bold text-ink">{row[0]}</td>
                      <td className="border-b border-ink/10 p-4 text-center text-ink/60">{row[1]}</td>
                      <td className="border-b border-ink/10 p-4 text-center text-ink/60">{row[2]}</td>
                      <td className="border-b border-ink/10 bg-pink-soft p-4 text-center font-bold text-brand-reddark">
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DARK ORIGINAL ===== */}
      <section className="dark-grad py-24 md:py-32">
        <div className="container-x text-center">
          <Reveal>
            <span className="mb-5 inline-block rounded-full bg-[image:var(--orange-grad)] px-4 py-1.5 text-xs font-bold text-white">
              完全オリジナルで叶う
            </span>
            <h2 className="text-3xl font-black leading-snug text-white md:text-4xl">
              完全オリジナル、
              <br />
              あなただけのホームページ
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div className="mt-14 flex gap-4 overflow-x-auto px-5 pb-4 md:justify-center">
            {MOCKS.map((m) => (
              <Phone key={m.label} label={m.label} sub={m.sub} img={m.img} dark />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section id="services" className="bg-pink-soft py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mb-12">
            <p className="eyebrow mb-2">サービス内容と料金</p>
            <h2 className="text-4xl font-black tracking-wide text-ink md:text-5xl">WHAT WE DO</h2>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-brand-reddark to-ink shadow-xl">
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div className="space-y-1">
                    <p className="inline-block bg-brand-red px-2 py-0.5 text-sm font-black">制作費0円</p>
                    <p className="text-2xl font-black">集客動線を、設計する。</p>
                  </div>
                  <p className="text-sm font-bold">合同会社NY33 代表 二宮 佑介</p>
                </div>
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-brand-red" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="text-2xl font-black leading-relaxed text-ink">
                戦略設計
                <br />
                実装・運用代行
                <br />
                必要なのは<span className="text-brand-red">成果への一本の動線</span>
              </h3>
              <p className="mt-5 leading-relaxed text-ink/70">
                挑戦する企業・個人事業主を支援するために生まれた、
                集客動線設計型のWeb制作＆運用代行です。戦略から実装・計測・自動化までを一社で横断します。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="bg-pink-soft pb-8">
        <div className="container-x">
          <Reveal className="mb-10">
            <h2 className="text-2xl font-black leading-snug text-ink md:text-3xl">
              比較するのは
              <br />
              目的とフェーズだけ
            </h2>
            <ul className="mt-4 space-y-1 text-xs text-ink/50">
              <li>※ 料金は事業の状況・目的に応じてお見積りします。</li>
              <li>※ まずは無料相談で現状の集客を診断します。</li>
              <li>※ 大規模なサイト・基盤構築にも対応可能です。</li>
            </ul>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <div
                  className={`flex h-full flex-col rounded-2xl border bg-white p-8 text-center ${
                    p.highlight ? "border-brand-red shadow-xl ring-2 ring-brand-red/20" : "border-ink/10"
                  }`}
                >
                  {p.highlight && (
                    <span className="mx-auto mb-3 rounded-full bg-[image:var(--red-grad)] px-3 py-1 text-[10px] font-bold text-white">
                      人気
                    </span>
                  )}
                  <h3 className="text-xl font-black text-brand-red">{p.name}</h3>
                  <p className="mt-1 text-xs text-ink/50">{p.range}</p>
                  <p className="my-6 text-lg font-black text-ink">{p.note}</p>
                  <ul className="mb-6 space-y-2 text-sm text-ink/70">
                    {p.feats.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-auto rounded-full bg-[image:var(--red-grad)] py-3 text-sm font-bold text-white"
                  >
                    お見積りを依頼
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* common */}
          <Reveal delay={120}>
            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-lg font-black text-ink">全プラン共通で含まれるもの</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PLAN_COMMON.map((c) => (
                  <div key={c.title}>
                    <span className="inline-block rounded bg-pink px-2 py-0.5 text-xs font-bold text-brand-reddark">
                      {c.title}
                    </span>
                    <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                      {c.items.map((it) => (
                        <li key={it} className="flex items-start gap-1.5">
                          <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-brand-red" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PLAN EXAMPLES ===== */}
      <section id="works" className="bg-pink-soft py-20">
        <div className="container-x">
          <Reveal className="mb-10 text-center">
            <h2 className="text-xl font-black text-brand-red">実績 / 制作事例</h2>
            <span className="mt-3 inline-block rounded-full bg-pink px-3 py-1 text-xs font-bold text-brand-reddark">
              業種別の集客動線設計
            </span>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {PLAN_EXAMPLES.map((e, i) => (
              <Reveal key={e.name} delay={i * 100}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-ink to-brand-reddark p-4">
                    <Phone label={e.name} sub={e.tag} img={e.img} />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded bg-pink px-2 py-0.5 text-[11px] font-bold text-brand-reddark">
                        {e.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-ink">{e.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{e.desc}</p>
                    <a
                      href="#contact"
                      className="mt-5 block rounded-full border border-ink/15 py-2.5 text-center text-sm font-bold text-ink transition-colors hover:border-brand-red hover:text-brand-red"
                    >
                      詳しく見る →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AI ===== */}
      <section className="red-grad py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white">
              NY33 AI
            </span>
            <h2 className="text-3xl font-black leading-snug text-white md:text-4xl">
              サイトの改善提案が
              <br />
              毎月アプリに届く
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/85">
              作って終わりにしないために、サイトの分析・改善に特化したAIアプリを提供します。
            </p>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="flex justify-center">
              <Phone label="NY33 AI" sub="改善提案アプリ" dark />
            </Reveal>
            <div className="space-y-4">
              {AI_CARDS.map((c, i) => (
                <Reveal key={c.tag} delay={i * 90}>
                  <div className="rounded-xl bg-white p-6 shadow-lg">
                    <span className="mb-2 inline-block rounded bg-pink px-2 py-0.5 text-[11px] font-bold text-brand-reddark">
                      {c.tag}
                    </span>
                    <h3 className="text-lg font-black text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="mt-14">
              <CTAButtons onDark />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process" className="bg-white py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow mb-2">制作の流れ</p>
            <h2 className="text-4xl font-black tracking-wide text-ink md:text-5xl">5 PROCESS</h2>
            <p className="mt-4 text-sm text-ink/60">
              制作期間の目安は4〜8週間。最短2週間で公開も可能。
            </p>
          </Reveal>

          {/* team card */}
          <Reveal>
            <div className="mb-10 flex flex-col gap-6 rounded-2xl bg-pink-soft p-6 md:flex-row md:items-center">
              <div className="aspect-video w-full shrink-0 rounded-xl bg-gradient-to-br from-ink to-brand-reddark md:w-64" />
              <div>
                <p className="eyebrow mb-1">少数精鋭でサポート</p>
                <h3 className="text-xl font-black text-ink">一気通貫の担当制</h3>
                <div className="my-3 flex flex-wrap gap-2 text-xs font-bold text-brand-red">
                  <span className="rounded bg-pink px-2 py-1">戦略設計</span>
                  <span className="rounded bg-pink px-2 py-1">デザイン・実装</span>
                  <span className="rounded bg-pink px-2 py-1">運用・改善</span>
                </div>
                <p className="text-sm leading-relaxed text-ink/70">
                  ヒアリングから戦略設計・制作・公開・運用まで、窓口は一つ。各工程が分断されないため、成果につながる動線を一貫して設計できます。
                </p>
              </div>
            </div>
          </Reveal>

          {/* steps */}
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 60}>
                <div className="grid gap-3 rounded-xl border border-ink/10 p-5 md:grid-cols-[120px_1fr_1fr] md:items-center">
                  <div>
                    <span className="text-sm font-black text-brand-red">{s.step}</span>
                    <p className="font-black text-ink">{s.title}</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3 text-sm">
                    <span className="mb-1 inline-block rounded bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                      お客様
                    </span>
                    <p className="text-ink/70">{s.you}</p>
                  </div>
                  <div className="rounded-lg bg-pink-soft p-3 text-sm">
                    <span className="mb-1 inline-block rounded bg-pink px-2 py-0.5 text-[11px] font-bold text-brand-reddark">
                      NY33
                    </span>
                    <p className="text-ink/70">{s.us}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-10 text-center">
              <p className="font-black text-brand-red">公開後、運用を開始</p>
              <div className="mx-auto mt-3 h-12 w-px bg-brand-red/40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ORIGINAL (light) + CTA ===== */}
      <section className="bg-white pb-24">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-3xl font-black leading-snug text-ink md:text-4xl">
              完全オリジナル、
              <br />
              あなただけのホームページ
            </h2>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <div className="mb-14 mt-12 flex gap-4 overflow-x-auto px-5 pb-4 md:justify-center">
            {MOCKS.map((m) => (
              <Phone key={`l-${m.label}`} label={m.label} sub={m.sub} img={m.img} />
            ))}
          </div>
        </Reveal>
        <CTAButtons />
      </section>

      {/* ===== PARTNERS ===== */}
      <section id="company" className="bg-pink-soft py-24 md:py-32">
        <div className="container-x">
          <Reveal className="mb-12">
            <p className="eyebrow mb-2">お客様の声</p>
            <h2 className="text-4xl font-black tracking-wide text-ink md:text-5xl">PARTNERS</h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-8 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-[280px_1fr] md:p-10">
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-ink to-brand-reddark" />
              <div>
                <p className="text-sm text-ink/50">サロンオーナー 様</p>
                <h3 className="mt-2 text-xl font-black text-ink">
                  事業の本質を気づかせてくれる存在
                </h3>
                <div className="mt-5 space-y-4 text-sm leading-loose text-ink/70">
                  <p>
                    集客が必要になり、サイト制作をNY33に依頼しました。こちらの想いや大事にしている考えを丁寧に汲み取っていただき、事業に合ったコンセプトを持つサイトに仕上げていただきました。
                  </p>
                  <p>
                    全体で意図を理解しながら進めてくれる安心感があり、複数の施策でもスムーズに進行できました。
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* company info */}
          <Reveal delay={120}>
            <dl className="mt-10 divide-y divide-ink/10 rounded-2xl bg-white p-6 shadow-sm md:p-8">
              {[
                ["会社名", "合同会社NY33"],
                ["代表者", "二宮 佑介"],
                ["所在地", "広島県（因島・尾道エリア）"],
                ["事業内容", "集客動線設計 / Web制作 / デジタルマーケティング支援"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <dt className="w-28 flex-none text-xs font-bold tracking-widest2 text-brand-red">
                    {k}
                  </dt>
                  <dd className="text-sm text-ink/80">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="red-grad py-24 text-center">
        <div className="container-x">
          <Reveal>
            <h2 className="text-3xl font-black leading-snug text-white md:text-4xl">
              まずは、現状の集客を
              <br className="sm:hidden" />
              一緒に見直しませんか。
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/85">
              ご相談は無料です。事業の状況をお聞きした上で、集客動線のどこに伸びしろがあるかをご提案します。
            </p>
            <div className="mt-10">
              <CTAButtons onDark />
            </div>
            <p className="mt-8 text-sm text-white/70">
              お急ぎの方は{" "}
              <a href="mailto:nino5040@icloud.com" className="font-bold text-white underline">
                nino5040@icloud.com
              </a>{" "}
              まで
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-ink-dark py-12">
        <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="text-xl font-black text-white">
            NY<span className="text-brand-red">33</span>
          </span>
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} 合同会社NY33 — 因島 / 尾道
          </p>
        </div>
      </footer>
    </main>
  );
}
