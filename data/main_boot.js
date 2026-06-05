/* 무명행 본편 — 부트 패치 (engine5 다음에 로드)
 * ① newRun: 주인공 생성(rollCharacter) → 이름·출신·배경 주입
 * ② fillText: {이름}/{출신}/{배경}/{clue…} 치환 추가
 * ③ 본편 빌드에서 미탑재 오리진(흑도 등) 숨김 + 타이틀 재렌더
 */
(function () {
  // ① 주인공 생성 포함 newRun
  newRun = function (o) {
    var O = ORIGINS[o];
    var pc = (typeof rollCharacter === 'function') ? rollCharacter() : { 이름:'무명', 출신:'떠돌이', 배경:'기억나는 것은 갈망뿐.', 동기:'무', 특성:'백지' };
    flags = { origin:o, faction:O.faction, _path:[], _log:[], _seen:{}, _hub:{}, seongchwi:0, simma:0,
              pcName:pc.이름, pcOrigin:pc.출신, pcBack:pc.배경, pcTrait:pc.특성 };
    if (typeof castNPCs === 'function') castNPCs();
    go(O.startScene);
  };

  // ② 본편 토큰 치환
  var _fill = fillText;
  fillText = function (t) {
    var s = _fill(t);
    s = s.replace(/\{이름\}/g, esc(flags.pcName || '무명'));
    s = s.replace(/\{출신\}/g, esc(flags.pcOrigin || '떠돌이'));
    s = s.replace(/\{배경\}/g, esc(flags.pcBack || ''));
    s = s.replace(/\{clue[^}]*\}/g, function () {
      var c = flags.clue;
      if (c === '눈') return '그 아무 감정도 없던 눈을';
      if (c === '표식') return '옷깃 사이로 비치던 그 기이한 표식을';
      if (c === '목소리') return '떠나며 그가 중얼거린 그 한마디 — "약한 것들" — 를';
      return '그날 밤의 그것을';
    });
    return s;
  };

  // ③ 본편 1차 빌드: 화산만 노출
  if (typeof ORIGINS !== 'undefined') {
    for (var k in ORIGINS) { if (k !== 'hwasan') delete ORIGINS[k]; }
  }
  titleScreen();
})();
