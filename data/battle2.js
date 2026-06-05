/* 무명행 — 비무 시스템 v2 : 동료(同僚) 지원 추가 (D-①)
 * 관계가 깊으면 비무에 원군이 붙는다: 백소소(치료 1회)·창응(적 의도 2개 선공개)·청운(합격 초식 1회).
 * battle.js 대체본. engine5와 함께 로드.
 */
function playerMoves() {
  var origin=flags.origin||'hwasan', tier=flags.artTier||1, sc=flags.seongchwi||0;
  var ab=Math.floor(sc*0.7)+tier*2;
  var nm={hwasan:['매화일검','이십사수매화','매화검막','자하운기'],heukdo:['무영비수','추혼암기','귀식보','조식'],binggung:['한설장','빙백신장','빙막','음기운'],_def:['검격','절초','수비','운기']}[origin]||['검격','절초','수비','운기'];
  var mv=[
    {name:nm[0],cost:0,type:'attack',base:7+ab,desc:'기본'},
    {name:nm[1],cost:25,type:'attack',base:14+ab,bleed:3,desc:'절초'},
    {name:nm[2],cost:12,type:'guard',block:12+tier*2,desc:'방어'},
    {name:nm[3],cost:0,type:'rest',gi:35,heal:6,desc:'운기'}
  ];
  if(flags._bt && flags._bt.comp && flags._bt.comp.cheongun && !flags._bt.cheongunUsed)
    mv.push({name:'합격(청운)',cost:0,type:'attack',base:22+ab,desc:'청운 합격',comp:'cheongun'});
  return mv;
}
function companionsActive(){
  var c={};
  if(flags.vowProtectSoso||flags.bondSoso||(flags.rel_baeksoso||0)>=2||(flags.rel_사매||0)>=2) c.baeksoso=1;
  if(flags.companion||flags.beastBond||flags.scoutEdge) c.changung=1;
  if(flags.bondCheongun||(flags.rel_cheongun||0)>=3||flags.fate_사형==='신뢰'||(flags.rel_사형||0)>=3) c.cheongun=1;
  return c;
}
var ENEMIES={
  kyeomjon:{name:'검존(劍尊)',hp:150,desc:'천하 서열 9존. 검의 정점.',intents:[{type:'attack',val:16,desc:'검존세(16)'},{type:'debuff',val:0,desc:'기수식 — 취약',vuln:2},{type:'attack',val:12,desc:'쾌검(12)'},{type:'guard',val:18,desc:'검막(18)'}],enrage:{at:0.5,banner:'검존진경',str:6,intents:[{type:'attack',val:26,desc:'천하검(26)'},{type:'attack',val:14,desc:'연환쾌검(14×2)',hits:2}]}},
  cheongun:{name:'사형 청운',hp:70,friendly:true,desc:'정정당당한 비무.',intents:[{type:'attack',val:10,desc:'매화검(10)'},{type:'guard',val:10,desc:'검막(10)'},{type:'attack',val:8,desc:'낙영검(8,출혈)',bleed:2}]},
  geomgwi:{name:'검귀(劍鬼)',hp:90,desc:'반쯤 미친 검의 망령.',intents:[{type:'attack',val:14,desc:'광검(14)'},{type:'attack',val:9,desc:'난도(9×2)',hits:2},{type:'debuff',val:0,desc:'살기 — 취약',vuln:2}]}
};
function startBattle(scene){
  var e=ENEMIES[scene.battle];
  flags._bt={win:scene.winGoto,lose:scene.loseGoto,eName:e.name,eHp:e.hp,eMax:e.hp,eDesc:e.desc,intents:e.intents.slice(),enrage:e.enrage||null,enraged:false,friendly:!!e.friendly,ii:0,eBleed:0,eStr:0,
    pHp:flags._pHpMax||(flags._pHpMax=80),pMax:flags._pHpMax,pGi:60,pGiMax:100,pBlock:0,pVuln:0,log:[],comp:companionsActive(),sosoUsed:false,cheongunUsed:false};
  renderBattle();
}
function bar(c,m,col){return '<div class="bbar"><i style="width:'+Math.max(0,Math.round(c/m*100))+'%;background:'+col+'"></i></div>';}
function renderBattle(){
  var b=flags._bt,app=document.getElementById('app'),moves=playerMoves();
  var preview=b.comp.changung?2:1, ints=[];for(var p=0;p<preview;p++)ints.push(b.intents[(b.ii+p)%b.intents.length].desc);
  var compNames=[];if(b.comp.baeksoso)compNames.push('백소소(치료)');if(b.comp.changung)compNames.push('창응(척후)');if(b.comp.cheongun&&!b.cheongunUsed)compNames.push('청운(합격)');
  var h='<div class="status"><span class="tag">比武</span><span class="art">'+(flags.artName?esc(flags.artName):'무명')+'</span><span class="hyeop">성취 '+(flags.seongchwi||0)+'</span></div>';
  h+='<div class="act">비무(比武)</div><h2>'+esc(b.eName)+'</h2><div style="color:var(--dim);font-size:14px;margin-bottom:8px">'+esc(b.eDesc)+'</div>';
  h+=esc(b.eName)+' — 체력 '+b.eHp+'/'+b.eMax+(b.eBleed?' · 출혈 '+b.eBleed:'')+(b.enraged?' · <span style="color:var(--danger)">진경</span>':'')+bar(b.eHp,b.eMax,'var(--danger)');
  h+='<div style="margin:8px 0;color:var(--gold)">▶ 다음: '+ints.map(esc).join(' → ')+'</div><hr>';
  if(compNames.length)h+='<div style="color:var(--jade);font-size:13.5px;margin-bottom:6px">원군: '+compNames.join(' · ')+'</div>';
  h+='그대 — 체력 '+b.pHp+'/'+b.pMax+(b.pBlock?' · 방어 '+b.pBlock:'')+(b.pVuln?' · 취약 '+b.pVuln:'')+bar(b.pHp,b.pMax,'var(--jade)');
  h+='내공 '+b.pGi+'/'+b.pGiMax+bar(b.pGi,b.pGiMax,'var(--ice)');
  h+='<div class="choices" style="margin-top:14px">';
  moves.forEach(function(m,i){var can=b.pGi>=m.cost;var info=m.type==='attack'?('피해 '+m.base):m.type==='guard'?('방어 '+m.block):('내공 +'+m.gi);
    h+='<button class="choice'+(can?'':' gated')+(m.comp?' ':'')+'" data-i="'+i+'"'+(can?'':' disabled style="opacity:.4"')+'>'+esc(m.name)+' — '+info+(m.cost?' · 내공 '+m.cost:'')+(m.bleed?' · 출혈':'')+'</button>';});
  h+='</div>';
  if(b.log.length)h+='<div style="margin-top:12px;color:var(--dim);font-size:13.5px">'+b.log.slice(-3).map(esc).join('<br>')+'</div>';
  app.innerHTML=h;
  app.querySelectorAll('.choice').forEach(function(btn){if(!btn.disabled)btn.onclick=function(){doMove(+btn.dataset.i);};});
}
function doMove(i){
  var b=flags._bt,m=playerMoves()[i];if(b.pGi<m.cost)return;b.pGi-=m.cost;
  if(m.comp==='cheongun')b.cheongunUsed=true;
  if(m.type==='attack'){b.eHp-=m.base;if(m.bleed)b.eBleed+=m.bleed;b.log.push('그대의 '+m.name+' — '+m.base+' 피해');}
  else if(m.type==='guard'){b.pBlock+=m.block;b.log.push('그대 '+m.name+' 방어 '+m.block);}
  else{b.pGi=Math.min(b.pGiMax,b.pGi+m.gi);b.pHp=Math.min(b.pMax,b.pHp+(m.heal||0));b.log.push('그대 '+m.name);}
  if(b.eBleed>0){b.eHp-=b.eBleed;b.log.push(b.eName+' 출혈 '+b.eBleed);b.eBleed=Math.max(0,b.eBleed-1);}
  if(b.enrage&&!b.enraged&&b.eHp<=b.eMax*b.enrage.at){b.enraged=true;b.intents=b.enrage.intents.slice();b.ii=0;b.eStr=b.enrage.str;b.log.push('— '+b.enrage.banner+' —');}
  if(b.eHp<=0){endBattle(true);return;}
  var it=b.intents[b.ii%b.intents.length];b.ii++;
  if(it.type==='attack'){var raw=(it.val+b.eStr)*(it.hits||1);var inc=Math.round(raw*(b.pVuln>0?1.5:1));var blk=Math.min(b.pBlock,inc);inc-=blk;b.pBlock-=blk;b.pHp-=inc;b.log.push(b.eName+'의 '+it.desc+' — '+inc+' 피해');}
  else if(it.type==='debuff'){b.pVuln+=it.vuln||2;b.log.push(b.eName+'의 '+it.desc);}
  // 백소소 원군: 위급 시 1회 치료
  if(b.comp.baeksoso&&!b.sosoUsed&&b.pHp>0&&b.pHp<=b.pMax*0.35){b.sosoUsed=true;b.pHp=Math.min(b.pMax,b.pHp+30);b.log.push('백소소가 달려와 그대의 상처를 다스린다 — 체력 +30');}
  if(b.pVuln>0)b.pVuln--;b.pBlock=0;
  if(b.pHp<=0){endBattle(false);return;}
  renderBattle();
}
function endBattle(won){var b=flags._bt;flags._lastBattle=b.friendly?(won?'승':'무'):(won?'승':'패');if(won)flags.duelsWon=(flags.duelsWon||0)+1;var g=won?b.win:b.lose;flags._bt=null;go(g);}
