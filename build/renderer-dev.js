import { render } from './.ps-modules/MTGMine.Renderer'

render()

if (module.hot) {
  module.hot.accept('./.ps-modules/MTGMine.Renderer', function() {
    document.body.innerHTML = "";
    render();
  })
}
