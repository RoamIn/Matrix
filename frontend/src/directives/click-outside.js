const clickOutsideContext = '@@clickOutsideContext'

export default {
  bind (el, binding, vnode) {
    const documentHandler = (e) => {
      if (!vnode.context || el.contains(e.target)) {
        return false
      }

      if (binding.expression) {
        vnode.context[el[clickOutsideContext].methodName](e)
      } else {
        el[clickOutsideContext].bindingFn(e)
      }
    }

    el[clickOutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      bindingFn: binding.value
    }

    document.addEventListener('click', documentHandler)
  },
  update (el, binding) {
    el[clickOutsideContext].methodName = binding.expression
    el[clickOutsideContext].bindingFn = binding.value
  },
  unbind (el) {
    document.removeEventListener('click', el[clickOutsideContext].documentHandler)
  }
}
