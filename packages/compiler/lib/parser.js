const nearley = require("nearley");
const grammar = require("./grammar.js");

class ExplainrParser {
  constructor() {
    this.nearleyParser = new nearley.Parser(
      nearley.Grammar.fromCompiled(grammar)
    );
  }

  parse(string) {
    return this.nearleyParser.feed(string).finish();
  }
}

const createParser = () => {
  return new ExplainrParser();
};

module.exports = { createParser };
