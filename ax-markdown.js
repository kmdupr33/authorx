const xFauxMarkdown = require("./packages/x-faux-markdown");
const xInfoPanel = require("./packages/x-info-panel");
const xMermaidJs = require("./packages/x-mermaid-js");

module.exports = () => {
  return {
    ...xMermaidJs(),
    ...xInfoPanel(),
    ...xFauxMarkdown(),
  };
};
