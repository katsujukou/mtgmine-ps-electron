module MTGMine.UI.Env where
  
import Prelude

import Data.Maybe (Maybe)
import Effect.Aff.Bus (BusRW)
import Effect.Ref (Ref)
import MTGMine.UI.API.Request (BaseURL)
import MTGMine.UI.Data.Profile (Profile)

type Env =
  { logLevel :: LogLevel
  , baseUrl :: BaseURL
  , userEnv :: UserEnv
  }

data LogLevel = Dev | Prod

derive instance eqLogLevel :: Eq LogLevel
derive instance ordLogLevel :: Ord LogLevel

type UserEnv =
  { currentUser :: Ref (Maybe Profile)
  , userBus :: BusRW (Maybe Profile)
  }