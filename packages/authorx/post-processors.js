const getChildren = (authorx) => {
  const children = [...authorx.flat().filter((el) => el)];
  if (!children.every(({ type }) => type === "text" || type === "whitespace")) {
    return children;
  }
  return [
    children.reduce(
      (acc, child) => {
        return {
          type: "text",
          value: acc.value + child.value,
        };
      },
      { value: "" }
    ),
  ];
};

const postProcessAuthorX = ([_, invocation, _1, _2, _3, authorx]) => {
  const children = getChildren(authorx);
  return {
    type: "functionInvocation",
    ...invocation,
    children,
  };
};

module.exports = { postProcessAuthorX };
