/* 무명행 TextRPG — 화산 이벤트(상황형) 풀 (hub: ildae/daeje 혼합)
 * 강호의 일상·돌발 사건. 협·실리·관계의 작은 결정들로 색을 더한다.
 */
(function () {
  var EPS = {
    ev_inn:      { hub:'ildae', title:'객잔이 시비로 발칵 뒤집힌다',       entry:'ev_inn_1',   weight:24, icon:'酒' },
    ev_gamble:   { hub:'ildae', title:'도박장의 사기판을 목격한다',       entry:'ev_gam_1',   weight:18, icon:'賭' },
    ev_flood:    { hub:'daeje', title:'강이 범람해 마을이 잠긴다',         entry:'ev_flood_1', weight:18, icon:'水' },
    ev_festival: { hub:'ildae', title:'묘회(廟會)의 흥겨운 밤',           entry:'ev_fest_1',  weight:16, icon:'燈' },
    ev_bandit:   { hub:'ildae', title:'산적 떼가 마을을 친다',             entry:'ev_ban_1',   weight:22, icon:'盜' },
    ev_letter:   { hub:'daeje', title:'누군가 그대에게 도전장을 보냈다',   entry:'ev_let_1',   weight:18, icon:'狀' },
    ev_plague:   { hub:'daeje', title:'역병이 한 고을을 덮쳤다',           entry:'ev_plg_1',   weight:16, icon:'疫' },
    ev_merchant: { hub:'daeje', title:'떠돌이 상인이 기보(奇寶)를 내민다', entry:'ev_mer_1',   weight:18, icon:'商' }
  };

  var SCN = {
    /* 객잔 소동 */
    ev_inn_1: { title:'객잔의 밤', act:'承',
      text:'정파·사파 강호인이 뒤섞인 객잔. 술기운에 시비가 붙어 검집이 들썩인다. 애꿎은 점소이가 그 사이에 끼어 떤다.',
      choices:[
        {label:'좌중을 압도해 싸움을 가라앉힌다', set:{hyeop:+2, fameRoad:true}, goto:'hub_ildae'},
        {label:'점소이부터 안전히 빼낸다 (협)', set:{hyeop:+1}, goto:'hub_ildae'},
        {label:'구경하며 약점을 살핀다 (실리)', set:{wise:true}, goto:'hub_ildae'}
      ] },

    /* 도박장 */
    ev_gam_1: { title:'사기판', act:'承',
      text:'뒷골목 도박장. 한 시골 청년이 전 재산을 잃고 운다. 그대의 눈엔 패를 바꾸는 야바위꾼의 손속이 훤히 보인다.',
      choices:[
        {label:'사기를 들춰 청년의 돈을 돌려준다', set:{hyeop:+2, exposedFraud:true}, goto:'hub_ildae'},
        {label:'역으로 판을 털어 사기꾼을 응징한다 (실리)', set:{sili:+1, hyeop:+1}, goto:'hub_ildae'},
        {label:'남의 일이라 지나친다', set:{ak:+1}, goto:'hub_ildae'}
      ] },

    /* 수해 구휼 */
    ev_flood_1: { title:'잠긴 마을', act:'轉',
      text:'폭우로 강이 넘쳐 마을이 물에 잠긴다. 지붕 위에서 아이가 울부짖고, 거센 물살이 노인을 삼키려 한다. 무공은 사람을 베는 데만 쓰이는 게 아니다.',
      timedNote:'지금 — 물살이 노인을 삼키기 전에.', timed:9,
      choices:[
        {label:'물살에 뛰어들어 노인을 끌어낸다', set:{hyeop:+3, savedFlood:true, naesang:true}, goto:'hub_daeje'},
        {label:'경공으로 지붕을 돌며 아이들을 옮긴다', requires:{artTierMin:2}, set:{hyeop:+3, savedFlood:true}, goto:'hub_daeje'}
      ],
      onTimeout:{ set:{ak:+1, lostVillager:true}, goto:'hub_daeje' } },

    /* 묘회 축제 */
    ev_fest_1: { title:'등불의 밤', act:'承',
      text:'고을 묘회. 등불이 강물처럼 흐르고, 탈춤과 엿장수로 거리가 들썩인다. 검을 잠시 내려둔 강호인의 드문 평온.',
      choices:[
        {label:'동문·벗들과 어울려 밤을 즐긴다 (관계)', set:{rel_cheongun:+1, rested:true}, goto:'hub_ildae'},
        {label:'홀로 등불을 보며 마음을 가다듬는다', set:{wise:true, rested:true}, goto:'hub_ildae'},
        {label:'소매치기를 잡아 거리의 평을 얻는다', set:{hyeop:+1}, goto:'hub_ildae'}
      ] },

    /* 산적 습격 */
    ev_ban_1: { title:'마을을 친 산적', act:'轉',
      text:'녹림에도 들지 못한 잡(雜)산적 떼가 마을을 약탈한다. 곳간이 털리고 아낙들이 끌려간다. 마을엔 그대의 검 하나뿐이다.',
      choices:[
        {label:'정면으로 쳐들어가 두목을 잡는다', set:{hyeop:+3, savedVillage:true}, goto:'hub_ildae'},
        {label:'마을 장정을 규합해 함께 물린다 (지도)', set:{hyeop:+2, ledVillagers:true}, goto:'hub_ildae'},
        {label:'두목과 거래해 약탈품만 돌려받는다 (실리)', set:{sili:+1, hyeop:+1}, goto:'hub_ildae'}
      ] },

    /* 도전장 */
    ev_let_1: { title:'도전장(挑戰狀)', act:'承',
      text:'이름이 알려지자 도전장이 날아든다. "매화검수의 검이 헛소문인지 가리겠다" — 인근의 오만한 후기지수다. 거절하면 비겁하다는 소문이, 응하면 부질없는 다툼이.',
      choices:[
        {label:'당당히 응해 검으로 답한다', set:{hyeop:+1, acceptedDuel:true}, goto:'ev_let_2'},
        {label:'정중히 거절하고 길을 간다 (도량)', set:{wise:true, declinedDuel:true}, goto:'hub_daeje'}
      ] },
    ev_let_2: { title:'부질없는 검', act:'轉',
      text:'몇 합 만에 상대의 검을 떨군다. 분을 못 이긴 그가 암수를 쓰려는 찰나 — 그 손목을 짚어 멈춘다. "검을 더럽히지 마라." 그가 얼굴을 붉히며 물러간다.',
      choices:[
        {label:'살려 보내 후일을 도모하게 한다 (협)', set:{hyeop:+2, sparedDuelist:true}, goto:'hub_daeje'},
        {label:'본보기로 무공을 폐해 망신을 준다', set:{ak:+1}, goto:'hub_daeje'}
      ] },

    /* 역병 (백소소 연계) */
    ev_plg_1: { title:'역병의 고을', act:'轉',
      text:'역병이 돈 고을. 관(官)은 봉쇄하고 백성은 죽어 나간다. 봉쇄선 안에서, 뜻밖에도 백소소가 홀로 병자를 돌보고 있다 — 위험을 무릅쓰고.',
      choices:[
        {label:'봉쇄를 뚫고 들어가 그녀를 돕는다', set:{hyeop:+3, rel_baeksoso:+2, defiedQuarantine:true}, goto:'ev_plg_2'},
        {label:'약재와 식량을 구해 안전히 들인다 (지혜)', set:{hyeop:+2, wise:true, rel_baeksoso:+1}, goto:'ev_plg_2'}
      ] },
    ev_plg_2: { title:'역병의 밤', act:'承',
      text:'밤새 병자를 나르고 약을 달인다. 새벽, 지친 백소소가 그대의 어깨에 기대 잠든다. "당신이 와줘서… 무섭지 않았어요." 검으로는 닿지 못하는 협(俠)이 거기 있다.',
      choices:[ {label:'그녀가 깰 때까지 곁을 지킨다', set:{rel_baeksoso:+2, vowProtectSoso:true}, goto:'hub_daeje'} ] },

    /* 떠돌이 상인 기보 */
    ev_mer_1: { title:'기보(奇寶) 행상', act:'承',
      text:'수상한 행상이 보따리를 풀어 보인다. 호신용 연막탄, 해독단, 그리고 — 정체 모를 검 한 자루. "보는 눈이 있는 분께만 보여드리지요. 값은 흥정하기 나름."',
      choices:[
        {label:'해독단을 사 둔다 (대비)', set:{hasAntidote:true, sili:+1}, goto:'hub_daeje'},
        {label:'정체 모를 검을 흥정해 사 본다 (모험)', set:{mysterySword:true}, goto:'ev_mer_2'},
        {label:'수상하니 사양하고 정보만 캔다', set:{wise:true, rumor:true}, goto:'hub_daeje'}
      ] },
    ev_mer_2: { title:'정체 모를 검', act:'承',
      text:'검집을 여니 평범해 보이나, 매화 검기를 흘리자 검신에 옛 문양이 어린다. 길보(吉寶)일지 흉기(凶器)일지는 — 휘둘러 봐야 안다.',
      choices:[
        {label:'길보라 여기고 품는다', set:{weaponEdge:true, gamble:true}, goto:'hub_daeje'},
        {label:'섣불리 쓰지 않고 봉인해 둔다 (신중)', set:{wise:true}, goto:'hub_daeje'}
      ] }
  };

  for (var e in EPS) EPS[e].id = e;
  if (typeof module !== 'undefined' && module.exports) {
    var core = require('./story.core.js'); for (var k in SCN) core.SCENES[k] = SCN[k];
    module.exports = { EPISODES: EPS, scenes: SCN };
  } else {
    if (typeof EPISODES === 'undefined') EPISODES = {};
    for (var e2 in EPS) EPISODES[e2] = EPS[e2];
    for (var k2 in SCN) SCENES[k2] = SCN[k2];
  }
})();
