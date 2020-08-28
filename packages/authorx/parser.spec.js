const { createParser } = require("./parser");
const { stripIndentation } = require("./strip-indentation");

const expectToParse = (results) => {
  expect(results).toHaveLength(1);
  expect(results[0]).toMatchSnapshot();
};

describe("authorx -> authorx | %identifier", () => {
  let parser;
  let parse;
  beforeEach(() => {
    parser = createParser();
    parse = (string) => {
      return parser.parse(stripIndentation(string));
    };
  });
  it("parses hello", () => {
    parse("<p { hello }");
  });
  it("parses hello world", () => {
    parse("<p { hello world }");
  });
  it("parses hello { world } | b", () => {
    parse("<p { hello <b { world } }");
  });
  it("parses { hello } | b world", () => {
    parse("<p { <b { hello } world }");
  });
  it("parses { hello world } | b", () => {
    parse("<p { <b { hello world } }");
  });
  it("parses multiline hello world", () => {
    parse(`<p {
      hello <b { world }
    }`);
  });
  it("parses a paragraph", () => {
    parse(`<p {
      hello world
      this is authorx
    }`);
  });
});
