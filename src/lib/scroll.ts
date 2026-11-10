/**
 * 페이지 맨 위로 이동합니다. globals.css의 scroll-behavior를 따르므로 보통은 부드럽게,
 * "동작 줄이기" 설정이면 바로 이동합니다. 홈에서 #섹션이 붙어 있으면 주소에서 지웁니다.
 */
export function scrollToPageTop() {
  window.scrollTo({ top: 0 });
  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
}
