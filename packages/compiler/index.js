const { createParser } = require("./lib/parser");
const { compile: internalCompile, Scope } = require("./lib/code-gen");

const parser = createParser();

const compile = (string, scope = new Scope()) => {
  const ast = parser.parse(string)[0];
  return internalCompile(ast, scope);
};

module.exports = {
  compile,
  Scope,
};
