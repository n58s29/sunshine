const METIERS=[
  "BTP & Génie civil",
  "Conduite",
  "Conception - Études & méthodes",
  "Énergie - Génie & maintenance électrique",
  "Fonctions supports",
  "Gestion des circulations - Logistique & production",
  "Ingénierie et cadres",
  "Maintenance mécanique",
  "Relation clients",
  "Sûreté ferroviaire",
  "Systèmes d'information & Data",
  "Télécoms"
];

const DF={session:{title:"Sensibilisation à l'IA Générative",collectif:"Collectif TER Centre-Ouest",date:new Date().toISOString().split('T')[0],animateur:"Mat — Fabrique de l'Adoption Numérique",participants:12,emailCommanditaire:"",lienSat:"",logo:"",metier:""},features:[
{id:"synthese",icon:"📄",name:"Synthèse / Résumé",enabled:true,usecase:"Résumer un rapport d'activité de 40 pages en une note d'une page pour le CODIR."},
{id:"redaction",icon:"✍️",name:"Rédaction (mails, CR, notes)",enabled:true,usecase:"Rédiger un CR structuré à partir de notes manuscrites de réunion d'exploitation."},
{id:"analyse",icon:"📊",name:"Analyse de données / tableaux",enabled:true,usecase:"Analyser un export Excel de ponctualité mensuelle et identifier les axes de dégradation."},
{id:"images",icon:"🎨",name:"Génération d'images",enabled:true,usecase:"Créer un visuel pour une campagne de com' interne sur la sécurité en gare."},
{id:"traduction",icon:"🌍",name:"Traduction",enabled:true,usecase:"Traduire une procédure de maintenance FR→EN pour un prestataire étranger."},
{id:"code",icon:"💻",name:"Aide au code / automatisation",enabled:true,usecase:"Écrire une macro VBA pour automatiser la consolidation de rapports hebdo Excel."},
{id:"brainstorming",icon:"💡",name:"Brainstorming / Idéation",enabled:true,usecase:"Générer 10 idées pour améliorer l'expérience voyageur en gare pendant les travaux."},
{id:"extraction",icon:"🔍",name:"Extraction d'info depuis PDF",enabled:true,usecase:"Extraire montants, dates et clauses d'un cahier des charges de 80 pages."},
{id:"reformulation",icon:"🪄",name:"Reformulation (expert prompt)",enabled:true,usecase:"Transformer une demande vague en prompt structuré et actionnable."},
{id:"audio",icon:"🎙️",name:"Génération audio",enabled:true,usecase:"Générer une annonce vocale d'information pour les agents en gare."},
{id:"analyse-image",icon:"👁️",name:"Analyse d'image",enabled:true,usecase:"Analyser une photo de graffiti sur un TER pour estimer surface et coût de nettoyage."},
{id:"email",icon:"📬",name:"Envoi de mail",enabled:true,usecase:"Recevoir par mail le résultat d'une analyse générée par GPT SNCF."}
]};

// ===== MERGE SAFE IMPORT =====
function mergeConfig(imported){
  const c={session:{...DF.session},features:[]};
  if(imported.session){
    for(const k of Object.keys(DF.session)) c.session[k]=imported.session[k]!==undefined?imported.session[k]:DF.session[k];
    // keep extra keys from import too
    for(const k of Object.keys(imported.session)) if(!(k in c.session)) c.session[k]=imported.session[k];
  }
  if(imported.features&&Array.isArray(imported.features)){
    c.features=imported.features.map(f=>{
      const base={id:'custom-'+Date.now()+Math.random(),icon:'⚡',name:'',enabled:true,usecase:'',link:'',atelier:false};
      return {...base,...f};
    });
  } else { c.features=JSON.parse(JSON.stringify(DF.features)); }
  return c;
}

let C;
try{const s=localStorage.getItem('sg-config');C=s?mergeConfig(JSON.parse(s)):JSON.parse(JSON.stringify(DF))}catch(e){C=JSON.parse(JSON.stringify(DF))}

const $=id=>document.getElementById(id);
function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}
function toast(m){const t=$('ts');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function save(){try{localStorage.setItem('sg-config',JSON.stringify(C))}catch(e){}}

function fmtDate(d){if(!d)return'';const dt=new Date(d+'T00:00:00');return dt.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}

const doneSet=new Set();

function render(){
  $('dT').textContent=C.session.title;
  $('dC').textContent=C.session.collectif;
  $('dA').textContent=C.session.animateur;
  $('dD').textContent=fmtDate(C.session.date);
  $('dN').textContent=(C.session.participants||'?')+' participants';
  if(C.session.metier){$('dM').textContent=C.session.metier;$('dMw').style.display=''}else{$('dMw').style.display='none'}
  const en=C.features.filter(f=>f.enabled);
  if(!en.length){$('fc').innerHTML='';$('em').style.display='block';return}
  $('em').style.display='none';
  $('fc').innerHTML=en.map((f,i)=>`<div class="fc${doneSet.has(f.id)?' done':''}${f.atelier?' atelier':''}" data-fid="${f.id}" style="animation-delay:${i*.03}s">
    <div class="fi"><span class="step-num">${i+1}</span>${f.icon}</div>
    <div class="fn">${f.atelier?'<span class="atelier-badge">Atelier</span>':''}${esc(f.name)}</div>
    <div class="fu">${esc(f.usecase)||'<em style="color:var(--g500)">À définir</em>'}</div>
    <div class="fl">${f.link?`<a href="${esc(f.link)}" class="demo-link" rel="noopener">Démo <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"/></svg></a>`:'<span class="nl">—</span>'}</div>
    <div class="ck" title="Marquer comme vu">✓</div>
  </div>`).join('');
  $('fc').querySelectorAll('.ck').forEach(ck=>{
    ck.addEventListener('click',e=>{
      const card=e.target.closest('.fc');
      const fid=card.dataset.fid;
      if(doneSet.has(fid)){doneSet.delete(fid);card.classList.remove('done')}
      else{doneSet.add(fid);card.classList.add('done')}
    })})}

// ===== DRAG & DROP =====
let dragIdx=null;
function initDrag(){
  document.querySelectorAll('.fei[data-i]').forEach(el=>{
    el.addEventListener('dragstart',e=>{dragIdx=+el.dataset.i;el.classList.add('dragging')});
    el.addEventListener('dragend',()=>{document.querySelectorAll('.fei').forEach(x=>x.classList.remove('dragging','drag-over'));dragIdx=null});
    el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('drag-over')});
    el.addEventListener('dragleave',()=>el.classList.remove('drag-over'));
    el.addEventListener('drop',e=>{
      e.preventDefault();el.classList.remove('drag-over');
      const to=+el.dataset.i;
      if(dragIdx===null||dragIdx===to)return;
      const [moved]=C.features.splice(dragIdx,1);
      C.features.splice(to,0,moved);
      save();renderEdit()});
  });
}

function renderEdit(){
  $('eb').innerHTML=`
    <div class="es"><h3>Informations session</h3>
      <div class="ef"><label>Titre</label><input type="text" id="eT" value="${esc(C.session.title)}"></div>
      <div class="ef"><label>Collectif / Équipe</label><input type="text" id="eC" value="${esc(C.session.collectif)}"></div>
      <div class="ef"><label>Famille de métiers</label><select id="eFM"><option value="">— Sélectionner —</option>${METIERS.map(m=>`<option value="${esc(m)}" ${C.session.metier===m?'selected':''}>${esc(m)}</option>`).join('')}</select></div>
      <div class="ef-row">
        <div class="ef"><label>Date</label><input type="date" id="eD" value="${esc(C.session.date)}"></div>
        <div class="ef"><label>Participants</label><input type="number" id="eN" value="${C.session.participants||''}" min="1" placeholder="12"></div>
      </div>
      <div class="ef"><label>Animateur</label><input type="text" id="eA" value="${esc(C.session.animateur)}"></div>
      <div class="ef"><label>Email commanditaire</label><input type="email" id="eM" value="${esc(C.session.emailCommanditaire||'')}" placeholder="prenom.nom@sncf.fr"></div>
      <div class="ef"><label>Lien questionnaire satisfaction</label><input type="url" id="eQ" value="${esc(C.session.lienSat||'')}" placeholder="https://forms..."></div>
      <div class="ef"><label>Logo entité (pour le mail)</label>
        <div style="display:flex;align-items:center;gap:.5rem;">
          <input type="file" id="eLogo" accept="image/png,image/jpeg,image/svg+xml" style="flex:1;font-size:.75rem;">
          ${C.session.logo?`<img src="${C.session.logo}" style="height:28px;max-width:80px;width:auto;object-fit:contain;border-radius:3px;border:1px solid var(--g200);" alt="logo"><button class="db" id="rmLogo" title="Supprimer le logo">🗑</button>`:'<span style="color:var(--g500);font-size:.72rem;">Aucun logo</span>'}
        </div>
      </div>
    </div>
    <div class="es"><h3>Fonctionnalités (${C.features.filter(f=>f.enabled).length}/${C.features.length}) — glisser ⠿ pour réordonner</h3>
      <div id="flist">${C.features.map((f,i)=>`
        <div class="fei ${f.enabled?'':'off'}" id="xi${i}" data-i="${i}" draggable="true">
          <div class="fei-top">
            <span class="grip" title="Glisser pour réordonner">⠿</span>
            <span class="em">${f.icon}</span>
            <span class="nm">${esc(f.name)}</span>
            <label class="tg"><input type="checkbox" ${f.enabled?'checked':''} data-i="${i}" class="tc"><span class="sl"></span></label>
            <button class="db" data-i="${i}" title="Supprimer">🗑</button>
          </div>
          <div class="fei-fields" ${f.enabled?'':'style="display:none"'} id="xf${i}">
            <div class="ef"><label>Cas d'usage</label><textarea data-i="${i}" class="eu" rows="1">${esc(f.usecase)}</textarea></div>
            <div class="ef"><label>Lien démo GPT SNCF</label><input type="url" data-i="${i}" class="el" value="${esc(f.link||'')}" placeholder="https://gpt.sncf.fr/..."></div>
            <div class="ef" style="display:flex;align-items:center;gap:.5rem;"><label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;margin:0;font-size:.72rem;font-weight:500;color:var(--at);"><input type="checkbox" ${f.atelier?'checked':''} data-i="${i}" class="ea"> Exercice participants (Atelier)</label></div>
          </div>
        </div>`).join('')}</div>
      <div class="add-row">
        <input type="text" id="nI" placeholder="🎯" style="flex:0 0 44px;text-align:center">
        <input type="text" id="nN" placeholder="Nom de la fonctionnalité">
        <label style="display:flex;align-items:center;gap:.3rem;font-size:.72rem;white-space:nowrap;cursor:pointer;color:var(--at);font-weight:500;"><input type="checkbox" id="nA"> Atelier</label>
        <button class="add-btn" id="aB">+ Ajouter</button>
      </div>
    </div>`;
  // toggles
  $('eb').querySelectorAll('.tc').forEach(cb=>{
    cb.addEventListener('change',e=>{const i=+e.target.dataset.i;$('xi'+i).classList.toggle('off',!e.target.checked);$('xf'+i).style.display=e.target.checked?'':'none'})});
  // delete
  $('eb').querySelectorAll('.db').forEach(b=>{
    b.addEventListener('click',e=>{const i=+e.target.dataset.i;if(confirm('Supprimer « '+C.features[i].name+' » ?')){C.features.splice(i,1);save();renderEdit()}})});
  // add
  $('aB').addEventListener('click',()=>{
    const icon=$('nI').value.trim()||'⚡',name=$('nN').value.trim(),atelier=!!$('nA').checked;
    if(!name){toast('Donne un nom');return}
    C.features.push({id:'c-'+Date.now(),icon,name,enabled:true,usecase:'',link:'',atelier});
    save();renderEdit();toast(name+' ajoutée ✓')});
  // drag
  initDrag();
  // logo upload — resize to max 80px height
  const logoInput=$('eLogo');
  if(logoInput) logoInput.addEventListener('change',e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        const maxH=80;
        const ratio=Math.min(maxH/img.height,1);
        const w=Math.round(img.width*ratio);
        const h=Math.round(img.height*ratio);
        const cv=document.createElement('canvas');cv.width=w;cv.height=h;
        const ctx=cv.getContext('2d');ctx.drawImage(img,0,0,w,h);
        C.session.logo=cv.toDataURL('image/png');
        save();renderEdit();toast('Logo chargé ✓');
      };
      img.src=ev.target.result;
    };
    r.readAsDataURL(f)});
  const rmBtn=$('rmLogo');
  if(rmBtn) rmBtn.addEventListener('click',()=>{C.session.logo='';save();renderEdit();toast('Logo supprimé')});
}

function openEd(){renderEdit();$('ep').classList.add('open');$('ov').classList.add('open');$('fab').classList.add('on');$('fab').textContent='✕'}
function closeEd(){$('ep').classList.remove('open');$('ov').classList.remove('open');$('fab').classList.remove('on');$('fab').textContent='✏️'}

function readFields(){
  C.session.title=$('eT').value;C.session.collectif=$('eC').value;C.session.date=$('eD').value;
  C.session.animateur=$('eA').value;C.session.participants=+$('eN').value||0;
  C.session.emailCommanditaire=$('eM').value;C.session.lienSat=$('eQ').value;
  C.session.metier=$('eFM').value;
  document.querySelectorAll('.tc').forEach(cb=>{C.features[+cb.dataset.i].enabled=cb.checked});
  document.querySelectorAll('.eu').forEach(ta=>{C.features[+ta.dataset.i].usecase=ta.value});
  document.querySelectorAll('.el').forEach(inp=>{C.features[+inp.dataset.i].link=inp.value});
  document.querySelectorAll('.ea').forEach(cb=>{C.features[+cb.dataset.i].atelier=cb.checked});
}

function saveEd(){readFields();save();render();closeEd();toast('Configuration sauvegardée ✓')}

// ===== EXPORT JSON (date + collectif in filename) =====
$('bE').addEventListener('click',()=>{
  readFields();save();
  const d=C.session.date||'undated';
  const col=C.session.collectif.replace(/[^a-zA-Z0-9àâäéèêëïîôùûüÿçœæ]/gi,'-').replace(/-+/g,'-').toLowerCase();
  const blob=new Blob([JSON.stringify(C,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=`sensibilisation-${d}-${col}.json`;
  a.click();URL.revokeObjectURL(a.href);toast('JSON exporté ✓');
  $('mo').classList.add('open');});

// ===== EXPORT MAIL (.eml with HTML body) =====
function buildEml(){
  readFields();save();
  const en=C.features.filter(f=>f.enabled);
  const dateFr=fmtDate(C.session.date);
  const to=C.session.emailCommanditaire||'';
  const subject=`Récap sensibilisation IA Générative — ${C.session.collectif}${C.session.metier?' ('+C.session.metier+')':''} — ${dateFr}`;

  let rows='';
  en.forEach((f,i)=>{
    const num=i+1;
    const isAtelier=!!f.atelier;
    const bg=isAtelier?'#f5f3ff':'#ffffff';
    const nameCellStyle=`padding:6px 12px;font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;color:#001F5A;font-weight:600;border-bottom:1px solid #e4e7ec;white-space:nowrap;vertical-align:top;background:${bg};`;
    const ucCellStyle=`padding:6px 12px;font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;color:#333;border-bottom:1px solid #e4e7ec;vertical-align:top;background:${bg};`;
    const numBadge=`<span style="display:inline-block;background:${isAtelier?'#7c3aed':'#001F5A'};color:#fff;font-size:8pt;font-weight:700;width:16px;height:16px;border-radius:50%;text-align:center;line-height:16px;margin-right:6px;vertical-align:middle;">${num}</span>`;
    const atelierBadge=isAtelier?`<span style="display:inline-block;background:#7c3aed;color:#fff;font-size:7.5pt;font-weight:700;padding:1px 5px;border-radius:3px;margin-right:5px;vertical-align:middle;">Atelier</span>`:'';
    rows+=`<tr>
      <td style="${nameCellStyle}">${numBadge}${atelierBadge}${esc(f.name)}</td>
      <td style="${ucCellStyle}">${esc(f.usecase)||'—'}</td>
    </tr>`;
  });

  const hasLogo=!!C.session.logo;

  const html=`<html><body style="margin:0;padding:0;background:#f4f5f7;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:20px 0;">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid #e4e7ec;">

  <tr><td style="background:#001F5A;padding:20px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <p style="margin:0;font-family:Aptos,Calibri,Arial,sans-serif;font-size:15pt;font-weight:700;color:#ffffff;">Sensibilisation à l'IA Générative</p>
        <p style="margin:4px 0 0;font-family:Aptos,Calibri,Arial,sans-serif;font-size:10pt;color:rgba(255,255,255,.7);">${esc(C.session.collectif)}${C.session.metier?' · '+esc(C.session.metier):''} · ${dateFr} · ${C.session.participants} participants</p>
      </td>
      ${hasLogo?`<td width="1" style="vertical-align:middle;padding-left:16px;"><img src="cid:logo@sensibilisation" height="40" style="height:40px;display:block;" alt="Logo"/></td>`:''}
    </tr></table>
  </td></tr>

  <tr><td style="padding:24px 28px 8px;">
    <p style="margin:0 0 16px;font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;color:#333;line-height:1.5;">Bonjour,</p>
    <p style="margin:0 0 20px;font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;color:#333;line-height:1.5;">Suite à notre session du ${dateFr} avec ${esc(C.session.collectif)}, voici le récapitulatif des fonctionnalités présentées et des cas d'usage abordés ensemble :</p>
  </td></tr>

  ${C.session.lienSat?`<tr><td style="padding:0 28px 16px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="background:#DAAA00;border-radius:6px;padding:14px 20px;">
        <p style="margin:0;font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;font-weight:700;color:#001F5A;">Votre avis compte !</p>
        <p style="margin:4px 0 0;font-family:Aptos,Calibri,Arial,sans-serif;font-size:10pt;color:#001F5A;">Merci de prendre 2 min pour répondre au <a href="${esc(C.session.lienSat)}" style="color:#001F5A;text-decoration:underline;font-weight:600;">questionnaire de satisfaction</a></p>
      </td>
    </tr></table>
  </td></tr>`:''}

  <tr><td style="padding:0 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4e7ec;border-radius:4px;border-collapse:collapse;">
      <tr style="background:#f4f5f7;">
        <td style="padding:8px 12px;font-family:Aptos,Calibri,Arial,sans-serif;font-size:9pt;font-weight:600;color:#7c849a;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #0088CE;">Fonctionnalité</td>
        <td style="padding:8px 12px;font-family:Aptos,Calibri,Arial,sans-serif;font-size:9pt;font-weight:600;color:#7c849a;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #0088CE;">Cas d'usage abordé</td>
      </tr>
      ${rows}
    </table>
  </td></tr>

  <tr><td style="padding:24px 28px 12px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="background:#0088CE;border-radius:4px;padding:10px 20px;">
        <a href="https://gpt.sncf.fr" style="font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;font-weight:600;color:#ffffff;text-decoration:none;">Accéder à Groupe SNCF GPT</a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:16px 28px 24px;border-top:1px solid #e4e7ec;">
    <p style="margin:0;font-family:Aptos,Calibri,Arial,sans-serif;font-size:11pt;color:#333;line-height:1.5;">Cordialement,<br/>${esc(C.session.animateur)}</p>
  </td></tr>

  <tr><td style="background:#f4f5f7;padding:12px 28px;text-align:center;">
    <p style="margin:0;font-family:Aptos,Calibri,Arial,sans-serif;font-size:8pt;color:#7c849a;">Fabrique de l'Adoption Numérique · e.SNCF Solutions · L'IA Générative au service des métiers</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  // Build .eml with optional CID logo
  const boundary='----=_Part_'+Date.now();
  const htmlB64=btoa(unescape(encodeURIComponent(html))).match(/.{1,76}/g).join('\r\n');

  let emlParts=[
    `To: <${esc(to)}>`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/related; boundary="${boundary}"`,
    `X-Unsent: 1`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    htmlB64
  ];

  if(hasLogo){
    // Extract mime type and base64 data from data URI
    const m=C.session.logo.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
    if(m){
      const ext=m[1]==='image/png'?'png':m[1]==='image/svg+xml'?'svg':'jpg';
      emlParts.push(
        ``,
        `--${boundary}`,
        `Content-Type: ${m[1]}; name="logo.${ext}"`,
        `Content-Transfer-Encoding: base64`,
        `Content-ID: <logo@sensibilisation>`,
        `Content-Disposition: inline; filename="logo.${ext}"`,
        ``,
        m[2].match(/.{1,76}/g).join('\r\n')
      );
    }
  }

  emlParts.push(``,`--${boundary}--`);
  const eml=emlParts.join('\r\n');

  return {eml,subject};
}

$('bM').addEventListener('click',()=>{
  const {eml}=buildEml();
  const col=C.session.collectif.replace(/[^a-zA-Z0-9àâäéèêëïîôùûüÿçœæ]/gi,'-').replace(/-+/g,'-').toLowerCase();
  const blob=new Blob([eml],{type:'message/rfc822'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=`recap-sensibilisation-${C.session.date||'undated'}-${col}.eml`;
  a.click();URL.revokeObjectURL(a.href);
  toast('Mail .eml généré — ouvrir avec Outlook ✓');
});
$('moOk').addEventListener('click',()=>$('mo').classList.remove('open'));
$('mo').addEventListener('click',e=>{if(e.target===$('mo'))$('mo').classList.remove('open')});

// ===== IMPORT =====
$('bI').addEventListener('click',()=>$('fi').click());
$('fi').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{try{const imp=JSON.parse(ev.target.result);
    if(imp.session||imp.features){C=mergeConfig(imp);save();render();closeEd();toast('Config importée ✓')}
    else{toast('Fichier invalide ✗')}}catch{toast('Erreur JSON ✗')}};
  r.readAsText(f);e.target.value=''});

$('fab').addEventListener('click',()=>{closeInfo();$('ep').classList.contains('open')?closeEd():openEd()});
$('ov').addEventListener('click',()=>{closeEd();closeInfo()});
$('ex').addEventListener('click',closeEd);
$('bS').addEventListener('click',saveEd);

// ===== INFO PANEL =====
function openInfo(){
  closeEd();
  $('ip').classList.add('open');
  $('ov').classList.add('open');
  $('fabInfo').classList.add('on');
}
function closeInfo(){
  $('ip').classList.remove('open');
  if(!$('ep').classList.contains('open')) $('ov').classList.remove('open');
  $('fabInfo').classList.remove('on');
}
$('fabInfo').addEventListener('click',()=>{$('ip').classList.contains('open')?closeInfo():openInfo()});
$('ix').addEventListener('click',closeInfo);

// ===== DEMO LINKS — open in right-half window =====
document.addEventListener('click',e=>{
  const a=e.target.closest('.demo-link');
  if(!a)return;
  e.preventDefault();
  const w=Math.round(window.screen.width/2);
  const h=window.screen.height;
  const left=window.screen.width-w;
  window.open(a.href,'demo-gpt',`width=${w},height=${h},left=${left},top=0,resizable=yes`);
});

render();
