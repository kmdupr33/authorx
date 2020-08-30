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
    {"name": "authorx", "symbols": [{"literal":"<"}, "invocation", "_", {"literal":"{"}, "_", "authorx$ebnf$1", {"literal":"}"}], "postprocess":  
        ([_, invocation, _1, _2, _3, authorx]) => (
          {
            type: "functionInvocation", 
            ...invocation, 
            children: [...authorx.flat().filter(el => el)]
          }
        )
        },
    {"name": "invocation$ebnf$1", "symbols": ["argList"], "postprocess": id},
    {"name": "invocation$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "invocation", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "invocation$ebnf$1"], "postprocess": 
        ([identifier, argList]) => argList ? ({ identifier, argList }) : ({ identifier })
        },
    {"name": "argList", "symbols": [{"literal":"("}, "args", "terminalArg"], "postprocess":  
        ([_, args, terminalArg]) => args.length > 0 ? args.concat([terminalArg]) : [terminalArg]
        },
    {"name": "args$ebnf$1", "symbols": []},
    {"name": "args$ebnf$1", "symbols": ["args$ebnf$1", "arg"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "args", "symbols": ["args$ebnf$1"], "postprocess": id},
    {"name": "arg", "symbols": [(lexer.has("argument") ? {type: "argument"} : argument), {"literal":","}, (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id},
    {"name": "terminalArg", "symbols": [(lexer.has("argument") ? {type: "argument"} : argument), {"literal":")"}], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess":  
        ([ws]) => ws.length > 0 ? ({ type: "whitespace", children: ws }) : null
        },
    {"name": "text$subexpression$1", "symbols": [(lexer.has("words") ? {type: "words"} : words)]},
    {"name": "text$subexpression$1", "symbols": [(lexer.has("escapedFunctionInvocation") ? {type: "escapedFunctionInvocation"} : escapedFunctionInvocation)]},
    {"name": "text$subexpression$1", "symbols": [(lexer.has("escapedSlash") ? {type: "escapedSlash"} : escapedSlash)]},
    {"name": "text$subexpression$1", "symbols": [(lexer.has("escapedCloseBracket") ? {type: "escapedCloseBracket"} : escapedCloseBracket)]},
    {"name": "text", "symbols": ["text$subexpression$1"], "postprocess": ([[text]]) => ({...text, type: "text"})},
    {"name": "authorx", "symbols": ["text"], "postprocess": id}
]
  , ParserStart: "authorx"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
