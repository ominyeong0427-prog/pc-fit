(()=>{
 const x3d={url:'https://www.techspot.com/review/2917-amd-ryzen-7-9800x3d/',date:'2024-11-12',context:'45개 게임 · 1080p · RTX 4090 · DDR5-6000 32GB · Windows 11 24H2'};
 const zen={url:'https://www.techspot.com/review/3029-ryzen-9600x-vs-7600x-gaming/',date:'2025-09-09',context:'12개 게임 · 중간 및 높음/울트라 설정 비교 · CS2 Workshop 결과 제외 · 세부 환경은 원문 참조'};
 const rx={url:'https://www.techspot.com/review/2962-amd-radeon-9070/',date:'2025-03-07',context:'일반 게임 18개 / 레이트레이싱 게임 6개 · QHD · Ryzen 7 9800X3D · DDR5-6000 · GPU 칩 기준 참고값; 제조사별 제품 차이는 미반영'};
 const gn={url:'https://gamersnexus.net/gpus/forbidden-review-nvidia-rtx-5060-gpu-benchmarks',date:'2025-07-21',context:'i7-12700KF OC · DDR5-6000 · 1080p·1440p·4K의 여러 게임 비교 · 5060 Ti는 16GB 모델 · 게임별 차이 범위이며 전체 평균이 아님'};
 const records=[
 ['cpu',/\b9800X3D\b/i,x3d,'7800X3D 대비 45개 게임 평균 성능이 8% 높았습니다.','45개 중 19개 게임에서는 차이가 5% 이하였습니다. 모든 게임에서 같은 개선을 기대할 수는 없습니다.'],
 ['cpu',/\b7800X3D\b/i,x3d,'9800X3D와 비교한 45개 게임 중 19개에서는 성능 차이가 5% 이하였습니다.','45개 게임 평균에서는 9800X3D가 8% 높았습니다. 비교 기준은 7800X3D입니다.'],
 ['cpu',/\b9600X\b/i,zen,'7600X 대비 12개 게임 평균이 중간 설정에서 6%, 높음·울트라에서 3.5% 높았습니다.','화질을 높인 테스트에서는 평균 개선이 3.5%였습니다. CPU 교체 비용과 이 차이를 함께 비교해야 합니다.'],
 ['cpu',/\b7600X\b/i,zen,'높음·울트라 설정에서 9600X의 우위는 평균 3.5%에 그쳤습니다.','중간 설정에서는 9600X가 평균 6% 높았습니다. 이 결과를 7600 또는 7600X3D에 적용하지 않습니다.'],
 ['gpu',/RTX\s*5070(?!\s*Ti)\b/i,rx,'QHD 레이트레이싱 6개 게임 평균에서 RX 9070이 이 GPU보다 16% 낮았습니다.','일반 렌더링 중심 18개 게임에서는 RX 9070이 QHD 평균 4%, 4K 평균 8% 높았습니다.'],
 ['gpu',/RX\s*9070(?!\s*XT)\b/i,rx,'RTX 5070 대비 일반 렌더링 중심 18개 게임에서 QHD 평균 4%, 4K 평균 8% 높았습니다.','QHD 레이트레이싱 6개 게임 평균은 RTX 5070보다 16% 낮았습니다. 효과 설정에 따라 우위가 달라집니다.'],
 ['gpu',/RX\s*9070\s*XT\b/i,rx,'RX 9070은 이 GPU보다 일반 게임 평균이 QHD에서 8%, 4K에서 12% 낮았습니다.','같은 리뷰의 전력 테스트에서 RX 9070은 XT보다 15~23% 적은 전력을 사용했습니다. 성능과 소비전력을 함께 비교해야 합니다.'],
 ['gpu',/RTX\s*5060(?!\s*Ti)\b/i,gn,'RTX 4060 대비 테스트별 성능 차이는 +6~27%였으며, 약 20%인 경우가 많았습니다.','RTX 5060 Ti 16GB는 이 GPU보다 테스트별로 15~25% 높았습니다. 해상도·게임별 차이이며 고정 향상률이 아닙니다.'],
 ];
 window.fitEvidence=(type,p)=>{
  let r=records.find(r=>r[0]===type&&r[1].test(p.name));
  if(type==='gpu'&&/RTX\s*5060\s*Ti\b/i.test(p.name)&&/\b16\s*GB\b/i.test(p.spec))r=['gpu',null,gn,'RTX 5060 대비 테스트별 성능이 15~25% 높았습니다. 16GB 모델의 결과입니다.','이 비교는 16GB 모델을 대상으로 합니다. 8GB 모델이나 다른 설정에 같은 수치를 적용할 수 없습니다.'];
  if(!r)return {sources:[]};const meta={...r[2],label:r[2]===gn?'GamersNexus 실측 리뷰':'TechSpot 실측 리뷰'};return {pro:r[3],con:r[4],meta,sources:[[meta.label,meta.url]]};
 };
})();
