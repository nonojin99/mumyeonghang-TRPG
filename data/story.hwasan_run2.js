/* 무명행 TextRPG — 화산 런 확장 ② : 권역 2 「독사곡(毒蛇谷)」
 * story.hwasan_run.js 다음에 로드. ch2_close를 덮어써 정사대전 전에 한 권역을 더 거치게 한다.
 * 객잔(휴식/정진) · 기연(비급) · 빙궁 척후 · 당문 독무 정예(2비트 위기) · 관문 → ch3_war 합류.
 */
(function () {
  var add = {

  /* ch2_close 재정의: 정사대전 직행 → 독사곡 권역 경유 */
  ch2_close: {
    title: '관도, 그 후', act: '轉',
    text:
      '피와 흙먼지가 가라앉는다. 살아남은 상단이 그대의 이름 없는 무용을 강호에 옮길 것이다. ' +
      '살수의 배후 — 혈교의 그림자가 남쪽 독사곡(毒蛇谷)으로 뻗어 있음을, 그대는 단서에서 읽는다.\n\n' +
      '무림맹은 그대에게 독사곡의 혈교 거점을 살피라 명한다. 독무(毒霧)와 설한(雪寒)이 뒤섞인 골짜기로.',
    choices: [
      { label: '독사곡으로 향한다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_omyeong' },
          { goto: 'r2_road' }
        ] }
    ]
  },

  /* 권역 진입 */
  r2_road: {
    title: '독사곡 초입', act: '承',
    text:
      '안개가 푸르게 깔린 골짜기. 풀잎마다 독이 맺히고, 북쪽 능선에선 까닭 모를 한기가 흘러내린다 — ' +
      '당문(唐門)의 독향(毒香)과, 새외 빙궁(冰宮) 척후의 설기(雪氣)가 한 골짜기에서 부딪치는 땅이다.\n\n' +
      '해가 기운다. 무리하게 들어설 것인가, 채비를 갖출 것인가.',
    choices: [
      { label: '객잔에 들러 숨을 고른다', goto: 'r2_inn' },
      { label: '안개 속 인기척을 살피며 천천히 든다', set: { hyeop: +1 }, goto: 'r2_hub' },
      { label: '단숨에 골짜기를 가로지른다', set: { hardway: true }, goto: 'r2_hub' }
    ]
  },

  /* 객잔(客棧) — 수련 갈래(회복/정진/교류) */
  r2_inn: {
    title: '독사곡 객잔', act: '承',
    text:
      '낡은 객잔, 화로의 불빛. 독을 씻는 약차(藥茶) 냄새가 떠돈다. 하룻밤, 무엇에 쓸 것인가.',
    choices: [
      { label: '내상을 다스리고 몸을 회복한다', set: { naesang: false, rested: true }, goto: 'r2_hub' },
      { label: '검보를 펴고 매화 검초를 정진한다', set: { trainedDeep: true, hyeop: +1 }, goto: 'r2_hub' },
      { label: '객잔의 강호인들과 술잔을 나누며 소문을 듣는다', set: { rumor: true, bossIntel: true }, goto: 'r2_hub' }
    ]
  },

  /* 권역 허브 — 기연/빙궁/정예 갈래 */
  r2_hub: {
    title: '갈림길', act: '承',
    text:
      '독무 속 세 갈래 길. 동쪽엔 약초꾼이 누군가를 업고 헐떡이고, 북쪽 능선엔 흰 그림자(빙궁 척후)가 어른거리며, ' +
      '남쪽 사당(祠堂)에선 당문의 독향이 짙게 풍긴다. 혈교의 단서는 사당 너머에 있다.',
    choices: [
      { label: '동쪽 — 쓰러진 자를 살핀다 (기연)', goto: 'r2_serendipity' },
      { label: '북쪽 — 빙궁 척후와 마주한다', goto: 'r2_bing' },
      { label: '남쪽 — 당문 사당으로 곧장 향한다', goto: 'r2_elite' }
    ]
  },

  /* 기연(奇緣) — 독에 쓰러진 은거기인, 비급의 기회 */
  r2_serendipity: {
    title: '기연 — 독에 쓰러진 노인', act: '承',
    text:
      '독무에 중독되어 쓰러진 노인. 약초꾼은 발을 구른다. 노인의 품에서 빛바랜 검보(劍譜) 한 권이 비져 나온다 — ' +
      '예사 물건이 아니다. 구할 것인가, 검보부터 챙길 것인가.',
    choices: [
      { label: '독부터 빼내 노인을 구한다 (협)', set: { hyeop: +3, savedHermit: true }, goto: 'r2_serendipity2' },
      { label: '검보를 먼저 챙긴 뒤 돕는다 (실리)', set: { ak: +1, grabbedManual: true }, goto: 'r2_serendipity2' },
      { label: '깊이 얽히기 전에 지나친다', goto: 'r2_hub_done' }
    ]
  },
  r2_serendipity2: {
    title: '은거기인의 사례', act: '承', effect: 'rollArt',
    text:
      '노인이 숨을 고른다. 알고 보니 강호를 등진 은거기인(隱居奇人). ' +
      '그가 검보를 펴 보이며 한 갈래 깊은 묘리를 짚어준다 — 그대의 검이 한 단계 트인다.\n\n— 그대의 무공이 「{art}」(으)로 한층 깊어졌다.',
    choices: [ { label: '가르침을 새기고 길을 잇는다', set: { deepenedArt: true }, goto: 'r2_hub_done' } ]
  },

  /* 빙궁 척후 — 교차 진영(새외) 조우 */
  r2_bing: {
    title: '북녘의 흰 그림자', act: '轉',
    text:
      '한기를 두른 빙궁 설객(雪客)이 길을 막는다. "중원의 검객이 어찌 새외의 길목에 드는가." ' +
      '경계하나, 그 또한 당문·혈교를 적으로 둔 처지다. 적의 적은 — 잠시간의 벗이 될 수도.',
    choices: [
      { label: '뜻을 밝히고 한 골짜기의 동행을 청한다', set: { bingAlly: true, hyeop: +1 }, goto: 'r2_hub_done' },
      { label: '검을 겨눠 길을 연다 (새외는 새외일 뿐)', set: { ak: +1, bingFoe: true }, goto: 'r2_hub_done' },
      { label: '말없이 물러나 다른 길로 돈다', goto: 'r2_hub_done' }
    ]
  },

  r2_hub_done: {
    title: '사당으로', act: '承',
    text:
      '갈림의 일을 마치고, 그대는 결국 당문의 사당으로 향한다. 혈교의 단서가 그 독향 너머에 있다.',
    choices: [ { label: '독향을 가르며 사당에 든다', goto: 'r2_elite' } ]
  },

  /* 정예 — 당문 독무 (2비트 위기) */
  r2_elite: {
    title: '당문 사당의 독무', act: '轉',
    text:
      '사당 안, 당문의 독수(毒手)가 혈교의 사자와 거래 중이다. 그대를 본 순간, 향로가 엎어지며 독무가 삽시간에 퍼진다.\n\n' +
      '숨이 막히고 시야가 흐려진다. 독은 빠르고, 검은 그보다 빨라야 한다.\n\n(어떻게 이 독무를 뚫을 것인가 — 몸이 먼저 정한다.)',
    choices: [ { label: '― 숨을 멈추고 파고든다', goto: 'r2_elite_decide' } ]
  },
  r2_elite_decide: {
    title: '찰나', act: '轉',
    text: '독무가 폐를 조인다. 독수의 비수와 혈교 사자의 그림자가 동시에 움직인다.',
    timedNote: '지금 — 독이 퍼지기 전에.',
    choices: [
      { label: '혈교 사자부터 잡는다 (단서를 놓치지 않는다)', set: { hyeop: +2, leadHyeolgyo: true, naesang: true }, goto: 'r2_elite_after' },
      { label: '독수를 베어 향로를 엎고 독무를 끊는다', set: { hyeop: +1, killedDoksu: true }, goto: 'r2_elite_after' },
      { label: '❖ 매화 검기로 독무를 흩고 둘을 동시에 친다', requires: { artTierMin: 2 }, set: { hyeop: +4, leadHyeolgyo: true, maehwaFeat: true }, goto: 'r2_elite_after' }
    ],
    timed: 9,
    onTimeout: { set: { naesang: true, ak: +1, poisoned: true }, goto: 'r2_elite_after' }
  },
  r2_elite_after: {
    title: '독향이 걷히고', act: '轉',
    text:
      '독무가 가라앉는다. ' +
      '(빙궁과 동행했다면, 설객의 한기가 독을 얼려 그대의 숨을 틔웠을 것이다.)\n\n' +
      '사당 깊은 곳, 혈교 거점으로 이어지는 밀서(密書)가 손에 들어온다. 정사대전의 향방을 가를 단서다.',
    choices: [
      { label: '밀서를 들고 골짜기를 빠져나간다',
        goto: [
          { requires: { flag: 'poisoned', eq: true }, goto: 'r2_gate_hurt' },
          { goto: 'r2_gate' }
        ] }
    ]
  },

  /* 권역 관문 — 골짜기를 나서며 */
  r2_gate: {
    title: '독사곡을 나서며', act: '轉',
    text:
      '골짜기 어귀. 그대는 혈교의 밀서와, 한 권역을 가로지른 무명(武名)을 얻어 나선다. ' +
      '독사곡의 일은 강호에 또 한 줄 소문으로 새겨진다. 이제 정사대전의 한복판이 기다린다.',
    choices: [ { label: '무림맹의 전선으로 향한다', goto: 'ch3_war' } ]
  },
  r2_gate_hurt: {
    title: '독을 안고 나서며', act: '轉',
    text:
      '독이 채 빠지지 않은 몸으로 골짜기를 나선다. 손끝이 저리고, 검이 무겁다. ' +
      '그래도 혈교의 밀서는 품에 있다. 성치 않은 몸으로, 그대는 전선으로 향한다.',
    choices: [ { label: '이를 악물고 무림맹의 전선으로', goto: 'ch3_war' } ]
  }

  };

  if (typeof module !== 'undefined' && module.exports) {
    var core = require('./story.core.js');
    for (var k in add) core.SCENES[k] = add[k];
    module.exports = add;
  } else {
    for (var k2 in add) SCENES[k2] = add[k2];
  }
})();
