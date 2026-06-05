/* 무명행 TextRPG — 북해빙궁 1회차 확장 (챕터2 중원 진출·마라혈궁 / 챕터3 남해태양궁·빙존)
 * story.binggung.js 다음에 로드 → aftermath_bing을 덮어써 한 챕터로 끝나지 않게 잇는다.
 * 지리 연계: 북해 설궁→장성 넘어 중원 변경(정파 배척)→새외 내부 서열(마라혈궁)→빙↔화 결전(남해태양궁)→빙존.
 */
(function () {
  var add = {

  aftermath_bing: {
    title: '북녘을 등지고', act: '轉',
    text:
      '눈이 녹은 자리에 그대의 발자국이 남는다. 새외에서 온 무명인의 첫 행(行)이 중원의 입을 타고 흐른다. ' +
      '그러나 빙궁의 사명은 이제 막 시작됐을 뿐이다.',
    choices: [
      { label: '사명의 길을 잇는다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_bing_omyeong' },
          { requires: { flag: 'centerBond', eq: true }, goto: 'ending_gwihwa' },
          { requires: { flag: 'joined', eq: false }, goto: 'ending_gwihwa' },
          { goto: 'bg2_frontier' }
        ] }
    ]
  },

  /* ════════ 챕터 2 — 중원 변경, 그리고 마라혈궁 ════════ */
  bg2_frontier: {
    title: '중원 변경(邊境)', act: '承',
    text:
      '빙궁 본대가 장성을 넘어 중원 변경에 진을 친다. 중원 무림은 새외(塞外)의 깃발을 보자마자 토벌대를 꾸린다 — ' +
      '정파의 검이 "질서를 어지럽히는 침입자"라며 길을 막는다. 한기와 명분이 변경에서 부딪친다.',
    choices: [
      { label: '정면으로 설기(雪氣)를 펼쳐 위세를 보인다', set: { ak: +1, showForce: true }, goto: 'bg2_marahyeol' },
      { label: '눈보라를 빌려 은밀히 침투한다', set: { hyeop: +1 }, goto: 'bg2_marahyeol' },
      { label: '하오문에 들러 중원 정세부터 산다', set: { bossIntel: true }, goto: 'bg2_marahyeol' }
    ]
  },
  bg2_marahyeol: {
    title: '같은 새외, 마라혈궁(摩羅血宮)', act: '轉',
    text:
      '변경의 폐사(廢寺)에서, 핏빛 주술을 두른 자들이 그대를 맞는다 — 새외오궁의 하나, 마라혈궁(摩羅血宮). ' +
      '같은 새외이되, 한설(寒雪)의 질서와 피의 주술은 상극이다.\n\n' +
      '"북해의 아이여, 중원을 함께 삼키자." 혈궁의 사자가 손을 내민다. 새외의 서열은 연합으로도, 칼로도 갈린다.',
    choices: [
      { label: '잠시 손을 잡아 중원을 함께 친다 (연합)', set: { marahyeolAlly: true, ak: +1 }, goto: 'bg2_clash' },
      { label: '피의 광기는 한설과 섞일 수 없다 — 거절한다', set: { hyeop: +1, refusedBlood: true }, goto: 'bg2_clash' },
      { label: '연합을 가장해 혈궁의 속을 캔다 (이용)', set: { sili: +1, usedBlood: true }, goto: 'bg2_clash' }
    ]
  },
  bg2_clash: {
    title: '토벌대의 검', act: '轉',
    text:
      '중원 정파 토벌대가 변경의 진을 친다. 검과 한설이 눈밭에서 맞붙는다. ' +
      '한 정파 검수가 빙궁의 어린 척후를 베려 검을 치켜든다.\n\n(한기를 끌어올릴 것인가 — 몸이 먼저 정한다.)',
    choices: [ { label: '― 단전의 한기를 끌어올린다', goto: 'bg2_decide' } ]
  },
  bg2_decide: {
    title: '찰나', act: '轉',
    text: '검이 어린 척후에게 떨어진다.',
    timedNote: '지금 — 검보다 빨라야 한다.',
    choices: [
      { label: '어린 척후를 빙막으로 감싸 구한다', set: { hyeop: +3, savedScout: true, naesang: true }, goto: 'bg2_after' },
      { label: '검수를 먼저 얼려 친다 (척후까진 닿지 못할 수도)', set: { hyeop: +1, frozeFoe: true }, goto: 'bg2_after' },
      { label: '❖ 한설을 휘몰아 토벌대 전체의 검을 묶는다', requires: { artTierMin: 2 }, set: { hyeop: +4, savedScout: true, blizzardFeat: true }, goto: 'bg2_after' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, savedScout: false }, goto: 'bg2_after' }
  },
  bg2_after: {
    title: '눈밭의 끝', act: '轉',
    text:
      '토벌대가 물러간다. 변경의 눈이 붉게 얼었다. ' +
      '(마라혈궁과 손잡았다면, 그 핏빛 주술이 전장을 휩쓸고 — 그 대가를 곧 치르게 될 것이다.)\n\n' +
      '남쪽에서 뜨거운 바람이 불어온다. 빙궁의 오랜 숙적, 남해태양궁(南海太陽宮)의 화공(火功)이 다가온다.',
    choices: [
      { label: '한열(寒熱)의 결전으로 나아간다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_bing_omyeong' },
          { goto: 'bg3_namhae' }
        ] }
    ]
  },

  /* ════════ 챕터 3 — 남해태양궁(빙↔화)과 빙존 ════════ */
  bg3_namhae: {
    title: '한열의 결전 — 남해태양궁', act: '轉',
    text:
      '불의 궁(宮), 남해태양궁의 화공 고수가 화염을 두르고 선다. 빙(氷)과 화(火) — 천적의 만남. ' +
      '한설과 화염이 부딪칠 때마다 수증기가 전장을 뒤덮는다.\n\n' +
      '"북해의 얼음이 남해의 불을 견디겠느냐." 오랜 상극이 이 한 합에 응축된다.',
    choices: [
      { label: '극한의 한기로 화염을 얼려 끝낸다', set: { hyeop: +2, frozeSun: true }, goto: 'bg3_bingjon' },
      { label: '상극을 넘어 — 화공 고수를 회유한다', requires: { artTierMin: 2 }, set: { hyeop: +3, wooedSun: true }, goto: 'bg3_bingjon' },
      { label: '승부를 미루고 한기를 거둬 물러선다', set: { withdrew: true }, goto: 'bg3_bingjon' }
    ]
  },
  bg3_bingjon: {
    title: '북해설왕 — 빙존(氷尊)', act: '轉',
    text:
      '만년설의 기운이 내려앉는다. 9존의 하나, 北海雪王 빙존(氷尊)이 그대 앞에 선다. ' +
      '새외의 정점이, 한 무명의 한기를 가만히 가늠한다.\n\n' +
      '"네 한설에 무엇이 담겼는지 보자, 아이야." 도망칠 수 없는 설벽(雪壁)이 거기 서 있다.',
    choices: [
      { label: '전력으로 한설을 펼친다 — 꺾이더라도 물러서지 않는다', set: { hyeop: +2, faceThrone: true }, goto: 'bg3_finale' },
      { label: '빙존의 도(道)를 묻고 가르침을 청한다', requires: { artTierMin: 2 }, set: { wooThrone: true, hyeop: +2 }, goto: 'bg3_finale' },
      { label: '아직 때가 아니다 — 한기를 거두고 훗날을 기약한다', set: { withdrewThrone: true }, goto: 'bg3_finale' }
    ]
  },
  bg3_finale: {
    title: '설원의 끝에서', act: '結',
    text: '빙존이 한기를 거둔다. 그 한 합에서, 강호는 새외에서 온 한 무명인의 이름을 처음으로 보았다.',
    choices: [
      { label: '강호가 그대를 어떻게 새기는지 듣는다',
        goto: [
          { requires: { flag: 'ak', gte: 4 }, goto: 'ending_bing_omyeong' },
          { requires: { flag: 'wooedSun', eq: true }, goto: 'ending_seolwang' },
          { requires: { flag: 'wooThrone', eq: true }, goto: 'ending_seolwang' },
          { requires: { flag: 'faceThrone', eq: true }, goto: 'ending_seolwang_rise' },
          { requires: { flag: 'withdrewThrone', eq: true }, goto: 'ending_bingjon' },
          { goto: 'ending_bingjon' }
        ] }
    ]
  },

  ending_seolwang_rise: {
    title: '엔딩 · 북해설왕(北海雪王)을 향하여', act: '結', ending: true, endKind: 'cheonha',
    text:
      '그대는 빙존 앞에서도 물러서지 않았다. 중원의 토벌대도, 남해의 화염도, 새외의 핏빛 주술도 — 모두 그대의 한설 앞을 지나갔다.\n\n' +
      '새외에서 온 이름 없는 자가, 천하 서열의 한복판에 한기를 새긴다. 9존 빙존(氷尊), 北海雪王의 옥좌가 ' +
      '만년설처럼 그대를 기다린다. 중원의 정점은 중원만의 것이 아니다.\n\n※ 그 너머, 인간 무의 끝 — 승천(昇天)의 떡밥이 설원 위에 어린다.',
    choices: []
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
