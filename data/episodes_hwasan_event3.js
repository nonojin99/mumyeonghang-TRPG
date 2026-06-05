/* 무명행 TextRPG — 화산 이벤트 풀 ③ (ev_20~ev_30, hub ildae/daeje) — 이벤트 총 30 도달 */
(function () {
  var EPS = {
    ev_cock:   { hub:'ildae', title:'투계 도박장의 뒷거래를 본다',       entry:'ev_cock_1', weight:16, icon:'鬪' },
    ev_official:{ hub:'daeje', title:'탐관오리가 백성을 쥐어짠다',       entry:'ev_off_1',  weight:18, icon:'官' },
    ev_quack_d:{ hub:'ildae', title:'사이비 도사가 혹세무민한다',       entry:'ev_qkd_1',  weight:18, icon:'邪' },
    ev_funeral:{ hub:'daeje', title:'장례 행렬과 마주친다',             entry:'ev_fun_1',  weight:16, icon:'喪' },
    ev_shrine: { hub:'ildae', title:'비를 피해 사당에서 동숙한다',       entry:'ev_shr_1',  weight:18, icon:'廟' },
    ev_plot:   { hub:'daeje', title:'우연히 음모를 엿듣는다',           entry:'ev_plot_1', weight:18, icon:'謀' },
    ev_laundry:{ hub:'ildae', title:'빨래터에서 분쟁이 인다',           entry:'ev_lau_1',  weight:14, icon:'川' },
    ev_drought:{ hub:'daeje', title:'가뭄에 기우제가 열린다',           entry:'ev_dro_1',  weight:16, icon:'旱' },
    ev_troupe: { hub:'ildae', title:'떠돌이 극단의 공연을 본다',         entry:'ev_tro_1',  weight:16, icon:'戲' },
    ev_quack:  { hub:'ildae', title:'노점 약장수의 사기를 본다',         entry:'ev_qk_1',   weight:18, icon:'藥' },
    ev_night:  { hub:'ildae', title:'야시장에 소매치기단이 돈다',       entry:'ev_nig_1',  weight:18, icon:'夜' }
  };
  var SCN = {
    ev_cock_1:{ title:'투계장의 뒷거래', act:'承',
      text:'시끌벅적한 투계 도박장. 그 뒤편에서 사파 무리가 은밀히 사람을 사고파는 거래를 한다. 닭싸움은 위장이었다.',
      choices:[{label:'거래 현장을 덮친다', set:{hyeop:+2, leadHyeolgyo:true}, goto:'hub_ildae'},{label:'증거를 모아 개방·관에 넘긴다 (지혜)', set:{wise:true, rel_gaebang:+1}, goto:'hub_ildae'}] },
    ev_off_1:{ title:'탐관(貪官)', act:'承',
      text:'고을 수령이 가뭄에도 세를 두 배로 매겨 백성을 쥐어짠다. 곳간엔 곡식이 썩어나는데, 거리엔 굶어 죽는 이가 즐비하다.',
      choices:[{label:'밤에 곳간을 열어 백성에게 푼다 (의적)', set:{hyeop:+2, ak:+1, robinhood:true}, goto:'hub_daeje'},{label:'증좌를 잡아 상부에 고발한다 (정도)', set:{hyeop:+2, wise:true}, goto:'hub_daeje'},{label:'강호인이 정사(政事)에 끼지 않는다', goto:'hub_daeje'}] },
    ev_qkd_1:{ title:'사이비 도사', act:'承',
      text:'가짜 부적과 거짓 예언으로 마을 재산을 긁어모으는 사이비 도사. 도교 검문인 화산의 이름까지 팔아먹는다.',
      choices:[{label:'사술을 들춰 정체를 밝힌다', set:{hyeop:+2}, goto:'hub_ildae'},{label:'화산의 이름값을 따져 응징한다', set:{hyeop:+1, ak:+1}, goto:'hub_ildae'}] },
    ev_fun_1:{ title:'장례 행렬', act:'承',
      text:'곡소리 자욱한 장례 행렬. 알고 보니 사파에게 가장을 잃은 집안이다. 유족이 그대의 매화 수실을 보고 무릎을 꿇는다. "원수를… 갚아 주실 수 없겠습니까."',
      choices:[{label:'사연을 듣고 원흉을 쫓겠다 약속한다', set:{hyeop:+2, vowRevenge:true}, goto:'hub_daeje'},{label:'향을 올려 조의만 표한다', set:{hyeop:+1}, goto:'hub_daeje'}] },
    ev_shr_1:{ title:'사당의 밤', act:'承',
      text:'폭우를 피해 든 낡은 사당. 먼저 와 있던 낯선 강호인과 모닥불을 사이에 둔다. 그의 정체도, 의도도 알 수 없다.',
      choices:[{label:'경계를 풀고 술잔을 나눈다 (인연)', set:{rel_stranger:+1, rested:true}, goto:'hub_ildae'},{label:'등을 보이지 않고 밤을 샌다 (신중)', set:{wise:true}, goto:'hub_ildae'}] },
    ev_plot_1:{ title:'엿들은 음모', act:'轉',
      text:'객점 벽 너머, 낮은 목소리가 새어 든다. "…정파 회합 날, 한꺼번에 친다." 사파인지 혈교인지 모를 자들이 큰 일을 꾸민다.',
      choices:[{label:'끝까지 엿들어 전모를 캔다', set:{wise:true, knowPlot:true, leadHyeolgyo:true}, goto:'hub_daeje'},{label:'즉시 무림맹·개방에 알린다', set:{hyeop:+2, rel_gaebang:+1}, goto:'hub_daeje'}] },
    ev_lau_1:{ title:'빨래터 분쟁', act:'承',
      text:'아낙들의 빨래터에서 텃세 싸움이 칼부림 직전까지 간다. 한쪽이 지역 토호의 식솔이라 아무도 말리지 못한다.',
      choices:[{label:'위세를 눌러 공평히 중재한다', set:{hyeop:+1, wise:true}, goto:'hub_ildae'},{label:'사소한 일이라 지나친다', goto:'hub_ildae'}] },
    ev_dro_1:{ title:'기우제', act:'承',
      text:'쩍쩍 갈라진 논, 절박한 기우제. 무당(巫堂)이 "산의 노한 정기를 검으로 끊어달라"며 강호인에게 청한다. 미신이나, 민심이 달렸다.',
      choices:[{label:'민심을 위해 의식을 도와준다 (온정)', set:{hyeop:+1, rel_village:+1}, goto:'hub_daeje'},{label:'진짜 문제(수원·보)를 찾아 해결한다 (실질)', set:{hyeop:+2, wise:true}, goto:'hub_daeje'}] },
    ev_tro_1:{ title:'떠돌이 극단', act:'承',
      text:'마당놀이 극단이 협객의 무용담을 연희한다. 관객 속에서, 극단을 등쳐먹으려는 왈패들이 눈에 띈다.',
      choices:[{label:'왈패를 물려 공연을 지킨다', set:{hyeop:+1, rested:true}, goto:'hub_ildae'},{label:'극에 끼어들어 진짜 검무를 보여준다 (흥)', set:{hyeop:+1, fameRoad:true}, goto:'hub_ildae'}] },
    ev_qk_1:{ title:'약장수의 사기', act:'承',
      text:'노점 약장수가 "만병통치"라며 가짜 영약을 판다. 가난한 병자가 마지막 돈을 털어 그것을 사려 한다.',
      choices:[{label:'사기를 들춰 병자의 돈을 지킨다', set:{hyeop:+2, exposedFraud:true}, goto:'hub_ildae'},{label:'진짜 약방을 소개해 준다 (실질)', set:{hyeop:+1, wise:true}, goto:'hub_ildae'}] },
    ev_nig_1:{ title:'야시장 소매치기단', act:'承',
      text:'등불 밝힌 야시장. 아이들을 부려 소매치기를 시키는 패거리가 보인다. 아이들의 눈엔 두려움이 가득하다.',
      choices:[{label:'두목을 잡고 아이들을 빼낸다', set:{hyeop:+2, savedChildren:true}, goto:'hub_ildae'},{label:'아이들을 다그치지 않고 살길을 마련해 준다 (온정)', set:{hyeop:+2}, goto:'hub_ildae'}] }
  };
  for (var e in EPS) EPS[e].id = e;
  if (typeof module !== 'undefined' && module.exports) { var core=require('./story.core.js'); for(var k in SCN)core.SCENES[k]=SCN[k]; module.exports={EPISODES:EPS,scenes:SCN}; }
  else { if(typeof EPISODES==='undefined')EPISODES={}; for(var e2 in EPS)EPISODES[e2]=EPS[e2]; for(var k2 in SCN)SCENES[k2]=SCN[k2]; }
})();
