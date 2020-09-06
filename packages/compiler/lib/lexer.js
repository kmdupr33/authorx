const moo = require("moo");

const makeLexer = () => {
  return moo.states({
    main: {
      ws: { match: /[ \n]/, lineBreaks: true },
      closeBracket: /(?<!\\)}/,
      functionInvocationStart: { match: /(?<!\\)</, push: "function" },
      words: { match: /(?:(?:\\<)|(?:\\})|(?:\\)|[^<\\}])+/, lineBreaks: true },
    },
    function: {
      identifier: {
        // \ is not a valid identifier here! It's escaping the "-"
        match: /[a-zA-Z0-9#^&*%$@!\-+_~`<>]+/,
        next: "body",
      },
    },
    body: {
      openParen: { match: /\(/, push: "args" },
      leaf: { match: /(?<!\\){:(?:\\:}|[^:]|:[^}])*:}/, pop: true },
      openBracket: { match: /{/, pop: true },
      ws: / /,
      newLine: { match: /\n/, lineBreaks: true, pop: true },
      singleLineText: { match: /[^\n]+/ },
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
