// GS AGNI - Global Header Component - NEVER disappears
(function(){
  const headerHTML = (prefix) => `
  <div class="container header-inner">
    <a class="brand" href="${prefix}index.html" aria-label="GS AGNI Home">
      <div class="brand-mark">GS</div>
      <div class="brand-text"><strong>GS AGNI</strong><span>Fire & Safety Protection</span></div>
    </a>
    <nav class="nav" aria-label="Primary">
      <a href="${prefix}index.html" data-page="home">Home</a>
      <a href="${prefix}about.html" data-page="about">About</a>
      <a href="${prefix}fire-alarm-systems.html" data-page="fire-alarm">Fire Alarm</a>
      <a href="${prefix}fire-extinguishers.html" data-page="extinguishers">Extinguishers</a>
      <a href="${prefix}fire-detection.html" data-page="detection">Detection</a>
      <a href="${prefix}fire-protection-equipment.html" data-page="equipment">Equipment</a>
      <a href="${prefix}maintenance.html" data-page="maintenance">Maintenance</a>
      <a href="${prefix}industries.html" data-page="industries">Industries</a>
      <a href="${prefix}projects.html" data-page="projects">Projects</a>
      <a href="${prefix}contact.html" data-page="contact">Contact</a>
    </nav>
    <a class="btn btn-primary header-cta desktop-only" href="${prefix}contact.html">Get a Quote</a>
    <button class="menu-btn" id="menuBtn" aria-label="Open navigation menu">☰</button>
  </div>`;

  const drawerHTML = (prefix) => `
  <div class="drawer-backdrop"></div>
  <div class="drawer-panel">
    <div class="drawer-head">
      <div class="brand"><div class="brand-mark">GS</div><div class="brand-text"><strong>GS AGNI</strong><span>Fire & Safety Protection</span></div></div>
      <button class="btn btn-white" id="drawerClose" aria-label="Close menu">✕</button>
    </div>
    <nav class="drawer-links">
      <a href="${prefix}index.html" data-page="home">Home</a>
      <a href="${prefix}about.html" data-page="about">About Us</a>
      <a href="${prefix}fire-alarm-systems.html" data-page="fire-alarm">Fire Alarm Systems</a>
      <a href="${prefix}fire-extinguishers.html" data-page="extinguishers">Fire Extinguishers</a>
      <a href="${prefix}fire-detection.html" data-page="detection">Fire Detection & Safety Systems</a>
      <a href="${prefix}fire-protection-equipment.html" data-page="equipment">Fire Protection Equipment</a>
      <a href="${prefix}maintenance.html" data-page="maintenance">Fire Safety Maintenance</a>
      <a href="${prefix}industries.html" data-page="industries">Industrial & Commercial Fire Safety</a>
      <a href="${prefix}projects.html" data-page="projects">Projects / Gallery</a>
      <a href="${prefix}contact.html" data-page="contact">Contact / Get a Quote</a>
    </nav>
    <div class="drawer-cta">
      <a class="btn btn-primary" href="https://wa.me/918743095323" target="_blank" rel="noopener">WhatsApp Us</a>
      <a class="btn btn-dark" href="tel:+918743095323">Call +91 87430 95323</a>
    </div>
    <p class="muted" style="margin-top:1rem;font-size:.85rem">CN1054, Ali Vihar, Ali, New Delhi - 110076</p>
  </div>`;

  function getPrefix(){
    // Detect if we are inside subfolder (/about/, /industries/ etc.) by checking depth
    const path = window.location.pathname;
    // If path contains /assets/ skip
    // If file is index.html in subfolder, depth is 1
    // Simple: if pathname ends with .html && contains '/', check folder
    // If pathname like /about/ or /about/index.html -> need ../
    // If at root ( / , /index.html, /about.html ) -> prefix = ""
    const isSubfolder = /^\/(about|fire-alarm-systems|fire-extinguishers|fire-detection|fire-protection-equipment|maintenance|industries|projects|contact)\//.test(path);
    return isSubfolder ? "../" : "";
  }

  function getActivePage(){
    const p = window.location.pathname.toLowerCase();
    if(p.includes('about')) return 'about';
    if(p.includes('fire-alarm-systems')) return 'fire-alarm';
    if(p.includes('fire-extinguishers')) return 'extinguishers';
    if(p.includes('fire-detection')) return 'detection';
    if(p.includes('fire-protection-equipment')) return 'equipment';
    if(p.includes('maintenance')) return 'maintenance';
    if(p.includes('industries')) return 'industries';
    if(p.includes('projects')) return 'projects';
    if(p.includes('contact')) return 'contact';
    return 'home';
  }

  function initGlobalHeader(){
    const prefix = getPrefix();
    // Find or create header
    let header = document.getElementById('site-header');
    if(!header){
      header = document.querySelector('.header');
      if(header) header.id = 'site-header';
    }
    if(!header){
      header = document.createElement('header');
      header.id = 'site-header';
      header.className = 'header transparent';
      document.body.prepend(header);
    }
    header.className = 'header transparent';
    header.innerHTML = headerHTML(prefix);
    // ensure drawer exists
    let drawer = document.getElementById('drawer');
    if(!drawer){
      drawer = document.createElement('div');
      drawer.id = 'drawer';
      drawer.className = 'drawer';
      drawer.innerHTML = drawerHTML(prefix);
      document.body.appendChild(drawer);
    } else {
      drawer.innerHTML = drawerHTML(prefix);
      drawer.className = 'drawer';
    }
    // Active state — desktop + mobile
    const active = getActivePage();
    header.querySelectorAll('.nav a').forEach(a=>{
      a.classList.toggle('active', a.dataset.page === active);
    });
    drawer.querySelectorAll('.drawer-links a').forEach(a=>{
      a.classList.toggle('active', a.dataset.page === active);
    });
    // Sticky behavior
    function onScroll(){
      if(window.scrollY > 18){
        header.classList.add('solid');
        header.classList.remove('transparent');
      } else {
        header.classList.add('transparent');
        header.classList.remove('solid');
      }
    }
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    // Drawer handlers
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('drawerClose');
    const backdrop = drawer.querySelector('.drawer-backdrop');
    const open = ()=> drawer.classList.add('open');
    const close = ()=> drawer.classList.remove('open');
    menuBtn && menuBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);
    // Close drawer after selecting a page + trap focus
    drawer.querySelectorAll('.drawer-links a').forEach(a=> a.addEventListener('click', close));
    // Ensure brand visible - guard against accidental removal
    const brand = header.querySelector('.brand');
    if(!brand || !brand.textContent.includes('GS AGNI')){
      console.warn('GS AGNI brand missing - re-injecting');
      header.innerHTML = headerHTML(prefix);
    }
    window._gsHeaderDone = true;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initGlobalHeader);
  } else {
    initGlobalHeader();
  }
  // Re-init on history navigation (for SPA-like behavior)
  window.addEventListener('popstate', initGlobalHeader);
})();
