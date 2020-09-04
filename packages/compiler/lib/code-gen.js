const genLeaf = (type, { value }) => {
  switch (type) {
    case "text":
    case "ws":
      return value.replace("\\", "");
    default:
      throw new Error(`expect text | whitespace, got ${type}`);
  }
};

class Scope {
  constructor() {
    this.childScopes = [];
  }
  push(scope) {
    this.childScopes.unshift(scope);
  }
  pop() {
    this.childScopes.shift();
  }
  resolve(identifier) {
    const scopeWithIdentifier = this.childScopes.find(
      (scope) => scope[identifier]
    );
    return scopeWithIdentifier && scopeWithIdentifier[identifier];
  }
}

const getFunction = (identifier, scope) => {
  const resolved =
    identifier && identifier.value && scope.resolve(identifier.value);
  if (typeof resolved === "function") {
    return { func: resolved, scope: null };
  } else if (resolved) {
    return resolved;
  } else {
    return { func: (string) => string, scope: null };
  }
};

const compile = ({ children, type, ...rest }, scope) => {
  if (!children) {
    return genLeaf(type, rest);
  }
  const { identifier, argList } = rest;
  const { func, scope: childScope } = getFunction(identifier, scope);
  return func(
    children.reduce((acc, child) => {
      childScope && scope.push(childScope);
      const result = acc + compile(child, scope);
      childScope && scope.pop();
      return result;
    }, ""),
    argList
  ).replace(/\\/g, "");
};

module.exports = { compile, Scope };
