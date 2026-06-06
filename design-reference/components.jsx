/* ============================================================
   组件
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- icons ---------- */
const Icon = {
  search: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>),
  sun: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7"/></svg>),
  moon: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5Z"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M11 5 4 12l7 7M4 12h16"/></svg>),
};

/* ---------- Top bar ---------- */
function TopBar({ view, onNav, query, setQuery, theme, toggleTheme }) {
  return (
    <header className="bar">
      <div className="bar__brand" onClick={() => onNav("home")}>
        <span className="mark">松</span>
        <span>松木 · 技术札记</span>
      </div>
      <nav className="bar__nav">
        <button className={"bar__link" + (view === "home" ? " is-active" : "")} onClick={() => onNav("home")}>文章</button>
        <button className={"bar__link" + (view === "about" ? " is-active" : "")} onClick={() => onNav("about")}>关于</button>
      </nav>
      <div className="bar__spacer" />
      {view === "home" && (
        <label className="search">
          <Icon.search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章 / 标签…"
            aria-label="搜索"
          />
        </label>
      )}
      <button className="bar__icon" onClick={toggleTheme} aria-label="切换深浅模式" title="切换深浅模式">
        {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
      </button>
    </header>
  );
}

/* ---------- Tag row ---------- */
function TagRow({ tags, active, onPick }) {
  return (
    <div className="tags toolrow">
      {tags.map((t) => (
        <button
          key={t}
          className={"tag" + (active === t ? " is-active" : "")}
          onClick={() => onPick(t)}
        >{t}</button>
      ))}
    </div>
  );
}

/* ---------- Post item (direction-aware) ---------- */
function PostItem({ a, dir, onOpen, onTag }) {
  const date = <span className="post__date">{a.date}</span>;
  const title = <h2 className="post__title">{a.title}</h2>;
  const tagEls = (
    <div className="post__tags">
      {a.tags.slice(0, 3).map((t) => (
        <span key={t} className="tag--mini" onClick={(e) => { e.stopPropagation(); onTag(t); }}>{t}</span>
      ))}
    </div>
  );

  if (dir === "b") {
    return (
      <article className="post" onClick={() => onOpen(a.id)}>
        {date}
        {title}
        {tagEls}
      </article>
    );
  }
  if (dir === "c") {
    return (
      <article className="post" onClick={() => onOpen(a.id)}>
        <div className="post__aside">
          <span className="post__no">{a.no}</span>
          {date}
        </div>
        <div>
          {title}
          <p className="post__sum">{a.summary}</p>
          {tagEls}
        </div>
      </article>
    );
  }
  // dir a — centered
  return (
    <article className="post" onClick={() => onOpen(a.id)}>
      {date}
      {title}
    </article>
  );
}

/* ---------- Code block ---------- */
function CodeBlock({ lang, lines }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const txt = lines.map((l) => l.h).join("\n");
    navigator.clipboard && navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__lang">{lang}</span>
        <button className="code__copy" onClick={copy}>{copied ? "已复制 ✓" : "复制"}</button>
      </div>
      <pre><code>{lines.map((l, i) => (
        <div key={i} className={l.c ? "c-" + l.c : ""}>{l.h || "\u00A0"}</div>
      ))}</code></pre>
    </div>
  );
}

/* ---------- Prose renderer ---------- */
function Block({ b, onTag }) {
  switch (b.t) {
    case "h2": return <h2 id={b.id}>{b.text}</h2>;
    case "h3": return <h3 id={b.id}>{b.text}</h3>;
    case "p": return <p dangerouslySetInnerHTML={{ __html: b.html }} />;
    case "list": return <ul>{b.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
    case "quote": return (
      <blockquote>
        <span dangerouslySetInnerHTML={{ __html: b.text }} />
        {b.by && <span className="by">{b.by}</span>}
      </blockquote>
    );
    case "code": return <CodeBlock lang={b.lang} lines={b.lines} />;
    case "figure": return (
      <figure>
        <div className="ph">{b.label || "图片占位"}</div>
        {b.cap && <figcaption>{b.cap}</figcaption>}
      </figure>
    );
    default: return null;
  }
}

/* ---------- Table of contents ---------- */
function TOC({ items, activeId, onJump }) {
  if (!items.length) return null;
  return (
    <nav className="toc" aria-label="目录">
      <div className="toc__h">目录</div>
      {items.map((it) => (
        <button
          key={it.id}
          className={"toc__item" + (it.level === 3 ? " toc__item--sub" : "") + (activeId === it.id ? " is-active" : "")}
          onClick={() => onJump(it.id)}
        >{it.text}</button>
      ))}
    </nav>
  );
}

/* ---------- Direction switcher (floating) ---------- */
const DIRS = [
  { key: "a", name: "书卷", desc: "居中编辑" },
  { key: "b", name: "索引", desc: "账本清单" },
  { key: "c", name: "札记", desc: "边注杂志" },
];
function DirectionSwitch({ dir, setDir }) {
  return (
    <aside className="switch" aria-label="预览方向切换">
      <div className="switch__h">
        <span>预览方向</span>
        <span style={{ opacity: .6 }}>A · B · C</span>
      </div>
      <div className="switch__row">
        {DIRS.map((d) => (
          <button
            key={d.key}
            className={"switch__opt" + (dir === d.key ? " is-active" : "")}
            onClick={() => setDir(d.key)}
          >
            <span className="switch__key">{d.key.toUpperCase()}</span>
            <span className="switch__name">{d.name}</span>
            <span className="switch__desc">{d.desc}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

Object.assign(window, { Icon, TopBar, TagRow, PostItem, CodeBlock, Block, TOC, DirectionSwitch, DIRS });
