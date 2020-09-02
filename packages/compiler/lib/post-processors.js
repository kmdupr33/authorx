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

module.exports = { postProcessAuthorX, postProcessLeaf };
