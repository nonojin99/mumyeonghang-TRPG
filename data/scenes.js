/* 무명행 TextRPG — 장면 그래프 (코어 + 화산 오리진)
 * 흑도 등 추가 오리진은 scenes.<origin>.js 가 SCENES에 Object.assign 한다.
 * 큰 파일 단일 쓰기 이슈 회피 + "오리진=데이터 추가" 구조 정합.
 *
 * scene: title, act('起'|'承'|'轉'|'結'), text({art}=추첨 무공명), effect:'rollArt',
 *        ending:true+endKind, choices:[{label,requires?,set?,goto,timed?,onTimeout?}]
 * goto : 'id' | [{requires?, weight?, goto}]  (requires 통과분 중 weight 있으면 확률, 없으면 첫 일치)
 */

var START = 'prologue';

var SCENES = {

  /* ── 起 ── */
  prologue: {
    title: '무명(無名)', act: '起',
    text:
      '그대에게는 아직 이름이 없다.\n\n' +
      '산을 넘고 강을 건너온 발은 부르텄고, 품에는 부러진 목검 한 자루뿐이다. ' +
      '그러나 가슴 한복판에는 식지 않는 불씨가 있다 — 무(武)에 대한 갈망. ' +
      '강호의 누구도 그대의 이름을 모르나, 언젠가는 모두가 알게 될 것이다.\n\n' +
      '눈앞으로 자줏빛 노을에 잠긴 화산(華山)의 연화봉이 솟아 있다. 정파의 검이 시작되는 곳. ' +
      '그대는 무엇을 좇아 이 산을 오르는가.',
    choices: [
      { label: '협명(俠名)을 떨치기 위해 — 강호가 내 이름을 부르게 하리라', set: { motive: '협명' }, goto: 'hwasan_arrival' },
      { label: '잃어버린 사문(師門)의 자취를 좇아 — 누군가 답을 알 것이다', set: { motive: '사문' }, goto: 'hwasan_arrival' },
      { label: '그저 더 강해지기 위해 — 명분 따위는 나중 일이다', set: { motive: '무', ak: +1 }, goto: 'hwasan_arrival' }
    ]
  },

  /* ── 承 ── */
  hwasan_arrival: {
    title: '연화봉 초입', act: '承',
    text:
      '돌계단 끝, 매화 수실을 검병에 단 젊은 검객이 길을 막는다. 화산의 일대제자다.\n\n' +
      '"이름 없는 자가 어인 일로 본문(本門)의 산을 오르는가." ' +
      '경계의 눈빛이되, 검을 함부로 빼들 만큼 가볍지는 않다. 매화검수(梅花劍手)다.',
    choices: [
      { label: '검을 땅에 내려놓고 공손히 입문을 청한다', set: { rel_geomsu: +1 }, goto: 'hwasan_test' },
      { label: '"화산의 검이 그리 대단하다면, 한 수 보여주시오" — 도발한다', set: { ak: +1 }, goto: 'hwasan_spar' },
      { label: '"명분을 앞세우는 정파의 위선이 우습소" — 비웃는다', set: { ak: +2 }, goto: 'hwasan_rebuff' }
    ]
  },
  hwasan_spar: {
    title: '연화봉 비무', act: '承',
    text:
      '검수가 검을 뽑는다. 떨어지는 꽃잎 같은 연검(連劍)이 그대의 부러진 목검을 스친다. ' +
      '그대는 물러서지 않고 끝까지 맞선다. 승패는 가리지 못했으나, 검수의 눈에서 경계가 옅어진다.\n\n' +
      '"무명인치고는… 검을 아는 자로군." 그가 검을 거둔다. "장로께 고하겠다. 본문에 들 뜻이 있다면."',
    choices: [
      { label: '"가르침을 받겠소" — 입문을 청한다', set: { rel_geomsu: +1 }, goto: 'hwasan_test' },
      { label: '"객(客)으로 머물겠소" — 입문은 사양한다', set: { joined: false }, goto: 'crisis_ambush' }
    ]
  },
  hwasan_rebuff: {
    title: '냉대', act: '承',
    text:
      '검수의 얼굴이 굳는다. "사마외도(邪魔外道)의 혀를 가진 자는 이 산에 들 수 없다." ' +
      '그가 길을 막아선다. 화산의 명분은 때로 칼날보다 차갑다.\n\n돌아설 것인가, 굽히고 들 것인가.',
    choices: [
      { label: '말을 거두고 정중히 입문을 청한다', goto: 'hwasan_test' },
      { label: '코웃음 치고 등을 돌려 산을 내려간다', set: { joined: false, ak: +1 }, goto: 'crisis_ambush' }
    ]
  },
  hwasan_test: {
    title: '입문 — 무공 전수', act: '承', effect: 'rollArt',
    text:
      '연화봉 도관(道觀). 자줏빛 노을빛 도포의 장로가 그대를 가만히 응시한다.\n\n' +
      '"무(武)의 그릇은 타고나는 것이되, 갈고닦는 것은 사람의 몫이다." ' +
      '장로가 한 권의 검보(劍譜)를 내민다.\n\n— 그대는 「{art}」을(를) 전수받았다.',
    choices: [
      { label: '검보를 받들고, 화산의 제자가 된다', set: { joined: true, hyeop: +1 }, goto: 'crisis_ambush' }
    ]
  },

  /* ── 轉 (2비트 위기: 1비트 무제한 독해 → 2비트 짧은 결단만 시간제한) ── */
  crisis_ambush: {
    title: '연화봉의 비명', act: '轉',
    text:
      '산길을 도는 순간, 비린내가 코를 찌른다.\n\n' +
      '검은 복면의 살수(殺手)가 쓰러진 순례 도사의 목을 노리고 있다 — 혈교(血敎)의 끄나풀이다. ' +
      '도사의 옆구리에서 피가 솟구친다. 멎지 않는 피다. 살수의 칼끝이 천천히 그대를 향해 돌아선다.\n\n' +
      '도사의 숨이 가빠진다. 둘 다는 구할 수 없을지도 모른다.\n\n(다음 순간, 그대의 몸이 먼저 움직여야 한다.)',
    choices: [ { label: '― 숨을 고르고, 뛰어든다', goto: 'crisis_decision' } ]
  },
  crisis_decision: {
    title: '찰나', act: '轉',
    text: '피가 멎지 않는다. 살수의 칼이 떨어진다.',
    timedNote: '지금 — 몸이 먼저 움직인다.',
    choices: [
      { label: '도사를 지혈한다 (살수는 놓친다)', set: { hyeop: +2, savedPilgrim: true, assassinFled: true }, goto: 'aftermath' },
      { label: '살수를 먼저 벤다 (도사를 지킬 틈이 없다)', set: { killedAssassin: true, savedPilgrim: false, naesang: true }, goto: 'aftermath' },
      { label: '❖ 검기로 살수를 묶고 도사를 끌어낸다', requires: { artTierMin: 2 }, set: { hyeop: +3, savedPilgrim: true, killedAssassin: true }, goto: 'aftermath' }
    ],
    timed: 9,
    onTimeout: { set: { timeFail: true, ak: +1, savedPilgrim: false, assassinFled: true }, goto: 'aftermath' }
  },
  aftermath: {
    title: '피와 노을', act: '轉',
    text:
      '노을이 핏물을 자줏빛으로 물들인다. 연화봉의 종소리가 멀리서 울린다. ' +
      '오늘 그대가 한 일은 — 좋든 나쁘든 — 강호의 입을 타고 흐를 것이다.\n\n이름 없던 자의 첫 행(行)이 이제 막을 내린다.',
    choices: [
      { label: '강호가 그대를 어떻게 부르는지 듣는다',
        goto: [
          { requires: { flag: 'timeFail', eq: true }, goto: 'ending_omyeong' },
          { requires: { flag: 'ak', gte: 3 }, goto: 'ending_omyeong' },
          { requires: { flag: 'joined', eq: false }, goto: 'ending_nangin' },
          { goto: 'ending_hyeopgaek' }
        ] }
    ]
  },

  /* ── 結 ── */
  ending_hyeopgaek: {
    title: '엔딩 · 협객의 길', act: '結', ending: true, endKind: 'hyeop',
    text:
      '화산은 그대를 일대제자로 거두었다. 구한 도사가 입을 열 때마다, 연화봉에 한 무명인의 협행이 전해진다.\n\n' +
      '그대의 이름은 아직 없으나, 강호는 이미 그대를 「협(俠)을 아는 자」로 기억하기 시작한다. ' +
      '천하 서열의 까마득한 발치에서, 첫걸음이 시작되었다.\n\n' +
      '※ 놓친 살수가 있다면, 혈교의 그림자는 언젠가 다시 그대를 찾아올 것이다. (지연 분기의 씨앗)',
    choices: []
  },
  ending_nangin: {
    title: '엔딩 · 낭인의 길', act: '結', ending: true, endKind: 'nangin',
    text:
      '그대는 화산에 들지 않았다. 매인 곳 없는 검은 자유롭고도 외롭다. 연화봉을 등진 그대의 등 뒤로 매화 향이 멀어진다.\n\n' +
      '문파의 비호도, 명분의 굴레도 없이 — 그대는 홀로 강호를 걷는다. ' +
      '무명의 낭인(浪人)에게도 천하 서열의 정점은 열려 있다. 다만 그 길은 더 외롭고, 더 위험할 뿐.',
    choices: []
  },
  ending_omyeong: {
    title: '엔딩 · 오명(惡名)의 길', act: '結', ending: true, endKind: 'omyeong',
    text:
      '도사는 끝내 숨을 거두었거나, 그대의 손이 더 많은 피를 불렀다. 연화봉의 종은 그대를 위해 울리지 않는다.\n\n' +
      '화산의 차가운 평이 강호로 퍼진다 — 사마외도와 다를 바 없다고. ' +
      '그대의 이름은 협명이 아닌 다른 빛으로 새겨지기 시작한다. ' +
      '오명(惡名) 또한 강호를 살아가는 한 방식이며, 어떤 정점은 오직 그 길 끝에만 있다.',
    choices: []
  }

};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCENES: SCENES, START: START };
}
