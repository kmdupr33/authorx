const genLeaf = (type, { value }) => {
  switch (type) {
    case "text":
    case "ws":
      return value.replace("\\", "");
    default:
      throw new Error(`expect text | whitespace, got ${type}`);
  }
};

const getFunction = (identifier, funcMap) => {
  return (
    (identifier && identifier.value && funcMap[identifier.value]) ||
    ((string) => string)
  );
};

const compile = ({ children, type, ...rest }, funcMap) => {
  if (!children) {
    return genLeaf(type, rest);
  }
  const { identifier, argList } = rest;
  const func = getFunction(identifier, funcMap);
  return func(
    children.reduce((acc, child) => acc + compile(child, funcMap), ""),
    argList
  ).replace(/\\/g, "");
};

module.exports = { compile };
