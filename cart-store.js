(()=>{
 const key='fitpc-cart-v1';
 function read(){const raw=localStorage.getItem(key);if(!raw)return [];const rows=JSON.parse(raw);if(!Array.isArray(rows))throw Error('invalid cart');return rows;}
 function write(rows){localStorage.setItem(key,JSON.stringify(rows));window.dispatchEvent(new Event('fitpc-cart-change'));}
 function add(selectedIds,preferences){const parts=window.fitData.categories.flatMap(([type])=>{const p=window.fitData.catalog[type].find(p=>p.id===selectedIds[type]);return p?[{type,id:p.id,name:p.name,price:p.price}]:[];});if(!parts.length)throw Error('empty');const rows=read(),signature=JSON.stringify(parts.map(p=>[p.type,p.id]));const same=rows.find(r=>JSON.stringify(r.parts?.map(p=>[p.type,p.id]))===signature);if(same)return same.id;const item={id:crypto.randomUUID(),createdAt:new Date().toISOString(),parts,preferences};write([...rows,item]);return item.id;}
 window.fitCart={read,write,add};
})();
