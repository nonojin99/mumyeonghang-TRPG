/* 무명행 TextRPG — 오리진/진영/무공 데이터 (2층: 문파 변주 + 무공 풀)
 * 기획서 §3·§7. 서사 분기는 FACTIONS(진영 줄기)에서, 문파는 ORIGINS(데이터 변주)로.
 * 브라우저(<script src>)와 Node(lint.js require) 양쪽에서 쓰인다.
 */

// 1층 — 진영 줄기(faction trunk). 도입/엔딩의 서사 색을 공유.
const FACTIONS = {
  jeongpa: { name: '정파', hanja: '正派', creed: '협(俠)과 명분', tone: '#c0395b' },
  sapa:    { name: '사파', hanja: '邪派', creed: '실리(實利)와 효율', tone: '#5a8f7b' }
  // cheonma / hyeolgyo / saeoe — 후속 슬라이스에서 데이터만 추가
};

// 2층 — 문파 변주(skin). 설정집을 데이터로. 줄기를 가리키고 지명/입문무공만 교체.
const ORIGINS = {
  hwasan: {
    faction: 'jeongpa',
    name: '화산', hanja: '華山派',
    place: '섬서 화산 연화봉(蓮花峰)',
    essence: '축적된 검기를 한순간에 터뜨리는 정파의 명검문.',
    startScene: 'prologue'
  },
  heukdo: {
    faction: 'sapa',
    name: '흑도', hanja: '黑道',
    place: '강호의 뒷길 — 흑점(黑店)과 청부의 그늘',
    essence: '그림자에서 나와 그림자로 돌아가며, 한 점의 빈틈에 죽음을 박는 살문(殺門).',
    startScene: 'prologue_heukdo'
  }
};

// 무공 추첨 풀 — 입문 추첨은 maxTier 제한(절세무공 자하신공=화경은 기연 전용, 제외).
// 카드게임 rollMartialArt의 텍스트판: tier↑ = weight↓.
const ARTS_POOL = {
  hwasan: [
    { id: 'gibon_geom', name: '기본 검식',           grade: '삼류', tier: 1, weight: 52 },
    { id: 'nakyeong',   name: '낙영검법',             grade: '일류', tier: 2, weight: 30 },
    { id: 'maehwa',     name: '이십사수매화검법',     grade: '절정', tier: 3, weight: 18 }
  ],
  heukdo: [
    { id: 'heukbi',  name: '흑점 비수술',   grade: '삼류', tier: 1, weight: 52 },
    { id: 'muyeong', name: '무영비수술',     grade: '일류', tier: 2, weight: 30 },
    { id: 'gwisik',  name: '귀식대법',       grade: '절정', tier: 3, weight: 18 }
  ]
};

// 등급 가중 추첨 (maxTier 이하만). 순수 함수 — 엔진/린터 공용.
function rollMartialArt(originId, maxTier, rng) {
  rng = rng || Math.random;
  const pool = (ARTS_POOL[originId] || []).filter(a => a.tier <= (maxTier || 99));
  if (!pool.length) return null;
  const total = pool.reduce((s, a) => s + a.weight, 0);
  let r = rng() * total;
  for (const a of pool) { r -= a.weight; if (r <= 0) return a; }
  return pool[pool.length - 1];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FACTIONS, ORIGINS, ARTS_POOL, rollMartialArt };
}
