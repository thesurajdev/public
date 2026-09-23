  (function(){
    var start = Date.now(); var minShow = 500;
    function hidePreloader(){
      var elapsed = Date.now() - start; var wait = Math.max(minShow - elapsed, 0);
      setTimeout(function(){
        var pre = document.getElementById('preloader');
        document.body.classList.remove('loading');
        if(pre){ pre.classList.add('hide'); setTimeout(function(){ pre.remove(); }, 450); }
      }, wait);
    }
    if(document.readyState === 'complete'){ hidePreloader(); }
    else { window.addEventListener('load', hidePreloader); setTimeout(hidePreloader, 3000); }
  })();

  var navtoggle = document.getElementById('navtoggle');
  var mobilenav = document.getElementById('mobilenav');
  navtoggle.addEventListener('click', function(){
    var isOpen = mobilenav.classList.toggle('open');
    navtoggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navtoggle.textContent = isOpen ? 'CLOSE' : 'MENU';
  });
  document.querySelectorAll('#mobilenav a').forEach(function(a){
    a.addEventListener('click', function(){
      mobilenav.classList.remove('open'); navtoggle.textContent = 'MENU'; navtoggle.setAttribute('aria-expanded','false');
    });
  });

  var catData = {
    "01": { title:"IT Products &amp; Solutions", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M1 19h22l-2-3H3z"/></svg>', desc:"Core computing hardware for offices of every size.", items:["Servers","Laptops","Desktops","Printers","Workstations","Projectors","Monitors","Thin clients"] },
    "03": { title:"Networking", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8.5a10 10 0 0 1 14 0"/><path d="M7.8 11.3a6 6 0 0 1 8.4 0"/><path d="M10.6 14a2.2 2.2 0 0 1 2.8 0"/></svg>', desc:"Networking equipment for offices of every size.", items:["Routers / switches","UTM / firewall","Access points","Structured cabling","Network cables","Patch panels","Modems"] },
    "04": { title:"Security &amp; Surveillance", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="13" height="9" rx="2"/><circle cx="9.5" cy="12.5" r="2.4"/><path d="M16 10.5l5-2.5v9l-5-2.5"/></svg>', desc:"Security appliances and surveillance systems for every site.", items:["CCTV cameras","NVR / DVR systems","Access control","UTM &amp; firewall appliances"] },
    "07": { title:"Software &amp; Licensing", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 8h18"/><path d="M6 12h9M6 15h6"/></svg>', desc:"Software for productivity, security and operations.", items:["Windows","Microsoft 365","Office suite","Antivirus","Design &amp; multimedia","Project management"] }
  };

  var overlay = document.getElementById('catModalOverlay');
  var modalTitle = document.getElementById('modalTitle');
  var modalIcon = document.getElementById('modalIcon');
  var modalDesc = document.getElementById('modalDesc');
  var modalItems = document.getElementById('modalItems');
  var lastFocused = null;

  function openCatModal(code){
    var d = catData[code]; if(!d) return;
    modalTitle.innerHTML = d.title;
    modalIcon.innerHTML = d.icon;
    modalDesc.textContent = d.desc;
    modalItems.innerHTML = '';
    d.items.forEach(function(item){ var li = document.createElement('li'); li.innerHTML = item; modalItems.appendChild(li); });
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.getElementById('modalClose').focus();
  }
  function closeCatModal(){ overlay.classList.remove('open'); if(lastFocused) lastFocused.focus(); }
  document.querySelectorAll('.cat-cell').forEach(function(cell){
    cell.addEventListener('click', function(){ openCatModal(cell.getAttribute('data-cat')); });
    cell.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openCatModal(cell.getAttribute('data-cat')); } });
  });
  document.getElementById('modalClose').addEventListener('click', closeCatModal);
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeCatModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && overlay.classList.contains('open')) closeCatModal(); });
  document.getElementById('modalCta').addEventListener('click', closeCatModal);

  var navLinks = document.querySelectorAll('#primaryNav a');
  var spySections = [];
  navLinks.forEach(function(link){ var id = link.getAttribute('href').replace('#', ''); var sec = document.getElementById(id); if(sec) spySections.push({link:link, el:sec}); });
  if('IntersectionObserver' in window && spySections.length){
    var spyObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var match = spySections.find(function(s){ return s.el === entry.target; }); if(!match) return;
        if(entry.isIntersecting){ navLinks.forEach(function(l){ l.classList.remove('active'); }); match.link.classList.add('active'); }
      });
    }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
    spySections.forEach(function(s){ spyObserver.observe(s.el); });
  }

  // Scroll-reveal animations
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); revealObserver.unobserve(entry.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  var brands = ["Lenovo","HP","Dell","Microsoft","Cisco","Fortinet","Canon","Epson","TP-Link","QNAP","IBM","Sony","Apple","Seagate","NEC","Xerox","APC","Toshiba","Transcend","Cyberoam","ESET","Acer"];
  var ticker = document.getElementById('ticker');
  var html = '';
  for(var r=0;r<2;r++){ brands.forEach(function(b){ html += '<span>' + b + '</span>'; }); }
  ticker.innerHTML = html;

  (function(){
    var form = document.getElementById('enquiryForm');
    if(!form){ console.error('enquiryForm not found on page'); return; }

    var formStatusEl = document.getElementById('form-status');
    if(!formStatusEl){
      formStatusEl = document.createElement('p');
      formStatusEl.id = 'form-status';
      form.appendChild(formStatusEl);
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var message = form.message.value.trim();

      if(!name || !phone || !message){
        formStatusEl.textContent = 'Fill in your name, phone and requirement details.';
        formStatusEl.style.color = '#E58F8F';
        return;
      }

      formStatusEl.textContent = 'Sending...';
      formStatusEl.style.color = '#8892B0';

      fetch('/send-mail.php', {
        method: 'POST',
        body: new FormData(form)
      })
        .then(function(res){ return res.json(); })
        .then(function(data){
          if(data && data.success){
            formStatusEl.textContent = 'Thanks — we received your enquiry and will get back to you shortly.';
            formStatusEl.style.color = '#8892B0';
            form.reset();
          } else {
            formStatusEl.textContent = 'Something went wrong. Please email info@techvyapan.com directly.';
            formStatusEl.style.color = '#E58F8F';
          }
        })
        .catch(function(){
          formStatusEl.textContent = 'Something went wrong. Please email info@techvyapan.com directly.';
          formStatusEl.style.color = '#E58F8F';
        });
    });
  })();
