/* 무명행 TextRPG — 수정 패치 (플레이 피드백)
 * (a) 무공 다운그레이드 버그: 수련/기연의 effect:'rollArt' 제거(재추첨 금지) → 성취만 상승
 * (b) 검존/혈교 서사 정합: 혈교=강호 공적, 검존=천하서열 관문(적 아님)으로 명확화
 * (c) 비무 확대: 검귀·비무대회(청운)를 실제 턴제 비무로 연결
 * 모든 에피소드/피날레 파일 다음, engine4 앞에 로드.
 */
(function () {
  // (a) 재추첨 제거할 "깊어짐" 장면들 (입문 추첨 hwasan_test/heukdo_deal/binggung_test 는 유지)
  ['da_jin_1','gy_seon_2','gy_byeok_1','gy_maehwa_1','gy_gwi_2','gy_dono_1','gy_sabu_1','il_her_1']
    .forEach(function(id){ if (SCENES[id]) delete SCENES[id].effect; });

  var add = {
    // (a) da_jin_1: 등급 하락처럼 보이던 문구를 성취 상승으로 교정
    da_jin_1: { title:'낙수(落水) 아래', act:'承',
      text:'쏟아지는 폭포를 검으로 가른다. 수만 갈래 물줄기가 한 점에서 갈라지는 찰나, ' +
        '그대가 익힌 검의 묘리가 한 겹 더 트인다. 무공이 바뀌는 것이 아니라 — 같은 검이 더 깊어진다.\n\n' +
        '(무공 성취가 한 단계 오른다.)',
      choices:[
        { label:'깨달음을 검에 새긴다', set:{ insight:+2, hyeop:+1 }, goto:'hub_daeje' },
        { label:'한 발 더 — 무리하게 경지를 넘본다', set:{ insight:+2, naesang:true }, goto:'hub_daeje' }
      ] },

    // (b) 정사대전 — 혈교(강호 공적)와 천하서열의 관계를 명확히
    ch3_war: { title:'봉화(烽火)', act:'轉',
      text:'그대가 독사곡에서 가져온 혈교(血敎)의 밀서 — 그것이 무림맹을 움직였다. ' +
        '혈교는 정파도 사파도 마교도 아닌, 강호 전체가 토벌해야 할 공적(公敵). 그 광기가 중원을 삼키려 하자, 끝내 정사대전의 봉화가 올랐다.\n\n' +
        '무림맹 군의에 화산의 이름으로 그대가 불려간다. 이 전란에서 세운 공이, 훗날 천하 서열(天下序列)에 도전할 자격이 된다.',
      choices:[ { label:'군의의 자리로 나아간다', goto:'ch3_council' } ] },

    // (b) 검존 = 적이 아니라 "검의 정점, 넘어야 할 서열의 벽"
    ch3_throne: { title:'천하 서열의 벽 — 검존(劍尊)', act:'轉',
      text:'정사대전에서 혈교를 물린 공으로, 그대의 이름이 천하 서열의 문턱에 닿았다. ' +
        '서열에 오르려는 자는 9존(九尊)의 검증을 거쳐야 한다 — 그 첫 벽이 검의 정점, 검존(劍尊)이다. ' +
        '그는 적이 아니다. 다만, 넘지 못하면 한 발도 더 나아갈 수 없는 산이다.\n\n' +
        '"애송이. 네 검에 무엇이 담겼는지, 직접 보자." 도망칠 수 없는 비무가 거기 있다.',
      choices:[
        { label:'검을 뽑아 비무(比武)를 청한다 — 전력으로', set:{faceThrone:true}, goto:'battle_kyeomjon' },
        { label:'검존의 도(道)를 묻고 가르침을 청한다 (회유)', requires:{artTierMin:2}, set:{wooThrone:true, hyeop:+2}, goto:'ch3_finale' },
        { label:'아직 때가 아니다 — 검을 거두고 훗날을 기약한다', set:{withdrewThrone:true}, goto:'ending_hyeopgaek' }
      ] },

    // (c) 검귀 기연 → 실제 비무
    gy_gwi_1: { title:'검귀의 시험', act:'轉',
      text:'반쯤 미친 검귀(劍鬼)가 길을 막는다. "내 검을 견뎌내면 한 수 주마. 못 견디면… 죽음이다." 살기가 진짜다.',
      choices:[
        { label:'목숨을 걸고 검을 맞댄다 (비무)', goto:'battle_geomgwi' },
        { label:'싸움을 피해 활로를 연다 (신중)', set:{wise:true}, goto:'hub_daeje' }
      ] },
    battle_geomgwi: { title:'검귀와의 사투', act:'轉', battle:'geomgwi', winGoto:'gy_gwi_2', loseGoto:'geomgwi_lose', text:'' },
    geomgwi_lose: { title:'검귀의 자비', act:'承',
      text:'검귀의 광검에 무릎 꿇는다. 그러나 그가 칼을 거둔다. "…아직 죽일 검은 아니군." 깊은 내상을 안고 물러난다.',
      choices:[ { label:'이를 악물고 물러난다', set:{naesang:true, ak:0}, goto:'hub_daeje' } ] },

    // (c) 비무대회 결승 청운 → 실제 비무(우호적)
    il_bimu_2: { title:'결승의 상대', act:'轉',
      text:'결승에서 마주한 건 다름 아닌 사형 청운. "약속했지 — 정정당당히." 사형제의 검이 만인 앞에서 부딪친다. (죽고 죽이는 싸움이 아니다.)',
      choices:[ { label:'검을 맞대어 우열을 가린다 (비무)', goto:'battle_cheongun' } ] },
    battle_cheongun: { title:'사형제의 비무', act:'轉', battle:'cheongun', winGoto:'cheongun_win', loseGoto:'cheongun_draw', text:'' },
    cheongun_win: { title:'사형을 넘어', act:'承',
      text:'마지막 한 합, 그대의 매화가 청운의 검을 눌렀다. 청운이 분한 듯, 그러나 환히 웃으며 검을 거둔다. "…졌다. 강호가 너를 알겠군."',
      choices:[ { label:'손을 맞잡는다', set:{hyeop:+2, beatCheongun:true, rel_cheongun:+1}, goto:'hub_ildae' } ] },
    cheongun_draw: { title:'우열을 넘은 정', act:'承',
      text:'승부는 끝내 갈리지 않았다. 두 검이 허공에서 멈추고, 사형제는 마주 보며 웃는다. "역시… 너와 겨루는 게 제일 재밌어."',
      choices:[ { label:'어깨를 부딪치며 웃는다', set:{rel_cheongun:+2, bondCheongun:true}, goto:'hub_ildae' } ] }
  };

  if (typeof module !== 'undefined' && module.exports) {
    var core = require('./story.core.js'); for (var k in add) core.SCENES[k] = add[k]; module.exports = add;
  } else { for (var k2 in add) SCENES[k2] = add[k2]; }
})();
