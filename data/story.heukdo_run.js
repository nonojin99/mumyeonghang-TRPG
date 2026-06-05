/* 무명행 TextRPG — 흑도 1회차 확장 (챕터2 교역로·녹림 / 챕터3 당문·암존)
 * story.heukdo.js 다음에 로드 → aftermath_heukdo를 덮어써 청부 하나로 끝나지 않고 강호로 잇는다.
 * 지리 연계: 흑점(도시)→교역로 녹림 약탈→사천 당문 독·암기→9존 암존(그림자살왕).
 */
(function () {
  var add = {

  aftermath_heukdo: {
    title: '그늘로', act: '轉',
    text:
      '어둠은 오늘 그대가 한 일을 묻지 않는다 — 다만 값으로 기억할 뿐이다. ' +
      '첫 청부가 깔끔히 끝나자, 거간의 눈빛이 달라졌다. 이건 시작에 불과하다.',
    choices: [
      { label: '거간이 내미는 다음 일을 받는다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_baesin' },
          { requires: { flag: 'joined', eq: false }, goto: 'ending_nangin_sapa' },
          { goto: 'hd2_bigjob' }
        ] }
    ]
  },

  /* ════════ 챕터 2 — 교역로와 녹림(綠林) ════════ */
  hd2_bigjob: {
    title: '큰 청부', act: '承',
    text:
      '거간이 지도를 편다. "관도(官道)를 지나는 비단 상단이다. 호위가 두터워 우리 칼만으론 벅차. ' +
      '산을 낀 길목엔 녹림(綠林) 산채가 있지 — 벽력채(霹靂寨). 손을 잡든가, 판을 통째로 먹든가."',
    choices: [
      { label: '녹림 산채와 손을 잡으러 간다', goto: 'hd2_nokrim' },
      { label: '단독으로 판을 가로챌 길을 찾는다 (실리)', set: { sili: +1, soloPlan: true }, goto: 'hd2_nokrim' },
      { label: '하오문에 들러 상단·산채의 내막부터 산다', set: { bossIntel: true }, goto: 'hd2_nokrim' }
    ]
  },
  hd2_nokrim: {
    title: '벽력채 산채', act: '承',
    text:
      '산허리의 녹림 산채. 도끼를 멘 벽력채주가 그대를 내려다본다. "흑점의 칼이 산까지 기어올랐군." ' +
      '녹림은 힘과 의리로 묶인 무리 — 흑도의 차가운 실리와는 물과 기름이다. 그러나 길목의 상단은 탐난다.',
    choices: [
      { label: '대등하게 판돈을 나누자 제안한다 (합작)', set: { nokrimAlly: true, hyeop: +1 }, goto: 'hd2_raid' },
      { label: '산채를 부추겨 앞세우고 뒤를 챈다 (이용)', set: { ak: +1, usedNokrim: true }, goto: 'hd2_raid' },
      { label: '채주의 약점을 들어 굴복시킨다', requires: { flag: 'bossIntel', eq: true }, set: { ak: +1, sili: +1 }, goto: 'hd2_raid' }
    ]
  },
  hd2_raid: {
    title: '관도의 약탈', act: '轉',
    text:
      '비단 상단이 관도를 지난다. 호위 속에 낯선 손놀림이 섞였다 — 사천 당문(唐門)의 암기수(暗器手)다. ' +
      '비단을 지키러 당문이 붙은 것. 암기 대 암기, 그림자 대 독침.\n\n(독침이 날아든다 — 몸이 먼저 정한다.)',
    choices: [ { label: '― 비수를 역수로 쥔다', goto: 'hd2_decide' } ]
  },
  hd2_decide: {
    title: '찰나', act: '轉',
    text: '당문 암기수의 독침이 부챗살처럼 퍼진다.',
    timedNote: '지금 — 독침보다 빨라야 한다.',
    choices: [
      { label: '그림자로 파고들어 암기수를 제압한다', set: { hyeop: +2, beatDangmun: true }, goto: 'hd2_after' },
      { label: '상단 우두머리만 노려 판을 끝낸다 (실리)', set: { sili: +2, tookGoods: true }, goto: 'hd2_after' },
      { label: '❖ 은신·기척으로 호위를 흩고 요인만 지운다', requires: { artTierMin: 2 }, set: { hyeop: +3, sili: +1, ghostFeat: true }, goto: 'hd2_after' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, naesang: true, poisoned: true }, goto: 'hd2_after' }
  },
  hd2_after: {
    title: '비단과 피', act: '轉',
    text:
      '약탈이 끝났다. ' +
      '(녹림과 의리로 손잡았다면 채주가 등을 맡겨주고, 이용했다면 그 눈에 살기가 어린다.) ' +
      '비단 더미 속에서 당문의 인장이 찍힌 밀계(密契)가 나온다 — 당문이 흑도를 노린다는 단서다.',
    choices: [
      { label: '사천 당가타로 향한다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_baesin' },
          { goto: 'hd3_dangmun' }
        ] }
    ]
  },

  /* ════════ 챕터 3 — 사천 당문, 그리고 암존(暗尊) ════════ */
  hd3_dangmun: {
    title: '사천 당가타(唐家陀)', act: '轉',
    text:
      '독향이 짙은 당문의 본거지. 흑도와 당문은 독·암기를 두고 다투면서도 거래해 온 사이. ' +
      '당문 가주가 차를 권한다. "네 손속을 보았다. 거래를 트든가, 적이 되든가 — 사천에서 답은 둘 뿐이다."',
    choices: [
      { label: '독·암기를 거래해 칼을 벼린다 (거래)', set: { dangmunDeal: true, sili: +1 }, goto: 'hd3_amjon' },
      { label: '밀계를 들이밀어 당문을 압박한다', set: { ak: +1, pressedDangmun: true }, goto: 'hd3_amjon' },
      { label: '거래를 끊고 흑도의 길만 간다', goto: 'hd3_amjon' }
    ]
  },
  hd3_amjon: {
    title: '그림자살왕 — 암존(暗尊)', act: '轉',
    text:
      '돌아오는 밤길, 기척 없이 한 그림자가 곁에 선다. 9존의 하나 — 암존(暗尊), 그림자살왕(影殺王). ' +
      '언제부터 곁에 있었는지 그대조차 몰랐다.\n\n' +
      '"쓸 만한 칼이 하나 자랐군. 살문(殺門)의 정점은 하나뿐이다. 무릎을 꿇든가 — 그 자리를 노리든가."',
    choices: [
      { label: '"그 자리, 내가 차지하겠소" — 도전한다', set: { hyeop: +2, challengeAmjon: true }, goto: 'hd3_finale' },
      { label: '암존의 그늘 아래 들어 칼을 벼린다 (수하)', set: { sili: +1, servedAmjon: true }, goto: 'hd3_finale' },
      { label: '대답 대신 종적을 지우고 사라진다', requires: { artTierMin: 2 }, set: { soloLoot: true, vanished: true }, goto: 'hd3_finale' }
    ]
  },
  hd3_finale: {
    title: '살문의 끝에서', act: '結',
    text: '암존이 그림자 속으로 스민다. 그 한 번의 만남에서, 어둠은 한 무명의 칼을 똑똑히 새겼다.',
    choices: [
      { label: '어둠이 그대를 어떻게 부르는지 듣는다',
        goto: [
          { requires: { flag: 'ak', gte: 4 }, goto: 'ending_baesin' },
          { requires: { flag: 'vanished', eq: true }, goto: 'ending_amjon' },
          { requires: { flag: 'challengeAmjon', eq: true }, goto: 'ending_amjon_rise' },
          { requires: { flag: 'servedAmjon', eq: true }, goto: 'ending_heukcheon' },
          { goto: 'ending_heukcheon' }
        ] }
    ]
  },

  ending_amjon_rise: {
    title: '엔딩 · 살왕(殺王)을 향한 도전', act: '結', ending: true, endKind: 'cheonha',
    text:
      '그대는 암존 앞에서 그 자리를 노린다 선언했다. 어둠의 정점을 향한, 돌이킬 수 없는 길이 열린다.\n\n' +
      '교역로의 녹림도, 사천의 당문도, 이제 그대의 이름을 함부로 입에 올리지 못한다. ' +
      '천하 서열 9존 — 그림자살왕 암존(暗尊)의 자리가, 칼끝 너머에서 그대를 기다린다. 군림(君臨)은 빛에만 있는 것이 아니다.\n\n※ 그 너머에, 인간 무의 끝 — 승천(昇天)의 떡밥이 어둠 속에 잠겨 있다.',
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
