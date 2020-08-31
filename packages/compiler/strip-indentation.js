const stripIndentation = (string) => {
  return string
    .split("\n")
    .map((line) => line.replace(/^ +/, ""))
    .join("\n");
};

module.exports = { stripIndentation };
