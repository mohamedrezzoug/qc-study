'use strict';
/* docs.js – Eigene Dokumente: Import (PDF/PPTX/DOCX/TXT/Bild), lokale Analyse, KI-Analyse */
UI.docs = T(`Dokumente`, `Documents`, `Documents`);

const U2 = {
  title: T(`Meine Dokumente`, `My documents`, `Mes documents`),
  intro: T(`Skripte und Folien der Studentin hinzufügen – die App liest sie, analysiert sie und erklärt sie in DE / EN / FR.`, `Add the student's scripts and slides – the app reads, analyses and explains them in DE / EN / FR.`, `Ajoutez les cours et diapositives de l'étudiante – l'app les lit, les analyse et les explique en DE / EN / FR.`),
  add: T(`📎 Datei hinzufügen`, `📎 Add file`, `📎 Ajouter un fichier`),
  formats: T(`PDF, PowerPoint (.pptx), Word (.docx), Text/Markdown, Bilder (Fotos von Folien)`, `PDF, PowerPoint (.pptx), Word (.docx), text/Markdown, images (photos of slides)`, `PDF, PowerPoint (.pptx), Word (.docx), texte/Markdown, images (photos de diapositives)`),
  module: T(`Fach / Modul`, `Subject / module`, `Matière / module`),
  modulePh: T(`z. B. Statistische Qualitätskontrolle`, `e.g. Statistical quality control`, `ex. Contrôle statistique de la qualité`),
  none: T(`Noch keine Dokumente.`, `No documents yet.`, `Aucun document pour l'instant.`),
  reading: T(`Lese Datei…`, `Reading file…`, `Lecture du fichier…`),
  readErr: T(`Datei konnte nicht gelesen werden`, `Could not read the file`, `Impossible de lire le fichier`),
  oldFmt: T(`Altes Format (.ppt/.doc) wird nicht unterstützt – bitte als .pptx/.docx oder PDF speichern.`, `Old format (.ppt/.doc) is not supported – please save as .pptx/.docx or PDF.`, `Ancien format (.ppt/.doc) non pris en charge – enregistrez en .pptx/.docx ou PDF.`),
  slide: T(`Folie`, `Slide`, `Diapo`), page: T(`Seite`, `Page`, `Page`), sec: T(`Abschnitt`, `Section`, `Section`),
  slides: T(`Folien`, `slides`, `diapos`), pages: T(`Seiten`, `pages`, `pages`), secs: T(`Abschnitte`, `sections`, `sections`),
  chars: T(`Zeichen`, `characters`, `caractères`),
  ai: T(`KI‑Einstellungen`, `AI settings`, `Réglages IA`),
  aiOn: T(`KI aktiv`, `AI active`, `IA active`), aiOff: T(`KI nicht eingerichtet (lokale Analyse funktioniert trotzdem)`, `AI not set up (local analysis still works)`, `IA non configurée (l'analyse locale fonctionne quand même)`),
  provider: T(`Anbieter`, `Provider`, `Fournisseur`), apiKey: T(`API‑Schlüssel`, `API key`, `Clé API`), model: T(`Modell (leer = Standard)`, `Model (empty = default)`, `Modèle (vide = défaut)`),
  save: T(`Speichern`, `Save`, `Enregistrer`), test: T(`Verbindung testen`, `Test connection`, `Tester la connexion`), saved: T(`Gespeichert ✓`, `Saved ✓`, `Enregistré ✓`),
  keyHint: T(`Der Schlüssel bleibt nur auf diesem Gerät. Gemini bietet einen kostenlosen Schlüssel (aistudio.google.com/apikey). Beim Analysieren wird der Text des Dokuments an den gewählten Anbieter gesendet.`, `The key stays on this device only. Gemini offers a free key (aistudio.google.com/apikey). When analysing, the document text is sent to the chosen provider.`, `La clé reste uniquement sur cet appareil. Gemini propose une clé gratuite (aistudio.google.com/apikey). Lors de l'analyse, le texte du document est envoyé au fournisseur choisi.`),
  del: T(`Löschen`, `Delete`, `Supprimer`), delAsk: T(`Dokument wirklich löschen?`, `Really delete this document?`, `Supprimer vraiment ce document ?`),
  text: T(`Extrahierter Text`, `Extracted text`, `Texte extrait`),
  scanned: T(`Kaum Text gefunden – vermutlich ein Scan oder Bild.`, `Hardly any text found – probably a scan or image.`, `Presque aucun texte trouvé – probablement un scan ou une image.`),
  ocr: T(`📷 Text per KI erkennen (OCR)`, `📷 Recognise text with AI (OCR)`, `📷 Reconnaître le texte par IA (OCR)`),
  ocrNeed: T(`OCR braucht Gemini oder Claude (Bildverständnis).`, `OCR needs Gemini or Claude (image understanding).`, `L'OCR nécessite Gemini ou Claude (compréhension d'images).`),
  local: T(`Lokale Analyse (ohne Internet)`, `Local analysis (offline)`, `Analyse locale (hors ligne)`),
  keywords: T(`Schlüsselbegriffe`, `Key terms`, `Termes clés`), outline: T(`Gliederung`, `Outline`, `Plan`),
  formulas: T(`Formeln & Gleichungen`, `Formulas & equations`, `Formules et équations`), defs: T(`Definitionen gefunden`, `Definitions found`, `Définitions trouvées`),
  quizLocal: T(`Quiz aus dem Dokument (offline)`, `Quiz from the document (offline)`, `Quiz tiré du document (hors ligne)`),
  cards: T(`Lernkarten`, `Flashcards`, `Cartes mémoire`),
  aiTitle: T(`KI‑Analyse`, `AI analysis`, `Analyse IA`),
  outLang: T(`Sprache der Ausgabe`, `Output language`, `Langue de sortie`),
  overview: T(`📘 Gesamtüberblick & Lernzettel`, `📘 Overview & study guide`, `📘 Vue d'ensemble et fiche de révision`),
  explain: T(`🧑‍🏫 Im Detail erklären`, `🧑‍🏫 Explain in detail`, `🧑‍🏫 Expliquer en détail`),
  from: T(`von`, `from`, `de`), to: T(`bis`, `to`, `à`),
  genQ: T(`❓ Prüfungsfragen erzeugen`, `❓ Generate exam questions`, `❓ Générer des questions d'examen`),
  ask: T(`💬 Frage zum Dokument`, `💬 Ask about the document`, `💬 Question sur le document`),
  askPh: T(`z. B. Was bedeutet Folie 5? Wie berechne ich Cpk?`, `e.g. What does slide 5 mean? How do I compute Cpk?`, `ex. Que signifie la diapo 5 ? Comment calculer Cpk ?`),
  send: T(`Fragen`, `Ask`, `Demander`),
  needKey: T(`Bitte zuerst unter „Dokumente“ den KI‑Schlüssel eintragen.`, `Please enter the AI key first on the “Documents” page.`, `Saisissez d'abord la clé IA dans la page « Documents ».`),
  working: T(`Die KI arbeitet…`, `The AI is working…`, `L'IA travaille…`), part: T(`Teil`, `Part`, `Partie`),
  retry: T(`Zu viele Anfragen – neuer Versuch in`, `Too many requests – retrying in`, `Trop de requêtes – nouvel essai dans`),
  err: T(`Fehler`, `Error`, `Erreur`),
  bank: T(`Fragen im Pool`, `questions in pool`, `questions dans le pool`),
  play: T(`▶ Quiz starten`, `▶ Start quiz`, `▶ Lancer le quiz`), more: T(`＋ Weitere Fragen (KI)`, `＋ More questions (AI)`, `＋ Plus de questions (IA)`),
  again: T(`Nochmal`, `Again`, `Encore`), explanation: T(`Erklärung`, `Explanation`, `Explication`),
  copy: T(`Kopieren`, `Copy`, `Copier`), copied: T(`Kopiert ✓`, `Copied ✓`, `Copié ✓`),
  needFour: T(`Zu wenige Definitionen für ein Offline‑Quiz (mindestens 4).`, `Too few definitions for an offline quiz (at least 4).`, `Trop peu de définitions pour un quiz hors ligne (au moins 4).`),
  imgNote: T(`Hinweis: Bilder und Diagramme in Folien werden nicht gelesen – nur Text (außer im OCR‑Modus).`, `Note: images and diagrams inside slides are not read – text only (except in OCR mode).`, `Remarque : les images et schémas dans les diapositives ne sont pas lus – texte uniquement (sauf en mode OCR).`),
  maskedQ: T(`Welcher Begriff passt? (Seite`, `Which term fits? (page`, `Quel terme convient ? (page`),
  total: T(`Dokumente`, `documents`, `documents`),
  back: UI.back
};
const u = k => tr(U2[k]);
const LNAME = { de: 'German', en: 'English', fr: 'French' };
const PROV = {
  gemini: { name: 'Google Gemini', model: 'gemini-flash-latest', chunk: 60000, vision: true },
  groq: { name: 'Groq', model: 'llama-3.3-70b-versatile', chunk: 11000, vision: false },
  claude: { name: 'Anthropic Claude', model: 'claude-sonnet-5-5', chunk: 40000, vision: true }
};
const AIcfg = () => Object.assign({ provider: 'gemini', key: '', model: '' }, LS.get('qc_ai', {}));
const hasKey = () => !!AIcfg().key;

/* ---------- IndexedDB ---------- */
let _db = null;
function db() {
  if (_db) return _db;
  _db = new Promise((res, rej) => {
    const r = indexedDB.open('qc-docs', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('docs', { keyPath: 'id' });
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
  return _db;
}
const tx = async (mode, fn) => { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('docs', mode), s = t.objectStore('docs'), q = fn(s); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }); };
const dbAll = () => tx('readonly', s => s.getAll());
const dbGet = id => tx('readonly', s => s.get(id));
const dbPut = d => tx('readwrite', s => s.put(d));
const dbDel = id => tx('readwrite', s => s.delete(id));

/* ---------- Markdown (klein) ---------- */
function md(src) {
  const inl = t => t.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
  const lines = esc(src).split('\n'); let h = '', ul = false, ol = false, tb = [];
  const close = () => { if (ul) { h += '</ul>'; ul = false; } if (ol) { h += '</ol>'; ol = false; } };
  const flushT = () => {
    if (!tb.length) return; const rows = tb.filter(r => !/^\|[\s:|-]+\|$/.test(r.trim()));
    h += '<div class="tw"><table class="mt">' + rows.map((r, i) => '<tr>' + r.trim().replace(/^\||\|$/g, '').split('|').map(c => `<${i ? 'td' : 'th'}>${inl(c.trim())}</${i ? 'td' : 'th'}>`).join('') + '</tr>').join('') + '</table></div>'; tb = [];
  };
  for (const l of lines) {
    let m;
    if (/^\s*\|.*\|\s*$/.test(l)) { close(); tb.push(l); continue; } else flushT();
    if ((m = l.match(/^#{1,6}\s+(.*)/))) { close(); h += `<h4>${inl(m[1])}</h4>`; }
    else if ((m = l.match(/^\s*[-*•]\s+(.*)/))) { if (!ul) { close(); h += '<ul>'; ul = true; } h += `<li>${inl(m[1])}</li>`; }
    else if ((m = l.match(/^\s*\d+[.)]\s+(.*)/))) { if (!ol) { close(); h += '<ol>'; ol = true; } h += `<li>${inl(m[1])}</li>`; }
    else if (!l.trim()) close();
    else { close(); h += `<p>${inl(l)}</p>`; }
  }
  flushT(); close(); return h;
}

/* ---------- KI-Aufruf ---------- */
async function askAI(o) {
  const c = AIcfg(); if (!c.key) throw new Error('NOKEY');
  const P = PROV[c.provider], model = c.model || P.model, imgs = o.images || [];
  for (let attempt = 0; attempt < 4; attempt++) {
    let res;
    if (c.provider === 'gemini') {
      const parts = [{ text: o.user }].concat(imgs.map(d => ({ inlineData: { mimeType: 'image/jpeg', data: d.split(',')[1] } })));
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': c.key },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: o.system }] }, contents: [{ role: 'user', parts }], generationConfig: Object.assign({ temperature: 0.3 }, o.json ? { responseMimeType: 'application/json' } : {}) })
      });
    } else if (c.provider === 'groq') {
      res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + c.key },
        body: JSON.stringify(Object.assign({ model, temperature: 0.3, messages: [{ role: 'system', content: o.system }, { role: 'user', content: o.user }] }, o.json ? { response_format: { type: 'json_object' } } : {}))
      });
    } else {
      const content = imgs.map(d => ({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: d.split(',')[1] } })).concat([{ type: 'text', text: o.user }]);
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': c.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model, max_tokens: 8000, temperature: 0.3, system: o.system, messages: [{ role: 'user', content }] })
      });
    }
    if (res.status === 429 || res.status === 503) {
      const wait = 10 * (attempt + 1); for (let s = wait; s > 0; s--) { if (o.onStatus) o.onStatus(`${u('retry')} ${s}s`); await new Promise(r => setTimeout(r, 1000)); } continue;
    }
    if (!res.ok) { const t = await res.text().catch(() => ''); throw new Error(res.status + ': ' + t.slice(0, 300)); }
    const d = await res.json();
    if (c.provider === 'gemini') return ((d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts) || []).map(p => p.text || '').join('');
    if (c.provider === 'groq') return d.choices[0].message.content;
    return d.content.map(x => x.text || '').join('');
  }
  throw new Error('429: rate limit');
}
const SYS = L => `You are a precise, patient tutor for a Master's student in quality and reliability engineering (quality control, SPC, MSA, FMEA, reliability, statistics). Answer in ${LNAME[L]}. Base your answers on the provided document text; do not invent content that is not supported by it. If something in the document looks wrong, ambiguous or incomplete, say so explicitly. Keep technical terms and give their German / English / French equivalents at first mention. Compute numbers carefully and double-check them.`;
function parseJSON(t) {
  t = t.replace(/^```(?:json)?/i, '').replace(/```\s*$/, '').trim();
  try { return JSON.parse(t); } catch (e) { }
  const a = t.indexOf('{'), b = t.lastIndexOf('}'); if (a >= 0 && b > a) return JSON.parse(t.slice(a, b + 1));
  throw new Error('JSON');
}

/* ---------- Dateien lesen ---------- */
function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('lib ' + src)); document.head.appendChild(s); }); }
async function lib(n) {
  if (n === 'pdf' && !window.pdfjsLib) { await loadScript('lib/pdf.min.js'); pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdf.worker.min.js'; }
  if (n === 'zip' && !window.JSZip) await loadScript('lib/jszip.min.js');
}
function chunkText(t, size = 2500) {
  const paras = t.split(/\n\s*\n|\r\n\s*\r\n/).map(p => p.trim()).filter(Boolean), out = []; let cur = '';
  for (const p of paras) { if (cur && (cur.length + p.length) > size) { out.push(cur); cur = ''; } cur += (cur ? '\n\n' : '') + p; }
  if (cur) out.push(cur); return out.map((text, i) => ({ n: i + 1, text }));
}
function xmlParas(xml, pTag, tTag) {
  const d = new DOMParser().parseFromString(xml, 'application/xml'), out = [];
  for (const p of d.getElementsByTagName(pTag)) {
    const s = [...p.getElementsByTagName(tTag)].map(t => t.textContent).join(''); if (s.trim()) out.push(s.trim());
  }
  return out;
}
async function parsePdf(file, prog) {
  await lib('pdf'); const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise, pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const pg = await pdf.getPage(i), tc = await pg.getTextContent(); let out = '', lastY = null;
    for (const it of tc.items) {
      if (!it.str) continue; const y = it.transform[5];
      if (lastY !== null && Math.abs(y - lastY) > 2) out += '\n'; else if (out && !/[ \n]$/.test(out)) out += ' ';
      out += it.str; lastY = y;
    }
    pages.push({ n: i, text: out.replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n').trim() }); prog && prog(i, pdf.numPages);
  }
  return { pages, unit: 'page' };
}
async function parsePptx(file, prog) {
  await lib('zip'); const z = await JSZip.loadAsync(file), nn = s => +s.match(/(\d+)\.xml$/)[1];
  const names = Object.keys(z.files).filter(n => /^ppt\/slides\/slide\d+\.xml$/.test(n)).sort((a, b) => nn(a) - nn(b)), pages = [];
  for (let i = 0; i < names.length; i++) {
    const paras = xmlParas(await z.file(names[i]).async('string'), 'a:p', 'a:t'), nf = z.file(`ppt/notesSlides/notesSlide${nn(names[i])}.xml`);
    let txt = paras.join('\n');
    if (nf) { const notes = xmlParas(await nf.async('string'), 'a:p', 'a:t').filter(s => !/^\d+$/.test(s)); if (notes.length) txt += '\n[Notes] ' + notes.join(' '); }
    pages.push({ n: i + 1, text: txt }); prog && prog(i + 1, names.length);
  }
  return { pages, unit: 'slide' };
}
async function parseDocx(file) {
  await lib('zip'); const z = await JSZip.loadAsync(file), f = z.file('word/document.xml'); if (!f) throw new Error('docx');
  const xml = (await f.async('string')).replace(/<w:tab\/>/g, '<w:t> </w:t>'), paras = xmlParas(xml, 'w:p', 'w:t');
  return { pages: chunkText(paras.join('\n\n')), unit: 'sec' };
}
function readDataURL(f) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(f); }); }
async function shrinkImage(file, max = 1600) {
  const url = await readDataURL(file), img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
  const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); return c.toDataURL('image/jpeg', 0.8);
}
async function importFile(file, module, status) {
  const ext = (file.name.split('.').pop() || '').toLowerCase(), prog = (i, n) => status(`${u('reading')} ${file.name} (${i}/${n})`);
  if (['ppt', 'doc'].includes(ext)) throw new Error(u('oldFmt'));
  let r, images = null, blob = null;
  if (ext === 'pdf') { r = await parsePdf(file, prog); blob = file; }
  else if (ext === 'pptx') r = await parsePptx(file, prog);
  else if (ext === 'docx') r = await parseDocx(file);
  else if (['txt', 'md', 'csv', 'text'].includes(ext) || file.type.startsWith('text/')) r = { pages: chunkText(await file.text()), unit: 'sec' };
  else if (file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) { images = [await shrinkImage(file)]; r = { pages: [{ n: 1, text: '' }], unit: 'page' }; }
  else throw new Error(u('readErr'));
  const chars = r.pages.reduce((s, p) => s + p.text.length, 0);
  return { id: 'd' + Date.now() + Math.random().toString(36).slice(2, 6), module: module || '—', name: file.name, ext, unit: r.unit, pages: r.pages, chars, scanned: chars < 40 * r.pages.length, images, blob, added: Date.now(), overview: {}, bank: [] };
}

/* ---------- OCR per KI ---------- */
async function pdfPageImages(blob, nums) {
  await lib('pdf'); const pdf = await pdfjsLib.getDocument({ data: await blob.arrayBuffer() }).promise, out = [];
  for (const n of nums) {
    const pg = await pdf.getPage(n), v1 = pg.getViewport({ scale: 1 }), sc = Math.min(2, 1400 / v1.width), vp = pg.getViewport({ scale: sc }), c = document.createElement('canvas');
    c.width = vp.width; c.height = vp.height; await pg.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise; out.push(c.toDataURL('image/jpeg', 0.72));
  }
  return out;
}
async function ocrDoc(doc, status) {
  const c = AIcfg(); if (!PROV[c.provider].vision) throw new Error(u('ocrNeed'));
  const total = doc.images ? doc.images.length : doc.pages.length, B = 3;
  for (let s = 0; s < total; s += B) {
    const nums = []; for (let i = s; i < Math.min(total, s + B); i++) nums.push(i + 1);
    status(`OCR ${Math.min(total, s + B)}/${total}`);
    const imgs = doc.images ? nums.map(n => doc.images[n - 1]) : await pdfPageImages(doc.blob, nums);
    const t = await askAI({ system: 'You transcribe slides and pages faithfully.', onStatus: status, images: imgs,
      user: `Transcribe ALL text of the following ${nums.length} image(s) exactly (keep the original language; formulas in plain text). Describe diagrams or charts briefly in [square brackets]. Put a marker line before each image's text, on its own line, in the form "=== N ===" where N is the number of the image in this list: ${nums.join(', ')} (in this order).` });
    const parts = t.split(/^=== (\d+) ===\s*$/m);
    for (let i = 1; i < parts.length; i += 2) { const n = +parts[i], pg = doc.pages[n - 1]; if (pg) pg.text = (parts[i + 1] || '').trim(); }
    doc.chars = doc.pages.reduce((x, p) => x + p.text.length, 0); doc.scanned = doc.chars < 40 * doc.pages.length; await dbPut(doc);
  }
}

/* ---------- Lokale Analyse ---------- */
const SW = {
  de: 'der die das und ist von zu den mit sich des auf für nicht ein eine einer eines einem einen im in dem als auch es an werden aus er hat dass sie nach wird bei um am sind noch wie über so zum zur oder aber vor bis mehr durch man dann soll sein wurde kann können wenn nur diese dieser diesen wir ihre ihr ihrer wird dabei hier jeweils sowie können müssen muss ab zwischen beim'.split(' '),
  en: 'the of and to in is that for it as with was on be by this are at from or an which not but have has were can will more these also their its into than other such may used use using each between when where then there been being if'.split(' '),
  fr: 'le la les de des du un une et en est que qui dans pour par sur au aux avec ce cet cette ces se sont ne pas plus ou comme mais être a été son sa ses leur leurs il elle on nous vous ils elles peut ainsi entre aussi chaque lorsque donc très'.split(' ')
};
const STOP = new Set([].concat(SW.de, SW.en, SW.fr));
function detectLang(text) {
  const w = (text.toLowerCase().match(/[\p{L}]+/gu) || []).slice(0, 4000); let best = lang, bn = -1;
  for (const k of ['de', 'en', 'fr']) { const s = new Set(SW[k]); const n = w.filter(x => s.has(x)).length; if (n > bn) { bn = n; best = k; } }
  return best;
}
function analyseLocal(doc) {
  const tf = {}, df = {};
  doc.pages.forEach(p => { const seen = new Set(); (p.text.toLowerCase().match(/[\p{L}][\p{L}\-]{3,}/gu) || []).forEach(w => { if (STOP.has(w)) return; tf[w] = (tf[w] || 0) + 1; if (!seen.has(w)) { seen.add(w); df[w] = (df[w] || 0) + 1; } }); });
  const N = doc.pages.length, ranked = Object.keys(tf).map(w => ({ w, tf: tf[w], s: tf[w] * Math.log(1.5 + N / df[w]) })).sort((a, b) => b.s - a.s);
  let keywords = ranked.filter(x => x.tf > 1); if (keywords.length < 12) keywords = keywords.concat(ranked.filter(x => x.tf <= 1)); keywords = keywords.slice(0, 30).map(x => x.w);
  const outline = doc.pages.map(p => ({ n: p.n, t: (p.text.split('\n').find(l => l.trim().length > 2) || '').slice(0, 90) })).filter(o => o.t);
  const DEF = /^\s*([^,:;.()\n]{3,50}?)\s+(ist|sind|bezeichnet|beschreibt|versteht man|wird definiert als|is|are|is defined as|refers to|describes|means|est|sont|désigne|correspond à|se définit comme)\s+(.{12,})$/i;
  const defs = [], forms = [], seenF = new Set();
  doc.pages.forEach(p => {
    p.text.split(/(?<=[.!?])\s+|\n+/).forEach(s => {
      s = s.trim(); if (s.length < 25 || s.length > 260) return; const m = s.match(DEF);
      if (m && m[1].split(/\s+/).length <= 5 && !/^(es|it|ce|dies|this|das|die|der|sie|er)$/i.test(m[1].trim()) && !/^\d/.test(m[1])) defs.push({ term: m[1].trim().replace(/^(der|die|das|ein|eine|einer|eines|the|a|an|le|la|les|l'|un|une|des|du)\s+/i, ''), verb: m[2], rest: m[3].replace(/[.]$/, ''), page: p.n });
    });
    p.text.split('\n').forEach(l => { l = l.trim(); if (l.length >= 5 && l.length <= 90 && /=/.test(l) && /[\p{L}]/u.test(l) && l.split(/\s+/).length <= 14 && !seenF.has(l)) { seenF.add(l); forms.push({ f: l, page: p.n }); } });
  });
  return { keywords, outline, defs: defs.slice(0, 60), forms: forms.slice(0, 40) };
}
function localBank(a, doc) {
  if (a.defs.length < 4) return [];
  const terms = [...new Set(a.defs.map(d => d.term))];
  return a.defs.map(d => {
    const pool = shuffle(terms.filter(t => t.toLowerCase() !== d.term.toLowerCase())).slice(0, 3); if (pool.length < 3) return null;
    return { q: `____ ${d.verb} ${d.rest}`, o: shuffle([d.term].concat(pool)), ok: null, answer: d.term, ex: `${d.term} ${d.verb} ${d.rest}`, p: d.page };
  }).filter(Boolean).map(q => { q.ok = q.o.indexOf(q.answer); return q; });
}

/* ---------- KI-Aufgaben ---------- */
function unitName(doc, plural) { return u(plural ? { page: 'pages', slide: 'slides', sec: 'secs' }[doc.unit] : doc.unit); }
function makeChunks(doc, from, to, max) {
  const out = []; let cur = { from: null, to: null, text: '' };
  for (const p of doc.pages) {
    if (p.n < from || p.n > to || !p.text) continue;
    const block = `[${u(doc.unit)} ${p.n}]\n${p.text.slice(0, max)}\n\n`;
    if (cur.text && cur.text.length + block.length > max) { out.push(cur); cur = { from: null, to: null, text: '' }; }
    if (cur.from === null) cur.from = p.n; cur.to = p.n; cur.text += block;
  }
  if (cur.text) out.push(cur); return out;
}
async function aiOverview(doc, L, status) {
  const max = PROV[AIcfg().provider].chunk, ch = makeChunks(doc, 1, doc.pages.length, max), sys = SYS(L);
  let notes = [];
  if (ch.length === 1) notes = [ch[0].text];
  else for (let i = 0; i < ch.length; i++) {
    status(`${u('part')} ${i + 1}/${ch.length}`);
    notes.push(`(${u(doc.unit)} ${ch[i].from}–${ch[i].to})\n` + await askAI({ system: sys, onStatus: status, user: `Extract compact study notes (max 450 words) from this excerpt: topics, definitions, formulas (with symbols), examples, and ${unitName(doc)} numbers.\n\n${ch[i].text}` }));
  }
  let joined = notes.join('\n\n'); const lim = max * 0.9;
  while (joined.length > lim) { status('…'); joined = (await askAI({ system: sys, onStatus: status, user: `Condense these notes to about ${Math.round(lim / 12)} words, keeping all definitions, formulas and ${unitName(doc)} references.\n\n${joined}` })); }
  status(u('working'));
  return askAI({ system: sys, onStatus: status, user: `Create a complete study guide in Markdown in ${LNAME[L]} from the following ${ch.length === 1 ? 'document' : 'notes of a document'} (${doc.name}). Use exactly these sections:\n## Summary\n## Structure (with ${unitName(doc)} numbers)\n## Key concepts (each: **term** (DE / EN / FR) + a clear 1–3 sentence explanation)\n## Formulas (every symbol explained, units, when to use)\n## Worked example (with numbers, computed carefully)\n## What to memorise for the exam\n## Possible exam questions (6, with short answers)\n## Unclear or possibly wrong points in the document\n\n${joined}` });
}
async function aiExplain(doc, from, to, L, status, out) {
  const max = PROV[AIcfg().provider].chunk * 0.7, ch = makeChunks(doc, from, to, max); let html = '';
  for (let i = 0; i < ch.length; i++) {
    status(`${u('part')} ${i + 1}/${ch.length}`);
    const t = await askAI({ system: SYS(L), onStatus: status, user: `Explain the following ${unitName(doc, 1)} in detail, like a patient tutor, in ${LNAME[L]}. For each ${unitName(doc)}: say in simple words what it states, why it matters, the logic behind any formula (intuition, not just the formula), and a small numeric example where helpful. If the text of a ${unitName(doc)} is only a title or seems incomplete (probably an image/diagram), say so instead of guessing. Use Markdown with a heading per ${unitName(doc)}.\n\n${ch[i].text}` });
    html += (ch.length > 1 ? `\n## ${u(doc.unit)} ${ch[i].from}–${ch[i].to}\n` : '') + t + '\n\n'; out(html);
  }
}
async function aiQuestions(doc, from, to, L, status, n = 8) {
  const max = PROV[AIcfg().provider].chunk * 0.8, ch = makeChunks(doc, from, to, max); if (!ch.length) throw new Error('empty');
  const c = ch[Math.floor(Math.random() * ch.length)], existing = doc.bank.slice(-60).map(q => q.q.slice(0, 70)).join(' | ');
  const t = await askAI({ system: SYS(L), json: true, onStatus: status, user: `From the document excerpt below, write ${n} multiple-choice exam questions in ${LNAME[L]} for a Master's course. Mix recall, understanding, and calculation/application questions. Exactly 4 options each, exactly one correct, plausible distractors. Verify every calculation. Add a short explanation and the ${unitName(doc)} number (p). Do NOT repeat questions similar to these: ${existing || '(none)'}.\nReturn ONLY JSON: {"questions":[{"q":"...","o":["...","...","...","..."],"ok":0,"ex":"...","p":1}]}\n\n${c.text}` });
  const arr = (parseJSON(t).questions || []).filter(q => q && q.q && Array.isArray(q.o) && q.o.length === 4 && Number.isInteger(q.ok) && q.ok >= 0 && q.ok < 4);
  return arr.map(q => { const correct = q.o[q.ok], o = shuffle(q.o.map(String)); return { q: String(q.q), o, ok: o.indexOf(String(correct)), ex: String(q.ex || ''), p: q.p }; });
}
async function aiAsk(doc, question, L, status) {
  const max = PROV[AIcfg().provider].chunk * 0.6, qw = (question.toLowerCase().match(/[\p{L}\d][\p{L}\d\-]{2,}/gu) || []).filter(w => !STOP.has(w)), nums = (question.match(/\d+/g) || []).map(Number);
  const scored = doc.pages.map(p => { const lc = p.text.toLowerCase(); let s = 0; qw.forEach(w => { const m = lc.split(w).length - 1; s += Math.min(m, 5); }); if (nums.includes(p.n)) s += 50; return { p, s }; }).filter(x => x.p.text).sort((a, b) => b.s - a.s);
  const pick = []; let len = 0; for (const x of scored) { const t = x.p.text.slice(0, 4000); if (len + t.length > max && pick.length) break; pick.push({ n: x.p.n, t }); len += t.length; }
  const ctx = pick.sort((a, b) => a.n - b.n).map(x => `[${u(doc.unit)} ${x.n}]\n${x.t}`).join('\n\n');
  return askAI({ system: SYS(L), onStatus: status, user: `Question: ${question}\n\nAnswer in ${LNAME[L]} using the excerpts below. Cite ${unitName(doc)} numbers. If the answer is not in the excerpts, say so clearly, then give a short general-knowledge answer marked as such.\n\n${ctx}` });
}

/* ---------- Quiz-Spieler für Dokumentfragen ---------- */
function bankPlayer(el, doc, getBank, more) {
  let st = { order: shuffle(getBank().map((_, i) => i)), pos: 0, score: 0, ans: null, opts: null };
  const draw = () => {
    const bank = getBank();
    if (st.pos >= st.order.length) {
      el.innerHTML = `<div class="card center"><h2>🎉 ${st.score} / ${st.order.length}</h2><div class="row" style="justify-content:center"><button class="btn" id="bpa">${u('again')}</button>${more ? `<button class="btn ghost" id="bpm">${u('more')}</button>` : ''}</div><div id="bps" class="foot"></div></div>`;
      $('#bpa', el).onclick = () => { st = { order: shuffle(bank.map((_, i) => i)), pos: 0, score: 0, ans: null }; draw(); };
      if (more) $('#bpm', el).onclick = async () => { try { await more(m => $('#bps', el).textContent = m); } catch (e) { $('#bps', el).textContent = u('err') + ': ' + e.message; return; } st = { order: shuffle(getBank().map((_, i) => i)), pos: 0, score: 0, ans: null }; draw(); };
      return;
    }
    const q = bank[st.order[st.pos]];
    el.innerHTML = `<div class="row between qh"><span>${tr(UI.question)} ${st.pos + 1}/${st.order.length}</span><span>${tr(UI.score)}: ${st.score}</span></div><div class="card"><h3>${esc(q.q)}</h3><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('')}</div><div id="fb"></div></div>`;
    const reveal = () => {
      $$('.opt', el).forEach(b => { b.disabled = true; const i = +b.dataset.i; if (i === q.ok) b.classList.add('ok'); else if (i === st.ans) b.classList.add('no'); });
      const good = st.ans === q.ok;
      $('#fb', el).innerHTML = `<p class="${good ? 'good' : 'bad'}"><b>${good ? tr(UI.correct) : tr(UI.wrong)}</b></p>` + (q.ex ? `<p><b>${u('explanation')}:</b> ${esc(q.ex)}${q.p ? ` (${u(doc.unit)} ${esc(q.p)})` : ''}</p>` : '') + `<button class="btn" id="nx">${tr(UI.next)}</button>`;
      $('#nx', el).onclick = () => { st.pos++; st.ans = null; draw(); };
    };
    $$('.opt', el).forEach(b => b.onclick = () => { if (st.ans !== null) return; st.ans = +b.dataset.i; if (st.ans === q.ok) st.score++; reveal(); });
  };
  draw();
}

/* ---------- Ansichten ---------- */
const dtype = d => `${d.pages.length} ${unitName(d, 1)} · ${nf(d.chars, 0)} ${u('chars')}`;
async function vDocs(m) {
  m.innerHTML = `<h2>📎 ${u('title')}</h2><p class="foot" style="text-align:left">${u('intro')}</p>
  <div class="card"><label>${u('module')}<input id="mod" list="mods" placeholder="${esc(u('modulePh'))}" value="${esc(LS.get('qc_lastmod', ''))}"><datalist id="mods"></datalist></label>
    <input type="file" id="fi" multiple hidden accept=".pdf,.pptx,.docx,.txt,.md,.csv,image/*">
    <div class="row"><button class="btn" id="addb">${u('add')}</button></div><small>${u('formats')}</small><div id="st" class="foot"></div></div>
  <div id="dl"></div><details class="card" id="aid"><summary><b>⚙️ ${u('ai')}</b> – <span id="aist"></span></summary>
    <label>${u('provider')}<select id="pv">${Object.keys(PROV).map(k => `<option value="${k}">${PROV[k].name}</option>`).join('')}</select></label>
    <label>${u('apiKey')}<input id="ky" type="password" autocomplete="off"></label><label>${u('model')}<input id="mo"></label>
    <div class="row"><button class="btn" id="sv">${u('save')}</button><button class="btn ghost" id="ts">${u('test')}</button></div><div id="tr" class="foot"></div><small>${u('keyHint')}</small></details>`;
  const c = AIcfg(); $('#pv').value = c.provider; $('#ky').value = c.key; $('#mo').value = c.model; $('#mo').placeholder = PROV[c.provider].model;
  const stat = () => { $('#aist').textContent = hasKey() ? u('aiOn') : u('aiOff'); }; stat();
  if (!hasKey()) $('#aid').open = false;
  $('#pv').onchange = () => { $('#mo').placeholder = PROV[$('#pv').value].model; };
  $('#sv').onclick = () => { LS.set('qc_ai', { provider: $('#pv').value, key: $('#ky').value.trim(), model: $('#mo').value.trim() }); stat(); $('#tr').textContent = u('saved'); };
  $('#ts').onclick = async () => { $('#sv').click(); $('#tr').textContent = '…'; try { const r = await askAI({ system: 'Reply with the single word OK.', user: 'ping' }); $('#tr').textContent = '✓ ' + r.slice(0, 40); } catch (e) { $('#tr').textContent = u('err') + ': ' + e.message; } };
  const list = async () => {
    let docs = []; try { docs = await dbAll(); } catch (e) { }
    $('#mods').innerHTML = [...new Set(docs.map(d => d.module))].map(x => `<option value="${esc(x)}">`).join('');
    const by = {}; docs.sort((a, b) => b.added - a.added).forEach(d => (by[d.module] = by[d.module] || []).push(d));
    $('#dl').innerHTML = docs.length ? Object.keys(by).map(k => `<h3 class="sub">${esc(k)}</h3>` + by[k].map(d => `<a class="card lesson" href="#/doc/${d.id}"><span class="ic">${{ pdf: '📕', pptx: '📊', docx: '📘' }[d.ext] || '📄'}</span><span class="tt"><b>${esc(d.name)}</b><small>${dtype(d)}${d.scanned ? ' · ⚠️' : ''}</small></span><span class="chk">›</span></a>`).join('')).join('') : `<p class="foot">${u('none')}</p>`;
  };
  await list();
  $('#addb').onclick = () => $('#fi').click();
  $('#fi').onchange = async e => {
    const files = [...e.target.files], mod = $('#mod').value.trim(); LS.set('qc_lastmod', mod); const s = $('#st');
    for (const f of files) {
      try { const d = await importFile(f, mod, t => s.textContent = t); await dbPut(d); s.textContent = '✓ ' + f.name; }
      catch (err) { s.textContent = `${u('readErr')}: ${f.name} – ${err.message}`; }
    }
    e.target.value = ''; await list();
  };
}

async function vDoc(m, id) {
  m.innerHTML = `<p class="foot">…</p>`; let doc; try { doc = await dbGet(id); } catch (e) { }
  if (!doc) { location.hash = '#/docs'; return; }
  let L = LS.get('qc_olang', null) || lang; const loc = analyseLocal(doc), save = () => dbPut(doc);
  const rng = () => `<div class="grid2"><label>${u('from')}<input id="rf" inputmode="numeric" value="1"></label><label>${u('to')}<input id="rt" inputmode="numeric" value="${doc.pages.length}"></label></div>`;
  m.innerHTML = `<a class="back" href="#/docs">${tr(UI.back)}</a><h2>${esc(doc.name)}</h2>
  <div class="card"><small>${esc(doc.module)} · ${dtype(doc)}</small>${doc.ext === 'pptx' ? `<p><small>${u('imgNote')}</small></p>` : ''}
    ${doc.scanned ? `<p class="warn"><b>⚠️ ${u('scanned')}</b></p><button class="btn" id="ocr">${u('ocr')}</button><div id="ocs" class="foot"></div>` : ''}
    <div class="row"><button class="btn ghost sm" id="dd">${u('del')}</button></div></div>
  <div class="card"><h3>🧮 ${u('local')}</h3>
    ${loc.keywords.length ? `<h4>${u('keywords')}</h4><div class="chips">${loc.keywords.map(k => `<span>${esc(k)}</span>`).join('')}</div>` : ''}
    ${loc.outline.length ? `<details><summary><b>${u('outline')}</b> (${loc.outline.length})</summary><ol class="ol0">${loc.outline.map(o => `<li><small>${o.n}.</small> ${esc(o.t)}</li>`).join('')}</ol></details>` : ''}
    ${loc.forms.length ? `<details><summary><b>${u('formulas')}</b> (${loc.forms.length})</summary>${loc.forms.map(f => `<div class="formula">${esc(f.f)}</div><small>${u(doc.unit)} ${f.page}</small>`).join('')}</details>` : ''}
    <p><b>${loc.defs.length}</b> ${u('defs')}</p><div class="row"><button class="btn ghost sm" id="lq">${u('quizLocal')}</button><button class="btn ghost sm" id="lc">${u('cards')}</button></div><div id="lout"></div></div>
  <div class="card"><h3>🤖 ${u('aiTitle')}</h3>${hasKey() ? '' : `<p class="warn">${u('needKey')} <a href="#/docs">→</a></p>`}
    <label>${u('outLang')}<select id="ol"><option value="de">Deutsch</option><option value="en">English</option><option value="fr">Français</option></select></label>
    <div class="row"><button class="btn" id="bo">${u('overview')}</button></div>${rng()}
    <div class="row"><button class="btn" id="be">${u('explain')}</button><button class="btn" id="bq">${u('genQ')}</button></div>
    <label>${u('ask')}</label><div class="row"><input id="qi" placeholder="${esc(u('askPh'))}"><button class="btn" id="qb">${u('send')}</button></div>
    <div id="ast" class="foot"></div><div id="aout" class="md"></div><div id="acp"></div></div>
  <div class="card"><h3>❓ ${tr(UI.quiz)}</h3><p><b id="bn">${doc.bank.length}</b> ${u('bank')}</p><div class="row"><button class="btn" id="pl">${u('play')}</button></div><div id="qp"></div></div>
  <details class="card"><summary><b>${u('text')}</b></summary>${doc.pages.map(p => `<p><b>${u(doc.unit)} ${p.n}</b><br><span class="pre">${esc(p.text) || '–'}</span></p>`).join('')}</details>`;
  $('#ol').value = L; $('#ol').onchange = e => { L = e.target.value; LS.set('qc_olang', L); };
  const st = t => $('#ast').textContent = t, range = () => { const f = Math.max(1, +$('#rf').value || 1), t = Math.min(doc.pages.length, +$('#rt').value || doc.pages.length); return [f, Math.max(f, t)]; };
  const guard = async fn => { if (!hasKey()) { st(u('needKey')); return; } $$('.btn', m).forEach(b => b.disabled = true); st(u('working')); try { await fn(); st(''); } catch (e) { st(`${u('err')}: ${e.message}`); } $$('.btn', m).forEach(b => b.disabled = false); };
  const show = text => { $('#aout').innerHTML = md(text); $('#acp').innerHTML = `<button class="btn ghost sm" id="cp">${u('copy')}</button>`; $('#cp').onclick = () => { navigator.clipboard && navigator.clipboard.writeText(text); $('#cp').textContent = u('copied'); }; };
  $('#dd').onclick = async () => { if (confirm(u('delAsk'))) { await dbDel(doc.id); location.hash = '#/docs'; } };
  if (doc.scanned) $('#ocr').onclick = () => guard(async () => { await ocrDoc(doc, t => $('#ocs').textContent = t); await vDoc(m, id); });
  if (doc.overview[L]) show(doc.overview[L]);
  $('#bo').onclick = () => guard(async () => { if (doc.overview[L]) { show(doc.overview[L]); return; } const t = await aiOverview(doc, L, st); doc.overview[L] = t; await save(); show(t); });
  $('#be').onclick = () => guard(async () => { const [f, t] = range(); await aiExplain(doc, f, t, L, st, show); });
  $('#bq').onclick = () => guard(async () => { const [f, t] = range(); const qs = await aiQuestions(doc, f, t, L, st); doc.bank = doc.bank.concat(qs); await save(); $('#bn').textContent = doc.bank.length; $('#qp').innerHTML = ''; bankPlayer($('#qp'), doc, () => doc.bank, moreAI); });
  const ask = () => { const q = $('#qi').value.trim(); if (q) guard(async () => show(`**${esc(q)}**\n\n` + await aiAsk(doc, q, L, st))); };
  $('#qb').onclick = ask; $('#qi').onkeydown = e => { if (e.key === 'Enter') ask(); };
  const moreAI = async status => { if (!hasKey()) throw new Error(u('needKey')); const [f, t] = range(); const qs = await aiQuestions(doc, f, t, L, status); doc.bank = doc.bank.concat(qs); await save(); $('#bn').textContent = doc.bank.length; };
  $('#pl').onclick = () => { if (!doc.bank.length) { $('#qp').innerHTML = `<p class="foot">${u('genQ')} / ${u('quizLocal')}</p>`; return; } bankPlayer($('#qp'), doc, () => doc.bank, moreAI); };
  $('#lq').onclick = () => { const b = localBank(loc, doc); if (!b.length) { $('#lout').innerHTML = `<p class="warn">${u('needFour')}</p>`; return; } $('#lout').innerHTML = '<div id="lp"></div>'; bankPlayer($('#lp'), doc, () => b, null); };
  $('#lc').onclick = () => {
    if (!loc.defs.length) { $('#lout').innerHTML = `<p class="warn">${u('needFour')}</p>`; return; } let i = 0, flip = false;
    const d = () => { const x = loc.defs[i % loc.defs.length]; $('#lout').innerHTML = `<div class="card flash" id="fc"><small>${tr(UI.tapFlip)}</small>${flip ? `<div class="fl">${esc(x.term)} <i>${esc(x.verb)}</i> ${esc(x.rest)}<br><small>${u(doc.unit)} ${x.page}</small></div>` : `<div class="big">${esc(x.term)}</div>`}</div><button class="btn" id="fn">${tr(UI.nextCard)}</button>`; $('#fc').onclick = () => { flip = !flip; d(); }; $('#fn').onclick = () => { i = Math.floor(Math.random() * loc.defs.length); flip = false; d(); }; };
    d();
  };
}
