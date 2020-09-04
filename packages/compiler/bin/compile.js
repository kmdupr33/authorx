#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createParser } = require("../lib/parser");
const { compile, Scope } = require("../lib/code-gen");

const parser = createParser();
const [_, _1, axFilePath, funcMapPath] = process.argv;
const ast = parser.parse(fs.readFileSync(axFilePath, { encoding: "utf8" }))[0];
const funcMap = require(path.resolve(process.cwd(), funcMapPath));
const scope = new Scope();
scope.push(funcMap());
console.log(compile(ast, scope));
