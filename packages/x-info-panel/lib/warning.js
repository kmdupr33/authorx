const xFauxMarkdown = require("@authorx/x-faux-markdown");
const fs = require("fs");
const path = require("path");

module.exports = {
  "!": {
    func: (text) =>
      fs
        .readFileSync(path.resolve(__dirname, "./warning.html"), {
          encoding: "utf8",
        })
        .replace("${children}", text),
    scope: xFauxMarkdown("html"),
  },
};
