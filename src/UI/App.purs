module MTGMine.UI.App (component) where
  
import Prelude

import Halogen (ComponentHTML, Component, mkComponent, mkEval, defaultEval)
import Halogen.HTML as HH

type State = Unit

component :: forall query input output m. Component HH.HTML query input output m
component = mkComponent
  { initialState: \_ -> unit
  , render
  , eval: mkEval defaultEval
  }

  where
    render :: forall action slots. State -> ComponentHTML action slots m
    render _ = 
      HH.div_
        [ HH.text "Hello, sailor!🚢" ]