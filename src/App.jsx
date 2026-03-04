import { useState, useRef } from "react";

const GRADES = ["M", "NM", "VG+", "VG", "G+", "G", "F", "P"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #1a73e8;
    --blue-dark: #1558b0;
    --blue-light: #e8f0fe;
    --blue-mid: #4285f4;
    --green: #1e8e3e;
    --green-light: #e6f4ea;
    --red: #d93025;
    --red-light: #fce8e6;
    --orange: #e37400;
    --orange-light: #fef3e2;
    --grey-50: #f8f9fa;
    --grey-100: #f1f3f4;
    --grey-200: #e8eaed;
    --grey-300: #dadce0;
    --grey-400: #bdc1c6;
    --grey-500: #9aa0a6;
    --grey-600: #80868b;
    --grey-700: #5f6368;
    --grey-800: #3c4043;
    --grey-900: #202124;
    --white: #ffffff;
    --shadow-1: 0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
    --shadow-2: 0 1px 3px rgba(60,64,67,.3), 0 4px 8px 3px rgba(60,64,67,.15);
    --shadow-3: 0 2px 6px rgba(60,64,67,.3), 0 8px 24px 8px rgba(60,64,67,.15);
    --radius: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
  }

  body {
    background: var(--grey-100);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--grey-900);
    min-height: 100vh;
    font-size: 15px;
    line-height: 1.5;
  }

  .app { max-width: 480px; margin: 0 auto; min-height: 100vh; background: var(--grey-100); }

  /* ── Header ── */
  .header {
    background: var(--white);
    border-bottom: 1px solid var(--grey-200);
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 1px 3px rgba(60,64,67,.15);
  }
  .header-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
  }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--blue); display: flex; align-items: center;
    justify-content: center; font-size: 18px; flex-shrink: 0;
  }
  .logo-text { font-size: 18px; font-weight: 700; color: var(--grey-900); letter-spacing: -.3px; }
  .logo-sub { font-size: 11px; color: var(--grey-600); font-weight: 500; margin-top: -1px; }
  .settings-btn {
    background: none; border: 1px solid var(--grey-300); color: var(--grey-700);
    padding: 8px 14px; border-radius: 20px; font-family: inherit;
    font-size: 13px; font-weight: 600; cursor: pointer; transition: all .15s;
    display: flex; align-items: center; gap: 6px;
  }
  .settings-btn:hover { background: var(--grey-100); border-color: var(--grey-400); }

  /* ── Tabs ── */
  .tabs { display: flex; border-top: 1px solid var(--grey-200); }
  .tab {
    flex: 1; padding: 12px 8px; text-align: center; cursor: pointer;
    font-size: 13px; font-weight: 600; color: var(--grey-600);
    border-bottom: 3px solid transparent; transition: all .15s;
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .tab.active { color: var(--blue); border-bottom-color: var(--blue); }
  .tab:hover:not(.active) { background: var(--grey-50); color: var(--grey-800); }

  /* ── Content ── */
  .content { padding: 16px; padding-bottom: 60px; }

  /* ── Cards ── */
  .card {
    background: var(--white); border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1); padding: 20px; margin-bottom: 12px;
  }
  .card-title { font-size: 15px; font-weight: 700; color: var(--grey-900); margin-bottom: 16px; }

  /* ── Form fields ── */
  .field-group { margin-bottom: 16px; }
  .field-label {
    font-size: 12px; font-weight: 600; color: var(--grey-700);
    margin-bottom: 6px; display: block; letter-spacing: .2px;
    text-transform: uppercase;
  }
  .field-input {
    width: 100%; background: var(--white); border: 1.5px solid var(--grey-300);
    color: var(--grey-900); font-family: inherit; font-size: 15px;
    padding: 11px 14px; border-radius: var(--radius); outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  .field-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,115,232,.15); }
  .field-input::placeholder { color: var(--grey-400); }
  .field-textarea {
    width: 100%; background: var(--white); border: 1.5px solid var(--grey-300);
    color: var(--grey-900); font-family: inherit; font-size: 15px;
    padding: 11px 14px; border-radius: var(--radius); outline: none;
    transition: border-color .15s; resize: vertical; min-height: 80px;
  }
  .field-textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,115,232,.15); }
  .hint { font-size: 12px; color: var(--grey-600); margin-top: 5px; line-height: 1.5; }

  /* ── Buttons ── */
  .btn {
    padding: 11px 20px; border-radius: 20px; border: none; font-family: inherit;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: all .15s;
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  }
  .btn-primary { background: var(--blue); color: white; }
  .btn-primary:hover { background: var(--blue-dark); box-shadow: var(--shadow-1); }
  .btn-primary:disabled { background: var(--grey-300); color: var(--grey-500); cursor: not-allowed; box-shadow: none; }
  .btn-secondary { background: var(--white); color: var(--blue); border: 1.5px solid var(--grey-300); }
  .btn-secondary:hover { background: var(--blue-light); border-color: var(--blue); }
  .btn-tonal { background: var(--blue-light); color: var(--blue); border: none; }
  .btn-tonal:hover { background: #d2e3fc; }
  .btn-green { background: var(--green); color: white; width: 100%; margin-top: 8px; border-radius: var(--radius); padding: 14px; font-size: 15px; }
  .btn-green:hover { background: #166d35; box-shadow: var(--shadow-1); }
  .btn-danger-outline { background: transparent; border: 1.5px solid var(--red); color: var(--red); }
  .btn-danger-outline:hover { background: var(--red-light); }
  .btn-save { background: var(--blue); color: white; flex: 1; border-radius: var(--radius); padding: 14px; font-size: 15px; }
  .btn-save:hover { background: var(--blue-dark); }
  .btn-row { display: flex; gap: 10px; margin-top: 14px; }
  .btn-row .btn { flex: 1; }

  /* ── Capture zone ── */
  .capture-zone {
    border: 2px dashed var(--grey-300); border-radius: var(--radius-lg);
    aspect-ratio: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 10px;
    cursor: pointer; transition: all .2s; position: relative; overflow: hidden;
    background: var(--grey-50);
  }
  .capture-zone:hover { border-color: var(--blue); background: var(--blue-light); }
  .capture-zone img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; border-radius: 10px; }
  .capture-overlay {
    position: absolute; inset: 0; background: rgba(0,0,0,.45);
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 8px; border-radius: 10px;
  }
  .capture-overlay span { color: white; font-size: 13px; font-weight: 600; }
  .capture-icon { font-size: 40px; }
  .capture-text { font-size: 15px; font-weight: 600; color: var(--grey-700); text-align: center; }
  .capture-hint { font-size: 13px; color: var(--grey-500); }

  /* ── Status bar ── */
  .status-bar {
    border-radius: var(--radius); padding: 12px 16px; margin-top: 12px;
    font-size: 14px; font-weight: 500; display: flex; align-items: flex-start; gap: 10px;
  }
  .status-loading { background: var(--blue-light); color: var(--blue); }
  .status-ok { background: var(--green-light); color: var(--green); }
  .status-err { background: var(--red-light); color: var(--red); }
  .status-icon { flex-shrink: 0; font-size: 16px; margin-top: 1px; }
  .error-detail {
    background: var(--red-light); border: 1px solid #f5c6c3;
    border-radius: var(--radius); padding: 10px 14px; margin-top: 6px;
    font-size: 12px; color: var(--red); line-height: 1.6;
    font-family: 'Fira Mono', monospace; word-break: break-all;
  }

  /* ── Section divider label ── */
  .section-label {
    font-size: 12px; font-weight: 700; color: var(--grey-600);
    letter-spacing: .3px; text-transform: uppercase;
    margin: 18px 0 10px; display: flex; align-items: center; gap: 8px;
  }
  .section-label::after { content:''; flex:1; height:1px; background:var(--grey-200); }

  /* ── Fallback options ── */
  .fallback-card {
    background: var(--orange-light); border: 1px solid #f6d4a0;
    border-radius: var(--radius-lg); padding: 16px; margin-top: 12px;
  }
  .fallback-title { font-size: 14px; font-weight: 700; color: var(--orange); margin-bottom: 10px; display: flex; align-items: center; gap: 7px; }
  .fallback-btns { display: flex; flex-direction: column; gap: 8px; }
  .fallback-btn {
    background: white; border: 1.5px solid var(--grey-300); border-radius: var(--radius);
    padding: 12px 14px; font-family: inherit; font-size: 14px; font-weight: 600;
    color: var(--grey-800); cursor: pointer; transition: all .15s;
    display: flex; align-items: center; gap: 10px; text-align: left; width: 100%;
  }
  .fallback-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
  .fallback-btn-icon { font-size: 20px; flex-shrink: 0; }
  .fallback-btn-text { flex: 1; }
  .fallback-btn-sub { font-size: 12px; font-weight: 400; color: var(--grey-500); margin-top: 1px; }
  .fallback-btn:hover .fallback-btn-sub { color: var(--blue); }

  /* ── Search row ── */
  .search-row { display: flex; gap: 8px; margin-top: 10px; }
  .search-input {
    flex: 1; background: var(--white); border: 1.5px solid var(--grey-300);
    color: var(--grey-900); font-family: inherit; font-size: 14px;
    padding: 10px 14px; border-radius: 20px; outline: none; transition: all .15s;
  }
  .search-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,115,232,.15); }
  .search-input::placeholder { color: var(--grey-400); }
  .search-btn {
    padding: 10px 18px; border-radius: 20px; border: none;
    background: var(--blue); color: white; font-family: inherit;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: all .15s; white-space: nowrap;
  }
  .search-btn:hover { background: var(--blue-dark); }

  /* ── Extracted box ── */
  .extracted-box {
    background: var(--grey-50); border: 1px solid var(--grey-200);
    border-radius: var(--radius); padding: 14px; margin-top: 12px;
  }
  .extracted-label { font-size: 11px; font-weight: 700; color: var(--grey-600); letter-spacing: .3px; text-transform: uppercase; margin-bottom: 8px; }
  .extracted-row {
    display: flex; justify-content: space-between; font-size: 13px;
    padding: 4px 0; border-bottom: 1px solid var(--grey-200);
  }
  .extracted-row:last-child { border-bottom: none; }
  .extracted-key { color: var(--grey-600); font-weight: 500; flex-shrink: 0; margin-right: 12px; }
  .extracted-val { color: var(--grey-900); font-weight: 600; text-align: right; word-break: break-word; }

  /* ── Result cards ── */
  .result-card {
    background: var(--white); border: 1.5px solid var(--grey-200);
    border-radius: var(--radius-lg); padding: 14px; margin-bottom: 8px;
    cursor: pointer; transition: all .15s; display: flex; gap: 12px; align-items: flex-start;
    box-shadow: var(--shadow-1);
  }
  .result-card:hover { border-color: var(--blue); box-shadow: var(--shadow-2); }
  .result-card.selected { border-color: var(--blue); background: var(--blue-light); box-shadow: var(--shadow-2); }
  .result-thumb {
    width: 56px; height: 56px; border-radius: var(--radius); object-fit: cover;
    background: var(--grey-100); flex-shrink: 0; border: 1px solid var(--grey-200);
  }
  .result-thumb-ph {
    width: 56px; height: 56px; border-radius: var(--radius);
    background: var(--grey-100); border: 1px solid var(--grey-200);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
  }
  .result-title { font-size: 14px; font-weight: 700; color: var(--grey-900); line-height: 1.3; }
  .result-meta { font-size: 12px; color: var(--grey-600); margin-top: 3px; }
  .badge {
    display: inline-block; background: var(--grey-100); border: 1px solid var(--grey-200);
    border-radius: 4px; padding: 2px 7px; font-size: 11px; font-weight: 600;
    color: var(--grey-700); margin-right: 4px; margin-top: 4px;
  }
  .selected .badge { background: white; }

  /* ── Detail panel ── */
  .detail-panel {
    background: var(--white); border-radius: var(--radius-lg);
    box-shadow: var(--shadow-2); padding: 20px; margin-top: 14px;
    border-top: 3px solid var(--blue);
  }
  .detail-header { display: flex; gap: 14px; margin-bottom: 16px; align-items: flex-start; }
  .detail-cover { width: 72px; height: 72px; border-radius: var(--radius); object-fit: cover; border: 1px solid var(--grey-200); flex-shrink: 0; }
  .detail-cover-ph { width: 72px; height: 72px; border-radius: var(--radius); background: var(--grey-100); border: 1px solid var(--grey-200); display: flex; align-items: center; justify-content: center; font-size: 30px; flex-shrink: 0; }
  .detail-title { font-size: 16px; font-weight: 700; line-height: 1.3; color: var(--grey-900); }
  .detail-artist { font-size: 14px; color: var(--blue); margin-top: 3px; font-weight: 600; }
  .detail-link { font-size: 12px; color: var(--grey-600); text-decoration: none; margin-top: 5px; display: block; word-break: break-all; }
  .detail-link:hover { color: var(--blue); text-decoration: underline; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
  .info-cell { background: var(--grey-50); border-radius: var(--radius); padding: 10px 12px; border: 1px solid var(--grey-200); }
  .info-cell-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .3px; color: var(--grey-600); margin-bottom: 3px; }
  .info-cell-value { font-size: 14px; font-weight: 600; color: var(--grey-900); word-break: break-word; }
  .divider { height: 1px; background: var(--grey-200); margin: 18px 0; }

  /* ── Observations ── */
  .obs-heading { font-size: 15px; font-weight: 700; color: var(--grey-900); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .grade-row { display: flex; gap: 7px; flex-wrap: wrap; }
  .grade-btn {
    padding: 8px 13px; border-radius: 20px; border: 1.5px solid var(--grey-300);
    background: var(--white); color: var(--grey-700); cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 600; transition: all .15s;
  }
  .grade-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
  .grade-btn.active { background: var(--blue); color: white; border-color: var(--blue); }

  /* ── API key notice ── */
  .api-notice {
    background: var(--blue-light); border: 1px solid #a8c7fa;
    border-radius: var(--radius-lg); padding: 14px 16px; margin-bottom: 14px;
    font-size: 14px; color: var(--blue); display: flex; gap: 10px; align-items: flex-start;
  }

  /* ── Collection ── */
  .col-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .col-count { font-size: 14px; font-weight: 600; color: var(--grey-700); }
  .export-row { display: flex; gap: 8px; }
  .export-btn {
    padding: 8px 16px; border-radius: 20px; border: 1.5px solid var(--grey-300);
    background: white; color: var(--grey-800); cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 600; transition: all .15s;
  }
  .export-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
  .empty { text-align: center; padding: 60px 20px; }
  .empty-icon { font-size: 52px; margin-bottom: 14px; opacity: .35; }
  .empty-text { font-size: 16px; font-weight: 600; color: var(--grey-600); line-height: 1.5; }
  .coll-card {
    background: var(--white); border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1); padding: 14px; margin-bottom: 10px;
    display: flex; gap: 12px; align-items: flex-start;
    border: 1.5px solid var(--grey-200); transition: box-shadow .15s;
  }
  .coll-card:hover { box-shadow: var(--shadow-2); }
  .coll-thumb { width: 52px; height: 52px; border-radius: var(--radius); object-fit: cover; background: var(--grey-100); border: 1px solid var(--grey-200); flex-shrink: 0; }
  .coll-thumb-ph { width: 52px; height: 52px; border-radius: var(--radius); background: var(--grey-100); border: 1px solid var(--grey-200); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .coll-info { flex: 1; min-width: 0; }
  .coll-title { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--grey-900); }
  .coll-artist { font-size: 13px; color: var(--blue); font-weight: 600; margin-top: 2px; }
  .coll-meta { font-size: 12px; color: var(--grey-600); margin-top: 2px; }
  .coll-grades { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 6px; }
  .coll-grade {
    font-size: 11px; font-weight: 700; background: var(--grey-100);
    border: 1px solid var(--grey-200); padding: 2px 8px; border-radius: 4px; color: var(--grey-700);
  }
  .coll-actions { display: flex; gap: 6px; flex-shrink: 0; }
  .icon-btn {
    background: none; border: 1px solid var(--grey-200); color: var(--grey-600);
    cursor: pointer; font-size: 15px; padding: 6px 8px; border-radius: var(--radius);
    transition: all .15s; line-height: 1;
  }
  .icon-btn:hover { background: var(--grey-100); border-color: var(--grey-400); color: var(--grey-900); }
  .icon-btn.del:hover { background: var(--red-light); border-color: var(--red); color: var(--red); }

  /* ── Modal ── */
  .modal-backdrop { position: fixed; inset: 0; background: rgba(32,33,36,.6); z-index: 200; display: flex; align-items: flex-end; justify-content: center; }
  .modal {
    background: var(--white); border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto;
    padding: 0 0 40px;
  }
  .modal-handle { width: 36px; height: 4px; background: var(--grey-300); border-radius: 2px; margin: 14px auto 0; }
  .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--grey-200); }
  .modal-title { font-size: 16px; font-weight: 700; color: var(--grey-900); }
  .modal-close { background: var(--grey-100); border: none; color: var(--grey-700); padding: 7px 14px; border-radius: 20px; cursor: pointer; font-family: inherit; font-size: 13px; font-weight: 600; transition: all .15s; }
  .modal-close:hover { background: var(--grey-200); }
  .modal-body { padding: 4px 20px 0; }
  .modal-section { font-size: 11px; font-weight: 700; color: var(--grey-600); letter-spacing: .3px; text-transform: uppercase; margin: 18px 0 12px; padding-bottom: 6px; border-bottom: 2px solid var(--grey-100); }
  .modal-actions { display: flex; gap: 10px; padding: 16px 20px 0; border-top: 1px solid var(--grey-200); margin-top: 16px; }

  /* ── Spinner ── */
  .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(26,115,232,.3); border-top-color: var(--blue); border-radius: 50%; animation: rotate .7s linear infinite; }
  @keyframes rotate { to { transform: rotate(360deg); } }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--grey-800); color: white; padding: 12px 22px;
    border-radius: 24px; font-size: 14px; font-weight: 600;
    z-index: 999; box-shadow: var(--shadow-3);
    animation: toastIn .25s ease;
  }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
`;

// ── helpers ──────────────────────────────────────────────────────────────────

const CSV_HEADERS = ["Artist","Title","Label","Country","Year","Genre","Styles","Discogs URL","Vinyl Grade","Sleeve Grade","Tag Line","Description","MP3 Name","Location Code"];

function recordToRow(r) {
  return {
    "Artist":r.artist,"Title":r.title,"Label":r.label,"Country":r.country,
    "Year":r.year,"Genre":r.genre,"Styles":r.styles,"Discogs URL":r.discogsUrl,
    "Vinyl Grade":r.vinylGrade,"Sleeve Grade":r.sleeveGrade,"Tag Line":r.tagLine,
    "Description":r.description,"MP3 Name":r.mp3Name,"Location Code":r.locationCode
  };
}
function toCSV(records) {
  const rows = records.map(r => CSV_HEADERS.map(h => `"${String(recordToRow(r)[h]||"").replace(/"/g,'""')}"`).join(","));
  return [CSV_HEADERS.join(","), ...rows].join("\n");
}
function dlFile(content, filename, mime) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], {type:mime}));
  a.download = filename; a.click();
}

async function callClaude(apiKey, payload) {
  const res = await fetch("/api/claude", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({apiKey, payload})
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Proxy error ${res.status}: ${t}`); }
  const data = await res.json();
  if (data.error) throw new Error(`Claude API: ${JSON.stringify(data.error)}`);
  return data;
}

async function fetchDiscogs(url, token) {
  const headers = {"User-Agent":"VinylCataloguer/1.0"};
  if (token) headers["Authorization"] = `Discogs token=${token}`;
  const proxies = [
    u => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
    u => u,
  ];
  let lastErr = "";
  for (const makeUrl of proxies) {
    try {
      const r = await fetch(makeUrl(url), {headers, signal:AbortSignal.timeout(8000)});
      if (!r.ok) { lastErr = `HTTP ${r.status}`; continue; }
      const text = await r.text();
      try { const j = JSON.parse(text); return j.contents ? JSON.parse(j.contents) : j; }
      catch(e) { lastErr = `Parse error: ${e.message}`; continue; }
    } catch(e) { lastErr = e.message; continue; }
  }
  throw new Error(`Discogs unreachable. ${lastErr}`);
}

// Google Custom Search for reverse image lookup within discogs.com
async function googleImageSearch(imageFile, googleApiKey, googleCxId) {
  // Upload image to get a public URL isn't possible client-side, so we use
  // the image as base64 and search by visual description via Claude,
  // then cross-reference with Google Custom Search
  throw new Error("Not implemented directly — see instructions below");
}

// ── ObsForm ──────────────────────────────────────────────────────────────────

function ObsForm({ vinylGrade, setVinylGrade, sleeveGrade, setSleeveGrade,
                   tagLine, setTagLine, description, setDescription,
                   mp3Name, setMp3Name, locationCode, setLocationCode,
                   discogsUrl, setDiscogsUrl, onAdd }) {
  return (
    <>
      <div className="divider"/>
      <div className="obs-heading">📝 Your observations</div>

      <div className="field-group">
        <label className="field-label">Vinyl Grade</label>
        <div className="grade-row">{GRADES.map(g=><button key={g} className={`grade-btn ${vinylGrade===g?"active":""}`} onClick={()=>setVinylGrade(g===vinylGrade?"":g)}>{g}</button>)}</div>
      </div>
      <div className="field-group">
        <label className="field-label">Sleeve Grade</label>
        <div className="grade-row">{GRADES.map(g=><button key={g} className={`grade-btn ${sleeveGrade===g?"active":""}`} onClick={()=>setSleeveGrade(g===sleeveGrade?"":g)}>{g}</button>)}</div>
      </div>
      <div className="field-group">
        <label className="field-label">Tag Line</label>
        <input className="field-input" type="text" placeholder="Short tag or note…" value={tagLine} onChange={e=>setTagLine(e.target.value)}/>
      </div>
      <div className="field-group">
        <label className="field-label">Description</label>
        <textarea className="field-textarea" placeholder="Notes about this copy…" value={description} onChange={e=>setDescription(e.target.value)}/>
      </div>
      <div className="field-group">
        <label className="field-label">MP3 Name</label>
        <input className="field-input" type="text" placeholder="linked audio filename…" value={mp3Name} onChange={e=>setMp3Name(e.target.value)}/>
      </div>
      <div className="field-group">
        <label className="field-label">Location Code</label>
        <input className="field-input" type="text" placeholder="e.g. A-3, Shelf 2…" value={locationCode} onChange={e=>setLocationCode(e.target.value)}/>
      </div>
      <div className="field-group">
        <label className="field-label">Discogs URL</label>
        <input className="field-input" type="text" placeholder="https://www.discogs.com/release/…" value={discogsUrl||""} onChange={e=>setDiscogsUrl&&setDiscogsUrl(e.target.value)}/>
      </div>

      <button className="btn btn-green" onClick={onAdd}>+ Add to Collection</button>
    </>
  );
}

// ── EditModal ─────────────────────────────────────────────────────────────────

function EditModal({ record, onSave, onDelete, onClose }) {
  const [fields, setFields] = useState({...record});
  const set = (k,v) => setFields(f=>({...f,[k]:v}));
  return (
    <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-handle"/>
        <div className="modal-header">
          <div className="modal-title">Edit Record</div>
          <button className="modal-close" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <div className="modal-section">Release Info</div>
          {[["artist","Artist"],["title","Title"],["label","Label"],["country","Country"],["year","Year"],["genre","Genre"],["styles","Styles"],["discogsUrl","Discogs URL"]].map(([k,l])=>(
            <div className="field-group" key={k}>
              <label className="field-label">{l}</label>
              <input className="field-input" type="text" value={fields[k]||""} onChange={e=>set(k,e.target.value)}/>
            </div>
          ))}
          <div className="modal-section">Grades</div>
          <div className="field-group">
            <label className="field-label">Vinyl Grade</label>
            <div className="grade-row">{GRADES.map(g=><button key={g} className={`grade-btn ${fields.vinylGrade===g?"active":""}`} onClick={()=>set("vinylGrade",g===fields.vinylGrade?"":g)}>{g}</button>)}</div>
          </div>
          <div className="field-group">
            <label className="field-label">Sleeve Grade</label>
            <div className="grade-row">{GRADES.map(g=><button key={g} className={`grade-btn ${fields.sleeveGrade===g?"active":""}`} onClick={()=>set("sleeveGrade",g===fields.sleeveGrade?"":g)}>{g}</button>)}</div>
          </div>
          <div className="modal-section">Notes</div>
          {[["tagLine","Tag Line","Short tag or note…"],["description","Description","Notes about this copy…"],["mp3Name","MP3 Name","linked audio filename…"],["locationCode","Location Code","e.g. A-3, Shelf 2…"]].map(([k,l,ph])=>(
            <div className="field-group" key={k}>
              <label className="field-label">{l}</label>
              {k==="description"
                ? <textarea className="field-textarea" placeholder={ph} value={fields[k]||""} onChange={e=>set(k,e.target.value)}/>
                : <input className="field-input" type="text" placeholder={ph} value={fields[k]||""} onChange={e=>set(k,e.target.value)}/>
              }
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn btn-danger-outline" onClick={()=>{onDelete(record.id);onClose();}}>🗑 Delete</button>
          <button className="btn btn-save" onClick={()=>{onSave(fields);onClose();}}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function VinylCataloguer() {
  const [tab, setTab] = useState("scan");
  const [showSettings, setShowSettings] = useState(false);
  const [anthropicKey, setAnthropicKey] = useState(()=>localStorage.getItem("vc_anthropic_key")||"");
  const [discogsToken, setDiscogsToken] = useState(()=>localStorage.getItem("vc_discogs_token")||"");
  const [googleApiKey, setGoogleApiKey] = useState(()=>localStorage.getItem("vc_google_key")||"");
  const [googleCxId, setGoogleCxId] = useState(()=>localStorage.getItem("vc_google_cx")||"");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [extracted, setExtracted] = useState(null);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [showFallback, setShowFallback] = useState(false);

  const [manualMode, setManualMode] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [manualSearchQuery, setManualSearchQuery] = useState("");
  const [manualFields, setManualFields] = useState({artist:"",title:"",label:"",country:"",year:"",genre:"",styles:"",discogsUrl:""});

  const [vinylGrade, setVinylGrade] = useState("");
  const [sleeveGrade, setSleeveGrade] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [description, setDescription] = useState("");
  const [mp3Name, setMp3Name] = useState("");
  const [locationCode, setLocationCode] = useState("");
  const [obsDiscogsUrl, setObsDiscogsUrl] = useState("");

  const [collection, setCollection] = useState(()=>{
    try { return JSON.parse(localStorage.getItem("vc_collection")||"[]"); } catch { return []; }
  });
  const [toast, setToast] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const fileRef = useRef();

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),2500); };

  const saveSettings = () => {
    localStorage.setItem("vc_anthropic_key", anthropicKey);
    localStorage.setItem("vc_discogs_token", discogsToken);
    localStorage.setItem("vc_google_key", googleApiKey);
    localStorage.setItem("vc_google_cx", googleCxId);
    showToast("Settings saved ✓");
    setShowSettings(false);
  };

  const updateCollection = fn => {
    setCollection(prev => {
      const next = fn(prev);
      localStorage.setItem("vc_collection", JSON.stringify(next));
      return next;
    });
  };

  const saveEdit = updated => { updateCollection(prev=>prev.map(r=>r.id===updated.id?updated:r)); showToast("Changes saved ✓"); };

  const resetObs = () => { setVinylGrade(""); setSleeveGrade(""); setTagLine(""); setDescription(""); setMp3Name(""); setLocationCode(""); setObsDiscogsUrl(""); };
  const resetScan = () => {
    setImageFile(null); setImagePreview(null); setResults([]);
    setSelected(null); setDetail(null); setStatus(null); setExtracted(null);
    setManualMode(false); setManualUrl(""); setShowFallback(false);
    setManualFields({artist:"",title:"",label:"",country:"",year:"",genre:"",styles:"",discogsUrl:""});
    resetObs();
  };

  const handleImage = file => {
    setImageFile(file); setImagePreview(URL.createObjectURL(file));
    setResults([]); setSelected(null); setDetail(null);
    setExtracted(null); setStatus(null); setManualMode(false); setShowFallback(false);
  };

  // ── Step 1: Claude reads image → Discogs search ──────────────────────────
  const identifyRecord = async () => {
    if (!imageFile) return;
    if (!anthropicKey) { setStatus({type:"err",msg:"No Claude API key",detail:"Open Settings and add your Claude API key (sk-ant-…)"}); return; }
    setStatus({type:"loading",msg:"Step 1 of 2 — Reading image with Claude Vision…"});
    setResults([]); setSelected(null); setDetail(null); setExtracted(null); setManualMode(false); setShowFallback(false);
    try {
      const base64 = await new Promise((res,rej)=>{
        const reader = new FileReader();
        reader.onload = ()=>res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(imageFile);
      });
      let vd;
      try {
        vd = await callClaude(anthropicKey, {
          model:"claude-sonnet-4-20250514", max_tokens:600,
          messages:[{role:"user",content:[
            {type:"image",source:{type:"base64",media_type:imageFile.type||"image/jpeg",data:base64}},
            {type:"text",text:`Look at this vinyl record photo and extract all identifying info visible.
Return ONLY raw JSON, no markdown, no backticks:
{"artist":"","title":"","label":"","catno":"","barcode":"","country":"","year":"","notes":""}`}
          ]}]
        });
      } catch(e) { throw new Error(`Claude Vision failed: ${e.message}`); }

      const rawText = vd.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      let ext;
      try { ext = JSON.parse(rawText); }
      catch(e) { throw new Error(`Couldn't parse Claude response. Raw: "${rawText.slice(0,200)}"`); }
      setExtracted(ext);

      const q = [ext.artist,ext.title,ext.label,ext.catno].filter(Boolean).join(" ").trim();
      if (!q) throw new Error("Claude read the image but found no identifying text. Try a clearer photo of the record label.");

      setStatus({type:"loading",msg:`Step 2 of 2 — Searching Discogs for "${q.slice(0,40)}…"`});
      const params = new URLSearchParams({q, type:"release", per_page:"8"});
      if (ext.artist) params.set("artist", ext.artist);
      if (ext.title) params.set("release_title", ext.title);

      let searchData;
      try { searchData = await fetchDiscogs(`https://api.discogs.com/database/search?${params}`, discogsToken); }
      catch(e) { throw new Error(`Discogs search failed: ${e.message}`); }

      if (!searchData.results?.length) {
        setStatus({type:"err",msg:`No Discogs results found for "${q}"`,detail:"Try the fallback options below."});
        setShowFallback(true); return;
      }
      setResults(searchData.results.slice(0,8));
      setStatus({type:"ok",msg:`Found ${Math.min(searchData.results.length,8)} releases — tap the one you have`});
    } catch(e) {
      console.error("[VinylCataloguer]", e);
      setStatus({type:"err",msg:"Identification failed",detail:e.message});
      setShowFallback(true);
    }
  };

  // ── Step 2 fallback: Google reverse image search within discogs.com ───────
  const googleReverseSearch = async () => {
    if (!googleApiKey || !googleCxId) {
      setStatus({type:"err", msg:"Google API not configured", detail:"Add your Google API Key and Custom Search Engine ID in Settings. See the setup guide below."});
      setShowFallback(true); return;
    }
    if (!imageFile) return;
    setStatus({type:"loading", msg:"Running Google reverse image search on Discogs…"});
    try {
      // We use Claude to describe the image visually, then Google text-search within discogs.com
      const base64 = await new Promise((res,rej)=>{
        const reader = new FileReader();
        reader.onload = ()=>res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(imageFile);
      });

      // Ask Claude for a visual description good for image search
      const vd = await callClaude(anthropicKey, {
        model:"claude-sonnet-4-20250514", max_tokens:200,
        messages:[{role:"user",content:[
          {type:"image",source:{type:"base64",media_type:imageFile.type||"image/jpeg",data:base64}},
          {type:"text",text:"Describe this vinyl record cover or label in a short search query (max 10 words) that would help find it on Discogs. Focus on any visible artist name, album title, label, or catalog number. Return only the search query, nothing else."}
        ]}]
      });
      const query = vd.content.map(b=>b.text||"").join("").trim().replace(/["']/g,"");

      setStatus({type:"loading", msg:`Searching Google for "${query}" within discogs.com…`});

      // Google Custom Search API — site:discogs.com
      const gParams = new URLSearchParams({
        key: googleApiKey,
        cx: googleCxId,
        q: `site:discogs.com/release ${query}`,
        num: "8"
      });
      const gRes = await fetch(`https://www.googleapis.com/customsearch/v1?${gParams}`);
      const gData = await gRes.json();

      if (gData.error) throw new Error(`Google API error: ${gData.error.message}`);
      if (!gData.items?.length) {
        setStatus({type:"err", msg:`No Google results for "${query}" on Discogs`, detail:"Try the manual search or paste a Discogs URL directly."});
        return;
      }

      // Parse Discogs release IDs from Google results
      const googleResults = gData.items
        .map(item => {
          const match = item.link.match(/discogs\.com\/.*?\/release\/(\d+)/);
          const id = match?.[1];
          return id ? {
            id: parseInt(id),
            title: item.title.replace(/ \| Discogs$/, ""),
            snippet: item.snippet,
            link: item.link,
            thumb: item.pagemap?.cse_image?.[0]?.src || ""
          } : null;
        })
        .filter(Boolean)
        .slice(0, 8);

      if (!googleResults.length) {
        setStatus({type:"err", msg:"Found Google results but couldn't extract Discogs release IDs", detail:"Try pasting a Discogs URL manually."});
        return;
      }

      setResults(googleResults.map(r => ({
        id: r.id,
        title: r.title,
        cover_image: r.thumb,
        thumb: r.thumb,
        label: "",
        year: "",
        country: "",
        format: [],
        genre: [],
        _fromGoogle: true,
        _snippet: r.snippet
      })));
      setStatus({type:"ok", msg:`Found ${googleResults.length} Discogs matches via Google — tap the one you have`});

    } catch(e) {
      console.error("[GoogleSearch]", e);
      setStatus({type:"err", msg:"Google search failed", detail:e.message});
    }
  };

  const selectRelease = async release => {
    setSelected(release); setManualMode(false); setShowFallback(false);
    setStatus({type:"loading", msg:"Loading full release details from Discogs…"});
    try {
      const data = await fetchDiscogs(`https://api.discogs.com/releases/${release.id}`, discogsToken);
      setDetail(data);
      setObsDiscogsUrl(`https://www.discogs.com/release/${release.id}`);
      setStatus({type:"ok", msg:"Release loaded — add your observations below"});
    } catch(e) {
      setDetail(null);
      setObsDiscogsUrl(`https://www.discogs.com/release/${release.id}`);
      setStatus({type:"ok", msg:"Basic info shown — add observations below", detail:`Full detail unavailable: ${e.message}`});
    }
  };

  const activateManual = () => {
    setManualMode("fields"); setSelected(null); setDetail(null); setShowFallback(false);
    if (extracted) setManualFields(f=>({...f,artist:extracted.artist||"",title:extracted.title||"",label:extracted.label||"",country:extracted.country||"",year:extracted.year||""}));
  };

  const lookupManualUrl = async () => {
    const match = manualUrl.match(/discogs\.com\/.*?(\d{4,})/);
    if (!match) { setStatus({type:"err",msg:"Invalid URL",detail:"Paste a Discogs release URL, e.g. https://www.discogs.com/release/12345"}); return; }
    setStatus({type:"loading",msg:"Loading Discogs release…"});
    try {
      const data = await fetchDiscogs(`https://api.discogs.com/releases/${match[1]}`, discogsToken);
      setManualFields({artist:data.artists_sort||"",title:data.title||"",label:data.labels?.[0]?.name||"",country:data.country||"",year:String(data.year||""),genre:(data.genres||[]).join(", "),styles:(data.styles||[]).join(", "),discogsUrl:`https://www.discogs.com/release/${match[1]}`});
      setStatus({type:"ok",msg:"Release loaded — add observations below"});
    } catch(e) { setStatus({type:"err",msg:"Couldn't fetch that URL",detail:e.message}); }
  };

  const manualSearch = async () => {
    if (!manualSearchQuery.trim()) return;
    setStatus({type:"loading",msg:`Searching Discogs for "${manualSearchQuery}"…`});
    try {
      const params = new URLSearchParams({q:manualSearchQuery,type:"release",per_page:"8"});
      const data = await fetchDiscogs(`https://api.discogs.com/database/search?${params}`, discogsToken);
      if (!data.results?.length) { setStatus({type:"err",msg:"No results found",detail:"Try different search terms"}); return; }
      setResults(data.results.slice(0,8));
      setManualMode(false); setShowFallback(false);
      setStatus({type:"ok",msg:`Found ${Math.min(data.results.length,8)} releases — tap the one you have`});
    } catch(e) { setStatus({type:"err",msg:"Discogs search failed",detail:e.message}); }
  };

  const addToCollection = source => {
    let entry;
    if (source==="manual") {
      entry = {id:Date.now(),...manualFields,thumb:"",vinylGrade,sleeveGrade,tagLine,description,mp3Name,locationCode};
    } else {
      const d=detail||{}; const s=selected||{};
      entry = {
        id:Date.now(),
        artist:d.artists_sort||s.title?.split(" - ")[0]||"",
        title:d.title||s.title||"",
        label:d.labels?.[0]?.name||s.label||"",
        country:d.country||s.country||"",
        year:String(d.year||s.year||""),
        genre:(d.genres||s.genre||[]).join(", "),
        styles:(d.styles||[]).join(", "),
        discogsUrl:obsDiscogsUrl||`https://www.discogs.com/release/${d.id||s.id}`,
        thumb:s.cover_image||s.thumb||"",
        vinylGrade,sleeveGrade,tagLine,description,mp3Name,locationCode
      };
    }
    updateCollection(prev=>[entry,...prev]);
    showToast("Added to collection ✓");
    resetScan(); setTab("collection");
  };

  const d=detail||{}; const s=selected||{};
  const coverImg=s.cover_image||s.thumb||"";
  const dispArtist=d.artists_sort||s.title?.split(" - ")[0]||"";
  const dispTitle=d.title||s.title||"";
  const dispLabel=d.labels?.[0]?.name||s.label||"";
  const dispCountry=d.country||s.country||"";
  const dispYear=d.year||s.year||"";
  const dispGenre=(d.genres||s.genre||[]).join(", ");
  const dispStyles=(d.styles||[]).join(", ");

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* ── Header ── */}
        <div className="header">
          <div className="header-top">
            <div className="logo">
              <div className="logo-icon">🎵</div>
              <div>
                <div className="logo-text">Grooves</div>
                <div className="logo-sub">Vinyl Cataloguer</div>
              </div>
            </div>
            <button className="settings-btn" onClick={()=>setShowSettings(v=>!v)}>
              ⚙ {showSettings ? "Close" : "Settings"}
            </button>
          </div>
          <div className="tabs">
            <div className={`tab ${tab==="scan"?"active":""}`} onClick={()=>setTab("scan")}>
              📷 Scan
            </div>
            <div className={`tab ${tab==="collection"?"active":""}`} onClick={()=>setTab("collection")}>
              🗂 Collection {collection.length > 0 && `(${collection.length})`}
            </div>
          </div>
        </div>

        <div className="content">

          {/* ── Settings panel ── */}
          {showSettings && (
            <div className="card">
              <div className="card-title">⚙ Settings</div>

              <div className="field-group">
                <label className="field-label">Claude API Key</label>
                <input className="field-input" type="password" placeholder="sk-ant-…" value={anthropicKey} onChange={e=>setAnthropicKey(e.target.value)}/>
                <div className="hint">For image recognition. Get yours at console.anthropic.com → API Keys</div>
              </div>

              <div className="field-group">
                <label className="field-label">Discogs Personal Access Token</label>
                <input className="field-input" type="password" placeholder="Your Discogs token" value={discogsToken} onChange={e=>setDiscogsToken(e.target.value)}/>
                <div className="hint">Get yours at discogs.com → Settings → Developers → Generate token</div>
              </div>

              <div className="field-group">
                <label className="field-label">Google API Key (for reverse image search)</label>
                <input className="field-input" type="password" placeholder="AIza…" value={googleApiKey} onChange={e=>setGoogleApiKey(e.target.value)}/>
              </div>

              <div className="field-group">
                <label className="field-label">Google Custom Search Engine ID</label>
                <input className="field-input" type="text" placeholder="e.g. 017576662512468239146:omuauf_lfve" value={googleCxId} onChange={e=>setGoogleCxId(e.target.value)}/>
                <div className="hint">
                  To create a Google API key + Search Engine ID:<br/>
                  1. Go to <strong>console.cloud.google.com</strong> → Create project<br/>
                  2. Enable <strong>Custom Search API</strong><br/>
                  3. Create credentials → API Key → copy it above<br/>
                  4. Go to <strong>programmablesearchengine.google.com</strong><br/>
                  5. Create new search engine → Sites to search: <strong>discogs.com/release/*</strong><br/>
                  6. Copy the Search Engine ID (cx) above
                </div>
              </div>

              <button className="btn btn-primary" style={{width:"100%",borderRadius:"8px",padding:"14px"}} onClick={saveSettings}>
                Save Settings
              </button>
            </div>
          )}

          {/* ── Scan tab ── */}
          {tab==="scan" && (
            <>
              {!anthropicKey && (
                <div className="api-notice">
                  <span>ℹ️</span>
                  <span>Open <strong>Settings</strong> and add your Claude API key to enable image recognition.</span>
                </div>
              )}

              {/* Camera / upload */}
              <div className="card" style={{padding:0,overflow:"hidden"}}>
                <div className="capture-zone" style={{borderRadius:"12px",border:"none",margin:0,aspectRatio:"4/3"}} onClick={()=>fileRef.current.click()}>
                  {imagePreview
                    ? <><img src={imagePreview} alt="record"/><div className="capture-overlay"><span style={{fontSize:28}}>🔄</span><span>Tap to change photo</span></div></>
                    : <><div className="capture-icon">📷</div><div className="capture-text">Tap to photograph your record</div><div className="capture-hint">sleeve · label · barcode · catalog number</div></>
                  }
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>e.target.files[0]&&handleImage(e.target.files[0])}/>

              <div className="btn-row">
                <button className="btn btn-secondary" onClick={()=>{const i=document.createElement("input");i.type="file";i.accept="image/*";i.onchange=e=>e.target.files[0]&&handleImage(e.target.files[0]);i.click();}}>
                  📁 Upload
                </button>
                <button className="btn btn-primary" disabled={!imagePreview||status?.type==="loading"} onClick={identifyRecord}>
                  {status?.type==="loading" ? <><span className="spinner"/> Identifying…</> : "🔍 Identify Record"}
                </button>
              </div>

              {/* Status */}
              {status && (
                <>
                  <div className={`status-bar status-${status.type}`}>
                    <span className="status-icon">{status.type==="loading"?"⏳":status.type==="ok"?"✅":"❌"}</span>
                    <span>{status.msg}</span>
                  </div>
                  {status.detail && <div className="error-detail">{status.detail}</div>}
                </>
              )}

              {/* Extracted data */}
              {extracted && (
                <div className="extracted-box">
                  <div className="extracted-label">Read from image</div>
                  {Object.entries(extracted).filter(([,v])=>v).map(([k,v])=>(
                    <div className="extracted-row" key={k}>
                      <span className="extracted-key">{k}</span>
                      <span className="extracted-val">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fallback options */}
              {showFallback && !selected && (
                <div className="fallback-card">
                  <div className="fallback-title">⚡ Try a different approach</div>
                  <div className="fallback-btns">
                    <button className="fallback-btn" onClick={googleReverseSearch}>
                      <span className="fallback-btn-icon">🔍</span>
                      <span className="fallback-btn-text">
                        <span style={{display:"block",fontWeight:700}}>Google Reverse Image Search</span>
                        <span className="fallback-btn-sub">Searches Google Images within discogs.com</span>
                      </span>
                    </button>
                    <button className="fallback-btn" onClick={()=>{setManualMode("url");setShowFallback(false);}}>
                      <span className="fallback-btn-icon">🔗</span>
                      <span className="fallback-btn-text">
                        <span style={{display:"block",fontWeight:700}}>Paste a Discogs URL</span>
                        <span className="fallback-btn-sub">Find it on discogs.com, paste the link here</span>
                      </span>
                    </button>
                    <button className="fallback-btn" onClick={activateManual}>
                      <span className="fallback-btn-icon">✏️</span>
                      <span className="fallback-btn-text">
                        <span style={{display:"block",fontWeight:700}}>Enter details manually</span>
                        <span className="fallback-btn-sub">Type the release info yourself</span>
                      </span>
                    </button>
                  </div>
                  {/* Manual search always available */}
                  <div style={{marginTop:12}}>
                    <div style={{fontSize:13,fontWeight:600,color:"var(--orange)",marginBottom:6}}>Or search Discogs by text:</div>
                    <div className="search-row">
                      <input className="search-input" placeholder="Artist, title, catalog number…" value={manualSearchQuery} onChange={e=>setManualSearchQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&manualSearch()}/>
                      <button className="search-btn" onClick={manualSearch}>Search</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Paste URL mode */}
              {manualMode==="url" && (
                <div className="detail-panel" style={{marginTop:14}}>
                  <div style={{fontWeight:700,marginBottom:14}}>Paste Discogs Release URL</div>
                  <div className="field-group">
                    <input className="field-input" type="text" placeholder="https://www.discogs.com/release/12345" value={manualUrl} onChange={e=>setManualUrl(e.target.value)}/>
                  </div>
                  <button className="btn btn-primary" style={{width:"100%",borderRadius:8,padding:14}} onClick={lookupManualUrl}>
                    Load from Discogs
                  </button>
                  {manualFields.title && (
                    <>
                      <div className="info-grid" style={{marginTop:14}}>
                        {[["Artist",manualFields.artist],["Title",manualFields.title],["Label",manualFields.label],["Country",manualFields.country],["Year",manualFields.year],["Genre",manualFields.genre]].map(([k,v])=>v?(<div className="info-cell" key={k}><div className="info-cell-label">{k}</div><div className="info-cell-value">{v}</div></div>):null)}
                      </div>
                      <ObsForm vinylGrade={vinylGrade} setVinylGrade={setVinylGrade} sleeveGrade={sleeveGrade} setSleeveGrade={setSleeveGrade} tagLine={tagLine} setTagLine={setTagLine} description={description} setDescription={setDescription} mp3Name={mp3Name} setMp3Name={setMp3Name} locationCode={locationCode} setLocationCode={setLocationCode} discogsUrl={manualFields.discogsUrl} setDiscogsUrl={u=>setManualFields(f=>({...f,discogsUrl:u}))} onAdd={()=>addToCollection("manual")}/>
                    </>
                  )}
                </div>
              )}

              {/* Full manual entry mode */}
              {manualMode==="fields" && (
                <div className="detail-panel" style={{marginTop:14}}>
                  <div style={{fontWeight:700,marginBottom:14}}>Manual Entry</div>
                  {[["artist","Artist"],["title","Title"],["label","Label"],["country","Country"],["year","Year"],["genre","Genre"],["styles","Styles"],["discogsUrl","Discogs URL"]].map(([k,l])=>(
                    <div className="field-group" key={k}>
                      <label className="field-label">{l}</label>
                      <input className="field-input" type="text" value={manualFields[k]} onChange={e=>setManualFields(f=>({...f,[k]:e.target.value}))}/>
                    </div>
                  ))}
                  <ObsForm vinylGrade={vinylGrade} setVinylGrade={setVinylGrade} sleeveGrade={sleeveGrade} setSleeveGrade={setSleeveGrade} tagLine={tagLine} setTagLine={setTagLine} description={description} setDescription={setDescription} mp3Name={mp3Name} setMp3Name={setMp3Name} locationCode={locationCode} setLocationCode={setLocationCode} discogsUrl={manualFields.discogsUrl} setDiscogsUrl={u=>setManualFields(f=>({...f,discogsUrl:u}))} onAdd={()=>addToCollection("manual")}/>
                </div>
              )}

              {/* Search results */}
              {results.length > 0 && (
                <>
                  <div className="section-label">Select your release</div>
                  {results.map(r=>(
                    <div key={r.id} className={`result-card ${selected?.id===r.id?"selected":""}`} onClick={()=>selectRelease(r)}>
                      {r.cover_image||r.thumb
                        ? <img src={r.cover_image||r.thumb} alt="" className="result-thumb" onError={e=>{e.target.style.display="none"}}/>
                        : <div className="result-thumb-ph">🎵</div>
                      }
                      <div style={{flex:1,minWidth:0}}>
                        <div className="result-title">{r.title}</div>
                        <div className="result-meta">{[r.year,r.country,r.label].filter(Boolean).join(" · ")}</div>
                        {r._snippet && <div className="result-meta" style={{marginTop:3,fontStyle:"italic"}}>{r._snippet.slice(0,80)}…</div>}
                        <div>{r.format?.map((f,i)=><span key={i} className="badge">{f}</span>)}{r.genre?.map((g,i)=><span key={i} className="badge">{g}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Selected release detail + observations */}
              {selected && (
                <div className="detail-panel">
                  <div className="detail-header">
                    {coverImg ? <img src={coverImg} alt="" className="detail-cover" onError={e=>{e.target.style.display="none"}}/> : <div className="detail-cover-ph">🎵</div>}
                    <div style={{flex:1}}>
                      <div className="detail-title">{dispTitle}</div>
                      <div className="detail-artist">{dispArtist}</div>
                      <a className="detail-link" href={`https://www.discogs.com/release/${selected.id}`} target="_blank" rel="noreferrer">
                        discogs.com/release/{selected.id} ↗
                      </a>
                    </div>
                  </div>
                  <div className="info-grid">
                    {[["Label",dispLabel],["Country",dispCountry],["Year",dispYear],["Genre",dispGenre],["Styles",dispStyles]].map(([k,v])=>v?(<div className="info-cell" key={k}><div className="info-cell-label">{k}</div><div className="info-cell-value">{v}</div></div>):null)}
                  </div>
                  <ObsForm vinylGrade={vinylGrade} setVinylGrade={setVinylGrade} sleeveGrade={sleeveGrade} setSleeveGrade={setSleeveGrade} tagLine={tagLine} setTagLine={setTagLine} description={description} setDescription={setDescription} mp3Name={mp3Name} setMp3Name={setMp3Name} locationCode={locationCode} setLocationCode={setLocationCode} discogsUrl={obsDiscogsUrl} setDiscogsUrl={setObsDiscogsUrl} onAdd={()=>addToCollection("release")}/>
                </div>
              )}
            </>
          )}

          {/* ── Collection tab ── */}
          {tab==="collection" && (
            <>
              <div className="col-header">
                <div className="col-count">{collection.length} record{collection.length!==1?"s":""}</div>
                {collection.length > 0 && (
                  <div className="export-row">
                    <button className="export-btn" onClick={()=>dlFile(toCSV(collection),`vinyl-${Date.now()}.csv`,"text/csv")}>↓ CSV</button>
                    <button className="export-btn" onClick={()=>dlFile(JSON.stringify(collection.map(recordToRow),null,2),`vinyl-${Date.now()}.json`,"application/json")}>↓ JSON</button>
                  </div>
                )}
              </div>

              {collection.length===0
                ? <div className="empty"><div className="empty-icon">🎶</div><div className="empty-text">Your collection is empty.<br/>Scan a record to get started.</div></div>
                : collection.map(r=>(
                    <div className="coll-card" key={r.id}>
                      {r.thumb ? <img src={r.thumb} alt="" className="coll-thumb" onError={e=>{e.target.style.display="none"}}/> : <div className="coll-thumb-ph">🎵</div>}
                      <div className="coll-info">
                        <div className="coll-title">{r.title}</div>
                        <div className="coll-artist">{r.artist}</div>
                        <div className="coll-meta">{[r.label,r.country,r.year].filter(Boolean).join(" · ")}</div>
                        <div className="coll-grades">
                          {r.vinylGrade&&<span className="coll-grade">Vinyl: {r.vinylGrade}</span>}
                          {r.sleeveGrade&&<span className="coll-grade">Sleeve: {r.sleeveGrade}</span>}
                          {r.locationCode&&<span className="coll-grade">{r.locationCode}</span>}
                        </div>
                      </div>
                      <div className="coll-actions">
                        <button className="icon-btn" onClick={()=>setEditingRecord(r)} title="Edit">✏️</button>
                        <button className="icon-btn del" onClick={()=>updateCollection(prev=>prev.filter(x=>x.id!==r.id))} title="Delete">🗑</button>
                      </div>
                    </div>
                  ))
              }
            </>
          )}
        </div>

        {toast && <div className="toast">{toast}</div>}
        {editingRecord && <EditModal record={editingRecord} onSave={saveEdit} onDelete={id=>{updateCollection(prev=>prev.filter(x=>x.id!==id));showToast("Deleted");}} onClose={()=>setEditingRecord(null)}/>}
      </div>
    </>
  );
}
