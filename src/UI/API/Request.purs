module MTGMine.UI.API.Request
  ( Token
  , BaseURL
  ) where
  
import Prelude

newtype Token = Token String

derive instance eqToken :: Eq Token
derive instance ordToken :: Ord Token

instance showToken :: Show Token where
  show (Token _) = "Token {- secret -}"

newtype BaseURL = BaseURL String
