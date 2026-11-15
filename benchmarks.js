(()=>{
 const gn={source:'GamersNexus',url:'https://gamersnexus.net/gpus/forbidden-review-nvidia-rtx-5060-gpu-benchmarks',date:'2025-07-21',cpu:'Core i7-12700KF OC (P 4.9GHz / E 3.9GHz)',system:'MSI Z690 Unify · DDR5-6000 (타이밍 수동 조정) · Windows 11 · ReBAR/HAGS 켬',board:'Gigabyte Eagle OC (RTX 5060)',driver:'원문 테스트 환경 참조'};
 const ts={source:'TechSpot',url:'https://www.techspot.com/review/2962-amd-radeon-9070/',date:'2025-03-07',cpu:'Ryzen 7 9800X3D',system:'MSI MPG X870E Carbon WiFi · DDR5-6000 CL30 · Windows 11 24H2',board:'RX 9070: Sapphire Pure / PowerColor Hellhound / XFX Quicksilver 리뷰 · RTX 5070: 제조사별 모델 원문 참조',driver:'Nvidia 572.60 / AMD 24.12.1·24.30.31.03'};
 const rows=[];
 const add=(gpu,game,resolution,average,mode,preset,meta)=>rows.push({gpu,game,resolution,average,mode,preset,...meta});
 add('RTX 5060','Starfield','1080',66,'raster','비 RT 테스트 · 세부 프리셋·업스케일링·FG 여부는 원문 차트 확인',gn);
 add('RTX 5060','Starfield','1440',52,'raster','비 RT 테스트 · 세부 프리셋·업스케일링·FG 여부는 원문 차트 확인',gn);
 add('RTX 5060',"Dragon’s Dogma 2",'1440',57,'raster','비 RT 테스트 · 세부 프리셋·업스케일링·FG 여부는 원문 차트 확인',gn);
 for(const gpu of ['RX 9070','RTX 5070']){
  add(gpu,'Dragon Age: The Veilguard','1440',79,'raster','비 RT 테스트 · 세부 프리셋·업스케일링·FG 여부는 원문 차트 확인',ts);
  add(gpu,'Dragon Age: The Veilguard','2160',53,'raster','비 RT 테스트 · 세부 프리셋·업스케일링·FG 여부는 원문 차트 확인',ts);
  add(gpu,'Cyberpunk 2077: Phantom Liberty','1440',57,'rt','Ultra RT · Quality 업스케일링 · 프레임 생성 여부는 원문 확인',ts);
 }
 add('RX 9070','Cyberpunk 2077: Phantom Liberty','2160',31,'rt','Ultra RT · Quality 업스케일링 · 프레임 생성 여부는 원문 확인',ts);
 function gpuChip(p){const name=p?.name||'';if(/RTX\s*5060(?!\s*Ti)\b/i.test(name))return 'RTX 5060';if(/RTX\s*5070(?!\s*Ti)\b/i.test(name))return 'RTX 5070';if(/RX\s*9070(?!\s*XT)\b/i.test(name))return 'RX 9070';return null;}

 function examples(p,resolution,mode){
  const name=p?.name||'',spec=p?.spec||'';
  let reference,range,reason;
  if(/RTX\s*5060\s*Ti\b/i.test(name)&&/\b16\s*GB\b/i.test(name+' '+spec)){reference='RTX 5060';range=[1.15,1.25];reason='GamersNexus: RTX 5060 Ti 16GB는 RTX 5060보다 여러 게임·해상도에서 15~25% 높았음. 이 차이를 기준 게임에 적용한 참고 추정이며 해당 게임의 직접 측정값은 아님';}
  else if(/RTX\s*4060(?!\s*Ti)\b/i.test(name)){reference='RTX 5060';range=[1/1.27,1/1.06];reason='GamersNexus: RTX 5060이 RTX 4060보다 테스트별 6~27% 높았음. 역산한 비율을 사용하며 게임별 실제 차이는 달라질 수 있음';}
  else if(/RTX\s*3060(?!\s*Ti)\b/i.test(name)){reference='RTX 5060';range=[1/1.49,1/1.34];reason='GamersNexus: RTX 5060이 RTX 3060보다 테스트별 34~49% 높았음. 역산 비율을 적용한 참고 추정';}
  else if(/RX\s*9070\s*XT\b/i.test(name)){reference='RX 9070';range=resolution==='2160'?[1/.88,1/.88]:resolution==='1440'?[1/.92,1/.92]:null;reason='TechSpot: 18개 게임 평균에서 RX 9070이 XT보다 QHD 8%, 4K 12% 낮았음. 전체 평균 비율을 적용하므로 게임별 실측값·오차 범위를 의미하지 않음';}
  if(reference&&range&&mode!=='rt'){
   const result=rows.filter(r=>r.gpu===reference&&r.resolution===resolution&&r.mode==='raster').map(r=>({...r,kind:'estimate',low:Math.round(r.average*range[0]),high:Math.round(r.average*range[1]),reason,ratio:range}));
   if(result.length)return result;
  }
  // Model numbers select a comparison example, never a performance multiplier.
  const nvidia=/\b(?:RTX|GTX)\s*(\d{4})/i.exec(name),amd=/\bRX\s*(\d{4})/i.exec(name);
  const bases=nvidia?['RTX 5060','RTX 5070']:amd?['RX 9070']:[];
  const target=+(nvidia?.[1]||amd?.[1]);
  bases.sort((a,b)=>Math.abs(+a.match(/\d+/)[0]-target)-Math.abs(+b.match(/\d+/)[0]-target));
  for(const base of bases){const result=rows.filter(r=>r.gpu===base&&r.resolution===resolution&&(mode==='all'||r.mode===mode));if(result.length)return result.map(r=>({...r,kind:'example',reason:'같은 GPU 제조사 계열에서 모델 번호가 가까운 등록 모델을 비교 사례로 선택했습니다. 세대·등급·VRAM·구조가 달라 선택한 부품의 FPS로 환산할 근거는 없습니다.'}));}
  return [];
 }
 window.fitBenchmarks={rows,gpuChip,examples,find:(p,resolution,mode)=>rows.filter(r=>r.gpu===gpuChip(p)&&r.resolution===resolution&&(mode==='all'||r.mode===mode))};
})();
