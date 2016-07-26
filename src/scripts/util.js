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
export function $$(selector, context=document) {
  return typeof selector === 'string'
    ? [].slice.call(context.querySelectorAll(selector))
    : selector;
}

/**
 * slice with padding
 */
export function sliceWithPadding(arr, start=0, end=arr.length) {
  const ret = [];
  while(start <= end) {
    ret.push(arr[start] || null);
    start++;
  }
  return ret;
}

