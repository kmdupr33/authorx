#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createParser } = require("../lib/parser");
const { compile, Scope } = require("../lib/code-gen");

const parser = createParser();
require("yargs")
  .scriptName("axc")
  .usage(
    "$0 <axFilePath> <functionsFilePath>",
    "compile an authorx file",
    (yargs) => {
      yargs.positional("axFilePath", {
        type: "string",
        describe: "the authorx file you want to compile",
      });
      yargs.positional("functionsFilePath", {
        type: "string",
        describe:
          "the node module the exports the functions you want to use in your authorx file",
      });
    },
    ({ axFilePath, functionsFilePath }) => {
      const ast = parser.parse(
        fs.readFileSync(axFilePath, { encoding: "utf8" })
      )[0];
      const funcMap = require(path.resolve(process.cwd(), functionsFilePath));
      const scope = new Scope();
      scope.push(funcMap());
      (async () => {
        const outputDir = path.dirname(axFilePath);
        console.log(await compile(ast, scope, outputDir));
      })();
    }
  )
  .help().argv;
