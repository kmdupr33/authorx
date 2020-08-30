const fs = require("fs");

const genLeaf = (type, { value }) => {
  switch (type) {
    case "text":
    case "ws":
      return value;
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
      return (string, [url]) => `[${string}](${url.value})`;
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
  );
};

console.log(walk(JSON.parse(fs.readFileSync(process.argv[2]))));
