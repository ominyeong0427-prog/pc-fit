import * as T from './vendor/three.module.min.js';
export function mountViewer(host,type,dimensions){
 const scene=new T.Scene();scene.background=new T.Color('#f4f4f4');
 const camera=new T.PerspectiveCamera(36,1,.1,100);camera.position.set(0,0,8);
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));host.append(renderer.domElement);
 const model=new T.Group();scene.add(model);scene.add(new T.HemisphereLight(0xffffff,0x666677,3));const light=new T.DirectionalLight(0xffffff,4);light.position.set(3,5,5);scene.add(light);const rim=new T.DirectionalLight(0xc7d5f2,2);rim.position.set(-4,0,-3);scene.add(rim);
 const mat=color=>new T.MeshStandardMaterial({color,roughness:.42,metalness:.35});const dark=mat('#30343a'),metal=mat('#adb3ba'),pcb=mat('#20443f'),gold=mat('#d2b575');
 function box(w,h,d,x=0,y=0,z=0,m=dark){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);model.add(o);return o;}
 function fan(x,y,z,r=.48){const disk=new T.Mesh(new T.CylinderGeometry(r,r,.09,40),mat('#141719'));disk.rotation.x=Math.PI/2;disk.position.set(x,y,z);model.add(disk);for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const blade=box(r*.55,r*.23,.035,x+Math.cos(a)*r*.45,y+Math.sin(a)*r*.45,z+.065,metal);blade.rotation.z=a+.55;}const hub=new T.Mesh(new T.CylinderGeometry(r*.2,r*.2,.13,24),dark);hub.rotation.x=Math.PI/2;hub.position.set(x,y,z+.08);model.add(hub);}
 if(type==='cpu'){box(2,2,.16,0,0,0,pcb);box(1.75,1.75,.19,0,0,.17,metal);for(let x=-.8;x<=.8;x+=.16)for(let y=-.8;y<=.8;y+=.16)box(.065,.065,.04,x,y,-.11,gold);}
 if(type==='gpu'){box(3.3,1.3,.48);box(3.05,1.1,.06,0,0,-.29,pcb);box(.13,1.55,.75,-1.72,0,0,metal);box(1.35,.16,.05,-.2,-.69,-.27,gold);fan(-1,0,.29);fan(0,0,.29);fan(1,0,.29);}
 if(type==='board'){box(2.45,2.85,.08,0,0,0,pcb);box(.8,.8,.15,-.2,.5,.14,metal);for(let i=0;i<4;i++)box(.09,1.1,.18,.57+i*.18,.55,.13);for(let i=0;i<3;i++)box(1.55,.12,.15,-.25,-.6-i*.34,.13);box(.36,1.45,.45,-1,.5,.25,metal);box(.62,.62,.21,.62,-.86,.17);for(let i=0;i<5;i++)box(.13,.13,.18,-.7+i*.2,1.2,.13,metal);}
 if(type==='ram'){box(3.4,.82,.1,0,0,0,pcb);for(let i=0;i<8;i++)box(.29,.42,.1,-1.4+i*.4,.07,.11);for(let i=0;i<30;i++)box(.055,.15,.015,-1.52+i*.105,-.35,.066,gold);box(3.4,.1,.18,0,.43,0,metal);}
 if(type==='ssd'){box(3.3,.87,.08,0,0,0,pcb);for(let i=0;i<3;i++)box(.64,.56,.1,-.8+i*.9,0,.1);for(let i=0;i<10;i++)box(.19,.045,.02,-1.54,-.31+i*.07,.055,gold);}
 if(type==='case'){box(1.95,.12,1.65,0,-1.55,0);box(1.95,.12,1.65,0,1.55,0);box(.12,3,1.65,-.92,0,0);box(.12,3,1.65,.92,0,0);box(1.8,3,.1,0,0,-.8);fan(0,.83,.8,.6);fan(0,-.55,.8,.6);box(1.73,2.85,.03,0,0,.83,new T.MeshStandardMaterial({color:'#82919a',transparent:true,opacity:.18,roughness:.1,metalness:0,depthWrite:false}));box(.3,.16,.45,-.6,-1.67,.35);box(.3,.16,.45,.6,-1.67,.35);}
 if(type==='psu'){box(2.3,1.7,1.7);fan(0,0,.88,.65);for(let i=0;i<5;i++)box(.27,.18,.02,-.74+i*.37,0,-.87,metal);}
 const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());model.children.forEach(child=>child.position.sub(center));
 const desired=dimensions?.length===3?new T.Vector3(...dimensions):size.clone();desired.multiplyScalar(3.4/Math.max(desired.x,desired.y,desired.z));const baseScale=desired.clone().divide(size);
 model.rotation.set(-.27,.4,0);let zoom=1;const status=document.getElementById('modelStatus');status.textContent='';
 const draw=()=>{model.scale.copy(baseScale).multiplyScalar(zoom);host.dataset.zoom=zoom.toFixed(3);renderer.render(scene,camera);};
 const resize=()=>{if(!host.clientWidth||!host.clientHeight)return;renderer.setSize(host.clientWidth,host.clientHeight);camera.aspect=host.clientWidth/host.clientHeight;camera.position.z=desired.length()/(2*Math.sin(Math.atan(Math.tan(Math.PI/10)*Math.min(1,camera.aspect))))*1.15;camera.updateProjectionMatrix();draw();};
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 const turn=(x,y)=>{model.rotation.y+=x;model.rotation.x=Math.max(-1.5,Math.min(1.5,model.rotation.x+y));draw();};
 const magnify=delta=>{zoom=Math.max(.4,Math.min(3,zoom+delta));draw();};
 const reset=()=>{model.rotation.set(-.27,.4,0);zoom=1;draw();};
 const canvas=renderer.domElement,pointers=new Map();let pinch=0;
 canvas.addEventListener('wheel',e=>{e.preventDefault();magnify(-Math.sign(e.deltaY)*.12*zoom);},{passive:false});
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});canvas.setPointerCapture(e.pointerId);pinch=0;});
 canvas.addEventListener('pointermove',e=>{const previous=pointers.get(e.pointerId);if(!previous)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinch)magnify(zoom*(distance/pinch-1));pinch=distance;}else if(pointers.size===1)turn((e.clientX-previous.x)*.012,(e.clientY-previous.y)*.012);});
 for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{pointers.delete(e.pointerId);pinch=0;});
 host.addEventListener('keydown',e=>{const actions={ArrowLeft:()=>turn(-.2,0),ArrowRight:()=>turn(.2,0),ArrowUp:()=>turn(0,-.2),ArrowDown:()=>turn(0,.2),'+':()=>magnify(.15),'=':()=>magnify(.15),'-':()=>magnify(-.15),Home:reset};if(actions[e.key]){e.preventDefault();actions[e.key]();}});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();status.textContent='3D 표시가 중단되었습니다. 새로고침하거나 제품 사진을 확인해 주세요.';});
 return {dispose(){observer.disconnect();scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});renderer.dispose();}};
}
