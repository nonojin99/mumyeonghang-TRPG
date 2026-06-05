/* 무명행 — 동적 배역 에피소드 (engine5 전용: {슬롯} 치환 · traitGate · fate)
 * 같은 사건도 캐스팅된 인물 성격에 따라 다르게, 결과는 운명(fate)으로 누적되어 후반을 바꾼다.
 * 슬롯 rel/fate 플래그: rel_사형, fate_사형 등.
 */
(function () {
  var EPS = {
    dyn_sahyung: { hub:'ildae', title:'사형이 검을 청한다',     entry:'dyn_sh_1', weight:24, icon:'兄' },
    dyn_rival:   { hub:'ildae', title:'라이벌이 시비를 건다',    entry:'dyn_rv_1', weight:22, icon:'敵' },
    dyn_samae:   { hub:'ildae', title:'사매가 조용히 다가온다',  entry:'dyn_sm_1', weight:20, icon:'妹' },
    dyn_donggi:  { hub:'daeje', title:'동기의 수상한 낌새',      entry:'dyn_dg_1', weight:18, icon:'同' },
    dyn_reunion: { hub:'daeje', title:'묵은 인연이 돌아온다',    entry:'dyn_re_1', weight:20, icon:'緣' }
  };
  var SCN = {
    /* 사형 — 성격에 따라 비무가 다른 의미 */
    dyn_sh_1: { title:'사형 {사형}', act:'承',
      text:'사형 {사형}이(가) 그대 앞에 목검을 던진다. 같은 사문, 그러나 마음의 결은 사람마다 다르다.',
      choices:[
        { traitGate:{slot:'사형',trait:'오만'}, label:'그의 콧대를 정면으로 꺾는다', set:{hyeop:+2, rel_사형:+1}, fate:{slot:'사형',value:'경쟁'}, goto:'hub_ildae' },
        { traitGate:{slot:'사형',trait:'충직'}, label:'진지하게 한 수 가르침을 청한다', set:{rel_사형:+2}, fate:{slot:'사형',value:'신뢰'}, goto:'hub_ildae' },
        { traitGate:{slot:'사형',trait:'음험'}, label:'겨루며 그의 속내를 떠본다', set:{wise:true, rel_사형:+1}, fate:{slot:'사형',value:'경계'}, goto:'hub_ildae' },
        { traitGate:{slot:'사형',trait:'호승'}, label:'승부욕을 받아 끝까지 겨룬다', set:{hyeop:+1, rel_사형:+1}, fate:{slot:'사형',value:'호적수'}, goto:'hub_ildae' },
        { label:'적당히 어울려 검을 나눈다', set:{rel_사형:+1}, goto:'hub_ildae' }
      ] },
    /* 라이벌 */
    dyn_rv_1: { title:'라이벌 {라이벌}', act:'承',
      text:'{라이벌}이(가) 비웃듯 검을 겨눈다. "무명 출신이 어디까지 오르나 보지."',
      choices:[
        { traitGate:{slot:'라이벌',trait:'탐욕'}, label:'그가 노리는 것을 역이용한다', set:{sili:+1}, fate:{slot:'라이벌',value:'이용'}, goto:'hub_ildae' },
        { traitGate:{slot:'라이벌',trait:'음험'}, label:'그의 음모를 미리 간파해 둔다', set:{wise:true}, fate:{slot:'라이벌',value:'간파'}, goto:'hub_ildae' },
        { label:'정면으로 코를 납작하게 만든다', set:{hyeop:+1, rel_라이벌:-1}, fate:{slot:'라이벌',value:'앙심'}, goto:'hub_ildae' },
        { label:'도량으로 웃어넘긴다', set:{wise:true}, fate:{slot:'라이벌',value:'무시'}, goto:'hub_ildae' }
      ] },
    /* 사매 */
    dyn_sm_1: { title:'사매 {사매}', act:'承',
      text:'사매 {사매}이(가) 머뭇대며 다가온다. 그 눈빛의 온도는 사람마다 다르다.',
      choices:[
        { traitGate:{slot:'사매',trait:'다정'}, label:'따뜻하게 마음을 받아준다', set:{rel_사매:+2}, fate:{slot:'사매',value:'연정'}, goto:'hub_ildae' },
        { traitGate:{slot:'사매',trait:'오만'}, label:'기 싸움을 받아 맞선다', set:{rel_사매:+1}, fate:{slot:'사매',value:'경쟁'}, goto:'hub_ildae' },
        { label:'담백하게 동문으로 대한다', set:{rel_사매:+1}, goto:'hub_ildae' }
      ] },
    /* 동기 — 비겁/음험이면 배신 씨앗 */
    dyn_dg_1: { title:'동기 {동기}', act:'承',
      text:'동기 {동기}이(가) 늦은 밤 무언가를 감추듯 움직인다. 그 낌새가 마음에 걸린다.',
      choices:[
        { traitGate:{slot:'동기',trait:'음험'}, label:'몰래 뒤를 캔다', set:{wise:true}, fate:{slot:'동기',value:'음모간파'}, goto:'hub_daeje' },
        { traitGate:{slot:'동기',trait:'비겁'}, label:'다그쳐 진심을 끌어낸다', set:{rel_동기:+1}, fate:{slot:'동기',value:'약점공유'}, goto:'hub_daeje' },
        { label:'믿고 모른 척한다', set:{rel_동기:+1}, fate:{slot:'동기',value:'방치'}, goto:'hub_daeje' }
      ] },
    /* 후반 재회 — 운명에 따라 동맹/숙적 (fate 회수) */
    dyn_re_1: { title:'돌아온 인연', act:'轉',
      text:'강호의 길 위에서, 한때의 인연이 다시 그대 앞에 선다. 그때 쌓은 마음이 — 지금의 그를 만든다.',
      choices:[
        { requires:{flag:'fate_사형',eq:'신뢰'}, label:'사형 {사형}이 동맹으로 손을 내민다', set:{hyeop:+2, allySahyung:true}, goto:'hub_daeje' },
        { requires:{flag:'fate_라이벌',eq:'앙심'}, label:'{라이벌}이 숙적이 되어 칼을 겨눈다', set:{ak:+1, nemesis:true}, goto:'hub_daeje' },
        { requires:{flag:'fate_동기',eq:'방치'}, label:'방치한 {동기}의 배신이 돌아온다', set:{ak:+1, betrayed:true}, goto:'hub_daeje' },
        { label:'옛 인연과 짧은 회포를 풀고 헤어진다', set:{hyeop:+1}, goto:'hub_daeje' }
      ] }
  };
  for (var e in EPS) EPS[e].id = e;
  if (typeof module !== 'undefined' && module.exports) { var core=require('./story.core.js'); for(var k in SCN)core.SCENES[k]=SCN[k]; module.exports={EPISODES:EPS,scenes:SCN}; }
  else { if(typeof EPISODES==='undefined')EPISODES={}; for(var e2 in EPS)EPISODES[e2]=EPS[e2]; for(var k2 in SCN)SCENES[k2]=SCN[k2]; }
})();
