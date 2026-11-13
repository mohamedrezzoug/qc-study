'use strict';
/* Qualitätskontrolle Studienbegleiter – App-Logik (benötigt data.js) */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let lang = LS.get('qc_lang', null) || (navigator.language || 'de').slice(0, 2);
if (!['de', 'en', 'fr'].includes(lang)) lang = 'de';
const tr = o => (o && typeof o === 'object' && !Array.isArray(o)) ? (o[lang] || o.de) : o;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const num = s => parseFloat(String(s).replace(',', '.'));
const nf = (x, d = 3) => (typeof x === 'number' && isFinite(x)) ? x.toLocaleString(lang, { maximumFractionDigits: d }) : '–';
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ---------- Statistik-Helfer ---------- */
function erfc(x) {
  const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r;
}
const Qtail = z => 0.5 * erfc(z / Math.SQRT2);           // P(Z > z)
const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
const sdev = a => { const m = mean(a); return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)); };
function parseRows(text) {
  return text.split(/\n/).map(l => l.trim()).filter(Boolean)
    .map(l => l.split(/[;\t ]+/).map(num).filter(v => isFinite(v)))
    .filter(r => r.length);
}
function binomPa(n, c, p) {
  if (p <= 0) return 1; if (p >= 1) return c >= n ? 1 : 0;
  let term = Math.pow(1 - p, n), sum = term;
  for (let k = 0; k < c && k < n; k++) { term *= (n - k) / (k + 1) * p / (1 - p); sum += term; }
  return Math.min(1, sum);
}
function solveP(n, c, target) {       // p mit Pa(p) = target (Pa fällt mit p)
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (binomPa(n, c, m) > target) lo = m; else hi = m; }
  return (lo + hi) / 2;
}
const CC = { 2: { A2: 1.880, D3: 0, D4: 3.267, d2: 1.128 }, 3: { A2: 1.023, D3: 0, D4: 2.574, d2: 1.693 }, 4: { A2: 0.729, D3: 0, D4: 2.282, d2: 2.059 }, 5: { A2: 0.577, D3: 0, D4: 2.114, d2: 2.326 }, 6: { A2: 0.483, D3: 0, D4: 2.004, d2: 2.534 }, 7: { A2: 0.419, D3: 0.076, D4: 1.924, d2: 2.704 }, 8: { A2: 0.373, D3: 0.136, D4: 1.864, d2: 2.847 }, 9: { A2: 0.337, D3: 0.184, D4: 1.816, d2: 2.970 }, 10: { A2: 0.308, D3: 0.223, D4: 1.777, d2: 3.078 } };
const AQLN = [[8, 'A', 2], [15, 'B', 3], [25, 'C', 5], [50, 'D', 8], [90, 'E', 13], [150, 'F', 20], [280, 'G', 32], [500, 'H', 50], [1200, 'J', 80], [3200, 'K', 125], [10000, 'L', 200], [35000, 'M', 315], [150000, 'N', 500], [500000, 'P', 800], [Infinity, 'Q', 1250]];

/* ---------- Zeichnen (Canvas) ---------- */
let redraw = null;
function setupCanvas(cv, h) {
  const dpr = window.devicePixelRatio || 1, w = cv.clientWidth || 320;
  cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); cv.style.height = h + 'px';
  const c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.font = '11px system-ui, sans-serif'; return { c, w, h };
}
function niceFmt(v) { const a = Math.abs(v); return a >= 100 ? v.toFixed(0) : a >= 10 ? v.toFixed(1) : a >= 1 ? v.toFixed(2) : v.toFixed(3); }
function lineChart(cv, o) {
  const { c, w, h } = setupCanvas(cv, o.h || 190);
  const L = 48, R = 12, Tp = 14, B = 24, pw = w - L - R, ph = h - Tp - B;
  const all = []; o.series.forEach(s => s.vals.forEach(v => all.push(v))); (o.lines || []).forEach(l => all.push(l.y));
  let lo = Math.min(...all), hi = Math.max(...all); if (o.ymin !== undefined) lo = Math.min(lo, o.ymin); if (o.ymax !== undefined) hi = Math.max(hi, o.ymax);
  const pad = (hi - lo || 1) * 0.08; lo -= pad; hi += pad; if (o.ymin === 0) lo = Math.max(0, lo);
  const n = o.labels.length, X = i => L + (n === 1 ? pw / 2 : i * pw / (n - 1)), Y = v => Tp + ph - (v - lo) / (hi - lo) * ph;
  c.clearRect(0, 0, w, h);
  c.strokeStyle = css('--line'); c.fillStyle = css('--mute'); c.lineWidth = 1; c.textAlign = 'right';
  for (let i = 0; i <= 4; i++) { const v = lo + (hi - lo) * i / 4, y = Y(v); c.beginPath(); c.moveTo(L, y); c.lineTo(w - R, y); c.stroke(); c.fillText((o.yfmt || niceFmt)(v), L - 5, y + 4); }
  c.textAlign = 'center'; const step = Math.max(1, Math.ceil(n / 8));
  o.labels.forEach((lb, i) => { if (i % step === 0 || i === n - 1) c.fillText(lb, X(i), h - 8); });
  (o.lines || []).forEach(l => {
    c.strokeStyle = l.color; c.setLineDash(l.dash ? [6, 4] : []); c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(L, Y(l.y)); c.lineTo(w - R, Y(l.y)); c.stroke(); c.setLineDash([]);
    c.fillStyle = l.color; c.textAlign = 'right'; c.fillText(l.label, w - R - 2, Y(l.y) - 3);
  });
  o.series.forEach(s => {
    c.strokeStyle = s.color; c.lineWidth = 2; c.beginPath();
    s.vals.forEach((v, i) => i ? c.lineTo(X(i), Y(v)) : c.moveTo(X(i), Y(v))); c.stroke();
    if (s.points) s.vals.forEach((v, i) => {
      const f = o.flags && o.flags[i]; c.fillStyle = f || s.color; c.beginPath(); c.arc(X(i), Y(v), f ? 4.5 : 3, 0, 7); c.fill();
    });
  });
  if (o.marker) { c.fillStyle = css('--bad'); c.beginPath(); c.arc(X(o.marker.i), Y(o.marker.y), 5, 0, 7); c.fill(); }
}
function paretoChart(cv, items) {
  const { c, w, h } = setupCanvas(cv, 230);
  const L = 40, R = 38, Tp = 14, B = 52, pw = w - L - R, ph = h - Tp - B;
  const total = items.reduce((s, i) => s + i.v, 0), max = items[0].v, bw = pw / items.length;
  c.clearRect(0, 0, w, h); c.strokeStyle = css('--line'); c.fillStyle = css('--mute'); c.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const y = Tp + ph - ph * i / 4; c.beginPath(); c.moveTo(L, y); c.lineTo(w - R, y); c.stroke();
    c.fillText(niceFmt(max * i / 4), L - 4, y + 4); c.textAlign = 'left'; c.fillText(i * 25 + '%', w - R + 4, y + 4); c.textAlign = 'right';
  }
  let cum = 0; c.fillStyle = css('--acc');
  items.forEach((it, i) => { const bh = it.v / max * ph; c.fillStyle = css('--acc'); c.fillRect(L + i * bw + bw * 0.12, Tp + ph - bh, bw * 0.76, bh); });
  c.strokeStyle = css('--warn'); c.lineWidth = 2; c.beginPath();
  items.forEach((it, i) => { cum += it.v; const x = L + i * bw + bw / 2, y = Tp + ph - cum / total * ph; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke();
  cum = 0; items.forEach((it, i) => { cum += it.v; const x = L + i * bw + bw / 2, y = Tp + ph - cum / total * ph; c.fillStyle = css('--warn'); c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); });
  c.setLineDash([5, 4]); c.strokeStyle = css('--mute'); c.lineWidth = 1; const y80 = Tp + ph - ph * 0.8; c.beginPath(); c.moveTo(L, y80); c.lineTo(w - R, y80); c.stroke(); c.setLineDash([]);
  c.fillStyle = css('--mute'); c.textAlign = 'center';
  items.forEach((it, i) => { c.save(); c.translate(L + i * bw + bw / 2, Tp + ph + 8); c.rotate(Math.PI / 5); c.textAlign = 'left'; c.fillText(it.k.length > 12 ? it.k.slice(0, 11) + '…' : it.k, 0, 0); c.restore(); });
}

/* ---------- Texte der Werkzeuge ---------- */
const TOOLS = [
  { id: 'cp', icon: '🎯', t: T(`Prozessfähigkeit Cp / Cpk`, `Process capability Cp / Cpk`, `Capabilité Cp / Cpk`), d: T(`Cp, Cpk, ppm und Sigma‑Niveau`, `Cp, Cpk, ppm and sigma level`, `Cp, Cpk, ppm et niveau sigma`) },
  { id: 'chart', icon: '📈', t: T(`Regelkarte x̄‑R`, `Control chart x̄‑R`, `Carte de contrôle x̄‑R`), d: T(`Grenzen berechnen, Signale erkennen`, `Compute limits, detect signals`, `Calculer les limites, détecter les signaux`) },
  { id: 'pareto', icon: '📊', t: T(`Pareto‑Diagramm`, `Pareto chart`, `Diagramme de Pareto`), d: T(`Fehlerarten sortieren und kumulieren`, `Sort and accumulate defect types`, `Trier et cumuler les types de défauts`) },
  { id: 'sample', icon: '🧪', t: T(`Stichprobe & OC‑Kurve`, `Sampling & OC curve`, `Échantillonnage & courbe OC`), d: T(`Stichprobenbuchstabe, Pₐ, AQL‑/LQ‑Punkt`, `Code letter, Pₐ, AQL / LQ points`, `Lettre-code, Pₐ, points NQA / NQL`) },
  { id: 'fmea', icon: '⚠️', t: T(`FMEA – RPZ`, `FMEA – RPN`, `AMDEC – IPR`), d: T(`Risikoprioritätszahl berechnen`, `Compute the risk priority number`, `Calculer l'indice de priorité de risque`) },
  { id: 'rel', icon: '⏱️', t: T(`Zuverlässigkeit`, `Reliability`, `Fiabilité`), d: T(`Exponential, Weibull, Reihen/Parallel`, `Exponential, Weibull, series/parallel`, `Exponentielle, Weibull, série/parallèle`) }
];
const TX = {
  lsl: T(`USG (untere Grenze)`, `LSL (lower limit)`, `LIS (limite inférieure)`),
  usl: T(`OSG (obere Grenze)`, `USL (upper limit)`, `LSS (limite supérieure)`),
  mu: T(`Mittelwert μ`, `Mean μ`, `Moyenne μ`),
  sg: T(`Standardabweichung σ`, `Standard deviation σ`, `Écart-type σ`),
  dat: T(`…oder Messwerte einfügen (Mittelwert und s werden berechnet)`, `…or paste measured values (mean and s are computed)`, `…ou coller les mesures (moyenne et s calculés)`),
  datHint: T(`Werte durch Leerzeichen, Semikolon oder Zeilenumbruch trennen; Dezimalkomma oder ‑punkt.`, `Separate values with spaces, semicolons or line breaks; decimal comma or point.`, `Séparer les valeurs par espaces, points-virgules ou retours à la ligne ; virgule ou point décimal.`),
  assum: T(`Annahmen: stabiler Prozess, Normalverteilung.`, `Assumptions: stable process, normal distribution.`, `Hypothèses : processus stable, loi normale.`),
  bad: T(`Bitte gültige Werte eingeben.`, `Please enter valid values.`, `Veuillez saisir des valeurs valides.`),
  r0: T(`nicht fähig`, `not capable`, `non capable`), r1: T(`bedingt fähig`, `conditionally capable`, `conditionnellement capable`),
  r2: T(`fähig`, `capable`, `capable`), r3: T(`sehr fähig`, `highly capable`, `très capable`)
};

/* ---------- Router ---------- */
let QS = null, GS = { mode: 'list', q: '', card: 0, flip: false };
function setLang(l) { lang = l; LS.set('qc_lang', l); document.documentElement.lang = l; render(); }
function render() {
  redraw = null;
  const parts = (location.hash || '#/learn').split('/'), view = parts[1] || 'learn', arg = parts[2];
  $$('nav a').forEach(a => {
    const v = a.dataset.v; a.classList.toggle('on', v === (view === 'lesson' ? 'learn' : view === 'tool' ? 'tools' : view === 'doc' ? 'docs' : view === 'project' ? 'projects' : view));
    $('span', a).textContent = tr(UI[v]);
  });
  $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  $('#appName').textContent = tr(UI.appName); $('#appSub').textContent = tr(UI.appSub);
  const main = $('#main'); window.scrollTo(0, 0);
  const fn = { learn: 'vLearn', lesson: 'vLesson', quiz: 'vQuiz', tools: 'vTools', tool: 'vTool', gloss: 'vGloss', docs: 'vDocs', doc: 'vDoc', projects: 'vProjects', project: 'vProject' }[view];
  (typeof window[fn] === 'function' ? window[fn] : vLearn)(main, arg);
}
window.addEventListener('hashchange', render);
window.addEventListener('resize', () => { if (redraw) redraw(); });

/* ---------- Lernen ---------- */
function vLearn(m) {
  const done = LS.get('qc_done', []), pct = Math.round(done.length / LESSONS.length * 100);
  m.innerHTML = `<div class="card prog"><div class="row between"><b>${tr(UI.progress)}</b><span>${done.length}/${LESSONS.length} ${tr(UI.lessonsDone)}</span></div>
    <div class="bar"><i style="width:${pct}%"></i></div></div>` +
    LESSONS.map(l => `<a class="card lesson" href="#/lesson/${l.id}"><span class="ic">${l.icon}</span><span class="tt"><small>${tr(UI.learn)} ${l.id}</small><b>${esc(tr(l.title))}</b></span><span class="chk">${done.includes(l.id) ? '✓' : '›'}</span></a>`).join('') +
    `<p class="foot">${tr(UI.offline)}</p><p class="foot"><a href="#" id="rst">${tr(UI.reset)}</a></p>`;
  $('#rst').onclick = e => { e.preventDefault(); if (confirm(tr(UI.resetAsk))) { LS.set('qc_done', []); LS.set('qc_stats', { a: 0, c: 0, best: 0 }); render(); } };
}
function vLesson(m, id) {
  const l = LESSONS.find(x => x.id == id); if (!l) return vLearn(m);
  const done = LS.get('qc_done', []);
  m.innerHTML = `<a class="back" href="#/learn">${tr(UI.back)}</a><h2>${l.icon} ${l.id}. ${esc(tr(l.title))}</h2>` +
    l.sections.map(s => `<section class="card"><h3>${esc(tr(s.h))}</h3>` +
      (s.p ? `<p>${esc(tr(s.p))}</p>` : '') +
      (s.f ? s.f.map(f => `<div class="formula">${esc(f)}</div>`).join('') : '') +
      (s.b ? `<ul>${tr(s.b).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '') + `</section>`).join('') +
    `<div class="row"><button class="btn" id="dn">${done.includes(l.id) ? tr(UI.done) : tr(UI.markDone)}</button><a class="btn ghost" href="#/quiz/${l.id}">${tr(UI.practice)}</a></div>
     <div class="row between navl">${l.id > 1 ? `<a href="#/lesson/${l.id - 1}">← ${esc(tr(LESSONS[l.id - 2].title))}</a>` : '<span></span>'}${l.id < LESSONS.length ? `<a href="#/lesson/${l.id + 1}">${esc(tr(LESSONS[l.id].title))} →</a>` : ''}</div>`;
  $('#dn').onclick = () => { let d = LS.get('qc_done', []); d = d.includes(l.id) ? d.filter(x => x !== l.id) : d.concat(l.id); LS.set('qc_done', d); render(); };
}

/* ---------- Quiz ---------- */
function qStart(mode) {
  const pool = QUIZ.map((q, i) => i).filter(i => mode === 'all' || QUIZ[i].l == mode);
  QS = { mode, queue: shuffle(pool), pos: 0, score: 0, streak: 0, ans: null, order: null };
  qPrep();
}
function qPrep() { if (QS.pos < QS.queue.length) { QS.order = shuffle(QUIZ[QS.queue[QS.pos]].o.map((_, i) => i)); QS.ans = null; } }
function vQuiz(m, arg) {
  if (!arg) {
    m.innerHTML = `<h2>${tr(UI.quiz)}</h2><a class="card lesson" href="#/quiz/all"><span class="ic">♾️</span><span class="tt"><b>${tr(UI.allQuestions)}</b><small>${QUIZ.length} ${tr(UI.questionsCount)}</small></span><span class="chk">›</span></a>
      <h3 class="sub">${tr(UI.byLesson)}</h3>` + LESSONS.map(l => `<a class="card lesson" href="#/quiz/${l.id}"><span class="ic">${l.icon}</span><span class="tt"><b>${l.id}. ${esc(tr(l.title))}</b><small>${QUIZ.filter(q => q.l === l.id).length} ${tr(UI.questionsCount)}</small></span><span class="chk">›</span></a>`).join('');
    return;
  }
  if (!QS || String(QS.mode) !== String(arg)) qStart(arg);
  if (QS.pos >= QS.queue.length) {
    m.innerHTML = `<a class="back" href="#/quiz">${tr(UI.back)}</a><div class="card center"><h2>🎉 ${QS.score} / ${QS.queue.length}</h2><p>${tr(UI.roundDone)}</p><button class="btn" id="nr">${tr(UI.newRound)}</button></div>`;
    $('#nr').onclick = () => { qStart(arg); render(); }; return;
  }
  const q = QUIZ[QS.queue[QS.pos]], opt = o => esc(tr(o));
  m.innerHTML = `<a class="back" href="#/quiz">${tr(UI.back)}</a>
    <div class="row between qh"><span>${tr(UI.question)} ${QS.pos + 1}/${QS.queue.length}</span><span>${tr(UI.score)}: ${QS.score} · ${tr(UI.streak)}: ${QS.streak}</span></div>
    <div class="card"><h3>${esc(tr(q.q))}</h3><div class="opts">${QS.order.map(i => `<button class="opt" data-i="${i}">${opt(q.o[i])}</button>`).join('')}</div><div id="fb"></div></div>`;
  const reveal = () => {
    $$('.opt', m).forEach(b => { b.disabled = true; const i = +b.dataset.i; if (i === q.ok) b.classList.add('ok'); else if (i === QS.ans) b.classList.add('no'); });
    const good = QS.ans === q.ok;
    $('#fb').innerHTML = `<p class="${good ? 'good' : 'bad'}"><b>${good ? tr(UI.correct) : tr(UI.wrong)}</b></p>` +
      (good ? '' : `<p><a href="#/lesson/${q.l}">📖 ${tr(UI.review)} ${q.l}</a></p>`) + `<button class="btn" id="nx">${tr(UI.next)}</button>`;
    $('#nx').onclick = () => { QS.pos++; qPrep(); render(); };
  };
  if (QS.ans !== null) reveal();
  $$('.opt', m).forEach(b => b.onclick = () => {
    if (QS.ans !== null) return; QS.ans = +b.dataset.i;
    const good = QS.ans === q.ok; if (good) { QS.score++; QS.streak++; } else QS.streak = 0;
    const st = LS.get('qc_stats', { a: 0, c: 0, best: 0 }); st.a++; if (good) st.c++; st.best = Math.max(st.best, QS.streak); LS.set('qc_stats', st);
    const head = $('.qh span:last-child', m); head.textContent = `${tr(UI.score)}: ${QS.score} · ${tr(UI.streak)}: ${QS.streak}`; reveal();
  });
}

/* ---------- Glossar ---------- */
const LI = { de: 0, en: 1, fr: 2 };
function glossRows() {
  const q = GS.q.trim().toLowerCase();
  return GLOSS.filter(g => !q || g.some(x => x.toLowerCase().includes(q)));
}
function vGloss(m) {
  m.innerHTML = `<h2>${tr(UI.gloss)}</h2><div class="row"><input id="gq" type="search" placeholder="${esc(tr(UI.search))}" value="${esc(GS.q)}">
    <button class="btn ghost sm" id="gm">${GS.mode === 'list' ? tr(UI.cards) : tr(UI.list)}</button></div><div id="gb"></div>`;
  const body = () => {
    const gb = $('#gb');
    if (GS.mode === 'list') {
      gb.innerHTML = glossRows().map(g => `<div class="card gl"><b>${esc(g[LI[lang]])}</b>` + ['de', 'en', 'fr'].filter(k => k !== lang).map(k => `<div><span class="tag">${k.toUpperCase()}</span> ${esc(g[LI[k]])}</div>`).join('') + `</div>`).join('') || '';
    } else {
      const g = GLOSS[GS.card % GLOSS.length];
      gb.innerHTML = `<div class="card flash" id="fc"><small>${tr(UI.tapFlip)}</small>` + (GS.flip
        ? ['de', 'en', 'fr'].map(k => `<div class="fl"><span class="tag">${k.toUpperCase()}</span> <b>${esc(g[LI[k]])}</b></div>`).join('')
        : `<div class="big">${esc(g[LI[lang]])}</div>`) + `</div><button class="btn" id="fn">${tr(UI.nextCard)}</button>`;
      $('#fc').onclick = () => { GS.flip = !GS.flip; body(); };
      $('#fn').onclick = () => { GS.card = Math.floor(Math.random() * GLOSS.length); GS.flip = false; body(); };
    }
  };
  $('#gq').oninput = e => { GS.q = e.target.value; if (GS.mode === 'list') body(); };
  $('#gm').onclick = () => { GS.mode = GS.mode === 'list' ? 'cards' : 'list'; GS.flip = false; GS.card = Math.floor(Math.random() * GLOSS.length); render(); };
  body();
}

/* ---------- Werkzeuge ---------- */
function vTools(m) {
  m.innerHTML = `<h2>${tr(UI.tools)}</h2>` + TOOLS.map(t => `<a class="card lesson" href="#/tool/${t.id}"><span class="ic">${t.icon}</span><span class="tt"><b>${esc(tr(t.t))}</b><small>${esc(tr(t.d))}</small></span><span class="chk">›</span></a>`).join('');
}
function vTool(m, id) {
  const t = TOOLS.find(x => x.id === id); if (!t) return vTools(m);
  m.innerHTML = `<a class="back" href="#/tools">${tr(UI.back)}</a><h2>${t.icon} ${esc(tr(t.t))}</h2><div id="tb"></div>`;
  ({ cp: toolCp, chart: toolChart, pareto: toolPareto, sample: toolSample, fmea: toolFmea, rel: toolRel })[id]($('#tb'));
}
const field = (id, label, val = '', ph = '') => `<label>${label}<input id="${id}" inputmode="decimal" value="${val}" placeholder="${ph}"></label>`;

function toolCp(el) {
  el.innerHTML = `<div class="card"><div class="grid2">${field('lsl', tr(TX.lsl))}${field('usl', tr(TX.usl))}${field('mu', tr(TX.mu))}${field('sg', tr(TX.sg))}</div>
    <label>${tr(TX.dat)}<textarea id="dat" rows="3"></textarea></label><small>${tr(TX.datHint)}</small>
    <div class="row"><button class="btn" id="go">${tr(UI.calc)}</button><button class="btn ghost" id="ex">${tr(UI.example)}</button></div></div><div id="out"></div><p class="foot">${tr(TX.assum)}</p>`;
  const go = () => {
    const vals = parseRows($('#dat').value).flat();
    if (vals.length >= 2) { $('#mu').value = mean(vals).toFixed(4); $('#sg').value = sdev(vals).toFixed(4); }
    const L = num($('#lsl').value), U = num($('#usl').value), mu = num($('#mu').value), s = num($('#sg').value), out = $('#out');
    if (![L, U, mu, s].every(isFinite) || s <= 0 || U <= L) { out.innerHTML = `<div class="card bad">${tr(TX.bad)}</div>`; return; }
    const cp = (U - L) / (6 * s), cpu = (U - mu) / (3 * s), cpl = (mu - L) / (3 * s), cpk = Math.min(cpu, cpl);
    const pU = Qtail((U - mu) / s) * 1e6, pL = Qtail((mu - L) / s) * 1e6;
    const r = cpk < 1 ? TX.r0 : cpk < 1.33 ? TX.r1 : cpk < 1.67 ? TX.r2 : TX.r3, cls = cpk < 1 ? 'bad' : cpk < 1.33 ? 'warn' : 'good';
    out.innerHTML = `<div class="card"><h3>${tr(UI.result)}</h3><table>
      <tr><td>Cp</td><td><b>${nf(cp, 3)}</b></td></tr><tr><td>Cpk</td><td><b class="${cls}">${nf(cpk, 3)}</b> – ${tr(r)}</td></tr>
      <tr><td>Cpu / Cpl</td><td>${nf(cpu, 3)} / ${nf(cpl, 3)}</td></tr><tr><td>σ‑${lang === 'fr' ? 'niveau' : lang === 'en' ? 'level' : 'Niveau'} ≈ 3·Cpk</td><td>${nf(3 * cpk, 2)}</td></tr>
      <tr><td>ppm &gt; ${lang === 'de' ? 'OSG' : lang === 'fr' ? 'LSS' : 'USL'}</td><td>${nf(pU, 1)}</td></tr><tr><td>ppm &lt; ${lang === 'de' ? 'USG' : lang === 'fr' ? 'LIS' : 'LSL'}</td><td>${nf(pL, 1)}</td></tr>
      <tr><td>ppm Σ</td><td><b>${nf(pU + pL, 1)}</b></td></tr></table></div>`;
  };
  $('#go').onclick = go;
  $('#ex').onclick = () => { $('#lsl').value = '9.4'; $('#usl').value = '10.6'; $('#mu').value = '10.2'; $('#sg').value = '0.1'; $('#dat').value = ''; go(); };
}

function exampleSubgroups() {
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647, g = () => (rnd() + rnd() + rnd() + rnd() - 2) * 0.17;
  const rows = []; for (let k = 0; k < 20; k++) { const row = []; const shift = k === 13 ? 0.28 : k >= 15 ? 0.07 : 0; for (let i = 0; i < 5; i++) row.push((10 + shift + g()).toFixed(2)); rows.push(row.join(' ')); }
  return rows.join('\n');
}
function toolChart(el) {
  el.innerHTML = `<div class="card"><label>${lang === 'de' ? 'Untergruppen – eine Zeile je Untergruppe (n = 2…10)' : lang === 'fr' ? 'Sous-groupes – une ligne par sous-groupe (n = 2…10)' : 'Subgroups – one line per subgroup (n = 2…10)'}<textarea id="dat" rows="6"></textarea></label><small>${tr(TX.datHint)}</small>
    <div class="row"><button class="btn" id="go">${tr(UI.calc)}</button><button class="btn ghost" id="ex">${tr(UI.example)}</button></div></div><div id="out"></div>`;
  const go = () => {
    const rows = parseRows($('#dat').value), out = $('#out'), n = rows.length ? rows[0].length : 0;
    if (rows.length < 3 || n < 2 || n > 10 || rows.some(r => r.length !== n)) {
      out.innerHTML = `<div class="card bad">${lang === 'de' ? 'Mindestens 3 Untergruppen mit gleichem Umfang n (2–10) eingeben.' : lang === 'fr' ? 'Saisir au moins 3 sous-groupes de même taille n (2–10).' : 'Enter at least 3 subgroups of equal size n (2–10).'}</div>`; return;
    }
    const k = rows.length, xb = rows.map(mean), rg = rows.map(r => Math.max(...r) - Math.min(...r)), xx = mean(xb), rb = mean(rg), c = CC[n];
    const uX = xx + c.A2 * rb, lX = xx - c.A2 * rb, uR = c.D4 * rb, lR = c.D3 * rb, sig = rb / c.d2;
    const fx = {}, fr = {}, sx = [], sr = [];
    xb.forEach((v, i) => { if (v > uX || v < lX) { fx[i] = css('--bad'); sx.push(i + 1); } });
    rg.forEach((v, i) => { if (v > uR || v < lR) { fr[i] = css('--bad'); sr.push(i + 1); } });
    const run = [];
    for (let i = 7; i < k; i++) { const w = xb.slice(i - 7, i + 1); if (w.every(v => v > xx) || w.every(v => v < xx)) for (let j = i - 7; j <= i; j++) { if (!fx[j]) fx[j] = css('--warn'); if (!run.includes(j + 1)) run.push(j + 1); } }
    const lbl = rows.map((_, i) => String(i + 1)), sup = s => s.length ? s.join(', ') : '–';
    const T3 = { sigX: lang === 'de' ? 'x̄ außerhalb der Grenzen' : lang === 'fr' ? 'x̄ hors limites' : 'x̄ outside limits', sigR: lang === 'de' ? 'R außerhalb der Grenzen' : lang === 'fr' ? 'R hors limites' : 'R outside limits', run: lang === 'de' ? '8er‑Serie auf einer Seite' : lang === 'fr' ? 'série de 8 du même côté' : 'run of 8 on one side', ok: lang === 'de' ? 'Keine Signale – Prozess erscheint unter statistischer Kontrolle.' : lang === 'fr' ? 'Aucun signal – processus apparemment sous contrôle statistique.' : 'No signals – process appears to be in statistical control.', sg: lang === 'de' ? 'Untergruppen' : lang === 'fr' ? 'sous-groupes' : 'subgroups' };
    out.innerHTML = `<div class="card"><canvas id="c1"></canvas><canvas id="c2"></canvas></div><div class="card"><table>
      <tr><td>k / n</td><td>${k} ${T3.sg} / ${n}</td></tr><tr><td>x̿ / R̄</td><td>${nf(xx, 4)} / ${nf(rb, 4)}</td></tr>
      <tr><td>x̄: UCL / LCL</td><td>${nf(uX, 4)} / ${nf(lX, 4)}</td></tr><tr><td>R: UCL / LCL</td><td>${nf(uR, 4)} / ${nf(lR, 4)}</td></tr><tr><td>σ̂ = R̄/d₂</td><td>${nf(sig, 4)}</td></tr></table>
      ${(sx.length || sr.length || run.length) ? `<p class="bad"><b>⚠</b> ${T3.sigX}: ${sup(sx)}<br>${T3.sigR}: ${sup(sr)}<br>${T3.run}: ${sup(run.sort((a, b) => a - b))}</p>` : `<p class="good">✓ ${T3.ok}</p>`}</div>`;
    redraw = () => {
      lineChart($('#c1'), { h: 190, labels: lbl, series: [{ vals: xb, color: css('--acc'), points: true }], flags: fx, lines: [{ y: uX, label: 'UCL', color: css('--bad'), dash: true }, { y: xx, label: 'x̿', color: css('--good') }, { y: lX, label: 'LCL', color: css('--bad'), dash: true }] });
      lineChart($('#c2'), { h: 150, labels: lbl, series: [{ vals: rg, color: css('--acc2'), points: true }], flags: fr, ymin: 0, lines: [{ y: uR, label: 'UCL', color: css('--bad'), dash: true }, { y: rb, label: 'R̄', color: css('--good') }].concat(lR > 0 ? [{ y: lR, label: 'LCL', color: css('--bad'), dash: true }] : []) });
    };
    redraw();
  };
  $('#go').onclick = go; $('#ex').onclick = () => { $('#dat').value = exampleSubgroups(); go(); };
}

function toolPareto(el) {
  el.innerHTML = `<div class="card"><label>${lang === 'de' ? 'Fehlerart und Anzahl – eine Zeile je Fehlerart' : lang === 'fr' ? 'Type de défaut et nombre – une ligne par type' : 'Defect type and count – one line each'}<textarea id="dat" rows="6" placeholder="Kratzer: 42"></textarea></label>
    <div class="row"><button class="btn" id="go">${tr(UI.calc)}</button><button class="btn ghost" id="ex">${tr(UI.example)}</button></div></div><div id="out"></div>`;
  const go = () => {
    const items = $('#dat').value.split(/\n/).map(l => l.trim().match(/^(.*?)[\s:;]+([\d.,]+)\s*$/)).filter(Boolean).map(m => ({ k: m[1].trim() || '?', v: num(m[2]) })).filter(i => isFinite(i.v) && i.v > 0).sort((a, b) => b.v - a.v);
    const out = $('#out'); if (items.length < 2) { out.innerHTML = `<div class="card bad">${tr(TX.bad)}</div>`; return; }
    const tot = items.reduce((s, i) => s + i.v, 0); let cum = 0;
    out.innerHTML = `<div class="card"><canvas id="c1"></canvas></div><div class="card"><table>` + items.map(i => { cum += i.v; return `<tr><td>${esc(i.k)}</td><td>${nf(i.v, 2)}</td><td>${nf(i.v / tot * 100, 1)} %</td><td>${nf(cum / tot * 100, 1)} %</td></tr>`; }).join('') + `</table></div>`;
    redraw = () => paretoChart($('#c1'), items); redraw();
  };
  $('#go').onclick = go;
  $('#ex').onclick = () => { $('#dat').value = lang === 'de' ? 'Kratzer: 42\nMaßabweichung: 27\nLunker: 14\nGrat: 9\nFarbfehler: 5\nSonstige: 3' : lang === 'fr' ? 'Rayures: 42\nÉcart dimensionnel: 27\nRetassure: 14\nBavure: 9\nDéfaut de couleur: 5\nAutres: 3' : 'Scratches: 42\nDimension deviation: 27\nShrink holes: 14\nBurr: 9\nColour defect: 5\nOthers: 3'; go(); };
}

function toolSample(el) {
  el.innerHTML = `<div class="card"><h3>${lang === 'de' ? 'Stichprobenbuchstabe (ISO 2859‑1, allgemeines Prüfniveau II)' : lang === 'fr' ? 'Lettre-code (ISO 2859‑1, niveau de contrôle général II)' : 'Sample size code letter (ISO 2859‑1, general inspection level II)'}</h3>
    <div class="grid2">${field('lot', tr(T(`Losgröße N`, `Lot size N`, `Taille du lot N`)), '1000')}<div id="lr" class="res"></div></div></div>
    <div class="card"><h3>${lang === 'de' ? 'Einfach‑Stichprobenplan (n, c)' : lang === 'fr' ? 'Plan d\'échantillonnage simple (n, c)' : 'Single sampling plan (n, c)'}</h3>
    <div class="grid2">${field('n', 'n', '80')}${field('c', 'c', '2')}${field('p', lang === 'de' ? 'Fehleranteil p (%)' : lang === 'fr' ? 'Proportion de défectueux p (%)' : 'Fraction defective p (%)', '2')}</div>
    <div class="row"><button class="btn" id="go">${tr(UI.calc)}</button></div></div><div id="out"></div>
    <p class="foot">${lang === 'de' ? 'Die Annahmezahl c je AQL entnehmen Sie der Tabelle der ISO 2859‑1; hier wird die OC‑Kurve (Binomialmodell) berechnet.' : lang === 'fr' ? 'Le nombre d\'acceptation c selon le NQA se lit dans les tableaux de l\'ISO 2859‑1 ; ici la courbe OC (modèle binomial) est calculée.' : 'Take the acceptance number c for your AQL from the ISO 2859‑1 tables; here the OC curve (binomial model) is computed.'}</p>`;
  const lot = () => {
    const N = Math.floor(num($('#lot').value)), r = $('#lr');
    if (!(N >= 2)) { r.textContent = '–'; return; }
    const row = AQLN.find(x => N <= x[0]); r.innerHTML = `<b>${row[1]}</b> → n = <b>${Math.min(row[2], N)}</b>${row[2] >= N ? ' (100 %)' : ''}`;
    if (!$('#n').dataset.touched) $('#n').value = Math.min(row[2], N);
  };
  $('#lot').oninput = lot; $('#n').oninput = e => e.target.dataset.touched = 1; lot();
  const go = () => {
    const n = Math.floor(num($('#n').value)), c = Math.floor(num($('#c').value)), p = num($('#p').value) / 100, out = $('#out');
    if (!(n >= 1) || !(c >= 0) || c > n || !(p >= 0 && p <= 1)) { out.innerHTML = `<div class="card bad">${tr(TX.bad)}</div>`; return; }
    const pa = binomPa(n, c, p), p95 = solveP(n, c, 0.95), p10 = solveP(n, c, 0.10), pmax = Math.min(1, Math.max(p * 1.5, p10 * 1.3, 0.02));
    const pts = [], lb = []; for (let i = 0; i <= 60; i++) { const x = pmax * i / 60; pts.push(binomPa(n, c, x) * 100); lb.push((x * 100).toFixed(pmax * 100 < 5 ? 1 : 0) + '%'); }
    const mi = Math.round(Math.min(p, pmax) / pmax * 60);
    out.innerHTML = `<div class="card"><canvas id="c1"></canvas></div><div class="card"><table>
      <tr><td>Pₐ(p = ${nf(p * 100, 2)} %)</td><td><b>${nf(pa * 100, 1)} %</b></td></tr>
      <tr><td>${lang === 'de' ? 'AQL‑Punkt (Pₐ = 95 %)' : lang === 'fr' ? 'Point NQA (Pₐ = 95 %)' : 'AQL point (Pₐ = 95 %)'}</td><td>p ≈ ${nf(p95 * 100, 2)} %</td></tr>
      <tr><td>${lang === 'de' ? 'LQ‑Punkt (Pₐ = 10 %)' : lang === 'fr' ? 'Point NQL (Pₐ = 10 %)' : 'LQ point (Pₐ = 10 %)'}</td><td>p ≈ ${nf(p10 * 100, 2)} %</td></tr></table></div>`;
    redraw = () => lineChart($('#c1'), { h: 210, labels: lb, series: [{ vals: pts, color: css('--acc') }], ymin: 0, ymax: 100, yfmt: v => v.toFixed(0) + '%', marker: { i: mi, y: pa * 100 }, lines: [{ y: 95, label: '95 %', color: css('--good'), dash: true }, { y: 10, label: '10 %', color: css('--bad'), dash: true }] });
    redraw();
  };
  $('#go').onclick = go; go();
}

function toolFmea(el) {
  const sel = (id, lab, hint, v) => `<label>${lab} <b id="${id}v">${v}</b><input type="range" id="${id}" min="1" max="10" value="${v}"></label><small>${hint}</small>`;
  const H = { s: T(`1 = keine Auswirkung … 10 = Sicherheitsrisiko / Gesetzesverstoß`, `1 = no effect … 10 = safety risk / regulatory violation`, `1 = aucun effet … 10 = risque sécurité / non-conformité réglementaire`), o: T(`1 = sehr unwahrscheinlich … 10 = nahezu sicher`, `1 = very unlikely … 10 = almost certain`, `1 = très improbable … 10 = quasi certain`), d: T(`1 = sicher entdeckt … 10 = kaum entdeckbar`, `1 = surely detected … 10 = hardly detectable`, `1 = détection quasi certaine … 10 = quasi indétectable`) };
  el.innerHTML = `<div class="card">${sel('s', lang === 'de' ? 'Bedeutung B (S)' : lang === 'fr' ? 'Gravité G (S)' : 'Severity S', tr(H.s), 5)}${sel('o', lang === 'de' ? 'Auftreten A (O)' : lang === 'fr' ? 'Occurrence O' : 'Occurrence O', tr(H.o), 4)}${sel('d', lang === 'de' ? 'Entdeckung E (D)' : lang === 'fr' ? 'Détection D' : 'Detection D', tr(H.d), 6)}</div><div id="out" class="card center"></div>`;
  const up = () => {
    const s = +$('#s').value, o = +$('#o').value, d = +$('#d').value, r = s * o * d;
    ['s', 'o', 'd'].forEach(k => $('#' + k + 'v').textContent = $('#' + k).value);
    const cls = r >= 200 ? 'bad' : r >= 100 ? 'warn' : 'good';
    const msg = s >= 9 ? (lang === 'de' ? 'Hohe Bedeutung (≥ 9): Maßnahmen immer prüfen, unabhängig von der RPZ.' : lang === 'fr' ? 'Gravité élevée (≥ 9) : toujours examiner des actions, quelle que soit la valeur d\'IPR.' : 'High severity (≥ 9): always review actions, regardless of the RPN.')
      : r >= 100 ? (lang === 'de' ? 'RPZ ≥ 100: häufig verwendete Schwelle für Maßnahmen (firmenspezifisch).' : lang === 'fr' ? 'IPR ≥ 100 : seuil souvent utilisé pour déclencher des actions (propre à l\'entreprise).' : 'RPN ≥ 100: commonly used threshold for actions (company-specific).')
        : (lang === 'de' ? 'Unterhalb üblicher Schwellen – Risiko beobachten.' : lang === 'fr' ? 'Sous les seuils usuels – surveiller le risque.' : 'Below common thresholds – keep monitoring.');
    $('#out').innerHTML = `<div class="big ${cls}">${r}</div><div>${s} × ${o} × ${d}</div><p>${msg}</p>`;
  };
  ['s', 'o', 'd'].forEach(k => $('#' + k).oninput = up); up();
}

function toolRel(el) {
  el.innerHTML = `<div class="card"><label>${lang === 'de' ? 'Modell' : lang === 'fr' ? 'Modèle' : 'Model'}<select id="md"><option value="e">${lang === 'de' ? 'Exponential (konstante Ausfallrate)' : lang === 'fr' ? 'Exponentielle (taux constant)' : 'Exponential (constant failure rate)'}</option><option value="w">Weibull</option></select></label>
    <div class="grid2">${field('t', 't', '500')}<span id="pe">${field('mt', 'MTBF', '1000')}</span><span id="pw" hidden>${field('be', 'β', '2')}${field('et', 'η', '1000')}</span></div>
    <div class="row"><button class="btn" id="go">${tr(UI.calc)}</button></div><div id="out"></div></div>
    <div class="card"><h3>${lang === 'de' ? 'Systemzuverlässigkeit' : lang === 'fr' ? 'Fiabilité du système' : 'System reliability'}</h3><label>${lang === 'de' ? 'Zuverlässigkeiten der Bauteile (0–1), durch Leerzeichen getrennt' : lang === 'fr' ? 'Fiabilités des composants (0–1), séparées par des espaces' : 'Component reliabilities (0–1), separated by spaces'}<input id="rs" value="0.9 0.95 0.98"></label><div id="so"></div></div>`;
  const vis = () => { const w = $('#md').value === 'w'; $('#pe').hidden = w; $('#pw').hidden = !w; };
  const go = () => {
    const t = num($('#t').value), out = $('#out'); let h;
    if ($('#md').value === 'e') {
      const mt = num($('#mt').value); if (!(t >= 0) || !(mt > 0)) { out.innerHTML = `<p class="bad">${tr(TX.bad)}</p>`; return; }
      const R = Math.exp(-t / mt); h = `<table><tr><td>R(t)</td><td><b>${nf(R * 100, 2)} %</b></td></tr><tr><td>F(t)</td><td>${nf((1 - R) * 100, 2)} %</td></tr><tr><td>λ</td><td>${(1 / mt).toExponential(3)} / h</td></tr></table>`;
    } else {
      const b = num($('#be').value), e = num($('#et').value); if (!(t >= 0) || !(b > 0) || !(e > 0)) { out.innerHTML = `<p class="bad">${tr(TX.bad)}</p>`; return; }
      const R = Math.exp(-Math.pow(t / e, b)), hz = b / e * Math.pow(t / e, b - 1), b10 = e * Math.pow(-Math.log(0.9), 1 / b);
      h = `<table><tr><td>R(t)</td><td><b>${nf(R * 100, 2)} %</b></td></tr><tr><td>F(t)</td><td>${nf((1 - R) * 100, 2)} %</td></tr><tr><td>h(t)</td><td>${isFinite(hz) ? hz.toExponential(3) : '–'} / h</td></tr><tr><td>B10</td><td>${nf(b10, 1)}</td></tr></table>
        <p class="foot">${b < 1 ? (lang === 'de' ? 'β < 1: Frühausfälle' : lang === 'fr' ? 'β < 1 : défaillances précoces' : 'β < 1: early failures') : b === 1 ? (lang === 'de' ? 'β = 1: Zufallsausfälle' : lang === 'fr' ? 'β = 1 : défaillances aléatoires' : 'β = 1: random failures') : (lang === 'de' ? 'β > 1: Verschleißausfälle' : lang === 'fr' ? 'β > 1 : défaillances d\'usure' : 'β > 1: wear-out failures')}</p>`;
    }
    out.innerHTML = h;
  };
  const sys = () => {
    const v = $('#rs').value.split(/[;\s]+/).map(num).filter(x => isFinite(x) && x >= 0 && x <= 1), o = $('#so');
    if (!v.length) { o.innerHTML = ''; return; }
    o.innerHTML = `<table><tr><td>${lang === 'de' ? 'Reihe' : lang === 'fr' ? 'Série' : 'Series'}</td><td><b>${nf(v.reduce((a, b) => a * b, 1) * 100, 2)} %</b></td></tr><tr><td>${lang === 'de' ? 'Parallel' : lang === 'fr' ? 'Parallèle' : 'Parallel'}</td><td><b>${nf((1 - v.reduce((a, b) => a * (1 - b), 1)) * 100, 3)} %</b></td></tr></table>`;
  };
  $('#md').onchange = () => { vis(); go(); }; $('#go').onclick = go; $('#rs').oninput = sys; vis(); go(); sys();
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  $$('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  document.documentElement.lang = lang;
  if (!location.hash) location.hash = '#/learn';
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
});
