const xFauxMarkdown = require("./packages/x-faux-markdown");
const xInfoPanel = require("./packages/x-info-panel");

module.exports = () => {
  return {
    ...xInfoPanel(),
    ...xFauxMarkdown(),
  };
};
