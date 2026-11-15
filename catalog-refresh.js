(()=>{
const checkedAt='2026-11-08',{catalog}=window.fitData;
const intel='https://www.intc.com/news-events/press-releases/detail/1506/intel-unveils-12th-gen-intel-core-launches-worlds-best';
for(const [name,cores,power]of [['Core i5-12600K',10,150],['Core i5-12600KF',10,150],['Core i7-12700K',12,190],['Core i9-12900K',16,241],['Core i9-12900KF',16,241]])catalog.cpu.push({id:'refresh-'+name.toLowerCase().replaceAll(' ','-'),name,brand:'INTEL',price:null,score:null,socket:'LGA1700',power,spec:cores+'코어 · LGA1700 · 최대 터보 '+power+'W',photo:catalog.cpu[3].photo,representative:true,source:intel});
const pro='https://download.semiconductor.samsung.com/resources/data-sheet/samsung_nvme_ssd_990_pro_datasheet_rev.2.0.pdf';
const evo='https://download.semiconductor.samsung.com/resources/data-sheet/samsung_nvme_ssd_990_evo_plus_datasheet_rev.1.0_10139908980019.pdf';
const samsungPhoto=catalog.ssd.find(p=>p.name==='990 PRO 1TB').photo;
for(const [series,capacities,source]of [['990 PRO',[2000,4000],pro],['990 EVO Plus',[1000,2000,4000],evo]])for(const gb of capacities)catalog.ssd.push({id:'refresh-'+series.toLowerCase().replaceAll(' ','-')+'-'+gb,name:series+' '+gb/1000+'TB',brand:'SAMSUNG',price:null,gb,spec:gb/1000+'TB · M.2 2280 · '+(series==='990 PRO'?'PCIe 4.0 x4':'PCIe 4.0 x4 / 5.0 x2'),photo:samsungPhoto,representative:true,source});
catalog.gpu.push({id:'refresh-msi-5060-ventus-v1',name:'GeForce RTX 5060 VENTUS 2X OC V1 8GB',brand:'MSI',price:null,score:null,power:145,length:197,spec:'8GB · 145W · OC V1 · 길이 197mm',photo:catalog.gpu[0].photo,representative:true,source:'https://prod.danawa.com/info/?pcode=122676813'});
for(const products of Object.values(catalog))for(const p of products)p.priceAudit={checkedAt,status:Number.isFinite(p.price)?'example':'unconfirmed',note:Number.isFinite(p.price)?'예시 가격 · 국내 최저가와의 오차 미검증':'현재 국내 판매가 미확인'};
const cpu=catalog.cpu.find(p=>p.id==='cpu-0');
cpu.name='Ryzen 5 9600X (멀티팩 정품)';cpu.price=253980;cpu.priceAudit={checkedAt,status:'checked',seller:'다나와 가격비교',url:'https://prod.danawa.com/info/?pcode=62794079',shipping:2500,delivered:256480,option:'멀티팩 정품 · 카드·멤버십 혜택 제외',note:'확인 시점 비교 최저 표시가 · 배송비 별도'};
const gpu=catalog.gpu.at(-1);gpu.price=686090;gpu.priceAudit={checkedAt,status:'checked',seller:'다나와 가격비교',url:gpu.source,shipping:2900,delivered:688990,option:'OC V1 D7 8GB · 카드·멤버십 혜택 제외',note:'확인 시점 비교 최저 표시가 · 배송비 별도'};
window.fitPriceAudit={checkedAt,total:Object.values(catalog).flat().length,verified:Object.values(catalog).flat().filter(p=>p.priceAudit.status==='checked').length};
})();
