import { patchClass } from './modules/class'
import { patchStyle } from './modules/style'
import { patchAttr } from './modules/attrs'
import { patchDOMProp } from './modules/props'
import { patchEvent } from './modules/events'
import { isOn } from '@vue/shared'
import { VNode } from '@vue/runtime-core'

export function patchProp(
  el: Element,
  key: string,
  prevValue: any,
  nextValue: any,
  isSVG: boolean,
  prevChildren?: VNode[],
  unmountChildren?: any
) {
  switch (key) {
    // special
    case 'class':
      patchClass(el, nextValue, isSVG)
      break
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break
    default:
      if (isOn(key)) {
        patchEvent(el, key.slice(2).toLowerCase(), prevValue, nextValue)
      } else if (key in el) {
        patchDOMProp(el, key, nextValue, prevChildren, unmountChildren)
      } else {
        patchAttr(el, key, nextValue, isSVG)
      }
      break
  }
}