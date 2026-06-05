/* 무명행 TextRPG — 오리진/진영/무공 데이터 (origins.js 대체본)
 * 2층 구조: 진영 줄기(FACTIONS) + 문파 변주(ORIGINS) + 무공 풀(ARTS_POOL).
 * 브라우저(<script src>)와 Node(lint.js require) 공용.
 */

var FACTIONS = {
  jeongpa: { name: '정파', hanja: '正派', creed: '협(俠)과 명분', tone: '#c0395b' },
  sapa:    { name: '사파', hanja: '邪派', creed: '실리(實利)와 효율', tone: '#5a8f7b' }
  // cheonma / hyeolgyo / saeoe — 후속 슬라이스에서 데이터만 추가
};

var ORIGINS = {
  hwasan: {
    faction: 'jeongpa', name: '화산', hanja: '華山派',
    place: '섬서 화산 연화봉(蓮花峰)',
    essence: '축적된 검기를 한순간에 터뜨리는 정파의 명검문.',
    startScene: 'prologue'
  },
  heukdo: {
    faction: 'sapa', name: '흑도', hanja: '黑道',
    place: '강호의 뒷길 — 흑점(黑店)과 청부의 그늘',
    essence: '그림자에서 나와 그림자로 돌아가며, 한 점의 빈틈에 죽음을 박는 살문(殺門).',
    startScene: 'prologue_heukdo'
  }
};

var ARTS_POOL = {
  hwasan: [
    { id: 'gibon_geom', name: '기본 검식',         grade: '삼류', tier: 1, weight: 52 },
    { id: 'nakyeong',   name: '낙영검법',           grade: '일류', tier: 2, weight: 30 },
    { id: 'maehwa',     name: '이십사수매화검법',   grade: '절정', tier: 3, weight: 18 }
  ],
  heukdo: [
    { id: 'heukbi',  name: '흑점 비수술', grade: '삼류', tier: 1, weight: 52 },
    { id: 'muyeong', name: '무영비수술',   grade: '일류', tier: 2, weight: 30 },
    { id: 'gwisik',  name: '귀식대법',     grade: '절정', tier: 3, weight: 18 }
  ]
};

function rollMartialArt(originId, maxTier, rng) {
  rng = rng || Math.random;
  var pool = (ARTS_POOL[originId] || []).filter(function(a){ return a.tier <= (maxTier || 99); });
  if (!pool.length) return null;
  var total = pool.reduce(function(s,a){ return s + a.weight; }, 0);
  var r = rng() * total;
  for (var i=0;i<pool.length;i++){ r -= pool[i].weight; if (r <= 0) return pool[i]; }
  return pool[pool.length-1];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FACTIONS: FACTIONS, ORIGINS: ORIGINS, ARTS_POOL: ARTS_POOL, rollMartialArt: rollMartialArt };
}
