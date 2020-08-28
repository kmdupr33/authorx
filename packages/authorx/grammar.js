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
    {"name": "authorx", "symbols": ["_", (lexer.has("functionInvocation") ? {type: "functionInvocation"} : functionInvocation), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"{"}, "_", "optional_words", "_", "authorx", "_", "optional_words", "_", {"literal":"}"}]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "optional_words$ebnf$1", "symbols": []},
    {"name": "optional_words$ebnf$1", "symbols": ["optional_words$ebnf$1", "words"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "optional_words", "symbols": ["optional_words$ebnf$1"]},
    {"name": "words$ebnf$1$subexpression$1", "symbols": [(lexer.has("word") ? {type: "word"} : word), "_"]},
    {"name": "words$ebnf$1", "symbols": ["words$ebnf$1$subexpression$1"]},
    {"name": "words$ebnf$1$subexpression$2", "symbols": [(lexer.has("word") ? {type: "word"} : word), "_"]},
    {"name": "words$ebnf$1", "symbols": ["words$ebnf$1", "words$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "words", "symbols": ["words$ebnf$1"]},
    {"name": "authorx", "symbols": ["words"]}
]
  , ParserStart: "authorx"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
