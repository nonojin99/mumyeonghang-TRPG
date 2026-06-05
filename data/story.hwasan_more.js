/* 무명행 TextRPG — 화산 연결조직·소에피소드·전쟁역할 분기 (플레이 피드백 반영)
 * story.hwasan.js / hwasan_run.js / hwasan_run2.js 다음에 로드.
 * 목적: (1) 장면 점프의 개연성 보강(연결 beat 삽입) (2) 입문 성장·관계 소에피소드
 *       (3) 정사대전 4역할 분기(돌격대장·군사·독고다이·합공)로 흐름 다양화.
 */
(function () {
  var add = {

  /* ── 입문 카테고리 소에피소드 (hwasan_test → 첫 나날 → hwasan_market) ──
   * hwasan_test를 덮어써 입문 직후 곧장 저잣거리로 넘기지 않고, 성장·관계 beat를 거친다. */
  hwasan_test: {
    title: '입문 — 무공 전수', act: '承', effect: 'rollArt',
    text:
      '연화봉 도관(道觀). 자줏빛 도포의 장로가 한 권의 검보(劍譜)를 내민다. ' +
      '"무의 그릇은 타고나되, 갈고닦음은 사람의 몫이다."\n\n— 그대는 「{art}」을(를) 전수받았다.',
    choices: [ { label: '검보를 받들고, 화산의 제자가 된다', set: { joined: true, hyeop: +1 }, goto: 'hm_firstdays' } ]
  },
  hm_firstdays: {
    title: '연화봉의 첫 나날', act: '承',
    text:
      '입문이 끝이 아니라 시작임을, 그대는 곧 안다. 새벽이면 물을 긷고, 낮이면 검을 닦고, 밤이면 검보를 외운다. ' +
      '같은 마당을 쓰는 사형(師兄) 청운(靑雲) — 연화봉 초입에서 그대의 길을 막았던 바로 그 매화검수다.\n\n' +
      '"무명인 주제에 검은 제법이군." 그가 목검을 던진다. "한 수 받아라."',
    choices: [
      { label: '정면으로 맞붙어 실력을 보인다', set: { rel_cheongun: +1, hyeop: +1 }, goto: 'hm_brotherhood' },
      { label: '굳이 이기려 들지 않고 배우는 자세로 임한다', set: { rel_cheongun: +2 }, goto: 'hm_brotherhood' },
      { label: '겨룸을 마다하고 홀로 검보에 파고든다', set: { soloPath: true }, goto: 'hm_brotherhood' }
    ]
  },
  hm_brotherhood: {
    title: '매화가 피기까지', act: '承',
    text:
      '계절이 한 번 돈다. 청운과의 비무는 어느새 일과가 되었고, 그와의 사이엔 — 우정인지 경쟁인지 모를 것이 자란다. ' +
      '어느 밤, 청운이 술병을 들고 찾아온다. "사부님껜 비밀이다." 그가 자하신공(紫霞神功) 이야기를 꺼낸다 — ' +
      '화산 장문에게만 잇는 화경(化境)의 심법.\n\n"언젠가 너와 내가, 저 경지를 두고 다투게 될까." 그의 눈에 동경과 불안이 섞인다.',
    choices: [
      { label: '"그땐 정정당당히 겨루자" — 약속한다', set: { rel_cheongun: +1, vowCheongun: true }, goto: 'hwasan_market' },
      { label: '"무공에 정도(正道)가 어디 있나" — 떠본다', set: { ak: +1, ambition: true }, goto: 'hwasan_market' },
      { label: '말없이 술잔만 비운다', goto: 'hwasan_market' }
    ]
  },

  /* ════════ 정사대전 — 역할 분기 (ch3_war 덮어쓰기) ════════
   * 독사곡의 혈교 밀서가 무림맹을 움직였다는 연결을 명시해 개연성 보강. */
  ch3_war: {
    title: '봉화(烽火)', act: '轉',
    text:
      '그대가 독사곡에서 가져온 혈교(血敎)의 밀서 — 그것이 무림맹을 움직였다. ' +
      '사마(邪魔)의 준동이 밀서의 내용과 맞아떨어지자, 끝내 정사대전(正邪大戰)의 봉화가 올랐다.\n\n' +
      '무림맹 군의(軍議)에 화산의 이름으로 그대가 불려간다. 한 무명인이 전란의 한복판에 서는 순간이다.',
    choices: [ { label: '군의의 자리로 나아간다', goto: 'ch3_council' } ]
  },
  ch3_council: {
    title: '무림맹 군의(軍議)', act: '轉',
    text:
      '맹주(盟主)가 좌중을 둘러본다. 독사곡의 공(功)으로 그대의 무명이 알려진 터. ' +
      '"무명인, 자네는 어느 자리에서 이 전쟁을 치르겠는가." 네 갈래의 길이 그대 앞에 놓인다.',
    choices: [
      { label: '선봉 돌격대장(突擊隊長) — 최전선에서 검으로 길을 연다', set: { warRole: '돌격', hyeop: +1 }, goto: 'ch3_van' },
      { label: '군사(軍師) — 후방에서 전황을 읽고 한 수를 둔다', set: { warRole: '군사' }, goto: 'ch3_strategist' },
      { label: '단독 잠행(獨行) — 혼자 적 본진의 수괴를 노린다', set: { warRole: '독행', soloPath: true }, goto: 'ch3_lone' },
      { label: '정파 합공(合攻) — 무당·소림과 어깨를 건다', requires: { flag: 'hyeop', gte: 4 }, set: { warRole: '합공' }, goto: 'ch3_ally' }
    ]
  },

  /* 돌격대장 — 최전선 2비트 위기 */
  ch3_van: {
    title: '선봉(先鋒)', act: '轉',
    text:
      '그대가 든 깃발을 따라 정파의 검들이 적진으로 쏟아진다. 흙먼지와 비명, 부러지는 검. ' +
      '한복판에서, 혈교의 사술사가 아군 신참들을 향해 핏빛 장력을 끌어올린다.\n\n(깃발을 든 채로, 검이 먼저 닿아야 한다.)',
    choices: [ { label: '― 선두에서 검을 내지른다', goto: 'ch3_van_decide' } ]
  },
  ch3_van_decide: {
    title: '찰나', act: '轉',
    text: '핏빛 장력이 신참들의 머리 위로 떨어진다.',
    timedNote: '지금 — 선봉이 멈추면 전열이 무너진다.',
    choices: [
      { label: '몸을 던져 신참들을 막아선다', set: { hyeop: +3, savedTroops: true, naesang: true }, goto: 'ch3_frontmerge' },
      { label: '사술사의 목을 먼저 친다 (몇은 잃더라도)', set: { hyeop: +1, killedCaster: true }, goto: 'ch3_frontmerge' },
      { label: '❖ 매화 검기를 터뜨려 장력을 흩고 전열을 연다', requires: { artTierMin: 2 }, set: { hyeop: +4, savedTroops: true, maehwaFeat: true }, goto: 'ch3_frontmerge' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, savedTroops: false }, goto: 'ch3_frontmerge' }
  },

  /* 군사 — 다른 류의 무게(병사들의 목숨을 건 지략) */
  ch3_strategist: {
    title: '후방, 지도 앞에서', act: '轉',
    text:
      '그대는 검 대신 지도를 든다. 전령이 쉴 새 없이 오간다. 적의 본대가 좁은 협곡으로 들어섰다 — ' +
      '매복의 기회. 그러나 미끼가 된 아군 일대(一隊)는 희생될 것이다.\n\n검을 휘두르는 것과는 다른 무게가, 붓을 쥔 손에 얹힌다.',
    choices: [
      { label: '매복을 명한다 — 한 부대를 미끼로 대승을 거둔다', set: { sili: +2, sacrificedUnit: true, obeyedOrder: true }, goto: 'ch3_frontmerge' },
      { label: '미끼 부대를 빼내고 정공으로 맞선다 (피해는 크되 버리지 않는다)', set: { hyeop: +3, defiedOrder: true }, goto: 'ch3_frontmerge' },
      { label: '적장에게 거짓 항복서를 보내 시간을 번다 (계략)', set: { sili: +1, hyeop: +1, ruse: true }, goto: 'ch3_frontmerge' }
    ]
  },

  /* 독고다이 — 혼자 적 본진, 혈교 수괴 직격 */
  ch3_lone: {
    title: '단신, 적의 심장으로', act: '轉',
    text:
      '그대는 전열을 등지고 홀로 적진 깊이 스민다. 목표는 하나 — 연화봉에서, 관도에서, 독사곡에서 그대를 쫓아온 ' +
      '혈교의 수괴. 모든 인연의 끝이 그 천막 안에 있다.\n\n' +
      '"또 너냐." 수괴가 핏빛 검을 뽑는다. "이번엔 살아 못 돌아간다."',
    choices: [
      { label: '단숨에 베어 인연을 끝낸다', set: { hyeop: +2, killedHyeolgyo: true, leadHyeolgyo: true }, goto: 'ch3_frontmerge' },
      { label: '사로잡아 혈교 본단의 위치를 캐낸다', requires: { flag: 'artTier', gte: 2 }, set: { hyeop: +3, capturedHyeolgyo: true, leadHyeolgyo: true }, goto: 'ch3_frontmerge' },
      { label: '함정임을 직감하고 빠져나오며 본진에 불을 지른다', set: { sili: +1, burnedCamp: true }, goto: 'ch3_frontmerge' }
    ]
  },

  /* 합공 — 무당·소림과 어깨를 걸고 (관계·합격술) */
  ch3_ally: {
    title: '구파(九派)의 합공', act: '轉',
    text:
      '무당의 태극검과 소림의 항마곤이 그대의 매화검 옆에 선다. 검의 정통을 두고 은근히 다투던 무당 검수가, ' +
      '오늘만은 등을 맡긴다. "오늘은 화산의 검을 믿지." 세 문파의 무공이 한 진(陣)을 이룬다.\n\n' +
      '적의 정예가 밀려든다 — 혼자가 아니라는 것이, 검을 더 멀리 뻗게 한다.',
    choices: [
      { label: '합격진(合擊陣)의 중심에서 매화를 터뜨린다', set: { hyeop: +3, allyBond: true, maehwaFeat: true }, goto: 'ch3_frontmerge' },
      { label: '무당·소림을 앞세우고 빈틈을 메운다 (조화)', set: { hyeop: +2, allyBond: true }, goto: 'ch3_frontmerge' },
      { label: '공을 독차지하려 홀로 앞서 나간다', set: { ak: +1, hoggedGlory: true }, goto: 'ch3_frontmerge' }
    ]
  },

  /* 합류 — 전투 종결 + 포로 도덕 선택(원래 ch3_war의 핵심 선택을 여기로) */
  ch3_frontmerge: {
    title: '전장의 끝', act: '轉',
    text:
      (/* 역할별 한 줄 회수 */ '') +
      '한 전투가 끝났다. 그대의 역할이 무엇이었든, 전장은 그대의 이름을 강호에 새겼다. ' +
      '연기 자욱한 들판에, 무릎 꿇린 사파 포로들이 남았다 — 그중엔 칼 한 번 못 잡아본 짐꾼·아낙도 섞였다.\n\n' +
      '무림맹의 명은 차갑다. "사마의 씨를 남기지 말라." 명분인가, 협인가.',
    choices: [
      { label: '무고한 자들을 가려 풀어준다 (명을 어기더라도)', set: { hyeop: +3, defiedOrder: true }, goto: 'ch3_throne' },
      { label: '무림맹의 명을 따라 모두 벤다', set: { ak: +2, obeyedOrder: true }, goto: 'ch3_throne' },
      { label: '포로를 인질 삼아 적장을 압박한다 (실리)', set: { ak: +1, sili: +1 }, goto: 'ch3_throne' }
    ]
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
