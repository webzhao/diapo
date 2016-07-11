/**
 * get one node by selector
 */
export function $(selector) {
  return typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
}

/**
 * get nodes by selector
 */
export function $$(selector) {
  return typeof selector === 'string'
    ? Array.from(document.querySelectorAll(selector))
    : selector;
}

/**
 * slice with padding
 */
export function sliceWithPadding(arr, start=0, end=arr.length) {
  return Array(end - start).fill(1).map((a, i) => arr[start + i] || null);
}

