/* 무명행 TextRPG — 화산 1회차 확장 (챕터2 강호권역 · 챕터3 정사대전·9존·군림천하)
 * story.hwasan.js 다음에 로드 → 'aftermath' 키를 덮어써 챕터1 climax를 "계속"으로 잇는다.
 * (마운트 덮어쓰기 이슈 회피: 기존 파일 수정 없이 후행 병합으로 분기 연장)
 */
(function () {
  var add = {

  /* 챕터1 climax 라우터 재정의: 실패는 종료, 입문자는 강호로 계속 */
  aftermath: {
    title: '피와 노을', act: '轉',
    text:
      '노을이 핏물을 자줏빛으로 물들인다. 연화봉의 종소리가 멀리서 울린다. ' +
      '오늘의 일은 강호의 입을 타고 흐를 것이다. 그러나 이것은 — 아직 시작에 불과하다.',
    choices: [
      { label: '강호로 첫발을 내딛는다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_omyeong' },
          { requires: { flag: 'ak', gte: 3 }, goto: 'ending_omyeong' },
          { requires: { flag: 'joined', eq: false }, goto: 'ending_nangin' },
          { goto: 'ch2_summons' }
        ] }
    ]
  },

  /* ════════ 챕터 2 — 강호 권역(첫 임무) ════════ */
  ch2_summons: {
    title: '무림맹의 전갈', act: '承',
    text:
      '화산의 제자가 되어 첫 봄을 났다. 무림맹(武林盟)의 전갈이 연화봉에 닿는다 — ' +
      '인근 관도에 사마(邪魔)의 무리가 출몰해 상단을 친다는 것. 장로가 그대를 첫 임무에 내보낸다.\n\n' +
      '"네 검이 명분에 값하는지, 강호가 지켜볼 것이다." 어떻게 나아갈 것인가.',
    choices: [
      { label: '곧장 적을 토벌하러 관도로 향한다', goto: 'ch2_clash' },
      { label: '개방(丐幇)에 먼저 들러 적의 정체를 캔다', set: { bossIntel: true }, goto: 'ch2_intel' },
      { label: '홀로 잠행하여 적진을 살핀다', set: { hyeop: +1 }, goto: 'ch2_clash' }
    ]
  },
  ch2_intel: {
    title: '개방의 귀', act: '承',
    text:
      '개방 분타의 거지가 술잔을 기울이며 속삭인다. "그 사마의 무리… 우두머리가 낯익은 자라오. ' +
      '연화봉서 도사를 치려던 그 혈교(血敎) 끄나풀, 살아 돌아가 패거리를 모았다더군."\n\n' +
      '(놓아준 살수가 있었다면 — 그 씨앗이 이렇게 돌아온다.)',
    choices: [
      { label: '인연을 끊으러 간다', set: { leadHyeolgyo: true }, goto: 'ch2_clash' }
    ]
  },
  ch2_clash: {
    title: '관도의 매복', act: '轉',
    text:
      '협곡 관도. 복면의 사마 무리가 상단 마차를 에워싸고 있다. 그 한복판, 낯익은 살수가 칼을 빼든다.\n\n' +
      '"화산의 개가 또 끼어드는군." 상단의 식솔들이 칼끝 앞에서 떤다. 적은 여럿, 그대는 하나.\n\n' +
      '(검을 어떻게 쓸 것인가 — 몸이 먼저 정한다.)',
    choices: [ { label: '― 검을 고쳐쥔다', goto: 'ch2_decide' } ]
  },
  ch2_decide: {
    title: '찰나', act: '轉',
    text: '살수의 칼이 상단의 아이에게 떨어진다.',
    timedNote: '지금 — 검이 먼저 닿아야 한다.',
    choices: [
      { label: '아이를 끌어안아 막는다 (그대가 칼을 받는다)', set: { hyeop: +3, savedChild: true, naesang: true }, goto: 'ch2_close' },
      { label: '살수의 칼목을 쳐낸다 (아이까진 닿지 못할 수도)', set: { hyeop: +1, killedAssassin: true }, goto: 'ch2_close' },
      { label: '❖ 매화 검기를 흩뿌려 적 전체의 칼을 묶는다', requires: { artTierMin: 2 }, set: { hyeop: +4, savedChild: true, killedAssassin: true, maehwaFeat: true }, goto: 'ch2_close' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, savedChild: false }, goto: 'ch2_close' }
  },
  ch2_close: {
    title: '관도, 그 후', act: '轉',
    text:
      '피와 흙먼지가 가라앉는다. 살아남은 상단이 그대의 이름 없는 무용을 강호에 옮길 것이다. ' +
      '살수의 배후 — 혈교의 그림자가 중원 깊숙이 뻗어 있음을, 그대는 이제 안다.\n\n' +
      '소문은 빠르게 번지고, 정사(正邪)의 긴장은 활시위처럼 당겨진다.',
    choices: [
      { label: '연화봉으로 돌아가 다음을 준비한다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_omyeong' },
          { goto: 'ch3_war' }
        ] }
    ]
  },

  /* ════════ 챕터 3 — 정사대전 · 9존 · 군림천하 ════════ */
  ch3_war: {
    title: '정사대전(正邪大戰)', act: '轉',
    text:
      '끝내 정사대전의 봉화가 올랐다. 무림맹의 깃발 아래, 화산의 검도 전선에 선다. ' +
      '한 전투의 끝, 그대 앞에 무릎 꿇린 사파 포로들이 있다. 그중엔 칼 한 번 못 잡아본 짐꾼·아낙도 섞였다.\n\n' +
      '무림맹의 명은 차갑다 — "사마의 씨를 남기지 말라." 장로의 눈이 그대를 향한다. 명분인가, 협인가.',
    choices: [
      { label: '무고한 자들을 가려 풀어준다 (명을 어기더라도)', set: { hyeop: +3, defiedOrder: true }, goto: 'ch3_throne' },
      { label: '무림맹의 명을 따라 모두 벤다', set: { ak: +2, obeyedOrder: true }, goto: 'ch3_throne' },
      { label: '포로를 방패 삼아 적장을 압박한다 (실리)', set: { ak: +1, sili: +1 }, goto: 'ch3_throne' }
    ]
  },
  ch3_throne: {
    title: '검존(劍尊)의 그림자', act: '轉',
    text:
      '대전의 한복판에서, 한 노검객이 홀로 걸어 나온다. 천하 서열 9존의 하나 — 검존(劍尊). ' +
      '그의 검은 이미 인간의 경지를 넘어, 휘두르기도 전에 그대의 숨을 짓누른다.\n\n' +
      '"애송이. 네 검에 무엇이 담겼는지 보자." 도망칠 수 없는 벽이 거기 서 있다. 그대는 어떻게 맞서는가.',
    choices: [
      { label: '전력으로 검을 겨눈다 — 꺾이더라도 물러서지 않는다', set: { hyeop: +2, faceThrone: true }, goto: 'ch3_finale' },
      { label: '검존의 도(道)를 묻고, 가르침을 청한다', requires: { artTierMin: 2 }, set: { wooThrone: true, hyeop: +2 }, goto: 'ch3_finale' },
      { label: '아직 때가 아니다 — 검을 거두고 훗날을 기약한다', set: { withdrew: true }, goto: 'ch3_finale' }
    ]
  },
  ch3_finale: {
    title: '군림(君臨)으로 가는 길', act: '結',
    text: '검존이 검을 거둔다. 그 한 합에서, 강호는 한 무명인의 이름을 처음으로 똑똑히 보았다.',
    choices: [
      { label: '강호가 그대를 어떻게 새기는지 듣는다',
        goto: [
          { requires: { flag: 'obeyedOrder', eq: true }, goto: 'ending_omyeong' },
          { requires: { flag: 'wooThrone', eq: true }, goto: 'ending_geomseon' },
          { requires: { flag: 'defiedOrder', eq: true }, goto: 'ending_run_cheonha' },
          { requires: { flag: 'withdrew', eq: true }, goto: 'ending_hyeopgaek' },
          { goto: 'ending_run_cheonha' }
        ] }
    ]
  },

  /* 군림천하 — 본 런의 정점 엔딩 */
  ending_run_cheonha: {
    title: '엔딩 · 군림천하(君臨天下)의 발치', act: '結', ending: true, endKind: 'cheonha',
    text:
      '정사대전은 끝났고, 검존조차 그대의 검을 인정했다. 무고한 자를 가려 살린 협(俠)이, 무림의 입에서 입으로 전해진다.\n\n' +
      '그대는 더 이상 이름 없는 자가 아니다. 천하 서열 — 1신 9존의 자리가, 까마득하되 분명히, 그대를 향해 길을 연다. ' +
      '군림천하(君臨天下)의 첫 발치에서, 한 무명인의 전설이 비로소 시작된다.\n\n※ 이 너머에 — 인간 무(武)의 끝, 승천(昇天)의 떡밥이 기다린다.',
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
