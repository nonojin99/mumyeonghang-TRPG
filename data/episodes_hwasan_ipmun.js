/* 무명행 TextRPG — 화산 입문 경지 허브 + 확률 에피소드 풀 (새 아키텍처 프로토타입)
 * story.hwasan*.js 다음, engine3.js 앞에 로드.
 * hwasan_test를 덮어써 입문 직후 'hub_ipmun'으로. 허브가 EPISODES에서 가중 확률로 3개를 제시.
 * 에피소드는 1장면(단발)~다단계 가변, 끝나면 goto 'hub_ipmun'으로 복귀. 3회 겪으면 일대제자 승급.
 */

var EPISODES = {
  ep_drill:    { hub:'ipmun', title:'장로의 검리(劍理)를 배운다',        entry:'ep_drill_1',    weight:22, icon:'理' },
  ep_market:   { hub:'ipmun', title:'저잣거리에 화산 사칭꾼이 났다',     entry:'ep_market_1',   weight:28, icon:'市' },
  ep_cheongun: { hub:'ipmun', title:'사형 청운이 목검을 던진다',         entry:'ep_cheongun_1', weight:24, icon:'劍' },
  ep_baeksoso: { hub:'ipmun', title:'사매 백소소가 부탁을 해온다',       entry:'ep_baeksoso_1', weight:20, icon:'梅' },
  ep_sick:     { hub:'ipmun', title:'병든 노(老)동문을 간병한다',        entry:'ep_sick_1',     weight:16, icon:'病' },
  ep_manual:   { hub:'ipmun', title:'장경각에서 자하신공의 기척을 느낀다', entry:'ep_manual_1', weight:9,  icon:'秘' },
  ep_cheongun2:{ hub:'ipmun', title:'청운과 묵은 승부를 가린다',         entry:'ep_cheongun2_1',weight:14, icon:'劍', requires:{flag:'vowCheongun',eq:true} }
};

var __SCN = {

  /* 입문 직후 → 허브로 (hwasan_test 덮어쓰기) */
  hwasan_test: {
    title:'입문 — 무공 전수', act:'承', effect:'rollArt',
    text:'연화봉 도관(道觀). 자줏빛 도포의 장로가 검보(劍譜)를 내민다. "무의 그릇은 타고나되, 갈고닦음은 사람의 몫이다."\n\n— 그대는 「{art}」을(를) 전수받았다. 오늘부터 그대는 화산의 입문제자다.',
    choices:[ {label:'검보를 받들고, 연화봉의 나날로 든다', set:{joined:true, hyeop:+1}, goto:'hub_ipmun'} ]
  },

  /* 경지 허브 — 목표: 일대제자 승급 */
  hub_ipmun: {
    title:'연화봉의 나날', act:'承', hub:'ipmun', draw:3, advanceAfter:3,
    advanceLabel:'― 매화검을 시험받아 일대제자(一代弟子)에 오른다', advanceGoto:'ipmun_graduate',
    text:'입문은 끝이 아니라 시작이다. 새벽엔 물을 긷고, 낮엔 검을 닦고, 밤엔 검보를 외운다. 무(武)의 그릇은 이런 나날에 빚어진다.\n\n오늘, 그대의 마음은 어디로 향하는가.'
  },
  ipmun_graduate: {
    title:'일대제자(一代弟子)', act:'承',
    text:'장문 앞에서 매화 스물네 수를 펼친다. 검 끝에 응축된 기운이 한순간 매화로 만개하자, 장로들이 고개를 끄덕인다.\n\n"오늘부로 너는 화산의 일대제자다." 무명이던 자가 한 경지를 올랐다 — 이제 강호가 그대를 부른다.',
    choices:[ {label:'제자의 검을 들고 강호로 나선다', set:{rank:'일대제자', advanced:true}, goto:'hwasan_market'} ]
  },

  /* ── 에피소드: 장로의 검리 (단발) ── */
  ep_drill_1: {
    title:'검리(劍理)', act:'承',
    text:'장로가 낙엽 하나를 검으로 가른다. "베려 하지 말고, 흐름을 읽어라." 그대는 하루 종일 떨어지는 잎만 베었다. 손목이 시릴 무렵, 문득 한 호흡이 트인다.',
    choices:[
      {label:'깨달음을 검에 새긴다 (무공의 이해)', set:{insight:+1, hyeop:+1}, goto:'hub_ipmun'},
      {label:'몸이 부서져라 더 매달린다 (무리한 정진)', set:{insight:+1, naesang:true}, goto:'hub_ipmun'}
    ]
  },

  /* ── 에피소드: 저잣거리 사칭꾼 (단발) ── */
  ep_market_1: {
    title:'사칭꾼', act:'承',
    text:'산 아래 저잣거리. 화산 제자를 사칭한 건달이 객점 주인에게 행패다. "화산이 뒤를 봐준다"며 술값을 떼먹는다. 화산의 이름이 더럽혀진다.',
    choices:[
      {label:'정체를 밝히고 검으로 혼쭐낸다', set:{hyeop:+2, fameMarket:true}, goto:'hub_ipmun'},
      {label:'소란 없이 관(官)에 넘기게 한다 (지혜)', set:{hyeop:+1, wise:true}, goto:'hub_ipmun'},
      {label:'화산 이름값이나 즐기며 눈감는다', set:{ak:+1}, goto:'hub_ipmun'}
    ]
  },

  /* ── 에피소드: 사형 청운 (3단계) ── */
  ep_cheongun_1: {
    title:'청운의 목검', act:'承',
    text:'같은 마당을 쓰는 사형 청운(靑雲) — 연화봉 초입서 그대를 막던 그 매화검수다. "무명인 주제에 검은 제법이군. 한 수 받아라." 목검이 날아든다.',
    choices:[
      {label:'정면으로 맞붙어 실력을 보인다', set:{rel_cheongun:+1, hyeop:+1}, goto:'ep_cheongun_2'},
      {label:'이기려 들지 않고 배우는 자세로 임한다', set:{rel_cheongun:+2}, goto:'ep_cheongun_2'}
    ]
  },
  ep_cheongun_2: {
    title:'검을 나눈 사이', act:'承',
    text:'비무는 어느새 일과가 되었다. 우정인지 경쟁인지 모를 것이 둘 사이에 자란다. 어느 밤, 청운이 술병을 들고 찾아온다.',
    choices:[
      {label:'함께 검을 논하며 밤을 새운다', set:{rel_cheongun:+1}, goto:'ep_cheongun_3'},
      {label:'그의 검의 약점을 슬쩍 떠본다', set:{ambition:true}, goto:'ep_cheongun_3'}
    ]
  },
  ep_cheongun_3: {
    title:'자하(紫霞)의 약속', act:'承',
    text:'청운이 자하신공(紫霞神功) 이야기를 꺼낸다 — 장문에게만 잇는 화경(化境)의 심법. "언젠가 너와 내가, 저 경지를 두고 다투게 될까." 그의 눈에 동경과 불안이 섞인다.',
    choices:[
      {label:'"그땐 정정당당히 겨루자" — 약속한다', set:{vowCheongun:true, rel_cheongun:+1}, goto:'hub_ipmun'},
      {label:'"무공에 정도가 어디 있나" — 떠본다', set:{ambition:true, ak:+1}, goto:'hub_ipmun'}
    ]
  },

  /* ── 에피소드: 청운과의 재대결 (vowCheongun 시 해금 — 긴 사연의 회수) ── */
  ep_cheongun2_1: {
    title:'묵은 승부', act:'承',
    text:'청운이 정색하고 검을 빼든다. "약속했지. 오늘은 진심으로 가겠다." 목검이 아닌 진검(眞劍)이다. 매화 대 매화, 사형제의 진짜 한 합.',
    choices:[
      {label:'전력으로 받아 그를 넘어선다', set:{hyeop:+2, beatCheongun:true}, goto:'hub_ipmun'},
      {label:'아슬하게 비기며 우정을 지킨다', set:{rel_cheongun:+2, bondCheongun:true}, goto:'hub_ipmun'},
      {label:'일부러 져주어 그의 자존심을 세운다', set:{wise:true, rel_cheongun:+1}, goto:'hub_ipmun'}
    ]
  },

  /* ── 에피소드: 사매 백소소 (2단계) ── */
  ep_baeksoso_1: {
    title:'백소소의 부탁', act:'承',
    text:'사매 백소소(白素素)가 머뭇대며 다가온다. 병든 어미의 약초가 연화봉 북벽 절벽에만 핀다 한다. "위험해서… 차마 누구에게도 못 청했어요."',
    choices:[
      {label:'함께 절벽으로 향한다', set:{rel_baeksoso:+2}, goto:'ep_baeksoso_2'},
      {label:'혼자 다녀오겠다며 그녀를 만류한다', set:{rel_baeksoso:+1, hyeop:+1}, goto:'ep_baeksoso_2'}
    ]
  },
  ep_baeksoso_2: {
    title:'북벽의 매화', act:'承',
    text:'칼바람 부는 절벽. 발을 헛디딘 순간, 검으로 바위를 찍어 버틴다. 손끝의 약초를 끝내 거머쥔다. 돌아온 길, 백소소의 눈이 붉다. "이 은혜… 잊지 않을게요."',
    choices:[
      {label:'"같은 문하인데 당연하지" — 웃는다', set:{rel_baeksoso:+1, hyeop:+1}, goto:'hub_ipmun'},
      {label:'말없이 약초만 건네고 돌아선다', set:{rel_baeksoso:+1}, goto:'hub_ipmun'}
    ]
  },

  /* ── 에피소드: 병든 노동문 (2단계) ── */
  ep_sick_1: {
    title:'노(老)동문', act:'承',
    text:'후원 골방, 늙은 동문이 기침을 토한다. 한때 강호를 누볐다는 그를 아무도 찾지 않는다. 그대가 약사발을 들이밀자, 그가 흐릿하게 웃는다.',
    choices:[
      {label:'곁에 앉아 그의 옛 강호 이야기를 듣는다', set:{rel_old:+1}, goto:'ep_sick_2'},
      {label:'약만 두고 조용히 물러난다', set:{hyeop:+1}, goto:'hub_ipmun'}
    ]
  },
  ep_sick_2: {
    title:'스러진 검객의 한 수', act:'承',
    text:'노인이 떨리는 손으로 허공에 한 초식을 그린다. "이건… 매화검보에도 없는 한 수야. 늙은이의 마지막 선물이라 치게." 잊혀가던 검리 하나가 그대에게 전해진다.',
    choices:[
      {label:'정중히 받들어 새긴다', set:{insight:+1, hyeop:+1, oldArt:true}, goto:'hub_ipmun'}
    ]
  },

  /* ── 에피소드: 자하신공 비급의 유혹 (3단계, 희귀·위험) ── */
  ep_manual_1: {
    title:'장경각(藏經閣)의 밤', act:'承',
    text:'금지된 장경각. 문틈으로 자하신공(紫霞神功) 비급의 기척이 새어 나온다 — 장문에게만 허락된 화경의 심법. 아무도 없다. 욕망이 손끝을 떨게 한다.',
    choices:[
      {label:'유혹을 누르고 돌아선다 (정도)', set:{hyeop:+2, upright:true}, goto:'hub_ipmun'},
      {label:'딱 한 장만 — 몰래 펼쳐본다', set:{ambition:true, peekedManual:true}, goto:'ep_manual_2'}
    ]
  },
  ep_manual_2: {
    title:'한 줄의 마(魔)', act:'承',
    text:'자하의 첫 구결이 눈에 박힌다. 내공이 멋대로 들끓는다 — 스승 없이 익히는 절세심법은 독이다. 등 뒤에서 인기척.',
    choices:[
      {label:'책을 덮고 시치미를 뗀다', set:{ak:+1}, goto:'ep_manual_3'},
      {label:'구결을 끝까지 외우고 자리를 뜬다 (위험)', set:{ak:+2, naesang:true, stoleManual:true}, goto:'ep_manual_3'}
    ]
  },
  ep_manual_3: {
    title:'들끓는 내식(內息)', act:'承',
    text:'그날 밤 단전이 불덩이처럼 끓는다. 훔쳐 익힌 한 줄이 몸을 갉는다. 정도(正道)의 길에서 한 발, 그대는 이미 비껴섰다 — 누구도 모르게.',
    choices:[
      {label:'이 갈증을 마음에 새긴 채 나날로 돌아간다', set:{darkSeed:true}, goto:'hub_ipmun'}
    ]
  }

};

if (typeof module !== 'undefined' && module.exports) {
  var core = require('./story.core.js');
  for (var k in __SCN) core.SCENES[k] = __SCN[k];
  module.exports = { EPISODES: EPISODES, scenes: __SCN };
} else {
  for (var k2 in __SCN) SCENES[k2] = __SCN[k2];
}
