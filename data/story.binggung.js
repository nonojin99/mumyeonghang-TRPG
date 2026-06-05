/* 무명행 TextRPG — 북해빙궁(北海冰宮) 오리진 (심화판) · 새외 줄기
 * 자기 등록형 모듈: FACTIONS/ORIGINS/ARTS_POOL + 장면을 한 파일에서 더한다.
 * ("오리진 추가 = 데이터 파일 하나"의 실증)  도덕축: 사명(使命) vs 연(緣).
 */
(function () {

  var faction = { binggung: { name: '새외 · 빙궁', hanja: '北海冰宮', creed: '한설(寒雪)의 사명', tone: '#5aa6cd' } };
  var origin = { binggung: {
    faction: 'binggung', name: '북해빙궁', hanja: '北海冰宮',
    place: '만리장성 너머 북해(北海)의 설궁(雪宮)',
    essence: '북해의 한기로 적을 얼려 묶고, 중원 서열에 도전하는 새외(塞外)의 설궁.',
    startScene: 'prologue_binggung'
  } };
  var arts = { binggung: [
    { id: 'eumgi',   name: '음기심법', grade: '삼류', tier: 1, weight: 52 },
    { id: 'hanseol', name: '한설장법', grade: '일류', tier: 2, weight: 30 },
    { id: 'bingbaek',name: '빙백장',   grade: '절정', tier: 3, weight: 18 }
  ] };

  var add = {

  /* ── 起 ── */
  prologue_binggung: {
    title: '무명(無名)', act: '起',
    text:
      '그대에게는 아직 이름이 없다.\n\n' +
      '만년설이 우는 북해(北海)의 끝. 살을 에는 한기 속에서 자란 그대는, 부르튼 손으로 빙궁(冰宮)의 문을 두드린다. ' +
      '가슴 한복판엔 식지 않는 — 아니, 얼지 않는 불씨가 있다. 무(武)에 대한 갈망.\n\n' +
      '중원(中原)의 무림은 그대 같은 새외인(塞外人)을 침입자라 부른다. 그러나 한설의 힘에도 천하 서열의 정점은 열려 있다. ' +
      '그대는 무엇을 좇아 이 설궁의 문을 두드리는가.',
    choices: [
      { label: '사명 — 빙궁의 힘으로 중원 서열에 오르리라', set: { motive: '사명' }, goto: 'binggung_arrival' },
      { label: '귀속 — 얼지 않을 곳, 속할 곳이 필요하다', set: { motive: '귀속' }, goto: 'binggung_arrival' },
      { label: '동경 — 소문으로만 듣던 중원의 무(武)를 보고 싶다', set: { motive: '동경', yearnCenter: true }, goto: 'binggung_arrival' }
    ]
  },

  /* ── 承 ── */
  binggung_arrival: {
    title: '설궁의 문', act: '承',
    text:
      '얼음 기둥이 늘어선 설궁 입구. 한기를 두른 설객(雪客)이 그대 앞을 막는다. 빙궁의 척후장이다.\n\n' +
      '"북해의 추위도 못 버틴 자는 중원의 칼은 더 못 버틴다. 무명인이 무슨 낯으로 설궁에 드는가."',
    choices: [
      { label: '무릎 꿇고 한설(寒雪)의 가르침을 청한다', set: { rel_seolgaek: +1 }, goto: 'binggung_test' },
      { label: '한기를 끌어내 버티며 실력을 보인다', set: { rel_seolgaek: +1 }, goto: 'binggung_test' },
      { label: '"중원의 무가 더 궁금하오" — 솔직히 말한다', set: { yearnCenter: true, ak: +1 }, goto: 'binggung_rebuff' }
    ]
  },
  binggung_rebuff: {
    title: '의심받는 자', act: '承',
    text:
      '설객의 눈에서 한기가 돈다. "중원을 동경하는 자를 어찌 믿고 등을 맡기나." ' +
      '그러나 빙궁은 사람이 귀한 변방이다 — 쓸 만한 칼이라면, 의심한 채로도 쓴다.',
    choices: [
      { label: '의심을 받아들이고 사명을 청한다', goto: 'binggung_test' },
      { label: '설궁을 등지고 홀로 중원으로 향한다', set: { joined: false, yearnCenter: true }, goto: 'binggung_haomun' }
    ]
  },
  binggung_test: {
    title: '입문 — 한설(寒雪) 전수', act: '承', effect: 'rollArt',
    text:
      '얼음 제단 위, 빙궁의 호법이 음한지기(陰寒之氣)를 그대의 단전에 흘려넣는다. ' +
      '뼈가 시리고, 그 시림 끝에서 한 갈래 힘이 깨어난다.\n\n— 그대는 「{art}」을(를) 전수받았다.',
    choices: [ { label: '한설을 받들고, 빙궁의 칼이 된다', set: { joined: true, mission: true }, goto: 'binggung_haomun' } ]
  },

  /* 承 — 새외는 자체 정보망이 약하다 → 중원 길목에서 하오문에 의지(돈) */
  binggung_haomun: {
    title: '중원 길목 — 하오문', act: '承',
    text:
      '장성을 넘어 중원으로 든 첫 저잣거리. 빙궁의 이름은 여기선 통하지 않는다. ' +
      '하오문(下汚門)의 끄나풀이 다가온다. "새외 분께도 팝니다. 정보에 진영이 어디 있습니까 — 값은, 두 배요."',
    choices: [
      { label: '값을 두 배로 치르고 앞길의 위험을 산다', set: { bossIntel: true }, goto: 'crisis_fire' },
      { label: '공짜 소문만 줍는다', set: { rumor: true }, goto: 'crisis_fire' },
      { label: '정보 없이 힘으로 돌파한다', set: { hardway: true }, goto: 'crisis_fire' }
    ]
  },

  /* ── 轉 (빙↔화 상극, 2비트 위기) ── */
  crisis_fire: {
    title: '불의 자객', act: '轉',
    text:
      '관도(官道)의 갈림길. 열기가 훅 끼친다 — 남해태양궁(南海太陽宮)의 화공(火功) 자객이다. 빙(氷)의 천적.\n\n' +
      '동행하던 빙궁 설객이 화염 채찍에 휘감겨 쓰러진다. 살갗이 타들어가는 화상, 멎지 않는 불기운. ' +
      '자객의 불길이 천천히 그대를 향해 방향을 튼다.\n\n(한설을 끌어올릴 것인가, 칼을 뽑을 것인가 — 몸이 먼저 정해야 한다.)',
    choices: [ { label: '― 단전의 한기를 끌어올린다', goto: 'crisis_fire_decide' } ]
  },
  crisis_fire_decide: {
    title: '찰나', act: '轉',
    text: '화상이 번진다. 불 채찍이 다시 솟구친다.',
    timedNote: '지금 — 불길보다 빨라야 한다.',
    choices: [
      { label: '한기로 설객의 화상을 다스린다 (자객은 놓친다)', set: { hyeop: +2, savedSeolgaek: true, fireFled: true }, goto: 'crisis_fire_after' },
      { label: '자객을 먼저 벤다 (설객을 지킬 틈이 없다)', set: { killedFire: true, savedSeolgaek: false, naesang: true }, goto: 'crisis_fire_after' },
      { label: '❖ 빙막으로 불길을 가르고 설객을 끌어낸다', requires: { artTierMin: 2 }, set: { hyeop: +3, savedSeolgaek: true, killedFire: true }, goto: 'crisis_fire_after' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, savedSeolgaek: false, fireFled: true }, goto: 'crisis_fire_after' }
  },
  crisis_fire_after: {
    title: '얼음과 재', act: '轉',
    text:
      '열기가 가신다. 녹은 눈과 탄 재가 뒤섞인 길 위에서, 살아남은 자와 사라진 자가 갈린다. ' +
      '중원의 행인 하나가 멀찍이서 그 광경을 지켜본다 — 새외의 한기를, 처음 본 눈으로.',
    choices: [
      { label: '달아난 화공 자객을 쫓는다', requires: { flag: 'fireFled', eq: true }, set: { pursued: true, killedFire: true, fireFled: false }, goto: 'aftermath_bing' },
      { label: '지켜보던 중원인에게 손을 내민다', requires: { flag: 'yearnCenter', eq: true }, set: { centerBond: true, hyeop: +1 }, goto: 'aftermath_bing' },
      { label: '말없이 사명의 길을 재촉한다', goto: 'aftermath_bing' }
    ]
  },

  aftermath_bing: {
    title: '북녘을 등지고', act: '轉',
    text:
      '눈이 녹은 자리에 그대의 발자국이 남는다. 새외에서 온 무명인의 첫 행(行)이 — 중원의 입을 타고 — 막을 내린다.',
    choices: [
      { label: '강호가 그대를 어떻게 부르는지 듣는다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_bing_omyeong' },
          { requires: { flag: 'ak', gte: 3 }, goto: 'ending_bing_omyeong' },
          { requires: { flag: 'pursued', eq: true }, goto: 'ending_seolwang' },
          { requires: { flag: 'centerBond', eq: true }, goto: 'ending_gwihwa' },
          { requires: { flag: 'joined', eq: false }, goto: 'ending_gwihwa' },
          { goto: 'ending_bingjon' }
        ] }
    ]
  },

  /* ── 結 ── */
  ending_bingjon: {
    title: '엔딩 · 빙존(氷尊)을 향하여', act: '結', ending: true, endKind: 'heukcheon',
    text:
      '그대는 사명을 지켰고, 빙궁의 한설을 중원에 새겼다. 설궁의 호법이 처음으로 고개를 끄덕인다. "북해의 칼이로군."\n\n' +
      '새외의 무명인이 중원 서열의 발치에 한 발을 디뎠다. 그 끝에는 北海雪王 — 9존 빙존(氷尊)의 자리가 만년설처럼 그대를 기다린다.',
    choices: []
  },
  ending_seolwang: {
    title: '엔딩 · 북해설왕(北海雪王)의 조짐 [숨은]', act: '結', ending: true, endKind: 'hidden',
    text:
      '그대는 설객을 지키고, 달아난 화공 자객마저 얼려 끝냈다. 빙(氷)이 화(火)를 삼킨 그 광경을, 중원은 오래 기억할 것이다.\n\n' +
      '남해태양궁과 북해빙궁 — 한열(寒熱)의 오랜 상극에, 한 이름 없는 자가 첫 획을 그었다. ' +
      '사람들은 훗날의 北海雪王을 속삭이기 시작한다. 빙존의 옥좌도, 남해와의 끝없는 인연도, 모두 이 한기에서 비롯된다.',
    choices: []
  },
  ending_gwihwa: {
    title: '엔딩 · 중원에 남은 한기', act: '結', ending: true, endKind: 'nangin',
    text:
      '그대는 사명을 등졌거나, 중원의 손을 잡았다. 빙궁은 그대를 변절자라 부를 것이고, 중원은 끝내 새외인이라 곁눈질할 것이다.\n\n' +
      '어디에도 온전히 속하지 못한 채 — 그러나 어디에도 매이지 않은 채, 그대는 홀로 중원을 걷는다. ' +
      '두 세계 사이의 낭인(浪人)에게도, 천하 서열의 정점은 열려 있다. 다만 그 길은 더 외롭고, 더 추울 뿐.',
    choices: []
  },
  ending_bing_omyeong: {
    title: '엔딩 · 녹아버린 이름', act: '結', ending: true, endKind: 'omyeong',
    text:
      '그대가 머뭇거린 찰나, 설객은 재가 되었고 그대의 한기는 불길에 녹았다. 빙궁의 사명은 첫 길목에서 꺾였다.\n\n' +
      '"새외의 칼은 중원의 불에 녹았다" — 비웃음이 강호로 퍼진다. 그래도 얼음은 다시 언다. ' +
      '가장 차가운 실패의 끝에도, 오직 거기서만 벼려지는 한기가 있다.',
    choices: []
  }

  };

  if (typeof module !== 'undefined' && module.exports) {
    var w = require('./world.js');
    for (var f in faction) w.FACTIONS[f] = faction[f];
    for (var o in origin) w.ORIGINS[o] = origin[o];
    for (var a in arts) w.ARTS_POOL[a] = arts[a];
    var core = require('./story.core.js');
    for (var k in add) core.SCENES[k] = add[k];
    module.exports = add;
  } else {
    for (var f2 in faction) FACTIONS[f2] = faction[f2];
    for (var o2 in origin) ORIGINS[o2] = origin[o2];
    for (var a2 in arts) ARTS_POOL[a2] = arts[a2];
    for (var k2 in add) SCENES[k2] = add[k2];
  }
})();
