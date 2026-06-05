/* 무명행 TextRPG — 화산 [대제자 · 성취와 시련] 경지 풀 (hub_daeje)
 * 통합 시: hub_ildae.advanceGoto → 'hub_daeje', 본 hub.advanceGoto → 'hub_war'.
 * 회수: vowRevenge·leadHyeolgyo·peekedManual·rel_cheongun. 지리: 화산~사천(당문)~혈교 권역.
 */
(function () {
  var EPS = {
    ep_da_jin:    { hub:'daeje', title:'폭포 아래 매화의 진경(眞境)을 깨친다',   entry:'da_jin_1',   weight:24, icon:'悟' },
    ep_da_secret: { hub:'daeje', title:'사문(師門)의 오랜 비밀을 엿듣는다',       entry:'da_sec_1',   weight:18, icon:'秘' },
    ep_da_cheon:  { hub:'daeje', title:'청운이 금기에 손을 댄 흔적을 본다',       entry:'da_cheon_1', weight:18, icon:'劍', requires:{flag:'rel_cheongun',gte:1} },
    ep_da_hyeol:  { hub:'daeje', title:'혈교가 마을을 핏빛으로 물들였다',         entry:'da_hyeol_1', weight:22, icon:'血' },
    ep_da_dang:   { hub:'daeje', title:'사천 당문과 묵은 원한이 닿는다',           entry:'da_dang_1',  weight:18, icon:'毒', requires:{flag:'vowRevenge',eq:true} },
    ep_da_mudang: { hub:'daeje', title:'무당의 벗이 공동의 적을 들고 온다',       entry:'da_mu_1',    weight:16, icon:'武', requires:{flag:'allyMudang',eq:true} },
    ep_da_tempt:  { hub:'daeje', title:'빠른 힘의 유혹이 다시 손짓한다',           entry:'da_temp_1',  weight:14, icon:'魔' },
    ep_da_master: { hub:'daeje', title:'사부가 협(俠)의 의미를 묻는다',           entry:'da_mas_1',   weight:20, icon:'師' }
  };

  var SCN = {
    hub_daeje: {
      title:'대제자(大弟子)의 길', act:'承', hub:'daeje', draw:3, advanceAfter:3,
      advanceLabel:'― 무르익은 검을 들고 정사대전의 봉화로', advanceGoto:'hub_war',
      text:'몇 해의 강호가 검을 무르익게 했다. 화산의 대제자로서, 그대의 이름 앞엔 이제 ‘매화검수’가 아닌 다른 무게가 붙는다.\n\n그러나 무(武)가 깊어질수록 시험도 깊다. 오늘 그대를 부르는 것은 무엇인가.'
    },

    da_jin_1: {
      title:'낙수(落水) 아래', act:'承', effect:'rollArt',
      text:'쏟아지는 폭포를 검으로 가른다. 수만 갈래 물줄기가 한 점에서 갈라지는 찰나, 매화 스물네 수가 한 송이로 귀결되는 묘리가 트인다.\n\n— 그대의 「{art}」이(가) 절정으로 무르익는다.',
      choices:[
        {label:'깨달음을 검에 새긴다', set:{insight:+1, hyeop:+1, jingyeong:true}, goto:'hub_daeje'},
        {label:'한 발 더 — 무리하게 경지를 넘본다', set:{insight:+1, naesang:true, ambition:true}, goto:'hub_daeje'}
      ]
    },

    da_sec_1: {
      title:'장경각의 그림자', act:'承',
      text:'밤의 회랑, 장로 둘이 낮은 소리로 다툰다. "자하신공의 다음 전인(傳人)을 누구로… 청운인가, 저 무명 출신인가." 장문 후계를 둔 암투가 사문 깊이 흐르고 있었다.',
      choices:[
        {label:'못 들은 척 물러나 마음에만 새긴다', set:{wise:true, knowSuccession:true}, goto:'hub_daeje'},
        {label:'스스로 후계를 노리겠다 다짐한다', set:{ambition:true, seekSuccession:true}, goto:'hub_daeje'}
      ]
    },

    da_cheon_1: {
      title:'사형의 어둠', act:'轉',
      text:'청운의 거처에서, 그대는 본다 — 몰래 베껴 적은 자하신공 구결을. 후계 경쟁에 조급한 그가 금기에 손을 댄 것이다. 그의 눈가엔 주화입마의 핏기가 어렸다.',
      choices:[
        {label:'"멈춰라, 사형" — 정면으로 막아선다', set:{hyeop:+2, confrontCheongun:true}, goto:'da_cheon_2'},
        {label:'약점을 쥐고 침묵을 거래한다 (실리)', set:{ak:+1, leverageCheongun:true}, goto:'hub_daeje'},
        {label:'함께 자하를 탐하자 손을 내민다 (어둠)', set:{ak:+2, darkPactCheongun:true}, goto:'hub_daeje'}
      ]
    },
    da_cheon_2: {
      title:'벗을 붙드는 검', act:'轉',
      text:'청운이 검을 빼든다 — 그러나 손이 떨린다. 한참을 노려보던 그가, 끝내 검을 떨군다. "…네 말이 맞다." 무너지듯 주저앉은 그를 부축한다. 오랜 약속이 그를 어둠에서 끌어냈다.',
      choices:[
        {label:'함께 운기로 그의 내식을 다스린다', set:{rel_cheongun:+2, savedCheongun:true}, goto:'hub_daeje'}
      ]
    },

    da_hyeol_1: {
      title:'핏빛 마을', act:'轉',
      text:'혈교가 한 마을을 제물로 삼았다. 핏빛 제단, 광신의 노래. 살아남은 아이 하나가 그대의 다리를 붙든다. 사술사가 마지막 의식을 시작한다.',
      timedNote:'지금 — 제물이 바쳐지기 전에.',
      timed:9,
      choices:[
        {label:'제단으로 돌격해 의식을 끊는다', set:{hyeop:+3, brokeRite:true, leadHyeolgyo:true}, goto:'da_hyeol_2'},
        {label:'❖ 매화 검기로 사술사를 일격에 벤다', requires:{artTierMin:2}, set:{hyeop:+4, killedCaster:true, leadHyeolgyo:true}, goto:'da_hyeol_2'}
      ],
      onTimeout:{ set:{ak:+1, riteCompleted:true}, goto:'da_hyeol_2' }
    },
    da_hyeol_2: {
      title:'재 위의 맹세', act:'承',
      text:'불타는 마을 위로 재가 날린다. 혈교의 그림자가 단순한 광신이 아니라, 강호 전체를 노리는 거대한 음모임을 그대는 직감한다. 이 인연은 — 정사대전의 한복판에서 다시 만날 것이다.',
      choices:[
        {label:'살아남은 아이를 안전한 곳에 맡기고 떠난다', set:{hyeop:+1, savedChild:true}, goto:'hub_daeje'}
      ]
    },

    da_dang_1: {
      title:'사천에서 온 암기', act:'轉',
      text:'동문을 상하게 했던 그 당문(唐門)의 암기수가 눈앞에 있다. 묵은 원한이 검 끝에 맺힌다. 그런데 그자가 뜻밖의 말을 한다. "그 일은… 혈교의 사주였다."',
      choices:[
        {label:'분노를 누르고 진실을 캐묻는다', set:{hyeop:+2, truthDangmun:true, leadHyeolgyo:true}, goto:'hub_daeje'},
        {label:'변명은 듣지 않는다 — 원수를 갚는다', set:{ak:+1, killedDangmun:true}, goto:'hub_daeje'}
      ]
    },

    da_mu_1: {
      title:'무당 벗의 청', act:'承',
      text:'무당의 벗이 험한 얼굴로 찾아온다. "사파 연합이 두 문파의 후기지수를 노린다. 화산과 무당이… 손을 잡아야 할 때요." 검의 정통을 다투던 사이가, 공동의 적 앞에 선다.',
      choices:[
        {label:'기꺼이 등을 맡기고 함께 친다', set:{hyeop:+2, allyMudang:true, jointOp:true}, goto:'hub_daeje'},
        {label:'화산의 공을 앞세울 조건을 단다', set:{ak:+1, sili:+1}, goto:'hub_daeje'}
      ]
    },

    da_temp_1: {
      title:'다시, 자하의 속삭임', act:'轉',
      text:'경지의 벽 앞에서 조급해질 때, 일전에 엿본 자하신공의 구결이 머릿속에 되살아난다. 스승 없이 익히면 빠르되, 주화입마의 벼랑이다. 갈증이 검을 떨게 한다.',
      choices:[
        {label:'정도(正道)로 천천히 간다 — 유혹을 끊는다', set:{hyeop:+2, upright:true}, goto:'hub_daeje'},
        {label:'한 단계만 — 위험을 무릅쓰고 끌어올린다', set:{ak:+1, naesang:true, darkSeed:true}, goto:'da_temp_2'}
      ]
    },
    da_temp_2: {
      title:'벼랑 끝의 내식', act:'轉',
      text:'억지로 끌어올린 기운이 경맥을 찢을 듯 날뛴다. 한순간 힘은 폭발적이나, 그 대가가 몸 어딘가에 빚으로 새겨진다. 어둠으로 한 발, 강함으로 한 발.',
      choices:[
        {label:'갈증을 새긴 채 버텨낸다', set:{powerSpike:true, darkSeed:true}, goto:'hub_daeje'}
      ]
    },

    da_mas_1: {
      title:'사부의 물음', act:'承',
      text:'사부가 차를 따르며 묻는다. "검을 들어 무엇을 지키느냐. 명성이냐, 사람이냐, 아니면 네 자신이냐." 답에 따라 그대의 검이 향할 곳이 정해진다.',
      choices:[
        {label:'"약한 자를 지키는 검입니다" (협)', set:{hyeop:+2, creedHyeop:true}, goto:'hub_daeje'},
        {label:'"천하제일에 오를 검입니다" (패)', set:{ambition:true, creedTop:true}, goto:'hub_daeje'},
        {label:'"아직… 모르겠습니다" (구도)', set:{wise:true, creedSeek:true}, goto:'hub_daeje'}
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
