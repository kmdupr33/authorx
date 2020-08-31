const { createParser } = require("./parser");
const { stripIndentation } = require("./strip-indentation");
const diffDefault = require("jest-diff").default;

describe("authorx -> authorx | %identifier", () => {
  let parser;
  let parse;
  let expectToParse;
  beforeEach(() => {
    parser = createParser();
    parse = (string) => {
      return parser.parse(stripIndentation(string));
    };
    expectToParse = (string) => {
      const results = parse(string);
      try {
        expect(results).toHaveLength(1);
        expect(results[0]).toMatchSnapshot();
      } catch (e) {
        if (results.length > 1) {
          console.log(diffDefault(results[0], results[1]));
        }
        throw e;
      }
    };
  });
  it("parses hello", () => {
    expectToParse("<p { hello }");
  });
  it("parses hello world", () => {
    expectToParse("<p { hello world }");
  });
  it("parses hello { world } | b", () => {
    expectToParse("<p { hello <b { world } }");
  });
  it("parses { hello } | b world", () => {
    expectToParse("<p { <b { hello } world }");
  });
  it("parses { hello world } | b", () => {
    expectToParse("<p { <b { hello world } }");
  });
  it("parses multiline hello world", () => {
    expectToParse(`<p {
      hello <b { world }
    }`);
  });
  it("parses a paragraph", () => {
    expectToParse(`<p {
      hello world
      this is authorx
    }`);
  });
  describe("escaping", () => {
    it("parses a paragraph with escaped function invocations", () => {
      expectToParse(`<p {
        1 \\< 2
      }`);
    });
    it("parses a paragraph with escaped function invocations followed by text", () => {
      expectToParse(`<p {
        1 \\< 2 hello
      }`);
    });
    it("parses a paragraph with escaped function invocations followed by a real function invocation", () => {
      expectToParse(`<p {
        1 \\< 2 <b { 3 }
      }`);
    });
    it("parses a paragraph with an escape character", () => {
      expectToParse(`<p {
        \\
      }`);
    });
    it("parses an escaped function invocation within a function", () => {
      expectToParse(`<> {
        \\<p {
            hello
          \\}
        }`);
    });
  });

  describe("arguments", () => {
    it("parses a single argument", () => {
      expectToParse(`<p {
      <a(google.com) { Google }
    }`);
    });
    it("parses multiple arguments", () => {
      expectToParse(`<p {
        <code(r, exec) {
          "hello"
        }
      }`);
    });
  });
});
