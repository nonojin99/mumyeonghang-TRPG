/* 무명행 TextRPG — 화산 기연(奇緣) 풀 (hub: ildae/daeje 혼합)
 * 희귀·고보상. 검총·영약·은거기인·비동·마교 비급 유혹·영물·명검·옛 원수.
 * 기존 단계 풀에 합류(weight 낮게 = 드물게 등장). 통합 시 EPISODES에 자동 병합.
 */
(function () {
  var EPS = {
    gy_geomchong: { hub:'daeje', title:'안개 속 검총(劍塚)을 발견한다',       entry:'gy_geom_1', weight:9,  icon:'塚' },
    gy_yeongyak:  { hub:'ildae', title:'천년 영약(靈藥)의 기운을 느낀다',     entry:'gy_yak_1',  weight:10, icon:'藥' },
    gy_geomseon:  { hub:'daeje', title:'미친 검선(劍仙)이 시험을 건다',       entry:'gy_seon_1', weight:8,  icon:'仙' },
    gy_bidong:    { hub:'daeje', title:'전대 고수의 비동(秘洞)에 든다',       entry:'gy_dong_1', weight:9,  icon:'洞' },
    gy_magma:     { hub:'daeje', title:'사마(邪魔)의 비급이 손에 들어온다',   entry:'gy_magma_1',weight:7,  icon:'魔' },
    gy_beast:     { hub:'ildae', title:'상처 입은 영물(靈物)을 만난다',       entry:'gy_beast_1',weight:11, icon:'靈' },
    gy_sword:     { hub:'ildae', title:'녹슨 고검(古劍)이 눈에 띈다',         entry:'gy_sword_1',weight:10, icon:'劍' },
    gy_foe:       { hub:'daeje', title:'옛 원수의 후예와 마주친다',           entry:'gy_foe_1',  weight:10, icon:'怨', requires:{flag:'vowRevenge',eq:true} }
  };

  var SCN = {
    /* 검총 — 검의(劍意)의 깨달음 (3단계) */
    gy_geom_1: { title:'검총(劍塚)', act:'承',
      text:'골짜기 안개가 걷히자 수백 자루 검이 비석처럼 박힌 무덤이 드러난다. 이름 없이 스러진 검객들의 검총. 검 끝마다 옛 검의(劍意)가 어려 윙윙 운다.',
      choices:[
        {label:'검들 사이에 앉아 그 검의를 읽는다', set:{insight:+1}, goto:'gy_geom_2'},
        {label:'쓸 만한 검 한 자루를 뽑아 든다', set:{hasOldSword:true}, goto:'hub_daeje'}
      ] },
    gy_geom_2: { title:'천 자루의 속삭임', act:'承',
      text:'무수한 검의가 그대의 매화검과 공명한다. 베고 지킨 수백 생의 마음이 한순간 스쳐 지난다 — 검이란 무엇을 위한 것인가.',
      choices:[
        {label:'그 깨달음을 매화에 녹인다 (협의 검)', set:{insight:+1, hyeop:+2, swordIntent:true}, goto:'hub_daeje'},
        {label:'더 강한 살의(殺意)만을 취한다', set:{ak:+1, killIntent:true}, goto:'hub_daeje'}
      ] },

    /* 영약 (2단계) */
    gy_yak_1: { title:'벼랑의 영약', act:'承',
      text:'천길 벼랑 틈에 자줏빛 영지(靈芝)가 천년 기운을 머금고 빛난다. 곁엔 영약을 지키는 독사 떼가 똬리를 틀었다.',
      choices:[
        {label:'위험을 무릅쓰고 채취한다', set:{}, goto:'gy_yak_2'},
        {label:'욕심을 거두고 물러선다 (안전)', set:{wise:true}, goto:'hub_ildae'}
      ] },
    gy_yak_2: { title:'천년의 기운', act:'轉',
      text:'독사를 검으로 흩고 영약을 삼킨다. 뜨거운 기운이 단전을 채운다 — 다만 운기조식 없이 삼킨 탓에, 일부는 약이고 일부는 독이다.',
      choices:[
        {label:'침착히 기운을 갈무리한다', set:{insight:+1, innerPower:true}, goto:'hub_ildae'},
        {label:'한 번에 흡수하려 무리한다', set:{innerPower:true, naesang:true}, goto:'hub_ildae'}
      ] },

    /* 미친 검선의 시험 (2단계) */
    gy_seon_1: { title:'미친 검선', act:'承',
      text:'누더기를 걸친 노인이 술병을 흔들며 길을 막는다. "내 술 한 잔 받겠느냐, 아니면 내 검을 받겠느냐." 광기 어린 눈 속에, 헤아릴 수 없는 검의 깊이가 번뜩인다.',
      choices:[
        {label:'공손히 술을 받고 가르침을 청한다', set:{hyeop:+1}, goto:'gy_seon_2'},
        {label:'검을 받겠다 — 한 수 청한다', set:{ambition:true}, goto:'gy_seon_2'}
      ] },
    gy_seon_2: { title:'취중의 절학', act:'轉', effect:'rollArt',
      text:'노인의 검은 취권처럼 흐트러지되 빈틈이 없다. 한참을 시달린 끝에, 그가 껄껄 웃으며 한 갈래 묘리를 던지고 사라진다. "재미있는 놈이군."\n\n— 그대의 「{art}」이(가) 한층 트였다.',
      choices:[ {label:'노인이 사라진 자리에 절하고 길을 잇는다', set:{insight:+1, metGeomseon:true}, goto:'hub_daeje'} ] },

    /* 비동 — 전대 고수의 유진 */
    gy_dong_1: { title:'전대의 비동(秘洞)', act:'承',
      text:'무너진 절벽 뒤 숨은 동굴. 벽면 가득 새겨진 검결(劍訣)과, 백골이 된 채 검을 안고 좌화한 전대 고수. 그의 마지막 한 수가 벽에 남았다.',
      choices:[
        {label:'벽서를 정성껏 베껴 익힌다', set:{insight:+1, wallScript:true}, goto:'hub_daeje'},
        {label:'유해를 거두어 묻어주고 검만 받든다', set:{hyeop:+2, wallScript:true}, goto:'hub_daeje'}
      ] },

    /* 마교 비급의 유혹 */
    gy_magma_1: { title:'핏빛 책장', act:'轉',
      text:'쓰러진 마인(魔人)의 품에서 흘러나온 비급 — 흡성대법(吸星大法)의 사본이다. 단숨에 강해지는 사마의 길. 펼치는 순간, 정도(正道)의 검과는 영영 멀어진다.',
      choices:[
        {label:'불살라 화근을 없앤다 (정도)', set:{hyeop:+2, upright:true}, goto:'hub_daeje'},
        {label:'몰래 감추어 둔다 (미련)', set:{ak:+1, hidMagic:true}, goto:'gy_magma_2'},
        {label:'한 줄만 익혀 힘을 탐한다 (타락)', set:{ak:+2, naesang:true, darkSeed:true, learnedMagic:true}, goto:'gy_magma_2'}
      ] },
    gy_magma_2: { title:'마(魔)의 그림자', act:'承',
      text:'사마의 기운은 달콤하고도 서늘하다. 익히든 감추든, 그 책의 존재가 그대의 길에 작은 그림자를 드리운다 — 언젠가 대가를 부를 씨앗.',
      choices:[ {label:'마음을 다잡고 길을 잇는다', set:{darkSeed:true}, goto:'hub_daeje'} ] },

    /* 영물 인연 */
    gy_beast_1: { title:'상처 입은 매', act:'承',
      text:'화살에 맞아 떨어진 한 마리 푸른 매(蒼鷹). 영물의 눈빛이 예사롭지 않다. 곁엔 매를 노린 사냥꾼 무리가 다가온다.',
      choices:[
        {label:'매를 품고 사냥꾼을 물린다', set:{hyeop:+1, beastBond:true}, goto:'gy_beast_2'},
        {label:'상처만 봐주고 자연에 돌려보낸다', set:{hyeop:+1}, goto:'hub_ildae'}
      ] },
    gy_beast_2: { title:'창응(蒼鷹)의 인연', act:'承',
      text:'치료를 마치자 매는 떠나지 않고 그대의 어깨에 앉는다. 이후로 창응은 하늘에서 그대의 눈이 되어, 먼 길의 위험을 미리 알린다.',
      choices:[ {label:'창응과 함께 강호를 누빈다', set:{companion:'창응', scoutEdge:true}, goto:'hub_ildae'} ] },

    /* 명검 */
    gy_sword_1: { title:'녹슨 고검(古劍)', act:'承',
      text:'시골 대장간 구석, 녹슬어 버려진 검 한 자루. 그러나 그대의 검기가 닿자 녹 아래 푸른 검신이 운다 — 한 시대를 풍미했던 명검이 잠들어 있다.',
      choices:[
        {label:'값을 후히 치르고 거둔다 (의)', set:{hyeop:+1, hasNamedSword:true}, goto:'gy_sword_2'},
        {label:'주인 모르는 물건이라며 슬쩍 가져간다', set:{ak:+1, hasNamedSword:true}, goto:'gy_sword_2'}
      ] },
    gy_sword_2: { title:'검명(劍鳴)', act:'承',
      text:'녹을 벗기고 검에 매화 검기를 불어넣자, 검이 맑게 운다. 이 검과 함께라면 그대의 매화는 한층 멀리, 한층 날카롭게 뻗을 것이다.',
      choices:[ {label:'검에 이름을 새기고 허리에 찬다', set:{weaponEdge:true}, goto:'hub_ildae'} ] },

    /* 옛 원수의 후예 (vowRevenge 회수) */
    gy_foe_1: { title:'원수의 후예', act:'轉',
      text:'동문을 상하게 한 그 손속을 빼닮은 젊은이가 길 위에 섰다. 그 자의 자식이다. 그러나 그 눈엔 살의가 아니라, 아비의 죄를 씻으려는 떨림이 있다.',
      choices:[
        {label:'대(代)를 잇는 원한을 여기서 끊는다 (용서)', set:{hyeop:+3, brokeFeud:true}, goto:'hub_daeje'},
        {label:'아비의 빚을 자식에게 받는다 (복수)', set:{ak:+2, killedHeir:true}, goto:'hub_daeje'},
        {label:'진실을 캐묻고 함께 원흉을 쫓는다', set:{hyeop:+1, leadHyeolgyo:true, allyHeir:true}, goto:'hub_daeje'}
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
