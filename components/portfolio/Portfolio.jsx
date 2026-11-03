'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CLUSTERS, EMAIL, GREETING, LINKS, PROJECTS, SECTIONS, SUGGESTIONS } from './data';

const Icon = ({ name, size = 20, style }) => (
  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: size, ...style }}>{name}</span>
);

function Wave({ active, n, h, color }) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => { setReduce(matchMedia('(prefers-reduced-motion: reduce)').matches); }, []);
  return (
    <div className="pf-wave" style={{ height: h }}>
      {Array.from({ length: n }, (_, i) => {
        const base = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7 + 0.6) * Math.cos(i * 0.45));
        const anim = active && !reduce;
        return (
          <span
            key={i}
            style={{
              height: h,
              background: color,
              transform: anim ? undefined : `scaleY(${active ? base : base * 0.55})`,
              animation: anim ? `cwave ${0.7 + (i % 5) * 0.13}s ease-in-out ${(i % 7) * -0.11}s infinite` : 'none',
            }}
          />
        );
      })}
    </div>
  );
}

const SWATCHES = [
  { c: '#EDE6D8', name: 'Chalk' },
  { c: '#FF5B2E', name: 'Vermilion' },
  { c: '#9DB4FF', name: 'Blue' },
  { c: '#F2D98B', name: 'Highlighter' },
];

const fontVar = name => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || undefined;
};

export default function Portfolio() {
  const [tool, setTool] = useState('move');
  const [color, setColor] = useState('#EDE6D8');
  const [stickies, setStickies] = useState([]);
  const [open, setOpen] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [speak, setSpeak] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [section, setSection] = useState('intro');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState('3d');
  const [threeReady, setThreeReady] = useState(false);
  const [focusNote, setFocusNote] = useState(-1);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const chatRef = useRef(null);
  const threeRef = useRef(null);
  const introRef = useRef(null);
  const threeHandle = useRef(null);
  const recRef = useRef(null);
  const drawing = useRef(null);
  const drag = useRef(null);
  const toolRef = useRef(tool);
  const stateRef = useRef({});
  toolRef.current = tool;
  stateRef.current = { msgs, busy, speak, input, stickies };

  /* ---------- whiteboard canvas ---------- */
  useEffect(() => {
    const c = canvasRef.current, r = rootRef.current;
    if (!c || !r) return;
    const fit = () => {
      const d = window.devicePixelRatio || 1, w = r.clientWidth, h = r.scrollHeight;
      if (c.width === Math.round(w * d) && c.height >= Math.round(h * d)) return;
      const tmp = document.createElement('canvas');
      tmp.width = c.width; tmp.height = c.height;
      if (c.width && c.height) tmp.getContext('2d').drawImage(c, 0, 0);
      c.width = Math.round(w * d);
      c.height = Math.round(Math.max(h, c.height / d) * d);
      c.style.width = w + 'px';
      c.style.height = c.height / d + 'px';
      const ctx = c.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (tmp.width && tmp.height) ctx.drawImage(tmp, 0, 0);
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(r);
    return () => ro.disconnect();
  }, []);

  const pt = e => {
    const b = rootRef.current.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  };

  const onBoardDown = e => {
    const p = pt(e), hl = color === '#F2D98B';
    if (tool === 'marker') {
      drawing.current = p;
      const ctx = canvasRef.current.getContext('2d');
      ctx.strokeStyle = color; ctx.lineWidth = hl ? 18 : 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.globalAlpha = hl ? 0.35 : 1; ctx.globalCompositeOperation = 'source-over';
    } else if (tool === 'sticky') {
      const id = Date.now();
      setStickies(s => [...s, { id, x: p.x - 100, y: p.y - 20, rot: (Math.random() * 6 - 3).toFixed(1), text: '' }]);
      setTool('move');
    }
  };

  useEffect(() => {
    const onMove = e => {
      if (drawing.current) {
        const p = pt(e), ctx = canvasRef.current.getContext('2d'), last = drawing.current;
        ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        drawing.current = p;
      } else if (drag.current) {
        const p = pt(e), d = drag.current;
        setStickies(s => s.map(n => (n.id === d.id ? { ...n, x: p.x - d.dx, y: p.y - d.dy } : n)));
      }
    };
    const onUp = () => { drawing.current = null; drag.current = null; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, []);

  const grab = (id, e) => {
    const p = pt(e), n = stateRef.current.stickies.find(s => s.id === id);
    if (!n) return;
    drag.current = { id, dx: p.x - n.x, dy: p.y - n.y };
    e.preventDefault();
  };

  const clearBoard = () => {
    const c = canvasRef.current;
    if (c) {
      const ctx = c.getContext('2d');
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, c.width, c.height); ctx.restore();
    }
    setStickies([]);
    setTool('move');
  };

  /* ---------- scroll + keyboard ---------- */
  useEffect(() => {
    const onScroll = () => {
      let cur = 'intro';
      SECTIONS.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      });
      setSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stepCase = useCallback(d => {
    setOpen(cur => {
      const i = PROJECTS.findIndex(p => p.id === cur);
      if (i < 0) return cur;
      return PROJECTS[(i + d + PROJECTS.length) % PROJECTS.length].id;
    });
  }, []);

  useEffect(() => {
    const kd = e => {
      if (!open) return;
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') stepCase(1);
      if (e.key === 'ArrowLeft') stepCase(-1);
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, [open, stepCase]);

  const jump = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: 'smooth' });
  };

  /* ---------- 3D objects ---------- */
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    let handle = null, alive = true;
    import('@/lib/board/intro3d')
      .then(m => { if (!alive) return; handle = m.mount(el, { isIdle: () => toolRef.current === 'move' }); })
      .catch(() => {});
    return () => { alive = false; handle && handle.dispose(); };
  }, []);

  useEffect(() => {
    if (view !== '3d') return;
    const el = threeRef.current;
    if (!el) return;
    let alive = true;
    setThreeReady(false);
    import('@/lib/board/toolbox3d')
      .then(m => m.mount(el, CLUSTERS, {
        onFocus: i => setFocusNote(i),
        handFont: fontVar('--font-hand'),
        sansFont: fontVar('--font-sans'),
      }))
      .then(h => {
        if (!alive) { h.dispose(); return; }
        threeHandle.current = h;
        setThreeReady(true);
      })
      .catch(() => alive && setView('flat'));
    return () => {
      alive = false;
      threeHandle.current && threeHandle.current.dispose();
      threeHandle.current = null;
      setFocusNote(-1);
    };
  }, [view]);

  /* ---------- AI clone ---------- */
  const scrollChat = () => requestAnimationFrame(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const send = async raw => {
    const { msgs: cur, busy: isBusy, speak: wantSpeak, input: curInput } = stateRef.current;
    const text = (raw ?? curInput).trim();
    if (!text || isBusy) return;
    const next = [...cur, { role: 'user', content: text }];
    setMsgs(next); setInput(''); setBusy(true); setChatOpen(true); setOpen(null);
    scrollChat();
    let reply;
    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error || 'offline');
      reply = data.reply;
    } catch {
      reply = `I can't reach my brain right now. Email me at ${EMAIL} and the real me will answer.`;
    }
    setMsgs(m => [...m, { role: 'assistant', content: reply }]);
    setBusy(false);
    scrollChat();
    if (wantSpeak && window.speechSynthesis) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(reply);
      u.rate = 1.03;
      u.onstart = () => setSpeaking(true);
      u.onend = u.onerror = () => setSpeaking(false);
      speechSynthesis.speak(u);
    }
  };

  const toggleMic = () => {
    if (listening) { recRef.current && recRef.current.stop(); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setInput('Voice input is not supported in this browser. Type instead.'); return; }
    const rec = new SR();
    rec.lang = 'en-US'; rec.interimResults = true; recRef.current = rec;
    let finalText = '';
    rec.onresult = e => { let t = ''; for (const r of e.results) t += r[0].transcript; finalText = t; setInput(t); };
    rec.onend = () => {
      setListening(false);
      if (finalText) { stateRef.current.speak = true; setSpeak(true); send(finalText); }
    };
    rec.onerror = () => setListening(false);
    setListening(true); setInput('');
    rec.start();
  };

  useEffect(() => () => {
    recRef.current && recRef.current.abort();
    if (typeof window !== 'undefined' && window.speechSynthesis) speechSynthesis.cancel();
  }, []);

  const toggleSpeak = () => {
    if (speak && window.speechSynthesis) speechSynthesis.cancel();
    setSpeak(!speak); setSpeaking(false);
  };

  /* ---------- contact ---------- */
  const copyEmail = () => {
    navigator.clipboard && navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const sendNote = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio note from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const ci = PROJECTS.findIndex(p => p.id === open);
  const cp = PROJECTS[ci];
  const voiceActive = listening || busy || speaking;
  const statusLine = listening ? 'Listening…' : busy ? 'Thinking…' : speaking ? 'Speaking…' : 'AI clone · answers like I would';

  return (
    <div ref={rootRef} className="pf">
      <aside className="pf-aside">
        <div className="pf-col pf-aside-top">
          <div className="pf-eyebrow">Software Engineer</div>
          <h1 className="pf-name">Christian Ikirezi</h1>
          <p className="pf-lede">I build web products end to end, and sweat the interface details most people skip.</p>
          <div className="pf-status">
            <span className="pf-dot" />Open to software roles · Toronto or remote
          </div>
          <nav className="pf-nav" aria-label="Sections">
            {SECTIONS.map(([id, num, label]) => (
              <button key={id} onClick={() => jump(id)} className={section === id ? 'is-active' : ''}>
                <span className="num">{num}</span>
                <span className="line" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pf-col pf-aside-bottom">
          <button className="pf-clone-card" onClick={() => setChatOpen(true)}>
            <div className="row">
              <div className="pf-avatar">CI<span /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="title">Talk to My Clone</div>
                <div className="sub">An AI version of me, trained on my work.</div>
              </div>
              <Icon name="mic" size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <div className="pf-clone-wave">
              <Wave active={false} n={38} h={24} color="#4A463F" />
            </div>
          </button>
          <div className="pf-links">
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--ghost pf-btn--sm">
              <Icon name="download" />Resume
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="pf-textlink">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="pf-textlink">LinkedIn</a>
          </div>
        </div>
      </aside>

      <main className="pf-main">
        <section id="intro" className="pf-section pf-intro">
          <div className="pf-col pf-rise" style={{ gap: 32 }}>
            <div className="pf-hand pf-hand--accent" style={{ fontSize: 28, transform: 'rotate(-2deg)' }}>hi, glad you found the board</div>
            <p className="pf-intro-text">
              Most of my projects start on a whiteboard: a marker, a rough sketch, and a question about how someone should feel using
              the thing. Then I build it myself, <span className="pf-mark">front to back</span>.
            </p>
            <div className="pf-row" style={{ gap: 12 }}>
              <button className="pf-btn pf-btn--primary" onClick={() => jump('work')}>See the Work<Icon name="arrow_downward" /></button>
              <button className="pf-btn pf-btn--ghost" onClick={() => setChatOpen(true)}><Icon name="graphic_eq" />Ask My Clone</button>
            </div>
            <div className="pf-hand pf-hand--muted" style={{ fontSize: 24, transform: 'rotate(-1deg)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>this board works — grab a marker from the tray below</span><Icon name="south_east" />
            </div>
          </div>

          <div className="pf-polaroid-wrap pf-rise" style={{ animationDelay: '120ms' }}>
            <div className="pf-polaroid">
              <div className="pf-polaroid-img">
                <Image src="/portrait.jpg" alt="Christian Ikirezi" fill sizes="360px" style={{ objectFit: 'cover', objectPosition: 'center 35%' }} priority />
              </div>
              <div className="pf-hand" style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', fontSize: 24, color: '#4B483E' }}>
                me, probably debugging
              </div>
            </div>
            <div className="pf-sticky-stat">
              <div className="big">20+</div>
              <div className="small">Projects shipped and maintained</div>
            </div>
            <div className="pf-tag-note">Intern · ready to contribute</div>
            <div ref={introRef} className="pf-intro3d" />
          </div>
        </section>

        <section id="work" className="pf-section" style={{ paddingTop: 72 }}>
          <div className="pf-head">
            <div className="pf-col" style={{ gap: 12 }}>
              <div className="pf-eyebrow">02 · Selected Work</div>
              <h2 className="pf-h2">Things I&apos;ve Shipped</h2>
            </div>
            <div className="pf-hand pf-hand--accent" style={{ fontSize: 24, transform: 'rotate(-2deg)' }}>open one, it&apos;s a full case</div>
          </div>
          <div className="pf-projects">
            {PROJECTS.map((p, i) => (
              <button key={p.id} className="pf-project" onClick={() => setOpen(p.id)}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="body">
                  <span className="name">{p.name}</span>
                  <span className="meta">
                    <span className="tagline">{p.tagline}</span>
                    <span className="short">{p.short}</span>
                  </span>
                </span>
                <span className="arrow"><Icon name="arrow_outward" size={22} /></span>
              </button>
            ))}
          </div>
        </section>

        <section id="toolbox" className="pf-section" style={{ paddingTop: 96 }}>
          <div className="pf-head" style={{ marginBottom: 24 }}>
            <div className="pf-col" style={{ gap: 12 }}>
              <div className="pf-eyebrow">03 · Toolbox</div>
              <h2 className="pf-h2">What I Reach For</h2>
              <p className="pf-muted" style={{ margin: 0, fontSize: 16, lineHeight: '24px', maxWidth: '48ch' }}>
                Sorted the way I&apos;d sort it on a real whiteboard: by the job, not the logo.
              </p>
            </div>
            <div className="pf-row" style={{ gap: 8 }}>
              {[['3d', 'view_in_ar', '3D'], ['flat', 'grid_view', 'Flat']].map(([id, icon, label]) => (
                <button key={id} className={`pf-chip ${view === id ? 'is-on' : ''}`} onClick={() => setView(id)} aria-pressed={view === id}>
                  <Icon name={icon} size={18} />{label}
                </button>
              ))}
            </div>
          </div>

          {view === '3d' ? (
            <div style={{ position: 'relative' }}>
              <div ref={threeRef} className="pf-three" />
              {!threeReady && <div className="pf-three-loading pf-hand">pinning notes…</div>}
              <div className="pf-three-foot">
                <span>Click a note to read it · drag to tilt</span>
                {focusNote >= 0 && (
                  <button onClick={() => { threeHandle.current && threeHandle.current.release(); setFocusNote(-1); }}>
                    <Icon name="undo" size={16} />Put It Back
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="pf-clusters">
              {CLUSTERS.map(c => (
                <div key={c.title} className="pf-cluster" style={{ background: c.bg, transform: `rotate(${c.rot}deg)` }}>
                  <div className="pf-hand title">{c.title}</div>
                  <div className="note">{c.note}</div>
                  <div className="pf-col">
                    {c.items.map(it => <div key={it} className="item">{it}</div>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="contact" className="pf-section" style={{ paddingTop: 96 }}>
          <div className="pf-contact">
            <div className="pf-col" style={{ gap: 24 }}>
              <div className="pf-eyebrow">04 · Contact</div>
              <h2 className="pf-h2 pf-h2--xl">Building something? Let&apos;s talk.</h2>
              <p className="pf-lede" style={{ maxWidth: '42ch' }}>
                A short message is usually all it takes. Tell me what you&apos;re working on and I&apos;ll get back to you within a day.
              </p>
              <div className="pf-row" style={{ gap: 12, alignItems: 'center' }}>
                <a href={`mailto:${EMAIL}`} className="pf-email">{EMAIL}</a>
                <button className="pf-chip pf-chip--accent" onClick={copyEmail}>
                  <Icon name={copied ? 'check' : 'content_copy'} size={16} />{copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="pf-note-card">
              {!sent ? (
                <form className="pf-col" style={{ gap: 20 }} onSubmit={sendNote}>
                  <div className="pf-hand" style={{ fontSize: 32, fontWeight: 700 }}>Leave me a note</div>
                  <label className="pf-label">Name
                    <input className="pf-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </label>
                  <label className="pf-label">Email
                    <input className="pf-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </label>
                  <label className="pf-label">Message
                    <textarea className="pf-input pf-textarea" rows={4} placeholder="What are you building?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </label>
                  <button type="submit" className="pf-btn pf-btn--primary" style={{ alignSelf: 'flex-start' }}>
                    Pin It to My Board<Icon name="push_pin" />
                  </button>
                </form>
              ) : (
                <div className="pf-col" style={{ minHeight: 300, justifyContent: 'center', gap: 10 }}>
                  <Icon name="push_pin" size={36} style={{ color: 'var(--accent)' }} />
                  <div className="pf-hand" style={{ fontSize: 36, fontWeight: 700 }}>Pinned. Thanks.</div>
                  <div className="pf-muted" style={{ fontSize: 16 }}>Your mail app should open with the note. I&apos;ll reply within a day.</div>
                </div>
              )}
            </div>
          </div>
          <footer className="pf-footer">
            <span>© {new Date().getFullYear()} Christian Ikirezi</span>
            <span>Designed on a whiteboard first, then built by me.</span>
          </footer>
        </section>
      </main>

      <canvas
        ref={canvasRef}
        onPointerDown={onBoardDown}
        className="pf-canvas"
        style={{ pointerEvents: tool === 'move' ? 'none' : 'auto', cursor: tool === 'marker' ? 'crosshair' : tool === 'sticky' ? 'copy' : 'default' }}
      />

      {stickies.map(s => (
        <div key={s.id} className="pf-sticky" style={{ left: s.x, top: s.y, transform: `rotate(${s.rot}deg)` }}>
          <div className="grip" onPointerDown={e => grab(s.id, e)}>
            <button title="Remove" aria-label="Remove sticky" onPointerDown={e => e.stopPropagation()} onClick={() => setStickies(st => st.filter(x => x.id !== s.id))}>
              <Icon name="close" size={16} />
            </button>
          </div>
          <textarea
            value={s.text}
            rows={5}
            placeholder="write something…"
            onChange={e => { const v = e.target.value; setStickies(st => st.map(x => (x.id === s.id ? { ...x, text: v } : x))); }}
          />
        </div>
      ))}

      <div className="pf-tray" role="toolbar" aria-label="Whiteboard tools">
        {[['move', 'pan_tool', 'Move'], ['marker', 'edit', 'Marker'], ['sticky', 'sticky_note_2', 'Add sticky']].map(([id, icon, label]) => (
          <button key={id} title={label} aria-label={label} aria-pressed={tool === id} className={`pf-tool ${tool === id ? 'is-on' : ''}`} onClick={() => setTool(id)}>
            <Icon name={icon} size={22} />
          </button>
        ))}
        <button title="Wipe board" aria-label="Wipe board" className="pf-tool" onClick={clearBoard}><Icon name="ink_eraser" size={22} /></button>
        {tool === 'marker' && (
          <div className="pf-swatches">
            {SWATCHES.map(w => (
              <button key={w.c} title={w.name} aria-label={w.name} onClick={() => setColor(w.c)} style={{ background: w.c, boxShadow: `0 0 0 ${color === w.c ? 2 : 0}px #EDE6D8` }} />
            ))}
          </div>
        )}
        <div className="pf-tray-sep" />
        <button className="pf-btn pf-btn--primary pf-tray-ask" onClick={() => setChatOpen(o => !o)}>
          <Icon name="graphic_eq" /><span className="long">Ask Christian</span><span className="short">Ask</span>
        </button>
      </div>

      {cp && (
        <>
          <div className="pf-scrim" onClick={() => setOpen(null)} />
          <div className="pf-drawer" role="dialog" aria-modal="true" aria-label={cp.name}>
            <div className="pf-drawer-bar">
              <div className="pf-eyebrow">Case {String(ci + 1).padStart(2, '0')} of {String(PROJECTS.length).padStart(2, '0')}</div>
              <div className="pf-row" style={{ gap: 4 }}>
                <button className="pf-iconbtn" title="Previous project" aria-label="Previous project" onClick={() => stepCase(-1)}><Icon name="arrow_back" size={22} /></button>
                <button className="pf-iconbtn" title="Next project" aria-label="Next project" onClick={() => stepCase(1)}><Icon name="arrow_forward" size={22} /></button>
                <button className="pf-iconbtn" title="Close" aria-label="Close" onClick={() => setOpen(null)}><Icon name="close" size={22} /></button>
              </div>
            </div>
            <div className="pf-col pf-drawer-body">
              <div className="pf-col" style={{ gap: 12 }}>
                <h2 className="pf-h2 pf-h2--case">{cp.name}</h2>
                <p className="pf-lede" style={{ maxWidth: 'none' }}>{cp.tagline}</p>
              </div>
              <div className="pf-browser">
                <div className="bar">
                  <span /><span /><span />
                  <em>{cp.url.replace('https://', '')}</em>
                </div>
                <div className="shot">
                  <Image src={cp.image} alt={`${cp.name} screenshot`} fill sizes="(max-width: 720px) 100vw, 660px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              </div>
              <div className="pf-metrics">
                {cp.metrics.map(m => (
                  <div key={m.l}>
                    <div className="v">{m.v}</div>
                    <div className="l">{m.l}</div>
                  </div>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 16, lineHeight: '26px' }}>{cp.desc}</p>
              <div className="pf-col" style={{ gap: 12 }}>
                <div className="pf-eyebrow">What It Does</div>
                <ul className="pf-features">
                  {cp.features.map(f => <li key={f}><Icon name="check_circle" size={18} style={{ color: 'var(--accent-hover)' }} />{f}</li>)}
                </ul>
              </div>
              <div className="pf-col" style={{ gap: 12 }}>
                <div className="pf-eyebrow">Built With</div>
                <div className="pf-row" style={{ gap: 8 }}>
                  {cp.stack.map(k => <span key={k} className="pf-stack">{k}</span>)}
                </div>
              </div>
              <div className="pf-row" style={{ gap: 12, paddingTop: 8 }}>
                <a href={cp.url} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--primary">Live Site<Icon name="open_in_new" /></a>
                {cp.github && <a href={cp.github} target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--ghost">GitHub</a>}
                <button className="pf-btn pf-btn--yellow" onClick={() => send(`Tell me about ${cp.name}. What was the hardest part?`)}>
                  <Icon name="graphic_eq" />Ask Me About It
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {chatOpen && (
        <div className="pf-chat" role="dialog" aria-label="Chat with Christian's AI clone">
          <div className="pf-chat-head">
            <div className="pf-avatar">CI<span /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500 }}>Christian <span className="pf-muted" style={{ fontWeight: 400 }}>(the clone)</span></div>
              <div className="pf-muted" style={{ fontSize: 12, lineHeight: '16px' }}>{statusLine}</div>
            </div>
            <button className={`pf-iconbtn pf-iconbtn--accent ${speak ? 'is-on' : ''}`} title="Read replies aloud" aria-label="Read replies aloud" aria-pressed={speak} onClick={toggleSpeak}>
              <Icon name={speak ? 'volume_up' : 'volume_off'} size={22} />
            </button>
            <button className="pf-iconbtn" title="Close" aria-label="Close chat" onClick={() => setChatOpen(false)}><Icon name="close" size={22} /></button>
          </div>
          <div className="pf-chat-wave">
            <Wave active={voiceActive} n={44} h={32} color={listening ? '#FF5B2E' : '#F2D98B'} />
          </div>
          <div ref={chatRef} className="pf-chat-log">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'pf-msg pf-msg--user' : 'pf-msg pf-msg--bot'}>{m.content}</div>
            ))}
            {busy && <div className="pf-msg pf-msg--bot pf-hand pf-muted" style={{ fontSize: 20 }}>thinking…</div>}
            {msgs.length === 1 && !busy && (
              <div className="pf-row" style={{ gap: 8, marginTop: 4 }}>
                {SUGGESTIONS.map(t => <button key={t} className="pf-suggest" onClick={() => send(t)}>{t}</button>)}
              </div>
            )}
          </div>
          <div className="pf-chat-input">
            <button
              className="pf-roundbtn"
              title="Talk"
              aria-label={listening ? 'Stop listening' : 'Talk'}
              onClick={toggleMic}
              style={{ background: listening ? '#FF5B2E' : '#F2D98B', color: listening ? '#FFFFFF' : '#160B06' }}
            >
              <Icon name="mic" size={22} />
            </button>
            <input
              className="pf-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send(); }}
              placeholder={listening ? 'Listening…' : 'Ask me anything'}
              aria-label="Message"
            />
            <button className="pf-roundbtn pf-roundbtn--accent" title="Send" aria-label="Send" onClick={() => send()}><Icon name="arrow_upward" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
