import { useState, useRef } from "react";

const GRADES = ["M", "NM", "VG+", "VG", "G+", "G", "F", "P"];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #0e0c0a; --deep: #161310; --card: #1e1a16; --border: #2e2720;
    --amber: #c8883a; --amber-light: #e8a550; --amber-dim: #7a4f1e;
    --cream: #e8ddc8; --muted: #6b5f50; --groove: #252018;
    --success: #4a9a6a; --danger: #a04040;
  }
  body { background: var(--black); font-family: 'DM Sans', sans-serif; color: var(--cream); min-height: 100vh; }
  .app { max-width: 480px; margin: 0 auto; min-height: 100vh; background: var(--black); }
  .header { padding: 20px 20px 0; border-bottom: 1px solid var(--border); background: var(--deep); position: sticky; top: 0; z-index: 100; }
  .header-top { display: flex; align-items: center; justify-content: space-between; padding-bottom: 14px; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-disc { width: 32px; height: 32px; border-radius: 50%; background: conic-gradient(from 0deg,#1a1510,#3a2e20,#1a1510,#2e2418,#1a1510); border: 2px solid var(--amber-dim); display: flex; align-items: center; justify-content: center; animation: spin 8s linear infinite; }
  .logo-disc::after { content:''; width:8px; height:8px; border-radius:50%; background:var(--amber); }
  @keyframes spin { to { transform: rotate(360deg); } }
  .logo-text { font-family:'Playfair Display',serif; font-size:18px; color:var(--amber-light); }
  .logo-sub { font-family:'DM Mono',monospace; font-size:9px; color:var(--muted); letter-spacing:.15em; text-transform:uppercase; margin-top:1px; }
  .settings-btn { background:none; border:1px solid var(--border); color:var(--muted); padding:6px 12px; border-radius:4px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; cursor:pointer; transition:all .2s; }
  .settings-btn:hover { border-color:var(--amber-dim); color:var(--amber); }
  .tabs { display:flex; }
  .tab { flex:1; padding:10px; text-align:center; cursor:pointer; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); border-bottom:2px solid transparent; transition:all .2s; }
  .tab.active { color:var(--amber-light); border-bottom-color:var(--amber); }
  .content { padding:20px; padding-bottom:60px; }
  .settings-panel { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:20px; margin-bottom:20px; }
  .settings-panel h3 { font-family:'Playfair Display',serif; font-size:14px; color:var(--amber-light); margin-bottom:14px; }
  .field-label { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:6px; display:block; }
  .field-input { width:100%; background:var(--deep); border:1px solid var(--border); color:var(--cream); font-family:'DM Mono',monospace; font-size:13px; padding:10px 12px; border-radius:4px; outline:none; transition:border-color .2s; }
  .field-input:focus { border-color:var(--amber-dim); }
  .field-input::placeholder { color:var(--muted); }
  .hint { font-family:'DM Mono',monospace; font-size:10px; color:var(--muted); margin-top:5px; line-height:1.5; }
  .capture-zone { border:2px dashed var(--border); border-radius:8px; aspect-ratio:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; cursor:pointer; transition:all .2s; position:relative; overflow:hidden; background:var(--deep); }
  .capture-zone:hover { border-color:var(--amber-dim); }
  .capture-zone img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; border-radius:6px; }
  .capture-overlay { position:absolute; inset:0; background:rgba(14,12,10,.7); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; border-radius:6px; }
  .capture-icon { font-size:36px; }
  .capture-text { font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.1em; color:var(--muted); text-align:center; }
  .capture-hint { font-size:10px; color:var(--amber-dim); }
  .btn-row { display:flex; gap:10px; margin-top:14px; }
  .btn { flex:1; padding:12px; border-radius:4px; border:none; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.1em; text-transform:uppercase; cursor:pointer; transition:all .2s; font-weight:500; display:flex; align-items:center; justify-content:center; gap:8px; }
  .btn-primary { background:var(--amber); color:var(--black); }
  .btn-primary:hover { background:var(--amber-light); }
  .btn-primary:disabled { opacity:.5; cursor:not-allowed; }
  .btn-secondary { background:transparent; border:1px solid var(--border); color:var(--muted); }
  .btn-secondary:hover { border-color:var(--amber-dim); color:var(--amber); }
  .btn-ghost { background:transparent; border:1px solid var(--amber-dim); color:var(--amber-dim); font-size:10px; padding:9px; }
  .btn-ghost:hover { border-color:var(--amber); color:var(--amber); }
  .btn-success { background:var(--success); color:white; width:100%; margin-top:6px; }
  .btn-success:hover { filter:brightness(1.1); }
  .status-bar { background:var(--groove); border:1px solid var(--border); border-radius:4px; padding:10px 14px; margin-top:14px; font-family:'DM Mono',monospace; font-size:11px; color:var(--muted); display:flex; align-items:flex-start; gap:8px; }
  .status-dot { width:6px; height:6px; border-radius:50%; background:var(--amber); flex-shrink:0; margin-top:3px; }
  .status-dot.pulsing { animation:pulse 1s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.2} }
  .status-dot.green { background:var(--success); }
  .status-dot.red { background:var(--danger); }
  .error-detail { background:var(--deep); border:1px solid var(--danger); border-radius:4px; padding:10px 12px; margin-top:8px; font-family:'DM Mono',monospace; font-size:10px; color:#d08080; line-height:1.6; word-break:break-all; }
  .error-detail strong { color:var(--danger); display:block; margin-bottom:4px; }
  .results-section { margin-top:20px; }
  .section-label { font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:var(--amber); margin-bottom:12px; }
  .result-card { background:var(--card); border:1px solid var(--border); border-radius:6px; padding:14px; margin-bottom:8px; cursor:pointer; transition:all .2s; display:flex; gap:12px; align-items:flex-start; }
  .result-card:hover { border-color:var(--amber-dim); }
  .result-card.selected { border-color:var(--amber); background:var(--groove); }
  .result-thumb { width:52px; height:52px; border-radius:4px; object-fit:cover; background:var(--deep); flex-shrink:0; border:1px solid var(--border); }
  .result-thumb-ph { width:52px; height:52px; border-radius:4px; background:var(--deep); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .result-title { font-family:'Playfair Display',serif; font-size:14px; color:var(--cream); line-height:1.3; }
  .result-meta { font-family:'DM Mono',monospace; font-size:10px; color:var(--muted); margin-top:4px; }
  .badge { display:inline-block; background:var(--border); border-radius:3px; padding:2px 6px; font-family:'DM Mono',monospace; font-size:9px; color:var(--muted); margin-right:4px; margin-top:4px; }
  .detail-panel { background:var(--card); border:1px solid var(--amber-dim); border-radius:8px; padding:18px; margin-top:20px; }
  .detail-header { display:flex; gap:14px; margin-bottom:16px; align-items:flex-start; }
  .detail-cover { width:70px; height:70px; border-radius:4px; object-fit:cover; border:1px solid var(--border); flex-shrink:0; }
  .detail-cover-ph { width:70px; height:70px; border-radius:4px; background:var(--deep); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0; }
  .detail-title { font-family:'Playfair Display',serif; font-size:16px; line-height:1.3; }
  .detail-artist { color:var(--amber-light); font-size:13px; margin-top:3px; }
  .detail-link { font-family:'DM Mono',monospace; font-size:10px; color:var(--amber-dim); text-decoration:none; margin-top:5px; display:block; word-break:break-all; }
  .detail-link:hover { color:var(--amber); }
  .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px; }
  .info-cell { background:var(--deep); border-radius:4px; padding:10px; }
  .info-cell-label { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:3px; }
  .info-cell-value { font-size:13px; color:var(--cream); word-break:break-word; }
  .divider { height:1px; background:var(--border); margin:16px 0; }
  .obs-title { font-family:'Playfair Display',serif; font-size:13px; color:var(--amber); margin-bottom:14px; font-style:italic; }
  .field-group { margin-bottom:14px; }
  .grade-row { display:flex; gap:6px; flex-wrap:wrap; }
  .grade-btn { padding:6px 10px; border-radius:3px; border:1px solid var(--border); background:var(--deep); color:var(--muted); cursor:pointer; font-family:'DM Mono',monospace; font-size:11px; transition:all .15s; }
  .grade-btn:hover { border-color:var(--amber-dim); color:var(--cream); }
  .grade-btn.active { background:var(--amber); color:var(--black); border-color:var(--amber); font-weight:500; }
  .field-textarea { width:100%; background:var(--deep); border:1px solid var(--border); color:var(--cream); font-family:'DM Sans',sans-serif; font-size:13px; padding:10px 12px; border-radius:4px; outline:none; transition:border-color .2s; resize:vertical; min-height:70px; }
  .field-textarea:focus { border-color:var(--amber-dim); }
  .col-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .col-count { font-family:'DM Mono',monospace; font-size:11px; color:var(--muted); }
  .export-row { display:flex; gap:8px; }
  .export-btn { padding:8px 14px; border-radius:4px; border:1px solid var(--border); background:transparent; color:var(--muted); cursor:pointer; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.1em; text-transform:uppercase; transition:all .2s; }
  .export-btn:hover { border-color:var(--amber); color:var(--amber); }
  .empty { text-align:center; padding:60px 20px; }
  .empty-icon { font-size:48px; margin-bottom:12px; opacity:.3; }
  .empty-text { font-family:'Playfair Display',serif; font-style:italic; color:var(--muted); font-size:15px; }
  .coll-card { background:var(--card); border:1px solid var(--border); border-radius:6px; padding:14px; margin-bottom:10px; display:flex; gap:12px; align-items:flex-start; }
  .coll-thumb { width:48px; height:48px; border-radius:4px; object-fit:cover; background:var(--deep); border:1px solid var(--border); flex-shrink:0; }
  .coll-thumb-ph { width:48px; height:48px; border-radius:4px; background:var(--deep); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .coll-info { flex:1; min-width:0; }
  .coll-title { font-family:'Playfair Display',serif; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .coll-artist { font-size:11px; color:var(--amber-light); margin-top:2px; }
  .coll-grades { display:flex; gap:6px; flex-wrap:wrap; margin-top:5px; }
  .coll-grade { font-family:'DM Mono',monospace; font-size:10px; background:var(--border); padding:2px 6px; border-radius:3px; }
  .del-btn { background:none; border:none; color:var(--muted); cursor:pointer; font-size:16px; padding:4px; transition:color .2s; flex-shrink:0; }
  .del-btn:hover { color:var(--danger); }
  .spinner { display:inline-block; width:12px; height:12px; border:2px solid var(--amber-dim); border-top-color:var(--amber); border-radius:50%; animation:rotate .7s linear infinite; }
  @keyframes rotate { to { transform:rotate(360deg); } }
  .toast { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--amber); color:var(--black); padding:10px 20px; border-radius:4px; font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.08em; z-index:999; animation:toastIn .3s ease; white-space:nowrap; }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  .extracted-box { background:var(--groove); border:1px solid var(--border); border-radius:4px; padding:12px; margin-top:14px; }
  .extracted-row { display:flex; justify-content:space-between; font-family:'DM Mono',monospace; font-size:11px; padding:3px 0; border-bottom:1px solid var(--border); }
  .extracted-row:last-child { border-bottom:none; }
  .extracted-key { color:var(--muted); flex-shrink:0; margin-right:12px; }
  .extracted-val { color:var(--cream); text-align:right; word-break:break-word; }
  .manual-note { font-family:'DM Mono',monospace; font-size:10px; color:var(--amber-dim); text-align:center; padding:6px 0 2px; }
  .search-row { display:flex; gap:8px; margin-top:10px; }
  .search-input { flex:1; background:var(--deep); border:1px solid var(--border); color:var(--cream); font-family:'DM Mono',monospace; font-size:12px; padding:10px 12px; border-radius:4px; outline:none; }
  .search-input:focus { border-color:var(--amber-dim); }
  .search-input::placeholder { color:var(--muted); }
  .search-btn { padding:10px 16px; border-radius:4px; border:none; background:var(--amber-dim); color:var(--cream); font-family:'DM Mono',monospace; font-size:11px; cursor:pointer; transition:all .2s; white-space:nowrap; }
  .search-btn:hover { background:var(--amber); color:var(--black); }
  .api-key-notice { background:var(--groove); border:1px solid var(--amber-dim); border-radius:6px; padding:14px; margin-bottom:16px; font-family:'DM Mono',monospace; font-size:11px; color:var(--amber-dim); line-height:1.6; }
  .api-key-notice strong { color:var(--amber); }
  .coll-actions { display:flex; gap:6px; flex-shrink:0; }
  .edit-btn { background:none; border:1px solid var(--border); color:var(--muted); cursor:pointer; font-size:13px; padding:4px 8px; border-radius:3px; transition:all .2s; }
  .edit-btn:hover { border-color:var(--amber-dim); color:var(--amber); }
  .modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:200; display:flex; align-items:flex-end; justify-content:center; }
  .modal { background:var(--deep); border:1px solid var(--border); border-top:2px solid var(--amber-dim); border-radius:12px 12px 0 0; width:100%; max-width:480px; max-height:90vh; overflow-y:auto; padding:24px 20px 40px; }
  .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
  .modal-title { font-family:'Playfair Display',serif; font-size:16px; color:var(--amber-light); }
  .modal-close { background:none; border:1px solid var(--border); color:var(--muted); padding:5px 10px; border-radius:4px; cursor:pointer; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.05em; transition:all .2s; }
  .modal-close:hover { border-color:var(--danger); color:var(--danger); }
  .modal-section { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:var(--amber-dim); margin:18px 0 10px; padding-bottom:6px; border-bottom:1px solid var(--border); }
  .modal-actions { display:flex; gap:10px; margin-top:22px; }
  .btn-save { background:var(--success); color:white; flex:1; }
  .btn-save:hover { filter:brightness(1.1); }
  .btn-danger { background:transparent; border:1px solid var(--danger); color:var(--danger); flex:0 0 auto; padding:12px 14px; }
  .btn-danger:hover { background:var(--danger); color:white; }
`;

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
  const blob = new Blob([content], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Call Claude via our Netlify proxy function (no CORS issues)
async function callClaude(apiKey, payload) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey, payload })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Proxy error ${res.status}: ${text}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(`Claude API error: ${JSON.stringify(data.error)}`);
  }
  return data;
}

async function fetchDiscogs(url, token) {
  const headers = { "User-Agent": "VinylCataloguer/1.0" };
  if (token) headers["Authorization"] = `Discogs token=${token}`;

  const proxies = [
    u => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,
    u => u,
  ];

  let lastErr = "";
  for (const makeUrl of proxies) {
    try {
      const r = await fetch(makeUrl(url), { headers, signal: AbortSignal.timeout(8000) });
      if (!r.ok) { lastErr = `HTTP ${r.status} from ${makeUrl(url)}`; continue; }
      const text = await r.text();
      try {
        const outer = JSON.parse(text);
        if (outer.contents) return JSON.parse(outer.contents);
        return outer;
      } catch(pe) { lastErr = `JSON parse error: ${pe.message}`; continue; }
    } catch(fe) { lastErr = fe.message; continue; }
  }
  throw new Error(`Discogs unreachable. Last error: ${lastErr}`);
}

function ObsForm({ vinylGrade, setVinylGrade, sleeveGrade, setSleeveGrade,
                   tagLine, setTagLine, description, setDescription,
                   mp3Name, setMp3Name, locationCode, setLocationCode,
                   discogsUrl, setDiscogsUrl, onAdd }) {
  return (
    <>
      <div className="divider"/>
      <div className="obs-title">Your observations</div>
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
      <button className="btn btn-success" onClick={onAdd}>+ Add to Collection</button>
    </>
  );
}

// Edit modal for collection items
function EditModal({ record, onSave, onDelete, onClose }) {
  const [fields, setFields] = useState({...record});
  const set = (k,v) => setFields(f=>({...f,[k]:v}));
  return (
    <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Edit Record</div>
          <button className="modal-close" onClick={onClose}>✕ Close</button>
        </div>
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
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={()=>{onDelete(record.id);onClose();}}>🗑 Delete</button>
          <button className="btn btn-save btn" onClick={()=>{onSave(fields);onClose();}}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function VinylCataloguer() {
  const [tab, setTab] = useState("scan");
  const [showSettings, setShowSettings] = useState(false);
  const [anthropicKey, setAnthropicKey] = useState(() => localStorage.getItem("vc_anthropic_key") || "");
  const [discogsToken, setDiscogsToken] = useState(() => localStorage.getItem("vc_discogs_token") || "");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState(null); // {type, msg, detail}
  const [extracted, setExtracted] = useState(null);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);

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

  const [collection, setCollection] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vc_collection") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const fileRef = useRef();

  const saveKeys = () => {
    localStorage.setItem("vc_anthropic_key", anthropicKey);
    localStorage.setItem("vc_discogs_token", discogsToken);
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

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null),2500); };

  const resetObs = () => { setVinylGrade(""); setSleeveGrade(""); setTagLine(""); setDescription(""); setMp3Name(""); setLocationCode(""); setObsDiscogsUrl(""); };
  const resetScan = () => {
    setImageFile(null); setImagePreview(null); setResults([]);
    setSelected(null); setDetail(null); setStatus(null); setExtracted(null);
    setManualMode(false); setManualUrl("");
    setManualFields({artist:"",title:"",label:"",country:"",year:"",genre:"",styles:"",discogsUrl:""});
    resetObs();
  };

  const handleImage = file => {
    setImageFile(file); setImagePreview(URL.createObjectURL(file));
    setResults([]); setSelected(null); setDetail(null);
    setExtracted(null); setStatus(null); setManualMode(false);
  };

  const identifyRecord = async () => {
    if (!imageFile) return;
    if (!anthropicKey) {
      setStatus({type:"err", msg:"No Claude API key found", detail:"Open ⚙ Settings and paste your API key (starts with sk-ant-…)"});
      return;
    }

    setStatus({type:"loading", msg:"Step 1/2 — Reading image with Claude Vision…"});
    setResults([]); setSelected(null); setDetail(null); setExtracted(null); setManualMode(false);

    try {
      // Read image as base64
      const base64 = await new Promise((res,rej)=>{
        const reader = new FileReader();
        reader.onload = ()=>res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(imageFile);
      });

      // Call Claude via proxy
      let vd;
      try {
        vd = await callClaude(anthropicKey, {
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          messages: [{
            role: "user",
            content: [
              { type:"image", source:{ type:"base64", media_type:imageFile.type||"image/jpeg", data:base64 } },
              { type:"text", text:`Look at this vinyl record photo and extract all identifying info visible.
Return ONLY raw JSON, no markdown, no backticks:
{"artist":"","title":"","label":"","catno":"","barcode":"","country":"","year":"","notes":""}` }
            ]
          }]
        });
      } catch(e) {
        throw new Error(`Claude Vision failed: ${e.message}`);
      }

      const rawText = vd.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      let ext;
      try { ext = JSON.parse(rawText); }
      catch(e) { throw new Error(`Couldn't parse Claude response as JSON. Raw response: "${rawText.slice(0,200)}"`); }

      setExtracted(ext);

      const q = [ext.artist,ext.title,ext.label,ext.catno].filter(Boolean).join(" ").trim();
      if (!q) throw new Error("Claude read the image but couldn't find any identifying text (artist, title, label, or catalog number). Try a clearer photo of the record label.");

      setStatus({type:"loading", msg:`Step 2/2 — Searching Discogs for "${q.slice(0,40)}…"`});

      const params = new URLSearchParams({q, type:"release", per_page:"8"});
      if (ext.artist) params.set("artist", ext.artist);
      if (ext.title) params.set("release_title", ext.title);

      let searchData;
      try {
        searchData = await fetchDiscogs(`https://api.discogs.com/database/search?${params}`, discogsToken);
      } catch(e) {
        throw new Error(`Discogs search failed: ${e.message}`);
      }

      if (!searchData.results?.length) {
        setStatus({type:"err", msg:`No Discogs results for "${q}"`, detail:"Try the manual search box below, or paste a Discogs URL directly."});
        return;
      }

      setResults(searchData.results.slice(0,8));
      setStatus({type:"ok", msg:`Found ${Math.min(searchData.results.length,8)} releases — tap the one you have`});

    } catch(e) {
      console.error("[VinylCataloguer]", e);
      setStatus({type:"err", msg:"Identification failed", detail:e.message});
    }
  };

  const selectRelease = async release => {
    setSelected(release); setManualMode(false);
    setStatus({type:"loading", msg:"Loading full release details from Discogs…"});
    try {
      const data = await fetchDiscogs(`https://api.discogs.com/releases/${release.id}`, discogsToken);
      setDetail(data);
      setObsDiscogsUrl(`https://www.discogs.com/release/${release.id}`);
      setStatus({type:"ok", msg:"Release loaded — add your observations below"});
    } catch(e) {
      setDetail(null);
      setStatus({type:"ok", msg:"Showing basic info — add observations below", detail:`Full detail unavailable: ${e.message}`});
    }
  };

  const activateManual = () => {
    setManualMode("fields"); setSelected(null); setDetail(null);
    if (extracted) setManualFields(f=>({...f, artist:extracted.artist||"", title:extracted.title||"", label:extracted.label||"", country:extracted.country||"", year:extracted.year||""}));
  };

  const lookupManualUrl = async () => {
    const match = manualUrl.match(/discogs\.com\/.*?(\d{4,})/);
    if (!match) { setStatus({type:"err", msg:"Invalid URL", detail:"Paste a full Discogs release URL, e.g. https://www.discogs.com/release/12345"}); return; }
    setStatus({type:"loading", msg:"Loading Discogs release…"});
    try {
      const data = await fetchDiscogs(`https://api.discogs.com/releases/${match[1]}`, discogsToken);
      setManualFields({ artist:data.artists_sort||"", title:data.title||"", label:data.labels?.[0]?.name||"", country:data.country||"", year:String(data.year||""), genre:(data.genres||[]).join(", "), styles:(data.styles||[]).join(", "), discogsUrl:`https://www.discogs.com/release/${match[1]}` });
      setStatus({type:"ok", msg:"Release loaded — add observations below"});
    } catch(e) { setStatus({type:"err", msg:"Couldn't fetch that URL", detail:e.message}); }
  };

  const manualSearch = async () => {
    if (!manualSearchQuery.trim()) return;
    setStatus({type:"loading", msg:`Searching Discogs for "${manualSearchQuery}"…`});
    try {
      const params = new URLSearchParams({q:manualSearchQuery, type:"release", per_page:"8"});
      const data = await fetchDiscogs(`https://api.discogs.com/database/search?${params}`, discogsToken);
      if (!data.results?.length) { setStatus({type:"err", msg:"No Discogs results found", detail:"Try different search terms — artist name, album title, or catalog number"}); return; }
      setResults(data.results.slice(0,8));
      setManualMode(false);
      setStatus({type:"ok", msg:`Found ${Math.min(data.results.length,8)} releases — tap the one you have`});
    } catch(e) { setStatus({type:"err", msg:"Discogs search failed", detail:e.message}); }
  };

  const saveEdit = updated => {
    updateCollection(prev => prev.map(r => r.id === updated.id ? updated : r));
    showToast("Changes saved ✓");
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
    updateCollection(prev => [entry, ...prev]);
    showToast("Added to collection ✓");
    resetScan();
    setTab("collection");
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
        <div className="header">
          <div className="header-top">
            <div className="logo">
              <div className="logo-disc"/>
              <div>
                <div className="logo-text">Grooves</div>
                <div className="logo-sub">Vinyl Cataloguer</div>
              </div>
            </div>
            <button className="settings-btn" onClick={()=>setShowSettings(v=>!v)}>
              {showSettings?"✕ Close":"⚙ Settings"}
            </button>
          </div>
          <div className="tabs">
            {[["scan","📷 Scan"],["collection",`🗂 Collection (${collection.length})`]].map(([k,l])=>(
              <div key={k} className={`tab ${tab===k?"active":""}`} onClick={()=>setTab(k)}>{l}</div>
            ))}
          </div>
        </div>

        <div className="content">
          {showSettings && (
            <div className="settings-panel">
              <h3>Settings</h3>
              <div className="field-group">
                <label className="field-label">Claude API Key (for image recognition)</label>
                <input className="field-input" type="password" placeholder="sk-ant-…" value={anthropicKey} onChange={e=>setAnthropicKey(e.target.value)}/>
                <div className="hint">Get yours at console.anthropic.com → API Keys</div>
              </div>
              <div className="field-group" style={{marginTop:14}}>
                <label className="field-label">Discogs Personal Access Token</label>
                <input className="field-input" type="password" placeholder="Your Discogs token" value={discogsToken} onChange={e=>setDiscogsToken(e.target.value)}/>
                <div className="hint">Get yours at discogs.com → Settings → Developers → Generate token</div>
              </div>
              <button className="btn btn-primary" style={{width:"100%",marginTop:16}} onClick={saveKeys}>Save Settings</button>
            </div>
          )}

          {tab==="scan" && (
            <>
              {!anthropicKey && (
                <div className="api-key-notice">
                  ⚙ Open <strong>Settings</strong> above and add your <strong>Claude API key</strong> to enable image recognition.
                </div>
              )}

              <div className="capture-zone" onClick={()=>fileRef.current.click()}>
                {imagePreview
                  ? <><img src={imagePreview} alt="record"/><div className="capture-overlay"><div className="capture-icon">🔄</div><div className="capture-text">Tap to change</div></div></>
                  : <><div className="capture-icon">📷</div><div className="capture-text">Tap to photograph<br/>your record sleeve or label</div><div className="capture-hint">sleeve · label · barcode · catalog no.</div></>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={e=>e.target.files[0]&&handleImage(e.target.files[0])}/>

              <div className="btn-row">
                <button className="btn btn-secondary" onClick={()=>{const i=document.createElement("input");i.type="file";i.accept="image/*";i.onchange=e=>e.target.files[0]&&handleImage(e.target.files[0]);i.click();}}>Upload</button>
                <button className="btn btn-primary" disabled={!imagePreview||status?.type==="loading"} onClick={identifyRecord}>
                  {status?.type==="loading"?<><span className="spinner"/> Identifying…</>:"Identify Record"}
                </button>
              </div>

              {status && (
                <>
                  <div className="status-bar">
                    <div className={`status-dot ${status.type==="loading"?"pulsing":status.type==="ok"?"green":"red"}`}/>
                    <span>{status.msg}</span>
                  </div>
                  {status.detail && (
                    <div className="error-detail">
                      <strong>Details</strong>
                      {status.detail}
                    </div>
                  )}
                </>
              )}

              {(extracted || status?.type==="err") && !selected && !manualMode && (
                <div style={{marginTop:10}}>
                  <div className="manual-note">Can't reach Discogs or no match? Try these:</div>
                  <div className="btn-row" style={{marginTop:6}}>
                    <button className="btn btn-ghost" onClick={activateManual}>✏️ Enter manually</button>
                    <button className="btn btn-ghost" onClick={()=>{setManualMode("url");setSelected(null);}}>🔗 Paste Discogs URL</button>
                  </div>
                  <div className="search-row">
                    <input className="search-input" placeholder="Or search Discogs: artist, title…" value={manualSearchQuery} onChange={e=>setManualSearchQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&manualSearch()}/>
                    <button className="search-btn" onClick={manualSearch}>Search</button>
                  </div>
                </div>
              )}

              {extracted && (
                <div className="extracted-box">
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".15em",textTransform:"uppercase",color:"var(--amber)",marginBottom:8}}>Read from image</div>
                  {Object.entries(extracted).filter(([,v])=>v).map(([k,v])=>(
                    <div className="extracted-row" key={k}>
                      <span className="extracted-key">{k}</span>
                      <span className="extracted-val">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {manualMode==="url" && (
                <div className="detail-panel" style={{marginTop:14}}>
                  <div className="obs-title">Paste Discogs Release URL</div>
                  <div className="field-group">
                    <input className="field-input" type="text" placeholder="https://www.discogs.com/release/12345" value={manualUrl} onChange={e=>setManualUrl(e.target.value)}/>
                  </div>
                  <button className="btn btn-primary" style={{width:"100%"}} onClick={lookupManualUrl}>Load from Discogs</button>
                  {manualFields.title && (
                    <>
                      <div className="divider"/>
                      <div className="info-grid">
                        {[["Artist",manualFields.artist],["Title",manualFields.title],["Label",manualFields.label],["Country",manualFields.country],["Year",manualFields.year],["Genre",manualFields.genre]].map(([k,v])=>v?(<div className="info-cell" key={k}><div className="info-cell-label">{k}</div><div className="info-cell-value">{v}</div></div>):null)}
                      </div>
                      <ObsForm vinylGrade={vinylGrade} setVinylGrade={setVinylGrade} sleeveGrade={sleeveGrade} setSleeveGrade={setSleeveGrade} tagLine={tagLine} setTagLine={setTagLine} description={description} setDescription={setDescription} mp3Name={mp3Name} setMp3Name={setMp3Name} locationCode={locationCode} setLocationCode={setLocationCode} onAdd={()=>addToCollection("manual")}/>
                    </>
                  )}
                </div>
              )}

              {manualMode==="fields" && (
                <div className="detail-panel" style={{marginTop:14}}>
                  <div className="obs-title">Manual Entry</div>
                  {[["artist","Artist"],["title","Title"],["label","Label"],["country","Country"],["year","Year"],["genre","Genre"],["styles","Styles"],["discogsUrl","Discogs URL"]].map(([k,l])=>(
                    <div className="field-group" key={k}>
                      <label className="field-label">{l}</label>
                      <input className="field-input" type="text" value={manualFields[k]} onChange={e=>setManualFields(f=>({...f,[k]:e.target.value}))}/>
                    </div>
                  ))}
                  <ObsForm vinylGrade={vinylGrade} setVinylGrade={setVinylGrade} sleeveGrade={sleeveGrade} setSleeveGrade={setSleeveGrade} tagLine={tagLine} setTagLine={setTagLine} description={description} setDescription={setDescription} mp3Name={mp3Name} setMp3Name={setMp3Name} locationCode={locationCode} setLocationCode={setLocationCode} onAdd={()=>addToCollection("manual")}/>
                </div>
              )}

              {results.length>0 && (
                <div className="results-section">
                  <div className="section-label">Select your release</div>
                  {results.map(r=>(
                    <div key={r.id} className={`result-card ${selected?.id===r.id?"selected":""}`} onClick={()=>selectRelease(r)}>
                      {r.cover_image||r.thumb?<img src={r.cover_image||r.thumb} alt="" className="result-thumb" onError={e=>{e.target.style.display="none"}}/>:<div className="result-thumb-ph">🎵</div>}
                      <div style={{flex:1,minWidth:0}}>
                        <div className="result-title">{r.title}</div>
                        <div className="result-meta">{[r.year,r.country,r.label].filter(Boolean).join(" · ")}</div>
                        <div>{r.format?.map((f,i)=><span key={i} className="badge">{f}</span>)}{r.genre?.map((g,i)=><span key={i} className="badge">{g}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selected && (
                <div className="detail-panel">
                  <div className="detail-header">
                    {coverImg?<img src={coverImg} alt="" className="detail-cover" onError={e=>{e.target.style.display="none"}}/>:<div className="detail-cover-ph">🎵</div>}
                    <div style={{flex:1}}>
                      <div className="detail-title">{dispTitle}</div>
                      <div className="detail-artist">{dispArtist}</div>
                      <a className="detail-link" href={`https://www.discogs.com/release/${selected.id}`} target="_blank" rel="noreferrer">discogs.com/release/{selected.id} ↗</a>
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

          {tab==="collection" && (
            <>
              <div className="col-header">
                <div className="col-count">{collection.length} record{collection.length!==1?"s":""}</div>
                {collection.length>0 && (
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
                      {r.thumb?<img src={r.thumb} alt="" className="coll-thumb" onError={e=>{e.target.style.display="none"}}/>:<div className="coll-thumb-ph">🎵</div>}
                      <div className="coll-info">
                        <div className="coll-title">{r.title}</div>
                        <div className="coll-artist">{r.artist}</div>
                        <div style={{fontSize:11,color:"var(--muted)",fontFamily:"'DM Mono',monospace",marginTop:3}}>{[r.label,r.country,r.year].filter(Boolean).join(" · ")}</div>
                        <div className="coll-grades">
                          {r.vinylGrade&&<span className="coll-grade">Vinyl: {r.vinylGrade}</span>}
                          {r.sleeveGrade&&<span className="coll-grade">Sleeve: {r.sleeveGrade}</span>}
                          {r.locationCode&&<span className="coll-grade">{r.locationCode}</span>}
                        </div>
                      </div>
                      <div className="coll-actions">
                        <button className="edit-btn" onClick={()=>setEditingRecord(r)}>✏️</button>
                        <button className="del-btn" onClick={()=>updateCollection(prev=>prev.filter(x=>x.id!==r.id))}>🗑</button>
                      </div>
                    </div>
                  ))
              }
            </>
          )}
        </div>
        {toast&&<div className="toast">{toast}</div>}
        {editingRecord&&<EditModal record={editingRecord} onSave={saveEdit} onDelete={id=>{updateCollection(prev=>prev.filter(x=>x.id!==id));showToast("Deleted");}} onClose={()=>setEditingRecord(null)}/>}
      </div>
    </>
  );
}
