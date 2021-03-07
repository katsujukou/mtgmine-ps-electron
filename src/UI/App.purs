module MTGMine.UI.App (component) where
  
import Prelude

import Data.Maybe (Maybe(..))
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE

type State = Int

data Action = Decrement | Increment

component :: forall query input output m. H.Component HH.HTML query input output m
component = H.mkComponent
  { initialState: \_ -> 0
  , render
  , eval: H.mkEval H.defaultEval { handleAction = handleAction }
  }

  where
    render :: forall slots. State -> H.ComponentHTML Action slots m
    render count =
      HH.div_
        [ HH.h1_ [ HH.text "MTGMine" ]
        , HH.div_
          [ HH.button [ HE.onClick \_ -> Just Decrement ]
            [ HH.text "－" ]
          , HH.text (show count)
          , HH.button [ HE.onClick \_ -> Just Increment ]
            [ HH.text "＋" ]
          ]
        , HH.div_
          [ HH.text "やったぜ。"
          ]
        ]

handleAction :: forall output m. Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
  Decrement -> do
    H.modify_ \cnt -> cnt - 1

  Increment -> do
    H.modify_ \cnt -> cnt + 1