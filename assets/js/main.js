// GS AGNI - main.js
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>[...r.querySelectorAll(s)];

function initHeader(){
  // Skip if global header component already handled it
  if(window._gsHeaderDone) return;
  const header = $('.header');
  if(!header) return;
  const onScroll = ()=>{
    if(window.scrollY>18) header.classList.add('solid'), header.classList.remove('transparent');
    else header.classList.add('transparent'), header.classList.remove('solid');
  };
  header.classList.add('transparent');
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
  // mobile drawer (fallback if header.js not loaded)
  const btn = $('#menuBtn');
  const drawer = $('#drawer');
  const closeBtn = $('#drawerClose');
  const backdrop = drawer?.querySelector('.drawer-backdrop');
  const open = ()=> drawer?.classList.add('open');
  const close = ()=> drawer?.classList.remove('open');
  btn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
}

function initHero(){
  const hero = $('.hero');
  if(!hero) return;
  const slides = $$('.hero-slide', hero);
  const dots = $$('.hero-indicators button', hero);
  if(slides.length===0) return;
  let idx=0; let timer=null;
  function show(i){
    idx=(i+slides.length)%slides.length;
    slides.forEach((s,n)=>s.classList.toggle('active', n===idx));
    dots.forEach((d,n)=>d.classList.toggle('active', n===idx));
  }
  function next(){ show(idx+1); }
  function start(){ stop(); timer=setInterval(next,3000); }
  function stop(){ if(timer) clearInterval(timer); }
  dots.forEach((d,i)=> d.addEventListener('click', ()=>{show(i); start();}));
  $('.hero-next')?.addEventListener('click', ()=>{next(); start();});
  $('.hero-prev')?.addEventListener('click', ()=>{show(idx-1); start();});
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  show(0); start();
  // pause when hidden
  document.addEventListener('visibilitychange', ()=> document.hidden?stop():start());
}

function initReveal(){
  const els = $$('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  els.forEach(e=>io.observe(e));
}

function initImageFallback(){
  $$('img').forEach(img=>{
    img.loading = img.loading || 'lazy';
    img.addEventListener('error', ()=>{
      if(img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied='1';
      // premium fallback - dark gradient with icon style via placeholder service
      img.src='assets/gallery/gallery-10-gs-agni-corridor.jpg';
      img.style.objectFit='cover';
    });
  });
}

function initFormToWhatsApp(){
  const form=$('#enquiryForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const v = Object.fromEntries(data.entries());
    if(!v.name || !v.phone){ alert('Please enter Name and Phone number.'); return; }
    const msg = `Hello GS AGNI – Fire & Safety Protection,%0A%0AI would like to enquire about your fire safety services.%0A%0AName: ${encodeURIComponent(v.name||'')}%0APhone: ${encodeURIComponent(v.phone||'')}%0AEmail: ${encodeURIComponent(v.email||'')}%0ACompany: ${encodeURIComponent(v.company||'')}%0AProperty Type: ${encodeURIComponent(v.property||'')}%0ARequired Service: ${encodeURIComponent(v.service||'')}%0AMessage: ${encodeURIComponent(v.message||'')}%0A%0APlease contact me regarding my requirement.`;
    const url = `https://wa.me/918743095323?text=${msg}`;
    window.open(url,'_blank');
  });
}

function initGallery(){
  const filters = $$('.filter-btn');
  const items = $$('.gallery-item');
  if(filters.length===0) return;
  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat=btn.dataset.filter;
      items.forEach(it=>{
        const show = cat==='all' || it.dataset.cat===cat || (it.dataset.cat||'').includes(cat);
        it.style.display = show ? '' : 'none';
      });
    });
  });
  // lightbox
  const lb=$('#lightbox'), lbImg=$('#lightboxImg'), lbCap=$('#lightboxCap');
  items.forEach(it=>{
    it.addEventListener('click', ()=>{
      const img=it.querySelector('img');
      if(!img||!lb||!lbImg) return;
      lbImg.src=img.src;
      lbCap.textContent=it.dataset.caption||img.alt||'';
      lb.classList.add('open');
    });
  });
  lb?.addEventListener('click', (e)=>{ if(e.target===lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') lb?.classList.remove('open'); });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initHeader(); initHero(); initReveal(); initImageFallback(); initFormToWhatsApp(); initGallery();
});
