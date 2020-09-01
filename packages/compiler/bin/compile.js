#!/usr/bin/env node
const fs = require("fs");

const { compile } = require("../lib/code-gen");

const [_, _1, astPath, funcMapPath] = process.argv;
const axFilePath = JSON.parse(fs.readFileSync(astPath));
const funcMap = require(funcMapPath);
console.log(compile(axFilePath, funcMap));
