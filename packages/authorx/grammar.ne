
@{%
require("array-flat-polyfill")
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
%}

@lexer lexer

authorx -> _ %functionInvocation _ %identifier _ "{" _ optional_words _ authorx _ optional_words _ "}"
_ -> %ws:*
optional_words -> words:*
words -> (%word _):+
authorx -> words