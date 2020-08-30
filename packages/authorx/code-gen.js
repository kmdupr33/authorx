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

const walk = ({ children, type, ...rest }) => {
  if (!children) {
    return genLeaf(type, rest);
  }
  return children.reduce((acc, child) => {
    const { identifier } = rest;
    switch (identifier && identifier.value) {
      case "*":
        return acc + `*${walk(child)}*`;
      case "#":
        return acc + `# ${walk(child)}`;
      case "##":
        return acc + `## ${walk(child)}`;
      case "<":
        return acc + `* ${walk(child)}`;
      default:
        return acc + walk(child);
    }
  }, "");
};

console.log(walk(JSON.parse(fs.readFileSync(process.argv[2]))));
