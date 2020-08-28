const moo = require("moo");

const makeLexer = () => {
  return moo.states({
    main: {
      ws: { match: /[ \n]/, lineBreaks: true },
      brackets: /[{}]/,
      functionInvocation: { match: /(?<!\\)</, push: "function" },
      word: /[a-zA-Z0-9]+/,
    },
    function: {
      identifier: { match: /[a-zA-Z0-9]+/, pop: true },
      ws: / /,
    },
  });
};

module.exports = { makeLexer };
