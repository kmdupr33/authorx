#!/usr/bin/env node

const { createParser } = require("../lib/parser");

const parser = createParser();

const chunks = [];
const stdin = process.stdin;
stdin.on("readable", () => {
  let chunk;
  while (null !== (chunk = stdin.read())) {
    chunks.push(chunk);
  }
});
stdin.on("end", () => {
  console.log(JSON.stringify(parser.parse(chunks.join(""))[0], null, 2));
});
