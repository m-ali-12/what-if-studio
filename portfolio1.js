/* ═══════════════════════════════════════════════
   WHAT IF STUDIOS — PORTFOLIO JS
═══════════════════════════════════════════════ */

(function(){
  /* ── Load admin saved data if exists ── */
  try {
    var saved = JSON.parse(localStorage.getItem('wis_portfolio') || 'null');
    if(saved && saved.length) portfolioData = saved;
  } catch(e){}

  /* ── State ── */
  var activeCategory = 'All';
  var searchTerm     = '';
  var sortMode       = 'default';
  var currentCols    = 3;
  var lbIndex        = 0;
  var filteredItems  = [];

  /* ── Category icons & colors ── */
  var catIcons = {
    'All':            'fas fa-th-large',
    'Logo Design':    'fas fa-pen-nib',
    'Social Media':   'fas fa-hashtag',
    'Thumbnails':     'fab fa-youtube',
    'Poster & Flyer': 'fas fa-layer-group',
    'Brand Identity': 'fas fa-star',
    'Reels & Video':  'fas fa-film',
  };
  var catColors = {
    'Logo Design':    '#7c3aed',
    'Social Media':   '#0891b2',
    'Thumbnails':     '#dc2626',
    'Poster & Flyer': '#d97706',
    'Brand Identity': '#16a34a',
    'Reels & Video':  '#db2777',
  };
  function getIcon(cat){ return catIcons[cat] || 'fas fa-folder'; }
  function getColor(cat){ return catColors[cat] || '#5c3d9c'; }

  /* ── Get unique categories ── */
  function getCategories(){
    return ['All'].concat([...new Set(portfolioData.map(function(p){ return p.cat; }))]);
  }
  function getCatCount(cat){
    return cat==='All' ? portfolioData.length : portfolioData.filter(function(p){ return p.cat===cat; }).length;
  }

  /* ══════════════════════════════════════════════
     RENDER FILTERS
  ══════════════════════════════════════════════ */
  function renderFilters(){
    var cont = document.getElementById('filterCats');
    var cats = getCategories();
    cont.innerHTML = cats.map(function(cat){
      return '<button class="cat-btn '+(cat===activeCategory?'active':'')+'" data-cat="'+cat+'">'
        +'<i class="'+getIcon(cat)+'"></i>'
        +'<span>'+cat+'</span>'
        +'<span class="cat-count">'+getCatCount(cat)+'</span>'
        +'</button>';
    }).join('');

    cont.querySelectorAll('.cat-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        activeCategory = btn.dataset.cat;
        renderFilters();
        renderGrid();
      });
    });

    document.getElementById('totalCount').textContent = portfolioData.length+'+';
    document.getElementById('catCount').textContent   = cats.length-1;
  }

  /* ══════════════════════════════════════════════
     RENDER GRID
  ══════════════════════════════════════════════ */
  function renderGrid(){
    var grid  = document.getElementById('portGrid');
    var noRes = document.getElementById('noResults');

    /* filter */
    filteredItems = portfolioData.filter(function(item){
      var matchCat    = activeCategory==='All' || item.cat===activeCategory;
      var q           = searchTerm;
      var matchSearch = !q ||
        item.title.toLowerCase().indexOf(q)>-1 ||
        item.desc.toLowerCase().indexOf(q)>-1  ||
        (item.tags||[]).some(function(t){ return t.indexOf(q)>-1; });
      return matchCat && matchSearch;
    });

    /* sort */
    if(sortMode==='az') filteredItems.sort(function(a,b){ return a.title.localeCompare(b.title); });
    if(sortMode==='za') filteredItems.sort(function(a,b){ return b.title.localeCompare(a.title); });

    document.getElementById('showCount').textContent = filteredItems.length;

    /* clear cards */
    grid.querySelectorAll('.port-card').forEach(function(c){ c.remove(); });

    if(!filteredItems.length){
      noRes.classList.add('show');
      return;
    }
    noRes.classList.remove('show');

    filteredItems.forEach(function(item, idx){
      var col    = getColor(item.cat);
      var hasImg = item.img && item.img!=='#';
      var card   = document.createElement('div');
      card.className = 'port-card';
      card.style.animationDelay = (idx*0.045)+'s';
      card.dataset.id = item.id;

      card.innerHTML =
        '<div class="card-img-wrap">'
          +(hasImg
            ? '<img src="'+item.img+'" alt="'+item.title+'" loading="lazy">'
            : '<div class="card-placeholder" style="background:linear-gradient(135deg,'+col+'cc,'+col+')">'
                +'<i class="'+getIcon(item.cat)+'"></i>'
                +'<span>Image Coming Soon</span>'
              +'</div>'
          )
          +'<div class="card-overlay">'
            +'<div class="ov-cat"><i class="'+getIcon(item.cat)+'"></i> '+item.cat+'</div>'
            +'<div class="ov-title">'+item.title+'</div>'
            +'<div class="ov-desc">'+item.desc+'</div>'
            +'<div class="ov-actions">'
              +'<button class="ov-btn expand-btn" data-id="'+item.id+'" title="View full"><i class="fas fa-expand-alt"></i></button>'
            +'</div>'
          +'</div>'
          +'<div class="card-corner-tag">'+item.cat+'</div>'
        +'</div>'
        +'<div class="card-info">'
          +'<h3>'+item.title+'</h3>'
          +'<p>'+item.cat+'</p>'
        +'</div>';

      grid.insertBefore(card, noRes);

      card.querySelector('.expand-btn').addEventListener('click', function(e){
        e.stopPropagation();
        openLightbox(item.id);
      });
      card.addEventListener('click', function(){ openLightbox(item.id); });
    });
  }

  /* ══════════════════════════════════════════════
     LIGHTBOX
  ══════════════════════════════════════════════ */
  function openLightbox(id){
    var idx = filteredItems.findIndex(function(i){ return i.id===id; });
    if(idx<0) return;
    lbIndex = idx;
    showLbItem();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow='hidden';
  }
  function showLbItem(){
    var item   = filteredItems[lbIndex];
    if(!item) return;
    var hasImg = item.img && item.img!=='#';
    var img    = document.getElementById('lbImg');
    img.src    = hasImg ? item.img : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect fill="%231a0f2e" width="800" height="500"/><text x="50%25" y="48%25" fill="rgba(245,240,74,.3)" font-size="52" text-anchor="middle" dy=".35em" font-family="sans-serif">'+encodeURIComponent(item.title)+'</text><text x="50%25" y="62%25" fill="rgba(255,255,255,.2)" font-size="20" text-anchor="middle" font-family="sans-serif">Image Coming Soon</text></svg>';
    img.alt    = item.title;
    document.getElementById('lbCat').innerHTML   = '<i class="'+getIcon(item.cat)+'"></i> '+item.cat;
    document.getElementById('lbTitle').textContent = item.title;
    document.getElementById('lbDesc').textContent  = item.desc;
    document.getElementById('lbPrev').style.display = lbIndex>0 ? 'flex':'none';
    document.getElementById('lbNext').style.display = lbIndex<filteredItems.length-1 ? 'flex':'none';
  }
  function closeLightbox(){
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow='';
  }
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', function(e){ if(e.target===e.currentTarget) closeLightbox(); });
  document.getElementById('lbPrev').addEventListener('click', function(){ if(lbIndex>0){ lbIndex--; showLbItem(); } });
  document.getElementById('lbNext').addEventListener('click', function(){ if(lbIndex<filteredItems.length-1){ lbIndex++; showLbItem(); } });
  document.addEventListener('keydown', function(e){
    if(!document.getElementById('lightbox').classList.contains('open')) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowLeft' && lbIndex>0){ lbIndex--; showLbItem(); }
    if(e.key==='ArrowRight' && lbIndex<filteredItems.length-1){ lbIndex++; showLbItem(); }
  });

  /* ── View buttons ── */
  ['v4','v3','v2'].forEach(function(id){
    document.getElementById(id).addEventListener('click', function(){
      var n = parseInt(id[1]);
      currentCols = n;
      var grid = document.getElementById('portGrid');
      grid.className = 'port-grid g'+n;
      document.querySelectorAll('.vbtn').forEach(function(b){ b.classList.remove('active'); });
      document.getElementById(id).classList.add('active');
    });
  });

  /* ── Search ── */
  document.getElementById('searchInput').addEventListener('input', function(e){
    searchTerm = e.target.value.toLowerCase().trim();
    renderGrid();
  });

  /* ── Sort ── */
  document.getElementById('sortSelect').addEventListener('change', function(e){
    sortMode = e.target.value;
    renderGrid();
  });

  /* ── Mobile nav ── */
  document.getElementById('menuToggle').addEventListener('click', function(){
    document.getElementById('navLinks').classList.toggle('active');
    var ic = this.querySelector('i');
    ic.classList.toggle('fa-bars');
    ic.classList.toggle('fa-times');
  });

  /* ── Scroll progress + back to top ── */
  window.addEventListener('scroll', function(){
    var scrolled = window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
    document.getElementById('scrollBar').style.width = scrolled+'%';
    var bt = document.getElementById('backTop');
    if(window.scrollY>400) bt.classList.add('show');
    else bt.classList.remove('show');
  });
  document.getElementById('backTop').addEventListener('click', function(){
    window.scrollTo({top:0,behavior:'smooth'});
  });

  /* ── INIT ── */
  renderFilters();
  renderGrid();

})();