/* 무명행 TextRPG — 장면 그래프 코어
 * SCENES는 빈 객체로 시작하고, story.<origin>.js 들이 여기에 장면을 더한다.
 * (큰 단일 파일 쓰기 회피 + "오리진=데이터 추가" 구조 정합)
 * 브라우저: var SCENES 전역. Node: module.exports로 공유, 오리진 파일이 require해 병합.
 */
var SCENES = {};
var START = 'prologue'; // 화산 기본 진입 (오리진별 진입점은 world.js ORIGINS[].startScene)

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SCENES: SCENES, START: START };
}
