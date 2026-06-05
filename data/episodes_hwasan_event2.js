/* 무명행 TextRPG — 화산 이벤트 풀 ② (ev_09~ev_19, hub ildae/daeje) */
(function () {
  var EPS = {
    ev_wedding:{ hub:'ildae', title:'혼례에 불청객이 난입한다',         entry:'ev_wed_1', weight:18, icon:'婚' },
    ev_fire:   { hub:'ildae', title:'장터에 불이 번진다',               entry:'ev_fire_1',weight:20, icon:'火' },
    ev_prison: { hub:'daeje', title:'억울한 옥살이를 호소받는다',       entry:'ev_pri_1', weight:18, icon:'獄' },
    ev_betray: { hub:'daeje', title:'호위하던 표행에서 배신이 인다',     entry:'ev_bet_1', weight:18, icon:'背' },
    ev_well:   { hub:'ildae', title:'마을 우물에 독이 풀렸다',           entry:'ev_well_1',weight:18, icon:'井' },
    ev_toll:   { hub:'ildae', title:'다리 무뢰배가 통행세를 뜯는다',     entry:'ev_toll_1',weight:22, icon:'橋' },
    ev_lost:   { hub:'ildae', title:'길 잃은 아이가 운다',               entry:'ev_lost_1',weight:20, icon:'童' },
    ev_clear:  { hub:'daeje', title:'그대에게 누명이 씌워졌다',         entry:'ev_clr_1', weight:16, icon:'冤' },
    ev_debt:   { hub:'ildae', title:'빚쟁이에 쫓기는 가족을 만난다',     entry:'ev_debt_1',weight:18, icon:'債' },
    ev_refugee:{ hub:'daeje', title:'굶주린 유랑민 행렬과 마주친다',     entry:'ev_ref_1', weight:18, icon:'民' },
    ev_food:   { hub:'ildae', title:'객점에 식중독 소동이 난다',         entry:'ev_food_1',weight:16, icon:'食' }
  };
  var SCN = {
    ev_wed_1:{ title:'혼례의 불청객', act:'承',
      text:'시골 혼례 마당에 사파 무뢰배가 난입해 신부를 탐낸다. 하객들은 겁에 질려 숨죽인다.',
      choices:[{label:'단숨에 제압해 혼례를 지킨다', set:{hyeop:+2}, goto:'hub_ildae'},{label:'좋게 타일러 돌려보낸다 (도량)', set:{hyeop:+1, wise:true}, goto:'hub_ildae'}] },
    ev_fire_1:{ title:'장터의 불', act:'轉',
      text:'마른 바람에 장터 불길이 삽시간에 번진다. 한 노점 안에 사람이 갇혔다는 비명.',
      timedNote:'지금 — 불길이 덮치기 전에.', timed:9,
      choices:[{label:'불 속으로 뛰어들어 끌어낸다', set:{hyeop:+3, naesang:true}, goto:'hub_ildae'},{label:'경공으로 지붕을 타 길을 연다', requires:{artTierMin:2}, set:{hyeop:+3}, goto:'hub_ildae'}],
      onTimeout:{ set:{ak:+1}, goto:'hub_ildae' } },
    ev_pri_1:{ title:'억울한 옥살이', act:'承',
      text:'한 노파가 그대의 옷자락을 붙든다. "내 아들이 누명을 쓰고 옥에 갇혔소. 협객이라면… 진실을 봐주오."',
      choices:[{label:'관아를 찾아 진상을 캔다 (협)', set:{hyeop:+2, wise:true}, goto:'hub_daeje'},{label:'뇌물 받은 포교를 무력으로 압박한다', set:{ak:+1, hyeop:+1}, goto:'hub_daeje'},{label:'강호인이 관사에 끼면 안 된다며 사양한다', goto:'hub_daeje'}] },
    ev_bet_1:{ title:'표행의 배신', act:'轉',
      text:'함께 표물을 호위하던 표사가 돌연 칼을 돌린다. 산적과 내통한 것. 표물과 동료의 목숨이 한꺼번에 위태롭다.',
      choices:[{label:'배신자부터 제압해 판을 끊는다', set:{hyeop:+2, caughtTraitor:true}, goto:'hub_daeje'},{label:'표물을 버리고 사람부터 지킨다 (협)', set:{hyeop:+2, savedLives:true}, goto:'hub_daeje'}] },
    ev_well_1:{ title:'독 우물', act:'轉',
      text:'마을 우물에 누군가 독을 풀었다. 이미 몇이 쓰러졌고, 영문 모르는 이들이 물을 길으러 모여든다.',
      choices:[{label:'당장 우물을 막고 해독을 돕는다', set:{hyeop:+2, savedVillage:true}, goto:'hub_ildae'},{label:'독의 출처를 추적한다 (지혜)', set:{wise:true, leadHyeolgyo:true}, goto:'hub_ildae'}] },
    ev_toll_1:{ title:'다리의 무뢰배', act:'承',
      text:'외나무다리를 막은 무뢰배가 행인마다 통행세를 뜯는다. 가난한 봇짐장수가 돈이 없어 매를 맞는다.',
      choices:[{label:'무뢰배를 혼내 다리를 연다', set:{hyeop:+2}, goto:'hub_ildae'},{label:'장수의 통행세를 대신 내준다 (온정)', set:{hyeop:+1, sili:-1}, goto:'hub_ildae'}] },
    ev_lost_1:{ title:'길 잃은 아이', act:'承',
      text:'저잣거리 한복판, 울먹이는 어린아이. 인파에 떠밀려 부모를 잃었다. 그냥 두면 인신매매단의 표적이 되기 십상이다.',
      choices:[{label:'부모를 찾아줄 때까지 돌본다', set:{hyeop:+2}, goto:'hub_ildae'},{label:'개방에 부탁해 빠르게 찾게 한다 (지혜)', set:{hyeop:+1, rel_gaebang:+1}, goto:'hub_ildae'}] },
    ev_clr_1:{ title:'씌워진 누명', act:'轉',
      text:'그대가 지나간 마을에서 살인이 났고, "매화 수실을 단 자의 짓"이라는 소문이 돈다. 화산의 이름이 걸렸다.',
      choices:[{label:'스스로 진범을 잡아 누명을 벗는다', set:{hyeop:+2, clearedName:true}, goto:'hub_daeje'},{label:'개방·관과 공조해 결백을 밝힌다', set:{wise:true, rel_gaebang:+1}, goto:'hub_daeje'}] },
    ev_debt_1:{ title:'쫓기는 가족', act:'承',
      text:'고리대 빚에 쫓긴 가족이 그대의 객점에 숨어든다. 곧 칼 든 빚쟁이들이 들이닥친다.',
      choices:[{label:'빚쟁이를 물리고 가족을 지킨다', set:{hyeop:+2}, goto:'hub_ildae'},{label:'빚의 부당함을 따져 합의시킨다 (지혜)', set:{wise:true, hyeop:+1}, goto:'hub_ildae'},{label:'남의 빚에 끼지 않는다', set:{ak:+1}, goto:'hub_ildae'}] },
    ev_ref_1:{ title:'유랑민 행렬', act:'轉',
      text:'전란과 흉년에 고향을 잃은 유랑민 행렬. 굶주린 아이들이 길가에 쓰러진다. 그대의 봇짐엔 며칠 치 식량뿐이다.',
      choices:[{label:'가진 식량을 모두 나눈다 (협)', set:{hyeop:+3, sili:-1}, goto:'hub_daeje'},{label:'인근 부호를 설득해 구휼하게 한다 (지혜)', set:{hyeop:+2, wise:true}, goto:'hub_daeje'}] },
    ev_food_1:{ title:'객점 식중독', act:'承',
      text:'객점 손님들이 줄줄이 배를 잡고 쓰러진다. 상한 음식인지, 누군가의 독수인지 — 주인은 발만 동동 구른다.',
      choices:[{label:'증상을 살펴 응급 처치한다 (의술)', set:{hyeop:+2, rel_baeksoso:+1}, goto:'hub_ildae'},{label:'주방을 뒤져 원인을 밝힌다 (지혜)', set:{wise:true}, goto:'hub_ildae'}] }
  };
  for (var e in EPS) EPS[e].id = e;
  if (typeof module !== 'undefined' && module.exports) { var core=require('./story.core.js'); for(var k in SCN)core.SCENES[k]=SCN[k]; module.exports={EPISODES:EPS,scenes:SCN}; }
  else { if(typeof EPISODES==='undefined')EPISODES={}; for(var e2 in EPS)EPISODES[e2]=EPS[e2]; for(var k2 in SCN)SCENES[k2]=SCN[k2]; }
})();
