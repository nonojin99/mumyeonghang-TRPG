/* 무명행 본편 — 3부(2) 전장 세 갈래 → 첫 대면 → 심마의 갈림 (story_main_3a 다음 로드) */
(function () {
  var SCN = {
    /* ── 선봉 ── */
    m3_w_van: {
      title:'선봉 — 흙먼지의 한복판', act:'轉',
      text:'그대의 깃발을 따라 정파의 검들이 쏟아져 들어갔다.\n\n전장은 대회장과 달랐다. 합을 셀 겨를도, 예를 갖출 새도 없었다. 마교의 검수 하나가 그대의 왼쪽을 파고든다 — 그 너머에서 화산의 어린 제자가 밀리고 있는 것이 보였다.',
      choices:[
        { label:'어린 제자부터 — 검로를 꺾어 막아선다', set:{hyeop:+2, savedJunior:true, naesang:true}, goto:'m3_field' },
        { label:'❖ 한 호흡에 둘 다 — 매화가 두 송이로 갈라진다', requires:{flag:'seongchwi', gte:5}, set:{hyeop:+2, seongchwi:+1, savedJunior:true}, goto:'m3_field' },
        { label:'눈앞의 적부터 벤다 — 전선이 뚫리면 모두 죽는다', set:{warCold:true}, goto:'m3_field' }
      ]
    },
    /* ── 지휘 ── */
    m3_w_cmd: {
      title:'지휘 — 깃발 아래에서', act:'轉',
      text:'그대는 검 대신 전열을 쥐었다.\n\n좌익이 무너질 조짐. 예비대는 하나뿐이다 — 지금 투입하면 좌익은 살지만, 우익의 청운 쪽이 얇아진다. 전령의 눈이 그대의 입을 기다린다.',
      choices:[
        { label:'예비대를 좌익으로 — 청운을 믿는다', set:{wise:true, trustCheongun:true, rel_cheongun:+1}, goto:'m3_field' },
        { label:'예비대를 아껴, 그대가 직접 좌익을 막는다', set:{hyeop:+1, naesang:true}, goto:'m3_field' },
        { label:'좌익을 한 발 물려 적을 끌어들인 뒤 반격한다 (계책)', set:{wise:true, tactic:true}, goto:'m3_field' }
      ]
    },
    /* ── 잠행 ── */
    m3_w_inf: {
      title:'잠행 — 군막의 그늘', act:'轉',
      text:'혼전의 그늘을 타고, 그대는 적 후방의 군막으로 스몄다.\n\n무심마군의 측근 — 마을들을 지우는 일의 손발 노릇을 한 자가 거기 있었다. 호위는 둘. 천막 너머에서 그자의 목소리가 새어 나온다. "…조각의 행방은 화산 안쪽이 맞다. 곧 그분께서 직접…"\n\n*직접.* 그 한마디에 숨이 멎었다.',
      choices:[
        { label:'끝까지 엿듣는다 — 한마디가 천 명의 목숨이다', set:{wise:true, intelDeep:true}, goto:'m3_field' },
        { label:'지금 친다 — 손발 하나라도 끊어둔다', set:{cutLimb:true, naesang:true}, goto:'m3_field' }
      ]
    },

    /* ── 수렴: 전장, 그리고 그가 온다 ── */
    m3_field: {
      title:'전장의 한가운데', act:'轉',
      text:'전투는 사흘을 끌었다.\n\n사흘째 오후, 함께 하산했던 동기 하나가 — 나루에서, 객잔에서, 함께 웃던 그 얼굴이 — 들것에 실려 나왔다. 그대가 손을 잡았을 때, 그는 희미하게 웃었다. "…우리, 산적 때보다… 많이 컸지?" 그것이 마지막이었다.\n\n강해진다는 것이 곧 지킨다는 뜻은 아님을, 그대는 피로 배웠다.\n\n그리고 — 그 죽음을 슬퍼할 새도 없이, 전장의 소음이 *뚝* 멎었다.',
      choices:[ { label:'― 고개를 든다', goto:'m3_face' } ]
    },
    m3_face: {
      title:'무심(無心)', act:'轉',
      text:'한 사람이 전장을 가로질러 걸어오고 있었다.\n\n서두르지 않았다. 검을 뽑지도 않았다. 그저 걸었고 — 그가 지나는 자리마다, 정파든 마교든 가리지 않고 사람이 *꺼졌다*. 십수 년 전 그 밤과, 한 치도 다르지 않은 걸음으로.\n\n무심마군(無心魔君). 소문이 아니라, 실재(實在)가 거기 있었다.\n\n그가 화산의 깃발 쪽을 — 그대 쪽을 — 한 번, 스치듯 보았다. 잿더미의 아이를 알아보지 못하는, 아무것도 담기지 않은 눈으로.',
      choices:[
        { label:'검을 뽑아 그 앞을 막아선다', set:{faced:'맞섬'}, goto:'m3_wall' },
        { label:'움직이지 않는다 — 그의 무공을 눈에 새긴다', set:{faced:'관찰', insight:+2}, goto:'m3_after_face' },
        { label:'그의 진로에 있는 부상병들부터 끌어낸다', set:{faced:'구함', hyeop:+2}, goto:'m3_after_face' }
      ]
    },
    m3_wall: {
      title:'벽(壁)', act:'轉',
      text:'기억하라고, 외치고 싶었다. 그 밤의 마을을. 그러나 —\n\n검이 채 뻗기도 전에, 세상이 옆으로 누웠다. 무슨 일이 일어났는지조차 알 수 없었다. 한 수. 단 한 수에 그대는 십 장 밖에 처박혔고, 갈비뼈 어딘가가 부러졌고 — 그가 그대를 *지나쳐 갔다*. 십수 년 전처럼. 지울 가치도 없다는 듯.\n\n의식이 꺼지기 전 마지막으로 본 것은, 달려오는 청운의 얼굴이었다.',
      choices:[ { label:'― 어둠', set:{naesang:true, crushed:true}, goto:'m3_after_face' } ]
    },
    m3_after_face: {
      title:'물러간 재앙', act:'轉',
      text:'무심마군은 그날 전장에서 무언가를 — 혹은 누군가를 — 확인만 하고 물러갔다. 마교의 일익도 따라 물러났고, 사흘의 전투는 정파의 신승(辛勝)으로 기록되었다.\n\n승리였다. 그러나 그 자리에 있던 누구도 이긴 기분이 아니었다. 단 한 사람이 걸어 지나간 것만으로 — 전장 전체가 제 격이 아님을 안 것이다.\n\n야전 천막. 부러진 곳을 동여맨 그대의 안에서, 무언가가 끓고 있었다. 그 무심함. 잿더미의 밤과 똑같은 그 무심함이.',
      choices:[
        { label:'분노를 차게 벼린다 — "언젠가 네가 나를 기억하게 만든다"', set:{simma:+2, path3:'분노'}, goto:'m3_close' },
        { label:'슬픔을 새긴다 — 미움보다, 잃은 것들을 기억하기로', set:{hyeop:+1, path3:'슬픔'}, goto:'m3_close' },
        { label:'어둠을 곁눈질한다 — 저런 힘은 어디서 오는가. 닿을 길이… 정도(正道)뿐인가', set:{simma:+3, darkSeed:true, path3:'금단'}, goto:'m3_close' }
      ]
    },
    m3_close: {
      title:'고수(高手)', act:'轉',
      text:'대전이 일단락되고, 강호는 그 사흘을 오래 이야기했다.\n\n그 이야기들 속에 그대의 이름이 있었다. 선봉의 매화, 깃발 아래의 지략, 군막을 흔든 그림자 — 어느 쪽이었든, 강호는 이제 그대를 화산의 *순위권 강자*로 셈했다. 잿더미의 무명아가, 이름으로 무게를 갖기 시작한 것이다.\n\n돌아온 연화봉. 부쩍 노쇠한 청솔진인이 그대를 불러 차를 따랐다.\n\n"강해지는 것은 쉽다." 노인이 말했다. "강해지고도 사람으로 남는 것이 어렵지. 정점에 가까울수록 곁이 비어갈 게다 — 그때 네가 무엇을 붙들고 있느냐가, 네가 누구인지를 정한다."\n\n그 말의 무게를, 그대는 머지않아 온몸으로 알게 될 것이었다.',
      choices:[ { label:'― 3부 끝', goto:'m3_tbc' } ]
    },
    m3_tbc: {
      title:'— 3부 끝 · 4부로 —', act:'轉', ending:true, endKind:'hidden',
      text:'(3부 「적염」 완결 — 원수는 실재하는 벽이 되었고, 그대는 강호의 고수가 되었다.\n\n다음 탑재: 4부 「무림맹」 — 마교의 중원 정복 기치, 정마대전, 그리고 청솔진인과의 이별.\n\n심마·관계·전공은 모두 기록되어 4부로 이어진다.)',
      choices:[]
    }
  };
  if (typeof module !== 'undefined' && module.exports) {
    var core = require('./story.core.js'); for (var k in SCN) core.SCENES[k] = SCN[k]; module.exports = { scenes: SCN };
  } else { for (var k2 in SCN) SCENES[k2] = SCN[k2]; }
})();
