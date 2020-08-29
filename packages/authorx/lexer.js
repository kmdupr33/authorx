const moo = require("moo");

const makeLexer = () => {
  return moo.states({
    main: {
      ws: { match: /[ \n]/, lineBreaks: true },
      brackets: /[{}]/,
      escapedFunctionInvocation: /\\\</,
      escapedSlash: /\\/,
      functionInvocation: { match: /\</, push: "function" },
      words: { match: /[^\}\<\\]+/, lineBreaks: true },
    },
    function: {
      identifier: { match: /[a-zA-Z0-9>#?^&*%$@!-=+_~`<>.,/\\|]+/, pop: true },
      ws: / /,
    },
  });
};

module.exports = { makeLexer };
