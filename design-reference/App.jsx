/* ============================================================
   App
   ============================================================ */
const { useState: uS, useEffect: uE, useRef: uR, useMemo } = React;

function usePersist(key, init) {
  const [v, setV] = uS(() => {
    try { const s = localStorage.getItem(key); return s == null ? init : JSON.parse(s); }
    catch { return init; }
  });
  uE(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

/* attach stable ids to headings for TOC */
function withIds(article) {
  let n = 0;
  const body = article.body.map((b) => {
    if (b.t === "h2" || b.t === "h3") { n += 1; return { ...b, id: "sec-" + n }; }
    return b;
  });
  const toc = body
    .filter((b) => b.t === "h2" || b.t === "h3")
    .map((b) => ({ id: b.id, text: b.text, level: b.t === "h3" ? 3 : 2 }));
  return { ...article, body, toc };
}

function HomeView({ dir, query, tag, setTag, onOpen, onTag }) {
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const okTag = tag === "全部" || a.tags.includes(tag);
      const okQ = !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return okTag && okQ;
    });
  }, [query, tag]);

  return (
    <div className="page">
      <div className="wrap">
        <header className="mast">
          <div className="mast__kicker">松木的工作札记 · EST. 2024</div>
          <h1 className="mast__title">把复杂的事，<br/>诚实地讲清楚。</h1>
          <p className="mast__sub">
            后端、前端、设计系统，和那些<span className="hand">本以为理所当然</span>、后来发现并不的小事。
          </p>
        </header>

        <TagRow tags={TAGS} active={tag} onPick={setTag} />

        <div className="list">
          {list.length === 0 ? (
            <p className="empty">没有找到相关文章 —— 换个词，或回到「全部」。</p>
          ) : (
            list.map((a) => (
              <PostItem key={a.id} a={a} dir={dir} onOpen={onOpen} onTag={onTag} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ArticleView({ id, onBack, onTag }) {
  const article = useMemo(() => withIds(ARTICLES.find((a) => a.id === id)), [id]);
  const [activeId, setActiveId] = uS(article.toc[0] ? article.toc[0].id : null);
  const [progress, setProgress] = uS(0);

  uE(() => { window.scrollTo(0, 0); }, [id]);

  uE(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [id]);

  uE(() => {
    const heads = article.toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!heads.length) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActiveId(vis[0].target.id);
    }, { rootMargin: "-72px 0px -65% 0px", threshold: 0 });
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [id]);

  const jump = (sid) => {
    const el = document.getElementById(sid);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="page">
      <div className="progress" style={{ width: (progress * 100).toFixed(2) + "%" }} />
      <TOC items={article.toc} activeId={activeId} onJump={jump} />
      <article className="read">
        <button className="read__back" onClick={onBack}>
          <Icon.arrow style={{ width: 14, height: 14 }} /> 返回文章列表
        </button>

        <header className="read__head">
          <div className="read__meta">
            <span>{article.date}</span>
            <span className="read__dot" />
            <span>{article.read}</span>
            <span className="read__dot" />
            <span>{article.tags[0]}</span>
          </div>
          <h1 className="read__title">{article.title}</h1>
          {article.lede && <p className="read__lede">{article.lede}</p>}
        </header>

        <div className="prose">
          {article.body.map((b, i) => <Block key={i} b={b} onTag={onTag} />)}
        </div>

        <footer className="read__foot">
          <div className="read__tags">
            {article.tags.map((t) => (
              <span key={t} className="tag--mini" onClick={() => onTag(t)}>{t}</span>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
}

function AboutView() {
  const a = ABOUT;
  return (
    <div className="page">
      <div className="about">
        <div className="about__photo">作者<br/>头像</div>
        <h1 className="about__name">{a.name} <span className="hand">/ {a.hand}</span></h1>
        <p className="about__role">{a.role}</p>

        <div className="about__body">
          {a.bio.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <h4>此刻 · NOW</h4>
        <ul className="nowlist">
          {a.now.map((n, i) => (
            <li key={i}><span className="k">{n.k}</span><span>{n.v}</span></li>
          ))}
        </ul>

        <h4>找到我</h4>
        <div className="links">
          {a.links.map((l) => <a key={l.label} href={l.href}>{l.label} ↗</a>)}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = usePersist("mb.theme", "light");
  const [dir, setDir] = usePersist("mb.dir", "a");
  const [view, setView] = uS("home");
  const [articleId, setArticleId] = uS(null);
  const [query, setQuery] = uS("");
  const [tag, setTag] = uS("全部");

  uE(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  uE(() => {
    document.documentElement.className = "dir-" + dir;
  }, [dir]);

  const nav = (v) => { setView(v); window.scrollTo(0, 0); };
  const open = (id) => { setArticleId(id); setView("article"); };
  const pickTag = (t) => { setTag(t); setView("home"); window.scrollTo(0, 0); };

  return (
    <React.Fragment>
      <TopBar
        view={view}
        onNav={nav}
        query={query}
        setQuery={setQuery}
        theme={theme}
        toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

      {view === "home" && (
        <HomeView dir={dir} query={query} tag={tag} setTag={setTag} onOpen={open} onTag={pickTag} />
      )}
      {view === "article" && (
        <ArticleView id={articleId} onBack={() => nav("home")} onTag={pickTag} />
      )}
      {view === "about" && <AboutView />}

      <footer className="foot">
        <span>© 2026 松木 · 技术札记</span>
        <span>用衬线与留白写成 · <a href="#">RSS</a></span>
      </footer>

      <DirectionSwitch dir={dir} setDir={setDir} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
