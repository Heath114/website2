/* Darb — interactions */
(function(){
  var burger = document.querySelector('.burger');
  if(burger){ burger.addEventListener('click', function(){ document.body.classList.toggle('mobile-open'); }); }

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.1, rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('[data-r]').forEach(function(el,i){ el.style.transitionDelay=(i%3)*0.07+'s'; io.observe(el); });

  // departures filter
  var tabs = document.querySelectorAll('.dep-tabs button');
  tabs.forEach(function(b){
    b.addEventListener('click', function(){
      tabs.forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.getAttribute('data-filter');
      document.querySelectorAll('.dep-row').forEach(function(r){
        r.style.display = (f==='all' || r.getAttribute('data-type')===f) ? '' : 'none';
      });
    });
  });

  // reserve buttons -> gentle confirm feel
  document.addEventListener('click', function(e){
    var r = e.target.closest('[data-reserve]');
    if(!r) return;
    e.preventDefault();
    r.textContent = 'Requested ✓';
    r.style.opacity = '.7';
  });

  // forms
  document.querySelectorAll('form[data-form]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      f.querySelectorAll('input,textarea,button,select').forEach(function(el){ el.disabled=true; });
      var note=f.querySelector('[data-note]'); if(note) note.style.display='block';
    });
  });

  var y=document.querySelector('[data-year]'); if(y) y.textContent=new Date().getFullYear();
})();
