/* 무명행 본편 — 1부(2) 결투 변형 분리 (story_main_1b.js 다음에 로드)
 * 기세(gise)별 고유 산문 장면으로 분리 — 조건부 텍스트 토큰 제거, 서술형 결투 완성.
 */
(function () {
  var SCN = {
    /* 1차전: 선택 → 기세 라우팅 → 고유 결착 산문 */
    m1b_match1: {
      title:'1차전 — 점창의 쾌검', act:'起',
      text:'대회장. 추첨이 그대를 점창의 그 소년과 붙였다.\n\n그는 소문대로 빨랐다. 인사가 끝나기 무섭게 — 세 호흡 만에 끝내겠다는 듯 — 쾌검이 목젖을 향해 짓쳐들었다. 첫 합부터 전력이다.',
      choices:[
        { label:'마주 빠르게 받는다 — 속도 대 속도', set:{gise:0}, goto:'m1b_m1_even' },
        { label:'반박자 늦게, 그러나 정확하게 — 견딤 끝의 한순간 (화산의 검)', set:{gise:+1, insight:+1}, goto:'m1b_m1_up' }
      ]
    },
    m1b_m1_up: {
      title:'1차전 — 기다림이 핀 매화', act:'起',
      text:'그대는 그의 속도를 *기다렸다*.\n\n첫 검을 흘리고, 둘째 검을 비끼고 — 세 번째 검이 빗나간 그 찰나, 매화 한 수가 그의 검을 감아 올렸다. 점창 소년의 검이 허공에 떴다.\n\n장내가 술렁였다. "화산의… 저 무명 검수는 누구냐?"',
      choices:[ { label:'― 다음 상대는, 그 소문의 신성', goto:'m1b_match2' } ]
    },
    m1b_m1_even: {
      title:'1차전 — 아슬한 속도전', act:'起',
      text:'속도 대 속도. 검과 검이 불꽃을 튀기며 열 합을 오갔다.\n\n아슬아슬했다 — 그러나 폭포 아래의 그 새벽이 그대의 손을 이끌었다. 마지막 합, 반 박자의 차이로 그대의 검끝이 먼저 멎었다. 소년의 목깃 앞에서.\n\n"…졌소." 점창 소년이 깨끗이 검을 거뒀다. 장내가 술렁였다.',
      choices:[ { label:'― 다음 상대는, 그 소문의 신성', goto:'m1b_match2' } ]
    },

    /* 준결승: 선택 → 기세 라우팅 → 고유 산문 + 타임드 */
    m1b_match2: {
      title:'준결승 — 무당의 운학', act:'起',
      text:'운학(雲鶴). 소문은 부족했다.\n\n그의 검은 느렸다 — 그런데 닿지 않았다. 그대의 매화가 피기도 전에, 태극의 원이 그 기세를 흘려보냈다. 치면 칠수록 그대의 힘이 그대를 배반했다. 유(柔)가 강(剛)을 삼키는 검.\n\n첫 합, 그대의 검이 크게 흘려져 균형이 무너진다. 장내에 무당의 환호.',
      choices:[
        { label:'더 강하게 — 힘으로 원을 부순다', set:{naesang:true}, goto:'m1b_m2_down' },
        { label:'힘을 거둔다 — 그의 원 *안*으로 한 발 들어선다', set:{insight:+1}, goto:'m1b_m2_up' },
        { label:'❖ 견딘다 — 원에도 이음매가 있다. 그 한 점을 기다린다', requires:{flag:'insight', gte:4}, set:{gise:+1}, goto:'m1b_m2_up' }
      ]
    },
    m1b_m2_up: {
      title:'준결승 — 원의 이음매', act:'起',
      text:'원 안은 고요했다.\n\n들숨과 날숨 사이 — 태극이 다음 원을 그리려는 반 박자의 이음매. 그대는 그것을 보았다. 운학의 눈이 처음으로 흔들렸다. 흘려보낼 기세가 — 원 안에는 없었으므로.\n\n마지막 합이 온다. 원이 다시 그대를 감싸려는 순간 —',
      timedNote:'찰나 — 원이 닫히기 전에.',
      timed:9,
      choices:[
        { label:'이음매의 틈으로, 매화 한 수', set:{wonMudang:true, hyeop:+1, seongchwi:+1}, goto:'m1b_final_w' },
        { label:'무리하지 않는다 — 원 밖으로 물러나 합을 거듭한다', set:{drawMudang:true}, goto:'m1b_final_b' }
      ],
      onTimeout:{ set:{lostMudang:true, naesang:true}, goto:'m1b_final_b' }
    },
    m1b_m2_down: {
      title:'준결승 — 부서지지 않는 원', act:'起',
      text:'힘은 답이 아니었다.\n\n그대는 세 번 흘려지고, 세 번 일어섰다. 손목이 울리고 호흡이 흐트러졌으나 — 일어설 때마다 운학의 눈에 경계가 짙어졌다. 이 검은, 꺾이지 않는다.\n\n그러나 경기는 경기. 합이 거듭될수록 판정은 무당 쪽으로 기울었다.',
      timedNote:'찰나 — 마지막 한 수.',
      timed:9,
      choices:[
        { label:'마지막 힘을 모아, 단 한 번의 정면 돌파', set:{drawMudang:true, naesang:true}, goto:'m1b_final_b' },
        { label:'패배를 받아들이되, 끝까지 자세를 무너뜨리지 않는다', set:{lostMudang:true, wise:true}, goto:'m1b_final_b' }
      ],
      onTimeout:{ set:{lostMudang:true, naesang:true}, goto:'m1b_final_b' }
    },

    /* 결승 — 두 갈래(본선 결승 / 뒤뜰 결승) 고유 산문, 동일 정서로 수렴 */
    m1b_final_w: {
      title:'결승 — 사형제', act:'起',
      text:'결승의 상대는 — 청운이었다.\n\n다른 조를 뚫고 올라온 사형이, 만인 앞에서 그대와 마주 섰다. 관중석이 끓었다. 같은 산, 같은 매화를 쓰는 두 검수의 결승.\n\n"약속했지." 청운이 검을 들었다. "정정당당히."\n\n사형제의 검이 부딪쳤다. 이 한 판에는, 둘이 함께 보낸 모든 나날이 실려 있었다.',
      choices:[
        { label:'전력으로 — 사형을 넘는다', set:{beatCheongun:true, seongchwi:+1, hyeop:+1, champion:true}, goto:'m1b_aftermath' },
        { label:'전력으로 — 그러나 마지막 한 수를 나눠 갖는다 (무승부)', set:{bondCheongun:true, rel_cheongun:+2}, goto:'m1b_aftermath' }
      ]
    },
    m1b_final_b: {
      title:'뒤뜰의 결승', act:'起',
      text:'그대의 대회는 거기까지였다.\n\n그러나 시상이 끝난 저녁, 청운이 그대에게 목검 두 자루를 던졌다. "순위 따위." 그가 씩 웃었다. "진짜 결승은 우리 둘이지."\n\n대회장 뒤뜰, 등불 하나 아래 — 관중 없는 결승. "약속했지. 정정당당히."\n\n사형제의 검이 부딪쳤다. 순위표 어디에도 남지 않을, 그러나 둘에게는 가장 무거운 한 판이.',
      choices:[
        { label:'전력으로 — 사형을 넘는다', set:{beatCheongun:true, seongchwi:+1}, goto:'m1b_aftermath' },
        { label:'전력으로 — 그러나 마지막 한 수를 나눠 갖는다 (무승부)', set:{bondCheongun:true, rel_cheongun:+2}, goto:'m1b_aftermath' }
      ]
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    var core = require('./story.core.js'); for (var k in SCN) core.SCENES[k] = SCN[k];
    module.exports = { scenes: SCN };
  } else { for (var k2 in SCN) SCENES[k2] = SCN[k2]; }
})();
