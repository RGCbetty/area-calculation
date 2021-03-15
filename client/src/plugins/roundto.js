export default {
  directives: {
    roundTo: {
      bind: (el, binding) => {
        el.innerHTML = Number(Math.round(`${binding.value[0]}e${binding.value[1]}`)+`e-${binding.value[1]}`)
      },
      update: (el, binding) => {
        el.innerHTML = Number(Math.round(`${binding.value[0]}e${binding.value[1]}`)+`e-${binding.value[1]}`)
      }
    },
  }
}