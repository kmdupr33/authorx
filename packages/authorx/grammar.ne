
@{%
require("array-flat-polyfill")
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
%}

@lexer lexer

authorx -> %functionInvocation %identifier _ "{" _ (authorx _):+ "}" {% 
  ([_, identifier, _1, _2, _3, authorx]) => (
    {
      _type: "functionInvocation", 
      identifier, 
      children: authorx.flat().filter(el => el)
    }
  )
%}
_ -> %ws:* {% () => null %}
text -> (%words | %escapedFunctionInvocation | %escapedSlash) {% id %}
authorx -> text {% ([text]) => ({_type: "text", children: text}) %}
