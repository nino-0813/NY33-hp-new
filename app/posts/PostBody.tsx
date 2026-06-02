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
          case "note":
            return (
              <aside key={index} className="post-note">
                <span className="post-note-mark" aria-hidden="true">
                  ◆
                </span>
                <p>{section.text}</p>
              </aside>
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
