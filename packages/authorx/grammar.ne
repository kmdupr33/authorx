
@{%
require("array-flat-polyfill")
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
%}

@lexer lexer

authorx -> "<" invocation _ "{" _ (authorx _):+ "}" {% 
  ([_, invocation, _1, _2, _3, authorx]) => (
    {
      type: "functionInvocation", 
      ...invocation, 
      children: [...authorx.flat().filter(el => el)]
    }
  )
%}

invocation -> %identifier argList:? {%
  ([identifier, argList]) => argList ? ({ identifier, argList }) : ({ identifier })
%}

argList -> "(" args terminalArg {% 
  ([_, args, terminalArg]) => args.length > 0 ? args.concat([terminalArg]) : [terminalArg]
%}
args -> arg:* {% id %}
arg -> %argument "," %ws {% id %}
terminalArg -> %argument ")" {% id %}

_ -> %ws:* {% 
  ([ws]) => ws.length > 0 ? ({ type: "whitespace", children: ws }) : null
%}
text -> (%words | %escapedFunctionInvocation | %escapedSlash) {% ([[text]]) => ({...text, type: "text"})  %}
authorx -> text {% id %}
