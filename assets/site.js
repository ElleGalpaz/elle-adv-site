(()=>{
  const h=document.querySelector('header'),b=document.querySelector('.burger');
  const onS=()=>h.classList.toggle('scrolled',scrollY>20);onS();addEventListener('scroll',onS,{passive:true});
  b.addEventListener('click',()=>{const o=h.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('open');b.setAttribute('aria-expanded',false)}));
  document.getElementById('y').textContent=new Date().getFullYear();
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
  document.querySelectorAll('.hero .reveal').forEach(el=>requestAnimationFrame(()=>el.classList.add('in')));
  const f=document.getElementById('form'),note=document.getElementById('note');
  if(f){
  const E=f.elements;
  let via='wa';f.querySelectorAll('button').forEach(x=>x.addEventListener('click',()=>via=x.dataset.via));
  f.addEventListener('submit',e=>{
    e.preventDefault();
    if(!E.name.value.trim()||!E.phone.value.trim()){note.textContent='נא למלא שם וטלפון.';return}
    if(!E.ok.checked){note.textContent='נא לאשר את מדיניות הגנת הפרטיות.';return}
    const txt=`שלום, שמי ${E.name.value.trim()}.\nטלפון: ${E.phone.value.trim()}\nנושא: ${E.topic.value}\n${E.msg.value.trim()}`;
    if(via==='wa') window.open('https://wa.me/972528622266?text='+encodeURIComponent(txt),'_blank','noopener');
    else location.href='mailto:Elle-ADV@outlook.com?subject='+encodeURIComponent('פנייה מהאתר: '+E.topic.value)+'&body='+encodeURIComponent(txt);
    note.textContent='תודה! נחזור אליכם בהקדם.';
  });
  }
  // accessibility menu
  const root=document.documentElement,KEY='a11y';
  let st={};try{st=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
  const apply=()=>{document.body.style.zoom=(st.size||100)/100;root.classList.toggle('a11y-contrast',!!st.contrast);root.classList.toggle('a11y-links',!!st.links);root.classList.toggle('a11y-still',!!st.still);try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
  const w=document.createElement('div');w.className='a11y';
  w.innerHTML=`<button class="a11y-btn" aria-expanded="false" aria-controls="a11y-panel" aria-label="תפריט נגישות"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M19 8H5a1 1 0 0 0 0 2h4.5v3.2L7.6 20.6a1 1 0 0 0 1.9.6L12 15l2.5 6.2a1 1 0 0 0 1.9-.6l-1.9-7.4V10H19a1 1 0 0 0 0-2z"/></svg></button>
  <div class="a11y-panel" id="a11y-panel" role="group" aria-label="אפשרויות נגישות" hidden>
    <b>נגישות</b>
    <button data-a="up">הגדלת טקסט +</button><button data-a="down">הקטנת טקסט −</button>
    <button data-a="contrast" aria-pressed="false">ניגודיות גבוהה</button>
    <button data-a="links" aria-pressed="false">הדגשת קישורים</button>
    <button data-a="still" aria-pressed="false">עצירת אנימציות</button>
    <button data-a="reset">איפוס</button>
    <a href="/accessibility-statement/">הצהרת נגישות</a>
  </div>`;
  document.body.appendChild(w);
  const btn=w.querySelector('.a11y-btn'),panel=w.querySelector('.a11y-panel');
  const sync=()=>w.querySelectorAll('[aria-pressed]').forEach(x=>x.setAttribute('aria-pressed',!!st[x.dataset.a]));
  btn.addEventListener('click',()=>{panel.hidden=!panel.hidden;btn.setAttribute('aria-expanded',!panel.hidden)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){panel.hidden=true;btn.setAttribute('aria-expanded',false);btn.focus()}});
  panel.addEventListener('click',e=>{const a=e.target.dataset&&e.target.dataset.a;if(!a)return;
    if(a==='up')st.size=Math.min((st.size||100)+10,150);else if(a==='down')st.size=Math.max((st.size||100)-10,90);
    else if(a==='reset')st={};else st[a]=!st[a];apply();sync();});
  apply();sync();
})();
