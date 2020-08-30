const { makeLexer } = require("./lexer");
const { stripIndentation } = require("./strip-indentation");
it("compiles without crashing", () => {
  makeLexer();
});
describe("lexer", () => {
  let lexer;
  let lex;
  beforeEach(() => {
    lexer = makeLexer();
    lex = (string) => {
      lexer.reset(string);
      const states = [];
      for (
        let token = lexer.next();
        token !== undefined;
        token = lexer.next()
      ) {
        states.push(token);
      }
      return states;
    };
  });
  it("lexes <p {hello}", () => {
    const tokens = lex("<p {hello}");
    expect(tokens).toMatchSnapshot();
  });
  it("lexes <p{hello <b{world}}", () => {
    const tokens = lex("<p{hello <b{world}}");
    expect(tokens).toMatchSnapshot();
  });
  it("lexes <p { <b { hello } world", () => {
    const tokens = lex("<p { <b { hello } world");
    expect(tokens).toMatchSnapshot();
  });
  it("lexes 1 \\< 2", () => {
    const tokens = lex("<p { 1 \\< 2 }");
    expect(tokens).toMatchSnapshot();
  });
  it("lexes multi argument invocations", () => {
    const tokens = lex("<c(r, exec) {}");
    expect(tokens).toMatchSnapshot();
  });
});
