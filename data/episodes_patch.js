/* 무명행 TextRPG — 에피소드 id 스탬프 패치
 * EPISODES 각 항목에 자신의 키를 .id로 박는다(허브의 '본 에피소드' 필터가 작동하도록).
 * episodes_*.js 다음, engine3.js 앞에 로드.
 */
(function () {
  function patch(EP) { if (!EP) return; for (var k in EP) { EP[k].id = k; } }
  if (typeof EPISODES !== 'undefined') patch(EPISODES);           // 브라우저 전역
  if (typeof module !== 'undefined' && module.exports) {
    try { var m = require('./episodes_hwasan_ipmun.js'); if (m && m.EPISODES) patch(m.EPISODES); } catch (e) {}
  }
})();
