// Generated automatically by nearley, version 2.19.6
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

require("array-flat-polyfill")
const { makeLexer } = require("./lexer");
const lexer = makeLexer()
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "authorx$ebnf$1$subexpression$1", "symbols": ["authorx", "_"]},
    {"name": "authorx$ebnf$1", "symbols": ["authorx$ebnf$1$subexpression$1"]},
    {"name": "authorx$ebnf$1$subexpression$2", "symbols": ["authorx", "_"]},
    {"name": "authorx$ebnf$1", "symbols": ["authorx$ebnf$1", "authorx$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "authorx", "symbols": [(lexer.has("functionInvocation") ? {type: "functionInvocation"} : functionInvocation), (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"{"}, "_", "authorx$ebnf$1", {"literal":"}"}], "postprocess":  
        ([_, identifier, _1, _2, _3, authorx]) => (
          {
            _type: "functionInvocation", 
            identifier, 
            children: authorx.flat().filter(el => el)
          }
        )
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "text$subexpression$1", "symbols": [(lexer.has("words") ? {type: "words"} : words)]},
    {"name": "text$subexpression$1", "symbols": [(lexer.has("escapedFunctionInvocation") ? {type: "escapedFunctionInvocation"} : escapedFunctionInvocation)]},
    {"name": "text$subexpression$1", "symbols": [(lexer.has("escapedSlash") ? {type: "escapedSlash"} : escapedSlash)]},
    {"name": "text", "symbols": ["text$subexpression$1"], "postprocess": id},
    {"name": "authorx", "symbols": ["text"], "postprocess": ([text]) => ({_type: "text", children: text})}
]
  , ParserStart: "authorx"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
