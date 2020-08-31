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
      const tokens = [];
      try {
        for (
          let token = lexer.next();
          token !== undefined;
          token = lexer.next()
        ) {
          tokens.push(token);
        }
      } catch (e) {
        e.tokens = tokens;
        throw e;
      }
      return tokens;
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
  it("lexes doubly nested escaped invocations", () => {
    const tokens = lex(`<p {
      <p {
        \\<p {
          Hello, world!
        \\}
      }
    }`);
    expect(tokens).toMatchSnapshot();
  });
  it("lexes escaped < as words", () => {
    const tokens = lex(`
        <p {
          \\<p
        }
      `);
    expect(tokens).toMatchSnapshot();
  });
});
