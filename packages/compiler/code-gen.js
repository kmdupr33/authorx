const fs = require("fs");

const genLeaf = (type, { value }) => {
  switch (type) {
    case "text":
    case "ws":
      return value.replace("\\", "");
    default:
      throw new Error(`expect text | whitespace, got ${type}`);
  }
};

const getFunction = (identifier) => {
  switch (identifier && identifier.value) {
    case "*":
      return (string) => `*${string}*`;
    case "#":
      return (string) => `# ${string}`;
    case "##":
      return (string) => `## ${string}`;
    case "<":
      return (string) => `* ${string}`;
    case "a":
      return (string, [url]) => `[${string.trim()}](${url.value})`;
    case ">":
      return (string, lang) =>
        `\`\`\`${(lang && lang[0].value) || ""}\n${string}\`\`\``;
    default:
      return (string) => string;
  }
};

const walk = ({ children, type, ...rest }) => {
  if (!children) {
    return genLeaf(type, rest);
  }
  const { identifier, argList } = rest;
  const func = getFunction(identifier);
  return func(
    children.reduce((acc, child) => acc + walk(child), ""),
    argList
  ).replace(/\\/g, "");
};

console.log(walk(JSON.parse(fs.readFileSync(process.argv[2]))));
