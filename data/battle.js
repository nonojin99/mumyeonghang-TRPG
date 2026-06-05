/* 무명행 TextRPG — 턴제 비무(比武) 시스템 (포켓몬/STS式 초식 교환)
 * 전역 flags·go()·document를 사용하는 전역 함수. engine4가 scene.battle을 만나면 startBattle 호출.
 * 초식 = 내공(MP) 소모, 적은 의도(intent)를 텔레그래프. 승/패로 분기.
 *   scene.battle = 'kyeomjon'  + scene.winGoto / scene.loseGoto
 */

/* 플레이어 초식 — 오리진·무공 성취(seongchwi)·등급(artTier)로 강해진다(=성장이 보인다) */
function playerMoves() {
  var origin = flags.origin || 'hwasan';
  var tier = flags.artTier || 1;
  var sc = flags.seongchwi || 0;        // 무공 성취 → 위력 가산
  var atkBonus = Math.floor(sc * 0.7) + tier * 2;
  var names = {
    hwasan:  ['매화일검','이십사수매화','매화검막','자하운기'],
    heukdo:  ['무영비수','추혼암기','귀식보','조식'],
    binggung:['한설장','빙백신장','빙막','음기운'],
    _def:    ['검격','절초','수비','운기']
  };
  var nm = names[origin] || names._def;
  return [
    { name:nm[0], cost:0,  type:'attack', base:7+atkBonus, desc:'기본 베기' },
    { name:nm[1], cost:25, type:'attack', base:14+atkBonus, bleed:3, desc:'절초 (출혈)' },
    { name:nm[2], cost:12, type:'guard',  block:12+tier*2, desc:'막고 흘리기' },
    { name:nm[3], cost:0,  type:'rest',   gi:35, heal:6, desc:'내공 회복' }
  ];
}

var ENEMIES = {
  kyeomjon: { name:'검존(劍尊)', hp:150,
    desc:'천하 서열 9존의 하나. 휘두르기도 전에 숨을 짓누르는 검의 정점.',
    intents:[
      { type:'attack', val:16, desc:'검존세 (16)' },
      { type:'debuff', val:0,  desc:'기수식 — 그대에게 취약', vuln:2 },
      { type:'attack', val:12, desc:'쾌검 (12)' },
      { type:'guard',  val:18, desc:'검막 (방어 18)' }
    ],
    enrage:{ at:0.5, banner:'검존진경(劍尊眞境)', str:6, intents:[
      { type:'attack', val:26, desc:'천하검 (26)' },
      { type:'attack', val:14, desc:'연환쾌검 (14×2)', hits:2 }
    ]} },
  cheongun: { name:'사형 청운', hp:70, friendly:true,
    desc:'정정당당히 겨루기로 한 사형. 죽고 죽이는 싸움이 아니다.',
    intents:[
      { type:'attack', val:10, desc:'매화검 (10)' },
      { type:'guard',  val:10, desc:'매화검막 (방어 10)' },
      { type:'attack', val:8,  desc:'낙영검 (8, 출혈)', bleed:2 }
    ] },
  geomgwi: { name:'검귀(劍鬼)', hp:90,
    desc:'반쯤 미친 검의 망령. 살기가 진짜다.',
    intents:[
      { type:'attack', val:14, desc:'광검 (14)' },
      { type:'attack', val:9,  desc:'난도 (9×2)', hits:2 },
      { type:'debuff', val:0,  desc:'살기 — 취약', vuln:2 }
    ] }
};

/* ── 전투 상태/렌더/해결 ── */
function startBattle(scene) {
  var e = ENEMIES[scene.battle];
  flags._bt = {
    sceneId: flags._scene, win: scene.winGoto, lose: scene.loseGoto,
    eName:e.name, eHp:e.hp, eMax:e.hp, eDesc:e.desc, intents:e.intents.slice(),
    enrage:e.enrage||null, enraged:false, friendly:!!e.friendly,
    ii:0, eBleed:0, eStr:0,
    pHp: flags._pHpMax||(flags._pHpMax=80), pMax: flags._pHpMax,
    pGi: 60, pGiMax:100, pBlock:0, pVuln:0, log:[]
  };
  renderBattle();
}
function bar(cur,max,color){ var p=Math.max(0,Math.round(cur/max*100)); return '<div class="bbar"><i style="width:'+p+'%;background:'+color+'"></i></div>'; }
function renderBattle() {
  var b=flags._bt, app=document.getElementById('app');
  var moves=playerMoves();
  var intent=b.intents[b.ii % b.intents.length];
  var h='<div class="status"><span class="tag">比武</span>'+
    '<span class="art">'+(flags.artName?esc(flags.artName)+' ('+flags.artGrade+')':'무명')+'</span>'+
    '<span class="hyeop">성취 '+(flags.seongchwi||0)+'</span></div>';
  h+='<div class="act">비무(比武)</div><h2>'+esc(b.eName)+'</h2>';
  h+='<div style="color:var(--dim);font-size:14px;margin-bottom:8px">'+esc(b.eDesc)+'</div>';
  h+=esc(b.eName)+' — 체력 '+b.eHp+'/'+b.eMax+(b.eBleed?' · 출혈 '+b.eBleed:'')+(b.enraged?' · <span style="color:var(--danger)">진경</span>':'');
  h+=bar(b.eHp,b.eMax,'var(--danger)');
  h+='<div style="margin:8px 0;color:var(--gold)">▶ 다음 초식: '+esc(intent.desc)+(b.eStr?' (+'+b.eStr+')':'')+'</div>';
  h+='<hr style="border-color:var(--line)">';
  h+='그대 — 체력 '+b.pHp+'/'+b.pMax+(b.pBlock?' · 방어 '+b.pBlock:'')+(b.pVuln?' · 취약 '+b.pVuln:'');
  h+=bar(b.pHp,b.pMax,'var(--jade)');
  h+='내공 '+b.pGi+'/'+b.pGiMax+bar(b.pGi,b.pGiMax,'var(--ice)');
  h+='<div class="choices" style="margin-top:14px">';
  moves.forEach(function(m,i){
    var can=b.pGi>=m.cost;
    var info = m.type==='attack'?('피해 '+(m.base+(b.eStr,0))) : m.type==='guard'?('방어 '+m.block) : ('내공 +'+m.gi);
    h+='<button class="choice'+(can?'':' gated')+'" data-i="'+i+'"'+(can?'':' disabled style="opacity:.4"')+'>'+
       esc(m.name)+' — '+info+(m.cost?' · 내공 '+m.cost:'')+(m.bleed?' · 출혈':'')+'</button>';
  });
  h+='</div>';
  if(b.log.length) h+='<div style="margin-top:12px;color:var(--dim);font-size:13.5px">'+b.log.slice(-3).map(esc).join('<br>')+'</div>';
  app.innerHTML=h;
  app.querySelectorAll('.choice').forEach(function(btn){ if(!btn.disabled) btn.onclick=function(){ doMove(+btn.dataset.i); }; });
}
function doMove(i){
  var b=flags._bt, m=playerMoves()[i];
  if(b.pGi<m.cost) return;
  b.pGi-=m.cost;
  if(m.type==='attack'){ var dmg=m.base; b.eHp-=dmg; if(m.bleed)b.eBleed+=m.bleed; b.log.push('그대의 '+m.name+' — '+dmg+' 피해'); }
  else if(m.type==='guard'){ b.pBlock+=m.block; b.log.push('그대가 '+m.name+'으로 방어 '+m.block); }
  else { b.pGi=Math.min(b.pGiMax,b.pGi+m.gi); b.pHp=Math.min(b.pMax,b.pHp+(m.heal||0)); b.log.push('그대가 '+m.name+' — 내공 회복'); }
  // 적 출혈
  if(b.eBleed>0){ b.eHp-=b.eBleed; b.log.push(b.eName+' 출혈 '+b.eBleed); b.eBleed=Math.max(0,b.eBleed-1); }
  // 진경(격노) 전환
  if(b.enrage && !b.enraged && b.eHp<=b.eMax*b.enrage.at){ b.enraged=true; b.intents=b.enrage.intents.slice(); b.ii=0; b.eStr=b.enrage.str; b.log.push('— '+b.enrage.banner+' —'); }
  if(b.eHp<=0){ endBattle(true); return; }
  // 적 행동
  var it=b.intents[b.ii % b.intents.length]; b.ii++;
  if(it.type==='attack'){ var hits=it.hits||1; var raw=(it.val+b.eStr)*hits; var mul=b.pVuln>0?1.5:1; var inc=Math.round(raw*mul); var blk=Math.min(b.pBlock,inc); inc-=blk; b.pBlock-=blk; b.pHp-=inc; b.log.push(b.eName+'의 '+it.desc+' — '+inc+' 피해'+(blk?' (방어 '+blk+' 흡수)':'')); }
  else if(it.type==='guard'){ b.eHp+=0; b.eBlock=(it.val); b.log.push(b.eName+'이(가) '+it.desc); }
  else if(it.type==='debuff'){ b.pVuln+=it.vuln||2; b.log.push(b.eName+'의 '+it.desc); }
  if(b.pVuln>0) b.pVuln--;
  b.pBlock=0; // 방어는 한 턴
  if(b.pHp<=0){ endBattle(false); return; }
  renderBattle();
}
function endBattle(won){
  var b=flags._bt;
  if(b.friendly){ flags._lastBattle=(won?'승':'무'); }
  else flags._lastBattle=(won?'승':'패');
  if(won){ flags.duelsWon=(flags.duelsWon||0)+1; }
  var go_=won?b.win:b.lose;
  flags._bt=null;
  go(go_);
}
