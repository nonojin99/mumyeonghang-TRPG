/* 무명행 TextRPG — 화산 기연(奇緣) 풀 ② (gy_09~gy_19, hub ildae/daeje)
 * 단발 위주. 무공·내공·인연·기보 등 성장 보상. weight 낮게(드물게).
 */
(function () {
  var EPS = {
    gy_seoksil:  { hub:'daeje', title:'폭포 뒤 석실(石室)의 검결을 본다',     entry:'gy_seoksil_1', weight:9,  icon:'訣' },
    gy_danhwan:  { hub:'ildae', title:'고목 속 단환(丹丸)을 얻는다',          entry:'gy_danhwan_1', weight:10, icon:'丹' },
    gy_madu:     { hub:'daeje', title:'죽어가는 마두가 진전(眞傳)을 남긴다',  entry:'gy_madu_1',    weight:8,  icon:'魔' },
    gy_hanok:    { hub:'daeje', title:'빙백 한옥(寒玉)으로 내식을 다스린다',   entry:'gy_hanok_1',   weight:9,  icon:'玉' },
    gy_baduk:    { hub:'ildae', title:'기인이 바둑 한 판을 청한다',           entry:'gy_baduk_1',   weight:10, icon:'棋' },
    gy_oncheon:  { hub:'ildae', title:'검수(劍水) 온천에서 검기를 씻는다',     entry:'gy_oncheon_1', weight:10, icon:'泉' },
    gy_byeokhwa: { hub:'daeje', title:'협곡 벽화의 검흔(劍痕)을 해독한다',     entry:'gy_byeok_1',   weight:9,  icon:'痕' },
    gy_noseung:  { hub:'daeje', title:'노승(老僧)이 선문답을 건다',           entry:'gy_seung_1',   weight:9,  icon:'禪' },
    gy_bigo:     { hub:'ildae', title:'무너진 표국 비고(秘庫)를 뒤진다',       entry:'gy_bigo_1',    weight:10, icon:'庫' },
    gy_maehwa:   { hub:'daeje', title:'천년 매화나무의 영기를 마주한다',       entry:'gy_maehwa_1',  weight:8,  icon:'梅' },
    gy_eumgong:  { hub:'ildae', title:'떠돌이 악공의 음공(音功)을 듣는다',     entry:'gy_eum_1',     weight:9,  icon:'琴' }
  };
  var SCN = {
    gy_seoksil_1:{ title:'석실의 검결', act:'承', effect:'rollArt',
      text:'폭포 물줄기 뒤 숨은 석실. 벽면에 누군가 검 끝으로 새긴 검결이 빼곡하다. 한 글자 한 글자가 검의 깨달음으로 번뜩인다.\n\n— 그대의 「{art}」이(가) 한층 깊어진다.',
      choices:[{label:'검결을 새겨 익힌다', set:{insight:+1, hyeop:+1}, goto:'hub_daeje'}] },
    gy_danhwan_1:{ title:'고목의 단환', act:'承',
      text:'벼락 맞은 고목 속, 누군가 감춰둔 단환 하나가 은은한 빛을 낸다. 약인지 독인지는 삼켜봐야 안다.',
      choices:[{label:'운기하며 천천히 복용한다', set:{innerPower:true, insight:+1}, goto:'hub_ildae'},{label:'동문을 위해 아껴 둔다 (의)', set:{hyeop:+1, hasDanhwan:true}, goto:'hub_ildae'}] },
    gy_madu_1:{ title:'마두의 유언', act:'轉',
      text:'관군에 쫓겨 죽어가는 마두(魔頭)가 그대의 소매를 붙든다. "내 한 수를… 가져가라. 정파의 손에 죽는 것도… 인연이지." 사마의 절기가 그의 마지막 숨에 실린다.',
      choices:[{label:'받아들이되 정도로 갈무리한다', set:{insight:+1, maduArt:true}, goto:'hub_daeje'},{label:'사마의 것이라 거절한다 (정도)', set:{hyeop:+1, upright:true}, goto:'hub_daeje'}] },
    gy_hanok_1:{ title:'빙백 한옥', act:'承',
      text:'얼음보다 찬 한옥(寒玉) 한 덩이가 동굴에 박혀 있다. 그 위에서 운기하면 들끓는 내식을 식혀 잡내를 몰아낼 수 있다 한다.',
      choices:[{label:'한옥 위에서 운기조식한다', set:{naesang:false, innerPower:true}, goto:'hub_daeje'},{label:'한옥을 캐어 지닌다 (기보)', set:{hasHanok:true}, goto:'hub_daeje'}] },
    gy_baduk_1:{ title:'바둑 한 판', act:'承',
      text:'정자에 앉은 백발 기인이 바둑판을 가리킨다. "한 판 두지. 이기면 한 수 가르쳐주고, 지면… 네 검 이야기나 들려다오." 그 수담(手談) 속에 병법의 묘리가 흐른다.',
      choices:[{label:'전력으로 한 판 둔다 (지략)', set:{wise:true, insight:+1}, goto:'hub_ildae'},{label:'져주며 노인의 이야기를 청한다', set:{rel_old:+1, hyeop:+1}, goto:'hub_ildae'}] },
    gy_oncheon_1:{ title:'검수 온천', act:'承',
      text:'검기를 머금은 듯 푸르게 김이 오르는 온천. 몸을 담그자 쌓인 내상과 잡기가 서서히 풀린다.',
      choices:[{label:'느긋이 몸을 다스린다 (회복)', set:{naesang:false, rested:true}, goto:'hub_ildae'},{label:'검기를 끌어 단련을 겸한다', set:{insight:+1}, goto:'hub_ildae'}] },
    gy_byeok_1:{ title:'벽화의 검흔', act:'承', effect:'rollArt',
      text:'협곡 절벽에 옛 검객이 검으로 새긴 그림. 단순한 벽화가 아니라, 한 초식의 궤적을 그려 남긴 것이다.\n\n— 그대의 「{art}」에 한 갈래 변초가 더해진다.',
      choices:[{label:'궤적을 따라 검을 그어 본다', set:{insight:+1}, goto:'hub_daeje'}] },
    gy_seung_1:{ title:'노승의 선문답', act:'承',
      text:'길가 바위에 앉은 노승이 묻는다. "검을 쥔 손과, 검을 놓은 손 — 어느 쪽이 더 강한가." 답에 따라 마음의 한 자락이 트인다.',
      choices:[{label:'"놓을 줄 아는 손" (구도)', set:{wise:true, creedSeek:true}, goto:'hub_daeje'},{label:'"쥐고도 자유로운 손" (협)', set:{hyeop:+2}, goto:'hub_daeje'}] },
    gy_bigo_1:{ title:'표국 비고', act:'承',
      text:'전란에 무너진 표국 터. 잔해 아래 숨은 비고에서 은자와 호신 기물, 그리고 빛바랜 비급 한 권이 나온다.',
      choices:[{label:'주인 잃은 물건을 거두어 길에 쓴다', set:{sili:+1, hasRelic:true}, goto:'hub_ildae'},{label:'유족을 찾아 돌려줄 것만 챙긴다 (의)', set:{hyeop:+2}, goto:'hub_ildae'}] },
    gy_maehwa_1:{ title:'천년 매화', act:'承', effect:'rollArt',
      text:'인적 끊긴 산정, 천년을 산 매화나무 한 그루. 만개한 꽃 아래 앉자, 화산 검의 근원이 그 향기 속에 스며 있음을 느낀다.\n\n— 매화의 정수가 그대의 「{art}」에 어린다.',
      choices:[{label:'꽃비 아래 검을 닦으며 깨친다', set:{insight:+1, hyeop:+1, maehwaSpirit:true}, goto:'hub_daeje'}] },
    gy_eum_1:{ title:'악공의 음공', act:'承',
      text:'다리 밑 떠돌이 악공의 비파 소리가 묘하게 내식을 울린다. "들리는가? 소리에도 무(武)가 있네." 음(音)으로 기를 다스리는 비전의 한 자락.',
      choices:[{label:'소리에 귀 기울여 기를 고른다', set:{insight:+1, soundArt:true}, goto:'hub_ildae'},{label:'동전을 후히 주고 한 곡 더 청한다', set:{hyeop:+1, rested:true}, goto:'hub_ildae'}] }
  };
  for (var e in EPS) EPS[e].id = e;
  if (typeof module !== 'undefined' && module.exports) { var core=require('./story.core.js'); for(var k in SCN)core.SCENES[k]=SCN[k]; module.exports={EPISODES:EPS,scenes:SCN}; }
  else { if(typeof EPISODES==='undefined')EPISODES={}; for(var e2 in EPS)EPISODES[e2]=EPS[e2]; for(var k2 in SCN)SCENES[k2]=SCN[k2]; }
})();
