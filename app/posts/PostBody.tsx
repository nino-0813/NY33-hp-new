import Image from "next/image";
import Link from "next/link";
import type { PostSection } from "./posts";

export function PostBody({ sections }: { sections: PostSection[] }) {
  return (
    <div className="post-body">
      {sections.map((section, index) => {
        switch (section.type) {
          case "h2":
            return (
              <h2 key={index} className="post-h2">
                {section.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="post-h3">
                {section.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="post-p">
                {section.text}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="post-ul">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="post-ol">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside key={index} className="post-note">
                <span className="post-note-mark" aria-hidden="true">
                  ◆
                </span>
                <p>{section.text}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={index} className="post-quote">
                <p>{section.text}</p>
                {section.cite && <footer>— {section.cite}</footer>}
              </blockquote>
            );
          case "image":
            return (
              <figure key={index} className="post-figure">
                <Image
                  src={section.src}
                  alt={section.alt}
                  width={1600}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 760px"
                  className="post-figure-img"
                />
                {section.caption && (
                  <figcaption>{section.caption}</figcaption>
                )}
              </figure>
            );
          case "table":
            return (
              <figure key={index} className="post-table-wrap">
                <table className="post-table">
                  <thead>
                    <tr>
                      {section.headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {section.caption && (
                  <figcaption>{section.caption}</figcaption>
                )}
              </figure>
            );
          case "link":
            return (
              <Link key={index} className="post-link-card" href={section.href}>
                <span className="post-link-card-label">{section.label}</span>
                {section.description && (
                  <span className="post-link-card-desc">{section.description}</span>
                )}
                <span className="post-link-card-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
