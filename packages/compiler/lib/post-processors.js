const postProcessAuthorX = ([_, invocation, _1, _2, _3, authorx]) => {
  const children = [...authorx.flat().filter((el) => el)];
  return {
    type: "functionInvocation",
    ...invocation,
    children,
  };
};

const postProcessLeaf = ([_, invocation, _1, leaf]) => ({
  type: "functionInvocation",
  ...invocation,
  children: [{ ...leaf, type: "text", value: leaf.value.slice(2, -2) }],
});

const postProcessSingleLine = ([_, invocation, _1, text, newLine]) => ({
  type: "functionInvocation",
  ...invocation,
  children: [
    { ...text, type: "text", value: text.value },
    { type: "whitespace", children: [{ ...newLine, type: "ws" }] },
  ],
});

const postProcessNoBody = ([_, invocation, _1, newLine]) => ({
  ...invocation,
  children: [{ type: "whitespace", children: [{ ...newLine, type: "ws" }] }],
});

module.exports = {
  postProcessAuthorX,
  postProcessLeaf,
  postProcessSingleLine,
  postProcessNoBody,
};
