(async function(){
const id=new URLSearchParams(location.search).get('c')||'';
let C;try{if(!/^g\d-c\d+$/.test(id))throw 0;C=await (await fetch('../content/'+id+'.json')).json()}catch(e){document.body.innerHTML='<div style="color:#f1f5f9;padding:30px;text-align:center;font-family:sans-serif">فصل پیدا نشد. از <a href="../" style="color:#a5b4fc">صفحهٔ اصلی</a> دوباره وارد شو.</div>';return}
const CH=C.meta.id,HK='h_'+CH;
document.title=C.meta.title+' | ریاضی';
document.querySelector('header h1').textContent=C.meta.title;document.querySelector('header p').textContent=C.meta.sub;
document.getElementById('rules').innerHTML='<h2>'+C.meta.rulesTitle+'</h2>'+C.rules;

const FA=s=>String(s).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const M=s=>FA(s).replace(/`([^`]+)`/g,'<bdi dir="ltr" class="m">$1</bdi>');
const $=id=>document.getElementById(id);
let mem={};
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return mem[k]??null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){mem[k]=v}}};
let T=[],L2=[],Q=[],WG=[],TID=[];
T=C.topics.map(t=>[t.title,t.desc]);L2=C.topics.map(t=>t.html);WG=C.topics.map(t=>t.widget);TID=C.topics.map(t=>t.id);
{const LI={easy:0,medium:1,hard:2},ix={};C.topics.forEach((t,i)=>ix[t.id]=i);Q=C.questions.map(q=>[ix[q.t],LI[q.l],q.q,q.a,q.w,q.e,q.id])}
// nav
const secs=[['home','🏠 خانه'],['learn','📚 آموزش'],['quiz','🎯 آزمون'],['prog','📈 پیشرفت']];
secs.forEach(([id,t])=>{const b=document.createElement('button');b.textContent=t;b.dataset.s=id;b.onclick=()=>go(id);$('nav').append(b)});
function go(id){document.querySelectorAll('.sec').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.s===id));if(id==='learn'&&!$('lbody').innerHTML)learn(0);if(id==='quiz')setup();if(id==='prog')prog();scrollTo(0,0)}
T.forEach((t,i)=>{const b=document.createElement('button');b.className='tp';b.innerHTML=`<b>${FA(i+1)}. ${t[0]}</b><span>${t[1]}</span>`;b.onclick=()=>{go('learn');learn(i)};$('tgrid').append(b)});

function learn(i){
 $('lbody').innerHTML=`<div class="card"><div class="row">${T.map((t,j)=>`<button class="btn ${j===i?'pri':''}" onclick="learn(${j})">${FA(j+1)}</button>`).join('')}</div><h2>${FA(i+1)}. ${T[i][0]}</h2>${L2[i]}</div>`;
 if(WG[i]==='subsets'){Object.assign($('sl'),{min:0,max:8,value:3});const u=()=>{const n=+$('sl').value;$('sn').textContent=FA(n);$('sa').textContent=FA(2**n);$('sb').textContent=FA(2**n-1);$('sc').textContent=FA(2**n-1)};$('sl').oninput=u;u()}
 if(WG[i]==='venn3')venn();if(WG[i]==='dice')dice();
}
// Venn
const VX=[['A ∪ B',(a,b,c)=>a||b],['A ∩ B',(a,b)=>a&&b],['A − B',(a,b)=>a&&!b],['B − A',(a,b)=>b&&!a],['(A ∪ B) − C',(a,b,c)=>(a||b)&&!c],['(A ∩ B) − C',(a,b,c)=>a&&b&&!c],['A − (B ∪ C)',(a,b,c)=>a&&!b&&!c],['(B ∩ C) − A',(a,b,c)=>b&&c&&!a],['(B ∪ C) − A',(a,b,c)=>(b||c)&&!a],['A ∩ B ∩ C',(a,b,c)=>a&&b&&c]];
function venn(){
 const s=$('ex');s.innerHTML=VX.map((v,i)=>`<option value="${i}">${v[0]}</option>`).join('');
 const C=[[108,95,'A','#2dd4bf'],[192,95,'B','#818cf8'],[150,165,'C','#fb923c']],cv=$('cv'),x=(cv.width=300,cv.height=250,cv.getContext('2d'));
 const draw=()=>{const f=VX[+s.value][1],im=x.createImageData(300,250);
  for(let y=0;y<250;y++)for(let px=0;px<300;px++){const t=C.map(c=>(px-c[0])**2+(y-c[1])**2<=4225),k=(y*300+px)*4,on=f(...t),any=t[0]||t[1]||t[2];
   const col=on?[251,191,36]:any?[40,58,90]:[15,26,48];im.data.set([...col,255],k)}
  x.putImageData(im,0,0);x.lineWidth=2;x.font='bold 15px Vazirmatn';C.forEach(c=>{x.strokeStyle=c[3];x.beginPath();x.arc(c[0],c[1],65,0,7);x.stroke()});
  x.fillStyle='#2dd4bf';x.fillText('A',40,40);x.fillStyle='#818cf8';x.fillText('B',255,40);x.fillStyle='#fb923c';x.fillText('C',240,228)};
 s.onchange=draw;draw();
}
// Dice
const EV=[['مجموع دو عدد ۷ باشد',(a,b)=>a+b==7],['مجموع مضرب ۴ باشد',(a,b)=>(a+b)%4==0],['دو عدد برابر باشند',(a,b)=>a==b],['دو عدد متفاوت باشند',(a,b)=>a!=b],['حاصل‌ضرب فرد باشد',(a,b)=>a*b%2==1],['دست‌کم یک ۶ بیاید',(a,b)=>a==6||b==6],['برابر باشند و مجموع بیش از ۷',(a,b)=>a==b&&a+b>7],['تاس اول زوج و دوم مضرب ۵',(a,b)=>a%2==0&&b==5]];
const gcd=(a,b)=>b?gcd(b,a%b):a;
function dice(){
 const s=$('ev');s.innerHTML=EV.map((v,i)=>`<option value="${i}">${v[0]}</option>`).join('');
 const d=()=>{const f=EV[+s.value][1];let h='<div></div>'+[1,2,3,4,5,6].map(i=>`<div>${FA(i)}</div>`).join(''),k=0;
  for(let a=1;a<=6;a++){h+=`<div>${FA(a)}</div>`;for(let b=1;b<=6;b++){const o=f(a,b);k+=o;h+=`<div class="${o?'h':''}">${FA(a)}،${FA(b)}</div>`}}
  $('dc').innerHTML=h;const g=gcd(k,36);$('pr').innerHTML=`${FA(k)}/${FA(36)} = <bdi dir="ltr">${FA(k/g)}/${FA(36/g)}</bdi>`};
 s.onchange=d;d();
}
// Quiz bank: [topic, level(0-2), question, right, [wrong x3], explanation]
const LV=['آسان','متوسط','سخت','ترکیبی'];
let S=null;
function setup(){
 S=null;$('qbox').innerHTML=`<h2>🎯 آزمون تعاملی</h2><p>سطح و تعداد سؤال را انتخاب کن:</p>
 <div class="row">${LV.map((l,i)=>`<button class="btn ${i==3?'pri':''}" data-l="${i}">${l}</button>`).join('')}</div>
 <div class="row"><label>مبحث: <select id="qt"><option value="-1">همهٔ مبحث‌ها</option>${T.map((t,i)=>`<option value="${i}">${t[0]}</option>`).join('')}</select></label></div><div class="row"><label>تعداد: <select id="qn"><option>5</option><option selected>10</option><option>15</option></select></label></div>`;
 document.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>start(+b.dataset.l));
}
function shuf(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
function start(l){
 const tp=+$('qt').value;let p=(l==3?Q:Q.filter(q=>q[1]==l)).filter(q=>tp<0||q[0]==tp);if(!p.length){$('qbox').insertAdjacentHTML('beforeend','<div class="tip">برای این ترکیب سؤالی نداریم؛ سطح یا مبحث دیگری انتخاب کن.</div>');return}const n=Math.min(+$('qn').value,p.length);
 S={l,qs:shuf(p).slice(0,n),i:0,ok:0,t:{},w:[]};ask();
}
function ask(){
 const q=S.qs[S.i],o=shuf([q[3],...q[4]]);
 $('qbox').innerHTML=`<div class="bar"><i style="width:${S.i/S.qs.length*100}%"></i></div>
 <p style="color:var(--mu);margin-top:6px">سؤال ${FA(S.i+1)} از ${FA(S.qs.length)} — ${T[q[0]][0]}</p>
 <h2>${M(q[2])}</h2><div id="os">${o.map(x=>`<button class="opt">${M(x)}</button>`).join('')}</div><div id="fb"></div>`;
 document.querySelectorAll('.opt').forEach((b,k)=>b.onclick=()=>pick(b,o[k]===q[3],q,o.indexOf(q[3])));
}
function pick(b,ok,q,ri){
 document.querySelectorAll('.opt').forEach(x=>{x.disabled=true;x.style.cursor='default'});
 b.classList.add(ok?'right':'wrong');
 document.querySelectorAll('.opt')[ri].classList.add('right');
 const t=S.t[q[0]]||(S.t[q[0]]=[0,0]);t[1]++;if(ok){S.ok++;t[0]++}else S.w.push(q);
 const last=S.i==S.qs.length-1;
 $('fb').innerHTML=`<div class="tip">${ok?'✅ آفرین!':'❌ نادرست.'} ${M(q[5])}</div><button class="btn pri" id="nx">${last?'دیدن نتیجه':'سؤال بعدی'}</button>`;
 $('nx').onclick=()=>{S.i++;last?finish():ask()};$('nx').focus();
}
function finish(){
 const n=S.qs.length,pc=Math.round(S.ok/n*100);
 const h=JSON.parse(ls.get(HK)||'[]');h.push({d:new Date().toISOString(),l:S.l,n,ok:S.ok,t:S.t});ls.set(HK,JSON.stringify(h.slice(-50)));
 $('qbox').innerHTML=`<h2>🏁 نتیجه</h2><div class="big">${FA(S.ok)} از ${FA(n)} (${FA(pc)}٪)</div>
 <p style="text-align:center">${pc>=80?'عالی! آمادهٔ امتحانی 🎉':pc>=50?'خوب است؛ مبحث‌های ضعیف را دوباره بخوان.':'نگران نباش؛ بخش «آموزش» را مرور کن و دوباره امتحان بده.'}</p>
 ${S.w.length?'<h3>مرور اشتباه‌ها</h3>'+S.w.map(q=>`<div class="tip">${M(q[2])}<br>✔ ${M(q[3])}<br>${M(q[5])}</div>`).join(''):''}<div class="row" style="justify-content:center"><button class="btn pri" id="again">آزمون جدید</button><button class="btn" id="gp">پیشرفت من</button></div>`;
 $('again').onclick=setup;$('gp').onclick=()=>go('prog');
 sendResult({c:CH,l:S.l,n,ok:S.ok,t:Object.fromEntries(Object.entries(S.t).map(([k,v])=>[TID[k]??k,v]))});
}
function prog(){
 prof();
 $('clr').onclick=()=>{ls.set(HK,'[]');prog()};
 const h=JSON.parse(ls.get(HK)||'[]');
 if(!h.length){$('pbody').innerHTML='<div class="tip">هنوز آزمونی نداده‌ای. از بخش «آزمون» شروع کن.</div>';return}
 const ta={};h.forEach(r=>Object.entries(r.t).forEach(([k,v])=>{const a=ta[k]||(ta[k]=[0,0]);a[0]+=v[0];a[1]+=v[1]}));
 const tot=h.reduce((s,r)=>s+r.ok,0),all=h.reduce((s,r)=>s+r.n,0);
 $('pbody').innerHTML=`<p>${FA(h.length)} آزمون | میانگین درستی: <b>${FA(Math.round(tot/all*100))}٪</b></p>${chart(h)}<h3>عملکرد در هر مبحث</h3>`+
 T.map((t,i)=>{const a=ta[i];const p=a?Math.round(a[0]/a[1]*100):0;return `<p>${t[0]} <span style="color:var(--mu)">${a?FA(p)+'٪ ('+FA(a[0])+'/'+FA(a[1])+')':'—'}</span></p><div class="bar"><i style="width:${p}%"></i></div>`}).join('')+
 `<h3>آخرین آزمون‌ها</h3>`+h.slice(-8).reverse().map(r=>`<p>${new Date(r.d).toLocaleDateString('fa-IR')} — ${LV[r.l]} — ${FA(r.ok)} از ${FA(r.n)}</p>`).join('');
}
const PF=[['fn','نام'],['ln','نام خانوادگی'],['fa','نام پدر'],['sc','مدرسه'],['ci','شهر'],['kl','کلاس']];
function getP(){try{return JSON.parse(ls.get('rp')||'{}')}catch(e){return {}}}
function chart(h){const p=h.slice(-20).map(r=>r.ok/r.n*100);if(p.length<2)return '';const st=300/(p.length-1),q=p.map((v,i)=>[(i*st).toFixed(1),(100-v).toFixed(1)]);return `<h3>روند درصد آزمون‌ها</h3><svg viewBox="-6 -8 312 118" style="width:100%;max-width:420px;background:#0f1a30;border-radius:12px" role="img" aria-label="نمودار روند"><polyline fill="none" stroke="#a855f7" stroke-width="2.5" points="${q.map(x=>x.join(',')).join(' ')}"/>${q.map(x=>`<circle cx="${x[0]}" cy="${x[1]}" r="3.5" fill="#ec4899"/>`).join('')}</svg>`}
function prof(){
 const o=$('nm');if(o)o.parentNode.remove();
 const p=getP(),b=$('pf');
 b.innerHTML='<div class="row">'+PF.map(f=>`<label>${f[1]}: <input type="text" maxlength="30" data-f="${f[0]}" style="width:130px"></label>`).join('')+'</div><div class="row"><button class="btn" id="bcsv">خروجی CSV</button><button class="btn" id="bbk">پشتیبان‌گیری</button><button class="btn" id="brs">بازیابی</button></div><textarea id="io" rows="6" style="display:none;width:100%;direction:ltr"></textarea><p id="ioh" style="color:var(--mu)"></p>';
 b.querySelectorAll('[data-f]').forEach(i=>{i.value=p[i.dataset.f]||'';i.oninput=()=>{p[i.dataset.f]=i.value.trim();ls.set('rp',JSON.stringify(p))}});
 const h=()=>JSON.parse(ls.get(HK)||'[]'),show=(t,m)=>{const a=$('io');a.style.display='block';a.dataset.m='';a.value=t;a.select();$('ioh').textContent=m};
 $('bcsv').onclick=()=>{if(!p.fn||!p.ln){$('ioh').textContent='برای خروجی، نام و نام خانوادگی را وارد کن.';return}
  const c=v=>{let s=String(v);if(/^[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
  const rows=[['نام','نام خانوادگی','نام پدر','مدرسه','شهر','کلاس','تاریخ','سطح','تعداد سؤال','درست','درصد']].concat(h().map(r=>[p.fn,p.ln,p.fa||'',p.sc||'',p.ci||'',p.kl||'',r.d.slice(0,10),LV[r.l],r.n,r.ok,Math.round(r.ok/r.n*100)]));
  show(rows.map(r=>r.map(c).join(',')).join('\n'),'متن CSV را کپی کن و در یک فایل .csv یا در اکسل بچسبان.')};
 $('bbk').onclick=()=>show(JSON.stringify({p,h:h()}),'این متن را کپی و نگه دار؛ برای بازیابی همین‌جا بچسبان.');
 $('brs').onclick=()=>{const a=$('io');if(a.dataset.m!=='r'||!a.value.trim()){a.style.display='block';a.value='';a.dataset.m='r';$('ioh').textContent='متن پشتیبان را بچسبان و دوباره «بازیابی» را بزن.';return}
  try{const d=JSON.parse(a.value);if(!Array.isArray(d.h))throw 0;const cur=h(),ks=new Set(cur.map(r=>r.d));d.h.forEach(r=>{if(r&&r.d&&r.n>0&&!ks.has(r.d))cur.push({d:String(r.d),l:+r.l||0,n:+r.n,ok:+r.ok||0,t:r.t&&typeof r.t==='object'?r.t:{}})});cur.sort((x,y)=>x.d<y.d?-1:1);ls.set(HK,JSON.stringify(cur.slice(-50)));if(d.p&&typeof d.p==='object')ls.set('rp',JSON.stringify(d.p));prog()}catch(e){$('ioh').textContent='متن پشتیبان معتبر نیست.'}};
}
const SB='https://qwpmbprjdwrxwhwgdekt.supabase.co',KEY='sb_publishable_p8FrC24bNtoAlgyxoFvPsQ_tFj0L9fB';
async function rpc(fn,b){const r=await fetch(SB+'/rest/v1/rpc/'+fn,{method:'POST',headers:{apikey:KEY,'Content-Type':'application/json'},body:JSON.stringify(b)});const t=await r.text();if(!r.ok){let m='';try{m=JSON.parse(t).message||''}catch(e){}throw new Error(m||('HTTP '+r.status))}return t?JSON.parse(t):null}
const ERR={'wrong pin':'رمز اشتباه است.','bad class':'کد کلاس معتبر نیست.','bad pin':'رمز باید دقیقاً ۴ رقم باشد.'};
const ses=()=>{try{return JSON.parse(ls.get('rs')||'null')}catch(e){return null}};
function who(){const x=ses();$('who').innerHTML=x?`👤 ${x.name.replace(/</g,'&lt;')} — <a href="#" id="out" style="color:var(--mu)">خروج</a>`:'مهمان (نتیجه ثبت نمی‌شود) — <a href="#" id="inn" style="color:var(--mu)">ورود</a>';
 const o=$('out')||$('inn');o.onclick=e=>{e.preventDefault();if(x)ls.set('rs','null');$('lg').style.display='flex'}}
$('lgs').onclick=()=>{$('lg').style.display='none';who()};
$('lgo').onclick=async()=>{const code=$('lc').value.trim(),name=$('ln2').value.trim(),pin=$('lp').value.trim();
 if(!code||name.length<3||!/^\d{4}$/.test(pin)){$('lgm').textContent='کلاس، نام کامل و رمز ۴ رقمی را وارد کن.';return}
 $('lgm').textContent='در حال ورود…';
 try{const id=await rpc('join_class',{p_code:code,p_name:name,p_pin:pin});ls.set('rs',JSON.stringify({sid:id,pin,name}));$('lg').style.display='none';who();flush()}
 catch(e){$('lgm').textContent=ERR[e.message]||(e.message.startsWith('HTTP')||e.name==='TypeError'?'ارتباط با سرور برقرار نشد. اینترنت را بررسی کن.':'ورود انجام نشد: '+e.message)}};
const qget=()=>{try{return JSON.parse(ls.get('rq')||'[]')}catch(e){return[]}};
async function flush(){const x=ses();if(!x)return 0;let q=qget(),left=[];
 for(const r of q){try{await rpc('submit_result',{p_sid:x.sid,p_pin:x.pin,p_chapter:r.c||CH,p_level:r.l,p_total:r.n,p_correct:r.ok,p_by_topic:r.t})}catch(e){left.push(r)}}
 ls.set('rq',JSON.stringify(left));return left.length}
async function sendResult(r){const x=ses();
 $('qbox').insertAdjacentHTML('beforeend','<p id="sst" style="text-align:center;color:var(--mu)"></p>');const el=$('sst');
 if(!x){el.textContent='نتیجه برای معلم ثبت نشد (بدون ورود).';return}
 const q=qget();q.push(r);ls.set('rq',JSON.stringify(q));el.textContent='در حال ثبت نتیجه…';
 const left=await flush();el.textContent=left?'ثبت انجام نشد؛ نتیجه نگه داشته شد و بعداً دوباره ارسال می‌شود.':'✅ نتیجه برای معلم ثبت شد.'}
go('home');who();if(!ses())$('lg').style.display='flex';else flush();

/* فهرست کلاس‌های همین پایه */
async function loadClasses(g){const s=document.getElementById('lc');
 try{const L=await rpc('list_classes',{p_grade:g});const e=t=>String(t).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
  s.innerHTML='<option value="">— کلاس خودت را انتخاب کن —</option>'+L.map(c=>'<option value="'+e(c.code)+'">'+e(c.title)+'</option>').join('')}
 catch(err){s.outerHTML='<input type="text" id="lc" maxlength="20" autocomplete="off" placeholder="کد کلاس را بنویس">'}}
loadClasses(C.meta.grade);

window.learn=learn;
})();
