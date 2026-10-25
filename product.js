(()=>{
 const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),type=params.get('type');
 const products=Object.hasOwn(window.fitData.catalog,type)?window.fitData.catalog[type]:[];const p=products.find(x=>x.id===params.get('id'));
 if(!p){$('notFound').hidden=false;return;}
 $('productPage').hidden=false;document.title=p.name+' | FIT PC';$('crumb').textContent='PARTS / '+window.fitData.categories.find(x=>x[0]===type)[1];
 $('backLink').href='index.html#parts-'+type;$('productName').textContent=p.name;$('productBrand').textContent=p.brand;$('productSpec').textContent=p.spec;$('demoPrice').textContent=Number.isFinite(p.price)?p.price.toLocaleString('ko-KR')+'원':'가격 미확인';$('productPhoto').src=p.photo;$('productPhoto').alt=p.name+(p.representative?' 시리즈 대표 사진':' 제품 사진');
 $('photoSource').href=p.source;$('photoSource').textContent=p.representative?'시리즈 대표 사진 출처':'제품 사진 출처';
 const dimensions=p.physical;
 $('physicalInfo').textContent=dimensions?.xyz ? dimensions.labels.map((label,i)=>label+' '+dimensions.xyz[i]+' mm').join(' × ')+' · 외형 기준' : '이 모델의 정확한 외형 치수가 확인되지 않았습니다. 3D 비율은 참고용입니다.';
 if(dimensions?.xyz){$('dimensionSource').hidden=false;$('dimensionSource').href=dimensions.dimensionSource||dimensions.source;}
 const facts=[];const physical=p.physical;
 if(physical?.xyz){physical.xyz.forEach((v,i)=>facts.push([physical.labels?.[i]||['길이','너비','높이'][i],v+' mm']));}else{facts.push(['외형 치수','미확인']);}
 facts.push(['모델',p.name],['주요 사양',p.spec]);
 if(p.socket)facts.push(['CPU 소켓',p.socket]);if(p.size)facts.push(['보드 규격',p.size]);if(p.gb)facts.push(['용량',p.gb>=1000&&type==='ssd'?(p.gb/1000)+' TB':p.gb+' GB']);
 if(physical?.maxGpuLength)facts.push(['GPU 허용 길이',physical.maxGpuLength+' mm']);if(physical?.maxCoolerHeight)facts.push(['CPU 쿨러 허용 높이',physical.maxCoolerHeight+' mm']);if(physical?.maxPsuLength)facts.push(['파워 허용 길이',physical.maxPsuLength+' mm']);
 if(type==='case'&&p.board)facts.push(['지원 메인보드',Array.isArray(p.board)?p.board.join(' / '):p.board]);if(type==='psu'&&p.watts)facts.push(['정격 출력',p.watts+' W']);
 for(const [label,value]of facts){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);$('productFacts').append(row);}
 const offer=dimensions?.offer;
 if(offer){const a=document.createElement('a');a.href=offer.url;a.target='_blank';a.rel='noopener noreferrer';const title=document.createElement('strong');title.textContent=offer.seller+' · 해외';const price=document.createElement('span');price.textContent=new Intl.NumberFormat('ko-KR',{style:'currency',currency:offer.currency}).format(offer.price)+' ↗';a.append(title,price);$('sellerLinks').append(a);$('priceStatus').textContent=dimensions.checkedAt+' 확인 · 공식몰 해당 모델의 구매 가능 옵션 최저 표시가 ('+offer.option+'). 실시간 가격이 아닙니다.';const note=document.createElement('p');note.className='seller-help';note.textContent='EUR(유로) 가격입니다. 한국 배송 가능 여부·배송비·수입세는 별도 확인하세요. 국내 판매처와의 최저가 비교 결과가 아닙니다.';$('sellerLinks').before(note);}
 const query=encodeURIComponent(p.brand+' '+p.name);
 for(const [name,url]of [['다나와','https://search.danawa.com/dsearch.php?k1='+query],['네이버쇼핑','https://search.shopping.naver.com/search/all?query='+query],['쿠팡','https://www.coupang.com/np/search?q='+query],['G마켓','https://www.gmarket.co.kr/n/search?keyword='+query],['옥션','https://www.auction.co.kr/n/search?keyword='+query],['11번가','https://search.11st.co.kr/pc/total-search?kwd='+query]]){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';const title=document.createElement('strong');title.textContent=name;const action=document.createElement('span');action.textContent='가격 미확인 · 검색 ↗';a.append(title,action);$('sellerLinks').append(a);}
 let viewerPromise;
 function showModel(show){$('photoPanel').hidden=show;$('modelPanel').hidden=!show;$('photoTab').setAttribute('aria-pressed',String(!show));$('modelTab').setAttribute('aria-pressed',String(show));if(show&&!viewerPromise){viewerPromise=import('./viewer.js').then(m=>m.mountViewer($('viewer'),type,p.physical?.xyz)).catch(()=>{$('modelStatus').textContent='이 환경에서는 3D를 표시할 수 없습니다. 제품 사진을 확인해 주세요.';});}}
 $('photoTab').onclick=()=>showModel(false);$('modelTab').onclick=()=>showModel(true);
})();
