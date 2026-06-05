/* 무명행 TextRPG — 화산 분기 통합 연결
 * episodes_hwasan_ipmun.js 다음에 로드. ipmun_graduate를 덮어써 경지 허브 체인을 잇는다:
 *   입문(hub_ipmun) →승급→ 일대제자(hub_ildae) →승급→ 대제자(hub_daeje)
 *     →승급→ 정사대전(hub_war) →승급→ 검존(ch3_throne) → ch3_finale → 엔딩
 * (hub_ildae/daeje/war의 advanceGoto는 각 풀 파일에 이미 다음 단계로 설정됨)
 */
(function () {
  var add = {
    ipmun_graduate: {
      title:'일대제자(一代弟子)', act:'承',
      text:'장문 앞에서 매화 스물네 수를 펼친다. 검 끝에 응축된 기운이 한순간 매화로 만개하자, 장로들이 고개를 끄덕인다.\n\n"오늘부로 너는 화산의 일대제자다." 무명이던 자가 한 경지를 올랐다 — 이제 강호가 그대를 부른다.',
      choices:[ {label:'제자의 검을 들고 강호로 나선다', set:{rank:'일대제자', advanced:true}, goto:'hub_ildae'} ]
    }
  };
  if (typeof module !== 'undefined' && module.exports) {
    var core = require('./story.core.js'); for (var k in add) core.SCENES[k] = add[k]; module.exports = add;
  } else { for (var k2 in add) SCENES[k2] = add[k2]; }
})();
