const { makeLexer } = require("./lexer");
const { stripIndentation } = require("./strip-indentation");
it("compiles without crashing", () => {
  makeLexer();
});
