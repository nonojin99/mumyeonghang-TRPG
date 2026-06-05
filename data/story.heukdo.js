/* 무명행 TextRPG — 흑도(黑道) 오리진 챕터 (심화판) · 사파 줄기
 * 같은 기승전결 골격, 도덕축은 실리 vs 의리. 하오문 정보 / 확률 청부 / 2비트 위기.
 */
(function () {
  var add = {

  /* ── 起 ── */
  prologue_heukdo: {
    title: '무명(無名)', act: '起',
    text:
      '그대에게는 아직 이름이 없다.\n\n' +
      '빛이 들지 않는 흑점(黑店)의 뒷골목. 비린내와 술내가 엉킨 그늘 속에서, 그대는 부러진 비수를 만지작거린다. ' +
      '가슴 한복판엔 식지 않는 것이 있다 — 굶주림인지 야망인지, 아직 그대조차 모르는 갈망.\n\n' +
      '빛 아래엔 명문정파의 검이, 그늘엔 흑도(黑道)의 칼이 있다. 그대는 무엇을 좇아 이 어둠에 발을 들이는가.',
    choices: [
      { label: '출세 — 한 자리 차지하고 위로 올라가리라', set: { motive: '출세' }, goto: 'heukdo_arrival' },
      { label: '빚 — 갚아야 할 것이 있다, 수단은 가리지 않는다', set: { motive: '빚' }, goto: 'heukdo_arrival' },
      { label: '힘 — 누구도 나를 함부로 못 하게', set: { motive: '힘', ak: +1 }, goto: 'heukdo_arrival' }
    ]
  },

  /* ── 承 ── */
  heukdo_arrival: {
    title: '흑점의 거간', act: '承',
    text:
      '기름불 아래, 손가락에 칼 흉터가 가득한 거간(居間)이 그대를 훑는다. 흑도의 청부를 잇는 중개인이다.\n\n' +
      '"이름도 없는 뜨내기가 흑점엔 무슨 볼일이지. 여긴 의리로 밥 먹는 데가 아니야 — 쓸모를 보이든가, 꺼지든가."',
    choices: [
      { label: '"일을 주시오. 쓸모는 칼로 증명하겠소"', set: { rel_geogan: +1 }, goto: 'heukdo_deal' },
      { label: '뒷골목 시비를 단숨에 제압해 실력을 보인다', set: { rel_geogan: +1 }, goto: 'heukdo_spar' },
      { label: '"이런 시궁창에서 뭘 배우겠소" — 코웃음 친다', set: { ak: +1 }, goto: 'heukdo_rebuff' }
    ]
  },
  heukdo_spar: {
    title: '뒷골목', act: '承',
    text:
      '시비를 걸어온 칼잡이 둘을 그대는 눈 깜짝할 새 바닥에 눕힌다. 비수 한 번 뽑지 않고.\n\n' +
      '거간이 처음으로 웃는다. "그 손속… 살문(殺門)에 들 생각 있나. 아니면 한 건만 뛰고 빠지든가."',
    choices: [
      { label: '"살문에 들겠소" — 흑도의 칼이 된다', set: { rel_geogan: +1 }, goto: 'heukdo_deal' },
      { label: '"한 건만" — 매이지 않는 뜨내기로 남는다', set: { joined: false }, goto: 'heukdo_haomun' }
    ]
  },
  heukdo_rebuff: {
    title: '냉대', act: '承',
    text:
      '거간의 눈이 차갑게 식는다. "흥. 시궁창 물도 못 마실 주제에." 칼잡이들이 그대를 에워싼다. ' +
      '흑점에서 거간을 무시한 값은 싸지 않다.',
    choices: [
      { label: '말을 거두고 청부를 청한다', goto: 'heukdo_deal' },
      { label: '포위를 뚫고 어둠 속으로 사라진다', set: { joined: false, ak: +1 }, goto: 'heukdo_haomun' }
    ]
  },
  heukdo_deal: {
    title: '입문 — 살문의 칼', act: '承', effect: 'rollArt',
    text:
      '거간이 기름 먹인 보따리를 던진다. 흑도의 살수 무공이 적힌 비전(秘傳)이 들었다. ' +
      '"그림자에서 나와, 그림자로 돌아가라. 그게 우리 법이다."\n\n— 그대는 「{art}」을(를) 익혔다.',
    choices: [ { label: '비전을 품고, 살문의 칼이 된다', set: { joined: true, sili: +1 }, goto: 'heukdo_haomun' } ]
  },

  /* 承 — 하오문(下汚門) 정보 이벤트 (사파 정보망, 철저히 은자) */
  heukdo_haomun: {
    title: '기루의 점소이', act: '承',
    text:
      '기루 뒷문, 하오문(下汚門)의 점소이가 눈짓한다. "어디로 가시든 그 앞 사정은 제가 압죠. ' +
      '마부도 기녀도 다 우리 식구라. 은자만 내시면 — 약점까지 곁들여."',
    choices: [
      { label: '은자를 치르고 표적의 내막을 산다', set: { bossIntel: true, sili: +1 }, goto: 'crisis_contract' },
      { label: '공짜 소문만 듣는다', set: { rumor: true }, goto: 'crisis_contract' },
      { label: '믿지 않고 지나친다', goto: 'crisis_contract' }
    ]
  },

  /* 轉 — 확률 분기: 청부 표적이 매 런 다르게 (연출 변주) */
  crisis_contract: {
    title: '청부', act: '轉',
    text:
      '첫 청부가 떨어진다. 동행은 독을 잘 쓰는 흑도 살수 ‘독아(毒牙)’ — 신뢰할 수 없는 자다. ' +
      '표적이 누구인지, 거간의 전갈이 막 도착한다.',
    choices: [
      { label: '― 전갈을 펼친다',
        goto: [ { weight: 1, goto: 'contract_merchant' }, { weight: 1, goto: 'contract_informer' } ] }
    ]
  },
  contract_merchant: {
    title: '표적 — 빚진 상인', act: '轉',
    text:
      '표적은 빚을 갚지 못한 상인. 처자식이 있는, 칼 한 번 잡아본 적 없는 자다.\n\n' +
      '독아가 귀에 속삭인다. "이왕 손 더럽힌 거, 금고까지 털고 입막음으로 처자식도 지우지. 거간껜 비밀로 — 판돈은 우리 둘이."',
    choices: [ { label: '― 독아의 칼이 움직이기 시작한다', set: { targetType: '상인' }, goto: 'heukdo_decision' } ]
  },
  contract_informer: {
    title: '표적 — 조직을 판 밀고자', act: '轉',
    text:
      '표적은 흑도의 거래를 관(官)에 판 밀고자. 죽어 마땅하다는 데엔 이견이 없다.\n\n' +
      '독아가 귀에 속삭인다. "이 자가 빼돌린 은자가 어딘가 있어. 거간껜 ‘처리했다’고만 하고 — 은자는 우리 둘이 챙기지."',
    choices: [ { label: '― 독아의 칼이 움직이기 시작한다', set: { targetType: '밀고자' }, goto: 'heukdo_decision' } ]
  },

  /* 2비트 위기 — 짧은 결단만 시간제한 */
  heukdo_decision: {
    title: '찰나', act: '轉',
    text: '독아의 비수가 번뜩인다. 그대의 칼은 어디로 가는가.',
    timedNote: '지금 — 독아보다 빨라야 한다.',
    choices: [
      { label: '청부만 처리하고, 독아의 욕심을 제지한다 (프로)', set: { sili: +1, savedExtra: true }, goto: 'heukdo_after' },
      { label: '독아를 베고, 표적을 살려 보낸다 (의외의 선택)', set: { hyeop: +2, killedDoka: true }, goto: 'heukdo_after' },
      { label: '❖ 은신·기척으로 둘 다 따돌리고 판돈만 챙겨 사라진다', requires: { artTierMin: 2 }, set: { sili: +2, savedExtra: true }, goto: 'heukdo_after' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, naesang: true }, goto: 'heukdo_after' }
  },

  /* 轉 — 뒤처리: 독아/거간과의 셈 */
  heukdo_after: {
    title: '뒤처리', act: '轉',
    text:
      '일이 끝났다. 독아가 — 살아있다면 — 곁눈질로 그대를 잰다. 흑점의 셈은 칼보다 차갑다.',
    choices: [
      { label: '거간에게 사실대로 보고한다', set: { sili: +1 }, goto: 'aftermath_heukdo' },
      { label: '독아의 입을 막아 판돈을 독차지한다', requires: { flag: 'killedDoka', lte: 0 }, set: { ak: +1, soloLoot: true }, goto: 'aftermath_heukdo' },
      { label: '말없이 그늘로 사라진다', goto: 'aftermath_heukdo' }
    ]
  },

  aftermath_heukdo: {
    title: '그늘로', act: '轉',
    text:
      '어둠은 오늘 그대가 한 일을 묻지 않는다 — 다만 값으로 기억할 뿐이다. 이름 없던 칼의 첫 청부가 막을 내린다.',
    choices: [
      { label: '흑점이 그대를 어떻게 셈하는지 듣는다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_baesin' },
          { requires: { flag: 'hyeop', gte: 2 }, goto: 'ending_nangin_sapa' },
          { requires: { flag: 'joined', eq: false }, goto: 'ending_nangin_sapa' },
          { requires: { flag: 'soloLoot', eq: true }, goto: 'ending_amjon' },
          { goto: 'ending_heukcheon' }
        ] }
    ]
  },

  /* ── 結 ── */
  ending_heukcheon: {
    title: '엔딩 · 흑도천하의 발판', act: '結', ending: true, endKind: 'heukcheon',
    text:
      '거간이 처음으로 그대의 어깨를 두드린다. "쓸 만한 칼이군." 깔끔하게 처리된 청부가 흑점의 입을 타고 흐른다 — 군말 없이, 흔적 없이.\n\n' +
      '어둠은 이미 그대를 「쓸 만한 칼」로 기억한다. 살문의 정점, 그림자살왕 암존(暗尊)의 자리까지 — 차갑고 효율적인 길이 열린다.\n\n※ 살려 보낸 표적의 자비가, 언젠가 빚이 되어 돌아올지도. (지연 씨앗)',
    choices: []
  },
  ending_amjon: {
    title: '엔딩 · 암존(暗尊)을 향한 그림자 [숨은]', act: '結', ending: true, endKind: 'hidden',
    text:
      '동료의 입을 막고, 판돈을 독차지하고, 흔적조차 남기지 않았다. 거간조차 그대가 무엇을 했는지 끝내 알지 못한다.\n\n' +
      '신뢰가 아니라 두려움이 그대의 이름을 대신하기 시작한다. 흑도의 가장 깊은 그늘에서, 사람들은 종적 없는 칼 하나를 속삭인다 — ' +
      '훗날 그림자살왕 암존(暗尊)의 자리를 노릴, 이름 없는 자.',
    choices: []
  },
  ending_nangin_sapa: {
    title: '엔딩 · 칼을 거둔 자', act: '結', ending: true, endKind: 'nangin',
    text:
      '그대는 흑도의 법을 어겼다. 동료를 베었거나, 애초에 매이지 않았거나. 흑점은 그대를 ‘물러터진 칼’이라 부르며 등을 돌린다.\n\n' +
      '의리인지 변심인지 — 그대 자신도 아직 모른다. 그늘을 떠나 홀로 강호를 걷는 낭인(浪人)에게도 천하 서열의 정점은 열려 있다. 다만 더 외롭고, 더 위험할 뿐.',
    choices: []
  },
  ending_baesin: {
    title: '엔딩 · 신뢰를 잃은 칼', act: '結', ending: true, endKind: 'omyeong',
    text:
      '그대가 머뭇거린 찰나, 일은 난장판이 되었다. 표적은 놓치고, 독아와는 척을 졌다. 흑점에서 신뢰를 잃은 칼만큼 값싼 것은 없다.\n\n' +
      '"믿을 수 없는 자"라는 평이 어둠을 타고 퍼진다. 청부는 끊기고, 등 뒤의 칼을 늘 경계해야 하는 삶이 시작된다. 그래도 — 가장 차가운 길 끝에도, 오직 거기에만 있는 정점이 있다.',
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
