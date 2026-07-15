(function(){
  const softText = [
    "I let my anger speak before my heart did.",
    "I never wanted to hurt you. I was wrong, and I'm so sorry.",
    "You mean the world to me — please forgive me so we can heal together."
  ];

  // create floating elements in specified container
  function makeFloaters(containerId, count=18){
    const container = document.getElementById(containerId);
    if(!container) return;
    const emojis = ['❤️','💖','💘','💔','💕','🧿','😔','🌹'];
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'floating';
      el.style.left = Math.random()*90 + '%';
      el.style.fontSize = (18 + Math.random()*40) + 'px';
      el.style.animationDuration = (6 + Math.random()*10) + 's';
      el.style.animationDelay = (Math.random()*3) + 's';
      // choose emoji with weighted preference for hearts and sorrow
      const r = Math.random();
      let emoji = emojis[Math.floor(Math.random()*emojis.length)];
      if (r < 0.55) emoji = ['❤️','💖','💕','💘'][Math.floor(Math.random()*4)];
      else if (r < 0.75) emoji = '🧿';
      else emoji = ['😔','🌹','💔'][Math.floor(Math.random()*3)];
      el.textContent = emoji;
      container.appendChild(el);

      // remove element after animation ends to avoid DOM bloat
      el.addEventListener('animationend', ()=> {
        el.remove();
        // optionally re-add a new one to keep area alive
        setTimeout(()=> makeOne(container, emojis), 600 + Math.random()*1600);
      });
    }

    function makeOne(container, emojis){
      const el = document.createElement('div');
      el.className = 'floating';
      el.style.left = Math.random()*90 + '%';
      el.style.fontSize = (18 + Math.random()*40) + 'px';
      el.style.animationDuration = (6 + Math.random()*10) + 's';
      el.style.animationDelay = '0s';
      const r = Math.random();
      let emoji = emojis[Math.floor(Math.random()*emojis.length)];
      if (r < 0.6) emoji = ['❤️','💖','💕','💘'][Math.floor(Math.random()*4)];
      else if (r < 0.8) emoji = '🧿';
      else emoji = ['😔','🌹','💔'][Math.floor(Math.random()*3)];
      el.textContent = emoji;
      container.appendChild(el);
      el.addEventListener('animationend', ()=> el.remove());
    }
  }

  // initialize floaters on pages
  makeFloaters('animation-area', 24);
  makeFloaters('animation-area-2', 18);
  makeFloaters('animation-area-3', 26);

  // typewriter effect for index page
  const typeEl = document.getElementById('typewriter');
  if(typeEl){
    let idx = 0;
    let charIdx = 0;
    function showNext(){
      if(idx >= softText.length) return;
      const line = softText[idx];
      typeEl.textContent = line.slice(0, charIdx);
      charIdx++;
      if(charIdx <= line.length){
        setTimeout(showNext, 34 + Math.random()*30);
      } else {
        // pause, then show next line below (append with spacing)
        idx++;
        charIdx = 0;
        if(idx < softText.length){
          setTimeout(()=>{
            typeEl.textContent += '\n\n';
            showNext();
          }, 600);
        }
      }
    }
    showNext();
  }

  // heart clicker on final page triggers many hearts burst (if present)
  const clicker = document.getElementById('heart-clicker');
  if (clicker){
    clicker.addEventListener('click', () => burstHearts(clicker));
    clicker.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); burstHearts(clicker); }});
  }
  function burstHearts(originEl){
    const rect = originEl.getBoundingClientRect();
    const parent = document.body;
    const emojis = ['💖','💞','💘','🌹','🧿'];
    for(let i=0;i<26;i++){
      const el = document.createElement('div');
      el.className = 'floating';
      el.style.left = (rect.left + rect.width/2 + (Math.random()*200-100)) + 'px';
      el.style.top = (rect.top + rect.height/2 + (Math.random()*80-40)) + 'px';
      el.style.position = 'fixed';
      el.style.fontSize = (18 + Math.random()*44) + 'px';
      el.style.animationDuration = (1.2 + Math.random()*1.8) + 's';
      el.style.animationName = 'burstUp';
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      parent.appendChild(el);
      el.addEventListener('animationend', ()=> el.remove());
    }
  }

  // add burstUp keyframes dynamically
  const styleTag = document.createElement('style');
  styleTag.textContent = `
  @keyframes burstUp {
    0%{ transform: translateY(0) scale(0.6); opacity:1 }
    60%{ opacity:1 }
    100%{ transform: translateY(-260px) translateX(60px) rotate(45deg) scale(1.1); opacity:0 }
  }`;
  document.head.appendChild(styleTag);

})();
