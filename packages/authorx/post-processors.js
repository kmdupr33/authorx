const postProcessAuthorX = ([_, invocation, _1, _2, _3, authorx]) => {
  const children = [...authorx.flat().filter((el) => el)];
  return {
    type: "functionInvocation",
    ...invocation,
    children,
  };
};

module.exports = { postProcessAuthorX };
