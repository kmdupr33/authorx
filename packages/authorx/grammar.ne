
@{%
require("array-flat-polyfill")
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
%}

@lexer lexer

authorx -> %functionInvocation %identifier _ "{" _ (authorx _):+ "}" {% 
  ([_, identifier, _1, _2, _3, authorx]) => (
    {
      type: "functionInvocation", 
      identifier, 
      children: [...authorx.flat().filter(el => el)]
    }
  )
%}
_ -> %ws:* {% 
  ([ws]) => ws.length > 0 ? ({ type: "whitespace", children: ws }) : null
%}
text -> (%words | %escapedFunctionInvocation | %escapedSlash) {% ([[text]]) => ({...text, type: "text"})  %}
authorx -> text {% id %}
