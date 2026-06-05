/* 무명행 TextRPG — 화산 기연(奇緣) 풀 ③ (gy_20~gy_30, hub ildae/daeje) — 기연 총 30 도달 */
(function () {
  var EPS = {
    gy_dokgok:  { hub:'daeje', title:'독곡(毒谷)에서 만독불침을 단련한다',   entry:'gy_dok_1',   weight:8,  icon:'毒' },
    gy_paegeom: { hub:'daeje', title:'옛 영웅의 패검(佩劍)을 되찾는다',       entry:'gy_pae_1',   weight:9,  icon:'劍' },
    gy_dono:    { hub:'daeje', title:'별빛 아래 돈오(頓悟)가 찾아온다',       entry:'gy_dono_1',  weight:7,  icon:'悟' },
    gy_hwatan:  { hub:'ildae', title:'화탄(火炭) 위에서 체질을 단련한다',     entry:'gy_hwa_1',   weight:9,  icon:'火' },
    gy_noreum:  { hub:'ildae', title:'노름판에 비급 한 장이 걸렸다',         entry:'gy_nor_1',   weight:10, icon:'賭' },
    gy_sansin:  { hub:'ildae', title:'산신묘(山神廟)가 시험을 건다',         entry:'gy_san_1',   weight:9,  icon:'神' },
    gy_geoji:   { hub:'ildae', title:'거지왕이 한 수를 보여준다',           entry:'gy_geoji_1', weight:9,  icon:'丐' },
    gy_geomgwi: { hub:'daeje', title:'검귀(劍鬼)가 목숨을 건 시험을 청한다', entry:'gy_gwi_1',   weight:6,  icon:'鬼' },
    gy_geobuk:  { hub:'daeje', title:'천년 거북이 점괘를 보인다',           entry:'gy_geo_1',   weight:8,  icon:'龜' },
    gy_sabu:    { hub:'daeje', title:'사부가 비전 한 수를 따로 전한다',     entry:'gy_sabu_1',  weight:10, icon:'師' },
    gy_seoljeong:{ hub:'daeje', title:'설산 한정(寒精)을 발견한다',          entry:'gy_seol_1',  weight:8,  icon:'雪' }
  };
  var SCN = {
    gy_dok_1:{ title:'독곡의 단련', act:'轉',
      text:'온갖 독초·독충이 들끓는 독곡. 옛 기인이 남긴 단련법대로 약한 독부터 몸에 들이면, 끝내 만독불침(萬毒不侵)에 이른다 한다. 다만 한 걸음만 어긋나도 죽음이다.',
      choices:[{label:'위험을 무릅쓰고 차근차근 단련한다', set:{poisonImmune:true, insight:+1}, goto:'hub_daeje'},{label:'무리는 금물 — 해독 지식만 익힌다', set:{wise:true, hasAntidote:true}, goto:'hub_daeje'}] },
    gy_pae_1:{ title:'영웅의 패검', act:'承',
      text:'한 시대를 풍미하다 스러진 협객의 무덤. 도굴꾼들이 그의 패검(佩劍)을 노리고 파헤치는 중이다. 영웅의 검이 흙 속에 뒹군다.',
      choices:[{label:'도굴꾼을 쫓고 검을 거두어 모신다 (의)', set:{hyeop:+2, hasNamedSword:true}, goto:'hub_daeje'},{label:'검만 챙겨 조용히 떠난다', set:{hasNamedSword:true}, goto:'hub_daeje'}] },
    gy_dono_1:{ title:'별빛 아래', act:'承', effect:'rollArt',
      text:'잠 못 드는 밤, 검을 베고 누워 별을 본다. 흐르는 별빛의 궤적과 매화 검로가 문득 하나로 겹친다 — 돈오(頓悟)다.\n\n— 그대의 「{art}」이(가) 단숨에 한 단계 트인다.',
      choices:[{label:'그 깨달음을 놓치지 않고 검에 새긴다', set:{insight:+2, satori:true}, goto:'hub_daeje'}] },
    gy_hwa_1:{ title:'화탄 단련', act:'承',
      text:'대장간 노인이 벌건 숯불을 가리킨다. "겁내지 말고 손을 담그게. 검을 쥘 몸부터 단단해야지." 무모해 보이나, 옛 외문(外門)의 체질 단련법이다.',
      choices:[{label:'이를 악물고 단련을 따른다', set:{toughBody:true, naesang:true}, goto:'hub_ildae'},{label:'무리하지 않고 기초만 배운다', set:{wise:true}, goto:'hub_ildae'}] },
    gy_nor_1:{ title:'걸린 비급', act:'承',
      text:'뒷골목 노름판, 판돈 대신 누렇게 바랜 비급 한 장이 걸렸다. 진본인지 미끼인지 모를 한 장. 좌중의 눈이 번들거린다.',
      choices:[{label:'정정당당히 판에 끼어 따낸다', set:{sili:+1, gambledManual:true}, goto:'hub_ildae'},{label:'사기판임을 간파하고 들춘다 (지혜)', set:{wise:true, hyeop:+1}, goto:'hub_ildae'},{label:'관심 없다며 자리를 뜬다', goto:'hub_ildae'}] },
    gy_san_1:{ title:'산신묘의 시험', act:'承',
      text:'낡은 산신묘. 향을 올리자 돌연 살기가 인다 — 묘를 지키는 옛 진법(陣法)이 침입자를 시험한다. 진을 풀면 안에 봉인된 무언가가 있다.',
      choices:[{label:'침착히 진의 생문(生門)을 찾는다 (지혜)', set:{wise:true, insight:+1, brokeArray:true}, goto:'hub_ildae'},{label:'힘으로 진을 부순다 (위험)', set:{naesang:true, brokeArray:true}, goto:'hub_ildae'}] },
    gy_geoji_1:{ title:'거지왕의 한 수', act:'承',
      text:'개방의 늙은 거지가 막대기 하나로 그대의 검을 세 번 튕겨낸다. "타구봉(打狗棒)의 묘리지. 협의 길을 걷는 자라면, 한 수쯤 보여줌세."',
      choices:[{label:'공손히 한 수를 청해 배운다', set:{insight:+1, rel_gaebang:+1, bossIntel:true}, goto:'hub_ildae'},{label:'적선하고 강호 소식을 청한다', set:{hyeop:+1, rumor:true}, goto:'hub_ildae'}] },
    gy_gwi_1:{ title:'검귀의 시험', act:'轉',
      text:'반쯤 미친 검귀(劍鬼)가 길을 막는다. "내 검을 열 합 받아내면 한 수 주마. 못 받으면… 죽음이다." 살기가 진짜다.',
      choices:[{label:'목숨을 걸고 열 합을 받아낸다', set:{hyeop:+1, naesang:true, beatGeomgwi:true}, goto:'gy_gwi_2'},{label:'싸움을 피해 활로를 연다 (신중)', set:{wise:true}, goto:'hub_daeje'}] },
    gy_gwi_2:{ title:'검귀의 인정', act:'承', effect:'rollArt',
      text:'열 합을 넘기자 검귀의 눈에서 광기가 잠시 걷힌다. "…좋군." 그가 한 갈래 절초를 전하고 다시 미쳐 떠난다.\n\n— 그대의 「{art}」이(가) 사납게 트인다.',
      choices:[{label:'위험한 깨달음을 갈무리한다', set:{insight:+1}, goto:'hub_daeje'}] },
    gy_geo_1:{ title:'천년 거북의 점괘', act:'承',
      text:'호숫가, 등딱지에 옛 글이 새겨진 천년 거북. 그 무늬가 묘하게 앞일을 비춘다. "정(正)의 끝에 마(魔)가 있고, 마의 끝에 정이 있다…" 알 듯 모를 듯한 예언.',
      choices:[{label:'예언을 마음에 새긴다', set:{omen:true, wise:true}, goto:'hub_daeje'},{label:'미신이라 웃어넘긴다', goto:'hub_daeje'}] },
    gy_sabu_1:{ title:'사부의 비전', act:'承', effect:'rollArt',
      text:'사부가 인적 없는 새벽 연무장으로 그대를 부른다. "이건 아직 누구에게도 전하지 않은 한 수다. 네 검에 어울릴 것 같아서." 사문의 정이 검에 담긴다.\n\n— 그대의 「{art}」에 사부의 비전이 더해진다.',
      choices:[{label:'무릎 꿇어 받든다', set:{insight:+1, rel_master:+2, sabuArt:true}, goto:'hub_daeje'}] },
    gy_seol_1:{ title:'설산의 한정', act:'承',
      text:'발 들인 설산 깊은 곳, 만년설 속에 푸르게 빛나는 한정(寒精). 음한지기의 정수로, 들끓는 양강(陽剛) 내식을 다스리는 데 으뜸이라 한다.',
      choices:[{label:'한정으로 내식의 균형을 잡는다', set:{innerPower:true, naesang:false}, goto:'hub_daeje'},{label:'빙궁의 것일지 모르니 손대지 않는다 (신중)', set:{wise:true}, goto:'hub_daeje'}] }
  };
  for (var e in EPS) EPS[e].id = e;
  if (typeof module !== 'undefined' && module.exports) { var core=require('./story.core.js'); for(var k in SCN)core.SCENES[k]=SCN[k]; module.exports={EPISODES:EPS,scenes:SCN}; }
  else { if(typeof EPISODES==='undefined')EPISODES={}; for(var e2 in EPS)EPISODES[e2]=EPS[e2]; for(var k2 in SCN)SCENES[k2]=SCN[k2]; }
})();
