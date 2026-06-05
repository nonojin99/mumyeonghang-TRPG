/* 무명행 TextRPG — 검존 결전 피날레 (턴제 비무로 마무리, 용두사미 해소)
 * story.hwasan_run.js 다음(+ battle.js, engine4 필요). ch3_throne/ch3_finale 덮어쓰기.
 */
(function () {
  var add = {
    ch3_throne: {
      title:'검존(劍尊)의 그림자', act:'轉',
      text:'대전의 한복판, 한 노검객이 홀로 걸어 나온다. 천하 서열 9존의 하나 — 검존(劍尊). ' +
        '휘두르기도 전에 그 검의(劍意)가 그대의 숨을 짓누른다.\n\n"애송이. 네 검에 무엇이 담겼는지, 직접 보자." 도망칠 수 없는 벽이 거기 서 있다.',
      choices:[
        { label:'검을 뽑아 비무(比武)를 청한다 — 전력으로', set:{faceThrone:true}, goto:'battle_kyeomjon' },
        { label:'검존의 도(道)를 묻고 가르침을 청한다 (회유)', requires:{artTierMin:2}, set:{wooThrone:true, hyeop:+2}, goto:'ch3_finale' },
        { label:'아직 때가 아니다 — 검을 거두고 훗날을 기약한다', set:{withdrewThrone:true}, goto:'ending_hyeopgaek' }
      ]
    },
    battle_kyeomjon: {
      title:'검존과의 비무(比武)', act:'轉', battle:'kyeomjon',
      winGoto:'kyeomjon_win', loseGoto:'kyeomjon_lose', text:''
    },
    kyeomjon_win: {
      title:'검존을 넘어서다', act:'結',
      text:'스물네 수의 매화가, 끝내 검존의 검막을 꿰뚫는다. 노검객이 검을 거두며 처음으로 웃는다.\n\n' +
        '"…좋은 검이다. 천하 서열에, 네 이름 한 자리 비워두마." 9존의 하나가, 한 무명인의 검을 인정했다.',
      choices:[ { label:'검을 거두고, 다가올 천하를 본다', set:{wonThrone:true, seongchwi:+3}, goto:'ch3_finale' } ]
    },
    kyeomjon_lose: {
      title:'엔딩 · 검에 스러지다', act:'結', ending:true, endKind:'omyeong',
      text:'검존의 한 수는 인간의 경지가 아니었다. 그대의 매화는 만개하기도 전에 흩어졌다.\n\n' +
        '쓰러진 그대를 내려다보며 검존이 중얼거린다. "한 송이… 피우기엔 일렀구나." ' +
        '무명인의 검은 천하 서열의 벽 앞에서 꺾였다. 그러나 검존이 기억하는 한, 그 이름은 헛되이 스러진 것이 아니다 — 다음 생이라면, 혹은 다음 회(回)라면.',
      choices:[]
    },
    ch3_finale: {
      title:'군림(君臨)으로 가는 길', act:'結',
      text:'한 합이 끝났다. 강호는 이제 한 무명인의 이름을 똑똑히 안다.',
      choices:[
        { label:'강호가 그대를 어떻게 새기는지 듣는다',
          goto:[
            { requires:{ flag:'obeyedOrder', eq:true }, goto:'ending_omyeong' },
            { requires:{ flag:'wonThrone', eq:true }, goto:'ending_run_cheonha' },
            { requires:{ flag:'wooThrone', eq:true }, goto:'ending_geomseon' },
            { requires:{ flag:'withdrewThrone', eq:true }, goto:'ending_hyeopgaek' },
            { goto:'ending_hyeopgaek' }
          ] }
      ]
    }
  };
  if (typeof module !== 'undefined' && module.exports) { var core=require('./story.core.js'); for(var k in add)core.SCENES[k]=add[k]; module.exports=add; }
  else { for(var k2 in add) SCENES[k2]=add[k2]; }
})();
