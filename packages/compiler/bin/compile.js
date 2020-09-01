#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createParser } = require("../lib/parser");
const { compile } = require("../lib/code-gen");

const parser = createParser();
const [_, _1, axFilePath, funcMapPath] = process.argv;
const ast = parser.parse(fs.readFileSync(axFilePath, { encoding: "utf8" }))[0];
const funcMap = require(path.resolve(process.cwd(), funcMapPath));
console.log(compile(ast, funcMap));
