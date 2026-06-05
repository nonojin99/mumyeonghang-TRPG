/* 무명행 TextRPG — 화산 [일대제자 · 첫 출도] 경지 풀 (hub_ildae)
 * 스토리 생산본. 통합 시: ipmun_graduate.goto → 'hub_ildae', advanceGoto → 'hub_daeje'.
 * 지리: 섬서 화산 ~ 종남·무당 인근. NPC 회수: 청운·백소소.
 */
(function () {
  var EPS = {
    ep_il_pyo:     { hub:'ildae', title:'표국(鏢局)의 호위 의뢰가 들어왔다',     entry:'il_pyo_1',   weight:26, icon:'鏢' },
    ep_il_mudang:  { hub:'ildae', title:'무당 후기지수가 검의 정통을 논하자 한다', entry:'il_mudang_1', weight:22, icon:'武' },
    ep_il_gaebang: { hub:'ildae', title:'개방 거지가 혈교 소문을 흘린다',         entry:'il_gae_1',   weight:20, icon:'丐' },
    ep_il_won:     { hub:'ildae', title:'사파의 칼에 동문이 쓰러졌다',           entry:'il_won_1',   weight:18, icon:'怨' },
    ep_il_bimu:    { hub:'ildae', title:'후기지수 비무대회가 열린다',             entry:'il_bimu_1',  weight:20, icon:'比' },
    ep_il_village: { hub:'ildae', title:'마을을 흉흉하게 하는 소문을 쫓는다',     entry:'il_vil_1',   weight:22, icon:'村' },
    ep_il_soso:    { hub:'ildae', title:'백소소와 강호에서 재회한다',             entry:'il_soso_1',  weight:16, icon:'梅', requires:{flag:'rel_baeksoso',gte:1} },
    ep_il_hermit:  { hub:'ildae', title:'폐관(閉關)한 은거기인을 만난다',         entry:'il_her_1',   weight:12, icon:'隱' }
  };

  var SCN = {
    hub_ildae: {
      title:'강호 출도(出道)', act:'承', hub:'ildae', draw:3, advanceAfter:3,
      advanceLabel:'― 강호의 경험을 안고 대제자(大弟子)의 길로', advanceGoto:'hub_daeje',
      text:'장문이 검 한 자루를 내린다. "이제 화산의 이름으로 강호를 밟아라. 네 검이 협(俠)인지 객기(客氣)인지, 강호가 가려줄 것이다."\n\n출도한 일대제자에게 강호는 넓고, 길은 여럿이다. 어디로 발을 들이는가.'
    },

    /* 표국 호위 — 첫 임무 */
    il_pyo_1: {
      title:'표행(鏢行)', act:'承',
      text:'종남산 길목을 지나는 비단 표국이 화산에 호위를 청했다. 산적이 들끓는 길. 동행은 말수 적은 표사(鏢師) 하나뿐이다.',
      choices:[
        {label:'앞장서 길을 열며 위풍을 보인다', set:{hyeop:+1, fameRoad:true}, goto:'il_pyo_2'},
        {label:'기척을 죽이고 매복을 경계한다', set:{wise:true}, goto:'il_pyo_2'}
      ]
    },
    il_pyo_2: {
      title:'고갯마루의 칼', act:'轉',
      text:'아니나 다를까, 고갯마루에서 산적 떼가 길을 막는다. 두목이 도(刀)를 겨눈다. "통행세를 내든가, 피를 내든가."',
      choices:[
        {label:'매화검으로 단숨에 두목을 제압한다', set:{hyeop:+2}, goto:'hub_ildae'},
        {label:'굳이 베지 않고 활로를 열어 물린다 (협)', set:{hyeop:+1, sparedBandit:true}, goto:'hub_ildae'},
        {label:'본보기로 두엇을 베어 겁을 준다', set:{ak:+1}, goto:'hub_ildae'}
      ]
    },

    /* 무당 라이벌 */
    il_mudang_1: {
      title:'검의 정통', act:'承',
      text:'객잔에서 마주친 무당(武當)의 젊은 도사가 술잔을 권하며 묻는다. "화산의 매화가 빠르다 하나, 무당의 태극(太極)은 무너지지 않소. 검의 정통은 어느 쪽이오?"',
      choices:[
        {label:'정중히 한 수 청해 검으로 답한다', set:{rel_mudang:+1, hyeop:+1}, goto:'il_mudang_2'},
        {label:'"검에 정통이 어디 있소, 베면 그뿐" 받아친다', set:{ak:+1, rel_mudang:-1}, goto:'hub_ildae'}
      ]
    },
    il_mudang_2: {
      title:'매화와 태극', act:'轉',
      text:'마당의 달빛 아래 두 검이 오간다. 빠름과 느림, 강(剛)과 유(柔). 승패는 갈리지 않았으나, 도사가 검을 거두며 웃는다. "언젠가 또 겨룹시다, 벗이여."',
      choices:[
        {label:'"무당의 검, 잊지 않겠소" — 벗을 얻는다', set:{rel_mudang:+2, allyMudang:true}, goto:'hub_ildae'}
      ]
    },

    /* 개방 정보 — 혈교 단서 */
    il_gae_1: {
      title:'천 개의 눈', act:'承',
      text:'개방 분타의 거지가 그대를 알아본다. "협의 길을 걷는 분이시군. 요즘 강호에 핏빛 소문이 돈다오 — 혈교(血敎)가 다시 고개를 든다고. 한 푼 적선이면, 더 들려드리지."',
      choices:[
        {label:'적선하고 혈교의 단서를 산다', set:{hyeop:+1, bossIntel:true, leadHyeolgyo:true}, goto:'hub_ildae'},
        {label:'공짜 소문만 듣고 새겨둔다', set:{rumor:true}, goto:'hub_ildae'}
      ]
    },

    /* 첫 원수 */
    il_won_1: {
      title:'쓰러진 동문', act:'轉',
      text:'함께 출도한 동문이 사파의 칼에 당해 객점에 실려 왔다. 숨은 붙어 있으나 검을 쥔 손이 으스러졌다. "사천… 당가의 암기였어." 그가 그대의 소매를 붙든다.',
      choices:[
        {label:'당장 쫓아가 원수를 갚겠다 맹세한다', set:{ak:+1, vowRevenge:true}, goto:'il_won_2'},
        {label:'먼저 동문을 살리는 데 힘을 쏟는다 (협)', set:{hyeop:+2, savedBrother:true}, goto:'il_won_2'}
      ]
    },
    il_won_2: {
      title:'끓는 피, 식은 검', act:'承',
      text:'복수를 앞세우면 검이 뜨거워지고, 사람을 앞세우면 검이 식는다. 동문의 눈을 보며, 그대는 제 검이 무엇을 위한 것인지 처음으로 묻는다.',
      choices:[
        {label:'복수는 차게, 검은 바르게 — 마음을 다잡는다', set:{hyeop:+1, resolve:true}, goto:'hub_ildae'},
        {label:'분노를 연료 삼아 더 강해지기로 한다', set:{ak:+1, ambition:true}, goto:'hub_ildae'}
      ]
    },

    /* 비무대회 */
    il_bimu_1: {
      title:'후기지수 비무대회', act:'承',
      text:'인근 대파(大派)들이 후기지수를 겨루게 한다. 매화검수의 이름으로 그대도 단상에 오른다. 관중 속, 사형 청운의 얼굴도 보인다.',
      choices:[
        {label:'전력으로 우승을 노린다', set:{hyeop:+2, fameDuel:true}, goto:'il_bimu_2'},
        {label:'실력을 감추고 적당히 겨룬다 (도회)', set:{wise:true, hidden:true}, goto:'hub_ildae'}
      ]
    },
    il_bimu_2: {
      title:'결승의 상대', act:'轉',
      text:'결승에서 마주한 건 다름 아닌 청운. "약속했지 — 정정당당히." 사형제의 검이 만인 앞에서 부딪친다.',
      choices:[
        {label:'전력으로 청운을 넘어선다', set:{hyeop:+1, beatCheongun:true}, goto:'hub_ildae'},
        {label:'아슬히 겨루다 손을 맞잡는다', set:{rel_cheongun:+2, bondCheongun:true}, goto:'hub_ildae'}
      ]
    },

    /* 마을 소문 — 협 사건 */
    il_vil_1: {
      title:'흉흉한 소문', act:'承',
      text:'한 마을에 밤마다 사람이 사라진다는 소문. 마을은 "산귀(山鬼)"라 떨지만, 그대의 눈엔 인위의 흔적이 보인다 — 사파 흑점의 인신매매다.',
      choices:[
        {label:'잠복하여 일당의 소굴을 친다', set:{hyeop:+3, savedVillage:true}, goto:'il_vil_2'},
        {label:'관과 개방에 알려 함께 친다 (지혜)', set:{hyeop:+2, wise:true}, goto:'hub_ildae'}
      ]
    },
    il_vil_2: {
      title:'소굴의 밤', act:'轉',
      text:'끌려온 이들을 풀어내는 순간, 두목이 칼을 들이댄다. 인질의 목과 두목의 칼, 그 사이가 한 뼘이다.',
      timedNote:'지금 — 칼이 떨어지기 전에.',
      timed:9,
      choices:[
        {label:'몸을 던져 인질을 끌어낸다', set:{hyeop:+2, naesang:true}, goto:'hub_ildae'},
        {label:'검을 날려 두목의 손목을 끊는다', requires:{artTierMin:2}, set:{hyeop:+3}, goto:'hub_ildae'}
      ],
      onTimeout:{ set:{ak:+1, lostHostage:true}, goto:'hub_ildae' }
    },

    /* 백소소 재회 */
    il_soso_1: {
      title:'저잣거리의 매화 향', act:'承',
      text:'출도한 강호의 한 저잣거리, 뜻밖에 백소소와 마주친다. 의술을 배워 떠돌며 병자를 돌본다 했다. "여기서 다 만나네요." 그녀의 미소에 옛 절벽의 칼바람이 스친다.',
      choices:[
        {label:'함께 저녁을 들며 그간의 강호를 나눈다', set:{rel_baeksoso:+2}, goto:'il_soso_2'},
        {label:'안부만 묻고 갈 길을 재촉한다', set:{rel_baeksoso:+1}, goto:'hub_ildae'}
      ]
    },
    il_soso_2: {
      title:'어긋난 길, 같은 하늘', act:'承',
      text:'그녀가 말한다. "협(俠)이 칼로만 있는 건 아니에요. 당신은 칼로, 나는 약으로 — 같은 강호를 걷는 거죠." 헤어지는 길, 그녀가 매화 한 송이를 건넨다.',
      choices:[
        {label:'매화를 품에 새기고 길을 잇는다', set:{rel_baeksoso:+1, mementoSoso:true}, goto:'hub_ildae'}
      ]
    },

    /* 은거기인 기연 */
    il_her_1: {
      title:'폐관의 노인', act:'承', effect:'rollArt',
      text:'깊은 산, 폐관 수련에 든 은거기인의 동굴. 그가 그대의 검을 한참 보더니 한 갈래 묘리를 짚어준다. "화산의 매화가… 아직 한 송이 덜 피었구나."\n\n— 그대의 「{art}」이(가) 한층 깊어졌다.',
      choices:[
        {label:'가르침을 받들고 산을 내려온다', set:{insight:+1, deepenedArt:true}, goto:'hub_ildae'}
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
