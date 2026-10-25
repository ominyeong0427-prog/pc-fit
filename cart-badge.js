(()=>{
 function update(){
  let count=0;try{count=window.fitCart.read().length;}catch{}
  document.querySelectorAll('[data-cart-count]').forEach(badge=>{
   badge.textContent=String(count);badge.hidden=count===0;
   badge.closest('a').setAttribute('aria-label','장바구니 보기, 저장된 구성 '+count+'개');
  });
 }
 window.addEventListener('fitpc-cart-change',update);
 window.addEventListener('storage',event=>{if(event.key==='fitpc-cart-v1'||event.key===null)update();});
 window.addEventListener('pageshow',update);
 update();
})();
