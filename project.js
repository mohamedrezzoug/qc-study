'use strict';
/* project.js – Qualitätsstudie für ein eigenes Projekt (z. B. Hotel): KI-Studie in Abschnitten + Analyse echter Daten */
UI.projects = T(`Projekt`, `Project`, `Projet`);

const U3 = {
  title: T(`Qualitätsstudie für ein Projekt`, `Quality study for a project`, `Étude qualité d'un projet`),
  intro: T(`Beschreiben Sie ein Projekt (z. B. ein Hotel) – die App erstellt daraus eine komplette Qualitätskontroll‑Studie: Anforderungen, kritische Merkmale, Prozess, Prüfplan, SPC, FMEA, Audit und Maßnahmenplan.`, `Describe a project (e.g. a hotel) – the app builds a complete quality-control study: requirements, critical characteristics, process, inspection plan, SPC, FMEA, audit and action plan.`, `Décrivez un projet (ex. un hôtel) – l'app construit une étude complète de contrôle qualité : exigences, caractéristiques critiques, processus, plan de contrôle, MSP, AMDEC, audit et plan d'actions.`),
  newP: T(`＋ Neues Projekt`, `＋ New project`, `＋ Nouveau projet`),
  name: T(`Projektname`, `Project name`, `Nom du projet`), namePh: T(`z. B. Hotel Atlas (3 Sterne)`, `e.g. Hotel Atlas (3 stars)`, `ex. Hôtel Atlas (3 étoiles)`),
  sector: T(`Branche`, `Sector`, `Secteur`),
  desc: T(`Beschreibung: Größe, Leistungen, bekannte Probleme, Beschwerden, Ziele`, `Description: size, services, known problems, complaints, goals`, `Description : taille, services, problèmes connus, réclamations, objectifs`),
  docs: T(`Dokumente als Grundlage (optional)`, `Documents as a basis (optional)`, `Documents de référence (facultatif)`),
  lang: T(`Sprache der Studie`, `Study language`, `Langue de l'étude`),
  example: T(`Beispiel: Hotel`, `Example: hotel`, `Exemple : hôtel`),
  create: T(`Projekt anlegen`, `Create project`, `Créer le projet`),
  none: T(`Noch keine Projekte.`, `No projects yet.`, `Aucun projet pour l'instant.`),
  genAll: T(`▶ Gesamte Studie erstellen`, `▶ Generate the full study`, `▶ Générer l'étude complète`),
  gen: T(`Erstellen`, `Generate`, `Générer`), regen: T(`Neu erstellen`, `Regenerate`, `Régénérer`),
  exportMd: T(`📤 Markdown`, `📤 Markdown`, `📤 Markdown`), print: T(`🖨 Drucken / PDF`, `🖨 Print / PDF`, `🖨 Imprimer / PDF`),
  del: T(`Projekt löschen`, `Delete project`, `Supprimer le projet`), delAsk: T(`Projekt wirklich löschen?`, `Really delete this project?`, `Supprimer vraiment ce projet ?`),
  needKey: T(`Für die Studie wird ein KI‑Schlüssel benötigt (Seite „Dokumente“ → KI‑Einstellungen).`, `The study needs an AI key (“Documents” page → AI settings).`, `L'étude nécessite une clé IA (page « Documents » → Réglages IA).`),
  working: T(`Erstelle`, `Generating`, `Génération`), done: T(`Fertig ✓`, `Done ✓`, `Terminé ✓`), err: T(`Fehler`, `Error`, `Erreur`),
  caveat: T(`Hinweis: Die KI liefert einen fachlichen Entwurf. Zahlen und Zielwerte sind Annahmen/Hypothesen und müssen mit echten Daten des Projekts überprüft werden.`, `Note: the AI delivers a professional draft. Figures and targets are assumptions/hypotheses and must be verified with the project's real data.`, `Remarque : l'IA fournit un projet de travail. Les chiffres et objectifs sont des hypothèses à vérifier avec les données réelles du projet.`),
  brief: T(`Projektbeschreibung`, `Project brief`, `Description du projet`), save: T(`Speichern`, `Save`, `Enregistrer`),
  sortRpn: T(`Nach RPZ sortieren`, `Sort by RPN`, `Trier par IPR`), compliance: T(`Erfüllungsgrad`, `Compliance`, `Conformité`),
  dataT: T(`📈 Echte Daten analysieren`, `📈 Analyse real data`, `📈 Analyser des données réelles`),
  dataI: T(`Ihre Messwerte hier einfügen (z. B. Zufriedenheit pro Tag, Wartezeit beim Check‑in in Minuten) und die App prüft, ob der Prozess stabil und fähig ist.`, `Paste your measurements here (e.g. satisfaction per day, check-in waiting time in minutes) and the app checks whether the process is stable and capable.`, `Collez vos mesures ici (ex. satisfaction par jour, temps d'attente à l'arrivée en minutes) et l'app vérifie si le processus est stable et capable.`),
  modeI: T(`Einzelwerte (ein Wert pro Zeile, zeitlich geordnet)`, `Individual values (one value per line, in time order)`, `Valeurs individuelles (une valeur par ligne, dans l'ordre chronologique)`),
  modeP: T(`Anteil fehlerhaft (pro Zeile: fehlerhaft; geprüft)`, `Fraction defective (per line: defective; inspected)`, `Proportion non conforme (par ligne : non conformes ; contrôlés)`),
  lsl: T(`Untere Grenze (optional)`, `Lower limit (optional)`, `Limite inférieure (facultatif)`), usl: T(`Obere Grenze (optional)`, `Upper limit (optional)`, `Limite supérieure (facultatif)`),
  analyse: T(`Analysieren`, `Analyse`, `Analyser`), exData: T(`Beispieldaten`, `Example data`, `Données d'exemple`),
  tooFew: T(`Mindestens 8 Werte nötig.`, `At least 8 values needed.`, `Au moins 8 valeurs nécessaires.`),
  stable: T(`Keine Signale – der Prozess wirkt statistisch stabil.`, `No signals – the process looks statistically stable.`, `Aucun signal – le processus semble statistiquement stable.`),
  signals: T(`Signale bei Punkt`, `Signals at point`, `Signaux au point`), run8: T(`8er‑Serie ab Punkt`, `run of 8 from point`, `série de 8 à partir du point`),
  unstable: T(`Prozess nicht stabil – Fähigkeitsindizes sind nur eingeschränkt aussagekräftig.`, `Process not stable – capability indices are of limited meaning.`, `Processus non stable – les indices de capabilité ont une portée limitée.`)
};
const u3 = k => tr(U3[k]);
const SECTORS = [
  ['hotel', T(`Hotel / Unterkunft`, `Hotel / accommodation`, `Hôtel / hébergement`), 'hotel / accommodation'],
  ['restaurant', T(`Restaurant / Gastronomie`, `Restaurant / catering`, `Restaurant / restauration`), 'restaurant / catering'],
  ['production', T(`Produktion / Fabrik`, `Manufacturing / factory`, `Production / usine`), 'manufacturing / factory'],
  ['health', T(`Krankenhaus / Labor`, `Hospital / laboratory`, `Hôpital / laboratoire`), 'hospital / laboratory'],
  ['retail', T(`Handel / Dienstleistung`, `Retail / service`, `Commerce / service`), 'retail / service business'],
  ['other', T(`Anderes`, `Other`, `Autre`), 'other (infer from description)']
];
const HOTEL_EX = T(
  `3‑Sterne‑Hotel mit 60 Zimmern, Restaurant (Frühstück und Abendessen), Rezeption rund um die Uhr, kleiner Pool. Beschwerden der Gäste: Zimmer nicht immer sauber, Lärm, langes Warten beim Check‑in, Frühstück oft kalt, Klimaanlage fällt aus. Ziel: Gästebewertung von 7,8 auf 8,5 steigern und Reklamationen halbieren.`,
  `3-star hotel with 60 rooms, restaurant (breakfast and dinner), 24-hour reception, small pool. Guest complaints: rooms not always clean, noise, long waiting at check-in, breakfast often cold, air conditioning failures. Goal: raise the guest rating from 7.8 to 8.5 and halve complaints.`,
  `Hôtel 3 étoiles de 60 chambres, restaurant (petit-déjeuner et dîner), réception 24 h/24, petite piscine. Réclamations des clients : chambres pas toujours propres, bruit, longue attente à l'arrivée, petit-déjeuner souvent froid, pannes de climatisation. Objectif : faire passer la note clients de 7,8 à 8,5 et diviser les réclamations par deux.`);

const COLS = {
  ctq: [['ctq', T(`Kritisches Merkmal`, `Critical characteristic`, `Caractéristique critique`)], ['requirement', T(`Anforderung`, `Requirement`, `Exigence`)], ['metric', T(`Messgröße`, `Metric`, `Indicateur`)], ['target', T(`Ziel`, `Target`, `Objectif`)], ['spec', T(`Grenze`, `Limit`, `Limite`)], ['type', T(`Art`, `Type`, `Type`)]],
  process: [['step', T(`Prozessschritt`, `Process step`, `Étape`)], ['owner', T(`Verantwortlich`, `Owner`, `Responsable`)], ['inputs', T(`Eingang`, `Input`, `Entrée`)], ['outputs', T(`Ergebnis`, `Output`, `Sortie`)], ['ccp', T(`Kritischer Kontrollpunkt`, `Critical control point`, `Point de contrôle critique`)], ['risk', T(`Typisches Risiko`, `Typical risk`, `Risque typique`)]],
  inspection: [['what', T(`Was wird geprüft`, `What is checked`, `Objet du contrôle`)], ['method', T(`Methode`, `Method`, `Méthode`)], ['tool', T(`Mittel`, `Tool`, `Moyen`)], ['frequency', T(`Häufigkeit`, `Frequency`, `Fréquence`)], ['sample', T(`Stichprobe`, `Sample`, `Échantillon`)], ['who', T(`Wer`, `Who`, `Qui`)], ['accept', T(`Annahmekriterium`, `Acceptance criterion`, `Critère d'acceptation`)], ['record', T(`Aufzeichnung`, `Record`, `Enregistrement`)]],
  spc: [['kpi', T(`Kennzahl`, `KPI`, `Indicateur`)], ['data', T(`Datenart`, `Data type`, `Type de données`)], ['chart', T(`Regelkarte`, `Control chart`, `Carte de contrôle`)], ['subgroup', T(`Untergruppe`, `Subgroup`, `Sous-groupe`)], ['frequency', T(`Erfassung`, `Collection`, `Collecte`)], ['target', T(`Zielwert`, `Target`, `Cible`)], ['alarm', T(`Reaktion bei Signal`, `Reaction to signal`, `Réaction au signal`)]],
  fmea: [['step', T(`Prozessschritt`, `Process step`, `Étape`)], ['mode', T(`Fehlerart`, `Failure mode`, `Mode de défaillance`)], ['effect', T(`Folge`, `Effect`, `Effet`)], ['cause', T(`Ursache`, `Cause`, `Cause`)], ['control', T(`Aktuelle Kontrolle`, `Current control`, `Contrôle actuel`)], ['S', T(`B/S`, `S`, `G`)], ['O', T(`A/O`, `O`, `O`)], ['D', T(`E/D`, `D`, `D`)], ['rpn', T(`RPZ`, `RPN`, `IPR`)], ['action', T(`Maßnahme`, `Action`, `Action`)], ['owner', T(`Verantw.`, `Owner`, `Resp.`)]],
  audit: [['area', T(`Bereich`, `Area`, `Domaine`)], ['question', T(`Auditfrage`, `Audit question`, `Question d'audit`)], ['evidence', T(`Nachweis`, `Evidence`, `Preuve`)], ['ref', T(`Bezug`, `Reference`, `Référence`)]]
};
const JSON_HINT = {
  ctq: `{"rows":[{"ctq":"","requirement":"customer need behind it","metric":"how it is measured","target":"numeric target","spec":"acceptance limit e.g. >= 4.2/5 or <= 10 min","type":"variable or attribute"}]}`,
  process: `{"rows":[{"step":"","owner":"role","inputs":"","outputs":"","ccp":"yes/no + what is controlled","risk":"typical failure risk"}]}`,
  inspection: `{"rows":[{"what":"","method":"","tool":"","frequency":"","sample":"sample size or rule","who":"role","accept":"acceptance criterion","record":"form / system"}]}`,
  spc: `{"rows":[{"kpi":"","data":"variable or attribute","chart":"p / np / c / u / I-MR / Xbar-R","subgroup":"","frequency":"","target":"","alarm":"reaction when a signal occurs"}]}`,
  fmea: `{"rows":[{"step":"","mode":"","effect":"","cause":"","control":"","S":1,"O":1,"D":1,"action":"","owner":"role"}]}`,
  audit: `{"rows":[{"area":"","question":"yes/no question","evidence":"what evidence to look at","ref":"ISO 9001 clause or other reference if sure, else empty"}]}`
};
const SECT = [
  { id: 'scope', t: T(`1 · Kontext, Anforderungen, Ziele`, `1 · Context, requirements, objectives`, `1 · Contexte, exigences, objectifs`), kind: 'md',
    p: `Write section 1 of the quality study in Markdown: ## Context and scope; ## Stakeholders and customer requirements (explicit and implicit, voice of the customer); ## Applicable standards and regulations (only those you are sure apply; tell the reader to verify local regulations); ## Quality policy; ## 5–7 SMART quality objectives with measurable targets; ## Assumptions (everything you had to assume because the brief did not say).` },
  { id: 'ctq', t: T(`2 · Kritische Qualitätsmerkmale (CTQ)`, `2 · Critical-to-quality characteristics (CTQ)`, `2 · Caractéristiques critiques pour la qualité (CTQ)`), kind: 'json', n: '10–14',
    p: `List the critical-to-quality characteristics that decide whether customers are satisfied or the process is safe/compliant. Use measurable metrics and realistic targets (mark them as proposed targets).` },
  { id: 'process', t: T(`3 · Prozesslandkarte & Kontrollpunkte`, `3 · Process map & control points`, `3 · Cartographie des processus & points de contrôle`), kind: 'json', n: '7–10',
    p: `Describe the main value-creating and support process steps in order (for a hotel e.g. reservation, arrival/check-in, room allocation, housekeeping, food & beverage, maintenance, check-out, complaint handling), with the critical control points and typical risks.` },
  { id: 'inspection', t: T(`4 · Prüfplan`, `4 · Inspection plan`, `4 · Plan de contrôle`), kind: 'json', n: '10–14',
    p: `Create an inspection / control plan: what is checked, how, with which tool, how often, sample size (justify with a simple rule), by whom, acceptance criterion and record. Include measurement-system considerations (who measures, calibration, observer consistency for visual/sensory checks).` },
  { id: 'spc', t: T(`5 · Kennzahlen & SPC‑Regelkarten`, `5 · KPIs & SPC control charts`, `5 · Indicateurs & cartes de contrôle MSP`), kind: 'json', n: '6–9',
    p: `Define the KPIs to monitor with statistical process control and choose the right control chart for each (p, np, c, u, I-MR, Xbar-R) with subgroup definition, collection frequency, target and the reaction plan when a signal occurs.` },
  { id: 'fmea', t: T(`6 · Risikoanalyse (FMEA)`, `6 · Risk analysis (FMEA)`, `6 · Analyse des risques (AMDEC)`), kind: 'json', n: '10–14',
    p: `Create a process FMEA for the most critical steps. S (severity), O (occurrence), D (detection) are integers 1–10 (D=10 means hardly detectable). Give concrete recommended actions. Order from the most to the least critical.` },
  { id: 'tools', t: T(`7 · Qualitätswerkzeuge (Pareto, Ishikawa, 5‑Why)`, `7 · Quality tools (Pareto, Ishikawa, 5 Whys)`, `7 · Outils qualité (Pareto, Ishikawa, 5 Pourquoi)`), kind: 'md',
    p: `Write section 7 in Markdown: ## Expected Pareto of problem categories (a table with category and an ESTIMATED share, clearly labelled as a hypothesis to be verified with a check sheet over 4 weeks); ## Ishikawa (6M) for the most likely top problem (list causes per M); ## 5-Why example for that problem; ## Criteria for opening an 8D report; ## Data collection plan (check sheet design).` },
  { id: 'audit', t: T(`8 · Audit‑Checkliste`, `8 · Audit checklist`, `8 · Liste de contrôle d'audit`), kind: 'json', n: '18–24',
    p: `Create an internal audit checklist (ISO 19011 style) covering leadership, customer focus, processes, resources and competence, monitoring/measurement, nonconformity and corrective action, and sector-specific topics. Questions must be answerable with yes/no and an evidence check.` },
  { id: 'actions', t: T(`9 · Maßnahmenplan & Roadmap`, `9 · Action plan & roadmap`, `9 · Plan d'actions & feuille de route`), kind: 'md',
    p: `Write section 9 in Markdown: ## Quick wins (first 30 days); ## Medium term (60–90 days); ## Structural improvements (6–12 months); ## Roles and responsibilities; ## Cost of quality (prevention / appraisal / internal failure / external failure examples for this project); ## Management review: KPIs and frequency; ## Risks to the implementation.` },
  { id: 'summary', t: T(`10 · Zusammenfassung für die Leitung`, `10 · Executive summary`, `10 · Synthèse pour la direction`), kind: 'md',
    p: `Write a one-page executive summary in Markdown for management: ## Situation; ## Main findings (the 5 most important quality risks and CTQs); ## Recommended priorities; ## Expected benefits (labelled as expectations); ## Next steps.` }
];
const secTitle = s => tr(s.t);

/* ---------- Speicher ---------- */
const PJ = { all: () => LS.get('qc_projects', []), save: a => LS.set('qc_projects', a), get: id => PJ.all().find(p => p.id === id),
  put: p => { const a = PJ.all(), i = a.findIndex(x => x.id === p.id); if (i >= 0) a[i] = p; else a.unshift(p); PJ.save(a); },
  del: id => PJ.save(PJ.all().filter(p => p.id !== id)) };

/* ---------- KI-Abschnitte ---------- */
const PSYS = L => `You are a senior quality engineer and consultant (ISO 9001, statistical process control, MSA, FMEA, service quality and customer satisfaction, HACCP/food safety where relevant). You write a quality control study for the project below, in ${LNAME[L]}. Be concrete and specific to the project, not generic. Use realistic measurable targets and mark proposed targets as proposals. Whenever the brief lacks information, state an explicit assumption; never present invented figures as facts about the client. Do not cite specific laws or standard clauses unless you are sure; recommend verifying local regulations. Keep technical terms and give German / English / French equivalents for the key quality terms at first mention where it helps.`;
async function projectContext(p) {
  const sec = SECTORS.find(s => s[0] === p.sector), lim = Math.round(PROV[AIcfg().provider].chunk * 0.5); let docs = '';
  for (const id of p.docIds || []) { try { const d = await dbGet(id); if (d) docs += `--- ${d.name} ---\n` + d.pages.map(x => x.text).join('\n').slice(0, Math.floor(lim / Math.max(1, p.docIds.length))) + '\n'; } catch (e) { } }
  return `PROJECT: ${p.name}\nSECTOR: ${sec ? sec[2] : p.sector}\nBRIEF:\n${p.desc}\n${docs ? `\nPROVIDED DOCUMENTS (excerpts):\n${docs}` : ''}`;
}
function prevSummary(p) {
  const lim = Math.round(PROV[AIcfg().provider].chunk * 0.5), per = Math.floor(lim / 8); let s = '';
  SECT.forEach(x => { const r = p.sec[x.id]; if (!r || x.id === 'summary') return; s += `### ${x.id}\n` + (r.md ? r.md.slice(0, per) : JSON.stringify(r.rows.slice(0, 8)).slice(0, per)) + '\n'; });
  return s;
}
async function genSection(p, sec, status) {
  if (!hasKey()) throw new Error(u3('needKey'));
  const ctx = await projectContext(p), L = p.lang;
  let user;
  if (sec.kind === 'md') user = `${ctx}\n\nTASK: ${sec.p}${sec.id === 'summary' ? `\n\nEARLIER SECTIONS OF THE STUDY (condensed):\n${prevSummary(p)}` : ''}`;
  else user = `${ctx}\n\nTASK: ${sec.p} Provide ${sec.n} rows. All text values in ${LNAME[L]}. Return ONLY JSON in exactly this shape (keys in English, values in ${LNAME[L]}): ${JSON_HINT[sec.id]}`;
  const t = await askAI({ system: PSYS(L), user, json: sec.kind === 'json', onStatus: status });
  if (sec.kind === 'md') return { md: t.trim() };
  let rows = parseJSON(t).rows; if (!Array.isArray(rows)) throw new Error('JSON');
  rows = rows.filter(r => r && typeof r === 'object').map(r => { const o = {}; COLS[sec.id].forEach(([k]) => { if (k !== 'rpn') o[k] = r[k] === undefined || r[k] === null ? '' : String(r[k]); }); if (sec.id === 'fmea') ['S', 'O', 'D'].forEach(k => { const n = Math.round(+r[k]); o[k] = String(n >= 1 && n <= 10 ? n : 5); }); return o; });
  if (!rows.length) throw new Error('empty');
  if (sec.id === 'fmea') rows.sort((a, b) => b.S * b.O * b.D - a.S * a.O * a.D);
  return { rows, lang: L };
}

/* ---------- Tabellen ---------- */
const rpnOf = r => (+r.S) * (+r.O) * (+r.D);
const rpnCls = (r, x) => (+r.S >= 9 || x >= 200) ? 'bad' : x >= 100 ? 'warn' : 'good';
function tableHtml(id, rows, p) {
  const cols = COLS[id];
  let h = '<div class="tw"><table class="mt"><tr>' + cols.map(([, t]) => `<th>${esc(tr(t))}</th>`).join('') + (id === 'audit' ? '<th>✓</th>' : '') + '</tr>';
  rows.forEach((r, i) => {
    h += '<tr>' + cols.map(([k]) => {
      if (id === 'fmea' && ['S', 'O', 'D'].includes(k)) return `<td><input class="sod" type="number" min="1" max="10" data-i="${i}" data-k="${k}" value="${esc(r[k])}"></td>`;
      if (k === 'rpn') { const x = rpnOf(r); return `<td class="rp ${rpnCls(r, x)}" data-r="${i}"><b>${x}</b></td>`; }
      return `<td>${esc(r[k] || '')}</td>`;
    }).join('');
    if (id === 'audit') { const v = (p.audit || {})[i] || ''; h += `<td><select class="au" data-i="${i}"><option value="">—</option><option value="ok"${v === 'ok' ? ' selected' : ''}>✓</option><option value="no"${v === 'no' ? ' selected' : ''}>✗</option><option value="na"${v === 'na' ? ' selected' : ''}>n/a</option></select></td>`; }
    h += '</tr>';
  });
  return h + '</table></div>';
}
function toMarkdown(p) {
  let s = `# ${p.name}\n\n*${new Date(p.created).toLocaleDateString(lang)} · ${(SECTORS.find(x => x[0] === p.sector) || ['', { de: '', en: '', fr: '' }])[1][lang]}*\n\n${p.desc}\n\n`;
  SECT.forEach(x => {
    const r = p.sec[x.id]; if (!r) return; s += `## ${secTitle(x)}\n\n`;
    if (r.md) s += r.md.replace(/^#{1,2} /gm, '### ') + '\n\n';
    else { const cols = COLS[x.id].filter(([k]) => k !== 'rpn' || x.id === 'fmea'); s += '| ' + cols.map(([, t]) => tr(t)).join(' | ') + ' |\n|' + cols.map(() => '---').join('|') + '|\n'; r.rows.forEach(row => { s += '| ' + cols.map(([k]) => (k === 'rpn' ? rpnOf(row) : String(row[k] || '').replace(/\|/g, '/').replace(/\n/g, ' '))).join(' | ') + ' |\n'; }); s += '\n'; }
  });
  return s;
}

/* ---------- Ansichten ---------- */
function vProjects(m) {
  const all = PJ.all();
  m.innerHTML = `<h2>🏨 ${u3('title')}</h2><p class="foot" style="text-align:left">${u3('intro')}</p>
  <div class="card"><label>${u3('name')}<input id="pn" placeholder="${esc(u3('namePh'))}"></label>
    <label>${u3('sector')}<select id="ps">${SECTORS.map(s => `<option value="${s[0]}">${esc(tr(s[1]))}</option>`).join('')}</select></label>
    <label>${u3('desc')}<textarea id="pd" rows="5"></textarea></label>
    <label>${u3('lang')}<select id="pl"><option value="de">Deutsch</option><option value="en">English</option><option value="fr">Français</option></select></label>
    <div id="pdocs"></div>
    <div class="row"><button class="btn" id="pc">${u3('create')}</button><button class="btn ghost" id="pe">${u3('example')}</button></div></div>
  <h3 class="sub">${u3('title')}</h3><div id="pl2"></div>`;
  $('#pl').value = lang;
  $('#pl2').innerHTML = all.length ? all.map(p => `<a class="card lesson" href="#/project/${p.id}"><span class="ic">${p.sector === 'hotel' ? '🏨' : p.sector === 'restaurant' ? '🍽️' : p.sector === 'production' ? '🏭' : p.sector === 'health' ? '🏥' : '📋'}</span><span class="tt"><b>${esc(p.name)}</b><small>${Object.keys(p.sec).length}/${SECT.length} ${u3('done')}</small></span><span class="chk">›</span></a>`).join('') : `<p class="foot">${u3('none')}</p>`;
  (async () => { let docs = []; try { docs = await dbAll(); } catch (e) { } if (docs.length) $('#pdocs').innerHTML = `<label>${u3('docs')}</label>` + docs.map(d => `<label class="ck"><input type="checkbox" class="pdk" value="${d.id}"> ${esc(d.name)}</label>`).join(''); })();
  $('#pe').onclick = () => { $('#pn').value = lang === 'de' ? 'Hotel Atlas (3 Sterne)' : lang === 'fr' ? 'Hôtel Atlas (3 étoiles)' : 'Hotel Atlas (3 stars)'; $('#ps').value = 'hotel'; $('#pd').value = tr(HOTEL_EX); };
  $('#pc').onclick = () => {
    const name = $('#pn').value.trim(), desc = $('#pd').value.trim(); if (!name || !desc) { $(name ? '#pd' : '#pn').focus(); return; }
    const p = { id: 'p' + Date.now(), name, sector: $('#ps').value, desc, lang: $('#pl').value, docIds: $$('.pdk:checked').map(x => x.value), created: Date.now(), sec: {}, audit: {} };
    PJ.put(p); location.hash = '#/project/' + p.id;
  };
}

function vProject(m, id) {
  let p = PJ.get(id); if (!p) { location.hash = '#/projects'; return; }
  const save = () => PJ.put(p);
  m.innerHTML = `<a class="back" href="#/projects">${tr(UI.back)}</a><h2>${esc(p.name)}</h2>
  <div class="card"><details><summary><b>${u3('brief')}</b> · ${esc((SECTORS.find(x => x[0] === p.sector) || [0, T('', '', '')])[1][lang])}</summary><textarea id="bd" rows="5">${esc(p.desc)}</textarea><div class="row"><button class="btn ghost sm" id="bs">${u3('save')}</button></div></details>
    <label>${u3('lang')}<select id="pl"><option value="de">Deutsch</option><option value="en">English</option><option value="fr">Français</option></select></label>
    ${hasKey() ? '' : `<p class="warn">${u3('needKey')} <a href="#/docs">→</a></p>`}
    <div class="row"><button class="btn" id="ga">${u3('genAll')}</button><button class="btn ghost sm" id="ex">${u3('exportMd')}</button><button class="btn ghost sm" id="pr">${u3('print')}</button><button class="btn ghost sm" id="dl">${u3('del')}</button></div>
    <div id="gs" class="foot"></div><small>${u3('caveat')}</small></div>
  <div id="secs"></div>
  <div class="card" id="dcard"><h3>${u3('dataT')}</h3><p><small>${u3('dataI')}</small></p>
    <label>${u3('lang') && ''}<select id="dm"><option value="i">${u3('modeI')}</option><option value="p">${u3('modeP')}</option></select></label>
    <textarea id="dt" rows="5"></textarea><div class="grid2"><label>${u3('lsl')}<input id="dl1" inputmode="decimal"></label><label>${u3('usl')}<input id="du1" inputmode="decimal"></label></div>
    <div class="row"><button class="btn" id="da">${u3('analyse')}</button><button class="btn ghost" id="de">${u3('exData')}</button></div><div id="dout"></div></div>`;
  $('#pl').value = p.lang; $('#pl').onchange = e => { p.lang = e.target.value; save(); };
  $('#bs').onclick = () => { p.desc = $('#bd').value; save(); $('#bs').textContent = '✓'; };
  $('#dl').onclick = () => { if (confirm(u3('delAsk'))) { PJ.del(p.id); location.hash = '#/projects'; } };
  $('#ex').onclick = () => { const b = new Blob([toMarkdown(p)], { type: 'text/markdown' }), a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = p.name.replace(/[^\w\-]+/g, '_') + '.md'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
  $('#pr').onclick = () => window.print();

  const gs = t => $('#gs').textContent = t;
  const drawSec = sec => {
    const box = $('#sec-' + sec.id), r = p.sec[sec.id]; if (!box) return;
    const body = $('.sb', box);
    if (!r) { body.innerHTML = ''; return; }
    if (r.md) body.innerHTML = `<div class="md">${md(r.md)}</div>`;
    else {
      body.innerHTML = tableHtml(sec.id, r.rows, p) + (sec.id === 'fmea' ? `<div class="row"><button class="btn ghost sm" id="srt">${u3('sortRpn')}</button></div>` : '') + (sec.id === 'audit' ? `<p id="cmp"></p>` : '');
      if (sec.id === 'fmea') {
        $$('.sod', body).forEach(inp => inp.oninput = () => { const row = r.rows[+inp.dataset.i]; let v = Math.max(1, Math.min(10, Math.round(+inp.value) || 1)); row[inp.dataset.k] = String(v); const x = rpnOf(row), c = $(`.rp[data-r="${inp.dataset.i}"]`, body); c.className = 'rp ' + rpnCls(row, x); c.innerHTML = `<b>${x}</b>`; save(); });
        $('#srt', body).onclick = () => { r.rows.sort((a, b) => rpnOf(b) - rpnOf(a)); save(); drawSec(sec); };
      }
      if (sec.id === 'audit') {
        const comp = () => { const v = Object.values(p.audit || {}), ok = v.filter(x => x === 'ok').length, no = v.filter(x => x === 'no').length; $('#cmp', body).innerHTML = (ok + no) ? `<b>${u3('compliance')}: ${Math.round(ok / (ok + no) * 100)} %</b> (${ok} ✓ / ${no} ✗)` : ''; };
        $$('.au', body).forEach(s => s.onchange = () => { p.audit = p.audit || {}; p.audit[s.dataset.i] = s.value; save(); comp(); }); comp();
      }
    }
  };
  $('#secs').innerHTML = SECT.map(s => `<div class="card sec" id="sec-${s.id}"><div class="row between"><h3 style="margin:0">${esc(secTitle(s))}</h3><button class="btn sm" data-g="${s.id}">${p.sec[s.id] ? u3('regen') : u3('gen')}</button></div><div class="foot sst" style="text-align:left"></div><div class="sb"></div></div>`).join('');
  SECT.forEach(drawSec);
  const run = async list => {
    $$('.btn', m).forEach(b => b.disabled = true);
    try {
      for (const s of list) {
        const box = $('#sec-' + s.id), st = $('.sst', box); box.scrollIntoView && box.scrollIntoView({ block: 'nearest' });
        gs(`${u3('working')}: ${secTitle(s)}…`); st.textContent = u3('working') + '…';
        const r = await genSection(p, s, t => { st.textContent = t; });
        p.sec[s.id] = r; if (s.id === 'fmea' || s.id === 'audit') { p.audit = s.id === 'audit' ? {} : p.audit; } save(); st.textContent = ''; drawSec(s); $('[data-g="' + s.id + '"]').textContent = u3('regen');
      }
      gs(u3('done'));
    } catch (e) { gs(`${u3('err')}: ${e.message}`); }
    $$('.btn', m).forEach(b => b.disabled = false);
  };
  $$('[data-g]', m).forEach(b => b.onclick = () => run([SECT.find(s => s.id === b.dataset.g)]));
  $('#ga').onclick = () => run(SECT);

  /* Datenanalyse */
  $('#de').onclick = () => {
    let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    if ($('#dm').value === 'i') { const v = []; for (let i = 0; i < 30; i++) v.push((12 + (rnd() + rnd() + rnd() - 1.5) * 4 + (i > 20 ? 3 : 0) + (i === 12 ? 9 : 0)).toFixed(1)); $('#dt').value = v.join('\n'); $('#dl1').value = '0'; $('#du1').value = '20'; }
    else { const v = []; for (let i = 0; i < 25; i++) { const n = 20 + Math.floor(rnd() * 8), d = Math.max(0, Math.round(n * (0.08 + (rnd() - 0.5) * 0.08) + (i === 15 ? 6 : 0))); v.push(d + '; ' + n); } $('#dt').value = v.join('\n'); $('#dl1').value = ''; $('#du1').value = ''; }
    $('#da').click();
  };
  $('#da').onclick = () => {
    const out = $('#dout'), mode = $('#dm').value, rows = parseRows($('#dt').value);
    const sigTxt = (flags, runs) => (flags.length || runs.length) ? `<p class="bad"><b>⚠</b> ${u3('signals')}: ${flags.length ? flags.join(', ') : '–'}${runs.length ? `<br>${u3('run8')}: ${runs.join(', ')}` : ''}</p>` : `<p class="good">✓ ${u3('stable')}</p>`;
    const runsOf = (v, cl) => { const r = []; let prev = false; for (let i = 7; i < v.length; i++) { const w = v.slice(i - 7, i + 1), hit = w.every(x => x > cl) || w.every(x => x < cl); if (hit && !prev) r.push(i - 6); prev = hit; } return r; };
    if (mode === 'i') {
      const v = rows.flat(); if (v.length < 8) { out.innerHTML = `<p class="bad">${u3('tooFew')}</p>`; return; }
      const mr = v.slice(1).map((x, i) => Math.abs(x - v[i])), mrb = mean(mr), cl = mean(v), ucl = cl + 2.66 * mrb, lcl = cl - 2.66 * mrb, mu = 3.267 * mrb, sig = mrb / 1.128;
      const fl = [], fx = {}; v.forEach((x, i) => { if (x > ucl || x < lcl) { fl.push(i + 1); fx[i] = css('--bad'); } });
      const rn = runsOf(v, cl); rn.forEach(s => { for (let j = s - 1; j < s + 7; j++) if (!fx[j]) fx[j] = css('--warn'); });
      const L1 = num($('#dl1').value), U1 = num($('#du1').value); let cap = '';
      if (isFinite(L1) || isFinite(U1)) {
        const cpu = isFinite(U1) ? (U1 - cl) / (3 * sig) : Infinity, cpl = isFinite(L1) ? (cl - L1) / (3 * sig) : Infinity, cpk = Math.min(cpu, cpl), cp = isFinite(L1) && isFinite(U1) ? (U1 - L1) / (6 * sig) : null;
        cap = `<table>${cp !== null ? `<tr><td>Cp</td><td><b>${nf(cp, 2)}</b></td></tr>` : ''}<tr><td>Cpk</td><td><b class="${cpk < 1 ? 'bad' : cpk < 1.33 ? 'warn' : 'good'}">${nf(cpk, 2)}</b></td></tr></table>${(fl.length || rn.length) ? `<small>${u3('unstable')}</small>` : ''}`;
      }
      out.innerHTML = `<div class="card"><canvas id="c1"></canvas><canvas id="c2"></canvas></div><div class="card"><table><tr><td>n</td><td>${v.length}</td></tr><tr><td>x̄ / MR̄</td><td>${nf(cl, 3)} / ${nf(mrb, 3)}</td></tr><tr><td>UCL / LCL</td><td>${nf(ucl, 3)} / ${nf(lcl, 3)}</td></tr><tr><td>σ̂ = MR̄/1,128</td><td>${nf(sig, 3)}</td></tr></table>${sigTxt(fl, rn)}${cap}</div>`;
      const lb = v.map((_, i) => String(i + 1)); redraw = () => {
        lineChart($('#c1'), { h: 190, labels: lb, series: [{ vals: v, color: css('--acc'), points: true }], flags: fx, lines: [{ y: ucl, label: 'UCL', color: css('--bad'), dash: true }, { y: cl, label: 'x̄', color: css('--good') }, { y: lcl, label: 'LCL', color: css('--bad'), dash: true }] });
        lineChart($('#c2'), { h: 140, labels: lb.slice(1), series: [{ vals: mr, color: css('--acc2'), points: true }], ymin: 0, lines: [{ y: mu, label: 'UCL', color: css('--bad'), dash: true }, { y: mrb, label: 'MR̄', color: css('--good') }] });
      }; redraw();
    } else {
      const pr = rows.filter(r => r.length >= 2 && r[1] > 0 && r[0] >= 0 && r[0] <= r[1]); if (pr.length < 8) { out.innerHTML = `<p class="bad">${u3('tooFew')}</p>`; return; }
      const D = pr.reduce((s, r) => s + r[0], 0), N = pr.reduce((s, r) => s + r[1], 0), pb = D / N, pv = pr.map(r => r[0] / r[1]), ucl = pr.map(r => Math.min(1, pb + 3 * Math.sqrt(pb * (1 - pb) / r[1]))), lcl = pr.map(r => Math.max(0, pb - 3 * Math.sqrt(pb * (1 - pb) / r[1])));
      const fl = [], fx = {}; pv.forEach((x, i) => { if (x > ucl[i] || x < lcl[i]) { fl.push(i + 1); fx[i] = css('--bad'); } });
      const rn = runsOf(pv, pb); rn.forEach(s => { for (let j = s - 1; j < s + 7; j++) if (!fx[j]) fx[j] = css('--warn'); });
      out.innerHTML = `<div class="card"><canvas id="c1"></canvas></div><div class="card"><table><tr><td>k / Σn</td><td>${pr.length} / ${N}</td></tr><tr><td>p̄</td><td>${nf(pb * 100, 2)} %</td></tr></table>${sigTxt(fl, rn)}</div>`;
      const lb = pv.map((_, i) => String(i + 1)); redraw = () => lineChart($('#c1'), { h: 210, labels: lb, ymin: 0, yfmt: x => (x * 100).toFixed(0) + '%', series: [{ vals: pv, color: css('--acc'), points: true }, { vals: ucl, color: css('--bad') }, { vals: lcl, color: css('--bad') }], flags: fx, lines: [{ y: pb, label: 'p̄', color: css('--good') }] }); redraw();
    }
  };
}
