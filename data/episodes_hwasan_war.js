/* 무명행 TextRPG — 화산 [정사대전] 경지 풀 (hub_war)
 * 통합 시: hub_daeje.advanceGoto → 'hub_war', 본 hub.advanceGoto → 'ch3_throne'(검존→군림).
 * 역할(돌격/군사/독행/합공)을 에피소드 풀로. 회수: 청운·백소소·무당·혈교 수괴.
 */
(function () {
  var EPS = {
    ep_war_van:   { hub:'war', title:'선봉 돌격대장으로 적진을 연다',       entry:'war_van_1',  weight:22, icon:'突' },
    ep_war_strat: { hub:'war', title:'군사(軍師)로서 한 수를 둔다',         entry:'war_str_1',  weight:20, icon:'謀' },
    ep_war_lone:  { hub:'war', title:'단신으로 혈교 수괴를 노린다',         entry:'war_lone_1', weight:18, icon:'獨', requires:{flag:'leadHyeolgyo',eq:true} },
    ep_war_ally:  { hub:'war', title:'무당·소림과 합격진을 이룬다',         entry:'war_ally_1', weight:18, icon:'盟', requires:{flag:'allyMudang',eq:true} },
    ep_war_pris:  { hub:'war', title:'사파 포로의 처분을 명받는다',         entry:'war_pris_1', weight:22, icon:'囚' },
    ep_war_cheon: { hub:'war', title:'청운과 같은 전선에 선다',             entry:'war_cheon_1',weight:16, icon:'劍', requires:{flag:'rel_cheongun',gte:1} },
    ep_war_soso:  { hub:'war', title:'야전 의막에서 백소소를 다시 만난다',  entry:'war_soso_1', weight:14, icon:'梅', requires:{flag:'rel_baeksoso',gte:1} },
    ep_war_rumor: { hub:'war', title:'전열에 숨은 첩자를 색출한다',         entry:'war_rum_1',  weight:18, icon:'諜' }
  };

  var SCN = {
    hub_war: {
      title:'정사대전(正邪大戰)', act:'轉', hub:'war', draw:3, advanceAfter:3,
      advanceLabel:'― 전란의 끝, 천하 서열의 벽 앞에 선다 (검존)', advanceGoto:'ch3_throne',
      text:'독사곡에서 가져온 혈교의 밀서가 무림맹을 움직였고, 끝내 봉화가 올랐다. 화산의 검도 전선에 선다.\n\n전장은 넓고, 한 사람이 설 자리는 여럿이다. 오늘 그대는 어디서 이 전쟁을 치르는가.'
    },

    war_van_1: {
      title:'선봉(先鋒)', act:'轉',
      text:'그대의 깃발을 따라 정파의 검들이 적진으로 쏟아진다. 한복판에서 혈교의 사술사가 신참들 위로 핏빛 장력을 끌어올린다.',
      timedNote:'지금 — 선봉이 멈추면 전열이 무너진다.', timed:9,
      choices:[
        {label:'몸을 던져 신참들을 막아선다', set:{hyeop:+3, savedTroops:true, naesang:true}, goto:'hub_war'},
        {label:'❖ 매화 검기를 터뜨려 장력을 흩는다', requires:{artTierMin:2}, set:{hyeop:+4, vanGlory:true}, goto:'hub_war'}
      ],
      onTimeout:{ set:{ak:+1, lostTroops:true}, goto:'hub_war' }
    },

    war_str_1: {
      title:'지도 앞의 무게', act:'轉',
      text:'검 대신 지도를 든다. 적 본대가 좁은 협곡에 들었다 — 매복의 기회. 그러나 미끼가 된 아군 일대는 희생될 것이다.',
      choices:[
        {label:'매복을 명한다 — 한 부대로 대승을 산다', set:{sili:+2, sacrificedUnit:true, obeyedOrder:true}, goto:'hub_war'},
        {label:'미끼를 빼내고 정공한다 — 피해는 크되 버리지 않는다', set:{hyeop:+3, defiedOrder:true}, goto:'hub_war'},
        {label:'거짓 항복서로 시간을 번다 (계략)', set:{sili:+1, hyeop:+1, ruse:true}, goto:'hub_war'}
      ]
    },

    war_lone_1: {
      title:'적의 심장으로', act:'轉',
      text:'전열을 등지고 홀로 적진 깊이 스민다. 목표는 하나 — 연화봉서, 관도서, 독사곡서 그대를 쫓아온 혈교의 수괴. 모든 인연의 끝이 그 천막 안에 있다.',
      choices:[
        {label:'단숨에 베어 인연을 끝낸다', set:{hyeop:+2, killedHyeolgyo:true}, goto:'war_lone_2'},
        {label:'사로잡아 본단의 위치를 캐낸다', requires:{artTierMin:2}, set:{hyeop:+3, capturedHyeolgyo:true}, goto:'war_lone_2'}
      ]
    },
    war_lone_2: {
      title:'수괴의 마지막 말', act:'轉',
      text:'"네가 나를 베어도… 혈교는 끝나지 않는다. 우리는 강호 그 자체를 노린다." 그 말이 그대의 등골을 서늘하게 한다. 더 큰 그림자가 정점 어딘가에 도사린다.',
      choices:[ {label:'경고를 새기고 전열로 돌아간다', set:{hyeop:+1, knowConspiracy:true}, goto:'hub_war'} ]
    },

    war_ally_1: {
      title:'구파의 합공', act:'轉',
      text:'무당의 태극검과 소림의 항마곤이 그대의 매화검 옆에 선다. "오늘은 화산의 검을 믿지." 세 문파가 한 진(陣)을 이룬다.',
      choices:[
        {label:'합격진의 중심에서 매화를 터뜨린다', set:{hyeop:+3, allyBond:true}, goto:'hub_war'},
        {label:'벗들을 앞세우고 빈틈을 메운다 (조화)', set:{hyeop:+2, allyBond:true}, goto:'hub_war'},
        {label:'공을 독차지하려 홀로 앞선다', set:{ak:+1, hoggedGlory:true}, goto:'hub_war'}
      ]
    },

    war_pris_1: {
      title:'무릎 꿇린 자들', act:'轉',
      text:'연기 자욱한 들판, 무릎 꿇린 사파 포로들. 그중엔 칼 한 번 못 잡아본 짐꾼·아낙도 섞였다. 무림맹의 명은 차갑다 — "사마의 씨를 남기지 말라."',
      choices:[
        {label:'무고한 자를 가려 풀어준다 (명을 어기더라도)', set:{hyeop:+3, defiedOrder:true}, goto:'hub_war'},
        {label:'명을 따라 모두 벤다', set:{ak:+2, obeyedOrder:true}, goto:'hub_war'},
        {label:'포로를 인질 삼아 적장을 압박한다 (실리)', set:{ak:+1, sili:+1}, goto:'hub_war'}
      ]
    },

    war_cheon_1: {
      title:'어깨를 나란히', act:'轉',
      text:'전장에서 청운과 등을 맞댄다. 입문기의 비무도, 후계를 둔 앙금도, 핏빛 전장 앞에선 한 칼이 된다. "사제, 살아서 보자." 그가 처음으로 그대를 사제라 부른다.',
      choices:[
        {label:'함께 적진을 가른다 — 우정으로', set:{rel_cheongun:+2, bondCheongun:true}, goto:'hub_war'},
        {label:'더 큰 공을 세워 후계를 굳힌다', set:{ambition:true, seekSuccession:true}, goto:'hub_war'}
      ]
    },

    war_soso_1: {
      title:'야전 의막(醫幕)', act:'轉',
      text:'피와 신음으로 가득한 야전 의막. 백소소가 핏물 든 손으로 부상병을 돌본다. "당신은 칼로, 나는 약으로 — 같은 전장이네요." 잠깐의 눈맞춤이, 전란 속 한 줌의 온기다.',
      choices:[
        {label:'그녀의 의막을 지킬 검을 자청한다', set:{hyeop:+2, rel_baeksoso:+2, vowProtectSoso:true}, goto:'hub_war'},
        {label:'짧은 인사만 남기고 전열로 돌아간다', set:{rel_baeksoso:+1}, goto:'hub_war'}
      ]
    },

    war_rum_1: {
      title:'아군 속의 그림자', act:'轉',
      text:'개방 거지가 귀띔한다. "전열에 혈교의 첩자가 숨었소. 군량과 진형이 새고 있다오." 색출하지 못하면 다음 전투가 위태롭다.',
      choices:[
        {label:'은밀히 잠복해 첩자를 잡는다', set:{hyeop:+2, caughtSpy:true}, goto:'hub_war'},
        {label:'개방과 공조해 역정보를 흘린다 (지혜)', set:{hyeop:+1, wise:true, counterIntel:true}, goto:'hub_war'},
        {label:'의심 가는 자를 본보기로 친다 (성급)', set:{ak:+1, rashKill:true}, goto:'hub_war'}
      ]
    }
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
