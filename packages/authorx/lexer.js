const moo = require("moo");

const makeLexer = () => {
  return moo.states({
    main: {
      ws: { match: /[ \n]/, lineBreaks: true },
      brackets: /[{}]/,
      escapedFunctionInvocation: /\\\</,
      escapedSlash: /\\/,
      functionInvocationStart: { match: /\</, push: "function" },
      words: { match: /[^\}\<\\]+/, lineBreaks: true },
    },
    function: {
      identifier: { match: /[a-zA-Z0-9>#?^&*%$@!\-=+_~`<>.,/\\|]+/ },
      openParen: { match: /\(/, push: "args" },
      openBracket: { match: /{/, pop: true },
      ws: / /,
    },
    args: {
      ws: / /,
      argument: /[^ \n,)]+/,
      argumentSeparator: /,/,
      closeParen: { match: /\)/, pop: true },
    },
  });
};

module.exports = { makeLexer };
