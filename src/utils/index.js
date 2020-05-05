/**
 * 获取当前滚动条距离顶部高度
 *
 * @returns 距离高度
 */
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
