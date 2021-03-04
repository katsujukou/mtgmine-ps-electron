module MTGMine.Renderer where

import Prelude

import Effect (Effect)
import Halogen.Aff (runHalogenAff, awaitBody)
import Halogen.VDom.Driver (runUI)
import MTGMine.UI.App (component)

render :: Effect Unit
render = runHalogenAff do
  body <- awaitBody
  runUI component {} body