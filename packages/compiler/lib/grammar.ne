
@{%
require("array-flat-polyfill")
const { 
  postProcessAuthorX, 
  postProcessLeaf, 
  postProcessSingleLine, 
  postProcessNoBody 
} = require("./post-processors");
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
%}

@lexer lexer

authorx -> "<" invocation _ "{" _ (authorx _):+ %closeBracket {% 
 postProcessAuthorX
%}

authorx -> "<" invocation _ %leaf {%
  postProcessLeaf  
%}

authorx -> "<" invocation _ %singleLineText %newLine {%
  postProcessSingleLine
%}

authorx -> "<" invocation _ %newLine {%
  postProcessNoBody
%}

authorx -> text {% id %}

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
text -> (%words) {% 
  ([[text]]) => ({...text, type: "text"})  
%}
