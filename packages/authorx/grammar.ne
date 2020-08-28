
@{%
require("array-flat-polyfill")
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
%}

@lexer lexer

authorx -> %functionInvocation %identifier _ "{" _ (authorx _):+ "}" {% 
  ([_, _1, _2, identifier, _3, _4, _5, authorx]) => (
    {
      type: "functionInvocation", 
      identifier, 
      children: authorx
    }
  )
%}
_ -> %ws:* {% () => null %}
optional_words -> %words:*
authorx -> %words {% id %}